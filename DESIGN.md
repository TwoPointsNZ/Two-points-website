# Design

The Two Points website uses the **Simple & Two Points House Style**: the same design language as Simple (Joe's job software), in Two Points' own "Alpenglow" colours.

## Where the design lives

| What | Where |
|---|---|
| Browsable design system with live previews | "Simple & Two Points House Style" artifact in Joe's Claude account |
| Portable copy (a Claude skill) | `design/house-style/` in this repo |
| The real values on this site | `:root` at the top of `assets/css/styles.css` |

To use it in a new project: upload `design/house-style` as a skill in Claude (Settings, Capabilities, Skills), or point Claude at the design system artifact.

## The look, in short

- **Colour is rare.** Ink on white, grey details. The rainbow is a thin line, a ring, one word, a dot.
- **Alpenglow:** `#14E0B4` → `#1FA9FF` → `#6A5CFF` → `#F15BB5`. Deeper version for lettering on white: `#0FC9A0` → `#1893E8` → `#5647EE` → `#DC47A0`.
- **Neutrals:** ink `#15171a`, grey `#555b63` and `#8b9199`, hairline `#e2e5e8`, soft fill `#f4f4f0`, dark band `#14170f`.
- **Type:** Plus Jakarta Sans, 400 to 800. Headings 800 with tight tracking.
- **Headings:** a statement in ink, a quiet part in grey, one rainbow word and a gradient full stop.
- **Buttons:** solid pills with a 1.5px Alpenglow ring.
- **Layout:** a slim dark band on top with a 3px rainbow line, a plain white page, a dark band at the bottom.
- **Motion:** arrives once, smooth, no bounce. Photos reveal as they scroll in. Everything stops under reduced motion.
- **Photos:** real job photos and footage only.

## Rules for changes

- Never alter or redraw the logo. Use the original files.
- No AI imagery on the home page. No digs at other trades.
- Claim only certificates and services held today.
- After changing `styles.css` or `main.js`, refresh the `?v=` number on every page (see README).
- Test phone and desktop, and the phone menu on small screens, before pushing to `main`.

## Credits

- **Design direction:** Joe Pope, founder of Two Points Ltd.
- **Design and build:** made with Claude (Anthropic) in Claude Code.
- **Type:** Plus Jakarta Sans (Tokotype, SIL Open Font License), via Google Fonts.
- **Photos and video:** Two Points' own work.
- **Shop silhouettes:** made with Higgsfield background removal; the descender traced from CMC's product image.
- **Other marks:** SiteWise belongs to Site Safe New Zealand; IRATA, Petzl, CMC, Climbing Technology and the social networks own their names and marks.

The public credit is in `humans.txt` and the footer line "Made by me, Joe."
