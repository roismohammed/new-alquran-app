import { Play, Pause, X, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useSettings } from '../context/SettingsContext';
import { formatAudioTime } from '../utils/formatters';

export function MiniAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    volume,
    isMuted,
    isPlayerExpanded,
    setIsPlayerExpanded,
    togglePlay,
    seek,
    setPlaybackSpeed,
    setVolume,
    toggleMute,
    stopTrack
  } = useAudio();
  const { settings } = useSettings();

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Mini Floating Bar (Bottom) */}
      <div className="fixed bottom-16 md:bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#064e3b] text-white backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-600/30 p-3.5 transition-all">
        {/* Progress Bar (Clickable) */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            seek(pos * duration);
          }}
          className="relative w-full h-1.5 bg-emerald-950/60 rounded-full cursor-pointer mb-2 overflow-hidden"
        >
          <div
            className="absolute top-0 bottom-0 left-0 bg-amber-400 rounded-full transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Track Info */}
          <div
            onClick={() => setIsPlayerExpanded(true)}
            className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              {currentTrack.surahNumber || 'QS'}
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">
                {currentTrack.surahName} {currentTrack.ayahNumber ? `• Ayat ${currentTrack.ayahNumber}` : ''}
              </h4>
              <p className="text-[10px] text-emerald-200/80 truncate">
                {currentTrack.qariName || 'Mishary Rashid Alafasy'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] font-mono text-emerald-200/90 mr-1">
              {formatAudioTime(currentTime)}
            </span>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Jeda' : 'Putar'}
              className="w-8 h-8 rounded-full bg-white text-[#064e3b] hover:bg-amber-300 flex items-center justify-center transition-transform active:scale-95 shadow-xs"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Expand */}
            <button
              onClick={() => setIsPlayerExpanded(true)}
              aria-label="Buka Pemutar Audio Penuh"
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={stopTrack}
              aria-label="Tutup Audio"
              className="p-1.5 text-emerald-300 hover:text-rose-300 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Audio Modal */}
      {isPlayerExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsPlayerExpanded(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-[#064e3b] text-white p-6 sm:p-8 shadow-2xl border border-emerald-600/30 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pattern */}
            <div className="absolute inset-0 islamic-star-pattern pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                    Pemutar Murottal Al-Qur'an
                  </span>
                </div>
                <button
                  onClick={() => setIsPlayerExpanded(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>

              {/* Artwork / Surah Calligraphy Disk */}
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#033829] border-2 border-amber-400/40 flex items-center justify-center shadow-xl shadow-emerald-950/40 mb-3">
                  <span className="font-arabic text-3xl sm:text-4xl text-amber-300">
                    {currentTrack.surahName || 'القرآن'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {currentTrack.surahName}
                </h3>
                <p className="text-sm text-emerald-200/90 mt-0.5">
                  {currentTrack.ayahNumber ? `Ayat ${currentTrack.ayahNumber}` : 'Surah Penuh'} • {currentTrack.qariName}
                </p>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1.5">
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    seek(pos * duration);
                  }}
                  className="relative w-full h-2 bg-emerald-950/80 rounded-full cursor-pointer overflow-hidden"
                >
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-amber-400 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono text-emerald-200">
                  <span>{formatAudioTime(currentTime)}</span>
                  <span>{formatAudioTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => seek(Math.max(0, currentTime - 10))}
                  aria-label="Mundur 10 Detik"
                  className="p-2.5 rounded-full hover:bg-white/10 text-emerald-200 hover:text-white transition-colors text-xs font-semibold"
                >
                  -10s
                </button>

                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Jeda' : 'Putar'}
                  className="w-14 h-14 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-1" />
                  )}
                </button>

                <button
                  onClick={() => seek(Math.min(duration, currentTime + 10))}
                  aria-label="Maju 10 Detik"
                  className="p-2.5 rounded-full hover:bg-white/10 text-emerald-200 hover:text-white transition-colors text-xs font-semibold"
                >
                  +10s
                </button>
              </div>

              {/* Speed & Volume Row */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 items-center">
                {/* Speed buttons */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-emerald-200 mr-1">Speed:</span>
                  {[0.75, 1, 1.25, 1.5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setPlaybackSpeed(s)}
                      className={`px-2 py-1 text-xs rounded-lg font-semibold transition-all ${
                        playbackSpeed === s
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-white/10 hover:bg-white/20 text-emerald-100'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 justify-end">
                  <button onClick={toggleMute} className="text-emerald-200 hover:text-white">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 sm:w-28 h-1.5 bg-emerald-950 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
