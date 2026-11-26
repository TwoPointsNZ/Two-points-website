# Two Points brand suite

Everything needed to put the Two Points brand on paper, email, a van, social media and site.
Made 25 November 2026 from two packs joined into one: the **Two Points design package** and the **house-style skill**.

**Start with** `Two-Points-brand-guide.pdf` (3 pages).

## What's inside

| Folder | What | Who it goes to |
|---|---|---|
| `Two-Points-brand-guide.pdf` | The rules on three pages | Anyone making something for you |
| `00-foundations/` | Both original packs, joined: logos, colours, type, rules, templates, the Claude skill | Claude, a designer, a developer |
| `01-stationery/` | 3 letterheads (PDF + Word), compliment slip, envelope | You · a printer for bulk |
| `02-email-signatures/` | 5 email footers with Copy buttons (`signatures.html`), built around the short "reply" one | Paste into Gmail |
| `03-business-cards/` | 3 card designs, print-ready | Printer |
| `04-leaflets/` | A5 flyer, DL rack card, A4 capability statement | Printer · or email the PDF |
| `05-vehicle/` | 3 van options, signwriter sheet, vector artwork | Signwriter |
| `06-social/` | LinkedIn + Facebook banners, 4 post templates, story, profile picture | Upload |
| `07-site-and-workwear/` | Site sign, site ID card, stickers, clothing guide | Sign maker · garment printer |
| `_source/` | The files everything is built from | Claude (to change a design) |

## The one new idea: the two ropes

Two ring anchors, two ropes, a backup device and a descender, both holding one technician.
The technician is the brand full stop. It is the number one rule of rope access in one picture.

- **Rigged** (the full picture): van, business card C, LinkedIn banner, social post 2.
- **Plumb** (ropes stop with a stopper knot): letterhead C, envelope.
- Once per piece. Always vertical. Never a pattern.
- The three ways it could be drawn are in `00-foundations/previews/two-lines-options.jpg`. B "Rigged" is the one in use.

## Choices for Joe

Each has options A, B, C so you can pick. My pick is marked.

| Piece | Options | My pick | Why |
|---|---|---|---|
| Letterhead | A Band · B Paper · C Two lines | **B** for printing in the office, **A** for PDFs | B uses little ink. A matches the quotes. |
| Business card | A Band · B Paper · C Two lines | **C** | "Two points." is the thing people remember. |
| Van | A Letterhead · B Two ropes · C Headline | **B** | Cheapest to make, and most "Two Points". |
| Email footer | 1 to 5 | **1** day to day, **3** for quotes | 1 is the short reply one Joe liked. 5 is the boxed card in use before. |

## Needs your OK before it is used

**Wording I wrote (not from your website):**

- Flyer: "done by rope access. Quick to set up, and your building stays open below us."
- Rack card: "without the scaffolding" and "Free quotes".
- Capability statement: "Two Points is an industrial rope access company.", the "What you receive" section, "Tagged, tested and certified" as a safety fact.
- Site sign: "Rope access work overhead. Technicians are working above this area. Please keep outside the barriers."
- Site sign and ID card are reworked (26 Nov).
- ID card: the whole back (IRATA number, level, expiry, first aid, emergency steps).
- The example letter (made-up client, only there to show the type styles).
- Email footers 1 to 4: "Managing Director, Two Points Rope Access".

**Things I assumed:**

- **The van is white**, short wheelbase, low roof, sliding door on the kerb side, twin rear doors. A dark-van version is shown too.
- **"New Zealand"**, not a city, on every piece (as the website says). There is no street address, GST number or NZBN on anything. Tell me if a letterhead should carry them.
- Role is **Managing Director** (as on the website and the current email footer).

**Things I could not check:**

- The printed colour. Files are in screen colour (RGB). Bright teal and pink dull down in ordinary print, so ask for a proof.
- Email footers in real Gmail and on an iPhone. They use the same build as your current footer. Footer 4 uses `btn-quote5.png`, which are in the website's files but I could not confirm they are live on twopoints.co.nz from here.
- The Word letterheads in real Microsoft Word (checked in LibreOffice only). Install **Plus Jakarta Sans** (free, Google Fonts) or Word swaps in another font.
- Van sizes. They are scaled from a photo. The signwriter sets the final sizes on their own template.

## About the pictures

- **Job photos** are your own, from the website. They are about 1,400 px, which is fine for A5 and DL. For anything bigger, use the original phone photos.
- **Photos with another company's name on the clothing** were left out.
- **The blank vans** were made with Higgsfield as mock-up bases only. The logo and lettering on them are the real vector artwork, placed on top. Nothing AI-made is used as a photo of your work.
- **The site sign** uses safety yellow and black. That is the one place the suite steps outside the brand colours, because a warning sign has to read as a warning. Check it against your sign supplier's standard before printing.

## For the printer

- Trim sizes, 3 mm bleed and crop marks are in every file named `PRINT`.
- Business cards: 90 × 55 mm. 400 gsm, uncoated or soft-touch matt.
- Flyer A5 and rack card DL: 150 gsm silk, or 300 gsm for the rack card.
- Letterhead: 120 gsm uncoated.
- Site sign: drawn at half size. Print at 200% on 600 × 900 mm corflute or ACM.
- ID card: CR80, 86 × 54 mm, PVC.

## Changing a design later

Everything is built from `_source/pages/*.html` with one command:

```
node _source/build.mjs            # everything
node _source/build.mjs flyer      # just the pages with "flyer" in the name
```

Ask Claude: "In the brand suite, change the phone number on the business cards and rebuild."
