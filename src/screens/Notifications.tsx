import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import { BackIcon, UsersIcon } from '../components/icons';
import { useApp } from '../lib/context';
import type { Notification } from '../lib/data';

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markRead, collaborations } = useApp();

  const open = (n: Notification) => {
    markRead(n.id);
    if (n.collabId) navigate(`/collaboration/${n.collabId}`);
    else if (n.goTo === 'profile') navigate('/profile');
  };

  const section = (key: 'today' | 'earlier', label: string) => {
    const items = notifications.filter((n) => n.section === key);
    if (items.length === 0) return null;
    return (
      <div style={{ marginTop: key === 'today' ? 0 : 24 }}>
        <div className="overline">{label}</div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((n) => {
            const collab = n.collabId ? collaborations.find((c) => c.id === n.collabId) : undefined;
            return (
              <button key={n.id} className="card card-row-btn" style={{ padding: 14, display: 'flex', gap: 12, textAlign: 'left' }} onClick={() => open(n)}>
                <div style={{ flex: 'none', width: 44, height: 44, borderRadius: 12, overflow: 'hidden' }}>
                  {n.icon === 'stats' ? (
                    <div style={{ width: '100%', height: '100%', background: 'var(--chip-off-bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <UsersIcon />
                    </div>
                  ) : (
                    <ImageSlot id={collab?.thumb ?? ''} radius={12} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: `600 14.5px/1.4 Manrope,sans-serif`, color: n.read ? '#5B5B58' : '#111110' }}>{n.text}</div>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {n.status && <span className={`status-pill ${n.status === 'accepted' ? 'green' : 'amber'}`}>{n.status === 'accepted' ? 'Принято' : 'В ожидании'}</span>}
                    <span style={{ font: '500 12px/1 Manrope,sans-serif', color: 'var(--faint)' }}>{n.time}</span>
                  </div>
                </div>
                {!n.read && <i style={{ flex: 'none', width: 7, height: 7, borderRadius: '50%', background: '#111110', marginTop: 6 }} />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <PhoneShell>
      <StatusBar />
      <div className="nav-header">
        <button className="icon-btn back-btn" onClick={() => navigate(-1)} aria-label="Назад"><BackIcon /></button>
        <div className="title">Уведомления</div>
        <span />
      </div>

      <div className="grow scroll-y" style={{ padding: '18px 20px 24px' }}>
        {notifications.length === 0 && (
          <p style={{ padding: '32px 4px', textAlign: 'center', font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>Пока нет уведомлений.</p>
        )}
        {section('today', 'Сегодня')}
        {section('earlier', 'Ранее')}
      </div>

      <div className="flex-none" style={{ padding: '0 20px 34px' }}>
        <div className="home-indicator" style={{ margin: '0 auto' }} />
      </div>
    </PhoneShell>
  );
}
