// The two ropes, drawn the way Two Points rigs them. One source for every piece in the suite.
//   Top:    a bolt hanger and carabiner at each anchor, then a figure 8 loop ('eights') or bunny ears ('ears', 'shared').
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
  const ears=style!=='eights', spread=style==='shared'?5*T:3.3*T;        // half-distance between a rope's two anchors
  const gap=style==='shared'?4.6*T:(ears?12.5*T:7.5*T), pad=(ears?spread:0)+2.2*T;
  const xs=style==='shared'?[pad+spread-gap/2,pad+spread+gap/2]:[pad,pad+gap], w=style==='shared'?2*pad+2*spread:2*pad+gap;
  const by=1.5*T, cTop=by-.9*T, cH=5.4*T, cBot=cTop+cH;                     // bolt, then the carabiner hanging from it
  const cols=[['#14E0B4','#1FA9FF'],['#6A5CFF','#F15BB5']];
  let s='<defs>'+cols.map((c,i)=>`<linearGradient id="${id}${i}" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="${len}"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`).join('')+'</defs>';
  const anchors=new Set(); let hw='';
  xs.forEach((x,i)=>{
    const col=`url(#${id}${i})`, ky=cBot+(ears?6.4*T:4.6*T)+(style==='shared'?i*4*T:0);   // top of the knot body
    const tailEnd=len-(i?0:5*T), st=tailEnd-9*T;                                          // rope 2 hangs a little lower
    const A=style==='shared'?[pad,pad+2*spread]:(ears?[x-spread,x+spread]:[x]);
    // each ear (or the single loop) is a real loop of rope: up through the carabiner and back into the knot
    A.forEach(a=>{ anchors.add(a);
      const x1=a, y1=cBot-1.5*T, x2=x, y2=ky+1.2*T, L=Math.hypot(x2-x1,y2-y1), ang=Math.atan2(x2-x1,y1-y2)*180/Math.PI;
      s+=`<ellipse cx="${(x1+x2)/2}" cy="${(y1+y2)/2}" rx="${1.25*T}" ry="${L/2+.5*T}" transform="rotate(${ang} ${(x1+x2)/2} ${(y1+y2)/2})" fill="none" stroke="${col}" stroke-width="${T}"/>`; });
    // the knot: a solid figure 8 body, drawn like the stopper, with its two crossing turns marked
    s+=`<rect x="${x-1.8*T}" y="${ky}" width="${3.6*T}" height="${5.4*T}" rx="${T*1.55}" fill="${col}"/>`;
    s+=`<path d="M${x-1.8*T} ${ky+1.5*T}L${x+1.8*T} ${ky+3.9*T}M${x+1.8*T} ${ky+1.5*T}L${x-1.8*T} ${ky+3.9*T}" stroke="${bg}" stroke-width="${T*.3}" fill="none"/>`;
    s+=`<path d="M${x} ${ky+5.2*T}V${tailEnd-T/2}" stroke="${col}" stroke-width="${T}" stroke-linecap="round" fill="none"/>`;
    // stopper knot (a barrel of wraps) with the tail left below it
    s+=`<rect x="${x-1.35*T}" y="${st}" width="${2.7*T}" height="${4.2*T}" rx="${T*1.1}" fill="${col}"/>`;
    s+=`<path d="M${x-1.35*T} ${st+1.75*T}l${2.7*T} ${-.7*T}M${x-1.35*T} ${st+3.15*T}l${2.7*T} ${-.7*T}" stroke="${bg}" stroke-width="${T*.3}" fill="none"/>`;
  });
  // anchor hardware, drawn over the rope: a bolt hanger plate and a carabiner with its gate
  anchors.forEach(a=>{
    hw+=`<rect x="${a-1.35*T}" y="${cTop}" width="${2.7*T}" height="${cH}" rx="${1.35*T}" fill="none" stroke="${anchor}" stroke-width="${T*.7}"/>`;
    hw+=`<path d="M${a+1.35*T} ${cTop+1.7*T}V${cBot-1.7*T}" stroke="${anchor}" stroke-width="${T*1.25}" stroke-linecap="round"/>`;
    hw+=`<path d="M${a-1.9*T} ${by-1.5*T}h${3.8*T}l${-.9*T} ${2.6*T}h${-2*T}z" fill="${anchor}"/><circle cx="${a}" cy="${by-.35*T}" r="${T*.55}" fill="${bg}"/>`;
  });
  return {g:s+hw,w,h:len};
}
function ropes(style,o={}){
  const u=o.unit||'mm', r=ropeG(style,o);
  return `<svg class="ropes" viewBox="0 0 ${r.w} ${r.h}" width="${r.w}${u}" height="${r.h}${u}" style="position:absolute;overflow:visible;${o.style||''}" aria-hidden="true">${r.g}</svg>`;
}
// drop-in for static pages: <i data-ropes data-len="40" data-t=".45" data-knot="#14170f" data-style="left:66mm;top:7mm"></i>
document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('[data-ropes]').forEach(el=>{const d=el.dataset;
  el.outerHTML=ropes(d.ropes,{len:+d.len,T:+d.t,anchor:d.anchor,knot:d.knot,unit:d.unit||'mm',style:d.style||''})}));
