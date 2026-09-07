import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PhoneShell from '../components/PhoneShell';
import StatusBar from '../components/StatusBar';
import ImageSlot from '../components/ImageSlot';
import { BackIcon, BookmarkIcon, CalendarIcon, DocIcon, GiftIcon, PinIcon, TicketIcon, UsersIcon } from '../components/icons';
import { useApp } from '../lib/context';
import { brands } from '../lib/data';

export default function CollaborationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { collaborations, applications, applyTo, acceptInstant, savedIds, toggleSaved, toast } = useApp();
  const collab = collaborations.find((c) => c.id === id);
  const brand = brands.find((b) => b.id === collab?.brandId);
  const saved = id ? savedIds.includes(id) : false;
  const status = id ? applications[id] : undefined;

  useEffect(() => {
    if (!collab) navigate('/feed', { replace: true });
  }, [collab, navigate]);

  if (!collab) return null;

  const openMap = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(collab.location + ', Москва')}`, '_blank', 'noopener');
  };

  const cta = (() => {
    if (collab.createdByMe) return { label: 'Опубликовано вами', disabled: true };
    if (status === 'pending') return { label: 'Заявка на рассмотрении', disabled: true };
    if (status === 'accepted') return { label: 'Вы участвуете', disabled: true };
    if (status === 'instant') {
      return {
        label: 'Принять',
        disabled: false,
        onClick: () => { acceptInstant(collab.id); toast('Принято! Коллаборация в разделе «Участвую»'); navigate('/my-events'); },
      };
    }
    return {
      label: 'Откликнуться',
      disabled: false,
      onClick: () => { applyTo(collab.id); navigate(`/collaboration/${collab.id}/success`); },
    };
  })();

  return (
    <PhoneShell>
      <StatusBar />
      <div className="nav-header" style={{ padding: '8px 20px 8px' }}>
        <button className="icon-btn back-btn" onClick={() => navigate(-1)} aria-label="Назад"><BackIcon /></button>
        <span />
        <button className="icon-btn" style={{ marginRight: -8, justifySelf: 'end' }} onClick={() => toggleSaved(collab.id)} aria-label="Сохранить">
          <BookmarkIcon color={saved ? '#111110' : '#111110'} filled={saved} />
        </button>
      </div>

      <div className="grow scroll-y" style={{ padding: '0 20px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', borderRadius: 20, overflow: 'hidden' }}>
          <ImageSlot id={collab.hero} radius={20} />
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
          <span className="status-pill neutral" style={{ fontSize: 10 }}>{collab.categoryLabel}</span>
          <span className={`status-pill ${collab.formatTone}`} style={{ fontSize: 10 }}>{collab.formatLabel}</span>
        </div>
        <h1 style={{ margin: '12px 0 0', font: '800 27px/1.14 Manrope,sans-serif', letterSpacing: '-.03em', color: '#111110' }}>{collab.title}</h1>
        <p style={{ margin: '10px 0 0', font: '500 15px/1.5 Manrope,sans-serif', color: 'var(--muted)' }}>{collab.description}</p>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-row">
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 10, background: 'var(--tile-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><DocIcon /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="overline">Что нужно</div>
              <div style={{ marginTop: 6, font: '600 15px/1.35 Manrope,sans-serif', color: '#111110' }}>{collab.whatNeeded}</div>
            </div>
          </div>
          <div className="card-row">
            <span style={{ flex: 'none', width: 34, height: 34, borderRadius: 10, background: 'var(--tile-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GiftIcon /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="overline">Что вы получаете</div>
              <div style={{ marginTop: 6, font: '600 15px/1.35 Manrope,sans-serif', color: '#111110' }}>{collab.whatYouGet}</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <div className="card-row"><CalendarIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>{collab.date}</span></div>
          <button className="card-row card-row-btn" onClick={openMap}>
            <PinIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>{collab.location}</span>
            <span style={{ font: '600 13px Manrope,sans-serif', color: 'var(--muted)' }}>На карте</span>
          </button>
          <div className="card-row"><UsersIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>от {collab.audienceMin.toLocaleString('ru-RU')} подписчиков</span></div>
          {collab.spotsLeft !== null && (
            <div className="card-row">
              <TicketIcon /><span style={{ flex: 1, font: '600 14.5px Manrope,sans-serif', color: '#111110' }}>Осталось {collab.spotsLeft} мест</span>
              {collab.spotsLeft <= 3 && <span className="status-pill amber">Мало мест</span>}
            </div>
          )}
        </div>

        {brand && (
          <button
            className="card card-row-btn"
            style={{ marginTop: 12, padding: 16, display: 'block', width: '100%' }}
            onClick={() => navigate(`/brand/${brand.id}`)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 'none', width: 38, height: 38, borderRadius: '50%', overflow: 'hidden' }}><ImageSlot id={brand.logo} /></div>
              <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                <div style={{ font: '700 14.5px/1.2 Manrope,sans-serif', color: '#111110' }}>{brand.name}</div>
                <div style={{ marginTop: 3, font: '500 12.5px/1 Manrope,sans-serif', color: 'var(--muted)' }}>{brand.category}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C4C3BF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 4.5 13 10l-5.5 5.5" /></svg>
            </div>
            <p style={{ margin: '14px 0 0', font: '500 14px/1.5 Manrope,sans-serif', color: 'var(--ink-soft)', textAlign: 'left' }}>{brand.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--hairline-soft)' }}>
              <div style={{ display: 'flex' }}>
                {['cc-app-1', 'cc-app-2', 'cc-app-3', 'cc-app-4'].map((a, i) => (
                  <span key={a} style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #fff', overflow: 'hidden', display: 'block', marginLeft: i ? -10 : 0 }}>
                    <ImageSlot id={`picsum:${a}`} />
                  </span>
                ))}
              </div>
              <span style={{ font: '600 13px Manrope,sans-serif', color: 'var(--muted)' }}>+{collab.applicants} уже откликнулись</span>
            </div>
          </button>
        )}
        <div style={{ height: 16 }} />
      </div>

      <div className="flex-none" style={{ padding: '12px 20px 34px', background: 'linear-gradient(180deg, rgba(244,243,241,0), #F4F3F1 40%)' }}>
        <button
          className={`btn btn-block ${cta.disabled ? 'btn-secondary' : 'btn-primary'}`}
          disabled={cta.disabled}
          style={cta.disabled ? { opacity: 0.7, cursor: 'default' } : undefined}
          onClick={cta.onClick}
        >
          {cta.label}
        </button>
        <div className="home-indicator" />
      </div>
    </PhoneShell>
  );
}
