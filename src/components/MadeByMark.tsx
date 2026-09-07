// Stylized recreation of the MadeBy mark: a bold, rounded gradient "fist"
// glyph with a phone accent, on a white rounded-square tile.
export default function MadeByMark({ size = 126, radius = 30 }: { size?: number; radius?: number }) {
  const gid = 'madeby-grad';
  return (
    <svg width={size} height={size} viewBox="0 0 126 126" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="8%" y1="0%" x2="98%" y2="100%">
          <stop offset="0%" stopColor="#4C7CFF" />
          <stop offset="40%" stopColor="#1633A6" />
          <stop offset="75%" stopColor="#0A1440" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      <rect width="126" height="126" rx={radius} fill="#fff" />
      <g fill={`url(#${gid})`}>
        {/* palm / base */}
        <path d="M32,58 C32,42 42,32 55,32 C64,32 71,37 74,45
                  C82,46 88,53 88,63
                  C88,80 90,96 74,102
                  C58,108 38,104 33,88
                  C26,86 24,76 28,68
                  C29,64 30,61 32,58 Z" />
        {/* thumb */}
        <path d="M28,68 C20,66 16,72 18,80 C20,88 28,90 33,88 C30,82 28,75 28,68 Z" />
        {/* knuckle bumps */}
        <ellipse cx="46" cy="34" rx="9" ry="12" />
        <ellipse cx="62" cy="31" rx="9.5" ry="13" />
        <ellipse cx="78" cy="35" rx="9" ry="12" />
        <ellipse cx="91" cy="44" rx="7.5" ry="10" />
      </g>
      {/* phone accent */}
      <rect x="55" y="16" width="17" height="27" rx="4.5" fill={`url(#${gid})`} stroke="#fff" strokeWidth="2.5" />
      <rect x="59" y="21" width="9" height="14.5" rx="1.6" fill="#fff" opacity="0.9" />
      <rect x="61.5" y="37.5" width="4" height="1.6" rx="0.8" fill="#fff" opacity="0.9" />
    </svg>
  );
}
