import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import MadeByMark from '../components/MadeByMark';
import { useApp } from '../lib/context';

const ring = [
  { id: 'cc-w-1', left: 139, top: -9 },
  { id: 'cc-w-2', left: 213, top: 11 },
  { id: 'cc-w-3', left: 267, top: 65 },
  { id: 'cc-w-4', left: 287, top: 139 },
  { id: 'cc-w-5', left: 267, top: 213 },
  { id: 'cc-w-6', left: 213, top: 267 },
  { id: 'cc-w-7', left: 139, top: 287 },
  { id: 'cc-w-8', left: 65, top: 267 },
  { id: 'cc-w-9', left: 11, top: 213 },
  { id: 'cc-w-10', left: -9, top: 139 },
  { id: 'cc-w-11', left: 11, top: 65 },
  { id: 'cc-w-12', left: 65, top: 11 },
];

export default function Welcome() {
  const navigate = useNavigate();
  const { toast } = useApp();

  return (
    <PhoneShell white>
      <StatusBar />

      <div className="grow" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 340, height: 340 }}>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 296, height: 296, borderRadius: '50%', border: '1px solid rgba(17,17,16,.06)' }} />
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 206, height: 206, borderRadius: '50%', border: '1px solid rgba(17,17,16,.05)' }} />
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 126, height: 126, overflow: 'hidden', borderRadius: 30, boxShadow: '0 6px 20px rgba(22,51,166,.18)' }}>
            <MadeByMark size={126} radius={30} />
          </div>
          {ring.map((r) => (
            <div key={r.id} style={{ position: 'absolute', left: r.left, top: r.top, width: 62, height: 62, overflow: 'hidden', borderRadius: 17 }}>
              <ImageSlot id={r.id} alt="" />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 62%)', pointerEvents: 'none' }} />
      </div>

      <div className="flex-none" style={{ padding: '0 24px 34px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: 0, font: '800 31px/1.08 Manrope,sans-serif', letterSpacing: '-.03em', color: 'var(--ink)', textAlign: 'center' }}>
          MadeBy
        </h1>
        <p style={{ margin: '12px 0 0', font: '500 15px/1.5 Manrope,sans-serif', color: 'var(--muted)', textAlign: 'center' }}>
          Платформа для коллабораций брендов, событий и креаторов.
        </p>
        <button className="btn btn-primary" style={{ marginTop: 28 }} onClick={() => navigate('/onboarding')}>
          Присоединиться
        </button>
        <button className="btn btn-secondary" style={{ marginTop: 10 }} onClick={() => navigate('/login?intent=signin')}>
          Вход
        </button>
        <p style={{ margin: '14px 0 0', font: '500 12.5px/1.5 Manrope,sans-serif', color: 'var(--faint)', textAlign: 'center' }}>
          Уже есть аккаунт? Войдите. Впервые здесь? Присоединяйтесь.
        </p>
        <p style={{ margin: '16px 0 0', font: '500 12px/1.5 Manrope,sans-serif', color: 'var(--faint)', textAlign: 'center' }}>
          Продолжая, вы соглашаетесь с{' '}
          <a
            href="#"
            style={{ color: 'var(--muted)', textDecoration: 'underline', textUnderlineOffset: 2 }}
            onClick={(e) => { e.preventDefault(); toast('Условия использования — демо-прототип'); }}
          >
            условиями
          </a>{' '}
          и{' '}
          <a
            href="#"
            style={{ color: 'var(--muted)', textDecoration: 'underline', textUnderlineOffset: 2 }}
            onClick={(e) => { e.preventDefault(); toast('Политика конфиденциальности — демо-прототип'); }}
          >
            политикой конфиденциальности
          </a>
          .
        </p>
        <div className="home-indicator" />
      </div>
    </PhoneShell>
  );
}
