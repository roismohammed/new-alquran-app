import { useState } from 'react';
import { Play, Pause, ChevronDown, User } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useSettings } from '../context/SettingsContext';
import { getSurahAudioUrl, getQariById } from '../services/audioService';
import { QARI_LIST } from '../config/api';

export function QuranAudioPlayer({ surah }) {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  const { settings, updateSetting } = useSettings();
  const [showQariDropdown, setShowQariDropdown] = useState(false);

  const selectedQari = getQariById(settings.defaultQari);
  const isPlayingFullSurah = isPlaying && currentTrack?.type === 'surah' && currentTrack?.surahNumber === surah.nomor;

  const handleToggleSurahAudio = () => {
    if (isPlayingFullSurah) {
      pauseTrack();
    } else {
      const audioUrl = getSurahAudioUrl(surah.nomor, settings.defaultQari);
      playTrack({
        type: 'surah',
        surahNumber: surah.nomor,
        surahName: surah.namaLatin,
        audioUrl,
        qariId: settings.defaultQari,
        totalAyah: surah.jumlahAyat
      });
    }
  };

  const handleSelectQari = (qariId) => {
    updateSetting('defaultQari', qariId);
    setShowQariDropdown(false);
    if (isPlayingFullSurah) {
      const audioUrl = getSurahAudioUrl(surah.nomor, qariId);
      playTrack({
        type: 'surah',
        surahNumber: surah.nomor,
        surahName: surah.namaLatin,
        audioUrl,
        qariId,
        totalAyah: surah.jumlahAyat
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
      {/* Play Button */}
      <button
        onClick={handleToggleSurahAudio}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-2xs transition-colors ${
          isPlayingFullSurah
            ? 'bg-emerald-700 text-white'
            : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white'
        }`}
      >
        {isPlayingFullSurah ? (
          <>
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>Jeda Audio</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            <span>Putar Surah</span>
          </>
        )}
      </button>

      {/* Qari Selector Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowQariDropdown(!showQariDropdown)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors"
        >
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 dark:text-slate-400">Qari:</span>
          <span className="font-semibold">{selectedQari.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {showQariDropdown && (
          <div className="absolute right-0 sm:right-0 left-0 sm:left-auto mt-1.5 w-60 rounded-2xl bg-white dark:bg-[#0f1513] border border-slate-200/80 dark:border-slate-800 shadow-lg p-1.5 z-30 space-y-1">
            <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Pilih Qari
            </div>
            {QARI_LIST.map((qari) => (
              <button
                key={qari.id}
                onClick={() => handleSelectQari(qari.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  settings.defaultQari === qari.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="font-medium">{qari.name}</div>
                  <div className="font-arabic text-[11px] text-slate-400">
                    {qari.arabicName}
                  </div>
                </div>
                {settings.defaultQari === qari.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
