import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Heart, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { SURAH_LIST } from '../data/quranSurahs';
import { DUAS_DATA } from '../data/duas';
import { DHIKR_PRESETS } from '../data/dhikrData';
import { ASMAUL_HUSNA } from '../data/asmaulHusna';

export function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered search results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedSurahs = SURAH_LIST.filter(
      s => s.namaLatin.toLowerCase().includes(q) ||
           s.arti.toLowerCase().includes(q) ||
           String(s.nomor) === q
    ).slice(0, 5);

    const matchedDuas = DUAS_DATA.filter(
      d => d.title.toLowerCase().includes(q) ||
           d.latin.toLowerCase().includes(q) ||
           d.terjemahan.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedDhikr = DHIKR_PRESETS.filter(
      dk => dk.name.toLowerCase().includes(q) ||
            dk.latin.toLowerCase().includes(q) ||
            dk.arti.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedAsmaul = ASMAUL_HUSNA.filter(
      a => a.latin.toLowerCase().includes(q) ||
           a.arti.toLowerCase().includes(q) ||
           String(a.id) === q
    ).slice(0, 5);

    return {
      surahs: matchedSurahs,
      duas: matchedDuas,
      dhikr: matchedDhikr,
      asmaul: matchedAsmaul,
      total: matchedSurahs.length + matchedDuas.length + matchedDhikr.length + matchedAsmaul.length
    };
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url) => {
    navigate(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#0b1d1a] border border-emerald-950/15 dark:border-emerald-500/20 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-emerald-950/8 dark:border-emerald-500/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#064e3b] dark:text-emerald-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari surah, doa, dzikir, atau Asmaul Husna..."
            autoFocus
            className="w-full bg-transparent text-sm md:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-950/5 dark:bg-emerald-900/40 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-emerald-900/10"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {!query ? (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs sm:text-sm">
              <p>Ketik nama surah (cth: "Al-Kahf"), doa (cth: "Orang Tua"), atau Asmaul Husna (cth: "Ar-Rahman")</p>
            </div>
          ) : results.total === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              Tidak ditemukan hasil untuk "{query}"
            </div>
          ) : (
            <>
              {/* Surahs */}
              {results.surahs.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#064e3b] dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    Al-Qur'an
                  </div>
                  <div className="space-y-1">
                    {results.surahs.map((s) => (
                      <button
                        key={s.nomor}
                        onClick={() => handleSelect(`/quran/${s.nomor}`)}
                        className="w-full p-2.5 rounded-xl text-left flex items-center justify-between hover:bg-emerald-950/5 dark:hover:bg-emerald-900/30 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-emerald-950/5 dark:bg-emerald-900/40 text-[#064e3b] dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                            {s.nomor}
                          </span>
                          <div>
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#064e3b] dark:group-hover:text-emerald-300">
                              {s.namaLatin}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {s.arti} • {s.jumlahAyat} Ayat
                            </div>
                          </div>
                        </div>
                        <span className="font-arabic text-lg text-emerald-950 dark:text-emerald-100">
                          {s.nama}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Duas */}
              {results.duas.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#064e3b] dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-amber-500" />
                    Doa Harian
                  </div>
                  <div className="space-y-1">
                    {results.duas.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => handleSelect(`/dua?id=${d.id}`)}
                        className="w-full p-2.5 rounded-xl text-left flex items-center justify-between hover:bg-emerald-950/5 dark:hover:bg-emerald-900/30 transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#064e3b] dark:group-hover:text-emerald-300">
                            {d.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {d.terjemahan}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Asmaul Husna */}
              {results.asmaul.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#064e3b] dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Asmaul Husna
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {results.asmaul.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => handleSelect(`/asmaul-husna?id=${a.id}`)}
                        className="p-2.5 rounded-xl text-left flex items-center justify-between hover:bg-emerald-950/5 dark:hover:bg-emerald-900/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#064e3b] dark:text-emerald-400">
                            {a.id}.
                          </span>
                          <div>
                            <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                              {a.latin}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {a.arti}
                            </div>
                          </div>
                        </div>
                        <span className="font-arabic text-base text-emerald-950 dark:text-emerald-100">
                          {a.arab}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dhikr */}
              {results.dhikr.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#064e3b] dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-500" />
                    Dzikir & Tasbih
                  </div>
                  <div className="space-y-1">
                    {results.dhikr.map((dk) => (
                      <button
                        key={dk.id}
                        onClick={() => handleSelect(`/dhikr?preset=${dk.id}`)}
                        className="w-full p-2.5 rounded-xl text-left flex items-center justify-between hover:bg-emerald-950/5 dark:hover:bg-emerald-900/30 transition-colors group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#064e3b] dark:group-hover:text-emerald-300">
                            {dk.name} ({dk.latin})
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {dk.arti} • Target: {dk.target}x
                          </div>
                        </div>
                        <span className="font-arabic text-base text-emerald-950 dark:text-emerald-100">
                          {dk.arab}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
