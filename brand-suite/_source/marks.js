// adds crop marks + a slug line to every .print sheet
document.querySelectorAll('.print').forEach(p=>{
  const mm=v=>v+'mm', cs=getComputedStyle(p);
  const W=parseFloat(p.style.getPropertyValue('--w')), H=parseFloat(p.style.getPropertyValue('--h'));
  const L=10, T=10, R=10+W, B=10+H, len=5, gap=4, t=0.1;
  const add=(x,y,w,h)=>{const i=document.createElement('i');i.className='mk';i.style.cssText=`left:${x}mm;top:${y}mm;width:${w}mm;height:${h}mm`;p.appendChild(i)};
  [[L,T],[R,T],[L,B],[R,B]].forEach(([x,y])=>{
    add(x-t/2, y===T? T-gap-len : B+gap, t, len);
    add(x===L? L-gap-len : R+gap, y-t/2, len, t);
  });
  const s=document.createElement('div');s.className='slug';
  s.textContent=`Two Points Ltd · ${p.dataset.name||''} · trim ${W} × ${H} mm · 3 mm bleed · supplied RGB`;p.appendChild(s);
});
