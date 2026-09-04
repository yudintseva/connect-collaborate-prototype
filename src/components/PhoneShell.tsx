import type { ReactNode } from 'react';

export default function PhoneShell({
  children,
  white = false,
}: {
  children: ReactNode;
  white?: boolean;
}) {
  return (
    <div className="app-outer">
      <div className="phone" style={{ background: white ? '#fff' : undefined, position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}
