# Design: follow the Two Points design package

This project uses the **Two Points design package** (folder `two-points-design/`, or wherever it was copied).
**Before building or restyling any page, component, document or email, read:**

1. `two-points-design/README.md`: the 10 rules.
2. The doc for the job:
   - website → `docs/07-website-and-motion.md`;
   - PDF → `docs/05-documents.md`;
   - email → `docs/06-emails.md`;
   - app screen → `docs/08-apps.md`.
3. `docs/02-colour.md`, every time colour is involved.

## Non-negotiables

- **Brand:**
  - Anything a client sees (website, quote, SSSP, site report, client email) carries **Two Points Ltd** and the mountain logo, with the **Alpenglow** accent.
  - The software is **Simple**, with the **Simple rainbow** accent.
  - Never swap logos. Never redraw or recolour the logo files.
- **Use the tokens.**
  - Colours, fonts, spacing, corners and shadows come from `tokens/tokens.css`. No new hex values.
  - Components come from `css/two-points.css` (`tp-` classes) or `components/react/`. Don't invent new card or button shapes.
- **Colour is rare:**
  - Ink, grey, white, plus small rainbow accents.
  - Red only means "something is owed".
  - No coloured body text and no big rainbow fills.
- **The letterhead** for documents, emails and summaries: dark band, white page, dark band.
- **Lines and space, not boxes.** › arrows line up on one right edge. Check alignment by measuring, not by eye.
- **Emails:** tables + inline styles and the Gmail dark-mode rules in `docs/06-emails.md`. Never auto-send to a client.
- **PDFs drawn with html2canvas:** colour rainbow lettering one letter at a time (`RainbowText` / `rainbowAt`). No gradient text.
- **Motion:** plays once, only brings things in, one easing curve, respects reduced motion, no blur filters.
- **Words:** plain, short, NZ English. The headline says what matters. Client emails end "Regards,".

## The person you're building for

- Joe (Two Points Ltd, Christchurch) is dyslexic and not a developer.
- Explain in short bullets, with a picture or table where it helps.
- Show screenshots of what you build, in light AND dark mode where both exist, and at phone width.
