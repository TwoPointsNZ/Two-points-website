// Two Points design tokens as a JS module (same values as tokens.json / tokens.css).
export const tokens = {
 "name": "Two Points design tokens",
 "version": "1.0 (24 Nov 2026)",
 "brands": {
  "two-points": {
   "use": "Two Points Ltd: website, quotes, SSSPs, site reports, client emails, client pages",
   "accent": {
    "name": "Alpenglow",
    "bright": [
     "#14E0B4",
     "#1FA9FF",
     "#6A5CFF",
     "#F15BB5"
    ],
    "deep": [
     "#0FC9A0",
     "#1893E8",
     "#5647EE",
     "#DC47A0"
    ],
    "stops": [
     0,
     0.38,
     0.7,
     1
    ]
   },
   "dot": [
    "#8B6CF0",
    "#DC47A0"
   ],
   "clear": {
    "bg": "#d6f7ee",
    "ink": "#0b6b55"
   },
   "focus": "#1893E8"
  },
  "simple": {
   "use": "The software: Simple Office (desk) + Simple Field (phones), Simple emails, the Simple website",
   "accent": {
    "name": "Simple rainbow",
    "bright": [
     "#AAEE00",
     "#3EE6B0",
     "#4FB4FF",
     "#A78BFA"
    ],
    "ring": [
     "#8FD400",
     "#22C997",
     "#3A9BEA",
     "#8B6CF0"
    ],
    "edge": [
     "#9BE000",
     "#2FD9A4",
     "#3FA9F5",
     "#9B7CF6"
    ],
    "deep": [
     "#629600",
     "#0E9670",
     "#1C74CE",
     "#7658DE"
    ],
    "stops": [
     0,
     0.38,
     0.7,
     1
    ]
   },
   "dot": [
    "#AAEE00",
    "#3EE6B0",
    "#4FB4FF",
    "#A78BFA"
   ],
   "clear": {
    "bg": "#e6f6c8",
    "ink": "#3f6b00"
   },
   "focus": "#3A9BEA"
  }
 },
 "neutral": {
  "light": {
   "page": "#ffffff",
   "soft": "#f4f4f0",
   "canvas": "#f4f5f3",
   "ink": "#15171a",
   "ink-2": "#555b63",
   "ink-3": "#8b9199",
   "line": "#e2e5e8",
   "outline": "#d6d2c8",
   "band": "#14170f",
   "band-2": "#1d211a",
   "band-ink": "#f2f4ef",
   "band-ink-2": "#a2a99d",
   "band-line": "rgba(255,255,255,.13)"
  },
  "dark": {
   "page": "#171c13",
   "soft": "#2a3128",
   "canvas": "#101309",
   "ink": "#edefe9",
   "ink-2": "#a8aea4",
   "ink-3": "#757b71",
   "line": "#313830",
   "outline": "rgba(255,255,255,.14)",
   "band": "#0b0e08",
   "band-2": "#1d211a",
   "band-ink": "#f2f4ef",
   "band-ink-2": "#a2a99d",
   "band-line": "rgba(255,255,255,.13)"
  }
 },
 "status": {
  "waiting": {
   "bg": "#fde7e7",
   "ink": "#b42318",
   "meaning": "something is owed: waiting, overdue, ready to send"
  },
  "clear": {
   "meaning": "done, all clear, money in - colour comes from the brand"
  },
  "danger": "#d6452f",
  "alert-edge": [
   "#C81E4A",
   "#E5383B",
   "#FF6B4A",
   "#FF9F43"
  ]
 },
 "font": {
  "sans": "Plus Jakarta Sans (400-800)",
  "mono": "JetBrains Mono (500, 700) - references, numbers in tables",
  "fallback": "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
 },
 "type": [
  {
   "name": "display",
   "size": "clamp(60px, 16vw, 172px)",
   "weight": 800,
   "lineHeight": 0.98,
   "tracking": "-0.055em",
   "use": "website hero word, once per page"
  },
  {
   "name": "h1",
   "size": "clamp(44px, 8.6vw, 112px)",
   "weight": 800,
   "lineHeight": 0.96,
   "tracking": "-0.05em",
   "use": "website page title"
  },
  {
   "name": "h2",
   "size": "clamp(30px, 4.6vw, 50px)",
   "weight": 800,
   "lineHeight": 1.04,
   "tracking": "-0.03em",
   "use": "website section heading"
  },
  {
   "name": "headline",
   "size": "28px",
   "weight": 800,
   "lineHeight": 1.15,
   "tracking": "-0.02em",
   "use": "letterhead two-line headline (emails, summaries)"
  },
  {
   "name": "doc-title",
   "size": "24px",
   "weight": 800,
   "lineHeight": 1.2,
   "tracking": "-0.02em",
   "use": "document cover title"
  },
  {
   "name": "app-title",
   "size": "22px",
   "weight": 800,
   "lineHeight": 1.2,
   "tracking": "-0.02em",
   "use": "app page title"
  },
  {
   "name": "card-title",
   "size": "19-21px",
   "weight": 800,
   "lineHeight": 1.2,
   "use": "website card title"
  },
  {
   "name": "row-title",
   "size": "15px",
   "weight": 700,
   "lineHeight": 1.35,
   "use": "row + card titles in apps, emails, documents"
  },
  {
   "name": "body",
   "size": "15-16px",
   "weight": 400,
   "lineHeight": 1.55,
   "use": "running text"
  },
  {
   "name": "detail",
   "size": "13px",
   "weight": 400,
   "lineHeight": 1.45,
   "use": "grey line under a title"
  },
  {
   "name": "label",
   "size": "11px",
   "weight": 700,
   "tracking": "0.14-0.18em",
   "case": "UPPERCASE",
   "use": "small section labels, eyebrows"
  },
  {
   "name": "figure",
   "size": "28px",
   "weight": 800,
   "tracking": "-0.03em",
   "numbers": "tabular-nums",
   "use": "big numbers"
  }
 ],
 "space": {
  "1": "4px",
  "2": "8px",
  "3": "14px",
  "4": "18px",
  "5": "24px",
  "6": "28px",
  "7": "48px",
  "8": "104px"
 },
 "radius": {
  "sm": "8px",
  "btn": "10px",
  "field": "12px",
  "card": "14px",
  "panel": "22px",
  "hero": "30px",
  "squircle": "27%",
  "pill": "999px"
 },
 "motion": {
  "ease": "cubic-bezier(.32,.72,0,1)",
  "press": "cubic-bezier(.2,.8,.2,1)",
  "quick": "180ms",
  "fold": "550ms",
  "rule": "motion brings things IN, plays once, respects prefers-reduced-motion"
 }
};

// rainbowAt(t, brand): the accent colour at 0..1 along the run. Use it to colour letters one by one
// (PDF makers like html2canvas cannot draw gradient-filled text, but copy coloured letters exactly).
export function rainbowAt(t, brand = 'two-points', shade = 'deep') {
  const run = tokens.brands[brand].accent;
  const cols = (run[shade] || run.bright).map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));
  const stops = run.stops, x = Math.min(1, Math.max(0, t));
  let i = 0; while (i < stops.length - 2 && x > stops[i + 1]) i++;
  const k = (x - stops[i]) / (stops[i + 1] - stops[i] || 1);
  return `rgb(${cols[i].map((v, j) => Math.round(v + (cols[i + 1][j] - v) * k)).join(',')})`;
}

export default tokens;
