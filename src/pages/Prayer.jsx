import { useState } from 'react';
import {
  Clock,
  MapPin,
  Calendar,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Table
} from 'lucide-react';
import { PrayerCard } from '../components/PrayerCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useSettings } from '../context/SettingsContext';
import { getFormattedGregorianDate, getFormattedHijriDate } from '../utils/hijriDate';
import { POPULAR_CITIES } from '../data/indonesianCities';
import { fetchMonthlyCalendar } from '../services/prayerService';

export function Prayer() {
  const { nextPrayer, activePrayer, allPrayers, countdown, loading, error, refresh } = usePrayerTimes();
  const { settings, updateLocation } = useSettings();

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showMonthlySchedule, setShowMonthlySchedule] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loadingMonthly, setLoadingMonthly] = useState(false);

  const todayGregorian = getFormattedGregorianDate();
  const todayHijri = getFormattedHijriDate();

  const prayerIcons = {
    Imsak: Moon,
    Fajr: Sunrise,
    Sunrise: Sun,
    Dhuhr: Sun,
    Asr: Sun,
    Maghrib: Sunset,
    Isha: Moon
  };

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
        alert('Izin lokasi ditolak. Anda dapat memilih kota dari daftar.');
      }
    );
  };

  const handleToggleMonthly = async () => {
    const nextState = !showMonthlySchedule;
    setShowMonthlySchedule(nextState);
    if (nextState && monthlyData.length === 0) {
      setLoadingMonthly(true);
      try {
        const loc = settings.location;
        const res = await fetchMonthlyCalendar({
          latitude: loc.isGeolocation ? loc.lat : null,
          longitude: loc.isGeolocation ? loc.lng : null,
          city: loc.city,
          country: loc.country,
          method: settings.calculationMethod
        });
        setMonthlyData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingMonthly(false);
      }
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="pt-2 sm:pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] dark:text-emerald-300 uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 text-amber-500" />
              Waktu Ibadah Fardhu & Sunnah
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Jadwal Sholat Presisi
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Dihitung berdasarkan metode Kementerian Agama Republik Indonesia (Kemenag RI).
            </p>
          </div>

          {/* Location Button */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-[#064e3b] shadow-2xs transition-colors self-start sm:self-auto"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{settings.location.city}, {settings.location.country}</span>
            <span className="text-[#064e3b] dark:text-emerald-400 font-bold ml-1">Ubah Lokasi</span>
          </button>
        </div>
      </div>

      {/* Hero Countdown Highlight */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#064e3b] via-[#043d2f] to-[#02281f] text-white p-6 sm:p-8 shadow-xl border border-emerald-700/30">
        <div className="absolute inset-0 islamic-star-pattern pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200/90 uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{todayHijri} • {todayGregorian}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Menuju {nextPrayer ? nextPrayer.name : 'Sholat'}
            </h2>
            <p className="text-sm text-emerald-100/90 font-medium mt-1">
              Waktu sholat berikutnya pukul <span className="font-bold text-amber-300">{nextPrayer?.time} WIB</span> ({countdown.human})
            </p>
          </div>

          <div className="px-6 py-4 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-center self-start sm:self-auto">
            <span className="text-[10px] text-emerald-200/80 uppercase tracking-widest block mb-1 font-medium">
              Sisa Waktu
            </span>
            <span className="text-3xl sm:text-4xl font-mono font-extrabold text-amber-400 tracking-wider">
              {countdown.digital}
            </span>
          </div>
        </div>
      </div>

      {/* Prayers Cards Grid */}
      {loading ? (
        <LoadingState message="Menghitung jadwal sholat..." />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {allPrayers.map((p) => {
            const isNext = nextPrayer?.key === p.key;
            const isActive = activePrayer?.key === p.key;
            const now = new Date();
            const isPassed = now > p.dateObj && !isActive && !isNext;
            const Icon = prayerIcons[p.key] || Clock;

            return (
              <PrayerCard
                key={p.key}
                name={p.name}
                time={p.time}
                isNext={isNext}
                isActive={isActive}
                isPassed={isPassed}
                icon={Icon}
              />
            );
          })}
        </div>
      )}

      {/* Monthly Calendar Schedule Accordion */}
      <div className="pt-4">
        <button
          onClick={handleToggleMonthly}
          className="w-full p-4 rounded-2xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 hover:border-[#064e3b] flex items-center justify-between text-sm font-bold text-slate-800 dark:text-slate-100 shadow-2xs transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Table className="w-5 h-5 text-[#064e3b] dark:text-emerald-400" />
            <span>Lihat Jadwal Sholat Satu Bulan Penuh</span>
          </div>
          <span className="text-xs text-[#064e3b] dark:text-emerald-400 font-semibold">
            {showMonthlySchedule ? 'Sembunyikan ↑' : 'Tampilkan ↓'}
          </span>
        </button>

        {showMonthlySchedule && (
          <div className="mt-3 p-4 rounded-2xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-sm overflow-x-auto">
            {loadingMonthly ? (
              <LoadingState message="Memuat kalender bulanan..." />
            ) : monthlyData.length > 0 ? (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-emerald-950/8 dark:border-emerald-500/10 text-[#064e3b] dark:text-emerald-300 font-bold">
                    <th className="py-2.5 px-2">Tanggal</th>
                    <th className="py-2.5 px-2">Imsak</th>
                    <th className="py-2.5 px-2">Subuh</th>
                    <th className="py-2.5 px-2">Terbit</th>
                    <th className="py-2.5 px-2">Dzuhur</th>
                    <th className="py-2.5 px-2">Ashar</th>
                    <th className="py-2.5 px-2">Maghrib</th>
                    <th className="py-2.5 px-2">Isya</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-950/5 dark:divide-emerald-500/10">
                  {monthlyData.map((d, idx) => {
                    const isToday = new Date().getDate() === parseInt(d.date?.gregorian?.day, 10);
                    return (
                      <tr
                        key={idx}
                        className={isToday ? 'bg-amber-500/10 font-bold text-amber-900 dark:text-amber-200' : 'text-slate-700 dark:text-slate-300'}
                      >
                        <td className="py-2 px-2 whitespace-nowrap">
                          {d.date?.gregorian?.day} {d.date?.gregorian?.month?.en} {isToday && '(Hari ini)'}
                        </td>
                        <td className="py-2 px-2 font-mono">{(d.timings?.Imsak || '').split(' ')[0]}</td>
                        <td className="py-2 px-2 font-mono">{(d.timings?.Fajr || '').split(' ')[0]}</td>
                        <td className="py-2 px-2 font-mono">{(d.timings?.Sunrise || '').split(' ')[0]}</td>
                        <td className="py-2 px-2 font-mono">{(d.timings?.Dhuhr || '').split(' ')[0]}</td>
                        <td className="py-2 px-2 font-mono">{(d.timings?.Asr || '').split(' ')[0]}</td>
                        <td className="py-2 px-2 font-mono">{(d.timings?.Maghrib || '').split(' ')[0]}</td>
                        <td className="py-2 px-2 font-mono">{(d.timings?.Isha || '').split(' ')[0]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-4 text-xs text-slate-500">Jadwal bulanan tidak tersedia.</p>
            )}
          </div>
        )}
      </div>

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
                Pilih Kota Jadwal Sholat
              </h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <button
              onClick={handleRequestGeolocation}
              disabled={isLocating}
              className="w-full py-2.5 px-4 rounded-xl bg-[#064e3b] hover:bg-[#043d2f] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{isLocating ? 'Mendeteksi GPS...' : 'Gunakan Lokasi GPS Saya'}</span>
            </button>

            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">
              Daftar Kota Populer:
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
                    <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
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
