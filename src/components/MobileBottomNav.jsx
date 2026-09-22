import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Clock,
  Heart,
  MoreHorizontal,
  Compass,
  Sparkles,
  Bookmark,
  Settings,
  CircleDot,
  X
} from 'lucide-react';
import { useQuran } from '../context/QuranContext';

export function MobileBottomNav() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { bookmarks } = useQuran();
  const location = useLocation();

  const mainItems = [
    { to: '/', label: 'Beranda', icon: Home, exact: true },
    { to: '/quran', label: 'Qur\'an', icon: BookOpen },
    { to: '/prayer', label: 'Sholat', icon: Clock, featured: true },
    { to: '/dua', label: 'Doa', icon: Heart },
  ];

  const moreItems = [
    { to: '/dhikr', label: 'Dzikir & Tasbih', icon: CircleDot, desc: 'Hitung tasbih & wirid harian' },
    { to: '/qibla', label: 'Arah Kiblat', icon: Compass, desc: 'Kompas penunjuk Ka\'bah Makkah' },
    { to: '/asmaul-husna', label: 'Asmaul Husna', icon: Sparkles, desc: '99 Asma Allah & Makna' },
    { to: '/bookmarks', label: 'Ayat Tersimpan', icon: Bookmark, badge: bookmarks.length, desc: 'Koleksi bookmark ayat' },
    { to: '/settings', label: 'Pengaturan', icon: Settings, desc: 'Preferensi qari, font, & lokasi' }
  ];

  const isMoreActive = moreItems.some(item => location.pathname === item.to);

  return (
    <>
      {/* Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fcfbf8]/95 dark:bg-[#080c0b]/95 backdrop-blur-lg border-t border-emerald-950/8 dark:border-emerald-500/10 safe-area-pb">
        <div className="flex items-center justify-around h-16 px-2">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isFeatured = item.featured;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setIsMoreOpen(false)}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
                    isFeatured
                      ? 'relative'
                      : isActive
                      ? 'text-[#064e3b] dark:text-emerald-300 font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-[#064e3b]'
                  }`
                }
              >
                {({ isActive }) => {
                  if (isFeatured) {
                    return (
                      <div className="flex flex-col items-center -mt-5">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90 border-2 ${
                            isActive
                              ? 'bg-linear-to-b from-[#064e3b] via-[#043d2f] to-[#02281f] text-white border-amber-400 ring-4 ring-emerald-500/20 shadow-emerald-950/40'
                              : 'bg-linear-to-b from-[#064e3b] to-[#033b2e] text-white border-amber-400/70 ring-4 ring-[#fcfbf8] dark:ring-[#080c0b] shadow-emerald-950/25'
                          }`}
                        >
                          <Icon className="w-5 h-5 text-amber-300 stroke-[2.2px]" />
                        </div>
                        <span className={`text-[10px] mt-1 font-bold ${isActive ? 'text-[#064e3b] dark:text-emerald-300' : 'text-slate-600 dark:text-slate-400'}`}>
                          {item.label}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <>
                      <div className="relative">
                        <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                        {isActive && (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#064e3b] dark:bg-emerald-400" />
                        )}
                      </div>
                      <span className="text-[10px] mt-1 tracking-tight font-medium">{item.label}</span>
                    </>
                  );
                }}
              </NavLink>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
              isMoreOpen || isMoreActive
                ? 'text-[#064e3b] dark:text-emerald-300 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-[#064e3b]'
            }`}
          >
            <div className="relative">
              <MoreHorizontal className={`w-5 h-5 ${(isMoreOpen || isMoreActive) ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              {(isMoreOpen || isMoreActive) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#064e3b] dark:bg-emerald-400" />
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight font-medium">Lainnya</span>
          </button>
        </div>
      </div>

      {/* More Bottom Sheet / Drawer Modal */}
      {isMoreOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-150"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            className="w-full bg-white dark:bg-[#0e1614] rounded-t-3xl border-t border-emerald-950/10 dark:border-emerald-500/15 p-5 space-y-4 pb-24 shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-emerald-950/8 dark:border-emerald-500/10">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Menu Tambahan
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Jelajahi fitur pendukung ibadah NurQuran
                </p>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-[#121c1a]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-emerald-950/4 dark:bg-[#121c1a] hover:bg-emerald-950/8 dark:hover:bg-[#14221f] transition-colors border border-emerald-950/5 dark:border-emerald-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100/80 dark:bg-emerald-900/40 text-[#064e3b] dark:text-emerald-300 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-slate-950">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
