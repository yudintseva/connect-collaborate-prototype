import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import ImageSlot from '../components/ImageSlot';
import CollabCard from '../components/CollabCard';
import FilterSheet from '../components/FilterSheet';
import { BellIcon, ChevronDownIcon, PlusIcon, SlidersIcon } from '../components/icons';
import { useApp } from '../lib/context';
import { categoryTiles } from '../lib/data';
import { applyFilters, defaultFilters, type FeedFilters } from '../lib/filters';
import { collabWord } from '../lib/format';

const cityOptions = ['Москва', 'Санкт-Петербург', 'Казань', 'Сочи'];

export default function Feed() {
  const navigate = useNavigate();
  const { collaborations, notifications, role, toast } = useApp();
  const [city, setCity] = useState('Москва');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetFilters, setSheetFilters] = useState<FeedFilters | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [quick, setQuick] = useState({ invited: false, micro: false, today: false, paid: false, barter: false });

  const unread = notifications.some((n) => !n.read);

  const toggleQuick = (key: keyof typeof quick) => setQuick((q) => ({ ...q, [key]: !q[key] }));

  const filtered = useMemo(() => {
    return collaborations.filter((c) => {
      if (category && c.categoryKey !== category) return false;
      if (quick.invited && !c.invited) return false;
      if (quick.micro && c.audienceTag !== 'Микроблогерам') return false;
      if (quick.today && c.when !== 'today') return false;
      if ((quick.paid || quick.barter) && !((quick.paid && c.formatKey === 'paid') || (quick.barter && c.formatKey === 'barter'))) return false;
      if (sheetFilters && applyFilters([c], sheetFilters).length === 0) return false;
      return true;
    });
  }, [collaborations, category, quick, sheetFilters]);

  return (
    <PhoneShell>
      <StatusBar />

      <div className="flex-none" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px 10px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="overline" style={{ fontSize: 10.5, letterSpacing: '.13em' }}>Коллаборации для вас</div>
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6, cursor: 'pointer' }}>
            <span style={{ font: '800 22px/1 Manrope,sans-serif', letterSpacing: '-.025em', color: '#111110' }}>{city}</span>
            <ChevronDownIcon color="#111110" size={17} />
            <select
              value={city}
              onChange={(e) => { setCity(e.target.value); toast(`Город изменён на ${e.target.value}`); }}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            >
              {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button className="icon-btn" style={{ position: 'relative', borderRadius: '50%', background: '#fff', border: '1px solid rgba(17,17,16,.1)' }} onClick={() => navigate('/notifications')} aria-label="Уведомления">
          <BellIcon />
          {unread && <i style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: '#111110', border: '1.5px solid #fff' }} />}
        </button>
        <button className="icon-btn" style={{ borderRadius: '50%', background: '#fff', border: '1px solid rgba(17,17,16,.1)' }} onClick={() => setSheetOpen(true)} aria-label="Фильтры">
          <SlidersIcon />
        </button>
      </div>

      <div className="grow scroll-y" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '4px 20px 0' }}>
          {categoryTiles.map((t) => (
            <button
              key={t.key}
              onClick={() => setCategory((c) => (c === t.key ? null : t.key))}
              style={{
                position: 'relative', aspectRatio: '1/1.16', borderRadius: 14, overflow: 'hidden', border: category === t.key ? '2px solid #111110' : 'none', padding: 0, cursor: 'pointer',
              }}
            >
              <ImageSlot id={t.image} radius={14} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.55))', pointerEvents: 'none' }} />
              <span style={{ position: 'absolute', left: 10, bottom: 9, font: '700 10.5px/1 Manrope,sans-serif', letterSpacing: '.08em', textTransform: 'uppercase', color: '#fff' }}>{t.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '26px 20px 0' }}>
          <h2 style={{ margin: 0, font: '700 20px/1 Manrope,sans-serif', letterSpacing: '-.02em', color: '#111110' }}>Ближайшие</h2>
          <span style={{ font: '600 13px/1 Manrope,sans-serif', color: 'var(--muted)' }}>{filtered.length} {collabWord(filtered.length)}</span>
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '14px 20px 0', overflowX: 'auto' }}>
          <button className={`chip ${quick.invited ? 'on' : ''}`} onClick={() => toggleQuick('invited')}>Вы приглашены</button>
          <button className={`chip outline ${quick.micro ? 'on' : ''}`} onClick={() => toggleQuick('micro')}>Микроблогерам</button>
          <button className={`chip outline ${quick.today ? 'on' : ''}`} onClick={() => toggleQuick('today')}>Сегодня</button>
          <button className={`chip outline ${quick.paid ? 'on' : ''}`} onClick={() => toggleQuick('paid')}>Оплата</button>
          <button className={`chip outline ${quick.barter ? 'on' : ''}`} onClick={() => toggleQuick('barter')}>Бартер</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 20px 24px' }}>
          {filtered.length === 0 && (
            <p style={{ padding: '24px 4px', textAlign: 'center', font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>
              Ничего не найдено. Попробуйте изменить фильтры.
            </p>
          )}
          {filtered.map((c) => <CollabCard key={c.id} collab={c} />)}
        </div>

        {role === 'brand' && (
          <button
            onClick={() => navigate('/create')}
            aria-label="Создать коллаборацию"
            style={{
              position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: '50%',
              background: '#111110', color: '#fff', border: 'none', display: 'flex', alignItems: 'center',
              justifyContent: 'center', boxShadow: '0 10px 24px rgba(0,0,0,.28)', cursor: 'pointer',
            }}
          >
            <PlusIcon size={22} color="#fff" strokeWidth={2} />
          </button>
        )}
      </div>

      <BottomNav active="feed" />

      {sheetOpen && (
        <FilterSheet
          initial={sheetFilters ?? defaultFilters}
          all={collaborations}
          onApply={(f) => { setSheetFilters(f); setSheetOpen(false); }}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </PhoneShell>
  );
}
