# 7 · Websites and motion

Two sister sites share one design:

| | twopoints.co.nz | keepitsimple.co.nz |
|---|---|---|
| Brand | Two Points Ltd (Alpenglow) | Simple (Simple rainbow) |
| Hosting | Hostinger main site, auto-deploys from GitHub | Hostinger addon site |
| One dark panel | The Simple advert (in Simple's colours) | The app cards |

Starter: `templates/web-page.html`.

## Page structure

1. **Sticky top band:**
   - 68px tall, `--band`, with a 3px rainbow underline;
   - wordmark left, quiet grey links right, one small dark ring button;
   - a soft shadow once the page scrolls (`.scrolled`).
2. **Hero:**
   - an eyebrow;
   - a huge headline with **one** rainbow phrase and the brand full stop;
   - a lead paragraph (grey, key phrase bold ink);
   - two buttons (ink + paper).
3. **Sections:**
   - 104px apart;
   - each opens with eyebrow → heading (with a grey second clause: "Three things, *done properly.*") → one-line intro.
4. **Content:**
   - photo cards (22px corners);
   - rows split by 1px lines;
   - one soft panel (`.tp-panel`, 30px corners) for the contact block.
5. **Dark footer band:** logo | a thin divider | two lines of grey | links.

## Photos

- **Real Two Points job photos only.** No stock. Any AI imagery must be said so.
- While loading, a grey cover with a soft sheen sits over the photo.
- When it arrives, the cover slides away led by a thin rainbow edge.

## Motion

> Professional, minimal, well-designed. Each thing plays **once**, as it scrolls into view.

- **One easing curve:** `--ease` = `cubic-bezier(.32, .72, 0, 1)`. Quick UI: 180ms. Folds and reveals: 550ms.
- **Motion only brings things IN.**
  - Never fade a page out or blank it. That reads as a flash.
  - Use `animation-fill-mode: backwards`, never `both`, or the held end state beats `:hover`.
- **Start on view:** use IntersectionObserver. Start a part only once 60% of it is on screen. On a phone things used to play before you reached them.
- **Stagger parts that arrive together** by about 90ms.
- **Signature moves:**
  - **The full stop drops in** from high up, then one fine ring opens out from it.
  - **The flow line:** a light travels along a row of steps (Lead → Invoice). Each step lights as it passes (rainbow fill + glow). The last ends with a tick and one rainbow pulse.
  - **The highlighter:** a soft rainbow marker sweeps left → right behind a few words.
  - **Squircle tiles pop in:** the glow swells, then one small rainbow pulse.
  - **Two glows breathe:** on big screens, one soft blob each side, 16s / 19s clocks, never in step, and kept faint.
- **No blur filters** on anything that moves or on SVGs. iPhones draw them blurry and slow.
- **Reduced motion:** honour `prefers-reduced-motion`. Everything shows in its finished state and nothing moves.

## Website hygiene (learned on Hostinger)

- Version CSS and JS files (`styles.css?v=<hash>`). Browsers keep them for an hour.
- Use a strict Content Security Policy: scripts only from your own site, fonts only from Google.
- Set HSTS, nosniff, X-Frame DENY, and a 404 page.
- Keep the README and config files out of public reach (403).
