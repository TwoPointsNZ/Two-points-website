# Email

Emails and signatures follow the letterhead, rebuilt for mail apps.

## Building any email

- Tables and inline styles only. No `<style>` blocks, no classes, no web fonts: Helvetica, Arial.
- Logos, icons, rainbow lines and rainbow lettering are pictures (PNG at 2x), hosted on the brand's website.
- Dark fills are also set as a background image, so Gmail's dark mode leaves them dark. Coloured text gets flipped; never rely on it.
- Never dark text on a rainbow.
- Fixed widths. Phones shrink a wide email to fit; they do not reflow it.

## The signature (Two Points)

See the `EmailSignature` component for the live version.

| Part | Spec |
|---|---|
| Card | 418px outside (416px inside), white, 1px `line` border, 10px corners |
| Header | `band`, 9px 16px padding: white wordmark 108×22 left, four social circles 20px with 7px gaps right |
| Rule | 3px Alpenglow line, a picture 416×3 |
| Middle | App icon 48px · name 18px bold · role 12.5px `ink-2` · qualification 11.5px · SiteWise badge 138×48 on the right |
| Contact | A hairline, then phone, email and website: 16px ringed icons, 11.5px bold ink, spread left, centre, right |

Rules learned the hard way:

- **Keep the fixed width.** Gmail's signature editor strips `width:100%` and `max-width` from inner tables. A stretched version broke apart on the phone (icons jumped, the phone number wrapped, the divider vanished).
- **Never move or rename a picture** a signature uses. Old signatures in people's inboxes still point at it. Add new files beside the old ones.
- **Gmail on iPhone:** its own "Mobile signature" is plain text and strips pictures. Turn Mobile signature off, so the full signature set on a computer is used.
- **A one-picture signature** (the whole thing as one image) shows as "Inline images" text on phones. Do not use it.
- Copying: the signature page copies the card as rich HTML (ClipboardItem). Paste it into Gmail: Settings, See all settings, Signature, Create new.

## Simple emails

- Every Simple email is a letterhead: top band with the logo and date, the two-line headline, rows on the plain page, the bottom band.
- Round arrow buttons in an email are one picture each, so mail apps cannot shift the chevron.
