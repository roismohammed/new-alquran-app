import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSettings } from './SettingsContext';
import { getQariById } from '../services/audioService';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const { settings } = useSettings();
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null); // { type, surahNumber, surahName, ayahNumber, audioUrl, totalAyah, qariId }
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeedState] = useState(settings?.playbackSpeed || 1);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  // Initialize HTMLAudioElement singleton
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // If playing an ayah in auto-next mode, trigger next ayah event
      setCurrentTrack(curr => {
        if (curr && curr.type === 'ayah' && curr.onTrackEnded) {
          curr.onTrackEnded();
        }
        return curr;
      });
    };

    const handleError = (e) => {
      console.warn('Audio playback error:', e);
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Update playback speed when modified
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const playTrack = async (trackData) => {
    if (!audioRef.current || !trackData?.audioUrl) return;

    try {
      setIsLoading(true);
      const qari = getQariById(trackData.qariId || settings.defaultQari);
      const enrichedTrack = {
        ...trackData,
        qariName: qari.name
      };

      setCurrentTrack(enrichedTrack);

      if (audioRef.current.src !== trackData.audioUrl) {
        audioRef.current.src = trackData.audioUrl;
        audioRef.current.playbackRate = playbackSpeed;
      }

      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('Play track failed:', err);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeTrack = async () => {
    if (audioRef.current && currentTrack) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Resume failed:', err);
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  const seek = (seconds) => {
    if (audioRef.current && !isNaN(seconds)) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const setPlaybackSpeed = (speed) => {
    setPlaybackSpeedState(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const setVolume = (val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      setIsMuted(clamped === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const stopTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isLoading,
        currentTrack,
        currentTime,
        duration,
        playbackSpeed,
        volume,
        isMuted,
        autoNext,
        setAutoNext,
        isPlayerExpanded,
        setIsPlayerExpanded,
        playTrack,
        pauseTrack,
        resumeTrack,
        togglePlay,
        seek,
        setPlaybackSpeed,
        setVolume,
        toggleMute,
        stopTrack
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
