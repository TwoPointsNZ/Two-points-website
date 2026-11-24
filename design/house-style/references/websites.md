# Websites

How the Simple and Two Points websites are built, so a new site starts the same way.

## Build

- Plain static files: HTML pages, one stylesheet, one script. No build step, no framework.
- Tokens as CSS custom properties on `:root` at the top of the stylesheet.
- A strict Content-Security-Policy: no inline `style=""` attributes and no inline scripts on site pages; fonts only from Google Fonts. Stagger delays come from `nth-child` rules, not inline styles.
- Cache busting: pages load `styles.css?v=<hash>` and `main.js?v=<hash>`. Refresh the hash on every page whenever either file changes, or browsers mix new pages with old styles.
- Every page has a title, description, canonical link, Open Graph tags and image, an app icon and manifest; plus `sitemap.xml`, `robots.txt` and a designed 404 page.
- Security headers: HSTS, nosniff, frame-options, referrer and permissions policies. Private files (README, Git files, archives) are blocked.

## Behaviour

- Motion is switched on by a class (`html.anim`) set by the script, so a page with no script still shows everything.
- Reveal on scroll uses one IntersectionObserver. Things rise 14px and fade in once; nothing hides content until a timer fires.
- Photos are never hidden (lazy loading needs them visible); the `PhotoReveal` cover sits on top instead.
- The phone menu fills the screen and must fit with no scrolling on every size from 320×568 to 768×1024. Sizes scale with the screen height (`clamp()` with `vh` and `dvh`).
- Forms validate in the page and say exactly what to fix.
- Respect `prefers-reduced-motion` everywhere.

## Checking

- Test on a phone width and a desktop width before every release: every link, button, menu and form.
- Look at real screenshots, not just code. Check the menu fit on six screen sizes.
- Test with the security policy switched on, so nothing silently fails to load.

## Hosting (Two Points)

- Hostinger web hosting, deployed automatically from the GitHub `main` branch, live within about 20 seconds of a push.
- Domain and DNS at GoDaddy. Never change the Google Workspace email records (MX, SPF, DKIM, DMARC).
- Work on a branch; push checked changes to `main` to go live.
