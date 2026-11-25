# 1 · Brands and logos

## Two names, one family

| | **Two Points Ltd** | **Simple** |
|---|---|---|
| What it is | The company. Rope access + exterior building maintenance, Christchurch. | The software Two Points runs on. Simple Office (desk) + Simple Field (phones). |
| Where it shows | Website (twopoints.co.nz), quotes, SSSPs, site completion reports, client emails, client pages, the "Accept this quote" page | The two apps, Simple's own emails (Morning Update, Job check-in, invite, password reset), keepitsimple.co.nz |
| Logo | The mountain + "TWO POINTS / ROPE ACCESS" | The ribbon S in a dark squircle, + "Simple." |
| Accent run | **Alpenglow**: teal → blue → indigo → pink | **Simple rainbow**: lime → mint → sky → violet |
| Legal identity? | **Yes.** It's the trading name. | No. It's a product. |

**The one hard rule:** anything a client receives carries **Two Points Ltd** and the mountain logo.
Never put the Simple logo on a client document. Never swap logos on documents.

## What they share

Everything except the logo and the accent run:

- **Layout:** the letterhead (a dark band top and bottom, a plain white page between).
- **Colours:** the same neutrals (ink, greys, the green-black band).
- **Type:** Plus Jakarta Sans for everything, with JetBrains Mono for references.
- **Shapes:** the same squircle tile, ring buttons and soft tags.
- **Tone:** the same rule that colour is rare and means something.

That's why they read as one family.

```
           ┌──────────── shared ────────────┐
           │ letterhead · neutrals · type    │
           │ squircle tile · ring buttons    │
           │ colour is rare and meaningful   │
           └───────┬─────────────────┬───────┘
                   │                 │
        Two Points Ltd            Simple
        Alpenglow run             Simple rainbow
        mountain logo             ribbon S logo
```

## Logo files (`logos/`)

### Two Points (`logos/two-points/`)
| File | Use it for |
|---|---|
| `two-points-logo-white.png` | On the dark band: document covers, email header + footer. **The default.** |
| `two-points-logo-black.png` | On white paper when there's no band (has a white background). |
| `two-points-logo-full-ink.svg` / `-white.svg` | Mountain over "TWO POINTS" (no "ROPE ACCESS" line). Vector. |
| `two-points-wordmark-ink.svg` / `-white.svg` | "TWO POINTS / ROPE ACCESS" with no mountain. Website header + footer. |
| `two-points-mountain-ink.svg` | The mountain alone, line drawing. |
| `two-points-lockup.png` / `-dark.png` | Sticker-style lockups (merch, signage). |
| `two-points-icon.svg` + `-512.png` / `-180.png` | App-style tile: dark squircle, Alpenglow ring, Alpenglow mountain. Favicons, home-screen icons, social avatars. |

### Simple (`logos/simple/`)
| File | Use it for |
|---|---|
| `simple-mark.svg` | The S mark: dark squircle, thin rainbow ring, ribbon S. Favicons, app icons, app headers. |
| `simple-s.svg` | The ribbon S on its own (no tile). Large decorative use only. |
| `simple.ico` | Windows desktop shortcut icon. |

React versions: `components/react/TwoPointsMark.jsx` and `SimpleMark.jsx` (each copy uses its own gradient ids, so several can sit on one page).

## Logo rules

- **Never redraw or recolour** the Two Points artwork. These are the original files, only resized.
- **Clear space:** at least the height of the "O" in TWO all round.
- **Minimum size:** 24px tall on screen (footer), 56px on a document cover.
- **Backgrounds:** use the white logo on the band (`#14170f`) and the ink logo on white. Never put either on a photo without a dark scrim.
- **No effects:** no drop shadows, glows, outlines or blur filters. iPhones draw filtered SVGs blurry.
- **The two tiles are siblings.** Same squircle (27% corners), same 2.8/64 ring width and same dark fill. Only the glyph and the run change. Any new product mark follows that recipe.
- **The brand full stop:**
  - "Keep it simple." and "Simple." end in a small round dot in the brand's gradient (`.tp-dot`).
  - On the Two Points site the dot is violet → pink.
  - It is still a real full stop, so screen readers read it.
