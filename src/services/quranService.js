import { API_CONFIG } from '../config/api';
import { SURAH_LIST } from '../data/quranSurahs';

// In-memory cache for loaded surahs to minimize network requests and maximize performance
const surahCache = new Map();

export async function getSurahList() {
  try {
    const response = await fetch(`${API_CONFIG.QURAN_PRIMARY}/surat`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const json = await response.json();
    if (json && json.data && Array.isArray(json.data) && json.data.length === 114) {
      return json.data;
    }
    return SURAH_LIST;
  } catch (err) {
    console.warn('Using local fallback for surah list:', err.message);
    return SURAH_LIST;
  }
}

export async function getSurahDetail(surahNumber) {
  const num = parseInt(surahNumber, 10);
  if (isNaN(num) || num < 1 || num > 114) {
    throw new Error('Nomor surah tidak valid (1-114)');
  }

  if (surahCache.has(num)) {
    return surahCache.get(num);
  }

  try {
    const response = await fetch(`${API_CONFIG.QURAN_PRIMARY}/surat/${num}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const json = await response.json();
    if (json && json.data) {
      surahCache.set(num, json.data);
      return json.data;
    }
    throw new Error('Format data tidak sesuai');
  } catch (err) {
    console.error(`Error loading surah ${num}:`, err);
    // Try fallback endpoint
    try {
      const fbRes = await fetch(`${API_CONFIG.QURAN_FALLBACK}/surahs/${num}`);
      if (fbRes.ok) {
        const fbData = await fbRes.json();
        // Transform to standard format
        const transformed = {
          nomor: fbData.number,
          nama: fbData.name,
          namaLatin: fbData.translation,
          jumlahAyat: fbData.numberOfAyahs,
          tempatTurun: fbData.revelation,
          arti: fbData.translation,
          deskripsi: fbData.tafsir?.id || '',
          audioFull: {
            '05': fbData.audio
          },
          ayat: fbData.ayahs?.map(a => ({
            nomorAyat: a.number?.inSurah,
            teksArab: a.arab,
            teksLatin: a.latin,
            teksIndonesia: a.translation,
            audio: {
              '05': a.audio?.alafasy
            }
          })) || []
        };
        surahCache.set(num, transformed);
        return transformed;
      }
    } catch {
      // Fallback failed too
    }
    throw new Error('Data surat Al-Qur\'an belum dapat dimuat. Pastikan koneksi internet aktif lalu coba lagi.');
  }
}

export async function getSurahTafsir(surahNumber) {
  try {
    const response = await fetch(`${API_CONFIG.QURAN_PRIMARY}/tafsir/${surahNumber}`);
    if (response.ok) {
      const json = await response.json();
      return json.data;
    }
  } catch (err) {
    console.warn('Tafsir fetch error:', err.message);
  }
  return null;
}

// Curated daily inspiring verses for the Homepage
export const CURATED_DAILY_VERSES = [
  {
    surahNumber: 2,
    surahName: 'Al-Baqarah',
    ayahNumber: 255,
    arab: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
    latin: 'Allaahu laa ilaaha illaa Huwal-Hayyul-Qayyuum, laa ta\'khudzuhuu sinatuw wa laa nawm, lahuu maa fis-samaawaati wa maa fil-ardh...',
    translation: 'Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi.',
    reference: 'QS. Al-Baqarah: 255 (Ayat Kursi)',
    tafsirSummary: 'Ayat paling agung dalam Al-Qur\'an yang menegaskan keesaan Allah, kesempurnaan hidup-Nya yang mutlak, dan kekuasaan-Nya yang meliputi seluruh langit dan bumi.'
  },
  {
    surahNumber: 94,
    surahName: 'Asy-Syarh',
    ayahNumber: 6,
    arab: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    latin: "Inna ma'al-'usri yusraa.",
    translation: 'Sesungguhnya beserta kesulitan itu ada kemudahan.',
    reference: 'QS. Asy-Syarh: 6',
    tafsirSummary: 'Penegasan dari Allah bahwa setiap kesulitan dan ujian hidup pasti disertai dengan jalan keluar dan kemudahan berlipat ganda.'
  },
  {
    surahNumber: 2,
    surahName: 'Al-Baqarah',
    ayahNumber: 286,
    arab: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    latin: "Laa yukallifullaahu nafsan illaa wus'ahaa.",
    translation: 'Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.',
    reference: 'QS. Al-Baqarah: 286',
    tafsirSummary: 'Prinsip kasih sayang syariat Islam bahwa semua perintah, larangan, dan ujian yang dihadapi manusia berada dalam batas kemampuannya.'
  },
  {
    surahNumber: 13,
    surahName: "Ar-Ra'd",
    ayahNumber: 28,
    arab: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    latin: 'Alaa bidzikrillaahi tathma-innul-quluub.',
    translation: 'Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.',
    reference: "QS. Ar-Ra'd: 28",
    tafsirSummary: 'Mengingat Allah melalui dzikir, sholat, dan tilawah Al-Qur\'an adalah penawar sejati bagi kegelisahan jiwa.'
  },
  {
    surahNumber: 65,
    surahName: 'At-Talaq',
    ayahNumber: 3,
    arab: 'وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    latin: 'Wa yarzuqhu min haytsu laa yahtasib, wa may yatawakkal \'alallaahi fahuwa hasbuh.',
    translation: 'Dan Dia memberinya rezeki dari arah yang tidak disangka-sangkanya. Dan barangsiapa bertawakal kepada Allah, niscaya Allah akan mencukupkan (keperluan)nya.',
    reference: 'QS. At-Talaq: 3',
    tafsirSummary: 'Jaminan kecukupan dan jalan rezeki yang tak terduga bagi orang-orang yang senantiasa bertakwa dan bertawakal sepenuhnya kepada Allah.'
  }
];

export function getTodayVerse() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const index = dayOfYear % CURATED_DAILY_VERSES.length;
  return CURATED_DAILY_VERSES[index];
}
