# Two Points website

Static site for Two Points Ltd (industrial rope access). No build step.

- `index.html` — the page (all copy lives here)
- `assets/css/styles.css` — design tokens and styles
- `assets/js/main.js` — animation and interaction (no dependencies)
- `assets/img`, `assets/video` — photos, logo, hero loop

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy

Upload the folder as-is to any static host (GitHub Pages, Netlify, Cloudflare Pages, Vercel).

## Notes

- The enquiry form opens the visitor's email app addressed to Joe. To have it send directly, point the form at a form service (Formspree, Netlify Forms, Web3Forms) in `assets/js/main.js`.
- All photos and video are real Two Points site footage. No AI or stock imagery.
- The logo files are the original artwork, only resized. Do not redraw or recolour them.
- The design is a sister to the Simple website: a dark band top and bottom, a white page between, and the Alpenglow gradient used sparingly.
- `assets/img/tattoos/` holds artwork from an earlier design. It is not used on the page.
