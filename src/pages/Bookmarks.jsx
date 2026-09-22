import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { useQuran } from '../context/QuranContext';
import { EmptyState } from '../components/EmptyState';

export function Bookmarks() {
  const { bookmarks, removeBookmark } = useQuran();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="pt-2 sm:pt-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#064e3b] dark:text-emerald-300 uppercase tracking-wider mb-1">
              <Bookmark className="w-4 h-4 text-amber-500 fill-current" />
              Simpanan Ayat
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Bookmark Saya
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Daftar ayat-ayat Al-Qur'an yang telah Anda tandai untuk dibaca kembali.
            </p>
          </div>

          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-950/5 dark:bg-emerald-900/40 text-[#064e3b] dark:text-emerald-300 border border-emerald-900/10 dark:border-emerald-500/20 shrink-0">
            {bookmarks.length} Bookmark
          </span>
        </div>
      </div>

      {/* Bookmarks List */}
      {bookmarks.length > 0 ? (
        <div className="space-y-3.5">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0b1d1a] border border-emerald-950/8 dark:border-emerald-500/10 shadow-2xs hover:border-[#064e3b]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950/5 dark:bg-emerald-900/50 text-[#064e3b] dark:text-emerald-300 text-xs font-bold border border-emerald-900/10">
                    QS. {b.surahName}: {b.ayahNumber}
                  </span>
                  {b.createdAt && (
                    <span className="text-[11px] text-slate-400">
                      Disimpan {new Date(b.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  )}
                </div>

                {b.textArab && (
                  <div className="font-arabic text-lg sm:text-xl text-emerald-950 dark:text-emerald-100 line-clamp-1 py-0.5">
                    {b.textArab}
                  </div>
                )}

                {b.textTranslation && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    "{b.textTranslation}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Link
                  to={`/quran/${b.surahNumber}#ayah-${b.ayahNumber}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#043d2f] text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  <span>Buka Ayat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => removeBookmark(b.id)}
                  aria-label="Hapus Bookmark"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="Belum ada ayat yang ditandai"
          description="Saat membaca Al-Qur'an, klik ikon bookmark pada ayat untuk menyimpannya ke halaman ini."
          actionText="Buka Al-Qur'an Sekarang"
          onAction={() => {}}
        />
      )}
    </div>
  );
}
