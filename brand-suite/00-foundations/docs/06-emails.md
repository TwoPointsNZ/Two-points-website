# 6 · Emails

Every email is a letterhead. Starter: `templates/email.html`. It carries the full rule list in its top comment.

| Email | Brand | Label |
|---|---|---|
| Quote, site report, SSSP, quote follow-up (to clients) | **Two Points** logo | QUOTE · SITE COMPLETION REPORT · SSSP |
| Morning Update, Job check-in, Contract to sign, Safety alert, invite, password reset | **Simple** logo | Morning Update · Job check-in · … |

## Layout

1. **Dark header band:**
   - logo top left, a quiet detail top right (the date);
   - the rainbow label (a picture);
   - the two-line headline (white, then grey);
   - for documents, the address and a row of reference details (Ref · Completed).
2. **White page:**
   - the words;
   - then sections with labels and rows: Attached (PDF rows with small rainbow-edged tiles), To-do;
   - a short rainbow line, then the signature card.
3. **Dark footer band:** the logo again, a thin divider, two grey lines ("Two Points Ltd · Rope access & exterior building maintenance · Christchurch").

## Gmail rules (tested on an iPhone in dark mode)

- **Tables + inline styles only.**
- **Every dark fill is set three ways:** `bgcolor`, `background-color` and `background-image: linear-gradient(c, c)`. Gmail flips the first two in dark mode but not the image.
- **Text on dark goes inside the blend layers:** `<div class="gs"><div class="gd">…</div></div>`. This needs `<body class="body">` and the one-line `<style>` fix. All of that text is white or grey.
- **Colour comes from pictures:**
  - The logo, the rainbow label and the › arrows are PNGs, attached as `cid:`.
  - Gmail turns coloured text into its opposite (blue went orange).
  - Never put dark text on a rainbow.
- Rainbow lettering as a picture: draw it one letter at a time at 3× with a transparent background, then shrink it to a 64-colour PNG (about 2 KB).
- **The › arrow is one picture** (ring + chevron, 28px). A typed › sits low in mail apps.
- The light page uses plain colours, so Gmail darkens it evenly.
- Hidden preview line at the top: name the useful thing ("Send 7 site reports · 1 possible enquiry").
- **Subject:** short and clean. "Morning Update · 2 things need you", not "Simple — Morning brief for Thu 12 Nov".
- **Sign-off:** client emails end with just **"Regards,"**. The Simple crew chase keeps "Cheers, Joe".
- **Signature card:** Joe Pope · Director · 021 0898 7180 · joe@twopoints.co.nz · twopoints.co.nz.
- **Test by sending a real email.** Gmail's own draft tools strip gradients, so a pasted draft looks wrong.

## Never

- Never auto-send to a client or contractor. Emails are drafted, and a person presses Send.
- Never put secrets or API keys in a template.
