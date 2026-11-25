# 5 · Documents (quotes, SSSPs, site completion reports)

Client-facing. **Always Two Points Ltd branding.** All three types share one frame, so they look like a set.
Starter: `templates/document-a4.html`.

## The frame

```
┌─ A4 · 210 × 297 mm ──────────────────────────┐
│ ▓ COVER BAND (#14170f) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│  [Two Points logo, white, 56px]   Quote no.  │
│  Q U O T A T I O N  (rainbow, per letter)    │  Q014
│  Document title, 24px 800        Date        │
│  Client · address, 13px 65% white            │
├──────────┬──────────┬──────────┬─────────────┤
│ ROOF AREA│ ACCESS   │ CREW     │ TIME        │  metrics strip: 1px gaps, label 10.5px caps
│ 420 m²   │ Rope     │ 2 techs  │ 2 days      │
├──────────┴──────────┴──────────┴─────────────┤
│  SCOPE OF WORK                               │  blocks: 24px × 40px padding,
│  Body 13.5px / 1.65                          │  split by 1px lines
├──────────────────────────────────────────────┤
│  Line item ................... $2,890.00     │
│  grey detail                                 │
├──────────────────────────────────────────────┤
│  soft band: Subtotal · GST 15% · Total       │
│                                              │
│  footer: Two Points Ltd · … ── ▬ ── Page 1/1 │
└──────────────────────────────────────────────┘
```

| Part | Spec |
|---|---|
| Cover band | `--band`, 36px × 40px padding, logo left (white, 56px tall), details right-aligned |
| Document label | 11px, 0.18em letter-spacing, 700. **Rainbow, one colour per letter** (bright Alpenglow on the band) |
| Title | 24px, 800, −0.02em, max ~460px wide |
| Cover details (right) | label 10px caps, white 45%; value 14px 600 white |
| Metrics strip | up to 4 tiles: label 10.5px caps `--ink-3`, value 17px 700 |
| Section label | 11px, 700, uppercase, 0.12em, `--ink-2` |
| Body | 13.5px / 1.65 ink |
| Line items | title 14px 600, detail 12px grey, amount right-aligned, tabular, 1px line between |
| Totals | `--soft` band: Subtotal excl. GST, GST 15%, then **Total incl. GST** 17px 800 above a 2px line |
| Footer | 10.5px `--ink-3`: "Two Points Ltd · Christchurch · twopoints.co.nz", a short rainbow line, "Page N of N" |

## Per document

**Quote**
- Metrics: roof area, method of access, crew / man hours, time on site or requirements.
- An "Optional" add-on gets a soft rainbow-tint pill, and its total is shown separately.
- **Costs, margins and assumptions never print.** They live in Notes.

**SSSP & TA**
- The label is the document type.
- Work-type tags are soft white words over a thin rainbow underline. No boxes.
- Numbered sections ("1. Project details" …).
- Method-statement step numbers in **deep** rainbow shades.
- The Attending Crew box and method headings get a 3px vertical rainbow strip, not a lime border.
- Hazard register columns: Hazard | Initial risk | Controls | Hierarchy | Residual risk.
  - Risk ratings follow the Site Safe matrix (Very Low → Critical).
  - Risk is shown as a coloured word, never colour alone.
- The sign-off page prints the crew's real signatures.
- Aerial site map with its licence credit printed underneath ("© LINZ CC BY 4.0").

**Site completion report**
- Metrics: site/client, date of works, scope, crew.
- Photos: BEFORE / AFTER in two columns, 8px corners, label underneath. Extra titled sections ("Roof treatment") follow in their own sections.
- A completion summary in the crew's words, tidied.
- Title = the SSSP's project name.

## Making the PDF

Simple draws each A4 `.sheet` with **html2canvas** and puts the pictures into **jsPDF** (`utils/docPdf.js` in Simple). Rules learned the hard way:

- **No gradient text.** html2canvas can't draw it. Colour letters one at a time (`RainbowText` / `rainbowAt`).
- **Hairlines under 1px**: draw them as real vector lines in the PDF (Simple tags them `data-pdf-rainbow` and draws them at 0.12 mm). Otherwise a viewer shrinking the page makes them alternate thick/thin.
- Report PDFs are drawn at scale 1.5 to stay under Gmail's 25 MB limit when several go in one email.
- Load the PDF tools only when needed. They're big.
- Printing from Chrome also works for a one-off: Print → A4, margins None, **Background graphics on**.

> The old `pdf-standards.md` in Simple (lime `#9FCC2E` pills, Inter + Playfair, Puppeteer only) is **out of date**.
> This file replaces it.
