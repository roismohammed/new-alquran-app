import { Clock } from 'lucide-react';

export function PrayerCard({ name, arabName, time, isNext, isActive, isPassed, icon: Icon = Clock }) {
  return (
    <div
      className={`relative p-5 rounded-2xl transition-all border ${
        isNext
          ? 'bg-[#064e3b] text-white border-amber-400/40 shadow-lg shadow-emerald-950/20 ring-2 ring-amber-400/30'
          : isActive
          ? 'bg-emerald-50/80 dark:bg-[#142924] border-emerald-500/40 text-slate-800 dark:text-slate-100 shadow-xs'
          : isPassed
          ? 'bg-white/50 dark:bg-[#0b1210]/60 border-slate-200/50 dark:border-emerald-950/40 text-slate-400 dark:text-slate-500 opacity-80'
          : 'bg-white dark:bg-[#0e1614] border-emerald-950/8 dark:border-emerald-500/10 text-slate-800 dark:text-slate-100 hover:border-[#064e3b]/30 dark:hover:border-emerald-500/20 shadow-2xs'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${
              isNext
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : isActive
                ? 'bg-[#064e3b] text-white'
                : isPassed
                ? 'bg-slate-100 dark:bg-[#14221f] text-slate-400'
                : 'bg-emerald-100/70 dark:bg-[#14221f] text-[#064e3b] dark:text-emerald-300'
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className={`text-base font-bold ${isNext ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                {name}
              </h4>
              {isNext && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-400 text-slate-950">
                  Berikutnya
                </span>
              )}
              {isActive && !isNext && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#064e3b] text-white">
                  Sedang Aktif
                </span>
              )}
            </div>
            {arabName && (
              <span className={`font-arabic text-xs ${isNext ? 'text-emerald-200' : 'text-slate-400'}`}>
                {arabName}
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className={`text-2xl font-mono font-bold tracking-tight ${isNext ? 'text-amber-300' : 'text-slate-900 dark:text-slate-100'}`}>
            {time}
          </div>
          <span className={`text-[10px] font-medium ${isNext ? 'text-emerald-200' : 'text-slate-400'}`}>
            WIB
          </span>
        </div>
      </div>
    </div>
  );
}
