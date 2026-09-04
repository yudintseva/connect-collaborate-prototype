import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './lib/context';
import Welcome from './screens/Welcome';
import TelegramLogin from './screens/TelegramLogin';
import RoleSelect from './screens/RoleSelect';
import CreatorSetup from './screens/CreatorSetup';
import BrandSetup from './screens/BrandSetup';
import Feed from './screens/Feed';
import CollaborationDetail from './screens/CollaborationDetail';
import ApplicationSuccess from './screens/ApplicationSuccess';
import MyEvents from './screens/MyEvents';
import Profile from './screens/Profile';
import Notifications from './screens/Notifications';
import CreateCollaboration from './screens/CreateCollaboration';
import BrandProfileScreen from './screens/BrandProfileScreen';
import History from './screens/History';
import Support from './screens/Support';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<TelegramLogin />} />
          <Route path="/role" element={<RoleSelect />} />
          <Route path="/setup" element={<CreatorSetup />} />
          <Route path="/brand-setup" element={<BrandSetup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/collaboration/:id" element={<CollaborationDetail />} />
          <Route path="/collaboration/:id/success" element={<ApplicationSuccess />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/create" element={<CreateCollaboration />} />
          <Route path="/brand/:id" element={<BrandProfileScreen />} />
          <Route path="/history" element={<History />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
