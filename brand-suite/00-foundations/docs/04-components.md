# 4 · Components

All classes live in `css/two-points.css`, prefixed `tp-`. React versions are in `components/react/`.
Open `preview.html` to see every one in both brands.

## Buttons: "things you press wear a ring"

| Class | Look | Use |
|---|---|---|
| `.tp-btn` | Ink pill, white words, thin rainbow ring, soft drop shadow | The main action. One per view. |
| `.tp-btn.paper` | White pill, ink words, rainbow ring | The second action beside it |
| `.tp-btn.mirror` | White pill, ring runs the other way | The partner in a pair (+ New SSSP beside + New report), so they read as a set |
| `.tp-btn.dark` | Charcoal pill on the dark band | Buttons inside the band (website header "Get a quote") |
| `.tp-btn.alert` | White pill, red-gradient ring, red words | Incident / urgent actions |
| `.small` | 38px tall | Header buttons |
| `.rect` | 36px, 10px corners | Dense desk screens (Simple Office) |

- 48px tall by default, 24px side padding, bold 15.5px, never wrapping.
- Hover: lift 1px. Press: shrink to 98%.
- **Website + phones = pills. Desk app = rounded rectangles.** Don't mix the two in one screen.

## The round arrow: `.tp-go` / `<ArrowButton>`

- 28px circle with an even 2px rainbow ring, a white centre and a drawn chevron (`Chev.jsx`).
- **Never a typed ›.** It sits low and off-centre in a circle.
- One column, every arrow on the same right edge.

## Tags: `.tp-tag`

24px pill, bold 12px, soft tint with dark words:

- `.waiting`: red tint, for owed, overdue, or ready to send.
- `.clear`: brand tint, for done or clear.
- Plain: grey, for neutral info.
- `.soon`: adds a small rainbow dot, for "Coming soon".

One line only. Give its column room so it never wraps.

## Labels and counts

- `.tp-eyebrow`: 11.5px, 800 weight, wide letter-spacing, grey. Goes above a website heading.
- `.tp-label`: 11px, 700 weight, uppercase, `--ink-2`. The section label in a letterhead.
- `.tp-count`: a solid red pill with a white figure, **right beside** its label. Only for things owed.

## Rows: `.tp-rows` > `.tp-row`

```html
<a class="tp-row" href="…">
  <div><b>Send 2 site reports</b><span>Washco · St Andrew's College</span></div>
  <span class="tp-tag waiting">2 ready</span>
  <span class="tp-go">…chevron…</span>
</a>
```

- Grid of three columns: text | tag | 28px arrow column.
- 18px top/bottom padding and a 1px line under each row.
- React: `<Row title detail tag tone onOpen|href />` in `Letterhead.jsx`.

## Cards: `.tp-card` (apps only)

- White, `--outline` edge, 14px corners, soft shadow. Hover lifts 2px.
- `.action` = red-gradient outline, for "something's waiting here".
- **Emails, documents and the website don't use cards.** They use lines and space. The website uses photos and soft panels (`.tp-panel`) instead.
- Big figure: `.tp-fig`. Add `.zero` (grey) or `.owed` (red).

## The letterhead: `.tp-letterhead`

- Structure: `.tp-band` (top) → `.tp-sheet` (white) → `.tp-band.foot`.
- Inside the top band: `.tp-band-top` (logo + date), `.tp-rbl` (rainbow label), `.tp-headline` with an `<i>` for the grey second line.
- React: `<Letterhead logo label date headline={[a, b]} foot={[…]}>` with `<Section>` and `<Row>`.
- Website version: `.tp-topband` (sticky, 68px, 3px rainbow underline, `.scrolled` adds the shadow) + `.tp-bar`.

## Tiles

- `.tp-tile`: the squircle (dark fill, rainbow ring, soft glow) with a number in rainbow lettering. Used for numbered steps (1–6). A sibling of the logo tiles.
- `.tp-cal`: a date block. 52px dark tile, big day, small month, 3px rainbow top edge.
- `.tp-progress`: a 6px track with one rainbow fill. One per view.

## Forms: `.tp-field`

- Label: bold 12.5px, `--ink-2`. Input: 16px (so iPhones don't zoom), 12px corners, 1px `#d3d7d2` edge.
- Focus: blue edge plus a soft 4px blue halo. Error: `.bad`, a red edge plus a plain-English message.
- Two fields side by side: the grid's `gap` is the spacing. Cancel any stacking margin, or the right field sits low.

## Photos: `.tp-photo`

- 22px corners and a `--soft` placeholder while loading. The photo zooms 3.5% on hover.
- In documents: 8px corners. The label goes below the photo (BEFORE / AFTER, 11px uppercase grey).

## Lettering helpers

- `.tp-rb`: rainbow words on white (deep shades). For one phrase in a headline.
- `.tp-rbl`: rainbow words on the dark band (bright shades).
- `.tp-dot`: the brand full stop.
- `.tp-mark`: a soft highlighter behind a few words.
- `<RainbowText text brand shade />`: colours **one letter at a time**. Use it wherever gradient text can't work: PDFs drawn with html2canvas, and images for emails.
