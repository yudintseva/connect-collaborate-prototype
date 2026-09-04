import type { Collaboration } from './data';

export interface FeedFilters {
  categories: Collaboration['categoryKey'][];
  format: Collaboration['formatKey'] | null;
  when: 'today' | 'week' | null;
  audienceMaxK: number;
  audienceMinK: number;
}

export const defaultFilters: FeedFilters = {
  categories: ['restaurants', 'events'],
  format: 'barter',
  when: 'week',
  audienceMinK: 1,
  audienceMaxK: 100,
};

export const emptyFilters: FeedFilters = {
  categories: [],
  format: null,
  when: null,
  audienceMinK: 1,
  audienceMaxK: 100,
};

export function applyFilters(list: Collaboration[], f: FeedFilters): Collaboration[] {
  return list.filter((c) => {
    if (f.categories.length && !f.categories.includes(c.categoryKey)) return false;
    if (f.format && c.formatKey !== f.format) return false;
    if (f.when === 'today' && c.when !== 'today') return false;
    if (f.when === 'week' && c.when === 'later') return false;
    const minAudience = c.audienceMin / 1000;
    if (minAudience > f.audienceMaxK) return false;
    if (minAudience < f.audienceMinK && f.audienceMinK > 1) return false;
    return true;
  });
}
