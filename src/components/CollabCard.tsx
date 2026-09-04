import { useNavigate } from 'react-router-dom';
import ImageSlot from './ImageSlot';
import { BookmarkIcon } from './icons';
import type { Collaboration } from '../lib/data';
import { useApp } from '../lib/context';

const statusPillFor: Record<string, { label: string; tone: 'green' | 'blue' | 'amber' }> = {
  accepted: { label: 'Участвую', tone: 'green' },
  instant: { label: 'Принять сразу', tone: 'blue' },
  pending: { label: 'В ожидании', tone: 'amber' },
};

export default function CollabCard({ collab, mode = 'feed' }: { collab: Collaboration; mode?: 'feed' | 'my-events' }) {
  const navigate = useNavigate();
  const { savedIds, toggleSaved, applications } = useApp();
  const saved = savedIds.includes(collab.id);
  const status = applications[collab.id];

  const secondaryPill =
    mode === 'my-events' && status
      ? statusPillFor[status]
      : { label: collab.formatLabel, tone: collab.formatTone as 'green' | 'blue' };

  return (
    <div
      className="card"
      style={{ padding: 12, display: 'flex', gap: 14, cursor: 'pointer' }}
      onClick={() => navigate(`/collaboration/${collab.id}`)}
    >
      <div style={{ flex: 'none', width: 104, height: 104, borderRadius: 14, overflow: 'hidden' }}>
        <ImageSlot id={collab.thumb} radius={14} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span className="status-pill neutral">{collab.categoryLabel}</span>
            <span className={`status-pill ${secondaryPill.tone}`}>{secondaryPill.label}</span>
          </div>
          {mode === 'feed' && (
            <button
              aria-label={saved ? 'Убрать из сохранённых' : 'Сохранить'}
              onClick={(e) => { e.stopPropagation(); toggleSaved(collab.id); }}
              style={{ flex: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
            >
              <BookmarkIcon color={saved ? '#111110' : '#A6A5A2'} filled={saved} />
            </button>
          )}
        </div>
        <h3 style={{ margin: '8px 0 0', font: '700 15.5px/1.25 Manrope,sans-serif', letterSpacing: '-.015em', color: '#111110' }}>
          {collab.title}
        </h3>
        <p
          style={{
            margin: '4px 0 0', font: '500 12.5px/1.4 Manrope,sans-serif', color: 'var(--muted)',
            overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}
        >
          {mode === 'my-events' ? collab.rewardShort ?? collab.description : collab.description}
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', alignItems: 'center', gap: 8, font: '600 12px/1 Manrope,sans-serif', color: '#111110' }}>
          <span>{collab.date}</span>
          <i style={{ width: 3, height: 3, borderRadius: '50%', background: '#C4C3BF' }} />
          <span style={{ color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{collab.location}</span>
        </div>
      </div>
    </div>
  );
}
