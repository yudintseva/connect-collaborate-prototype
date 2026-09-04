import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import { BackIcon } from '../components/icons';
import { useApp } from '../lib/context';

const DEMO_CODE = ['4', '8', '2', '9', '1', '3'];

export default function TelegramLogin() {
  const navigate = useNavigate();
  const { login, toast } = useApp();
  const [digits, setDigits] = useState<string[]>(['4', '8', '2', '9', '1', '']);
  const [seconds, setSeconds] = useState(24);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [seconds]);

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, '').slice(-1);
    setDigits((d) => {
      const next = [...d];
      next[i] = clean;
      return next;
    });
    if (clean && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const openBot = () => {
    toast('Код отправлен в чат с ботом');
    window.setTimeout(() => setDigits(DEMO_CODE), 500);
  };

  const submit = () => {
    if (digits.some((d) => !d)) {
      toast('Введите код полностью');
      return;
    }
    login();
    navigate('/role');
  };

  return (
    <PhoneShell>
      <StatusBar />

      <div className="nav-header">
        <button className="icon-btn back-btn" onClick={() => navigate('/')} aria-label="Назад">
          <BackIcon />
        </button>
        <div className="title">Вход через Telegram</div>
        <span />
      </div>

      <div className="grow" style={{ padding: '24px 20px 0', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ margin: 0, font: '800 26px/1.15 Manrope,sans-serif', letterSpacing: '-.025em', color: 'var(--ink)' }}>
          Введите код из бота
        </h2>
        <p style={{ margin: '10px 0 0', font: '500 15px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>
          Мы отправили одноразовый код в чат с Telegram-ботом.
        </p>

        <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              style={{
                flex: 1,
                height: 60,
                borderRadius: 14,
                background: '#fff',
                border: d ? '1.5px solid #111110' : '1px solid rgba(17,17,16,.12)',
                textAlign: 'center',
                font: '700 24px Manrope,sans-serif',
                color: '#111110',
                outline: 'none',
              }}
            />
          ))}
        </div>

        <button
          className="btn"
          style={{ marginTop: 14, height: 54, border: '1.5px solid rgba(17,17,16,.14)', background: '#fff' }}
          onClick={openBot}
        >
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#2E9BE0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 20 20" fill="#fff"><path d="M18 3 2 9.6l4.4 1.5L16 5.6l-7.7 7.2.3 4.2 2.4-2.6 3.6 2.6z" /></svg>
          </span>
          <span style={{ font: '700 15px Manrope,sans-serif', letterSpacing: '-.01em', color: '#111110' }}>Открыть Telegram-бота</span>
        </button>
        <p style={{ margin: '12px 0 0', font: '500 13px/1.5 Manrope,sans-serif', color: 'var(--faint)', textAlign: 'center' }}>
          Код придёт в чат с ботом после нажатия.
        </p>
        <p
          style={{ margin: 'auto 0 0', font: '600 13px/1 Manrope,sans-serif', color: seconds > 0 ? 'var(--muted)' : 'var(--ink)', textAlign: 'center', paddingBottom: 8, cursor: seconds > 0 ? 'default' : 'pointer' }}
          onClick={() => { if (seconds === 0) { setSeconds(24); toast('Код отправлен повторно'); } }}
        >
          {seconds > 0 ? `Отправить код повторно через 0:${String(seconds).padStart(2, '0')}` : 'Отправить код повторно'}
        </p>
      </div>

      <div className="flex-none" style={{ padding: '12px 20px 34px' }}>
        <button className="btn btn-primary btn-block" onClick={submit}>Войти</button>
        <div className="home-indicator" />
      </div>
    </PhoneShell>
  );
}
