import { useState, useMemo } from 'react';
import { Sparkles, Search } from 'lucide-react';
import { AsmaulHusnaCard } from '../components/AsmaulHusnaCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { ASMAUL_HUSNA } from '../data/asmaulHusna';

export function AsmaulHusna() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return ASMAUL_HUSNA;
    const q = searchQuery.trim().toLowerCase();
    return ASMAUL_HUSNA.filter(
      item =>
        item.latin.toLowerCase().includes(q) ||
        item.arti.toLowerCase().includes(q) ||
        item.makna.toLowerCase().includes(q) ||
        String(item.id) === q
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="pt-2 sm:pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] dark:text-emerald-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Nama-Nama Agung Allah
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              99 Asmaul Husna
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Kenali dan renungkan sifat-sifat kesempurnaan Allah SWT beserta arti dan maknanya.
            </p>
          </div>

          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-950/5 dark:bg-emerald-900/40 text-[#064e3b] dark:text-emerald-300 border border-emerald-900/10 dark:border-emerald-500/20 shrink-0 self-start sm:self-auto">
            {filteredItems.length} dari 99 Nama
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Cari nama Asmaul Husna (cth: Ar-Rahman, Al-Malik, Maha Pengasih)..."
        />
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredItems.map((item) => (
            <AsmaulHusnaCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="Nama tidak ditemukan"
          description={`Tidak ada Asmaul Husna yang sesuai dengan pencarian "${searchQuery}".`}
          actionText="Reset Pencarian"
          onAction={() => setSearchQuery('')}
        />
      )}
    </div>
  );
}
