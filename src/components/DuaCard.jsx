import { useState } from 'react';
import { Bookmark, Copy, Share2, Check, BookOpen } from 'lucide-react';
import { copyToClipboard, shareContent } from '../utils/formatters';

export function DuaCard({ dua }) {
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = localStorage.getItem('nurquran_dua_bookmarks');
      const list = saved ? JSON.parse(saved) : [];
      return list.includes(dua.id);
    } catch {
      return false;
    }
  });

  const handleCopy = async () => {
    const text = `${dua.title}\n\n${dua.arab}\n\n${dua.latin}\n\n"${dua.terjemahan}"\n(${dua.sumber})`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    await shareContent({
      title: dua.title,
      text: `${dua.arab}\n\n"${dua.terjemahan}"\n(${dua.sumber})`
    });
  };

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem('nurquran_dua_bookmarks');
      let list = saved ? JSON.parse(saved) : [];
      if (isBookmarked) {
        list = list.filter(id => id !== dua.id);
        setIsBookmarked(false);
      } else {
        list.push(dua.id);
        setIsBookmarked(true);
      }
      localStorage.setItem('nurquran_dua_bookmarks', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs hover:border-[#064e3b]/30 dark:hover:border-emerald-500/25 transition-all space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-emerald-950/8 dark:border-emerald-500/10">
        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
          {dua.title}
        </h3>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleBookmark}
            aria-label={isBookmarked ? 'Hapus Bookmark' : 'Simpan Bookmark'}
            className={`p-2 rounded-xl transition-all ${
              isBookmarked
                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                : 'text-slate-400 hover:text-[#064e3b] dark:hover:text-emerald-200 hover:bg-emerald-950/5 dark:hover:bg-[#14221f]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleCopy}
            aria-label="Salin Doa"
            className="p-2 rounded-xl text-slate-400 hover:text-[#064e3b] dark:hover:text-emerald-200 hover:bg-emerald-950/5 dark:hover:bg-[#14221f] transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleShare}
            aria-label="Bagikan Doa"
            className="p-2 rounded-xl text-slate-400 hover:text-[#064e3b] dark:hover:text-emerald-200 hover:bg-emerald-950/5 dark:hover:bg-[#14221f] transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Arabic text */}
      <div className="py-2 text-right">
        <p className="font-arabic text-2xl sm:text-3xl text-emerald-950 dark:text-slate-50 leading-[2.3]">
          {dua.arab}
        </p>
      </div>

      {/* Latin */}
      <div className="text-sm font-serif italic text-[#064e3b]/80 dark:text-emerald-300/80 leading-relaxed">
        {dua.latin}
      </div>

      {/* Indonesian Translation */}
      <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
        "{dua.terjemahan}"
      </div>

      {/* Reference source */}
      <div className="pt-3 border-t border-emerald-950/8 dark:border-emerald-500/10 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
        <span>Sumber: {dua.sumber}</span>
      </div>
    </div>
  );
}
