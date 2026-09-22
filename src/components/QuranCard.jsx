import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

export function QuranCard({ surah }) {
  const isMakkiyah = (surah.tempatTurun || '').toLowerCase().includes('mek') ||
                     (surah.tempatTurun || '').toLowerCase().includes('mak');

  return (
    <Link
      to={`/quran/${surah.nomor}`}
      className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 hover:border-[#064e3b]/40 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-950/5 dark:hover:shadow-black/50 transition-all duration-200 flex items-center justify-between gap-3 overflow-hidden"
    >
      {/* Background subtle hover glow */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/0 group-hover:bg-amber-400/5 dark:group-hover:bg-emerald-500/5 rounded-full blur-xl transition-all pointer-events-none" />

      {/* Left side: Surah Number & Info */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Modern Islamic 8-Point Star Number Badge */}
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center rounded-2xl bg-emerald-950/4 dark:bg-[#14221f] text-[#064e3b] dark:text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-900/10 dark:border-emerald-500/20 group-hover:bg-[#064e3b] group-hover:text-white dark:group-hover:bg-[#085a44] group-hover:border-amber-400/40 transition-all shadow-2xs">
          <span className="relative z-10 font-mono">
            {String(surah.nomor).padStart(2, '0')}
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-[#064e3b] dark:group-hover:text-emerald-300 transition-colors truncate">
              {surah.namaLatin}
            </h3>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                isMakkiyah
                  ? 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
              }`}
            >
              {isMakkiyah ? 'Makkiyah' : 'Madaniyah'}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {surah.arti} • <span className="font-semibold text-slate-700 dark:text-slate-300">{surah.jumlahAyat} Ayat</span>
          </p>
        </div>
      </div>

      {/* Right side: Arabic Name in Calligraphy */}
      <div className="shrink-0 text-right pl-2">
        <span className="font-arabic text-xl sm:text-2xl font-bold text-[#064e3b] dark:text-emerald-200 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors block">
          {surah.nama}
        </span>
      </div>
    </Link>
  );
}
