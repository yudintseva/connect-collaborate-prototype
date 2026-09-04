import type { CSSProperties } from 'react';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

const base = (size = 20) => ({ width: size, height: size, viewBox: '0 0 20 20' });

export function BackIcon({ size = 20, color = '#111110', strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 4 5 10l5.5 6M5 10h11" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16, color = '#C4C3BF' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 18, color = '#A6A5A2' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}

export function CheckIcon({ size = 13, color = '#fff', strokeWidth = 2.4, style }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M4.5 10.5 8 14l7.5-8" />
    </svg>
  );
}

export function BookmarkIcon({ size = 18, color = '#A6A5A2', filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(size)} fill={filled ? color : 'none'} stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 3.8h9v12.4L10 12.7l-4.5 3.5z" />
    </svg>
  );
}

export function BellIcon({ size = 19, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8.6a4 4 0 0 1 8 0c0 3.6 1.3 4.6 1.3 4.6H4.7S6 12.2 6 8.6z" />
      <path d="M8.5 15.4a1.6 1.6 0 0 0 3 0" />
    </svg>
  );
}

export function SlidersIcon({ size = 19, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round">
      <path d="M3.5 6.5h13M3.5 13.5h13" />
      <circle cx="8" cy="6.5" r="2.1" fill="#F4F3F1" />
      <circle cx="13" cy="13.5" r="2.1" fill="#F4F3F1" />
    </svg>
  );
}

export function PinIcon({ size = 18, color = '#7A7A78' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17s5-5.4 5-9.2A5 5 0 0 0 5 7.8C5 11.6 10 17 10 17z" />
      <circle cx="10" cy="7.9" r="1.9" />
    </svg>
  );
}

export function CalendarIcon({ size = 18, color = '#7A7A78' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="13" height="10" rx="1.8" />
      <path d="M7 3.5v3M13 3.5v3M3.5 9h13" />
    </svg>
  );
}

export function UsersIcon({ size = 18, color = '#7A7A78' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.8" cy="7.8" r="2.6" />
      <circle cx="13.4" cy="8.4" r="2.1" />
      <path d="M3 16c0-2.6 2.1-4.2 4.8-4.2S12.6 13.4 12.6 16" />
    </svg>
  );
}

export function TicketIcon({ size = 18, color = '#7A7A78' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="9" width="10" height="7.5" rx="1.6" />
      <path d="M7.2 9V7.2a2.8 2.8 0 0 1 5.6 0V9" />
    </svg>
  );
}

export function DocIcon({ size = 17, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h5l3.2 3.2V17H6z" />
      <path d="M11 3v3.4h3.2" />
    </svg>
  );
}

export function GiftIcon({ size = 17, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="7.5" width="13" height="9" rx="1.6" />
      <path d="M3.5 11h13M10 7.5v9" />
      <path d="M10 7.5C10 5.6 8.9 4.2 7.5 4.2S6 7.5 10 7.5zm0 0c0-1.9 1.1-3.3 2.5-3.3s1.5 3.3-2.5 3.3z" />
    </svg>
  );
}

export function PlusIcon({ size = 18, color = '#111110', strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M10 5v10M5 10h10" />
    </svg>
  );
}

export function PencilIcon({ size = 16, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16l.9-3.4 7.7-7.7 2.5 2.5-7.7 7.7z" />
      <path d="M12.6 4.9l1.3-1.3 2.5 2.5-1.3 1.3" />
    </svg>
  );
}

export function CameraIcon({ size = 15, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.2A1.7 1.7 0 0 1 5.2 6.5h1.1l1-1.9h5.4l1 1.9h1.1a1.7 1.7 0 0 1 1.7 1.7v6a1.7 1.7 0 0 1-1.7 1.7H5.2a1.7 1.7 0 0 1-1.7-1.7z" />
      <circle cx="10" cy="11.2" r="2.6" />
    </svg>
  );
}

export function PhoneIcon({ size = 19, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.2 3.5c1 0 1.6 2.6 1.9 3.3.4 1-1 1.6-1 2.3 0 1.4 2.5 4 3.9 4 .7 0 1.3-1.4 2.3-1 .7.3 3.2.9 3.2 1.9 0 1.6-1.6 2.5-3 2.5-4.2 0-10.2-6-10.2-10.2 0-1.4.9-2.8 2.9-2.8z" />
    </svg>
  );
}

export function MailIcon({ size = 19, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="14" height="10" rx="2" />
      <path d="M3.6 6.2 10 11l6.4-4.8" />
    </svg>
  );
}

export function HistoryIcon({ size = 19, color = '#7A7A78' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="14" height="10" rx="2" />
      <path d="M7.5 6V4.6h5V6" />
    </svg>
  );
}

export function ShareIcon({ size = 19, color = '#7A7A78' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13V4M6.8 7 10 3.8 13.2 7" />
      <path d="M4.5 12.5V16h11v-3.5" />
    </svg>
  );
}

export function SupportIcon({ size = 19, color = '#7A7A78' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="6.8" />
      <path d="M8.2 8.2a1.9 1.9 0 1 1 2.6 1.8V12" />
      <circle cx="10" cy="14" r=".6" fill={color} stroke="none" />
    </svg>
  );
}

export function LogoutIcon({ size = 19, color = '#7A7A78' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 5H5v10h7.5M9 10h7M13.5 7.2 16.3 10l-2.8 2.8" />
    </svg>
  );
}

export function TrashIcon({ size = 19, color = '#B4342A' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 6h10.4M8 6V4.4h4V6M6.6 6l.7 10h5.4l.7-10" />
    </svg>
  );
}

export function BuildingIcon({ size = 18, color = '#7A7A78' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="3.5" width="8" height="13" rx="1.2" />
      <path d="M12.5 8.5H16v8H4.5" />
      <path d="M7 6.5h2M7 9.5h2M7 12.5h2" />
    </svg>
  );
}

export function InstagramIcon({ size = 19, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.5}>
      <rect x="3.2" y="3.2" width="13.6" height="13.6" rx="4.2" />
      <circle cx="10" cy="10" r="3.3" />
      <circle cx="14" cy="6" r=".9" fill={color} stroke="none" />
    </svg>
  );
}

export function TelegramIcon({ size = 19, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 4 3.4 9.5l3.9 1.3L15.5 6l-7 6.6.2 3.6 2.1-2.3 3.1 2.3z" />
    </svg>
  );
}

export function TiktokIcon({ size = 19, color = '#111110' }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5v8.9a3.1 3.1 0 1 1-3.1-3.1" />
      <path d="M12 3.5c.3 2 1.7 3.3 3.6 3.5" />
    </svg>
  );
}

export const socialIcon = (id: string, size?: number, color?: string) => {
  if (id === 'instagram') return <InstagramIcon size={size} color={color} />;
  if (id === 'telegram') return <TelegramIcon size={size} color={color} />;
  return <TiktokIcon size={size} color={color} />;
};
