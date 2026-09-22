import { DUAS_DATA, DUA_CATEGORIES } from '../data/duas';

export function getAllCategories() {
  return DUA_CATEGORIES;
}

export function getDuasByCategory(category = 'semua') {
  if (!category || category === 'semua') {
    return DUAS_DATA;
  }
  return DUAS_DATA.filter(d => d.category === category);
}

export function searchDuas(query = '') {
  const q = query.trim().toLowerCase();
  if (!q) return DUAS_DATA;
  return DUAS_DATA.filter(d =>
    d.title.toLowerCase().includes(q) ||
    d.latin.toLowerCase().includes(q) ||
    d.terjemahan.toLowerCase().includes(q) ||
    d.sumber.toLowerCase().includes(q)
  );
}

export function getDuaById(id) {
  return DUAS_DATA.find(d => d.id === Number(id)) || null;
}
