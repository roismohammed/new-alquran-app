import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { QuranProvider } from './context/QuranContext';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MiniAudioPlayer } from './components/MiniAudioPlayer';
import { OnboardingModal } from './components/OnboardingModal';
import { SplashScreen } from './components/SplashScreen';

// Pages
import { Home } from './pages/Home';
import { Quran } from './pages/Quran';
import { QuranReader } from './pages/QuranReader';
import { Bookmarks } from './pages/Bookmarks';
import { Prayer } from './pages/Prayer';
import { Qibla } from './pages/Qibla';
import { Dua } from './pages/Dua';
import { Dhikr } from './pages/Dhikr';
import { AsmaulHusna } from './pages/AsmaulHusna';
import { Settings } from './pages/Settings';

// ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    try {
      const isCompleted = localStorage.getItem('nurquran_onboarding_completed');
      if (!isCompleted) {
        setShowOnboarding(true);
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf8] dark:bg-[#080c0b] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* 1. Fullscreen Animated App Splash Screen on Launch */}
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      <ScrollToTop />
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-28 md:pb-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/quran/:surahId" element={<QuranReader />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/qibla" element={<Qibla />} />
          <Route path="/dua" element={<Dua />} />
          <Route path="/dhikr" element={<Dhikr />} />
          <Route path="/asmaul-husna" element={<AsmaulHusna />} />
          <Route path="/settings" element={<Settings onOpenOnboarding={() => setShowOnboarding(true)} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Persistent Audio Player */}
      <MiniAudioPlayer />

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav />

      {/* 2. Fullscreen Interactive Onboarding Walkthrough */}
      {!showSplash && showOnboarding && (
        <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      )}

      {/* Footer */}
      <footer className="hidden md:block border-t border-emerald-950/8 dark:border-emerald-500/10 py-6 bg-white/60 dark:bg-[#0e1614]/60 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-semibold text-emerald-900 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span>NurQuran</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-500 dark:text-slate-400 font-normal">Teman Ibadah, Setiap Hari</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Data resmi Al-Qur'an Kemenag RI & Audio Murottal Qari Internasional.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <QuranProvider>
        <AudioProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AudioProvider>
      </QuranProvider>
    </SettingsProvider>
  );
}
