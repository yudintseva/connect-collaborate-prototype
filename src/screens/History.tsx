import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import { BackIcon } from '../components/icons';

const past = [
  { id: 'p1', title: 'Открытие кофейни «Нордик»', date: '14 марта · 12:00', reward: 'Бранч + промокод на месяц', thumb: 'cc-cat-6' },
  { id: 'p2', title: 'Съёмка для бренда одежды Alta', date: '2 февраля', reward: 'Капсула из коллекции', thumb: 'cc-cat-1' },
];

export default function History() {
  const navigate = useNavigate();
  return (
    <PhoneShell>
      <StatusBar />
      <div className="nav-header">
        <button className="icon-btn back-btn" onClick={() => navigate(-1)} aria-label="Назад"><BackIcon /></button>
        <div className="title">История сотрудничеств</div>
        <span />
      </div>

      <div className="grow scroll-y" style={{ padding: '18px 20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {past.map((p) => (
          <div key={p.id} className="card" style={{ padding: 12, display: 'flex', gap: 14 }}>
            <div style={{ flex: 'none', width: 72, height: 72, borderRadius: 14, overflow: 'hidden' }}><ImageSlot id={p.thumb} radius={14} /></div>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="status-pill neutral" style={{ alignSelf: 'flex-start', marginBottom: 6 }}>Завершено</span>
              <h3 style={{ margin: 0, font: '700 15px/1.25 Manrope,sans-serif', letterSpacing: '-.015em', color: '#111110' }}>{p.title}</h3>
              <p style={{ margin: '4px 0 0', font: '500 12.5px/1.4 Manrope,sans-serif', color: 'var(--muted)' }}>{p.reward} · {p.date}</p>
            </div>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}
