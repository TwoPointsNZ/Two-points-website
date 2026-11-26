// The two lines, drawn as rope rigging. One source for every piece in the suite.
// ropeG(variant, opts) -> SVG markup (a <g>) in its own units.   ropes(variant, opts) -> a positioned <svg>.
//   variant 'plain'  : two ropes hanging from two ring anchors (smallest sizes)
//   variant 'rigged' : the same, plus the backup device, the descender and the technician they both hold
//   variant 'plumb'  : two ropes that stop inside the piece with a stopper knot (for pages that can't print to the edge)
// opts: len (rope length), T (rope thickness), gap (between rope centres, default 5T), at (0-1, where the technician sits),
//       flecks (true = rope tracer marks, large formats only), tail ('#555b63' cow's-tail colour), unit ('mm'|'px')
let ropeN=0;
function ropeG(variant,o={}){
  const T=o.T||1, gap=o.gap||6.5*T, len=o.len||100, pad=3*T, x1=pad, x2=pad+gap, id='rp'+(ropeN++);
  const rR=2.1*T, ry=rR+T*.6, top=ry+rR;                    // ring anchors
  const end1=variant==='plumb'?len-7*T:len, end2=variant==='plumb'?len-1.6*T:len;
  const yb=top+(len-top)*(o.at??.42), yd=yb+6.5*T, yp=yd+6*T, xm=(x1+x2)/2;   // backup device, descender, technician
  let s=`<defs><linearGradient id="${id}a" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#14E0B4"/><stop offset="1" stop-color="#1FA9FF"/></linearGradient>
  <linearGradient id="${id}b" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6A5CFF"/><stop offset="1" stop-color="#F15BB5"/></linearGradient>
  <linearGradient id="${id}d" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#6A5CFF"/><stop offset="1" stop-color="#F15BB5"/></linearGradient></defs>`;
  s+=`<circle cx="${x1}" cy="${ry}" r="${rR}" fill="none" stroke="#14E0B4" stroke-width="${T}"/><circle cx="${x2}" cy="${ry}" r="${rR}" fill="none" stroke="#6A5CFF" stroke-width="${T}"/>`;
  s+=`<rect x="${x1-T/2}" y="${top}" width="${T}" height="${end1-top}" fill="url(#${id}a)"/><rect x="${x2-T/2}" y="${top}" width="${T}" height="${end2-top}" fill="url(#${id}b)"/>`;
  if(o.flecks) s+=`<path d="M${x1} ${top+3*T}V${end1}M${x2} ${top+6*T}V${end2}" stroke="#fff" stroke-opacity=".5" stroke-width="${T*.34}" stroke-dasharray="${T*1.1} ${T*5.4}" fill="none"/>`;
  if(variant==='plumb') s+=`<circle cx="${x1}" cy="${end1}" r="${T*1.25}" fill="#1FA9FF"/><circle cx="${x2}" cy="${end2}" r="${T*1.25}" fill="#F15BB5"/>`;
  if(variant==='rigged'){
    const tail=o.tail||'#8b9199';
    s+=`<path d="M${x2} ${yb+1.6*T}L${xm} ${yp}M${x1} ${yd+1.6*T}L${xm} ${yp}" stroke="${tail}" stroke-width="${T*.55}" stroke-linecap="round" fill="none"/>`;
    s+=`<rect x="${x2-1.25*T}" y="${yb-1.9*T}" width="${2.5*T}" height="${3.8*T}" rx="${T*.9}" fill="#6A5CFF"/>`;          // backup device rides high
    s+=`<rect x="${x1-1.25*T}" y="${yd-1.9*T}" width="${2.5*T}" height="${3.8*T}" rx="${T*.9}" fill="#1FA9FF"/>`;          // descender sits lower
    s+=`<circle cx="${xm}" cy="${yp}" r="${T*1.5}" fill="url(#${id}d)"/>`;                                                   // the technician: the brand full stop
  }
  return {g:s,w:gap+2*pad,h:len};
}
function ropes(variant,o={}){
  const u=o.unit||'mm', r=ropeG(variant,o);
  return `<svg class="ropes" viewBox="0 0 ${r.w} ${r.h}" width="${r.w}${u}" height="${r.h}${u}" style="position:absolute;overflow:visible;${o.style||''}" aria-hidden="true">${r.g}</svg>`;
}
// drop-in for static pages: <i data-ropes="rigged" data-len="61" data-t=".45" data-style="left:66mm;top:0"></i>
document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('[data-ropes]').forEach(el=>{const d=el.dataset;
  el.outerHTML=ropes(d.ropes,{len:+d.len,T:+d.t,gap:d.gap?+d.gap:undefined,at:d.at?+d.at:undefined,flecks:d.flecks==='1',tail:d.tail,unit:d.unit||'mm',style:d.style||''})}));
