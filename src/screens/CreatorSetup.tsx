import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import { BackIcon, CameraIcon, ChevronDownIcon, CheckIcon, PinIcon, PlusIcon, socialIcon } from '../components/icons';
import { useApp } from '../lib/context';
import { allFormats, allTopics } from '../lib/data';

const cities = ['Москва, Россия', 'Санкт-Петербург, Россия', 'Казань, Россия', 'Сочи, Россия'];

const formatIcon: Record<string, React.ReactNode> = {
  Бартер: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="7.5" width="13" height="9" rx="1.6" /><path d="M3.5 11h13M10 7.5v9" /></svg>,
  Мероприятия: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="5" width="13" height="10" rx="1.8" /><path d="M7 3.5v3M13 3.5v3M3.5 9h13" /></svg>,
  Оплата: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="6.6" /><path d="M8.4 13.4V6.8h2.2a2.2 2.2 0 0 1 0 4.4H8" /></svg>,
  UGC: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x="3.2" y="5" width="13.6" height="10" rx="2.2" /><path d="M8.8 8.2l3.4 1.8-3.4 1.8z" /></svg>,
};

export default function CreatorSetup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editing = params.get('edit') === '1';
  const { profile, updateProfile, login, completeOnboarding, toast } = useApp();

  const [name, setName] = useState(profile.name);
  const [city, setCity] = useState(profile.city);
  const [topics, setTopics] = useState<string[]>(profile.selectedTopics);
  const [formats, setFormats] = useState<string[]>(profile.selectedFormats);
  const [avatarBlob, setAvatarBlob] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleTopic = (t: string) => {
    setTopics((cur) => {
      if (cur.includes(t)) return cur.filter((x) => x !== t);
      if (cur.length >= 5) {
        toast('Можно выбрать не больше 5 тематик');
        return cur;
      }
      return [...cur, t];
    });
  };

  const toggleFormat = (f: string) => {
    setFormats((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));
  };

  const onPickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarBlob(url);
  };

  const addSocial = () => {
    toast('Добавление соцсети — демо, привязка недоступна в прототипе');
  };

  const save = () => {
    updateProfile({
      name,
      city,
      selectedTopics: topics,
      selectedFormats: formats,
      avatar: avatarBlob ?? profile.avatar,
    });
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

      <div className="nav-header" style={{ gridTemplateColumns: '44px 1fr 44px' }}>
        <button className="icon-btn back-btn" onClick={() => navigate(editing ? '/profile' : '/role')} aria-label="Назад">
          <BackIcon />
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 5 }}>
          {[0, 1, 2, 3].map((i) => (
            <i key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: i === 0 ? '#111110' : 'rgba(17,17,16,.13)' }} />
          ))}
        </div>
        <span style={{ font: '700 12px/1 Manrope,sans-serif', color: 'var(--faint)', letterSpacing: '.02em', textAlign: 'right' }}>1/4</span>
      </div>

      <div className="grow scroll-y" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ margin: 0, font: '800 27px/1.14 Manrope,sans-serif', letterSpacing: '-.03em', color: 'var(--ink)' }}>
              {editing ? 'Редактируйте профиль' : 'Создайте профиль креатора'}
            </h1>
            <p style={{ margin: '8px 0 0', font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>Расскажите о себе, чтобы бренды могли найти вас.</p>
          </div>
          <div style={{ position: 'relative', flex: 'none', width: 84, height: 84 }}>
            <div style={{ width: 84, height: 84, borderRadius: '50%', overflow: 'hidden' }}>
              {avatarBlob ? <img src={avatarBlob} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageSlot id={profile.avatar} />}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              style={{ position: 'absolute', right: -2, bottom: -2, width: 30, height: 30, borderRadius: '50%', background: '#fff', border: '1px solid rgba(17,17,16,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="Изменить фото"
            >
              <CameraIcon />
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickAvatar} />
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label className="field-label">Имя и фамилия</label>
          <input className="field-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label className="field-label">Город</label>
          <div style={{ position: 'relative' }}>
            <div className="field-input" style={{ pointerEvents: 'none' }}>
              <PinIcon />
              <span style={{ flex: 1, font: '600 15px Manrope,sans-serif', color: '#111110' }}>{city}</span>
              <ChevronDownIcon />
            </div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            >
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
            <label className="field-label">Тематики блога</label>
            <span style={{ font: '600 12px/1 Manrope,sans-serif', color: 'var(--faint)' }}>{topics.length} / 5</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {allTopics.map((t) => {
              const on = topics.includes(t);
              return (
                <button key={t} className={`chip ${on ? 'on' : ''}`} style={{ fontSize: 13.5 }} onClick={() => toggleTopic(t)}>
                  {on && <CheckIcon size={12} />}
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <label className="field-label">Социальные сети</label>
          <div className="card" style={{ marginTop: 12 }}>
            {profile.socials.map((s) => (
              <div key={s.id} className="card-row">
                {socialIcon(s.id, 20)}
                <span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>{s.handle}</span>
                <span style={{ font: '600 13px Manrope,sans-serif', color: 'var(--muted)' }}>{s.followers}</span>
              </div>
            ))}
            <button className="card-row card-row-btn" onClick={addSocial}>
              <PlusIcon strokeWidth={1.7} />
              <span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>Добавить соцсеть</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <label className="field-label">Статистика · средние показатели</label>
          <div className="card" style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {[
              ['28.7K', 'Подписчики'],
              ['76.1K', 'Охват / 30 дней'],
              ['5.6%', 'ER'],
              ['4.3K', 'Средние лайки'],
            ].map(([v, l], i) => (
              <div key={l} style={{ padding: 16, borderRight: i % 2 === 0 ? '1px solid var(--hairline-soft)' : 'none', borderBottom: i < 2 ? '1px solid var(--hairline-soft)' : 'none' }}>
                <div style={{ font: '800 21px/1 Manrope,sans-serif', letterSpacing: '-.02em', color: '#111110' }}>{v}</div>
                <div style={{ marginTop: 5, font: '500 12.5px/1 Manrope,sans-serif', color: 'var(--muted)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 22, paddingBottom: 20 }}>
          <label className="field-label">Форматы сотрудничества</label>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {allFormats.map((f) => {
              const on = formats.includes(f);
              return (
                <button
                  key={f}
                  onClick={() => toggleFormat(f)}
                  style={{
                    height: 56, borderRadius: 14, background: on ? '#111110' : '#fff',
                    border: on ? 'none' : '1px solid rgba(17,17,16,.12)',
                    display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
                    color: on ? '#fff' : '#111110', cursor: 'pointer',
                  }}
                >
                  {formatIcon[f]}
                  <span style={{ flex: 1, font: '600 14px Manrope,sans-serif', textAlign: 'left' }}>{f}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-none" style={{ padding: '12px 20px 34px', background: 'linear-gradient(180deg, rgba(244,243,241,0), #F4F3F1 40%)' }}>
        <button className="btn btn-primary btn-block" onClick={save}>{editing ? 'Сохранить' : 'Продолжить'}</button>
        <div className="home-indicator" />
      </div>
    </PhoneShell>
  );
}
