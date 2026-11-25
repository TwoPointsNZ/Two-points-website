> **Part of the Two Points brand suite.** This folder is the two original packs joined into one: the design package (this file, `docs/`, `tokens/`, `css/`, `templates/`, `components/`) and the Claude skill (`skill/house-style/`). All logos are in `logos/`. Print, van, social and site rules are in `docs/10-print-and-vehicle.md`. `RULES-FOR-CLAUDE.md` is the package's old `CLAUDE.md`.

# Two Points design package

One design for everything Two Points makes: the **website**, **client documents** (quotes, SSSPs, site reports), **emails**, and the **Simple** apps.
Drop this folder into any project and you get the same look.

**Version 1.0 · 24 Nov 2026.** Values are copied from the live website, documents, emails and apps.

## Start here

1. **Open `preview.html`** in a browser. It shows every colour, type size and component, and has a Two Points / Simple switch.
2. Read the **10 rules** below.
3. Copy what you need into your project (see *Using it*).

## The 10 rules

1. **Two Points Ltd on anything a client sees.** That means the mountain logo. Never the Simple logo on a client document.
2. **The letterhead:** a dark band top and bottom, a plain white page between.
3. **Colour is rare and means something.** Mostly ink, grey and white. The rainbow only as small accents.
4. **Two accent runs:**
   - **Alpenglow** for Two Points (teal → blue → indigo → pink);
   - the **Simple rainbow** for the software (lime → mint → sky → violet).
   - Never both in one view.
5. **Red only means "something is owed".** Done = a soft green tint. A zero is grey.
6. **Plus Jakarta Sans** for everything. JetBrains Mono only for references.
7. **Things you press wear a ring:** pills with a thin rainbow outline. › arrows are 28px ringed circles, all on one right edge.
8. **Lines and space, not boxes.** No cards inside cards. No shadows on emails or documents.
9. **Motion plays once and only brings things in.** One easing curve. Respect reduced motion. No blur filters.
10. **Plain words.** The headline says what matters. Short sentences. NZ English.

## What's inside

```
two-points-design/
├── README.md              ← you are here
├── CLAUDE.md              ← copy into another project's root, so Claude follows this design
├── preview.html           ← open me: the whole system on one page
├── docs/
│   ├── 01-brands-and-logos.md   two names, one family; which logo where
│   ├── 02-colour.md             neutrals, the two runs, status colours, where colour is allowed
│   ├── 03-type-and-layout.md    fonts, scale, the letterhead, spacing, corners, shadows
│   ├── 04-components.md         buttons, arrows, tags, rows, cards, tiles, forms
│   ├── 05-documents.md          quotes / SSSPs / site reports, and making the PDF
│   ├── 06-emails.md             the email letterhead + Gmail dark-mode rules
│   ├── 07-website-and-motion.md website structure and animation
│   ├── 08-apps.md               Simple Office + Simple Field specifics
│   ├── 09-voice.md              how the words sound
│   └── decisions.md             where things don't match yet (needs Joe's call)
├── tokens/
│   ├── tokens.css         ← CSS variables: both brands, light + dark
│   ├── tokens.json        same values for tools / other languages
│   ├── tokens.js          same values as a JS module + rainbowAt()
│   └── tailwind.preset.js for Tailwind projects
├── css/two-points.css     ← ready-made components (classes start with tp-)
├── components/react/      TwoPointsMark, SimpleMark, RainbowText, Letterhead (+ Section, Row, ArrowButton), Chev
├── templates/
│   ├── web-page.html            website starter
│   ├── document-a4.html         A4 quote (the frame for SSSPs + reports too)
│   ├── email.html               Gmail-safe client email
│   └── summary-letterhead.html  the Morning Update look
└── logos/
    ├── two-points/        logos, wordmarks, app tile (original artwork, only resized)
    └── simple/            the S mark, the ribbon S, Windows icon
```

## Using it

**Plain HTML / any framework**
```html
<link rel="stylesheet" href="two-points-design/tokens/tokens.css">
<link rel="stylesheet" href="two-points-design/css/two-points.css">
<body class="tp">                       <!-- Two Points (default) -->
<html data-brand="simple">              <!-- or Simple -->
<html data-brand="simple" data-theme="dark">   <!-- Simple, dark mode -->
```

**React:** copy `components/react/` and import from it, e.g. `import { Letterhead, Section, Row } from './Letterhead.jsx'`.

**Tailwind:** load `tokens.css` once, then `presets: [require('./two-points-design/tokens/tailwind.preset.js')]`. You get `bg-band`, `text-ink-2`, `bg-rainbow-line`, `rounded-squircle` and more.

**With Claude Code:** copy `CLAUDE.md` into the new project's root (or paste it into the existing one). Claude will then read these docs before building anything.

## Keeping it in step

- This package is a **copy**. The live sources are:
  - Simple's `src/styles.css` and `.claude/skills/simple-ui/SKILL.md`;
  - the Two Points website's `assets/css/styles.css`;
  - the email builders (`supabase/functions/automation/clientEmail.ts`, `letterhead.ts`).
- When the house design changes in a way Joe keeps, update this package too, and bump the version above.
- The **Simple Design Language** artifact (claude.ai) covers the Simple side in more depth.
