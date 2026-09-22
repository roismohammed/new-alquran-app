import { useState, useEffect } from 'react';
import { NurQuranLogo } from './NurQuranLogo';

export function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Memuat Mushaf Al-Qur\'an...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timeline = [
      { p: 35, t: 'Menyiapkan Mushaf Kemenag RI...', delay: 300 },
      { p: 65, t: 'Memuat Jadwal Sholat Presisi...', delay: 700 },
      { p: 90, t: 'Menghubungkan Audio Murottal 6 Qari...', delay: 1100 },
      { p: 100, t: 'Bismillah, Selamat Datang...', delay: 1500 }
    ];

    const timeouts = timeline.map(item => {
      return setTimeout(() => {
        setProgress(item.p);
        setStatusText(item.t);
      }, item.delay);
    });

    const finishTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 400);
    }, 1900);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-100 w-screen h-screen bg-[#fcfbf8] dark:bg-[#080c0b] text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-400 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient glowing lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto w-full animate-in zoom-in-95 duration-500">
        {/* Animated Brand Logo with Glowing Halo */}
        <div className="mb-6 relative">
          <div className="absolute -inset-6 rounded-full bg-amber-400/20 dark:bg-emerald-500/25 blur-2xl animate-pulse" />
          <NurQuranLogo size="2xl" animated={true} />
        </div>

        {/* Title and Basmalah */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-1">
          NurQuran
        </h1>

        <p className="font-arabic text-xl sm:text-2xl text-amber-600 dark:text-amber-300 font-bold mb-2 tracking-wide drop-shadow-xs">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xs mb-8">
          Cahaya Al-Qur'an & Teman Ibadah Setiap Hari
        </p>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full max-w-xs space-y-2.5">
          <div className="w-full h-2.5 rounded-full bg-emerald-950/10 dark:bg-[#14221f] overflow-hidden p-0.5 border border-emerald-950/5 dark:border-emerald-500/15 shadow-inner">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#064e3b] via-emerald-500 to-amber-400 transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span className="animate-pulse">{statusText}</span>
            <span className="font-mono font-bold text-[#064e3b] dark:text-emerald-300">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer Branding info */}
      <div className="absolute bottom-6 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
        Mushaf Standar Kemenag RI • Audio Murottal 6 Qari
      </div>
    </div>
  );
}
