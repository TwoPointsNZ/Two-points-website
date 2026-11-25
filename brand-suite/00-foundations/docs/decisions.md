# Open decisions: where things don't match yet

Found while putting this package together (24 Nov 2026). Nothing has been changed in the live apps, documents or
websites. Each item needs Joe's yes before anyone changes it.

## 1. Which rainbow do client documents use? ⭐ biggest one

- **Now:**
  - The Two Points website uses **Alpenglow** (teal → pink).
  - Quotes, SSSPs, site reports and client emails use **Simple's rainbow** (lime → violet).
- **The problem:** a client sees the website in one set of colours and the quote in another.
- **Recommend:** anything with the Two Points name uses **Alpenglow**. Simple's rainbow stays inside the apps and Simple's own emails.
- **What it would take:**
  - Swap the colour list in `RainbowText.jsx` (both apps) for a "two-points" run.
  - Redraw the email label pictures (QUOTE, SITE COMPLETION REPORT…) in Alpenglow.
  - Change the tint on the quote's Optional pill.
  - About an hour. Old PDFs stay as they are.

## 2. Three nearly-black bands

| Where | Colour |
|---|---|
| Websites | `#14170f` |
| Emails | `#161819` |
| Document covers in Simple | `#1A1A1A` |

- **Recommend:** `#14170f` everywhere (the warm green-black that matches Simple's frame).
- Small change, hardly visible, but it makes the set exact.

## 3. Old design notes in Simple

- `Skills/pdf-standards.md` and `Skills/design-system.md` in the desk repo describe the **July 2026** look: lime `#9FCC2E` pills, Inter + Playfair, Puppeteer only.
- None of that is true now.
- **Recommend:** replace both with a short pointer to this package, so no future session builds on the old spec.

## 4. Two "clear" greens

- Two Points uses a teal tint (`#d6f7ee` / `#0b6b55`). Simple uses lime (`#e6f6c8` / `#3f6b00`).
- **Recommend:** keep both. Each matches its own run. Just never mix them on one page.

## 5. A broken logo file

- `public/logo-mark-white.svg` in Simple draws a solid shape, not the mountain outline.
- It's left out of this package.
- **Recommend:** delete it, or redraw it from `two-points-mountain-ink.svg`, if anything still uses it.

## 6. The Two Points app tile

- The website has a lovely Two Points tile: the mountain in Alpenglow on the dark squircle.
- It's only used as the website favicon so far.
- **Could also be:**
  - the client page's home-screen icon;
  - Gmail's sender picture (via a Google Workspace profile photo);
  - social avatars.
