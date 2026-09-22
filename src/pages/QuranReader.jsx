import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Eye,
  Type,
  BookOpen
} from 'lucide-react';
import { AyahCard } from '../components/AyahCard';
import { QuranAudioPlayer } from '../components/QuranAudioPlayer';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { useQuran } from '../context/QuranContext';
import { useAudio } from '../context/AudioContext';
import { useSettings } from '../context/SettingsContext';
import { getSurahDetail } from '../services/quranService';
import { getAyahAudioUrl } from '../services/audioService';
import { toArabicNumerals } from '../utils/formatters';
import { ARABIC_FONT_SIZES } from '../config/api';
import { SURAH_LIST } from '../data/quranSurahs';

export function QuranReader() {
  const { surahId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { updateLastRead } = useQuran();
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  const { settings, updateSetting } = useSettings();

  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('verses'); // 'verses' | 'mushaf'
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [selectedAyahJump, setSelectedAyahJump] = useState('');

  const surahNum = parseInt(surahId, 10);
  const currentSurahMeta = SURAH_LIST.find(s => s.nomor === surahNum) || {
    nomor: surahNum,
    namaLatin: 'Surah',
    nama: 'القرآن',
    jumlahAyat: 0
  };

  const prevSurah = surahNum > 1 ? SURAH_LIST.find(s => s.nomor === surahNum - 1) : null;
  const nextSurah = surahNum < 114 ? SURAH_LIST.find(s => s.nomor === surahNum + 1) : null;

  // Fetch Surah Details
  const loadSurah = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSurahDetail(surahNum);
      setSurahData(data);

      // Record as Last Read
      updateLastRead({
        surahNumber: surahNum,
        surahName: data.namaLatin || currentSurahMeta.namaLatin,
        ayahNumber: 1,
        surahArabic: data.nama || currentSurahMeta.nama,
        totalAyah: data.jumlahAyat || currentSurahMeta.jumlahAyat
      });
    } catch (err) {
      setError(err.message || 'Gagal memuat surat Al-Qur\'an.');
    } finally {
      setLoading(false);
    }
  }, [surahNum, currentSurahMeta.namaLatin, currentSurahMeta.nama, currentSurahMeta.jumlahAyat, updateLastRead]);

  useEffect(() => {
    loadSurah();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loadSurah]);

  // Handle hash jump if user came from bookmark (e.g. #ayah-25)
  useEffect(() => {
    if (!loading && location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  }, [loading, location.hash]);

  // Play single Ayah audio handler
  const handlePlayAyah = (ayahNum) => {
    if (!surahData) return;

    const isThisPlaying =
      isPlaying &&
      currentTrack?.type === 'ayah' &&
      currentTrack?.surahNumber === surahNum &&
      currentTrack?.ayahNumber === ayahNum;

    if (isThisPlaying) {
      pauseTrack();
    } else {
      const audioUrl = getAyahAudioUrl(surahNum, ayahNum, settings.qari);
      const trackPayload = {
        id: `ayah_${surahNum}_${ayahNum}_${settings.qari}`,
        type: 'ayah',
        title: `QS. ${surahData.namaLatin}: ${ayahNum}`,
        surahNumber: surahNum,
        ayahNumber: ayahNum,
        qariId: settings.qari,
        src: audioUrl,
        onEnded: () => {
          // Auto advance to next ayah if available
          if (ayahNum < surahData.jumlahAyat) {
            const nextAyahNum = ayahNum + 1;
            handlePlayAyah(nextAyahNum);
            const nextEl = document.getElementById(`ayah-${nextAyahNum}`);
            if (nextEl) {
              nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Update Last Read
            updateLastRead({
              surahNumber: surahNum,
              surahName: surahData.namaLatin,
              ayahNumber: nextAyahNum,
              surahArabic: surahData.nama,
              totalAyah: surahData.jumlahAyat
            });
          }
        }
      };

      playTrack(trackPayload);

      // Update Last Read
      updateLastRead({
        surahNumber: surahNum,
        surahName: surahData.namaLatin,
        ayahNumber: ayahNum,
        surahArabic: surahData.nama,
        totalAyah: surahData.jumlahAyat
      });
    }
  };

  const handleJumpToAyah = (val) => {
    const num = parseInt(val, 10);
    if (!num) return;
    setSelectedAyahJump(val);
    const el = document.getElementById(`ayah-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (loading) {
    return (
      <div className="py-24">
        <LoadingState message={`Memuat Surah ${currentSurahMeta.namaLatin}...`} size="lg" />
      </div>
    );
  }

  if (error || !surahData) {
    return (
      <div className="py-16 max-w-xl mx-auto">
        <ErrorState message={error} onRetry={loadSurah} />
      </div>
    );
  }

  const showBasmalah = surahNum !== 9 && surahNum !== 1;
  const fontSizeConfig = ARABIC_FONT_SIZES[settings.arabicFontSize] || ARABIC_FONT_SIZES.medium;

  return (
    <div className="max-w-4xl mx-auto pb-24 space-y-6">
      {/* Top Sticky Quick Navigation Bar */}
      <div className="sticky top-14 sm:top-16 z-30 py-2.5 -mx-2 px-2 backdrop-blur-md bg-[#faf8f5]/90 dark:bg-[#071311]/90 flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-200/60 dark:border-slate-800/60">
        <button
          onClick={() => navigate('/quran')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0f1513] text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-600 dark:hover:border-emerald-500 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>Daftar Surah</span>
        </button>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-200/70 dark:bg-[#0f1513] border border-slate-200/80 dark:border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('verses')}
              className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                viewMode === 'verses'
                  ? 'bg-white dark:bg-emerald-800/80 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Mode Ayat
            </button>
            <button
              onClick={() => setViewMode('mushaf')}
              className={`px-3 py-1 font-semibold rounded-lg transition-all ${
                viewMode === 'mushaf'
                  ? 'bg-white dark:bg-emerald-800/80 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Mushaf
            </button>
          </div>

          {/* Jump to Ayah Dropdown */}
          <select
            value={selectedAyahJump}
            onChange={(e) => handleJumpToAyah(e.target.value)}
            aria-label="Lompat ke ayat"
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0f1513] border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-emerald-600"
          >
            <option value="">Lompat Ayat</option>
            {Array.from({ length: surahData.jumlahAyat }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                Ayat {n}
              </option>
            ))}
          </select>

          {/* Quick Settings Toggle */}
          <button
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            aria-label="Pengaturan Baca"
            className={`p-2 rounded-xl border transition-colors ${
              showSettingsDrawer
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-white dark:bg-[#0f1513] border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400'
            }`}
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reading Settings Drawer */}
      {showSettingsDrawer && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0f1513] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Pengaturan Tampilan
            </h4>
            <button
              onClick={() => setShowSettingsDrawer(false)}
              className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Tutup ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Arabic Font Size */}
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1.5">
                Ukuran Teks Arab
              </label>
              <div className="flex items-center gap-1.5">
                {[
                  { key: 'small', label: 'S' },
                  { key: 'medium', label: 'M' },
                  { key: 'large', label: 'L' },
                  { key: 'xlarge', label: 'XL' }
                ].map((size) => (
                  <button
                    key={size.key}
                    onClick={() => updateSetting('arabicFontSize', size.key)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      settings.arabicFontSize === size.key
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Translation Toggle */}
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1.5">
                Terjemahan Bahasa
              </label>
              <button
                onClick={() => updateSetting('showTranslation', !settings.showTranslation)}
                className={`w-full py-1.5 px-3 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                  settings.showTranslation
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{settings.showTranslation ? 'Terjemahan: Aktif' : 'Terjemahan: Nonaktif'}</span>
              </button>
            </div>

            {/* Latin Transliteration Toggle */}
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1.5">
                Teks Latin
              </label>
              <button
                onClick={() => updateSetting('showLatin', !settings.showLatin)}
                className={`w-full py-1.5 px-3 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                  settings.showLatin
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>{settings.showLatin ? 'Latin: Aktif' : 'Latin: Nonaktif'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Surah Header Card (Clean, Minimalist & Elegant) */}
      <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0f1513] border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 text-center shadow-2xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 mb-3">
          <span>Surah ke-{surahData.nomor}</span>
          <span>•</span>
          <span>{surahData.tempatTurun}</span>
          <span>•</span>
          <span>{surahData.jumlahAyat} Ayat</span>
        </div>

        <h1 className="font-arabic text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 py-2">
          {surahData.nama}
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">
          {surahData.namaLatin}
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          "{surahData.arti}"
        </p>

        {/* Integrated Audio Player */}
        <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800/60">
          <QuranAudioPlayer surah={surahData} />
        </div>
      </div>

      {/* Basmalah */}
      {showBasmalah && (
        <div className="py-4 text-center">
          <div className="inline-block px-6 py-4 rounded-2xl bg-white dark:bg-[#0f1513] border border-slate-200/70 dark:border-slate-800/80 shadow-2xs">
            <p className="font-arabic text-2xl sm:text-3xl text-slate-900 dark:text-slate-50 leading-loose">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang
            </p>
          </div>
        </div>
      )}

      {/* ================= VIEW 1: VERSES CARD VIEW ================= */}
      {viewMode === 'verses' && (
        <div className="space-y-3 sm:space-y-4">
          {surahData.ayat?.map((ayah) => {
            const isThisPlaying =
              isPlaying &&
              currentTrack?.type === 'ayah' &&
              currentTrack?.surahNumber === surahNum &&
              currentTrack?.ayahNumber === ayah.nomorAyat;

            return (
              <AyahCard
                key={ayah.nomorAyat}
                surahNumber={surahNum}
                surahName={surahData.namaLatin}
                ayah={ayah}
                isPlayingThisAyah={isThisPlaying}
                onPlayAyah={handlePlayAyah}
              />
            );
          })}
        </div>
      )}

      {/* ================= VIEW 2: CONTINUOUS MUSHAF VIEW ================= */}
      {viewMode === 'mushaf' && (
        <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0f1513] border border-slate-200/80 dark:border-slate-800/80 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/60 text-xs text-slate-400 font-medium">
            <span>Mushaf Standar Indonesia</span>
            <span>QS. {surahData.namaLatin}</span>
          </div>

          <p className={`font-arabic text-slate-900 dark:text-slate-50 ${fontSizeConfig.class} leading-[3.2] text-justify`}>
            {surahData.ayat?.map((ayah) => (
              <span key={ayah.nomorAyat} className="inline">
                {ayah.teksArab}{' '}
                <span className="inline-flex items-center justify-center w-8 h-8 mx-1.5 align-middle text-sm font-arabic font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-600/20 dark:border-emerald-500/20 rounded-full select-none">
                  {toArabicNumerals(ayah.nomorAyat)}
                </span>{' '}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Bottom Surah Navigation */}
      <div className="pt-6 flex items-center justify-between gap-4 border-t border-slate-200/60 dark:border-slate-800/60">
        {prevSurah ? (
          <Link
            to={`/quran/${prevSurah.nomor}`}
            className="flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-xl bg-white dark:bg-[#0f1513] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-600 dark:hover:border-emerald-500 text-slate-800 dark:text-slate-200 shadow-2xs transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-700 dark:text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-slate-400 uppercase block">Sebelumnya</span>
              <span className="text-xs font-semibold">{prevSurah.namaLatin}</span>
            </div>
          </Link>
        ) : <div />}

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
        >
          Kembali ke Atas ↑
        </button>

        {nextSurah ? (
          <Link
            to={`/quran/${nextSurah.nomor}`}
            className="flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-xl bg-white dark:bg-[#0f1513] border border-slate-200/80 dark:border-slate-800 hover:border-emerald-600 dark:hover:border-emerald-500 text-slate-800 dark:text-slate-200 shadow-2xs transition-colors group"
          >
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 uppercase block">Berikutnya</span>
              <span className="text-xs font-semibold">{nextSurah.namaLatin}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-700 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
