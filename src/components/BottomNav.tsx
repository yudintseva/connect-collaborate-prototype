import { useNavigate } from 'react-router-dom';

export type NavTab = 'feed' | 'events' | 'profile';

export default function BottomNav({ active }: { active: NavTab }) {
  const navigate = useNavigate();
  return (
    <div className="bottom-nav flex-none">
      <div className="row">
        <button className={`tab ${active === 'feed' ? 'active' : ''}`} onClick={() => navigate('/feed')}>
          лента
        </button>
        <button className={`tab ${active === 'events' ? 'active' : ''}`} onClick={() => navigate('/my-events')}>
          мои мероприятия
        </button>
        <button className={`tab ${active === 'profile' ? 'active' : ''}`} onClick={() => navigate('/profile')}>
          профиль
        </button>
      </div>
      <div className="home-indicator" />
    </div>
  );
}
