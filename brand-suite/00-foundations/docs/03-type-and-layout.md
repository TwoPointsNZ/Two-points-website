# 3 · Type and layout

## Fonts

- **Plus Jakarta Sans:** everything, weights 400 / 500 / 600 / 700 / 800.
  - No second display face. Headings are just heavy Jakarta with tight letter-spacing.
- **JetBrains Mono 500 / 700:** references and codes only (Q014, JC013, a phone number in a table).
- Load both from Google Fonts (the `@import` at the top of `tokens.css`). In an email, fall back to `Segoe UI, Roboto, Helvetica, Arial`.
- Numbers in columns get `font-variant-numeric: tabular-nums` (class `.tp-num`).

## Type scale

| Name | Size | Weight | Spacing | Where |
|---|---|---|---|---|
| Display | `clamp(60px, 16vw, 172px)` / line 0.98 | 800 | −0.055em | The website hero word. Once per page. |
| Page title (web) | `clamp(44px, 8.6vw, 112px)` / 0.96 | 800 | −0.05em | Website inner pages |
| Section heading (web) | `clamp(30px, 4.6vw, 50px)` / 1.04 | 800 | −0.03em | Website sections |
| Headline | 28px / 1.15 | 800 | −0.02em | The letterhead's two-line headline |
| Document title | 24px / 1.2 | 800 | −0.02em | Quote / report cover |
| App title | 22px / 1.2 | 800 | −0.02em | App page titles |
| Card title | 19–21px / 1.2 | 800 | | Website cards |
| Row title | 15px / 1.35 | 700 | | Rows + cards in apps, emails, documents |
| Body | 15–16px / 1.55–1.6 | 400 | | Running text |
| Lead | 18–22px / 1.45 | 500 | −0.015em | Website intro paragraph, `--ink-2` with **bold ink** for the key phrase |
| Detail | 13px / 1.45 | 400 | | The grey line under a title |
| Label | 11px | 700–800 | 0.14–0.18em, UPPERCASE | Section labels, eyebrows, field labels on documents |
| Figure | 28px / 1 | 800 | −0.03em | Big numbers, tabular |

**Headlines say what matters.**
- Good: "3 things need you, / 2 emails are ready to send."
- Not filler like "Good morning, Joe".
- Two lines: line 1 in ink, line 2 in grey.

**Capitals:**
- Normal capitals for anything you read as words: "Morning Update", "Site completion report".
- UPPERCASE + letter-spacing only for small labels.

## The letterhead (the house layout)

```
┌──────────────────────────────────────────┐
│ ▓▓ DARK BAND ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  logo · detail top-right
│   rainbow label                          │
│   Headline line one,                     │  white
│   line two in grey.                      │  grey
├──────────────────────────────────────────┤
│                                          │
│   SECTION LABEL  [3]                     │  plain white page:
│   Row title ................ [tag]  (›)  │  no cards in cards,
│   grey detail                            │  no shadows, no tinted boxes,
│   ────────────────────────────────────   │  1px lines + space
│   Row title ................ [tag]  (›)  │
│                                          │
├──────────────────────────────────────────┤
│ ▓▓ DARK BAND ▓  logo │ two grey lines    │
└──────────────────────────────────────────┘
```

**Used by:** every email, every document (as cover band + footer), the website (slim sticky band + footer band), client pages, summaries.

**Inside the white page:**
- Sections are split by one `--line` and 22–26px of space.
- A section label has its count right beside it, not at the far right.
- Rows have a bold title, a grey detail under it, and a 1px line between rows.
- Status and the › arrow sit on the right, on ONE centre line with the title.
- **Every › arrow sits on the same right edge.** Tags right-align just left of that column. A row with nothing to open keeps the empty column, so the edges still line up.
- **Measure alignment** with `getBoundingClientRect`, not by eye. Joe spots 2px.

## Spacing

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Icon to its word |
| `--space-2` | 8px | Buttons in a group, inside tags |
| `--space-3` | 14px | Phone page gutter. **Top margin = side margin.** |
| `--space-4` | 18px | Row padding, card padding |
| `--space-5` | 24px | Between sections on a letterhead |
| `--space-6` | 28px | Under a page header |
| `--space-7` | 48px | Between big blocks |
| `--space-8` | 104px | Between website sections |

Website content is max **1120px** wide (1240 from 1440px screens, 1340 from 1720px), with 20px side padding.

## Corners

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 8px | Photos in documents, small buttons in cards |
| `--radius-btn` | 10px | Desk app buttons (rounded rectangles) |
| `--radius-field` | 12px | Inputs |
| `--radius-card` | 14px | App cards |
| `--radius-panel` | 22px | Website photos, product shots |
| `--radius-hero` | 30px | Website feature panels, the hero film, the contact card |
| `--radius-squircle` | 27% | Logo tiles, numbered step tiles |
| `--radius-pill` | 999px | Website + phone buttons, tags, round arrows |
| (letterhead) | 10px | Outer corners of an email / summary |

## Shadows

- **Cards:** `--shadow-card` at rest. On hover: lift 2px onto `--shadow-lift`.
- **Never an outer ring** on hover. Rings get clipped by any parent with `overflow:hidden`.
- **Emails and documents use no shadows.**
- **The sticky website band** gets `--shadow-band` once the page scrolls under it.

## Phones

- 14px gutter. The first card starts 14px under the header, the same as the side margin.
- One column. Label-left rows for details.
- Short names where space is tight (Quote · SSSP · Report · Invoice).
- Tap targets are at least 44px. Pad links to get there, but never let that padding reach a button or the logo (it broke both once).
