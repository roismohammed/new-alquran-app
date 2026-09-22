import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import { useVibration } from '../hooks/useVibration';

export function DhikrCounter({ dhikr, onComplete }) {
  const [count, setCount] = useState(() => {
    try {
      const saved = localStorage.getItem(`nurquran_dhikr_${dhikr.id}`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [totalLaps, setTotalLaps] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { vibrate } = useVibration();
  const audioCtxRef = useRef(null);

  // Sync count to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`nurquran_dhikr_${dhikr.id}`, count.toString());
    } catch (e) {
      console.error(e);
    }
  }, [count, dhikr.id]);

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio not permitted yet
    }
  };

  const handleIncrement = () => {
    const nextCount = count + 1;
    playClickSound();

    if (nextCount >= dhikr.target) {
      vibrate([40, 60, 40]);
      setCount(0);
      setTotalLaps(l => l + 1);
      if (onComplete) onComplete();
    } else {
      vibrate(15);
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    setCount(0);
    vibrate(25);
  };

  const progressPercent = Math.min(100, (count / dhikr.target) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-xl max-w-md mx-auto w-full text-center relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header with sound toggle & reset */}
      <div className="w-full flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#064e3b] dark:text-emerald-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Tasbih Digital
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl text-slate-400 hover:text-[#064e3b] dark:hover:text-emerald-300 transition-colors"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 transition-colors"
            title="Reset Hitungan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dhikr Arabic & Details */}
      <div className="my-3 space-y-2">
        <div className="font-arabic text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-slate-50 py-1">
          {dhikr.arab}
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          {dhikr.latin}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
          "{dhikr.arti}"
        </p>
      </div>

      {/* Big Circular Counter Touch Button */}
      <div className="my-6 relative flex items-center justify-center">
        {/* Progress SVG Ring */}
        <svg className="w-56 h-56 -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            className="text-slate-100 dark:text-[#14221f] stroke-current"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            className="text-amber-500 stroke-current transition-all duration-150"
            strokeWidth="6"
            strokeDasharray={264}
            strokeDashoffset={264 - (264 * progressPercent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Touchable Button */}
        <button
          onClick={handleIncrement}
          className="absolute inset-4 rounded-full bg-[#064e3b] text-white flex flex-col items-center justify-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all select-none border-4 border-white/20 dark:border-emerald-600/30 group"
        >
          <span className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight text-white group-active:text-amber-300">
            {count}
          </span>
          <span className="text-xs text-emerald-200/90 mt-0.5 font-medium">
            / {dhikr.target}
          </span>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-1">
            + TEKAN
          </span>
        </button>
      </div>

      {/* Bottom Lap Counter */}
      <div className="w-full pt-3 border-t border-emerald-950/8 dark:border-emerald-500/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 font-semibold text-[#064e3b] dark:text-emerald-300">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Putaran Selesai: {totalLaps}x</span>
        </div>
        <span>Target: {dhikr.target}x</span>
      </div>
    </div>
  );
}
