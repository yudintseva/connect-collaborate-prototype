import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import { BackIcon, CameraIcon } from '../components/icons';
import { useApp } from '../lib/context';

const categories = ['Рестораны', 'Салоны', 'События', 'Мода', 'Pop-up', 'Другое'];

export default function BrandSetup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editing = params.get('edit') === '1';
  const { brandProfile, updateBrandProfile, login, completeOnboarding, toast } = useApp();

  const [name, setName] = useState(brandProfile.name || '');
  const [category, setCategory] = useState(brandProfile.category);
  const [description, setDescription] = useState(brandProfile.description);
  const [avatarBlob, setAvatarBlob] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarBlob(URL.createObjectURL(file));
  };

  const save = () => {
    if (!name.trim()) {
      toast('Укажите название бренда');
      return;
    }
    updateBrandProfile({ name, category, description });
    if (editing) {
      toast('Профиль обновлён');
      navigate('/profile');
    } else {
      login();
      completeOnboarding();
      navigate('/feed');
    }
  };

  return (
    <PhoneShell>
      <StatusBar />
      <div className="nav-header">
        <button className="icon-btn back-btn" onClick={() => navigate(editing ? '/profile' : '/role')} aria-label="Назад">
          <BackIcon />
        </button>
        <div className="title">Профиль бренда</div>
        <span />
      </div>

      <div className="grow scroll-y" style={{ padding: '8px 20px 0' }}>
        <h1 style={{ margin: 0, font: '800 27px/1.14 Manrope,sans-serif', letterSpacing: '-.03em', color: 'var(--ink)' }}>
          Расскажите о бренде
        </h1>
        <p style={{ margin: '8px 0 0', font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>
          Креаторы увидят это, когда будут откликаться на ваши коллаборации.
        </p>

        <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', flex: 'none', width: 84, height: 84 }}>
            <div style={{ width: 84, height: 84, borderRadius: 20, overflow: 'hidden' }}>
              {avatarBlob ? <img src={avatarBlob} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageSlot id={brandProfile.avatar} radius={20} />}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              style={{ position: 'absolute', right: -2, bottom: -2, width: 30, height: 30, borderRadius: '50%', background: '#fff', border: '1px solid rgba(17,17,16,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="Изменить логотип"
            >
              <CameraIcon />
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickAvatar} />
          </div>
          <p style={{ margin: 0, font: '500 12.5px/1.5 Manrope,sans-serif', color: 'var(--faint)' }}>Логотип или фото бренда</p>
        </div>

        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label className="field-label">Название бренда</label>
          <input className="field-input" placeholder="Например, Nian" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div style={{ marginTop: 18 }}>
          <label className="field-label">Категория</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {categories.map((c) => (
              <button key={c} className={`chip ${category.startsWith(c) || category === c ? 'on' : ''}`} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 24 }}>
          <label className="field-label">О бренде</label>
          <textarea
            className="field-input"
            placeholder="Пара предложений о том, чем вы занимаетесь"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-none" style={{ padding: '12px 20px 34px', background: 'linear-gradient(180deg, rgba(244,243,241,0), #F4F3F1 40%)' }}>
        <button className="btn btn-primary btn-block" onClick={save}>{editing ? 'Сохранить' : 'Продолжить'}</button>
        <div className="home-indicator" />
      </div>
    </PhoneShell>
  );
}
