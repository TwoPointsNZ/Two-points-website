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

`products.html` is the shop page. It is set to **Coming soon**: products are shown as a first look, with no prices, sizes or cart. The full shop (prices, sizes, cart drawer and Shopify checkout in `assets/js/shop.js`) is in the git history just before the commit "Shop: coming soon", ready to bring back.

- While the shop is "coming soon", each product shows a solid silhouette (`assets/img/shop/*-soon.png`), cut from AI-generated example product images. The full-colour example photos are in the git history, before the commit "Shop: silhouettes".
- Checkout is wired for Shopify but not connected. To connect a store: add the Headless sales channel in Shopify admin, copy its public Storefront API access token, then fill in `domain`, `storefrontToken` and the `variants` map at the top of `assets/js/shop.js`. The checkout button then creates a Shopify cart and sends the customer to Shopify's checkout.
- The checkout request has not been tested against a live store.

## Hosting and going live

- **Live site:** https://www.twopoints.co.nz, on Hostinger web hosting (website `twopoints.co.nz`).
- **Deploys:** Hostinger auto-deploys the `main` branch from GitHub. Anything pushed to `main` is live within about 10 seconds. Work happens on a separate branch and is pushed to `main` once checked.
- **Domain:** registered at GoDaddy, which also hosts the DNS. Only two records point at Hostinger: `A @ 46.202.138.71` and `CNAME www @`.
- **Email:** Google Workspace. Never change the MX records, the SPF/DKIM/DMARC TXT records (`@`, `google._domainkey`, `_dmarc`, `dc-…._spfm`) or `_domainconnect` at GoDaddy. DMARC is set to reject, so a broken record means lost mail.
- **Certificate:** issued and renewed by Hostinger for both `twopoints.co.nz` and `www`.

## Hosting files

- `.htaccess`: server settings for Hostinger (LiteSpeed/Apache). Forces https://www., redirects the old site's /about, /contact and /offering pages, serves `404.html` for missing pages, blocks the Git folder and notes, sets security headers (HSTS, content security policy, permissions policy) and caching. If you add a new outside service (fonts, scripts, a Shopify cart), add its domain to the content security policy or the browser will block it.
- `robots.txt` and `sitemap.xml`: for search engines. Update `lastmod` in the sitemap after big changes.
- `site.webmanifest`: home-screen icon details.

## Notes

- The enquiry form opens the visitor's email app addressed to Joe. To have it send directly, point the form at a form service (Formspree, Netlify Forms, Web3Forms) in `assets/js/main.js`.
- All photos and video on the home page are real Two Points site footage. The only AI-derived imagery is the product silhouettes on the shop page.
- The logo files are the original artwork, only resized. Do not redraw or recolour them.
- The design is a sister to the Simple website: a dark band top and bottom, a white page between, and the Alpenglow gradient used sparingly.
- `assets/img/tattoos/` holds artwork from an earlier design. It is not used on the page.
