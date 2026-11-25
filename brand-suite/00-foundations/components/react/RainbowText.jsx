// Rainbow lettering, one colour per letter.
// Why per letter: PDF makers (html2canvas) cannot draw gradient-filled text, but they copy coloured letters exactly,
// and Gmail turns gradient text into plain text. On a normal web page you can use the .tp-rb class instead.
//
//   <RainbowText text="Quotation" />                         Two Points (Alpenglow), deep shades for white paper
//   <RainbowText text="Morning Update" brand="simple" shade="bright" />   Simple, bright shades for the dark band
import { rainbowAt } from '../../tokens/tokens.js'

export default function RainbowText({ text, brand = 'two-points', shade = 'deep' }) {
  const chars = [...String(text || '')]
  const n = Math.max(1, chars.length - 1)
  return <>{chars.map((c, i) => <span key={i} style={{ color: rainbowAt(i / n, brand, shade) }}>{c}</span>)}</>
}
