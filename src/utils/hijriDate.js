// Hijri Date Formatter & Estimator using Intl and fallback algorithms
const HIJRI_MONTHS = [
  'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
  'Jumadil Awal', 'Jumadil Akhir', 'Rajab', "Sya'ban",
  'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
];

const GREGORIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const DAYS_ID = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
];

export function getFormattedGregorianDate(date = new Date()) {
  const dayName = DAYS_ID[date.getDay()];
  const day = date.getDate();
  const month = GREGORIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}, ${day} ${month} ${year}`;
}

export function getFormattedHijriDate(date = new Date(), adjustment = 0) {
  try {
    // Try Intl DateTimeFormat with islamic-umalqura calendar
    const adjustedDate = new Date(date.getTime() + adjustment * 86400000);
    const formatter = new Intl.DateTimeFormat('id-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });

    const parts = formatter.formatToParts(adjustedDate);
    let day = '', monthNum = '', year = '';

    parts.forEach(p => {
      if (p.type === 'day') day = p.value;
      if (p.type === 'month') monthNum = parseInt(p.value, 10);
      if (p.type === 'year') year = p.value;
    });

    if (monthNum && monthNum >= 1 && monthNum <= 12) {
      const monthName = HIJRI_MONTHS[monthNum - 1];
      return `${day} ${monthName} ${year} H`;
    }
  } catch {
    // Fallback algorithmic calculation if Intl is unavailable
  }

  // Fallback Hijri computation approximation
  const jd = Math.floor((date.getTime() / 86400000) + 2440587.5 + adjustment);
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) + (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
  const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const m = Math.floor((24 * l3) / 709);
  const d = l3 - Math.floor((709 * m) / 24);
  const y = 30 * n + j - 30;

  const monthName = HIJRI_MONTHS[Math.max(0, Math.min(11, m - 1))] || 'Rabiul Awal';
  return `${d} ${monthName} ${y} H`;
}
