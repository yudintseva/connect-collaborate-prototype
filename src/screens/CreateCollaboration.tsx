import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import CollabCard from '../components/CollabCard';
import { BackIcon, CalendarIcon, CheckIcon, TicketIcon, UsersIcon } from '../components/icons';
import { useApp } from '../lib/context';
import type { Collaboration } from '../lib/data';

const categoryOptions: { key: Collaboration['categoryKey']; label: string }[] = [
  { key: 'restaurants', label: 'Рестораны' },
  { key: 'salons', label: 'Салоны' },
  { key: 'events', label: 'Мероприятия' },
  { key: 'brands', label: 'Бренды' },
  { key: 'clubs', label: 'Клубы' },
  { key: 'other', label: 'Другое' },
];

const formatOptions: { key: Collaboration['formatKey']; label: string; tone: 'green' | 'blue' }[] = [
  { key: 'barter', label: 'Бартер', tone: 'green' },
  { key: 'paid', label: 'Оплата', tone: 'blue' },
  { key: 'ugc', label: 'UGC', tone: 'blue' },
];

const dateOptions = ['20 мая · 19:00', '24–26 мая', 'Сегодня · 15:00', '1 июня · 10:00'];
const audienceOptions = [500, 1000, 3000, 5000, 10000];

export default function CreateCollaboration() {
  const navigate = useNavigate();
  const { brandProfile, addCollaboration, toast, role } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [title, setTitle] = useState('');
  const [categoryKey, setCategoryKey] = useState<Collaboration['categoryKey']>('restaurants');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [coverBlob, setCoverBlob] = useState<string | null>(null);
  const [whatNeeded, setWhatNeeded] = useState('');
  const [whatYouGet, setWhatYouGet] = useState('');
  const [formatKey, setFormatKey] = useState<Collaboration['formatKey']>('barter');
  const [dateIdx, setDateIdx] = useState(0);
  const [audienceIdx, setAudienceIdx] = useState(1);
  const [spots, setSpots] = useState(5);
  const fileRef = useRef<HTMLInputElement>(null);

  if (role !== 'brand') {
    navigate('/feed', { replace: true });
    return null;
  }

  const categoryLabel = categoryOptions.find((c) => c.key === categoryKey)!.label;
  const format = formatOptions.find((f) => f.key === formatKey)!;

  const addNeeded = (chunk: string) => {
    setWhatNeeded((cur) => (cur ? `${cur} + ${chunk}` : chunk));
  };

  const onPickCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverBlob(URL.createObjectURL(file));
  };

  const back = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => (s - 1) as 1 | 2 | 3);
  };

  const draft: Collaboration = {
    id: `mine-${Date.now()}`,
    title: title || 'Новая коллаборация',
    description: description || 'Описание появится здесь.',
    categoryKey,
    categoryLabel,
    formatKey,
    formatLabel: format.label,
    formatTone: format.tone,
    date: dateOptions[dateIdx],
    when: dateIdx === 2 ? 'today' : 'week',
    location: location || 'Москва',
    audienceMin: audienceOptions[audienceIdx],
    spotsLeft: spots,
    applicants: 0,
    hero: coverBlob ?? '',
    thumb: coverBlob ?? '',
    whatNeeded: whatNeeded || 'Не указано',
    whatYouGet: whatYouGet || 'Не указано',
    brandId: 'you',
    createdByMe: true,
  };

  const publish = () => {
    addCollaboration(draft);
    setStep(4);
  };

  const progress = (
    <div className="nav-header">
      <button className="icon-btn back-btn" onClick={back} aria-label="Назад"><BackIcon /></button>
      <div style={{ flex: 1, display: 'flex', gap: 5 }}>
        {[1, 2, 3].map((i) => (
          <i key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: i <= step ? '#111110' : 'rgba(17,17,16,.13)' }} />
        ))}
      </div>
      <span style={{ font: '700 12px/1 Manrope,sans-serif', color: 'var(--faint)', textAlign: 'right' }}>{Math.min(step, 3)}/3</span>
    </div>
  );

  if (step === 4) {
    return (
      <PhoneShell>
        <StatusBar />
        <div className="grow" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 20px' }}>
          <span style={{ width: 76, height: 76, borderRadius: '50%', background: '#111110', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckIcon size={34} strokeWidth={1.9} />
          </span>
          <h1 style={{ margin: '26px 0 0', font: '800 30px/1.1 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110', textAlign: 'center' }}>
            Коллаборация опубликована
          </h1>
          <p style={{ margin: '12px 0 0', font: '500 15px/1.5 Manrope,sans-serif', color: 'var(--muted)', textAlign: 'center', maxWidth: 300 }}>
            Она уже видна креаторам в ленте. Заявки будут приходить в раздел «Мои коллаборации».
          </p>
          <div style={{ marginTop: 30, width: '100%' }}><CollabCard collab={draft} /></div>
        </div>
        <div className="flex-none" style={{ padding: '0 20px 34px' }}>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/my-events')}>Мои коллаборации</button>
          <button className="btn-ghost btn-block" style={{ marginTop: 6 }} onClick={() => navigate('/feed')}>В ленту</button>
          <div className="home-indicator" style={{ marginTop: 16 }} />
        </div>
      </PhoneShell>
    );
  }

  if (step === 1) {
    return (
      <PhoneShell>
        <StatusBar />
        {progress}
        <div className="grow scroll-y" style={{ padding: '0 20px' }}>
          <h1 style={{ margin: 0, font: '800 27px/1.14 Manrope,sans-serif', letterSpacing: '-.03em', color: 'var(--ink)' }}>О чём коллаборация</h1>
          <p style={{ margin: '8px 0 0', font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>Название и категория помогут креаторам быстро понять суть.</p>

          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="field-label">Название</label>
            <input className="field-input" placeholder="Например, Открытие ресторана" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div style={{ marginTop: 18 }}>
            <label className="field-label">Категория</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {categoryOptions.map((c) => (
                <button key={c.key} className={`chip ${categoryKey === c.key ? 'on' : ''}`} onClick={() => setCategoryKey(c.key)}>{c.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="field-label">Короткое описание</label>
            <textarea className="field-input" rows={3} placeholder="О чём этот проект" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div style={{ marginTop: 18, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="field-label">Локация</label>
            <input className="field-input" placeholder="Адрес или район" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
        <div className="flex-none" style={{ padding: '12px 20px 34px', background: 'linear-gradient(180deg, rgba(244,243,241,0), #F4F3F1 40%)' }}>
          <button
            className="btn btn-primary btn-block"
            onClick={() => { if (!title.trim()) { toast('Укажите название'); return; } setStep(2); }}
          >
            Далее
          </button>
          <div className="home-indicator" />
        </div>
      </PhoneShell>
    );
  }

  if (step === 2) {
    return (
      <PhoneShell>
        <StatusBar />
        {progress}
        <div className="grow scroll-y" style={{ padding: '0 20px' }}>
          <h1 style={{ margin: 0, font: '800 27px/1.14 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110' }}>Условия коллаборации</h1>
          <p style={{ margin: '8px 0 0', font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>Опишите, что нужно сделать и что получит креатор.</p>

          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="field-label">Обложка</label>
            <button
              onClick={() => fileRef.current?.click()}
              style={{ width: '100%', aspectRatio: '16/9', position: 'relative', minWidth: 0, overflow: 'hidden', borderRadius: 14, border: 'none', padding: 0, cursor: 'pointer' }}
            >
              {coverBlob ? <img src={coverBlob} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageSlot id="" />}
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickCover} />
          </div>

          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="field-label">Что нужно от креатора</label>
            <input className="field-input" placeholder="1 Reels + 3 Stories" value={whatNeeded} onChange={(e) => setWhatNeeded(e.target.value)} />
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 }}>
              {['Reels', 'Stories', 'Пост', 'UGC-видео'].map((c) => (
                <button key={c} className="chip" style={{ height: 30, padding: '0 12px', fontSize: 12.5 }} onClick={() => addNeeded(c)}>+ {c}</button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="field-label">Что получает креатор</label>
            <input className="field-input" placeholder="Ужин на двоих" value={whatYouGet} onChange={(e) => setWhatYouGet(e.target.value)} />
          </div>

          <div style={{ marginTop: 18 }}>
            <label className="field-label">Формат</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {formatOptions.map((f) => (
                <button key={f.key} className={`segment ${formatKey === f.key ? 'on' : ''}`} onClick={() => setFormatKey(f.key)}>{f.label}</button>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: 18, marginBottom: 24 }}>
            <button className="card-row card-row-btn" onClick={() => setDateIdx((i) => (i + 1) % dateOptions.length)}>
              <CalendarIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>{dateOptions[dateIdx]}</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C4C3BF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 4.5 13 10l-5.5 5.5" /></svg>
            </button>
            <button className="card-row card-row-btn" onClick={() => setAudienceIdx((i) => (i + 1) % audienceOptions.length)}>
              <UsersIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>от {audienceOptions[audienceIdx].toLocaleString('ru-RU')} подписчиков</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C4C3BF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 4.5 13 10l-5.5 5.5" /></svg>
            </button>
            <button className="card-row card-row-btn" onClick={() => setSpots((s) => (s >= 10 ? 1 : s + 1))}>
              <TicketIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>{spots} мест</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C4C3BF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 4.5 13 10l-5.5 5.5" /></svg>
            </button>
          </div>
        </div>
        <div className="flex-none" style={{ padding: '12px 20px 34px', background: 'linear-gradient(180deg, rgba(244,243,241,0), #F4F3F1 40%)' }}>
          <button className="btn btn-primary btn-block" onClick={() => setStep(3)}>Далее · предпросмотр</button>
          <div className="home-indicator" />
        </div>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell>
      <StatusBar />
      {progress}
      <div className="grow scroll-y" style={{ padding: '0 20px' }}>
        <h1 style={{ margin: 0, font: '800 27px/1.14 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110' }}>Предпросмотр</h1>
        <p style={{ margin: '8px 0 0 0', font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>Так карточка будет выглядеть в ленте.</p>
        <div style={{ marginTop: 18 }}><CollabCard collab={draft} /></div>

        <div className="card" style={{ marginTop: 18, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 'none', width: 38, height: 38, borderRadius: '50%', overflow: 'hidden' }}><ImageSlot id={brandProfile.avatar} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: '700 14.5px/1.2 Manrope,sans-serif', color: '#111110' }}>{brandProfile.name || 'Ваш бренд'}</div>
              <div style={{ marginTop: 3, font: '500 12.5px/1 Manrope,sans-serif', color: 'var(--muted)' }}>{brandProfile.category}</div>
            </div>
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>
      <div className="flex-none" style={{ padding: '12px 20px 34px', background: 'linear-gradient(180deg, rgba(244,243,241,0), #F4F3F1 40%)' }}>
        <button className="btn btn-primary btn-block" onClick={publish}>Опубликовать</button>
        <div className="home-indicator" />
      </div>
    </PhoneShell>
  );
}
