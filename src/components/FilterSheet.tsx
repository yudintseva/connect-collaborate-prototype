import { useRef, useState } from 'react';
import { CalendarIcon } from './icons';
import { applyFilters, emptyFilters, type FeedFilters } from '../lib/filters';
import type { Collaboration } from '../lib/data';
import { collabWord } from '../lib/format';

const categoryOptions: { key: Collaboration['categoryKey']; label: string }[] = [
  { key: 'restaurants', label: 'Рестораны' },
  { key: 'salons', label: 'Салоны' },
  { key: 'events', label: 'Мероприятия' },
  { key: 'brands', label: 'Бренды' },
  { key: 'clubs', label: 'Клубы' },
  { key: 'other', label: 'Другое' },
];

const formatOptions: { key: Collaboration['formatKey']; label: string }[] = [
  { key: 'barter', label: 'Бартер' },
  { key: 'paid', label: 'Оплата' },
  { key: 'ugc', label: 'UGC' },
];

export default function FilterSheet({
  initial,
  all,
  onApply,
  onClose,
}: {
  initial: FeedFilters;
  all: Collaboration[];
  onApply: (f: FeedFilters) => void;
  onClose: () => void;
}) {
  const [f, setF] = useState<FeedFilters>(initial);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);

  const toggleCategory = (key: Collaboration['categoryKey']) => {
    setF((cur) => ({
      ...cur,
      categories: cur.categories.includes(key) ? cur.categories.filter((c) => c !== key) : [...cur.categories, key],
    }));
  };

  const count = applyFilters(all, f).length;

  const pctFor = (k: number) => Math.min(100, Math.max(0, ((k - 1) / (100 - 1)) * 100));

  const onPointerMove = (e: PointerEvent) => {
    const track = trackRef.current;
    if (!track || !dragging) return;
    const rect = track.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const val = Math.round(1 + pct * 99);
    setF((cur) => {
      if (dragging === 'min') return { ...cur, audienceMinK: Math.min(val, cur.audienceMaxK - 1 < 1 ? 1 : cur.audienceMaxK - 1) };
      return { ...cur, audienceMaxK: Math.max(val, cur.audienceMinK + 1) };
    });
  };

  const startDrag = (which: 'min' | 'max') => (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(which);
    const move = (ev: PointerEvent) => onPointerMove(ev);
    const up = () => {
      setDragging(null);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const fmtK = (k: number) => (k >= 1000 ? `${Math.round(k / 1000)}M` : k >= 100 ? `${k}K` : `${k * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '));

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <div className="sheet-grip" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <span style={{ font: '700 20px/1 Manrope,sans-serif', letterSpacing: '-.02em', color: '#111110' }}>Фильтры</span>
          <span
            style={{ font: '600 13.5px/1 Manrope,sans-serif', color: 'var(--muted)', cursor: 'pointer' }}
            onClick={() => setF(emptyFilters)}
          >
            Сбросить
          </span>
        </div>

        <div className="scroll-y" style={{ minHeight: 0 }}>
          <div className="overline">Категория</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {categoryOptions.map((c) => (
              <button key={c.key} className={`chip sm ${f.categories.includes(c.key) ? 'on' : ''}`} onClick={() => toggleCategory(c.key)}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="overline" style={{ marginTop: 20 }}>Формат</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {formatOptions.map((o) => (
              <button
                key={o.key}
                className={`segment ${f.format === o.key ? 'on' : ''}`}
                onClick={() => setF((cur) => ({ ...cur, format: cur.format === o.key ? null : o.key }))}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="overline" style={{ marginTop: 20 }}>Когда</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <button className={`segment ${f.when === 'today' ? 'on' : ''}`} onClick={() => setF((cur) => ({ ...cur, when: cur.when === 'today' ? null : 'today' }))}>
              Сегодня
            </button>
            <button className={`segment ${f.when === 'week' ? 'on' : ''}`} onClick={() => setF((cur) => ({ ...cur, when: cur.when === 'week' ? null : 'week' }))}>
              Эта неделя
            </button>
            <span style={{ flex: 'none', width: 52, height: 42, borderRadius: 12, background: '#fff', border: '1px solid rgba(17,17,16,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarIcon color="#111110" />
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 20 }}>
            <span className="overline">Аудитория</span>
            <span style={{ font: '600 12.5px/1 Manrope,sans-serif', color: '#111110' }}>
              {fmtK(f.audienceMinK)} — {f.audienceMaxK >= 100 ? '100K' : fmtK(f.audienceMaxK)}
            </span>
          </div>
          <div ref={trackRef} style={{ marginTop: 16, height: 3, borderRadius: 999, background: 'rgba(17,17,16,.12)', position: 'relative', touchAction: 'none' }}>
            <i style={{ position: 'absolute', left: `${pctFor(f.audienceMinK)}%`, right: `${100 - pctFor(f.audienceMaxK)}%`, top: 0, height: 3, borderRadius: 999, background: '#111110' }} />
            <i
              onPointerDown={startDrag('min')}
              style={{ position: 'absolute', left: `${pctFor(f.audienceMinK)}%`, top: -8.5, width: 20, height: 20, borderRadius: '50%', background: '#fff', border: '1.5px solid #111110', transform: 'translateX(-50%)', cursor: 'grab' }}
            />
            <i
              onPointerDown={startDrag('max')}
              style={{ position: 'absolute', left: `${pctFor(f.audienceMaxK)}%`, top: -8.5, width: 20, height: 20, borderRadius: '50%', background: '#fff', border: '1.5px solid #111110', transform: 'translateX(-50%)', cursor: 'grab' }}
            />
          </div>
        </div>

        <div style={{ padding: '24px 0 34px', flex: 'none' }}>
          <button className="btn btn-primary btn-block" onClick={() => onApply(f)}>
            Показать {count} {collabWord(count)}
          </button>
          <div className="home-indicator" />
        </div>
      </div>
    </div>
  );
}
