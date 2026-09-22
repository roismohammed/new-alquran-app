import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CircleDot, Sun, Moon } from 'lucide-react';
import { DhikrCounter } from '../components/DhikrCounter';
import { DHIKR_PRESETS, DHIKR_ROUTINES } from '../data/dhikrData';

export function Dhikr() {
  const [searchParams] = useSearchParams();
  const initialPresetId = searchParams.get('preset') || 'tasbih';

  const [selectedPresetId, setSelectedPresetId] = useState(initialPresetId);
  const [activeTab, setActiveTab] = useState('tasbih'); // 'tasbih' | 'pagi' | 'petang'

  const activeDhikr = DHIKR_PRESETS.find(d => d.id === selectedPresetId) || DHIKR_PRESETS[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="pt-2 sm:pt-4 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] dark:text-emerald-300 uppercase tracking-wider mb-1">
          <CircleDot className="w-4 h-4 text-amber-500" />
          Tasbih Digital & Wirid Harian
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Dzikir & Tasbih
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Hitung bacaan dzikir dengan getaran haptik dan bunyi tasbih yang menenangkan.
        </p>
      </div>

      {/* Tabs selector */}
      <div className="flex items-center justify-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#0b1d1a] border border-emerald-950/8 dark:border-emerald-500/10 max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab('tasbih')}
          className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'tasbih'
              ? 'bg-[#064e3b] text-white shadow-2xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-[#064e3b]'
          }`}
        >
          Tasbih Bebas
        </button>
        <button
          onClick={() => setActiveTab('pagi')}
          className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${
            activeTab === 'pagi'
              ? 'bg-[#064e3b] text-white shadow-2xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-[#064e3b]'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Dzikir Pagi</span>
        </button>
        <button
          onClick={() => setActiveTab('petang')}
          className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all ${
            activeTab === 'petang'
              ? 'bg-[#064e3b] text-white shadow-2xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-[#064e3b]'
          }`}
        >
          <Moon className="w-3.5 h-3.5 text-indigo-300" />
          <span>Dzikir Petang</span>
        </button>
      </div>

      {/* Main Dhikr Counter UI */}
      {activeTab === 'tasbih' && (
        <div className="space-y-6">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {DHIKR_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPresetId(p.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedPresetId === p.id
                    ? 'bg-[#064e3b] text-white shadow-xs scale-105'
                    : 'bg-white dark:bg-[#0b1d1a] text-slate-700 dark:text-slate-300 border border-emerald-950/8 dark:border-emerald-500/10 hover:border-[#064e3b]'
                }`}
              >
                {p.name} ({p.target}x)
              </button>
            ))}
          </div>

          <DhikrCounter key={activeDhikr.id} dhikr={activeDhikr} />

          {/* Keutamaan info card */}
          {activeDhikr.keutamaan && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed text-center">
              <span className="font-bold">✨ Keutamaan Dzikir: </span>
              {activeDhikr.keutamaan}
            </div>
          )}
        </div>
      )}

      {/* Dzikir Pagi Routine */}
      {activeTab === 'pagi' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-950/5 dark:bg-emerald-950/30 border border-emerald-950/10 text-xs text-[#064e3b] dark:text-emerald-200">
            <strong>Dzikir Pagi:</strong> Dibaca setelah sholat Subuh hingga matahari terbit atau waktu dhuha untuk memohon keberkahan dan perlindungan sepanjang hari.
          </div>
          {DHIKR_ROUTINES.pagi.map((item, idx) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0b1d1a] border border-emerald-950/8 dark:border-emerald-500/10 space-y-2 text-center"
            >
              <span className="w-6 h-6 rounded-full bg-emerald-950/5 dark:bg-emerald-900/50 text-[#064e3b] dark:text-emerald-300 text-xs font-bold inline-flex items-center justify-center mb-1">
                {idx + 1}
              </span>
              <p className="font-arabic text-2xl text-emerald-950 dark:text-emerald-50 py-1">
                {item.arab}
              </p>
              <p className="text-xs font-serif italic text-[#064e3b]/80 dark:text-emerald-300/80">
                {item.latin}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                "{item.arti}"
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Dzikir Petang Routine */}
      {activeTab === 'petang' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200">
            <strong>Dzikir Petang:</strong> Dibaca setelah sholat Ashar hingga terbenam matahari atau waktu Isya untuk memohon ketenangan jiwa di malam hari.
          </div>
          {DHIKR_ROUTINES.petang.map((item, idx) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0b1d1a] border border-emerald-950/8 dark:border-emerald-500/10 space-y-2 text-center"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 text-xs font-bold inline-flex items-center justify-center mb-1">
                {idx + 1}
              </span>
              <p className="font-arabic text-2xl text-emerald-950 dark:text-emerald-50 py-1">
                {item.arab}
              </p>
              <p className="text-xs font-serif italic text-[#064e3b]/80 dark:text-emerald-300/80">
                {item.latin}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                "{item.arti}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
