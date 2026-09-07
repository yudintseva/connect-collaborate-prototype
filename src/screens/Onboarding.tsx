import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';

const slides = [
  {
    title: 'Найдите коллаборацию',
    body: 'Бренды, рестораны, салоны и события ищут креаторов рядом с вами.',
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" fill="rgba(255,255,255,.14)" />
        <path d="M20 44c0-12.7 7.4-21 16-21s16 8.3 16 21" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <circle cx="36" cy="22" r="10" fill="#fff" />
        <circle cx="49" cy="47" r="9" fill="#8DB2FF" />
        <path d="M46 47h6M49 44v6" stroke="#1633A6" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Договоритесь за пару тапов',
    body: 'Смотрите условия, откликайтесь и получайте бартер или оплату.',
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" fill="rgba(255,255,255,.14)" />
        <rect x="17" y="19" width="38" height="30" rx="10" fill="#fff" />
        <circle cx="51" cy="47" r="12" fill="#8DB2FF" />
        <path d="M46 47l4 4 8-8" stroke="#1633A6" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Управляйте всем в одном месте',
    body: 'Заявки, статусы и профиль — всегда под рукой, в одном приложении.',
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" fill="rgba(255,255,255,.14)" />
        <rect x="18" y="18" width="16" height="16" rx="7" fill="#fff" />
        <rect x="38" y="18" width="16" height="16" rx="7" fill="#8DB2FF" />
        <rect x="18" y="38" width="16" height="16" rx="7" fill="#8DB2FF" />
        <rect x="38" y="38" width="16" height="16" rx="7" fill="#fff" />
      </svg>
    ),
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const last = step === slides.length - 1;

  const finish = () => navigate('/login?intent=join');
  const next = () => (last ? finish() : setStep((s) => s + 1));

  return (
    <PhoneShell>
      <div
        style={{
          position: 'relative',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(160deg, #3B6BF2 0%, #1633A6 55%, #050914 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 24px 0', flex: 'none' }}>
          <span style={{ font: '700 15px/1 Manrope,sans-serif', letterSpacing: '-.01em', color: '#fff' }}>9:41</span>
          <button
            onClick={finish}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: '600 13px Manrope,sans-serif', color: 'rgba(255,255,255,.7)' }}
          >
            Пропустить
          </button>
        </div>

        <div className="grow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
          <div style={{ width: 112, height: 112, borderRadius: '50%', background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {slides[step].icon}
          </div>
          <h1 style={{ margin: '30px 0 0', font: '800 26px/1.2 Manrope,sans-serif', letterSpacing: '-.02em', color: '#fff' }}>
            {slides[step].title}
          </h1>
          <p style={{ margin: '12px 0 0', font: '500 15px/1.5 Manrope,sans-serif', color: 'rgba(255,255,255,.75)', maxWidth: 280 }}>
            {slides[step].body}
          </p>
        </div>

        <div className="flex-none" style={{ padding: '0 24px 34px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 26 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                aria-label={`Слайд ${i + 1}`}
                style={{
                  width: i === step ? 20 : 7,
                  height: 7,
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  background: i === step ? '#fff' : 'rgba(255,255,255,.35)',
                  transition: 'width .2s',
                }}
              />
            ))}
          </div>
          <button
            className="btn btn-block"
            style={{ height: 54, background: '#fff', color: '#1633A6', fontWeight: 700 }}
            onClick={next}
          >
            {last ? 'Начать' : 'Далее'}
          </button>
          <div style={{ margin: '22px auto 0', width: 136, height: 5, borderRadius: 999, background: '#fff', opacity: 0.85 }} />
        </div>
      </div>
    </PhoneShell>
  );
}
