// Van livery overlays. Blank van photos are mock-up bases only (made with Higgsfield); every graphic on top is the real vector artwork.
// side(concept, {mirror, dark}) and rear(concept) return an HTML string: the photo with an inline SVG overlay in the photo's own pixel grid.
const VL='../../00-foundations/logos/two-points/';
const G=id=>`<defs>
  <linearGradient id="${id}h" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#14E0B4"/><stop offset=".38" stop-color="#1FA9FF"/><stop offset=".7" stop-color="#6A5CFF"/><stop offset="1" stop-color="#F15BB5"/></linearGradient>
  <linearGradient id="${id}v1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#14E0B4"/><stop offset="1" stop-color="#1FA9FF"/></linearGradient>
  <linearGradient id="${id}v2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6A5CFF"/><stop offset="1" stop-color="#F15BB5"/></linearGradient>
  <linearGradient id="${id}d" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#6A5CFF"/><stop offset="1" stop-color="#F15BB5"/></linearGradient>
  <linearGradient id="${id}w" x1="0" x2="1"><stop offset="0" stop-color="#0FC9A0"/><stop offset=".4" stop-color="#1893E8"/><stop offset=".75" stop-color="#5647EE"/><stop offset="1" stop-color="#DC47A0"/></linearGradient>
  <mask id="${id}arch"><rect width="1344" height="752" fill="#fff"/><circle cx="357" cy="497" r="80" fill="#000"/><circle cx="972" cy="497" r="80" fill="#000"/></mask></defs>`;
let vn=0;
const T=(x,y,size,txt,o={})=>`<text x="${x}" y="${y}" font-family="Plus Jakarta Sans" font-weight="${o.w||800}" font-size="${size}" letter-spacing="${o.ls!==undefined?o.ls:-size*0.03}" fill="${o.fill||'#15171a'}" text-anchor="${o.a||'start'}">${txt}</text>`;

function side(concept,{mirror=false,dark=false}={}){
  const id='v'+(vn++), ink=dark?'#f2f4ef':'#15171a', ink2=dark?'#c9cec4':'#555b63', logo=VL+(dark?'two-points-logo-vector-white.svg':'two-points-logo-vector-ink.svg');
  const blend=dark?'screen':'multiply';
  // x positions are given for the kerb side (van facing left); mx() flips a box for the driver's side.
  const mx=(x,w=0)=>mirror?1344-x-w:x;
  const anchor=mirror?'end':'start', tx=(x)=>mirror?1344-x:x;
  let s='';
  if(dark){ // grey van photo has a different crop: scale artwork from the white van's grid
  }
  if(concept==='A'){ // Letterhead: dark sill band + Alpenglow line, logo on the door, phone on the rear quarter
    s+=`<g mask="url(#${id}arch)"><rect x="${mx(405,515)}" y="441" width="515" height="82" fill="#14170f" opacity=".93"/><rect x="${mx(405,515)}" y="436" width="515" height="5" fill="url(#${id}h)"/></g>`;
    s+=`<image href="${logo}" x="${mx(660,196)}" y="212" width="196" height="97.6" style="mix-blend-mode:${blend}"/>`;
    s+=`<g style="mix-blend-mode:${blend}">${T(tx(904),248,25,'021 0898 7180',{fill:ink,a:anchor})}${T(tx(905),274,14.5,'twopoints.co.nz',{fill:ink2,w:700,ls:0,a:anchor})}</g>`;
  }
  if(concept==='B'){ // Two lines: working line + backup line hanging down the side
    s+=`<rect x="${mx(856,5)}" y="192" width="5" height="322" fill="url(#${id}v1)"/><rect x="${mx(870,5)}" y="192" width="5" height="322" fill="url(#${id}v2)"/>`;
    s+=`<circle cx="${mx(858.5)}" cy="192" r="6.5" fill="#14E0B4"/><circle cx="${mx(872.5)}" cy="192" r="6.5" fill="#6A5CFF"/>`;
    s+=`<g style="mix-blend-mode:${blend}">${T(tx(652),246,26,'021 0898 7180',{fill:ink,a:anchor})}${T(tx(653),273,15,'twopoints.co.nz',{fill:ink2,w:700,ls:0,a:anchor})}${T(tx(653),305,8.6,'INDUSTRIAL ROPE ACCESS',{fill:ink2,w:700,ls:1.6,a:anchor})}</g>`;
    s+=`<image href="${logo}" x="${mx(905,168)}" y="214" width="168" height="83.6" style="mix-blend-mode:${blend}"/>`;
  }
  if(concept==='C'){ // Headline: the website hero on the van
    s+=`<g style="mix-blend-mode:${blend}">${T(mirror?tx(1075):650,228,11.5,'The number one rule of rope access:',{fill:ink2,w:600,ls:0,a:mirror?'end':'start'})}
       <text x="${mirror?tx(1075)-14:648}" y="300" font-family="Plus Jakarta Sans" font-weight="800" font-size="74" letter-spacing="-4" fill="${ink}" text-anchor="${mirror?'end':'start'}">Two points<tspan fill="url(#${id}d)" style="mix-blend-mode:normal">.</tspan></text></g>`;
    s+=`<g style="mix-blend-mode:${blend}">${T(tx(650),392,21,'021 0898 7180',{fill:ink,a:anchor})}${T(tx(651),415,12.5,'twopoints.co.nz',{fill:ink2,w:700,ls:0,a:anchor})}</g>`;
    s+=`<image href="${logo}" x="${mx(447,128)}" y="362" width="128" height="63.7" style="mix-blend-mode:${blend}"/>`;
  }
  const img=dark?'side-grey.png':'side-white.png';
  // the grey van photo is framed a touch differently: nudge the overlay to its body
  const fit=dark?'transform:translate(-128px,-57px) scale(1.2);transform-origin:0 0':'';
  return `<div class="van" style="position:relative;width:1344px;height:752px;overflow:hidden"><img src="../img/${img}" style="width:1344px;height:752px;${mirror?'transform:scaleX(-1)':''}">
    <svg viewBox="0 0 1344 752" width="1344" height="752" style="position:absolute;inset:0;${fit}">${G(id)}${s}</svg></div>`;
}

function rear(concept){
  const id='v'+(vn++), logo=VL+'two-points-logo-vector-ink.svg'; let s='';
  s+=`<image href="${logo}" x="330" y="165" width="210" height="104.5" style="mix-blend-mode:multiply"/>`;
  s+=`<g style="mix-blend-mode:multiply">${T(718,214,28,'021 0898 7180',{a:'middle'})}${T(718,247,17,'twopoints.co.nz',{fill:'#555b63',w:700,ls:0,a:'middle'})}</g>`;
  s+=`<g style="mix-blend-mode:multiply"><text x="437" y="478" font-family="Plus Jakarta Sans" font-weight="600" font-size="19" fill="#555b63" text-anchor="middle">Because ladders only go <tspan font-weight="800" fill="url(#${id}w)">so far</tspan></text></g><circle cx="552" cy="475" r="2.4" fill="url(#${id}d)"/>`;
  if(concept==='A') s+=`<rect x="286" y="640" width="596" height="6" fill="url(#${id}h)"/>`;
  if(concept==='B') s+=`<rect x="838" y="126" width="5" height="520" fill="url(#${id}v1)"/><rect x="853" y="126" width="5" height="520" fill="url(#${id}v2)"/><circle cx="840.5" cy="126" r="6.5" fill="#14E0B4"/><circle cx="855.5" cy="126" r="6.5" fill="#6A5CFF"/>`;
  return `<div class="van" style="position:relative;width:1168px;height:880px;overflow:hidden"><img src="../img/rear-white.png" style="width:1168px;height:880px">
    <svg viewBox="0 0 1168 880" width="1168" height="880" style="position:absolute;inset:0">${G(id)}${s}</svg></div>`;
}
