// Cloudflare Pages Function — POST /api/contact

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
}

type PagesContext = {
  request: Request;
  env: Env;
};

function json(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const SERVICE_LABELS: Record<string, string> = {
  'eicr': 'EICR Report',
  'landlord-eicr': 'Landlord EICR',
  'consumer-unit': 'Consumer Unit Upgrade',
  'fault-finding': 'Fault Finding',
  'rewire-full': 'Full House Rewire',
  'rewire-partial': 'Partial Rewire',
  'emergency': 'Emergency Electrical Work',
  'air-con': 'Air Conditioning Installation',
  'not-sure': 'Not sure — need advice',
};

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: 'Email service is not configured.' }, 500);
  }
  if (!env.CONTACT_TO_EMAIL) {
    return json({ ok: false, error: 'Contact form recipient is not configured.' }, 500);
  }

  // Parse request body — accept JSON (from fetch) or form data
  let firstName = '', lastName = '', phone = '', email = '',
      service = '', postcode = '', propertyType = '', message = '', company = '';
  try {
    const contentType = request.headers.get('Content-Type') ?? '';
    if (contentType.includes('application/json')) {
      const body = await request.json() as Record<string, unknown>;
      firstName    = String(body.first_name    ?? '');
      lastName     = String(body.last_name     ?? '');
      phone        = String(body.phone         ?? '');
      email        = String(body.email         ?? '');
      service      = String(body.service       ?? '');
      postcode     = String(body.postcode      ?? '');
      propertyType = String(body.property_type ?? '');
      message      = String(body.message       ?? '');
      company      = String(body.company       ?? '');
    } else {
      const fd = await request.formData();
      firstName    = String(fd.get('first_name')    ?? '');
      lastName     = String(fd.get('last_name')     ?? '');
      phone        = String(fd.get('phone')         ?? '');
      email        = String(fd.get('email')         ?? '');
      service      = String(fd.get('service')       ?? '');
      postcode     = String(fd.get('postcode')      ?? '');
      propertyType = String(fd.get('property_type') ?? '');
      message      = String(fd.get('message')       ?? '');
      company      = String(fd.get('company')       ?? '');
    }
  } catch (_err: unknown) {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // Honeypot — silently succeed if filled
  if (company.trim()) {
    return json({ ok: true });
  }

  // Validation — mirrors the required fields on the form
  const errors: string[] = [];
  if (!firstName.trim()) errors.push('First name is required.');
  if (!lastName.trim()) errors.push('Last name is required.');
  if (!phone.trim()) errors.push('Phone number is required.');
  if (!service.trim()) errors.push('Please select a service.');
  if (!postcode.trim()) errors.push('Postcode is required.');
  if (email.trim() && !isValidEmail(email.trim())) {
    errors.push('Email address is not valid.');
  }
  if (message.length > 5000) errors.push('Message must be 5000 characters or fewer.');

  if (errors.length) {
    return json({ ok: false, error: errors.join(' ') }, 422);
  }

  // Sanitise for HTML insertion
  const safeName     = escapeHtml(`${firstName.trim()} ${lastName.trim()}`.trim());
  const safePhone    = escapeHtml(phone.trim());
  const safeEmail    = email.trim() ? escapeHtml(email.trim()) : '';
  const safeService  = escapeHtml(SERVICE_LABELS[service.trim()] ?? service.trim());
  const safePostcode = escapeHtml(postcode.trim());
  const safeProperty = propertyType.trim() ? escapeHtml(propertyType.trim()) : '';
  const safeMessage  = message.trim() ? escapeHtml(message.trim()).replace(/\n/g, '<br>') : '';

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#555;white-space:nowrap"><strong>${label}</strong></td><td style="padding:4px 0;color:#111">${value}</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"></head><body>
<h2 style="color:#1a2c4e;font-family:Georgia,serif;margin:0 0 1rem">Website Enquiry — London BS Ltd</h2>
<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:15px;margin-bottom:1rem">
  ${row('Name', safeName)}
  ${row('Phone', safePhone)}
  ${safeEmail ? row('Email', safeEmail) : ''}
  ${row('Service', safeService)}
  ${row('Postcode', safePostcode)}
  ${safeProperty ? row('Property type', safeProperty) : ''}
</table>
${safeMessage ? `<hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 1rem">
<p style="font-family:system-ui,sans-serif;font-size:15px;color:#555;margin:0 0 0.5rem"><strong>Additional details</strong></p>
<p style="font-family:system-ui,sans-serif;font-size:15px;color:#1f2937;line-height:1.6;margin:0">${safeMessage}</p>` : ''}
</body></html>`;

  // Send via Resend
  let resendRes: Response;
  try {
    resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'London BS Ltd Website <website@mail.londonbs.uk>',
        to: [env.CONTACT_TO_EMAIL],
        ...(email.trim() && isValidEmail(email.trim()) ? { reply_to: email.trim() } : {}),
        subject: `Website enquiry from ${safeName}`,
        html,
      }),
    });
  } catch (_err: unknown) {
    return json(
      { ok: false, error: 'Message could not be sent. Please call us directly on 07427 670610.' },
      502,
    );
  }

  if (!resendRes.ok) {
    return json(
      { ok: false, error: 'Message could not be sent. Please call us directly on 07427 670610.' },
      502,
    );
  }

  return json({ ok: true });
}
