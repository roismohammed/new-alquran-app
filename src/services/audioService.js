import { QARI_LIST } from '../config/api';

export function getQariList() {
  return QARI_LIST;
}

export function getQariById(id) {
  return QARI_LIST.find(q => q.id === id) || QARI_LIST[0];
}

// Generate URL for full Surah audio
export function getSurahAudioUrl(surahNumber, qariId = '05') {
  const qari = getQariById(qariId);
  const formattedSurah = String(surahNumber).padStart(3, '0');
  // Primary CDN from equran.id
  return `https://cdn.equran.id/audio-full/${qari.cdnPath}/${formattedSurah}.mp3`;
}

// Generate URL for single Ayah audio
export function getAyahAudioUrl(surahNumber, ayahNumber, qariId = '05') {
  const qari = getQariById(qariId);
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumber).padStart(3, '0');
  // EveryAyah CDN is globally high-speed and supports individual ayah playback across qaris
  return `https://everyayah.com/data/${qari.everyAyahIdentifier}/${s}${a}.mp3`;
}
