import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import ImageSlot from '../components/ImageSlot';
import CollabCard from '../components/CollabCard';
import {
  HistoryIcon, LogoutIcon, MailIcon, PencilIcon, PhoneIcon, PlusIcon, ShareIcon, SupportIcon, TrashIcon, socialIcon,
} from '../components/icons';
import { useApp } from '../lib/context';

const periods = ['30 д', '3 мес', '12 мес'];
const sparkPaths: Record<string, string> = {
  '30 д': 'M0 58 L32 50 L64 62 L96 40 L128 46 L160 24 L192 34 L224 18 L256 30 L288 12 L320 22',
  '3 мес': 'M0 44 L32 52 L64 38 L96 46 L128 30 L160 40 L192 22 L224 32 L256 16 L288 26 L320 10',
  '12 мес': 'M0 62 L32 54 L64 58 L96 44 L128 48 L160 34 L192 40 L224 26 L256 34 L288 20 L320 24',
};

function AccountRows({ onLogout, onDelete }: { onLogout: () => void; onDelete: () => void }) {
  const navigate = useNavigate();
  const { toast } = useApp();

  const share = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Connect & Collaborate', url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => toast('Ссылка скопирована'));
    } else {
      toast('Ссылка: ' + url);
    }
  };

  return (
    <>
      <div className="card" style={{ marginTop: 24 }}>
        <button className="card-row card-row-btn" onClick={() => navigate('/history')}>
          <HistoryIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>История сотрудничеств</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C4C3BF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 4.5 13 10l-5.5 5.5" /></svg>
        </button>
        <button className="card-row card-row-btn" onClick={share}>
          <ShareIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>Поделиться приложением</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C4C3BF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 4.5 13 10l-5.5 5.5" /></svg>
        </button>
        <button className="card-row card-row-btn" onClick={() => navigate('/support')}>
          <SupportIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>Поддержка</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C4C3BF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 4.5 13 10l-5.5 5.5" /></svg>
        </button>
      </div>

      <div className="card" style={{ marginTop: 12, marginBottom: 24 }}>
        <button className="card-row card-row-btn" onClick={onLogout}>
          <LogoutIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>Выйти из аккаунта</span>
        </button>
        <button className="card-row card-row-btn" onClick={onDelete}>
          <TrashIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#B4342A' }}>Удалить аккаунт</span>
        </button>
      </div>
    </>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { role, profile, brandProfile, collaborations, logout, deleteAccount, toast, updateProfile } = useApp();
  const [period, setPeriod] = useState('30 д');
  const [editingPhotos, setEditingPhotos] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const doLogout = () => {
    if (window.confirm('Выйти из аккаунта?')) {
      logout();
      navigate('/');
    }
  };
  const doDelete = () => {
    if (window.confirm('Удалить аккаунт без возможности восстановления?')) {
      deleteAccount();
      toast('Аккаунт удалён (демо)');
      navigate('/');
    }
  };

  const addPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const photos = [...profile.photos];
    if (photos.length < 3) photos.push(url);
    else photos[2] = url;
    updateProfile({ photos });
  };

  if (role === 'brand') {
    const myCreated = collaborations.filter((c) => c.createdByMe);
    return (
      <PhoneShell>
        <StatusBar />
        <div className="grow scroll-y" style={{ padding: '14px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 'none', width: 76, height: 76, borderRadius: 20, overflow: 'hidden' }}><ImageSlot id={brandProfile.avatar} radius={20} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ margin: 0, font: '800 23px/1.15 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110' }}>{brandProfile.name || 'Ваш бренд'}</h1>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ height: 26, padding: '0 10px', borderRadius: 999, background: 'var(--chip-off-bg)', display: 'flex', alignItems: 'center', font: '600 12px Manrope,sans-serif', color: 'var(--ink-soft)' }}>{brandProfile.category}</span>
              </div>
            </div>
            <button className="icon-btn" style={{ borderRadius: '50%', background: '#fff', border: '1px solid rgba(17,17,16,.1)' }} onClick={() => navigate('/brand-setup?edit=1')} aria-label="Редактировать">
              <PencilIcon />
            </button>
          </div>

          {brandProfile.description && (
            <>
              <div className="overline" style={{ marginTop: 24 }}>О бренде</div>
              <p style={{ margin: '12px 0 0', font: '500 15px/1.55 Manrope,sans-serif', color: '#111110' }}>{brandProfile.description}</p>
            </>
          )}

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24 }}>
            <div className="overline">Мои коллаборации</div>
            <button className="btn-ghost" style={{ height: 'auto', padding: 0 }} onClick={() => navigate('/create')}>+ Создать</button>
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myCreated.length === 0 && <p style={{ font: '500 14px Manrope,sans-serif', color: 'var(--muted)' }}>Пока нет опубликованных коллабораций.</p>}
            {myCreated.map((c) => <CollabCard key={c.id} collab={c} />)}
          </div>

          <AccountRows onLogout={doLogout} onDelete={doDelete} />
        </div>
        <BottomNav active="profile" />
      </PhoneShell>
    );
  }

  return (
    <PhoneShell>
      <StatusBar />
      <div className="grow scroll-y" style={{ padding: '14px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 'none', width: 76, height: 76, borderRadius: '50%', overflow: 'hidden' }}><ImageSlot id={profile.avatar} /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, font: '800 23px/1.15 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110' }}>{profile.name}</h1>
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ height: 26, padding: '0 10px', borderRadius: 999, background: 'var(--chip-off-bg)', display: 'flex', alignItems: 'center', font: '600 12px Manrope,sans-serif', color: 'var(--ink-soft)' }}>{profile.role}</span>
              <span style={{ font: '500 12.5px/1 Manrope,sans-serif', color: 'var(--faint)' }}>{profile.city.split(',')[0]}</span>
            </div>
          </div>
          <button className="icon-btn" style={{ borderRadius: '50%', background: '#fff', border: '1px solid rgba(17,17,16,.1)' }} onClick={() => navigate('/setup?edit=1')} aria-label="Редактировать">
            <PencilIcon />
          </button>
        </div>

        <div style={{ marginTop: 22, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div className="overline">Мои фото</div>
          <span style={{ font: '600 12.5px/1 Manrope,sans-serif', color: 'var(--muted)', cursor: 'pointer' }} onClick={() => setEditingPhotos((v) => !v)}>
            {editingPhotos ? 'Готово' : 'Изменить'}
          </span>
        </div>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {profile.photos.map((p, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '1/1.3', minWidth: 0, overflow: 'hidden', borderRadius: 12 }}>
              <ImageSlot id={p} radius={12} />
              {editingPhotos && (
                <button
                  onClick={() => updateProfile({ photos: profile.photos.filter((_, idx) => idx !== i) })}
                  style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: '50%', background: 'rgba(17,17,16,.7)', color: '#fff', border: 'none', fontSize: 12, lineHeight: '20px', cursor: 'pointer' }}
                  aria-label="Удалить фото"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {profile.photos.length < 3 && (
            <button
              onClick={() => fileRef.current?.click()}
              style={{ aspectRatio: '1/1.3', borderRadius: 12, border: '1.5px dashed rgba(17,17,16,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', cursor: 'pointer' }}
              aria-label="Добавить фото"
            >
              <PlusIcon color="#A6A5A2" strokeWidth={1.7} />
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={addPhoto} />
        </div>

        <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div className="overline">Статистика блога</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{ height: 24, padding: '0 9px', borderRadius: 999, border: 'none', cursor: 'pointer', background: period === p ? '#111110' : 'var(--chip-off-bg)', color: period === p ? '#fff' : 'var(--muted)', font: '600 11px Manrope,sans-serif' }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="card" style={{ marginTop: 12, padding: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}><div style={{ font: '800 21px/1 Manrope,sans-serif', letterSpacing: '-.02em', color: '#111110' }}>{profile.stats.followers}</div><div style={{ marginTop: 5, font: '500 12px/1 Manrope,sans-serif', color: 'var(--muted)' }}>Подписчики</div></div>
            <div style={{ flex: 1 }}><div style={{ font: '800 21px/1 Manrope,sans-serif', letterSpacing: '-.02em', color: '#111110' }}>{profile.stats.reach}</div><div style={{ marginTop: 5, font: '500 12px/1 Manrope,sans-serif', color: 'var(--muted)' }}>Охваты</div></div>
            <div style={{ flex: 1 }}><div style={{ font: '800 21px/1 Manrope,sans-serif', letterSpacing: '-.02em', color: '#111110' }}>{profile.stats.er}</div><div style={{ marginTop: 5, font: '500 12px/1 Manrope,sans-serif', color: 'var(--muted)' }}>ER</div></div>
          </div>
          <svg viewBox="0 0 320 76" preserveAspectRatio="none" style={{ width: '100%', height: 76, marginTop: 16, display: 'block' }}>
            <path d={sparkPaths[period]} fill="none" stroke="#111110" strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, font: '500 11px/1 Manrope,sans-serif', color: 'var(--faint)' }}>
            <span>20 апр</span><span>30 апр</span><span>10 мая</span><span>20 мая</span>
          </div>
        </div>

        <div className="overline" style={{ marginTop: 24 }}>О себе</div>
        <p style={{ margin: '12px 0 0', font: '500 15px/1.55 Manrope,sans-serif', color: '#111110' }}>{profile.bio}</p>

        <div className="overline" style={{ marginTop: 24 }}>Контакты и соцсети</div>
        <div className="card" style={{ marginTop: 12 }}>
          {profile.socials.filter((s) => s.id === 'instagram' || s.id === 'telegram').map((s) => (
            <div key={s.id} className="card-row">
              {socialIcon(s.id, 19)}
              <span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>{s.handle}</span>
              <span style={{ font: '600 13px Manrope,sans-serif', color: 'var(--muted)' }}>{s.followers}</span>
            </div>
          ))}
          <div className="card-row"><PhoneIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>{profile.phone}</span></div>
          <div className="card-row"><MailIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>{profile.email}</span></div>
        </div>

        <AccountRows onLogout={doLogout} onDelete={doDelete} />
      </div>
      <BottomNav active="profile" />
    </PhoneShell>
  );
}
