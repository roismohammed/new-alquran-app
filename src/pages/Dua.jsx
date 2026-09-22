import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, CircleDot, ArrowRight } from 'lucide-react';
import { DuaCard } from '../components/DuaCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { DUA_CATEGORIES, DUAS_DATA } from '../data/duas';

export function Dua() {
  const [activeCategory, setActiveCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDuas = useMemo(() => {
    return DUAS_DATA.filter((d) => {
      // Category filter
      if (activeCategory !== 'semua' && d.category !== activeCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        return (
          d.title.toLowerCase().includes(q) ||
          d.latin.toLowerCase().includes(q) ||
          d.terjemahan.toLowerCase().includes(q) ||
          d.sumber.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="pt-2 sm:pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] dark:text-emerald-300 uppercase tracking-wider mb-1">
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              Kumpulan Doa Shahih
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Doa & Munajat Harian
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Doa-doa bersumber dari Al-Qur'an dan As-Sunnah lengkap dengan teks Arab, latin, dan artinya.
            </p>
          </div>

          {/* Quick link to Dhikr Counter */}
          <Link
            to="/dhikr"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#043d2f] text-white font-semibold text-xs shadow-xs transition-colors self-start sm:self-auto"
          >
            <CircleDot className="w-4 h-4 text-amber-400" />
            <span>Tasbih & Dzikir Digital</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari doa (cth: orang tua, rezeki, perlindungan, tidur)..."
        />
      </div>

      {/* Categories Scrollable Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DUA_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-[#064e3b] text-white shadow-xs scale-105'
                : 'bg-white dark:bg-[#0e1614] text-slate-700 dark:text-slate-300 border border-emerald-950/8 dark:border-emerald-500/10 hover:border-[#064e3b]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Duas Grid */}
      {filteredDuas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDuas.map((dua) => (
            <DuaCard key={dua.id} dua={dua} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="Doa tidak ditemukan"
          description={`Tidak ada doa yang cocok dengan pencarian "${searchQuery}".`}
          actionText="Tampilkan Semua Doa"
          onAction={() => {
            setSearchQuery('');
            setActiveCategory('semua');
          }}
        />
      )}
    </div>
  );
}
