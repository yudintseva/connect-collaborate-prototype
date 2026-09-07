// Stylized recreation of the MadeBy mark: a gradient "grip" glyph with a
// small phone accent, on a white rounded-square tile.
export default function MadeByMark({ size = 126, radius = 30 }: { size?: number; radius?: number }) {
  const gid = 'madeby-grad';
  return (
    <svg width={size} height={size} viewBox="0 0 126 126" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="10%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stopColor="#3B6BF2" />
          <stop offset="45%" stopColor="#1633A6" />
          <stop offset="100%" stopColor="#050914" />
        </linearGradient>
      </defs>
      <rect width="126" height="126" rx={radius} fill="#fff" />
      <g transform="translate(63,66)">
        <path
          d="M-24,-8
             C-24,-24 -12,-34 0,-34
             C13,-34 24,-24 25,-9
             C29,-8 32,-4 32,4
             C32,16 24,30 8,32
             C-8,34 -22,26 -26,12
             C-30,10 -31,2 -28,-2
             C-27,-5 -26,-7 -24,-8 Z"
          fill={`url(#${gid})`}
        />
        <rect x="-6" y="-46" width="16" height="26" rx="4" fill={`url(#${gid})`} stroke="#fff" strokeWidth="2" />
        <rect x="-2.5" y="-42" width="9" height="14" rx="1.5" fill="#fff" opacity="0.85" />
      </g>
    </svg>
  );
}
