import { Bookmark } from 'lucide-react';

export function BookmarkButton({ isBookmarked, onClick, size = 'sm', className = '' }) {
  return (
    <button
      onClick={onClick}
      title={isBookmarked ? 'Hapus bookmark' : 'Simpan bookmark'}
      aria-label={isBookmarked ? 'Hapus bookmark' : 'Simpan bookmark'}
      className={`p-2 rounded-xl transition-all ${
        isBookmarked
          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
          : 'text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
      } ${className}`}
    >
      <Bookmark
        className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} ${
          isBookmarked ? 'fill-current' : ''
        }`}
      />
    </button>
  );
}
