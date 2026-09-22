// Kaaba coordinates in Makkah
export const KAABA_COORDS = {
  lat: 21.422487,
  lng: 39.826206
};

// Calculate Qibla bearing in degrees from true North using Great Circle Forward Azimuth Formula
export function calculateQiblaAngle(latitude, longitude) {
  const phiK = (KAABA_COORDS.lat * Math.PI) / 180;
  const lambdaK = (KAABA_COORDS.lng * Math.PI) / 180;
  const phi = (latitude * Math.PI) / 180;
  const lambda = (longitude * Math.PI) / 180;

  const numerator = Math.sin(lambdaK - lambda);
  const denominator = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);

  let qiblaRad = Math.atan2(numerator, denominator);
  let qiblaDeg = (qiblaRad * 180) / Math.PI;

  // Normalize to 0 - 360
  qiblaDeg = (qiblaDeg + 360) % 360;
  return Math.round(qiblaDeg * 10) / 10;
}

// Calculate distance to Kaaba using Haversine formula (km)
export function calculateDistanceToKaaba(latitude, longitude) {
  const R = 6371; // Earth radius in km
  const dLat = ((KAABA_COORDS.lat - latitude) * Math.PI) / 180;
  const dLng = ((KAABA_COORDS.lng - longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude * Math.PI) / 180) *
      Math.cos((KAABA_COORDS.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
