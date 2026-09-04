import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import CollabCard from '../components/CollabCard';
import { BackIcon } from '../components/icons';
import { useApp } from '../lib/context';
import { brands } from '../lib/data';

export default function BrandProfileScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { collaborations } = useApp();
  const brand = brands.find((b) => b.id === id);
  const items = collaborations.filter((c) => c.brandId === id);

  useEffect(() => {
    if (!brand) navigate('/feed', { replace: true });
  }, [brand, navigate]);

  if (!brand) return null;

  return (
    <PhoneShell>
      <StatusBar />
      <div className="nav-header">
        <button className="icon-btn back-btn" onClick={() => navigate(-1)} aria-label="Назад"><BackIcon /></button>
        <div className="title">Бренд</div>
        <span />
      </div>

      <div className="grow scroll-y" style={{ padding: '14px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 'none', width: 64, height: 64, borderRadius: '50%', overflow: 'hidden' }}><ImageSlot id={brand.logo} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, font: '800 22px/1.15 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110' }}>{brand.name}</h1>
            <div style={{ marginTop: 6, font: '500 12.5px/1.4 Manrope,sans-serif', color: 'var(--muted)' }}>{brand.category}</div>
          </div>
        </div>
        <p style={{ margin: '18px 0 0', font: '500 15px/1.5 Manrope,sans-serif', color: 'var(--ink-soft)' }}>{brand.description}</p>

        <div style={{ marginTop: 24, marginBottom: 12 }} className="overline">Активные коллаборации</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.length === 0 && <p style={{ font: '500 14px Manrope,sans-serif', color: 'var(--muted)' }}>Пока нет активных коллабораций.</p>}
          {items.map((c) => <CollabCard key={c.id} collab={c} />)}
        </div>
      </div>
    </PhoneShell>
  );
}
