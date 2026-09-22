import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const QuranContext = createContext(null);

export function QuranProvider({ children }) {
  // Bookmarks array: [{ id, surahNumber, surahName, ayahNumber, textArab, textLatin, textTranslation, createdAt }]
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('nurquran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Last Read object: { surahNumber, surahName, ayahNumber, surahArabic, totalAyah, timestamp }
  const [lastRead, setLastRead] = useState(() => {
    try {
      const saved = localStorage.getItem('nurquran_last_read');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('nurquran_bookmarks', JSON.stringify(bookmarks));
    } catch (err) {
      console.error('Error saving bookmarks:', err);
    }
  }, [bookmarks]);

  // Persist lastRead
  useEffect(() => {
    try {
      if (lastRead) {
        localStorage.setItem('nurquran_last_read', JSON.stringify(lastRead));
      }
    } catch (err) {
      console.error('Error saving last read:', err);
    }
  }, [lastRead]);

  const addBookmark = useCallback((bookmarkItem) => {
    const id = `${bookmarkItem.surahNumber}:${bookmarkItem.ayahNumber}`;
    setBookmarks(prev => {
      const filtered = prev.filter(b => b.id !== id);
      return [
        {
          ...bookmarkItem,
          id,
          createdAt: new Date().toISOString()
        },
        ...filtered
      ];
    });
  }, []);

  const removeBookmark = useCallback((idOrSurah, ayah) => {
    const id = ayah !== undefined ? `${idOrSurah}:${ayah}` : idOrSurah;
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  const isBookmarked = useCallback((surahNumber, ayahNumber) => {
    const id = `${surahNumber}:${ayahNumber}`;
    return bookmarks.some(b => b.id === id);
  }, [bookmarks]);

  const toggleBookmark = useCallback((item) => {
    const id = `${item.surahNumber}:${item.ayahNumber}`;
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === id);
      if (exists) {
        return prev.filter(b => b.id !== id);
      } else {
        return [
          {
            ...item,
            id,
            createdAt: new Date().toISOString()
          },
          ...prev
        ];
      }
    });
  }, []);

  const updateLastRead = useCallback(({ surahNumber, surahName, ayahNumber = 1, surahArabic = '', totalAyah = 0 }) => {
    setLastRead(prev => {
      // Avoid unnecessary state update if already the exact same position
      if (
        prev &&
        prev.surahNumber === Number(surahNumber) &&
        prev.ayahNumber === Number(ayahNumber)
      ) {
        return prev;
      }
      return {
        surahNumber: Number(surahNumber),
        surahName,
        ayahNumber: Number(ayahNumber),
        surahArabic,
        totalAyah: Number(totalAyah),
        timestamp: new Date().toISOString()
      };
    });
  }, []);

  return (
    <QuranContext.Provider
      value={{
        bookmarks,
        lastRead,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark,
        updateLastRead
      }}
    >
      {children}
    </QuranContext.Provider>
  );
}

export function useQuran() {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within QuranProvider');
  }
  return context;
}
