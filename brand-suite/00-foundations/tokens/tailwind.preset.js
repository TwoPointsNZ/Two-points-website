// Tailwind preset for Two Points + Simple. Load tokens.css first (it defines the variables),
// then: module.exports = { presets: [require('./tokens/tailwind.preset.js')], content: [...] }
// Colours point at CSS variables, so data-brand / data-theme switch them with no rebuild.
module.exports = {
  theme: {
    extend: {
      colors: {
        page: 'var(--page)', soft: 'var(--soft)', canvas: 'var(--canvas)',
        ink: { DEFAULT: 'var(--ink)', 2: 'var(--ink-2)', 3: 'var(--ink-3)' },
        line: 'var(--line)', outline: 'var(--outline)',
        band: { DEFAULT: 'var(--band)', 2: 'var(--band-2)', ink: 'var(--band-ink)', 'ink-2': 'var(--band-ink-2)' },
        waiting: { DEFAULT: 'var(--waiting-bg)', ink: 'var(--waiting-ink)' },
        clear: { DEFAULT: 'var(--clear-bg)', ink: 'var(--clear-ink)' },
        danger: 'var(--danger)',
        accent: { 1: 'var(--c1)', 2: 'var(--c2)', 3: 'var(--c3)', 4: 'var(--c4)' },
        deep: { 1: 'var(--d1)', 2: 'var(--d2)', 3: 'var(--d3)', 4: 'var(--d4)' },
      },
      backgroundImage: {
        rainbow: 'var(--rainbow)', 'rainbow-line': 'var(--rainbow-line)', 'rainbow-word': 'var(--rainbow-word)',
        ring: 'var(--ring)', marker: 'var(--marker)', tile: 'var(--tile)',
      },
      fontFamily: { sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'ui-monospace', 'monospace'] },
      borderRadius: { sm: '8px', btn: '10px', field: '12px', card: '14px', panel: '22px', hero: '30px', squircle: '27%' },
      boxShadow: { card: 'var(--shadow-card)', lift: 'var(--shadow-lift)', button: 'var(--shadow-button)' },
      transitionTimingFunction: { brand: 'cubic-bezier(.32,.72,0,1)' },
    },
  },
};
