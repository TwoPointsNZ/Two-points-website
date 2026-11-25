# 2 · Colour

## The rule that makes it look premium

> **Colour is rare and means something.**
> Mostly ink, grey and white. The rainbow appears only as small accents. Red only ever means "something is owed".

This is the most important rule in the package. Joe on the letterhead: *"the moderate use of colour gives it a super
premium feel … looks custom graphically designed, not generic AI."*

## Neutrals (both brands)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--page` | `#ffffff` | `#171c13` | The page. Most of every screen, email and document. |
| `--soft` | `#f4f4f0` | `#2a3128` | Quiet fill: neutral tags, table heading bands, photo placeholders, contact card. |
| `--canvas` | `#f4f5f3` | `#101309` | App background behind cards (Simple only). |
| `--ink` | `#15171a` | `#edefe9` | Titles and body. |
| `--ink-2` | `#555b63` | `#a8aea4` | Detail lines, section labels. |
| `--ink-3` | `#8b9199` | `#757b71` | Faint marks only: a zero, a disabled icon, big text. **Never body copy** (fails contrast). |
| `--line` | `#e2e5e8` | `#313830` | 1px hairline between rows and sections. |
| `--outline` | `#d6d2c8` | white 14% | The clear outline round app cards. |
| `--band` | `#14170f` | `#0b0e08` | The dark band (letterhead top + bottom), dark panels. A warm green-black. |
| `--band-ink` | `#f2f4ef` | same | Lettering on the band. |
| `--band-ink-2` | `#a2a99d` | same | Quiet lettering on the band (the second headline line, dates). |

Two Points pages, documents and emails are **light only**. Dark mode is for the Simple apps.

## The two accent runs

Both runs go in four stops at 0 / 38 / 70 / 100%, starting **bottom-left** when used as a fill (45°).

### Alpenglow: Two Points
| | Stop 1 | Stop 2 | Stop 3 | Stop 4 |
|---|---|---|---|---|
| Bright (`--c1…4`): fills, lines, the band | `#14E0B4` teal | `#1FA9FF` blue | `#6A5CFF` indigo | `#F15BB5` pink |
| Deep (`--d1…4`): words + rings on white | `#0FC9A0` | `#1893E8` | `#5647EE` | `#DC47A0` |

### Simple rainbow: the software
| | Stop 1 | Stop 2 | Stop 3 | Stop 4 |
|---|---|---|---|---|
| Bright: fills, the band | `#AAEE00` lime | `#3EE6B0` mint | `#4FB4FF` sky | `#A78BFA` violet |
| Ring: rings + small marks on white | `#8FD400` | `#22C997` | `#3A9BEA` | `#8B6CF0` |
| Edge: 1.5px button outlines | `#9BE000` | `#2FD9A4` | `#3FA9F5` | `#9B7CF6` |
| Deep: lettering on white | `#629600` | `#0E9670` | `#1C74CE` | `#7658DE` |

Ready-made gradients (in `tokens.css`; they follow the brand automatically):

| Token | What it's for |
|---|---|
| `--rainbow` | Small fills only: a dot, a knob, a bar's fill, a lit step. |
| `--rainbow-line` | Thin lines: the 3px underline of the top band, a calendar tile's top edge, a progress bar. |
| `--rainbow-word` | Rainbow words on white (deep shades). Big bold words only. |
| `--ring` / `--ring-mirror` | The outline of anything you press. Mirror = the partner button in a pair. |
| `--marker` | A soft highlighter behind a few words. |

## Where colour is allowed

**Allowed:**
- The 3px rainbow underline on the website's top band.
- Rainbow lettering:
  - one phrase in a headline ("done **right**", "Keep it **simple**");
  - the document label (QUOTATION);
  - the email label ("Morning Update").
- The ring round buttons and › arrows.
- The brand full stop.
- One rainbow bar per view (pipeline, progress).
- The 3px top edge of a calendar tile.
- Bullets: small rainbow dots or squircles.
- Status tags: soft tints (below).

**Not allowed:**
- Coloured body text.
- A big rainbow fill (a whole button, a whole card, a background).
- A rainbow behind dark text.
- Lime-filled buttons (that's the old Simple; retired).
- Using red as decoration.
- Mixing the two runs in one view (one exception: the Simple panel on the Two Points website is Simple's own colours, because it's an advert for Simple).

## Status colours

| Meaning | Tag | Words |
|---|---|---|
| **Waiting / owed / overdue / ready to send** | `--waiting-bg #fde7e7` | `--waiting-ink #b42318` |
| **Clear / done / money in** (Two Points) | `--clear-bg #d6f7ee` | `--clear-ink #0b6b55` |
| **Clear / done / money in** (Simple) | `#e6f6c8` | `#3f6b00` |
| Neutral info | `--soft` | `--ink-2` |
| Count of things owed | solid `--danger #d6452f`, white figure, sits right beside its label | |
| Card or pill with work waiting | 1.5px `--edge-alert` outline (crimson → red → coral → amber) | |

- **A zero is grey**, not green. Money and percentages are exempt: `$0` is a real figure.
- Status is always **colour + a word**, never colour alone.

## Accessibility

- Body text is `--ink` or `--ink-2` on `--page` / `--soft`. Both pass 4.5:1.
- Rainbow lettering is decoration on top of real words. Keep it to **20px+ bold** on white, or any size on the band.
- Focus ring: 2px `--focus` (blue), 3px offset. Never remove it.
