import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  BookmarkCheck,
  ArrowRight,
  Layers,
  Sparkles,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { QuranCard } from '../components/QuranCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { useQuran } from '../context/QuranContext';
import { getSurahList } from '../services/quranService';
import { SURAH_LIST } from '../data/quranSurahs';
import { JUZ_LIST, POPULAR_SURAHS } from '../data/juzData';

export function Quran() {
  const { lastRead } = useQuran();
  const [surahs, setSurahs] = useState(SURAH_LIST);
  const [searchQuery, setSearchQuery] = useState('');
  const [mainTab, setMainTab] = useState('surah'); // 'surah' | 'juz' | 'popular'
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'makkiyah' | 'madaniyah'

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getSurahList();
        if (mounted && data) {
          setSurahs(data);
        }
      } catch (e) {
        // Fallback in surahs state
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const filteredSurahs = useMemo(() => {
    return surahs.filter((s) => {
      // Filter by Makkiyah / Madaniyah
      const tempat = (s.tempatTurun || '').toLowerCase();
      const isMakkiyah = tempat.includes('mek') || tempat.includes('mak');
      const isMadaniyah = tempat.includes('mad');

      if (activeFilter === 'makkiyah' && !isMakkiyah) return false;
      if (activeFilter === 'madaniyah' && !isMadaniyah) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchName = s.namaLatin.toLowerCase().includes(q);
        const matchArti = s.arti.toLowerCase().includes(q);
        const matchNumber = String(s.nomor) === q;
        return matchName || matchArti || matchNumber;
      }

      return true;
    });
  }, [surahs, activeFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="pt-2 sm:pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] dark:text-emerald-300 uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-amber-500" />
              Kitab Suci Al-Qur'an
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Mushaf & Terjemahan
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Standar Kementerian Agama Republik Indonesia (Kemenag RI) lengkap dengan audio murottal.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-emerald-950/5 dark:bg-[#14221f] text-[#064e3b] dark:text-emerald-300 border border-emerald-900/10 dark:border-emerald-500/20 shadow-2xs">
              114 Surah • 30 Juz • 6236 Ayat
            </span>
          </div>
        </div>
      </div>

      {/* Hero: Last Read Banner (If available) */}
      {lastRead && (
        <div className="p-4 sm:p-5 rounded-3xl bg-linear-to-r from-[#064e3b] via-[#043d2f] to-[#02281f] text-white shadow-lg border border-emerald-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md text-amber-300 flex items-center justify-center shrink-0 border border-white/15">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-200/90 uppercase tracking-wider font-semibold block">
                Terakhir Dibaca
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                {lastRead.surahName} <span className="text-amber-300 font-mono text-sm">• Ayat {lastRead.ayahNumber}</span>
              </h3>
            </div>
          </div>

          <Link
            to={`/quran/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}`}
            className="relative z-10 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-md active:scale-95 transition-all self-start sm:self-auto"
          >
            <span>Lanjut Membaca</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Main Navigation Tabs: Surah, Juz, Populer */}
      <div className="flex items-center gap-2 border-b border-emerald-950/8 dark:border-emerald-500/10 pb-2">
        <button
          onClick={() => setMainTab('surah')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            mainTab === 'surah'
              ? 'bg-[#064e3b] text-white shadow-xs'
              : 'bg-white dark:bg-[#0e1614] text-slate-600 dark:text-slate-400 hover:text-slate-900 border border-emerald-950/8 dark:border-emerald-500/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>114 Surah</span>
        </button>

        <button
          onClick={() => setMainTab('juz')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            mainTab === 'juz'
              ? 'bg-[#064e3b] text-white shadow-xs'
              : 'bg-white dark:bg-[#0e1614] text-slate-600 dark:text-slate-400 hover:text-slate-900 border border-emerald-950/8 dark:border-emerald-500/10'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>30 Juz</span>
        </button>

        <button
          onClick={() => setMainTab('popular')}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            mainTab === 'popular'
              ? 'bg-[#064e3b] text-white shadow-xs'
              : 'bg-white dark:bg-[#0e1614] text-slate-600 dark:text-slate-400 hover:text-slate-900 border border-emerald-950/8 dark:border-emerald-500/10'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Surah Pilihan</span>
        </button>
      </div>

      {/* ================= TAB 1: 114 SURAH ================= */}
      {mainTab === 'surah' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Cari nama surah, arti, atau nomor (cth: Al-Kahf, Yasin, 18)..."
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shrink-0 self-start sm:self-auto">
              {[
                { id: 'all', label: 'Semua (114)' },
                { id: 'makkiyah', label: 'Makkiyah' },
                { id: 'madaniyah', label: 'Madaniyah' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    activeFilter === tab.id
                      ? 'bg-white dark:bg-[#064e3b] text-[#064e3b] dark:text-white shadow-2xs font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Surahs Grid */}
          {filteredSurahs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredSurahs.map((surah) => (
                <QuranCard key={surah.nomor} surah={surah} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Search}
              title="Surah tidak ditemukan"
              description={`Tidak ada surah yang cocok dengan pencarian "${searchQuery}".`}
              actionText="Reset Pencarian"
              onAction={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
            />
          )}
        </div>
      )}

      {/* ================= TAB 2: 30 JUZ ================= */}
      {mainTab === 'juz' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {JUZ_LIST.map((j) => (
            <Link
              key={j.juz}
              to={`/quran/${j.startSurah}#ayah-${j.startAyah}`}
              className="p-5 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 hover:border-[#064e3b]/40 dark:hover:border-emerald-500/30 hover:shadow-lg transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#064e3b] text-white flex flex-col items-center justify-center font-bold shadow-xs">
                  <span className="text-[10px] text-amber-300 font-medium -mb-1">JUZ</span>
                  <span className="text-base font-mono">{j.juz}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-[#064e3b] dark:group-hover:text-emerald-300 transition-colors">
                    {j.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    QS. {j.startSurahName} : {j.startAyah} – QS. {j.endSurahName} : {j.endAyah}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#064e3b] dark:group-hover:text-emerald-300 group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      )}

      {/* ================= TAB 3: SURAH PILIHAN ================= */}
      {mainTab === 'popular' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POPULAR_SURAHS.map((surah) => (
            <Link
              key={surah.nomor}
              to={`/quran/${surah.nomor}`}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 hover:border-[#064e3b]/40 dark:hover:border-emerald-500/30 hover:shadow-lg transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                    {surah.nomor}
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-[#064e3b] dark:group-hover:text-emerald-300 transition-colors">
                      {surah.namaLatin}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {surah.arti} • {surah.jumlahAyat} Ayat
                    </p>
                  </div>
                </div>

                <span className="font-arabic text-2xl font-bold text-[#064e3b] dark:text-emerald-200">
                  {surah.nama}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-950/4 dark:bg-[#121c1a] border border-emerald-950/5 dark:border-emerald-500/10 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{surah.reason}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
