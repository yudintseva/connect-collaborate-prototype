import { useNavigate } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import { BackIcon } from '../components/icons';

const faq = [
  { q: 'Как принять участие в коллаборации?', a: 'Откройте карточку коллаборации в ленте и нажмите «Откликнуться». Бренд рассмотрит заявку в течение 48 часов.' },
  { q: 'Что такое «Принять сразу»?', a: 'Некоторые бренды не требуют рассмотрения заявки — вы сразу подтверждаете участие.' },
  { q: 'Как изменить категории и форматы?', a: 'В профиле нажмите на иконку карандаша рядом с именем, чтобы отредактировать анкету.' },
];

export default function Support() {
  const navigate = useNavigate();
  return (
    <PhoneShell>
      <StatusBar />
      <div className="nav-header">
        <button className="icon-btn back-btn" onClick={() => navigate(-1)} aria-label="Назад"><BackIcon /></button>
        <div className="title">Поддержка</div>
        <span />
      </div>

      <div className="grow scroll-y" style={{ padding: '18px 20px 24px' }}>
        <div className="overline">Частые вопросы</div>
        <div className="card" style={{ marginTop: 12 }}>
          {faq.map((f) => (
            <div key={f.q} className="card-row" style={{ display: 'block' }}>
              <div style={{ font: '700 14.5px/1.3 Manrope,sans-serif', color: '#111110' }}>{f.q}</div>
              <div style={{ marginTop: 6, font: '500 13.5px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>{f.a}</div>
            </div>
          ))}
        </div>

        <div className="overline" style={{ marginTop: 24 }}>Связаться с нами</div>
        <a
          className="btn btn-primary btn-block"
          style={{ marginTop: 12, textDecoration: 'none' }}
          href="mailto:support@connectcollab.app"
        >
          Написать в поддержку
        </a>
      </div>
    </PhoneShell>
  );
}
