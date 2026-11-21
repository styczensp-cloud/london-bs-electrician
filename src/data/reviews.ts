// Single source of truth for review figures shown on the site and in JSON-LD.
// Update the numbers here only; never hardcode them in pages or components.

export const googleReviews = {
  rating: 5.0,
  count: 66,
  url: 'https://share.google/Z7Pnd7y12j1YaVYW0',
};

export const ratedPeopleReviews = {
  rating: 5.0,
  count: 75,
  url: 'https://www.ratedpeople.com/profile/handyman-service-borehamwood',
};

// Display helper: 5 -> "5.0"
export const formatRating = (rating: number) => rating.toFixed(1);
