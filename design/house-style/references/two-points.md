# Two Points

Two Points Ltd is an industrial rope access business in New Zealand, led by an IRATA Level 3 Supervisor. Its website (twopoints.co.nz) is a sister site to Simple: the same house style, in Two Points' own "Alpenglow" colours.

## Identity

- **Name:** Two Points. In running text it is bold, in `tp-word`, with its full stop: "Two Points." Not in every sentence; use "we" or "the team" in between.
- **Tagline:** Because ladders only go so far.
- **Logo:** the mountains over "TWO POINTS / ROPE ACCESS". Files in `assets/Logos`. **Never alter, redraw or "improve" it** unless the owner asks. Use the original files, resized.
- **Mountains on their own** (`two-points-mountains-*.png`) are cut from the original logo. Use them in the app icon and email icon.
- **App icon:** dark squircle, Alpenglow ring, the original white mountains (`two-points-icon.svg`).

## Alpenglow

| Gradient | Where |
|---|---|
| `tp-alpenglow` (45°) | Small dots: list bullets, the "Coming soon" dot, a lit step |
| `tp-alpenglow-line` (90°) | The 3px rule under the top band, the photo-reveal edge, the job-steps line, the email rule |
| `tp-word` | One rainbow word per heading, the name in running text, "View certificate" |
| `tp-ring` (135°) | The 1.5px ring on buttons, step rings, the app icon edge |
| `tp-dot` | The full stop after a heading and the name, and the "." in the email address |
| `tp-marker` | The highlighter behind key values |

Neutrals: `tp-ink` for text, `ink-2` for detail, `ink-3` for quiet heading halves, `line` hairlines, `tp-soft` for placeholders and soft panels.

## The website, top to bottom

1. **Top band:** sticky, `tp-head` tall, `band`, white logo left, nav right, a 3px `tp-alpenglow-line` along its bottom edge. On a phone the nav opens full screen with a contact card (phone, email, quote button) at the bottom and a Simple link, all fitting without scrolling on a 320×568 phone.
2. **Hero:** `tp-lead-in` "The number one rule of rope access:", then `tp-display` "**Two points**." with the full stop dropping in. A short paragraph and two ring buttons. Then a real job video in a `tp-radius-panel` frame (hard cuts of smooth footage only).
3. **Trust row:** four facts split by hairlines, each value with the highlighter sweep.
4. **Sections**, `tp-section-gap` apart, each with a two-tone heading: services (photo cards), why rope access (an animated building drawing), how a job runs (a five-step line), Simple (the one dark `GlowPanel`), projects, safety (badge, facts, the rescue-kit `DotList`), on site (photo strip), about (portrait and the owner's own words), contact (soft card with phone, email and form).
5. **Footer band:** logo, links, "Because ladders only go so far." and "Two Points Ltd." with its dot.

## Photos and video

- Real job photos and footage only. No AI imagery standing in for real work.
- Photos are `tp-radius-photo`, cropped with `object-fit: cover`, and arrive with the `PhotoReveal`.
- Product placeholders (the shop, coming soon) are flat ink silhouettes on `tp-soft`.

## Safety and claims

- Say what is planned and supervised: written safety plan, IRATA Level 3 supervision, rescue kit on every job, SiteWise Gold.
- Name real kit (Petzl, CMC, Climbing Technology) only when it is really used.
- Do not claim services or certificates not held today (for example anchor installation or certification).

## Accessibility notes

- `ink-3` (#8b9199) on white is about 3.2:1. Fine for the quiet half of a 30px+ heading; too faint for small text. Small labels use `ink-2`.
- `tp-word` starts light (`tp-deep-teal`, about 2:1 on white). Keep rainbow words bold and 24px or larger, and never the only way to read a key fact.
