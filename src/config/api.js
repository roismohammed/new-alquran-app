// API Base URLs
export const API_CONFIG = {
  QURAN_PRIMARY: import.meta.env.VITE_QURAN_API_URL || 'https://equran.id/api/v2',
  QURAN_FALLBACK: 'https://quran-api-id.vercel.app',
  PRAYER_API: import.meta.env.VITE_PRAYER_API_URL || 'https://api.aladhan.com/v1',
  MYQURAN_API: 'https://api.myquran.com/v2'
};

export const QARI_LIST = [
  {
    id: '05',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري راشد العفاسي',
    audioKey: '05',
    cdnPath: 'Misyari-Rasyid-Al-Afasi',
    everyAyahIdentifier: 'Alafasy_128kbps'
  },
  {
    id: '03',
    name: 'Abdurrahman As-Sudais',
    arabicName: 'عبد الرحمن السديس',
    audioKey: '03',
    cdnPath: 'Abdurrahman-as-Sudais',
    everyAyahIdentifier: 'Abdurrahmaan_As-Sudais_192kbps'
  },
  {
    id: '01',
    name: 'Abdullah Al-Juhany',
    arabicName: 'عبد الله الجهني',
    audioKey: '01',
    cdnPath: 'Abdullah-Al-Juhany',
    everyAyahIdentifier: 'Abdullah_Basfar_192kbps'
  },
  {
    id: '02',
    name: 'Abdul Muhsin Al-Qasim',
    arabicName: 'عبد المحسن القاسم',
    audioKey: '02',
    cdnPath: 'Abdul-Muhsin-Al-Qasim',
    everyAyahIdentifier: 'Abdul_Basit_Murattal_192kbps'
  },
  {
    id: '04',
    name: 'Ibrahim Al-Dossari',
    arabicName: 'إبراهيم الدوسري',
    audioKey: '04',
    cdnPath: 'Ibrahim-Al-Dossari',
    everyAyahIdentifier: 'Ibrahim_Akhdar_32kbps'
  },
  {
    id: '06',
    name: 'Yasser Al-Dosari',
    arabicName: 'ياسر الدوسري',
    audioKey: '06',
    cdnPath: 'Yasser-Al-Dosari',
    everyAyahIdentifier: 'Yasser_Ad-Dussary_128kbps'
  }
];

export const ARABIC_FONT_SIZES = {
  small: { label: 'Kecil', class: 'text-2xl md:text-3xl leading-[2.2]' },
  medium: { label: 'Sedang', class: 'text-3xl md:text-4xl leading-[2.3]' },
  large: { label: 'Besar', class: 'text-4xl md:text-5xl leading-[2.4]' },
  xlarge: { label: 'Sangat Besar', class: 'text-5xl md:text-6xl leading-[2.6]' }
};

export const PRAYER_NAMES_ID = {
  Fajr: 'Subuh',
  Sunrise: 'Terbit',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Sunset: 'Terbenam',
  Maghrib: 'Maghrib',
  Isha: 'Isya',
  Imsak: 'Imsak'
};
