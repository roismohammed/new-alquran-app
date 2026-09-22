import { useState } from 'react';
import { Play, Pause, Bookmark, Copy, Share2, Check, Volume2 } from 'lucide-react';
import { useQuran } from '../context/QuranContext';
import { useSettings } from '../context/SettingsContext';
import { toArabicNumerals, copyToClipboard, shareContent } from '../utils/formatters';
import { ARABIC_FONT_SIZES } from '../config/api';

export function AyahCard({
  surahNumber,
  surahName,
  ayah,
  isPlayingThisAyah = false,
  onPlayAyah
}) {
  const { isBookmarked, toggleBookmark } = useQuran();
  const { settings } = useSettings();
  const [copied, setCopied] = useState(false);

  const bookmarked = isBookmarked(surahNumber, ayah.nomorAyat);
  const fontSizeConfig = ARABIC_FONT_SIZES[settings.arabicFontSize] || ARABIC_FONT_SIZES.medium;

  const handleCopy = async () => {
    const textToCopy = `${ayah.teksArab}\n\n"${ayah.teksIndonesia}"\n(QS. ${surahName}: ${ayah.nomorAyat})`;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    await shareContent({
      title: `QS. ${surahName} Ayat ${ayah.nomorAyat}`,
      text: `${ayah.teksArab}\n\n"${ayah.teksIndonesia}"\n(QS. ${surahName}: ${ayah.nomorAyat})`
    });
  };

  const handleBookmarkToggle = () => {
    toggleBookmark({
      surahNumber,
      surahName,
      ayahNumber: ayah.nomorAyat,
      textArab: ayah.teksArab,
      textLatin: ayah.teksLatin || '',
      textTranslation: ayah.teksIndonesia
    });
  };

  return (
    <article
      id={`ayah-${ayah.nomorAyat}`}
      className={`relative scroll-mt-24 p-5 sm:p-7 rounded-2xl sm:rounded-3xl transition-all duration-200 border ${
        isPlayingThisAyah
          ? 'bg-emerald-50/70 dark:bg-emerald-950/25 border-emerald-500/40 shadow-sm'
          : 'bg-white dark:bg-[#0f1513] border-slate-200/70 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 shadow-2xs'
      }`}
    >
      {/* Top action row */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/60">
        {/* Ayah Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center min-w-8 h-8 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200/60 dark:border-slate-700/60">
            {surahNumber}:{ayah.nomorAyat}
          </span>
          {isPlayingThisAyah && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-600 text-white shadow-xs animate-in fade-in duration-150">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Memutar</span>
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Play Ayah Audio */}
          <button
            onClick={() => onPlayAyah(ayah.nomorAyat)}
            aria-label={isPlayingThisAyah ? 'Jeda Audio Ayat' : 'Putar Audio Ayat'}
            title={isPlayingThisAyah ? 'Jeda Audio' : 'Putar Audio'}
            className={`p-2 rounded-xl transition-colors ${
              isPlayingThisAyah
                ? 'bg-emerald-700 text-white'
                : 'text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            {isPlayingThisAyah ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Bookmark */}
          <button
            onClick={handleBookmarkToggle}
            aria-label={bookmarked ? 'Hapus Bookmark' : 'Simpan Bookmark'}
            title={bookmarked ? 'Hapus Bookmark' : 'Simpan Bookmark'}
            className={`p-2 rounded-xl transition-colors ${
              bookmarked
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                : 'text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            aria-label="Salin Ayat"
            title={copied ? 'Disalin!' : 'Salin Ayat'}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            aria-label="Bagikan Ayat"
            title="Bagikan Ayat"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Arabic Text */}
      <div className="py-3 text-right">
        <p className={`font-arabic text-slate-900 dark:text-slate-50 ${fontSizeConfig.class}`}>
          {ayah.teksArab}
          <span className="inline-flex items-center justify-center w-8 h-8 mx-2.5 align-middle text-sm font-arabic font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-600/20 dark:border-emerald-500/20 rounded-full select-none">
            {toArabicNumerals(ayah.nomorAyat)}
          </span>
        </p>
      </div>

      {/* Latin Transliteration */}
      {settings.showLatin && ayah.teksLatin && (
        <div className="mt-3 text-sm text-emerald-800/85 dark:text-emerald-300/85 font-sans leading-relaxed">
          {ayah.teksLatin}
        </div>
      )}

      {/* Indonesian Translation */}
      {settings.showTranslation && ayah.teksIndonesia && (
        <div className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {ayah.teksIndonesia}
        </div>
      )}
    </article>
  );
}
