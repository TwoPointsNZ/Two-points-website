// The letterhead: dark band on top, plain white page, dark band at the foot.
// Joe's favourite look (8 Nov 2026). Use it for summaries, emails-in-the-browser, client pages, documents on screen.
// Needs tokens/tokens.css + css/two-points.css.
//
// <Letterhead logo="/two-points-logo-white.png" label="Site completion report" date="24 Nov 2026"
//             headline={['St Andrew\'s College,', 'chapel roof wash.']} foot={['Two Points Ltd', 'Christchurch']}>
//   <Section label="Attached" count={2}> <Row title="JC013 · Canopies" detail="PDF · 2.1 MB" tag="Ready" tone="waiting" onOpen={...} /> </Section>
// </Letterhead>
import Chev from './Chev.jsx'

export function Letterhead({ logo, logoAlt = 'Two Points', label, date, headline = [], foot = [], children }) {
  const [line1, line2] = headline
  return (
    <article className="tp tp-letterhead">
      <header className="tp-band">
        <div className="tp-band-top">{logo && <img className="logo" src={logo} alt={logoAlt} />}{date && <span>{date}</span>}</div>
        {label && <span className="tp-rbl">{label}</span>}
        {line1 && <h1 className="tp-headline">{line1}{line2 && <i>{line2}</i>}</h1>}
      </header>
      <div className="tp-sheet">{children}</div>
      <footer className="tp-band foot">
        {logo && <img className="logo" src={logo} alt="" style={{ height: 24 }} />}
        {foot.length > 0 && <><span className="rule" /><span>{foot.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}</span></>}
      </footer>
    </article>
  )
}

export function Section({ label, count, children }) {
  return (
    <section>
      <div className="tp-label">{label}{count > 0 && <span className="tp-count">{count}</span>}</div>
      <div className="tp-rows" style={{ marginTop: 10 }}>{children}</div>
    </section>
  )
}

// tone: 'waiting' (red tint: owed / overdue / ready to send) · 'clear' (done) · undefined (quiet grey)
export function Row({ title, detail, tag, tone, onOpen, href }) {
  const Go = href ? 'a' : 'button'
  return (
    <div className="tp-row">
      <div><b>{title}</b>{detail && <span>{detail}</span>}</div>
      <div>{tag && <span className={`tp-tag ${tone || ''}`}>{tag}</span>}</div>
      {(onOpen || href)
        ? <Go className="tp-go" href={href} onClick={onOpen} aria-label={`Open ${title}`}><Chev /></Go>
        : <span />}
    </div>
  )
}

export function ArrowButton(props) {
  return <button type="button" className="tp-go" {...props}><Chev /></button>
}

export default Letterhead
