import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Heart,
  Compass,
  Sparkles,
  Search,
  Moon,
  Sun,
  Settings,
  Bookmark
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useQuran } from '../context/QuranContext';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NurQuranLogo } from './NurQuranLogo';

export function Navbar() {
  const { settings, toggleTheme } = useSettings();
  const { bookmarks } = useQuran();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Beranda', exact: true },
    { to: '/quran', label: 'Al-Qur\'an', icon: BookOpen },
    { to: '/prayer', label: 'Jadwal Sholat', icon: Clock },
    { to: '/dua', label: 'Doa & Dzikir', icon: Heart },
    { to: '/qibla', label: 'Kiblat', icon: Compass },
    { to: '/asmaul-husna', label: 'Asmaul Husna', icon: Sparkles }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-emerald-950/8 dark:border-emerald-500/10 bg-[#fcfbf8]/95 dark:bg-[#080c0b]/95 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Brand / Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
            aria-label="NurQuran Beranda"
          >
            <NurQuranLogo size="md" className="group-hover:scale-105 group-active:scale-95 transition-transform" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-emerald-950 dark:text-emerald-100">
                  NurQuran
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              </div>
              <p className="text-[10px] tracking-wide text-emerald-800/70 dark:text-emerald-400/70 hidden sm:block font-medium -mt-0.5">
                Teman Ibadah, Setiap Hari
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#064e3b]/10 dark:bg-emerald-500/15 text-[#064e3b] dark:text-emerald-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#064e3b] dark:hover:text-emerald-200 hover:bg-emerald-950/5 dark:hover:bg-[#121c1a]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Cari di NurQuran"
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs rounded-xl border border-emerald-950/10 dark:border-emerald-500/15 bg-white dark:bg-[#0e1614] text-slate-600 dark:text-slate-300 hover:border-[#064e3b] dark:hover:border-emerald-400 active:scale-95 transition-all shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-[#064e3b] dark:text-emerald-400" />
              <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-medium">Cari...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-[#121c1a] text-slate-500 dark:text-slate-400 rounded-md border border-slate-200/60 dark:border-emerald-900/40">
                Ctrl K
              </kbd>
            </button>

            {/* Bookmarks Quick Access */}
            <Link
              to="/bookmarks"
              aria-label="Bookmark Tersimpan"
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#064e3b] dark:hover:text-emerald-200 hover:bg-emerald-950/5 dark:hover:bg-[#121c1a] active:scale-95 transition-all"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-bold flex items-center justify-center">
                  {bookmarks.length > 9 ? '9+' : bookmarks.length}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Ganti Tema Gelap / Terang"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#064e3b] dark:hover:text-emerald-200 hover:bg-emerald-950/5 dark:hover:bg-[#121c1a] active:scale-95 transition-all"
            >
              {settings.theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Settings */}
            <Link
              to="/settings"
              aria-label="Pengaturan"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#064e3b] dark:hover:text-emerald-200 hover:bg-emerald-950/5 dark:hover:bg-[#121c1a] active:scale-95 transition-all"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
