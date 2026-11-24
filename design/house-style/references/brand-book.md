Professional, with a touch of flair. Mostly ink, grey and white. Colour is rare, and when it appears it means something.

This is the house style behind **Simple** (job software for trades) and **Two Points** (industrial rope access). Both brands are built from the same parts. Each brand has its own run of the rainbow and its own mark. Everything else is shared.

## Start here

- **New work for Simple or Two Points:** use that brand's rainbow (table below) and every other rule in this book.
- **A new brand:** keep every rule here. Give it its own four-stop rainbow and its own mark (see "Making a new brand").
- **More detail:** the sections after this one cover Two Points, Email, Websites, How we work and Credits.

## The brands

| | Simple | Two Points |
|---|---|---|
| What | Job software for trades | Industrial rope access, New Zealand |
| Rainbow | Lime to violet: `rainbow-lime` `rainbow-mint` `rainbow-sky` `rainbow-violet` | "Alpenglow", teal to pink: `tp-teal` `tp-blue` `tp-indigo` `tp-pink` |
| Lettering on white | `rainbow-deep` | `tp-word` |
| Thin lines | `rainbow-line` | `tp-alpenglow-line` |
| Button outline | `edge` (glow button) | `tp-ring` (ring button) |
| Mark | Dark squircle, ribbon S (`assets/Logos/simple-mark.svg`) | The mountains logo (`assets/Logos/two-points-*`) |
| Signs off with | "Simple." and a lime-to-violet full stop | "Two Points." and a violet-to-pink full stop (`tp-dot`) |
| Tagline | Keep it simple. | Because ladders only go so far. |

Shared by both: `band`, `page`, `ink`, `ink-2`, `ink-3`, `line`, Plus Jakarta Sans, the letterhead, rows, tags, motion and voice.

## The one rule

**Colour is rare and means something.** A page is `ink` on `page` with `ink-2` details. The rainbow is a small accent. Red and lime are states. If a screen looks colourful, take colour out.

| Colour | Means | Use |
|---|---|---|
| Rainbow | This is ours; you can press this | A thin `edge` or `tp-ring` on buttons, a short line, one bar, one rainbow word in a heading, the brand full stop |
| Red | Something is waiting on someone | `waiting-bg` + `waiting-ink` tags, `edge-alert` outline on a card, `danger` for a count |
| Lime / mint | Clear, done, money in, good news | `clear-bg` + `clear-ink` tags (Simple), `tp-tag-bg` + `tp-tag-ink` (Two Points) |
| Grey | A zero, or nothing to say | `ink-3` |

- Never use red as decoration.
- Never colour body text.
- Never a large rainbow fill. Not a hero background, not a full button.
- A zero is grey, not red or lime. Money is the exception: `$0` is a real figure.
- Red and lime always carry a word ("Waiting", "Clear"). Never colour alone.

## The letterhead

Start every email, document, summary page and website from this.

1. **Dark band at the top** (`band`). Logo top left. A small rainbow label or a 3px rainbow line along its bottom edge. A quiet detail top right, such as the date or a phone number. In an app or email, a two-line headline in `headline`: line 1 in `band-ink`, line 2 in `band-ink-2`.
2. **Plain page in between** (`page`). No cards inside cards. No tinted boxes. Sections are split by one `line` hairline and space.
3. **Dark band at the bottom.** Logo again, a thin divider, two short grey lines.

Inside the page:

- A section opens with a `label` (uppercase, `ink-2`). Its count sits right beside it.
- A row is a `row-title`, a `detail` line under it, and a `line` under the row.
- The row's tag and its arrow button sit on the right, on one centre line with the title.
- **Every arrow sits on the same right edge.** Tags right-align just left of it. Rows with nothing to open keep the empty column.
- Measure alignment. Two pixels out is visible.

## Headings

- Headings are 800 weight with tight tracking (-0.02em to -0.055em as they grow).
- A website heading has **two tones**: a plain statement in `ink`, then a quiet part in `ink-3` that ends in **one** rainbow word and the brand full stop. "Multiple trades. *One set of* **ropes**."
- In an app or email, the two-line headline does the same job: line 2 in the second ink.
- One rainbow word per heading at most. Some headings have none.

## Voice

- Short sentences. Plain words. Bullets over paragraphs.
- The headline says what matters: "3 things need you, / 3 emails are ready to send." Not "Good morning".
- Be specific: "Review St Andrew's College completion form", not "Review item".
- Name things the way the reader does. No system words.
- A button says what happens: "Approve & email client", "Get a free quote".
- Normal capitals for anything read as words. Uppercase with letter-spacing only for the small `label` and `tp-eyebrow` styles.
- Dates as people say them: "Tue, 3 Nov", "7 November 2026".
- No exclamation marks. No filler greetings.
- Claim only what is true today. Never claim a certificate, service or result the business does not hold.
- Never knock competitors or other trades. Say what we do well.
- New wording written for the owner is flagged until they confirm it.

## Type

One family: Plus Jakarta Sans (`sans`). Load weights 400, 500, 600, 700, 800 from Google Fonts. JetBrains Mono (`mono`) only for codes and references.

- `hero` (apps, covers) or `tp-display` (the Two Points website) once per page at most.
- `title` for an app page, `headline` on a band, `tp-section` for website sections.
- `row-title` over `detail` for every list.
- `figure` for big numbers, with tabular figures.
- `label` and `tp-eyebrow` for small labels only.
- Body is 400. Apps stay compact: no 34px page titles in an app. Websites may go big.

## Buttons and things you press

- **Simple** uses the **glow button**: `page` (light) or `button-dark` (dark) base, a 1.5px full-strength `edge` outline, a faint rainbow glow rising from the bottom, `ink` words.
- **Two Points** uses the **ring button**: a 48px pill, a solid fill (`tp-ink`, white, or dark green-black) and a 1.5px `tp-ring` outline.
- Never a filled rainbow. Labels are one line and never wrap.
- On a phone a button is a full pill (`radius-pill`). In a desktop app it is a rounded rectangle, 36px tall, `radius-btn`.
- Two buttons side by side: the second uses `edge-mirror` (Simple) or `.paper` (Two Points).
- A warning action uses `edge-alert` with red words.
- A row's "open" control is the round arrow button: 28px, 2px `ring`, the chevron **drawn** as an SVG. A typed › sits low in a circle.

## Cards and surfaces

- An app card has a clear `outline`, `radius-card`, `shadow-card`. Table heading bands are `soft` with `ink-2` lettering.
- A card with work waiting gets the `edge-alert` outline and a faint red glow from the bottom. Nothing else changes.
- Side-by-side partners are mirrored: the right-hand card or pill runs its edge the other way.
- One dark panel per screen at most: `band` or `band-base`, a soft rainbow glow (see `GlowPanel`).
- On a website, photo cards have no box at all: a rounded photo (`tp-radius-photo`), then the title and a grey line under it.
- A card under the pointer lifts 2px onto `shadow-lift`. A photo under the pointer zooms 3-4% inside its frame. Never an outer ring.

## Layout

- On a phone the app gutter is `space-3`, the website gutter `tp-gutter`. Top margin equals side margin.
- Top and bottom bars are docked bands with a hairline. The page scrolls between them.
- Buttons that belong together sit on one row.
- Prefer one row of small marks to a wall of tags.
- Fewer boxes, more white space, one accent per area.
- Repeated cards line up: buttons and labels pinned to the bottom so a row of them shares one baseline.

## Motion

- Motion only brings things in. Never fade a page out or blank it. Nothing holds the page or blocks reading.
- Each part plays once as it arrives: a short rise or drop (14-16px), parts arriving together staggered 80-120ms. Ease: `cubic-bezier(.32, .72, 0, 1)`.
- The brand full stop drops into place once, after the headline lands, then one ring ripples out. Body-text marks stay still.
- A sliding element (a tab underline, a switch knob) is ONE element that glides to its new place.
- Big figures count up. Key values can get the highlighter sweep (`Highlighter`).
- Photos arrive with the reveal (`PhotoReveal`), triggered by scrolling into view.
- Nothing loops except one slow, soft background glow per side on a dark panel, and a demonstration that fades back to rest before it repeats.
- Everything stops under "reduce motion".

## Icons and marks

- Line icons, 24px grid, 1.8 stroke, round caps, drawn into one shared box so a row of them sits level.
- Chevrons and arrows are drawn SVG, never typed characters.
- No emoji as decoration.
- A numbered step is a `Tile`: dark squircle (`radius-squircle`), thin rainbow edge, the number in rainbow. Use numbers only for a real sequence.
- An app icon is a dark squircle with a thin rainbow edge and the brand's mark in white or in its rainbow.
- **Never alter or redraw a brand's existing logo** unless its owner asks. Use the original files, resized. Concept options stay separate until the owner picks one.
- Pure vector marks. Never an SVG blur filter; iPhones draw it soft.

## Rainbow lettering

- On `band`: the bright line gradient (`rainbow-line`, `tp-alpenglow-line`).
- On `page`: the deep version (`rainbow-deep`, `tp-word`), so it reads on white. Use it at 24px and up, bold.
- One or two words only: a label, one word of a headline, the brand name.
- In an email or a PDF, rainbow lettering is a picture or per-letter colour. Mail apps and PDF makers do not draw gradient text.

## Making a new brand

1. Pick four stops that run one way round the colour wheel and glow on `band`. Bright versions for lines and dots on dark; a deeper version of each for lettering on white.
2. Make the full stop from the last two stops.
3. Make the mark. If the brand has a logo, use it as is. If not, draw a ribbon letter like Simple's S: dark squircle, thin rainbow edge.
4. Keep everything else: ink, grey and white, Plus Jakarta Sans, the letterhead, buttons, rows, motion and voice.
5. Add its tokens with a short prefix (as `tp-` is for Two Points) and a row to the brands table above.

## Classes

`components/bundle.css` carries the pieces.

- Simple: `.sl-btn` (`.mirror`, `.alert`, `.rect`), `.sl-go`, `.sl-tag` (`.waiting`, `.clear`), `.sl-row`, `.sl-label`, `.sl-band`, `.sl-card` (`.action`), `.sl-tile`, `.sl-cal`, `.sl-bar`, `.sl-rb`, `.sl-rbl`.
- Two Points: `.tp-btn` (`.ink`, `.paper`, `.dark`, `.small`), `.tp-rb`, `.tp-rbl`, `.tp-name`, `.tp-dot`, `.tp-quiet`, `.tp-h2`, `.tp-eyebrow`, `.tp-mk` (`.sweep`), `.tp-ph` (`.wait`, `.loaded`), `.tp-kit`, `.tp-glow` (`.alpenglow`).
- Set `data-theme="dark"` on the root for dark mode (apps). The Two Points website is light only.
