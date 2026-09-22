import { Link } from 'react-router-dom';
import { Clock, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useSettings } from '../context/SettingsContext';

export function NextPrayerCard() {
  const { nextPrayer, activePrayer, allPrayers, countdown, loading, error } = usePrayerTimes();
  const { settings } = useSettings();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#064e3b] via-[#043d2f] to-[#02281f] text-white p-6 sm:p-8 shadow-lg shadow-emerald-950/20 border border-emerald-700/30">
      {/* Subtle Islamic Star Pattern Overlay */}
      <div className="absolute inset-0 islamic-star-pattern pointer-events-none" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-emerald-400/8 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top bar with location & prayer badge */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <Link
            to="/prayer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 text-xs font-medium backdrop-blur-xs border border-white/15 text-emerald-100 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{settings.location.city}, {settings.location.country}</span>
            <ChevronRight className="w-3 h-3 text-emerald-300" />
          </Link>

          <span className="text-xs text-emerald-200/80 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Jadwal Sholat Presisi</span>
          </span>
        </div>

        {/* Main Countdown Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-emerald-200/90 font-semibold mb-1">
              Sholat Selanjutnya
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-3">
              <span>{nextPrayer ? nextPrayer.name : 'Memuat...'}</span>
              <span className="text-2xl sm:text-3xl font-mono text-amber-300">
                {nextPrayer ? nextPrayer.time : '--:--'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 font-medium">
              {countdown.human || 'Menghitung waktu...'}
            </p>
          </div>

          {/* Digital Timer Clock */}
          <div className="flex sm:justify-end">
            <div className="px-5 py-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-center">
              <div className="text-[10px] text-emerald-200/80 uppercase tracking-widest mb-0.5 font-medium">
                Hitung Mundur
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400 tracking-wider">
                {countdown.digital}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Prayers Schedule Row */}
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5 sm:gap-2 pt-4 border-t border-white/10">
          {allPrayers.map((p) => {
            const isNext = nextPrayer?.key === p.key;
            const isActive = activePrayer?.key === p.key;

            return (
              <div
                key={p.key}
                className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl transition-all ${
                  isNext
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20 scale-105 ring-2 ring-amber-300'
                    : isActive
                    ? 'bg-emerald-800/80 text-white font-semibold border border-emerald-500/40'
                    : 'bg-white/5 hover:bg-white/10 text-emerald-100/80 border border-white/5'
                }`}
              >
                <span className={`text-[11px] tracking-tight ${isNext ? 'text-slate-950 font-bold' : 'text-emerald-200'}`}>
                  {p.name}
                </span>
                <span className={`text-xs sm:text-sm font-mono mt-0.5 ${isNext ? 'text-slate-950 font-extrabold' : 'text-white'}`}>
                  {p.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
