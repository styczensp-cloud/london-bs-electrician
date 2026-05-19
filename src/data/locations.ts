export interface LocationFAQ {
  q: string;
  a: string;
}

export interface LocationData {
  name: string;
  slug: string;
  postcode: string;
  county: string;
  nearbyAreas: string[];
  title: string;
  metaDescription: string;
  intro: string;
  eicrText: string;
  consumerUnitText: string;
  faultFindingText: string;
  rewiresText: string;
  emergencyText: string;
  faqs: LocationFAQ[];
}

export const locations: LocationData[] = [
  {
    name: 'Dunstable',
    slug: 'electrician-dunstable',
    postcode: 'LU6',
    county: 'Bedfordshire',
    nearbyAreas: ['Houghton Regis', 'Leighton Buzzard', 'Luton', 'Toddington'],
    title: 'Electrician in Dunstable | EICR Reports & Rewires | London BS Ltd',
    metaDescription: 'London BS Ltd provides electrical work in Dunstable — EICR reports, consumer unit upgrades, fault finding, rewires and emergency electrical work. NICEIC registered, based in LU6.',
    intro: 'London BS Ltd is based in Dunstable and covers the local LU6 area for all electrical work — EICR reports, consumer unit upgrades, rewires, fault finding and emergency electrical faults. As a locally based contractor, we can typically attend promptly and know the area well.',
    eicrText: 'Dunstable has a significant private rental market, and landlords across LU6 are legally required to hold a valid EICR renewed every five years. We carry out EICR reports for rental properties, residential homes, and commercial premises throughout Dunstable — issuing the completed report on the day of inspection.',
    consumerUnitText: 'Many properties in Dunstable — particularly pre-1990s semi-detached and terraced housing — still have older fuseboards without adequate RCD protection. This is a common failure point on any EICR. We replace outdated consumer units across LU6, fitting modern boards with appropriate RCD and RCBO protection.',
    faultFindingText: 'Electrical faults can be intermittent and frustrating to trace. We carry out methodical fault finding across Dunstable properties — from repeatedly tripping RCDs and dead circuits to partial power loss — identifying the root cause and carrying out a lasting repair rather than a temporary fix.',
    rewiresText: 'Older properties throughout Dunstable — particularly pre-1970s housing — can have deteriorated wiring that no longer meets current standards. We carry out full and partial house rewires in Dunstable, completing all required certification on conclusion of the work.',
    emergencyText: 'For urgent electrical problems in Dunstable — total loss of power, circuits that will not reset, burning smells or any suspected unsafe fault — contact us directly by phone. Being based in LU6, we can usually attend the same day.',
    faqs: [
      { q: 'Do you carry out EICR reports in Dunstable?', a: 'Yes. We carry out EICR reports for residential and rental properties throughout Dunstable and the LU6 area. The completed report is issued on the day of inspection.' },
      { q: 'Do you replace consumer units in Dunstable?', a: 'Yes. We replace outdated fuseboards and consumer units in Dunstable, fitting modern units with RCD and RCBO protection to current standards.' },
      { q: 'Can you attend electrical emergencies in Dunstable?', a: 'Yes. We are based in Dunstable and can typically attend the same day for urgent electrical faults. Call us directly on 07427 670610.' },
      { q: 'Do you carry out work for landlords in Dunstable?', a: 'Yes. We work with private landlords and letting agents in Dunstable for EICR reports, fault rectification, consumer unit upgrades and rewires.' },
      { q: 'Which areas near Dunstable do you cover?', a: 'We cover Houghton Regis, Leighton Buzzard, Luton, Toddington and surrounding areas as standard, with Milton Keynes also covered.' },
    ],
  },

  {
    name: 'Luton',
    slug: 'electrician-luton',
    postcode: 'LU1–LU4',
    county: 'Bedfordshire',
    nearbyAreas: ['Dunstable', 'Houghton Regis', 'Harpenden', 'St Albans', 'Hemel Hempstead'],
    title: 'Electrician in Luton | EICR Reports, Rewires & Consumer Units | London BS Ltd',
    metaDescription: 'London BS Ltd provides electrical work in Luton — EICR reports, consumer unit upgrades, fault finding, rewires and emergency electrical work across LU1, LU2, LU3 and LU4.',
    intro: 'London BS Ltd provides electrical services across Luton, covering residential and commercial properties throughout LU1, LU2, LU3 and LU4. We carry out EICR reports, consumer unit upgrades, fault finding, rewires and electrical work for homeowners, landlords and businesses.',
    eicrText: 'Luton has one of the largest private rental sectors in the region, and landlords across LU1 to LU4 are legally required to hold a valid five-year EICR. We issue EICR reports for rental properties and residential homes throughout Luton, providing the completed report the same day. We also carry out landlord EICRs for letting agents managing multiple properties.',
    consumerUnitText: "Luton's housing stock includes a large number of older terraced and semi-detached properties — many still fitted with fuseboards that lack adequate RCD protection. We carry out consumer unit replacements throughout Luton, fitting modern boards with full RCD and RCBO protection to meet current electrical standards.",
    faultFindingText: 'We trace and diagnose electrical faults across Luton properties — from intermittent RCD tripping and dead circuits to partial power loss and failed circuits. We work methodically to establish the root cause and carry out a lasting repair, rather than masking the fault.',
    rewiresText: 'Pre-war and post-war housing across Luton frequently has wiring that no longer meets current standards. We carry out full and partial rewires in Luton, completing all required certification — including an Electrical Installation Certificate and Building Control notification — on conclusion of the work.',
    emergencyText: 'For urgent electrical issues in Luton — sudden loss of power, repeatedly tripping circuits, burning smells or suspected unsafe faults — call us directly. We aim to attend promptly for electrical emergencies in the LU postcode area.',
    faqs: [
      { q: 'Do you carry out EICR reports in Luton?', a: 'Yes. We issue EICR reports for residential and rental properties throughout Luton — LU1, LU2, LU3 and LU4. Reports are issued on the day of inspection.' },
      { q: 'Do you replace consumer units in Luton?', a: 'Yes. We replace fuseboards and consumer units across Luton, fitting modern boards with appropriate RCD and RCBO protection.' },
      { q: 'Can you cover electrical emergencies in Luton?', a: 'Yes. For urgent electrical issues in Luton, call us directly on 07427 670610. We aim to attend promptly.' },
      { q: 'Do you work for Luton landlords and letting agents?', a: 'Yes. We carry out EICR reports and electrical work for private landlords and letting agents managing properties across Luton.' },
      { q: 'Which Luton postcodes do you cover?', a: 'We cover LU1, LU2, LU3 and LU4 across Luton. We also cover nearby Dunstable (LU6) and Leighton Buzzard (LU7) as standard.' },
    ],
  },

  {
    name: 'Milton Keynes',
    slug: 'electrician-milton-keynes',
    postcode: 'MK',
    county: 'Buckinghamshire',
    nearbyAreas: ['Bletchley', 'Newport Pagnell', 'Woburn Sands', 'Bedford', 'Dunstable'],
    title: 'Electrician in Milton Keynes | EICR Reports & Electrical Work | London BS Ltd',
    metaDescription: 'London BS Ltd provides electrical work in Milton Keynes — EICR reports, consumer unit upgrades, fault finding, rewires and emergency electrical work across MK postcodes.',
    intro: 'London BS Ltd covers Milton Keynes and surrounding MK postcodes for EICR reports, consumer unit upgrades, rewires, fault finding and electrical work. We serve both residential properties and commercial premises across Milton Keynes, including Bletchley, Newport Pagnell and Central MK.',
    eicrText: 'Milton Keynes has a large and growing rental market. Landlords across MK postcodes are required to hold a valid EICR renewed every five years or at the start of a new tenancy. We carry out EICR reports for rental and residential properties in Milton Keynes, providing the completed report the same day.',
    consumerUnitText: 'Much of the housing built during Milton Keynes new town development in the 1970s and 1980s may now require consumer unit upgrades to meet current safety standards. We carry out consumer unit replacements across MK — including dual-RCD and full RCBO configurations — and certify all work on completion.',
    faultFindingText: 'We diagnose electrical faults across Milton Keynes properties, covering intermittent faults, circuit failures, RCD tripping and partial power loss. We work systematically to identify root causes and carry out effective, lasting repairs across both residential and commercial premises.',
    rewiresText: 'Older MK properties and those with piecemeal additions to the electrical installation may benefit from a full or partial rewire. We carry out house rewires in Milton Keynes and issue all required certification — Electrical Installation Certificate and Building Control notification — on completion.',
    emergencyText: 'For emergency electrical issues in Milton Keynes — sudden loss of power, circuit failures that will not reset, or urgent suspected faults — contact us directly by phone. We cover MK postcodes and aim to attend as quickly as possible.',
    faqs: [
      { q: 'Do you cover Milton Keynes for EICR reports?', a: 'Yes. We provide EICR reports for residential and rental properties across Milton Keynes and MK postcodes. Reports are issued on the day of inspection.' },
      { q: 'Do you replace consumer units in Milton Keynes?', a: 'Yes. We carry out consumer unit replacements across Milton Keynes, including both older properties and those built during the new town development.' },
      { q: 'Do you cover electrical emergencies in Milton Keynes?', a: 'Yes. Call us directly on 07427 670610 for urgent electrical issues in Milton Keynes.' },
      { q: 'Do you work in commercial properties in Milton Keynes?', a: 'Yes. We carry out electrical work for both domestic and commercial premises across Milton Keynes.' },
      { q: 'Do you cover Bletchley and other MK areas?', a: 'Yes. We cover Bletchley, Newport Pagnell, Woburn Sands and areas across the Milton Keynes borough.' },
    ],
  },

  {
    name: 'Leighton Buzzard',
    slug: 'electrician-leighton-buzzard',
    postcode: 'LU7',
    county: 'Bedfordshire',
    nearbyAreas: ['Dunstable', 'Houghton Regis', 'Luton', 'Toddington', 'Flitwick'],
    title: 'Electrician in Leighton Buzzard | EICR Reports & Consumer Units | London BS Ltd',
    metaDescription: 'London BS Ltd provides electrical work in Leighton Buzzard — EICR reports, consumer unit upgrades, fault finding, rewires and emergency electrical work across LU7.',
    intro: 'London BS Ltd provides electrical services in Leighton Buzzard and across the LU7 area, including EICR reports, consumer unit upgrades, fault finding, rewires and emergency electrical work. Leighton Buzzard is a short distance from our base in Dunstable, and we cover the town and surrounding villages regularly.',
    eicrText: 'Landlords in Leighton Buzzard are required to hold a valid EICR for their rental properties, renewed every five years or at the start of a new tenancy. We carry out EICR reports for residential and rental properties throughout LU7 — covering the town itself, surrounding villages, and rural addresses.',
    consumerUnitText: 'Properties in Leighton Buzzard — particularly older town-centre housing and interwar terraces — may still have fuseboards without proper RCD protection. We replace consumer units throughout LU7, fitting modern boards with appropriate protection and issuing a full Electrical Installation Certificate on completion.',
    faultFindingText: 'We trace electrical faults in Leighton Buzzard properties, providing clear diagnosis and effective repairs. Faults may be straightforward or intermittent — we approach each methodically and keep you informed throughout. Being based nearby in Dunstable, we can usually attend promptly.',
    rewiresText: 'We carry out full and partial house rewires in Leighton Buzzard for properties with ageing or non-compliant wiring. All work is certified on completion, including the Electrical Installation Certificate and Building Control notification where required.',
    emergencyText: 'For urgent electrical faults in Leighton Buzzard, contact us directly by phone. Being based in nearby Dunstable, we can typically attend without significant delay for emergency electrical issues across LU7.',
    faqs: [
      { q: 'Do you provide EICR reports in Leighton Buzzard?', a: 'Yes. We carry out EICR reports for properties in Leighton Buzzard and across the LU7 area, including rural and village addresses.' },
      { q: 'Do you replace consumer units in Leighton Buzzard?', a: 'Yes. We replace outdated fuseboards and consumer units across LU7, with full certification on completion.' },
      { q: 'Can you attend quickly for emergencies in Leighton Buzzard?', a: 'Yes. We are based in nearby Dunstable and can typically attend for electrical emergencies in Leighton Buzzard without significant delay.' },
      { q: 'Do you carry out house rewires in Leighton Buzzard?', a: 'Yes. We carry out full and partial rewires in Leighton Buzzard, with all required certification issued on completion.' },
      { q: 'Do you cover villages around Leighton Buzzard?', a: 'Yes. We cover villages and rural addresses in the LU7 area, including Toddington, Hockliffe and surrounding areas.' },
    ],
  },

  {
    name: 'Houghton Regis',
    slug: 'electrician-houghton-regis',
    postcode: 'LU5',
    county: 'Bedfordshire',
    nearbyAreas: ['Dunstable', 'Luton', 'Leighton Buzzard', 'Toddington', 'Flitwick'],
    title: 'Electrician in Houghton Regis | EICR Reports & Electrical Work | London BS Ltd',
    metaDescription: 'London BS Ltd provides electrical work in Houghton Regis — EICR reports, consumer unit upgrades, fault finding, rewires and emergency electrical work across LU5.',
    intro: 'London BS Ltd covers Houghton Regis for EICR reports, consumer unit upgrades, fault finding, house rewires and electrical work. Houghton Regis is adjacent to Dunstable — where we are based — and we cover the area regularly, including the established LU5 housing stock and the newer North Houghton Regis developments.',
    eicrText: 'We carry out EICR reports for residential and rental properties throughout Houghton Regis — including both older established housing in LU5 and newer properties on recent developments. Reports are issued on the day of inspection. Landlords in Houghton Regis must hold a valid five-year EICR under current legislation.',
    consumerUnitText: 'We replace consumer units and fuseboards across Houghton Regis for both older properties and more recently built homes where previous installation work requires updating. All work is carried out to current standards and certified with an Electrical Installation Certificate on completion.',
    faultFindingText: 'We carry out fault finding in Houghton Regis for all types of electrical fault — from tripping RCDs and partial power loss to failed circuits and intermittent issues. Our base in adjacent Dunstable means we can usually attend quickly, and we report our findings clearly before carrying out any repair.',
    rewiresText: 'We carry out house rewires in Houghton Regis for older properties where wiring has deteriorated or no longer meets current standards. Work is fully certificated, and any notifiable work is handled with Building Control directly.',
    emergencyText: 'For emergency electrical issues in Houghton Regis, contact us directly by phone. We are based in Dunstable — directly adjacent to Houghton Regis — and can typically attend quickly for urgent electrical faults.',
    faqs: [
      { q: 'Do you cover EICR reports in Houghton Regis?', a: 'Yes. We provide EICR reports for residential and rental properties throughout Houghton Regis and LU5. Reports are issued on the day of inspection.' },
      { q: 'Do you replace consumer units in Houghton Regis?', a: 'Yes. We carry out consumer unit upgrades across Houghton Regis for both older housing and newer properties.' },
      { q: 'Can you attend quickly for emergencies in Houghton Regis?', a: 'Yes. We are based in Dunstable, directly adjacent to Houghton Regis, and can typically attend quickly for electrical emergencies.' },
      { q: 'Do you cover the North Houghton Regis development?', a: 'Yes. We cover all areas of Houghton Regis including the North Houghton Regis development and new-build properties.' },
      { q: 'Do you cover areas near Houghton Regis?', a: 'Yes. We also cover Dunstable, Luton, Leighton Buzzard, Toddington, Flitwick and Milton Keynes.' },
    ],
  },
];
