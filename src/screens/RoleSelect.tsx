import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import { CheckIcon } from '../components/icons';
import { useApp } from '../lib/context';

type Role = 'creator' | 'brand';

function RoleCard({
  selected,
  onClick,
  image,
  title,
  desc,
  chips,
}: {
  selected: boolean;
  onClick: () => void;
  image: string;
  title: string;
  desc: string;
  chips: string[];
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{
        marginTop: 12,
        background: '#fff',
        borderRadius: 20,
        padding: 16,
        display: 'flex',
        gap: 16,
        cursor: 'pointer',
        border: `1.5px solid ${selected ? '#111110' : 'rgba(17,17,16,.08)'}`,
      }}
    >
      <div style={{ flex: 'none', width: 96, height: 96, borderRadius: 14, overflow: 'hidden' }}>
        <ImageSlot id={image} radius={14} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <h3 style={{ margin: 0, font: '700 20px/1.2 Manrope,sans-serif', letterSpacing: '-.02em', color: '#111110' }}>{title}</h3>
          <span
            style={{
              flex: 'none',
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: `1.5px solid ${selected ? '#111110' : 'rgba(17,17,16,.18)'}`,
              background: selected ? '#111110' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckIcon style={{ opacity: selected ? 1 : 0 }} />
          </span>
        </div>
        <p style={{ margin: '6px 0 0', font: '500 13.5px/1.45 Manrope,sans-serif', color: 'var(--muted)' }}>{desc}</p>
        <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
          {chips.map((c) => (
            <span key={c} className="chip" style={{ height: 28, padding: '0 11px', background: 'var(--chip-off-bg-2)', color: 'var(--ink-soft)', fontSize: 12, cursor: 'default' }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RoleSelect() {
  const navigate = useNavigate();
  const { setRole } = useApp();
  const [role, setLocalRole] = useState<Role>('creator');

  const proceed = (chosen: Role | null) => {
    setRole(chosen ?? 'creator');
    if ((chosen ?? 'creator') === 'creator') navigate('/setup');
    else navigate('/brand-setup');
  };

  return (
    <PhoneShell>
      <StatusBar />
      <div className="grow" style={{ padding: '44px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: 0, font: '800 30px/1.1 Manrope,sans-serif', letterSpacing: '-.03em', color: 'var(--ink)' }}>Кто вы?</h1>
        <p style={{ margin: '10px 0 0', font: '500 15px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>
          Выберите роль, чтобы мы показали вам подходящие коллаборации и инструменты.
        </p>

        <div style={{ marginTop: 28 }}>
          <RoleCard
            selected={role === 'creator'}
            onClick={() => setLocalRole('creator')}
            image="cc-role-creator"
            title="Я креатор"
            desc="Ищу бренды, мероприятия и бартерные проекты."
            chips={['UGC', 'Lifestyle', 'Barter']}
          />
        </div>
        <RoleCard
          selected={role === 'brand'}
          onClick={() => setLocalRole('brand')}
          image="cc-role-brand"
          title="Я бренд"
          desc="Создаю ТЗ, приглашаю креаторов и запускаю коллаборации."
          chips={['Бренды', 'События', 'Кампании']}
        />
      </div>

      <div className="flex-none" style={{ padding: '0 20px 34px' }}>
        <button className="btn btn-primary btn-block" onClick={() => proceed(role)}>Продолжить</button>
        <button className="btn-ghost btn-block" style={{ marginTop: 6 }} onClick={() => proceed(null)}>Выбрать позже</button>
        <div className="home-indicator" style={{ marginTop: 16 }} />
      </div>
    </PhoneShell>
  );
}
