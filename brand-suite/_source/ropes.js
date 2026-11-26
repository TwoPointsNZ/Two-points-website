// The two ropes, drawn the way Two Points rigs them. One source for every piece in the suite.
//   Top:    a figure 8 on each rope ('eights'), or bunny ears onto two anchors ('ears', 'shared').
//   Bottom: a stopper knot with a tail below it.
// The whole rig is always shown, anchor to tail: it never runs off an edge.
// ropeG(style, opts) -> {g, w, h} SVG markup in its own units.   ropes(style, opts) -> a positioned <svg>.
// opts: len (overall height, anchor to tail), T (rope thickness), anchor (anchor colour), knot (colour of the wrap marks = the background),
//       unit ('mm'|'px'), style (CSS for the svg)
const ROPE_DEFAULT='ears';           // the style in use across the suite: change here, rebuild, and every piece follows
let ropeN=0;
function ropeG(style,o={}){
  if(!['eights','ears','shared'].includes(style)) style=ROPE_DEFAULT;
  const T=o.T||1, len=o.len||100, id='rp'+(ropeN++), anchor=o.anchor||'#8b9199', bg=o.knot||'#fff';
  const ears=style!=='eights', spread=style==='shared'?4.5*T:2.7*T;      // half-distance between a rope's two anchors
  const gap=style==='shared'?4.2*T:(ears?9*T:6*T), pad=(ears?spread:1.8*T)+1.6*T;
  const xs=style==='shared'?[pad+spread-gap/2,pad+spread+gap/2]:[pad,pad+gap], w=style==='shared'?2*pad+2*spread:2*pad+gap;
  const ay=1.6*T, cols=[['#14E0B4','#1FA9FF'],['#6A5CFF','#F15BB5']];
  let s='<defs>'+cols.map((c,i)=>`<linearGradient id="${id}${i}" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="${len}"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`).join('')+'</defs>';
  const anchors=new Set();
  xs.forEach((x,i)=>{
    const col=`url(#${id}${i})`, ky=ay+(ears?6.2*T:6.6*T)+(style==='shared'?i*3.4*T:0);   // top of the knot
    const tailEnd=len-(i?0:5*T), st=tailEnd-9*T;                                          // rope 2 hangs a little lower
    const A=style==='shared'?[pad,pad+2*spread]:(ears?[x-spread,x+spread]:[x]);
    if(ears) A.forEach(a=>{anchors.add(a); s+=`<path d="M${a} ${ay}L${x} ${ky+.6*T}" stroke="${col}" stroke-width="${T}" stroke-linecap="round" fill="none"/>`;});
    else { anchors.add(x); s+=`<ellipse cx="${x}" cy="${ay+2.9*T}" rx="${1.35*T}" ry="${2.9*T}" fill="none" stroke="${col}" stroke-width="${T}"/>`; }
    // the knot: a figure 8, drawn as two crossed turns of rope
    s+=`<g transform="rotate(-14 ${x} ${ky+2.2*T})"><ellipse cx="${x}" cy="${ky+1.15*T}" rx="${1.45*T}" ry="${1.2*T}" fill="none" stroke="${col}" stroke-width="${T*.95}"/><ellipse cx="${x}" cy="${ky+3.25*T}" rx="${1.45*T}" ry="${1.2*T}" fill="none" stroke="${col}" stroke-width="${T*.95}"/></g>`;
    s+=`<path d="M${x} ${ky+4.4*T}V${tailEnd-T/2}" stroke="${col}" stroke-width="${T}" stroke-linecap="round" fill="none"/>`;
    // stopper knot (a barrel of wraps) with the tail left below it
    s+=`<rect x="${x-1.35*T}" y="${st}" width="${2.7*T}" height="${4.2*T}" rx="${T*1.1}" fill="${col}"/>`;
    s+=`<path d="M${x-1.35*T} ${st+1.75*T}l${2.7*T} ${-.7*T}M${x-1.35*T} ${st+3.15*T}l${2.7*T} ${-.7*T}" stroke="${bg}" stroke-width="${T*.3}" fill="none"/>`;
  });
  anchors.forEach(a=>{ s+=`<circle cx="${a}" cy="${ay}" r="${1.25*T}" fill="${bg}" stroke="${anchor}" stroke-width="${T*.7}"/>`; });
  return {g:s,w,h:len};
}
function ropes(style,o={}){
  const u=o.unit||'mm', r=ropeG(style,o);
  return `<svg class="ropes" viewBox="0 0 ${r.w} ${r.h}" width="${r.w}${u}" height="${r.h}${u}" style="position:absolute;overflow:visible;${o.style||''}" aria-hidden="true">${r.g}</svg>`;
}
// drop-in for static pages: <i data-ropes data-len="40" data-t=".45" data-knot="#14170f" data-style="left:66mm;top:7mm"></i>
document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('[data-ropes]').forEach(el=>{const d=el.dataset;
  el.outerHTML=ropes(d.ropes,{len:+d.len,T:+d.t,anchor:d.anchor,knot:d.knot,unit:d.unit||'mm',style:d.style||''})}));
