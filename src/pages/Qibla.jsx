import { useState } from 'react';
import { Compass, MapPin, Navigation, CheckCircle2, Shield } from 'lucide-react';
import { useQibla } from '../hooks/useQibla';
import { useSettings } from '../context/SettingsContext';

export function Qibla() {
  const {
    qiblaAngle,
    distanceKm,
    needleOffset,
    isFacingQibla,
    permissionGranted,
    requestCompassPermission
  } = useQibla();
  const { settings } = useSettings();
  const [askingPermission, setAskingPermission] = useState(false);

  const handleEnableSensor = async () => {
    setAskingPermission(true);
    await requestCompassPermission();
    setAskingPermission(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-16 text-center">
      {/* Header */}
      <div className="pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] dark:text-emerald-300 uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4 text-amber-500" />
          Penunjuk Arah Sholat
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Arah Kiblat
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Arah menuju Ka'bah di Masjidil Haram, Makkah Al-Mukarramah.
        </p>
      </div>

      {/* Location info pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
        <MapPin className="w-3.5 h-3.5 text-amber-500" />
        <span>{settings.location.city}, {settings.location.country}</span>
        <span>•</span>
        <span className="text-[#064e3b] dark:text-emerald-400 font-bold">{qiblaAngle}°</span>
      </div>

      {/* Main Interactive Compass UI */}
      <div className="relative py-6 flex flex-col items-center justify-center">
        {/* Outer Dial Circle */}
        <div
          className={`relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 ${
            isFacingQibla
              ? 'border-amber-400 ring-8 ring-amber-400/20 shadow-2xl shadow-amber-500/20'
              : 'border-[#064e3b]/30 dark:border-emerald-500/25 shadow-xl'
          } bg-linear-to-b from-white to-emerald-50/30 dark:from-[#0e1614] dark:to-[#080c0b] flex items-center justify-center transition-all duration-300`}
        >
          {/* Degree & Cardinal Marks */}
          <span className="absolute top-2.5 font-bold text-xs text-rose-600 dark:text-rose-400">
            U (0°)
          </span>
          <span className="absolute right-3 font-bold text-xs text-slate-400">
            T (90°)
          </span>
          <span className="absolute bottom-2.5 font-bold text-xs text-slate-400">
            S (180°)
          </span>
          <span className="absolute left-3 font-bold text-xs text-slate-400">
            B (270°)
          </span>

          {/* Rotating Compass Needle Dial */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-200"
            style={{
              transform: `rotate(${permissionGranted ? needleOffset : qiblaAngle}deg)`
            }}
          >
            {/* Ka'bah Pointer Icon at the top of needle */}
            <div className="absolute -top-3 flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-[#064e3b] border border-amber-400 shadow-md flex items-center justify-center text-amber-300 text-xs font-bold animate-bounce">
                🕋
              </div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#064e3b] dark:border-b-emerald-400" />
            </div>

            {/* Needle line */}
            <div className="w-1.5 h-44 bg-linear-to-b from-[#064e3b] via-amber-400 to-slate-400 dark:from-emerald-400 dark:via-amber-400 dark:to-slate-600 rounded-full shadow-sm" />
          </div>

          {/* Center Hub */}
          <div className="w-16 h-16 rounded-full bg-[#064e3b] text-white flex flex-col items-center justify-center shadow-lg border-2 border-amber-400 z-10">
            <span className="text-xs font-mono font-extrabold text-amber-300">
              {qiblaAngle}°
            </span>
          </div>
        </div>

        {/* Facing Status Notification */}
        {permissionGranted && (
          <div className="mt-4">
            {isFacingQibla ? (
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-400 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Tepat Menghadap Kiblat!</span>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Putar ponsel hingga jarum mengarah tepat ke atas (simbol Ka'bah).
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sensor Permission Request Button for Mobile Devices */}
      {!permissionGranted && (
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 text-left space-y-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-950/5 dark:bg-emerald-900/40 text-[#064e3b] dark:text-emerald-300 shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Gunakan Sensor Kompas Perangkat
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Izinkan akses sensor orientasi untuk memutar jarum kompas secara langsung saat ponsel diputar.
              </p>
            </div>
          </div>

          <button
            onClick={handleEnableSensor}
            disabled={askingPermission}
            className="w-full py-2.5 px-4 rounded-xl bg-[#064e3b] hover:bg-[#043d2f] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>{askingPermission ? 'Meminta izin...' : 'Aktifkan Sensor Kompas'}</span>
          </button>
        </div>
      )}

      {/* Info Card */}
      <div className="grid grid-cols-2 gap-3 text-left">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5 font-medium">
            Sudut Derajat Kiblat
          </span>
          <span className="text-xl font-extrabold text-[#064e3b] dark:text-emerald-200">
            {qiblaAngle}°
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            Dari Arah Utara Sejati
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5 font-medium">
            Jarak ke Ka'bah
          </span>
          <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">
            {distanceKm.toLocaleString('id-ID')} km
          </span>
          <span className="text-xs text-slate-500 block mt-0.5">
            Makkah Al-Mukarramah
          </span>
        </div>
      </div>

      {/* Fallback Notice */}
      <div className="p-4 rounded-2xl bg-emerald-950/4 dark:bg-[#121c1a] border border-emerald-950/5 dark:border-emerald-500/10 text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-left">
        <p className="font-semibold text-[#064e3b] dark:text-emerald-300 mb-1">
          💡 Tips Penggunaan Kompas:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Letakkan ponsel di permukaan datar dan jauhkan dari benda berbahan logam atau magnetik.</li>
          <li>Kiblat dari wilayah Indonesia umumnya berkisar antara <strong>290° – 295°</strong> (arah Barat Laut).</li>
        </ul>
      </div>
    </div>
  );
}
