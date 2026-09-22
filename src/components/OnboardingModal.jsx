import { useState } from 'react';
import {
  BookOpen,
  Clock,
  Compass,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Volume2,
  Sun,
  Moon,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { POPULAR_CITIES } from '../data/indonesianCities';
import { NurQuranLogo } from './NurQuranLogo';

export function OnboardingModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { settings, updateSetting, updateLocation } = useSettings();

  if (!isOpen) return null;

  const handleFinish = () => {
    try {
      localStorage.setItem('nurquran_onboarding_completed', 'true');
    } catch (e) {
      console.error(e);
    }
    if (onClose) onClose();
  };

  const steps = [
    {
      id: 'welcome',
      badge: 'Selamat Datang',
      title: 'NurQuran Digital Companion',
      subtitle: 'Aplikasi Al-Qur\'an dan pendamping ibadah harian modern dengan desain mewah, bersih, dan bebas iklan.',
      icon: BookOpen
    },
    {
      id: 'quran-audio',
      badge: 'Mushaf & Murottal',
      title: '30 Juz Lengkap & 6 Qari Dunia',
      subtitle: 'Teks Al-Qur\'an standar Kementerian Agama RI, terjemahan resmi, transliterasi Latin, tafsir ringkas, serta audio per ayat.',
      icon: Volume2
    },
    {
      id: 'prayer-qibla',
      badge: 'Ibadah Tepat Waktu',
      title: 'Jadwal Sholat & Kompas Kiblat',
      subtitle: 'Hitung mundur waktu sholat otomatis seluruh kota di Indonesia dan kompas kiblat berbasis sensor perangkat.',
      icon: Compass
    },
    {
      id: 'preferences',
      badge: 'Personalisasi',
      title: 'Atur Preferensi Awal Anda',
      subtitle: 'Sesuaikan kota domisili, tema tampilan favorit, dan kenyamanan visual Anda sebelum mulai membaca.',
      icon: Sparkles
    }
  ];

  return (
    <div className="fixed inset-0 z-90 w-screen h-screen bg-[#fcfbf8] dark:bg-[#080c0b] text-slate-800 dark:text-slate-100 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
      {/* Decorative ambient background lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-linear-to-b from-emerald-500/10 via-amber-400/5 to-transparent blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-emerald-600/5 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-between max-w-2xl mx-auto w-full p-4 sm:p-8 min-h-screen">
        {/* Top Bar Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            <NurQuranLogo size="sm" />
            <div>
              <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                NurQuran
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Langkah {currentStep + 1} dari {steps.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="text-xs font-semibold px-3 py-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-emerald-950/5 dark:hover:bg-[#14221f] transition-colors"
          >
            Lewati Semua
          </button>
        </div>

        {/* Main Slide Content Area */}
        <div className="my-auto py-6 sm:py-8 space-y-6">
          {/* Step Badge & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/5 dark:bg-[#14221f] border border-emerald-950/10 dark:border-emerald-500/20 text-xs font-bold text-[#064e3b] dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{steps[currentStep].badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              {steps[currentStep].title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {/* Dynamic Step Content Cards */}
          <div className="pt-2">
            {/* STEP 0: Welcome Hero */}
            {currentStep === 0 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-lg space-y-4 text-left">
                <div className="flex justify-center py-2">
                  <NurQuranLogo size="xl" animated={true} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-[#121c1a] border border-emerald-950/5 dark:border-emerald-500/10">
                    <div className="w-8 h-8 rounded-xl bg-[#064e3b] text-white flex items-center justify-center mb-2">
                      <BookOpen className="w-4 h-4 text-amber-300" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Mushaf Standar</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Teks Kemenag RI & terjemahan lengkap.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-[#121c1a] border border-emerald-950/5 dark:border-emerald-500/10">
                    <div className="w-8 h-8 rounded-xl bg-[#064e3b] text-white flex items-center justify-center mb-2">
                      <Clock className="w-4 h-4 text-amber-300" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Jadwal Sholat</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Waktu akurat & hitung mundur sholat.</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-[#121c1a] border border-emerald-950/5 dark:border-emerald-500/10">
                    <div className="w-8 h-8 rounded-xl bg-[#064e3b] text-white flex items-center justify-center mb-2">
                      <Compass className="w-4 h-4 text-amber-300" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Kompas Kiblat</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Arah Ka'bah presisi dengan sensor HP.</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-amber-500/10 dark:bg-[#14221f] border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Gratis, bebas iklan, dan ramah baterai dengan Dark Mode Obsidian.</span>
                </div>
              </div>
            )}

            {/* STEP 1: Quran & Murottal Feature */}
            {currentStep === 1 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-lg space-y-4">
                {/* Surah Al-Fatihah Mockup */}
                <div className="p-4 rounded-2xl bg-emerald-950/4 dark:bg-[#121c1a] border border-emerald-950/8 dark:border-emerald-500/10 text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    QS. Al-Fatihah : 1
                  </span>
                  <p className="font-arabic text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-slate-50 leading-loose">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                  <p className="text-left text-xs text-slate-600 dark:text-slate-300 italic mt-2">
                    "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang."
                  </p>
                </div>

                {/* 6 Qari Info */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-[#14221f] border border-emerald-500/20 text-left">
                  <div className="w-9 h-9 rounded-xl bg-[#064e3b] text-amber-300 flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      6 Pilihan Qari Murottal Ternama
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Misyari Rasyid Al-Afasy, As-Sudais, Al-Ghamidi, Al-Matrud, Al-Husary, & Basfar.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Prayer & Qibla */}
            {currentStep === 2 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-lg space-y-4 text-left">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-linear-to-br from-[#064e3b] to-[#043d2f] text-white">
                    <span className="text-[10px] text-emerald-200 uppercase font-semibold block mb-1">
                      Sholat Berikutnya
                    </span>
                    <div className="text-lg font-bold">Dzuhur • 11:58</div>
                    <span className="text-xs text-amber-300 font-mono mt-1 block">
                      Hitung Mundur Otomatis
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-[#121c1a] border border-emerald-950/8 dark:border-emerald-500/10">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                      Arah Kiblat
                    </span>
                    <div className="text-lg font-extrabold text-[#064e3b] dark:text-emerald-200">
                      295° Barat Laut
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">
                      🕋 Ka'bah, Makkah
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/4 dark:bg-[#121c1a] border border-emerald-950/5 dark:border-emerald-500/10 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Dihitung dengan rumus hisab astronomis standar Kemenag RI.</span>
                </div>
              </div>
            )}

            {/* STEP 3: Initial Preferences Selection */}
            {currentStep === 3 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-lg space-y-4 text-left">
                {/* Theme Switcher */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Pilihan Tema Tampilan:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateSetting('theme', 'light')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        settings.theme === 'light'
                          ? 'bg-white text-emerald-950 border-[#064e3b] shadow-sm ring-2 ring-[#064e3b]/20'
                          : 'bg-emerald-950/5 text-slate-600 border-transparent hover:border-slate-300'
                      }`}
                    >
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>Mode Terang</span>
                    </button>

                    <button
                      onClick={() => updateSetting('theme', 'dark')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        settings.theme === 'dark'
                          ? 'bg-[#14221f] text-emerald-200 border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                          : 'bg-emerald-950/5 dark:bg-[#121c1a] text-slate-400 border-transparent'
                      }`}
                    >
                      <Moon className="w-4 h-4 text-indigo-400" />
                      <span>Mode Gelap (Obsidian)</span>
                    </button>
                  </div>
                </div>

                {/* City Selector */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Pilih Kota Anda untuk Jadwal Sholat:
                  </label>
                  <select
                    value={settings.location.city}
                    onChange={(e) => {
                      const c = POPULAR_CITIES.find(item => item.name === e.target.value);
                      if (c) {
                        updateLocation({
                          city: c.name,
                          country: c.country,
                          province: c.province,
                          lat: c.lat,
                          lng: c.lng,
                          isGeolocation: false
                        });
                      }
                    }}
                    className="w-full p-3 rounded-2xl bg-emerald-950/5 dark:bg-[#121c1a] border border-emerald-950/10 dark:border-emerald-500/20 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#064e3b]"
                  >
                    {POPULAR_CITIES.map(c => (
                      <option key={c.id} value={c.name} className="dark:bg-[#0e1614] dark:text-slate-100">
                        {c.name} ({c.province})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Dots & Navigation Buttons */}
        <div className="pt-4 border-t border-emerald-950/8 dark:border-emerald-500/10 flex items-center justify-between gap-4">
          {/* Back Button */}
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-emerald-950/5 dark:hover:bg-[#14221f] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          ) : (
            <div />
          )}

          {/* Slide Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep === idx
                    ? 'w-7 bg-[#064e3b] dark:bg-amber-400'
                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next / Finish Button */}
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-[#064e3b] hover:bg-[#043d2f] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-linear-to-r from-[#064e3b] via-emerald-700 to-amber-500 hover:brightness-110 text-white text-xs font-extrabold shadow-lg hover:shadow-xl transition-all scale-105"
            >
              <span>Bismillah, Mulai</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
