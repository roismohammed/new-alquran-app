import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export function AsmaulHusnaCard({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0e1614] border border-emerald-950/8 dark:border-emerald-500/10 hover:border-[#064e3b]/30 dark:hover:border-emerald-500/30 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="w-7 h-7 rounded-lg bg-emerald-950/5 dark:bg-[#14221f] text-[#064e3b] dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
            {String(item.id).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider group-hover:text-[#064e3b] dark:group-hover:text-emerald-400 transition-colors">
            Detail →
          </span>
        </div>

        <div className="py-2 text-center">
          <div className="font-arabic text-2xl sm:text-3xl font-bold text-[#064e3b] dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
            {item.arab}
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
            {item.latin}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {item.arti}
          </p>
        </div>
      </div>

      {/* Detail Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0e1614] border border-emerald-950/15 dark:border-emerald-500/20 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950/8 dark:border-emerald-500/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#064e3b] dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Asmaul Husna #{item.id}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 text-center space-y-2">
              <div className="font-arabic text-4xl sm:text-5xl font-bold text-[#064e3b] dark:text-slate-50">
                {item.arab}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {item.latin}
              </h3>
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                "{item.arti}"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/4 dark:bg-[#121c1a] border border-emerald-950/8 dark:border-emerald-500/10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <h5 className="font-semibold text-xs text-[#064e3b] dark:text-emerald-300 uppercase tracking-wider mb-1">
                Makna & Penghayatan:
              </h5>
              {item.makna}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
