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
- Images named `gen-*.jpg` are AI-generated atmosphere shots (gear close-up, mountain peaks, glass tower). Everything else is real site photography.
