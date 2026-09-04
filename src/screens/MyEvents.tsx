import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import CollabCard from '../components/CollabCard';
import { useApp } from '../lib/context';
import type { ApplicationStatus } from '../lib/data';

const tabs: { key: ApplicationStatus; label: string }[] = [
  { key: 'accepted', label: 'Участвую' },
  { key: 'instant', label: 'Принять сразу' },
  { key: 'pending', label: 'В ожидании' },
];

export default function MyEvents() {
  const navigate = useNavigate();
  const { collaborations, applications, role } = useApp();
  const [tab, setTab] = useState<ApplicationStatus>('accepted');

  const counts = useMemo(() => {
    const c: Record<ApplicationStatus, number> = { accepted: 0, instant: 0, pending: 0 };
    Object.values(applications).forEach((s) => { c[s] += 1; });
    return c;
  }, [applications]);

  const list = useMemo(
    () => collaborations.filter((c) => applications[c.id] === tab),
    [collaborations, applications, tab],
  );

  const myCreated = useMemo(() => collaborations.filter((c) => c.createdByMe), [collaborations]);

  if (role === 'brand') {
    return (
      <PhoneShell>
        <StatusBar />
        <div className="flex-none" style={{ padding: '14px 20px 0' }}>
          <h1 style={{ margin: 0, font: '800 26px/1.1 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110' }}>Мои коллаборации</h1>
        </div>
        <div className="grow scroll-y" style={{ padding: '18px 20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {myCreated.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 12px' }}>
              <p style={{ font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>Вы ещё не опубликовали ни одной коллаборации.</p>
              <button className="btn btn-primary" style={{ marginTop: 16, padding: '0 24px' }} onClick={() => navigate('/create')}>Создать коллаборацию</button>
            </div>
          ) : (
            myCreated.map((c) => <CollabCard key={c.id} collab={c} />)
          )}
        </div>
        <BottomNav active="events" />
      </PhoneShell>
    );
  }

  return (
    <PhoneShell>
      <StatusBar />
      <div className="flex-none" style={{ padding: '14px 20px 0' }}>
        <h1 style={{ margin: 0, font: '800 26px/1.1 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110' }}>Мои мероприятия</h1>
        <div style={{ marginTop: 18, display: 'flex', gap: 6, background: '#EAE8E4', borderRadius: 999, padding: 4 }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                flex: 1, height: 36, borderRadius: 999, border: 'none', cursor: 'pointer',
                background: tab === t.key ? '#fff' : 'transparent',
                font: `${tab === t.key ? 700 : 600} 13px Manrope,sans-serif`,
                color: tab === t.key ? '#111110' : 'var(--muted)',
              }}
            >
              {t.label} <span style={{ marginLeft: 5, color: 'var(--faint)' }}>{counts[t.key]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grow scroll-y" style={{ padding: '18px 20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.length === 0 && (
          <p style={{ padding: '32px 4px', textAlign: 'center', font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>
            Здесь пока пусто.
          </p>
        )}
        {list.map((c) => <CollabCard key={c.id} collab={c} mode="my-events" />)}
      </div>

      <BottomNav active="events" />
    </PhoneShell>
  );
}
