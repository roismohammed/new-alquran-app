import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Laptop,
  Type,
  MapPin,
  Volume2,
  CheckCircle2,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { QARI_LIST, ARABIC_FONT_SIZES } from '../config/api';
import { POPULAR_CITIES } from '../data/indonesianCities';

export function Settings({ onOpenOnboarding }) {
  const { settings, updateSetting, updateLocation, resetSettings } = useSettings();
  const [resetSuccess, setResetSuccess] = useState(false);

  const calculationMethods = [
    { id: 20, name: 'Kementerian Agama Republik Indonesia (Kemenag RI)' },
    { id: 3, name: 'Muslim World League (MWL)' },
    { id: 4, name: 'Umm al-Qura University, Makkah' },
    { id: 2, name: 'Islamic Society of North America (ISNA)' },
    { id: 5, name: 'Egyptian General Authority of Survey' }
  ];

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan semua pengaturan ke default?')) {
      resetSettings();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] dark:text-emerald-300 uppercase tracking-wider mb-1">
            <SettingsIcon className="w-4 h-4 text-amber-500" />
            Kustomisasi Aplikasi
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Pengaturan
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Atur preferensi tema, font Al-Qur'an, qari murottal, dan jadwal sholat sesuai kenyamanan Anda.
          </p>
        </div>

        {onOpenOnboarding && (
          <button
            onClick={onOpenOnboarding}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/15 text-xs font-bold text-[#064e3b] dark:text-emerald-300 hover:border-[#064e3b] shadow-2xs transition-colors self-start sm:self-auto"
          >
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>Panduan Aplikasi</span>
          </button>
        )}
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/10 dark:bg-[#121c1a] border border-emerald-600/30 text-[#064e3b] dark:text-emerald-100 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Pengaturan berhasil dikembalikan ke default.</span>
        </div>
      )}

      {/* 1. Appearance / Tema */}
      <section className="p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-950/8 dark:border-emerald-500/10">
          <Sun className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
            Tampilan & Tema
          </h2>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
            Mode Warna
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'light', label: 'Terang', icon: Sun },
              { id: 'dark', label: 'Gelap', icon: Moon },
              { id: 'system', label: 'Otomatis', icon: Laptop }
            ].map((theme) => {
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  onClick={() => updateSetting('theme', theme.id)}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    settings.theme === theme.id
                      ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-2xs'
                      : 'bg-slate-50 dark:bg-[#121c1a] border-slate-200/80 dark:border-emerald-900/30 text-slate-700 dark:text-slate-300 hover:border-[#064e3b]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Quran Reading Preferences */}
      <section className="p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-950/8 dark:border-emerald-500/10">
          <Type className="w-4 h-4 text-[#064e3b] dark:text-emerald-400" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
            Membaca Al-Qur'an
          </h2>
        </div>

        {/* Font Size */}
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
            Ukuran Teks Arab
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(ARABIC_FONT_SIZES).map(([key, config]) => (
              <button
                key={key}
                onClick={() => updateSetting('arabicFontSize', key)}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  settings.arabicFontSize === key
                    ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-2xs'
                    : 'bg-slate-50 dark:bg-[#121c1a] border-slate-200/80 dark:border-emerald-900/30 text-slate-700 dark:text-slate-300 hover:border-[#064e3b]'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>

          {/* Live Preview */}
          <div className="mt-3 p-4 rounded-2xl bg-emerald-950/4 dark:bg-[#121c1a] border border-emerald-950/5 dark:border-emerald-500/10 text-right">
            <p className={`font-arabic text-emerald-950 dark:text-slate-50 ${ARABIC_FONT_SIZES[settings.arabicFontSize]?.class}`}>
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-left mt-1 italic">Pratinjau ukuran teks</p>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Tampilkan Terjemahan Indonesia
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Menampilkan arti ayat dalam Bahasa Indonesia resmi Kemenag.
              </div>
            </div>
            <button
              onClick={() => updateSetting('showTranslation', !settings.showTranslation)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.showTranslation ? 'bg-[#064e3b]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.showTranslation ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Tampilkan Transliterasi Latin
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Membantu pelafalan ayat dalam huruf Latin.
              </div>
            </div>
            <button
              onClick={() => updateSetting('showLatin', !settings.showLatin)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                settings.showLatin ? 'bg-[#064e3b]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.showLatin ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Audio & Qari Settings */}
      <section className="p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-950/8 dark:border-emerald-500/10">
          <Volume2 className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
            Audio Murottal & Qari
          </h2>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
            Qari Utama
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {QARI_LIST.map((qari) => (
              <button
                key={qari.id}
                onClick={() => updateSetting('defaultQari', qari.id)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition-all ${
                  settings.defaultQari === qari.id
                    ? 'bg-emerald-950/10 dark:bg-[#14221f] border-[#064e3b] dark:border-emerald-500 text-[#064e3b] dark:text-emerald-100 font-bold'
                    : 'bg-slate-50 dark:bg-[#121c1a] border-slate-200/80 dark:border-emerald-900/30 text-slate-700 dark:text-slate-300 hover:border-[#064e3b]'
                }`}
              >
                <div>
                  <div className="font-semibold">{qari.name}</div>
                  <div className="font-arabic text-[11px] text-[#064e3b] dark:text-emerald-400">{qari.arabicName}</div>
                </div>
                {settings.defaultQari === qari.id && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Playback Speed */}
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
            Kecepatan Putar Default
          </label>
          <div className="flex items-center gap-2">
            {[0.75, 1, 1.25, 1.5].map((s) => (
              <button
                key={s}
                onClick={() => updateSetting('playbackSpeed', s)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                  settings.playbackSpeed === s
                    ? 'bg-[#064e3b] text-white border-[#064e3b] shadow-2xs'
                    : 'bg-slate-50 dark:bg-[#121c1a] border-slate-200/80 dark:border-emerald-900/30 text-slate-700 dark:text-slate-300 hover:border-[#064e3b]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Prayer Times Settings */}
      <section className="p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-950/8 dark:border-emerald-500/10">
          <MapPin className="w-4 h-4 text-[#064e3b] dark:text-emerald-400" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
            Jadwal Sholat & Lokasi
          </h2>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
            Metode Perhitungan
          </label>
          <select
            value={settings.calculationMethod}
            onChange={(e) => updateSetting('calculationMethod', parseInt(e.target.value, 10))}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#121c1a] border border-slate-200 dark:border-emerald-900/30 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#064e3b]"
          >
            {calculationMethods.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">
            Kota Pilihan
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {POPULAR_CITIES.map((c) => (
              <button
                key={c.id}
                onClick={() =>
                  updateLocation({
                    city: c.name,
                    country: c.country,
                    province: c.province,
                    lat: c.lat,
                    lng: c.lng,
                    isGeolocation: false
                  })
                }
                className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                  settings.location.city === c.name
                    ? 'bg-emerald-950/10 dark:bg-[#14221f] border-[#064e3b] dark:border-emerald-500 text-[#064e3b] dark:text-emerald-100 font-bold'
                    : 'bg-slate-50 dark:bg-[#121c1a] border-slate-200/80 dark:border-emerald-900/30 text-slate-700 dark:text-slate-300 hover:border-[#064e3b]'
                }`}
              >
                <div className="font-semibold truncate">{c.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{c.province}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Reset Settings */}
      <section className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
            Reset Pengaturan
          </h3>
          <p className="text-xs text-rose-700 dark:text-rose-300">
            Kembalikan semua preferensi tema, font, dan lokasi ke kondisi awal.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors shrink-0"
        >
          Reset Default
        </button>
      </section>
    </div>
  );
}
