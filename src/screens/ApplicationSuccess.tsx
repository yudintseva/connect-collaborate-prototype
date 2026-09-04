import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import { CheckIcon } from '../components/icons';
import { useApp } from '../lib/context';

export default function ApplicationSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { collaborations } = useApp();
  const collab = collaborations.find((c) => c.id === id);

  useEffect(() => {
    if (!collab) navigate('/feed', { replace: true });
  }, [collab, navigate]);

  if (!collab) return null;

  return (
    <PhoneShell>
      <StatusBar />
      <div className="grow" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 20px' }}>
        <span style={{ width: 76, height: 76, borderRadius: '50%', background: '#111110', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckIcon size={34} strokeWidth={1.9} />
        </span>
        <h1 style={{ margin: '26px 0 0', font: '800 30px/1.1 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110', textAlign: 'center' }}>
          Заявка отправлена
        </h1>
        <p style={{ margin: '12px 0 0', font: '500 15px/1.5 Manrope,sans-serif', color: 'var(--muted)', textAlign: 'center', maxWidth: 300 }}>
          {collab.title.split('«')[1] ? collab.title : 'Бренд'} рассмотрит ваш профиль. Мы сообщим о решении в течение 48 часов.
        </p>

        <div className="card" style={{ marginTop: 30, width: '100%', padding: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 'none', width: 64, height: 64, borderRadius: 12, overflow: 'hidden' }}><ImageSlot id={collab.thumb} radius={12} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '700 15px/1.25 Manrope,sans-serif', letterSpacing: '-.015em', color: '#111110' }}>{collab.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}>
              <span className="status-pill amber">В ожидании</span>
              <span style={{ font: '500 12.5px/1 Manrope,sans-serif', color: 'var(--muted)' }}>{collab.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-none" style={{ padding: '0 20px 34px' }}>
        <button className="btn btn-primary btn-block" onClick={() => navigate('/feed')}>Вернуться в ленту</button>
        <button className="btn-ghost btn-block" style={{ marginTop: 6 }} onClick={() => navigate('/my-events')}>Мои отклики</button>
        <div className="home-indicator" style={{ marginTop: 16 }} />
      </div>
    </PhoneShell>
  );
}
