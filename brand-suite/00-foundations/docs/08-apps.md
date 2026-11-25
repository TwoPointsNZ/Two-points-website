# 8 · The apps (Simple Office + Simple Field)

The apps use the Simple brand (`data-brand="simple"`) and support dark mode (`data-theme="dark"`).
The full house rules live in Simple's `.claude/skills/simple-ui/SKILL.md`. This is the short version for a new project.

## The colour language

| Meaning | Treatment |
|---|---|
| **Action outstanding** | Red: a red-gradient outline on the card or pill, a soft red glow, red count pills |
| **Nothing needed / done** | The brand's "clear" tint (lime in Simple) |
| **A zero** | Muted grey, like the card's title |

Red is only ever "you owe this" or "someone owes you this".

## Shell

- **Desk:**
  - A deep green-black frame (`#0b0e08`) in both themes, with a faint rainbow glow rising from the bottom-left.
  - The main panel is a lit card on it.
  - The sidebar has Home, then folders.
- **Phone:**
  - A docked bottom bar, icons only.
  - The centre Home button is the S-mark tile.
  - A short rainbow line slides to the current tab.
  - The top bar is a card-coloured band with a hairline.

## Buttons in the apps

- **Light mode:** white pills with a bold 1.5px rainbow edge (`--edge`) and a faint pastel glow rising from the bottom. Ink words.
- **Dark mode:** charcoal pills, the same edge, white words.
- Partner buttons in a pair are **mirrored** (the edge runs violet → lime).
- The Incident / alert pill uses the red-gradient edge.
- Desk buttons are rounded rectangles (36px, 10px corners). Phone buttons are pills.

## Page skeleton (desk)

```
page header: title + one plain sub-line ............ actions top-right
stat row: exactly 4 cards, the dark "hero" card first
boards: white cards, each with a title + sub, then rows
```

## Hero cards (one look)

- A dark green-black surface with a faint square grid.
- A rainbow glow from the bottom-left.
- A rainbow hairline edge.
- Two slow lava blobs (lime; sky → violet).
- Every hero uses the same recipe. Never give one its own colour scheme.

## Small rules that keep it tidy

- Card hover lifts 2px onto a soft layered shadow. **Never an outer ring.**
- Status pills are one line, with a small dot in their own colour.
- Big figures count up on arrival.
- Dates: never `toISOString()` for a local date (NZ is UTC+12/13, so the date lands a day early). Use the local day.
- **Test on an iPhone.** Safari is a different engine to Chrome. Photos, uploads, offline drafts, PDF drawing and touch gestures are the risky areas.
