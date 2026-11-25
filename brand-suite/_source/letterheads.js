// Three letterhead styles. LH(style, {filled, cont}) returns the inner HTML of one A4 page (210 × 297 mm).
const L='../../00-foundations/logos/two-points/';
const sample=`
  <div class="l-date">25 November 2026</div>
  <div class="l-to"><b>Example Body Corporate</b><br>Attention: Building Manager<br>12 Example Street<br>Christchurch 8011</div>
  <div class="l-ref"><span class="label">Our ref</span> <span class="mono">Q014</span></div>
  <h1 class="l-subject">Façade sealant renewal, north elevation</h1>
  <p>Dear Building Manager,</p>
  <p>Thank you for showing us the building last week. Our quote for renewing the sealant on the north elevation is attached.</p>
  <p>The work would be done by rope access. That means no scaffolding, and your entrances and tenants carry on as normal below us.</p>
  <ul><li>Two IRATA technicians, supervised by an IRATA Level 3 supervisor.</li><li>A written safety plan before anyone leaves the roof.</li><li>A completion report with before and after photos at the end.</li></ul>
  <p>If you have any questions, call me on 021 0898 7180.</p>
  <p class="l-sign">Regards,</p>
  <div class="l-name">Joe Pope</div><div class="l-role">Managing Director · IRATA Level 3 Supervisor</div>`;
const contact=`<span>021 0898 7180</span><span>Joe@twopoints.co.nz</span><span>twopoints.co.nz</span>`;
function LH(style,{filled=false,cont=false}={}){
  const body=`<div class="l-body">${filled&&!cont?sample:''}</div>`;
  if(style==='A') return `<div class="lh lhA ${cont?'cont':''}">
    <div class="a-top band"><img src="${L}${cont?'two-points-wordmark-white.svg':'two-points-logo-vector-white.svg'}" class="a-logo"><div class="a-contact">${cont?'<span>twopoints.co.nz</span>':contact}</div></div><div class="rule a-rule"></div>
    ${body}
    <div class="a-foot band"><span><b>Two Points Ltd</b> · Industrial rope access · New Zealand</span><span>Because ladders only go <b class="rbl">so far</b><i class="dot"></i></span></div></div>`;
  if(style==='B') return `<div class="lh lhB ${cont?'cont':''}">
    <div class="b-top"><img src="${L}${cont?'two-points-wordmark-ink.svg':'two-points-logo-vector-ink.svg'}" class="b-logo"><div class="b-contact">${cont?'':contact}</div></div><div class="rule b-rule"></div>
    ${body}
    <div class="b-foot"><span><b>Two Points Ltd</b> · Industrial rope access · New Zealand</span><span>SiteWise Gold 2026/27 · IRATA Level 3 supervised</span></div></div>`;
  return `<div class="lh lhC ${cont?'cont':''}">
    <i class="c-line c1"></i><i class="c-line c2"></i><i class="c-dot d1"></i><i class="c-dot d2"></i>
    <div class="c-top">${cont?'':`<img src="${L}two-points-logo-vector-ink.svg" class="c-logo">`}</div>
    ${body}
    <div class="c-foot"><b>Two Points Ltd</b><span>021 0898 7180</span><span>Joe@twopoints.co.nz</span><span>twopoints.co.nz</span></div></div>`;
}
// helper used by the letterhead pages: ?style=A&mode=all|blank|print
function renderLetterheads(){
  const q=new URLSearchParams(document.body.dataset.q||'');const mode=q.get('mode')||'all';
  const styles=mode==='all'?['A','B','C']:[q.get('style')];
  for(const s of styles){
    const opts=mode==='all'?[{filled:true},{},{cont:true}]:[{},{cont:true}];
    for(const o of opts){
      const inner=LH(s,o);
      document.body.insertAdjacentHTML('beforeend', mode==='print'
        ? `<div class="print" style="--w:210mm;--h:297mm" data-name="Letterhead ${s}${o.cont?' page 2':''}"><div class="art"><div class="trim" style="overflow:visible">${inner}</div></div></div>`
        : `<div class="sheet">${inner}</div>`);
    }
  }
}
