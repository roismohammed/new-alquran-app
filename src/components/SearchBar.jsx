import { Search, X } from 'lucide-react';

export function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = 'Cari...',
  className = '',
  autoFocus = false
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-3.5 text-emerald-700/60 dark:text-emerald-400/60 pointer-events-none">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl bg-white/80 dark:bg-emerald-950/40 border border-emerald-900/10 dark:border-emerald-100/10 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-xs"
      />
      {value && (
        <button
          onClick={onClear || (() => onChange(''))}
          aria-label="Hapus pencarian"
          className="absolute right-3 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
