import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  type ApplicationStatus,
  type Collaboration,
  type CreatorProfile,
  type BrandProfile,
  type Notification,
  collaborations as seedCollaborations,
  initialApplications,
  initialNotifications,
  defaultCreatorProfile,
  defaultBrandProfile,
} from './data';

type Role = 'creator' | 'brand' | null;

interface PersistedState {
  role: Role;
  authed: boolean;
  onboarded: boolean;
  profile: CreatorProfile;
  brandProfile: BrandProfile;
  applications: Record<string, ApplicationStatus>;
  savedIds: string[];
  notifications: Notification[];
  extraCollaborations: Collaboration[];
}

const STORAGE_KEY = 'cc-app-state-v1';

function defaultState(): PersistedState {
  return {
    role: null,
    authed: false,
    onboarded: false,
    profile: defaultCreatorProfile,
    brandProfile: defaultBrandProfile,
    applications: initialApplications,
    savedIds: [],
    notifications: initialNotifications,
    extraCollaborations: [],
  };
}

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

interface AppContextValue extends PersistedState {
  collaborations: Collaboration[];
  setRole: (role: Role) => void;
  login: () => void;
  logout: () => void;
  deleteAccount: () => void;
  completeOnboarding: () => void;
  updateProfile: (patch: Partial<CreatorProfile>) => void;
  updateBrandProfile: (patch: Partial<BrandProfile>) => void;
  applyTo: (id: string) => void;
  acceptInstant: (id: string) => void;
  toggleSaved: (id: string) => void;
  markRead: (id: string) => void;
  addCollaboration: (collab: Collaboration) => void;
  toast: (msg: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadState);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const setRole = useCallback((role: Role) => setState((s) => ({ ...s, role })), []);
  const login = useCallback(() => setState((s) => ({ ...s, authed: true })), []);
  const logout = useCallback(() => setState(() => ({ ...defaultState(), authed: false })), []);
  const deleteAccount = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState());
  }, []);
  const completeOnboarding = useCallback(() => setState((s) => ({ ...s, onboarded: true })), []);

  const updateProfile = useCallback(
    (patch: Partial<CreatorProfile>) => setState((s) => ({ ...s, profile: { ...s.profile, ...patch } })),
    [],
  );
  const updateBrandProfile = useCallback(
    (patch: Partial<BrandProfile>) => setState((s) => ({ ...s, brandProfile: { ...s.brandProfile, ...patch } })),
    [],
  );

  const applyTo = useCallback((id: string) => {
    setState((s) => ({ ...s, applications: { ...s.applications, [id]: 'pending' } }));
  }, []);
  const acceptInstant = useCallback((id: string) => {
    setState((s) => ({ ...s, applications: { ...s.applications, [id]: 'accepted' } }));
  }, []);
  const toggleSaved = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      savedIds: s.savedIds.includes(id) ? s.savedIds.filter((x) => x !== id) : [...s.savedIds, id],
    }));
  }, []);
  const markRead = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  }, []);
  const addCollaboration = useCallback((collab: Collaboration) => {
    setState((s) => ({ ...s, extraCollaborations: [collab, ...s.extraCollaborations] }));
  }, []);

  const collaborations = useMemo(
    () => [...state.extraCollaborations, ...seedCollaborations],
    [state.extraCollaborations],
  );

  const value: AppContextValue = {
    ...state,
    collaborations,
    setRole,
    login,
    logout,
    deleteAccount,
    completeOnboarding,
    updateProfile,
    updateBrandProfile,
    applyTo,
    acceptInstant,
    toggleSaved,
    markRead,
    addCollaboration,
    toast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="toast-host">{toastMsg && <div className="toast">{toastMsg}</div>}</div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
