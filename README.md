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

## Shop

`products.html` is the shop page. Its cart lives in `assets/js/shop.js`.

- The products, photos and prices are examples. The photos in `assets/img/shop/` are AI-generated, with the real logo placed on the merch.
- Checkout is wired for Shopify but not connected. To connect a store: add the Headless sales channel in Shopify admin, copy its public Storefront API access token, then fill in `domain`, `storefrontToken` and the `variants` map at the top of `assets/js/shop.js`. The checkout button then creates a Shopify cart and sends the customer to Shopify's checkout.
- The checkout request has not been tested against a live store.

## Notes

- The enquiry form opens the visitor's email app addressed to Joe. To have it send directly, point the form at a form service (Formspree, Netlify Forms, Web3Forms) in `assets/js/main.js`.
- All photos and video on the home page are real Two Points site footage. The only AI imagery is the example product photos on the shop page.
- The logo files are the original artwork, only resized. Do not redraw or recolour them.
- The design is a sister to the Simple website: a dark band top and bottom, a white page between, and the Alpenglow gradient used sparingly.
- `assets/img/tattoos/` holds artwork from an earlier design. It is not used on the page.
