import { useId } from 'react'

// The Simple mark (Joe, 17 Nov 2026 — the website's logo, now in both apps): a dark squircle with a thin rainbow
// edge holding the ribbon S (lime → mint on top, mint → sky → violet folding over it, Gmail-style deeper tone at the
// fold, bevelled leading edge). Pure vector — no blur filters (iPhones draw filtered SVG blurry).
// Copied from the Simple apps (components/SimpleMark.jsx). Master copy: logos/simple/simple-mark.svg.
export default function SimpleMark({ className = '', title }) {
  const p = 'sm' + useId().replace(/[^a-zA-Z0-9]/g, '') + '-'
  return (
    <svg className={className} viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <defs>
      <linearGradient id={p + 'ring'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8FD400"/><stop offset=".38" stopColor="#22C997"/><stop offset=".7" stopColor="#3A9BEA"/><stop offset="1" stopColor="#8B6CF0"/></linearGradient>
      <linearGradient id={p + 'bg'} x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stopColor="#272c23"/><stop offset="1" stopColor="#111410"/></linearGradient>
      <radialGradient id={p + 'glow'} cx="0" cy="1" r="1"><stop offset="0" stopColor="#3EE6B0" stopOpacity=".2"/><stop offset=".6" stopColor="#3EE6B0" stopOpacity="0"/></radialGradient>
      <linearGradient id={p + 's1'} x1="41" y1="15" x2="20" y2="32" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2FD9A4"/><stop offset="1" stopColor="#9BE000"/></linearGradient>
      <linearGradient id={p + 's2'} x1="34" y1="32" x2="22" y2="50" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1FCB98"/><stop offset=".5" stopColor="#3FA9F5"/><stop offset="1" stopColor="#9B7CF6"/></linearGradient>
      <linearGradient id={p + 'fold'} x1="28" y1="32" x2="37" y2="36" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#0B7F6E" stopOpacity=".75"/><stop offset="1" stopColor="#0B7F6E" stopOpacity="0"/></linearGradient>
      <radialGradient id={p + 'edgeLit'} cx="29.4" cy="32.4" r="4.3" gradientUnits="userSpaceOnUse"><stop offset=".5" stopColor="#fff" stopOpacity="0"/><stop offset=".85" stopColor="#fff" stopOpacity=".22"/><stop offset=".95" stopColor="#fff" stopOpacity=".34"/><stop offset="1" stopColor="#fff" stopOpacity=".2"/></radialGradient><radialGradient id={p + 'edgeShade'} cx="29.4" cy="32.4" r="5.3" gradientUnits="userSpaceOnUse"><stop offset=".8" stopColor="#03211d" stopOpacity=".5"/><stop offset=".88" stopColor="#03211d" stopOpacity=".2"/><stop offset="1" stopColor="#03211d" stopOpacity="0"/></radialGradient><linearGradient id={p + 'edgeFade'} x1="31.2" y1="28.2" x2="27.6" y2="35.8" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fff"/><stop offset=".5" stopColor="#777"/><stop offset="1" stopColor="#000"/></linearGradient><mask id={p + 'edgeMask'} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill={`url(#${p}edgeFade)`}/></mask><linearGradient id={p + 'backHalf'} x1="31.4" y1="33" x2="27" y2="31.7" gradientUnits="userSpaceOnUse"><stop offset=".2" stopColor="#000"/><stop offset=".8" stopColor="#fff"/></linearGradient><mask id={p + 'backMask'} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill={`url(#${p}backHalf)`}/></mask>
      </defs>
      <rect x="1.4" y="1.4" width="61.2" height="61.2" rx="17" fill={`url(#${p}bg)`} stroke={`url(#${p}ring)`} strokeWidth="2.8"/>
      <rect x="2.8" y="2.8" width="58.4" height="58.4" rx="15.6" fill={`url(#${p}glow)`}/>
      <g transform="translate(1.8 -.6)">
      <path d="M41 20.5 C37.5 16.8 32.5 15.6 28 16.3 C22.3 17.2 19.6 21.6 20.8 25.8 C21.9 29.6 26 31.4 30 32.6" fill="none" stroke={`url(#${p}s1)`} strokeWidth="8.6" strokeLinecap="round"/>
      <circle cx="29.4" cy="32.4" r="5.3" fill={`url(#${p}edgeShade)`} mask={`url(#${p}backMask)`}/>
      <path d="M29.4 32.4 C34 33.8 38.6 35.6 39.6 39.8 C40.8 44.8 36.6 49 30.6 49.2 C26 49.4 21.8 47.6 19 44.6" fill="none" stroke={`url(#${p}s2)`} strokeWidth="8.6" strokeLinecap="round"/>
      <path d="M29.4 32.4 C33 33.5 35.6 34.4 37.4 35.6" fill="none" stroke={`url(#${p}fold)`} strokeWidth="8.6" strokeLinecap="round"/>
      <g mask={`url(#${p}edgeMask)`}><circle cx="29.4" cy="32.4" r="4.3" fill={`url(#${p}edgeLit)`} mask={`url(#${p}backMask)`}/></g>
      </g>
    </svg>
  )
}
