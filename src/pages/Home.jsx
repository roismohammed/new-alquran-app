import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Heart,
  Compass,
  Sparkles,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  Info,
  X
} from 'lucide-react';
import { NextPrayerCard } from '../components/NextPrayerCard';
import { useQuran } from '../context/QuranContext';
import { useSettings } from '../context/SettingsContext';
import { getFormattedGregorianDate, getFormattedHijriDate } from '../utils/hijriDate';
import { getTodayVerse } from '../services/quranService';
import { POPULAR_CITIES } from '../data/indonesianCities';

export function Home() {
  const { lastRead } = useQuran();
  const { settings, updateLocation } = useSettings();
  const [dailyVerse, setDailyVerse] = useState(getTodayVerse());
  const [showTafsirModal, setShowTafsirModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const todayGregorian = getFormattedGregorianDate();
  const todayHijri = getFormattedHijriDate();

  const handleRequestGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Perangkat Anda tidak mendukung geolokasi browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        updateLocation({
          city: 'Lokasi Terdeteksi (GPS)',
          country: 'Indonesia',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          isGeolocation: true
        });
        setShowLocationModal(false);
      },
      (err) => {
        setIsLocating(false);
        alert('Izin lokasi ditolak atau tidak tersedia. Anda dapat memilih kota secara manual.');
      },
      { timeout: 10000 }
    );
  };

  const quickAccessItems = [
    { to: '/quran', label: 'Al-Qur\'an', desc: '114 Surah & Murottal', icon: BookOpen },
    { to: '/prayer', label: 'Jadwal Sholat', desc: 'Presisi & Hitung Mundur', icon: Clock },
    { to: '/dua', label: 'Doa Harian', desc: 'Kumpulan Doa Shahih', icon: Heart },
    { to: '/dhikr', label: 'Dzikir & Tasbih', desc: 'Tasbih Digital & Wirid', icon: Sparkles },
    { to: '/qibla', label: 'Arah Kiblat', desc: 'Kompas Ka\'bah Makkah', icon: Compass },
    { to: '/asmaul-husna', label: 'Asmaul Husna', desc: '99 Asma Allah & Makna', icon: Sparkles }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Section */}
      <section className="relative pt-2 sm:pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/5 dark:bg-emerald-900/30 text-[#064e3b] dark:text-emerald-300 text-xs font-semibold mb-2 border border-emerald-900/10 dark:border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              NurQuran Digital Companion
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Assalamu'alaikum 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
              Semoga hari ini dipenuhi keberkahan, rahmat, dan ampunan-Nya.
            </p>
          </div>

          {/* Date & Location Card */}
          <div className="flex flex-col sm:items-end justify-center p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#064e3b] dark:text-emerald-300">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>{todayHijri}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              {todayGregorian}
            </div>
            <button
              onClick={() => setShowLocationModal(true)}
              className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#064e3b] dark:text-emerald-400 hover:underline"
            >
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>{settings.location.city} (Ubah)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Next Prayer Card Component */}
      <section>
        <NextPrayerCard />
      </section>

      {/* Continue Reading (Last Read) Card */}
      <section>
        {lastRead ? (
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center shrink-0 shadow-sm">
                <BookOpen className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#064e3b] dark:text-emerald-400">
                  Lanjutkan Tilawah
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  Surah {lastRead.surahName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Terakhir dibaca Ayat {lastRead.ayahNumber} {lastRead.totalAyah ? `dari ${lastRead.totalAyah} Ayat` : ''}
                </p>
              </div>
            </div>

            <Link
              to={`/quran/${lastRead.surahNumber}#ayah-${lastRead.ayahNumber}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#043d2f] text-white font-semibold text-xs shadow-xs transition-colors group"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/5 dark:bg-emerald-900/40 text-[#064e3b] dark:text-emerald-300 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  Mulai Membaca Al-Qur'an
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Awali tilawah hari ini dari surah pembuka Al-Fatihah.
                </p>
              </div>
            </div>

            <Link
              to="/quran"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#064e3b] hover:bg-[#043d2f] text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <span>Buka Al-Qur'an</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* Daily Verse Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-950/8 dark:border-emerald-500/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#064e3b] dark:text-emerald-400">
              Ayat Hari Ini
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {dailyVerse.reference}
          </span>
        </div>

        {/* Arabic verse text */}
        <div className="py-2 text-right">
          <p className="font-arabic text-2xl sm:text-3xl font-bold text-emerald-950 dark:text-slate-50 leading-[2.4]">
            {dailyVerse.arab}
          </p>
        </div>

        {/* Translation */}
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed italic">
          "{dailyVerse.translation}"
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setShowTafsirModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-500/15 transition-colors border border-amber-500/20"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Baca Tafsir & Makna</span>
          </button>

          <Link
            to={`/quran/${dailyVerse.surahNumber}`}
            className="text-xs font-semibold text-[#064e3b] dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Buka Surah Penuh</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Quick Access Menu Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Menu Ibadah
          </h2>
          <span className="text-xs text-slate-400">Pilihan Cepat</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 hover:border-[#064e3b]/30 dark:hover:border-emerald-500/30 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-950/5 dark:bg-emerald-900/40 text-[#064e3b] dark:text-emerald-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#064e3b] dark:group-hover:text-emerald-300 transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tafsir Modal */}
      {showTafsirModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowTafsirModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/15 dark:border-emerald-500/20 p-6 sm:p-8 shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950/8 dark:border-emerald-500/10">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Tafsir Ringkas: {dailyVerse.reference}
              </h3>
              <button
                onClick={() => setShowTafsirModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/4 dark:bg-[#121c1a] text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-emerald-950/5 dark:border-emerald-500/10">
              {dailyVerse.tafsirSummary}
            </div>

            <div className="flex justify-end pt-2">
              <Link
                to={`/quran/${dailyVerse.surahNumber}`}
                onClick={() => setShowTafsirModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#064e3b] text-white hover:bg-[#043d2f]"
              >
                Baca Surah Lengkap
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Location Selector Modal */}
      {showLocationModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowLocationModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/15 dark:border-emerald-500/20 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950/8 dark:border-emerald-500/10">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Pilih Lokasi Jadwal Sholat
              </h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleRequestGeolocation}
              disabled={isLocating}
              className="w-full py-2.5 px-4 rounded-xl bg-[#064e3b] hover:bg-[#043d2f] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{isLocating ? 'Mendeteksi GPS...' : 'Gunakan Lokasi Saat Ini (GPS)'}</span>
            </button>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">
              Atau Pilih Kota:
            </div>

            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
              {POPULAR_CITIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    updateLocation({
                      city: c.name,
                      country: c.country,
                      province: c.province,
                      lat: c.lat,
                      lng: c.lng,
                      isGeolocation: false
                    });
                    setShowLocationModal(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    settings.location.city === c.name
                      ? 'bg-emerald-950/10 dark:bg-[#14221f] text-[#064e3b] dark:text-emerald-200 font-bold border border-emerald-600/30'
                      : 'hover:bg-emerald-950/5 dark:hover:bg-[#121c1a] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.province}, {c.country}</div>
                  </div>
                  {settings.location.city === c.name && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
