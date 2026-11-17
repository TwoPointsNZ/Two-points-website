/* Two Points — motion and interaction. No dependencies. */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* ---- page load ---- */
  const loaded = () => root.classList.add('is-loaded');
  requestAnimationFrame(() => requestAnimationFrame(loaded));

  const video = $('.hero-video');
  if (video && !reduce) {
    const play = () => video.play().catch(() => {});
    play();
    // pause the loop when the hero is off screen
    new IntersectionObserver(([e]) => (e.isIntersecting ? play() : video.pause()), { threshold: 0.05 }).observe(video);
  }

  /* ---- reveal on arrival (plays once) ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  $$('[data-reveal], [data-clip], [data-draw], [data-steps]').forEach((el) => io.observe(el));

  /* ---- figures count up ---- */
  const countUp = (el) => {
    const to = +el.dataset.count;
    const from = el.dataset.from ? +el.dataset.from : 0;
    if (reduce || from === to) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1500;
    const tick = (now) => {
      const p = clamp((now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = from;
    requestAnimationFrame(tick);
  };
  setTimeout(() => $$('[data-count]').forEach(countUp), reduce ? 0 : 900);

  /* ---- statement: words ink in as you scroll ---- */
  const statement = $('[data-words]');
  let words = [];
  if (statement) {
    const text = statement.textContent.trim().split(/\s+/);
    statement.setAttribute('aria-label', text.join(' '));
    statement.innerHTML = text.map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    words = $$('.w', statement);
    if (reduce) words.forEach((w) => w.classList.add('on'));
  }

  /* ---- services: one open at a time, image wipes across ---- */
  const items = $$('.svc-item');
  const stageImgs = $$('.svc-frame img');
  const counter = $('.svc-counter b');
  const openService = (i) => {
    items.forEach((it, k) => {
      const on = k === i;
      it.classList.toggle('is-open', on);
      $('.svc-head', it).setAttribute('aria-selected', on);
    });
    stageImgs.forEach((im, k) => im.classList.toggle('is-on', k === i));
    if (counter) counter.textContent = String(i + 1).padStart(2, '0');
  };
  const hoverable = matchMedia('(hover: hover) and (min-width: 861px)');
  items.forEach((it, i) => {
    const head = $('.svc-head', it);
    head.addEventListener('click', () => openService(i));
    head.addEventListener('mouseenter', () => { if (hoverable.matches) openService(i); });
    head.addEventListener('focus', () => { if (hoverable.matches) openService(i); });
  });

  /* ---- projects carousel ---- */
  const car = $('#car');
  const bar = $('#car-bar');
  if (car) {
    const step = () => {
      const card = $('.card', car);
      return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(car).columnGap || 18) : 320;
    };
    const prev = $('[data-car="prev"]'), next = $('[data-car="next"]');
    const sync = () => {
      const max = car.scrollWidth - car.clientWidth;
      const p = max > 0 ? car.scrollLeft / max : 0;
      const view = car.clientWidth / car.scrollWidth;
      if (bar) bar.style.transform = `scaleX(${clamp(view + (1 - view) * p)})`;
      if (prev) prev.disabled = car.scrollLeft < 8;
      if (next) next.disabled = car.scrollLeft > max - 8;
    };
    prev && prev.addEventListener('click', () => car.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    next && next.addEventListener('click', () => car.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
    car.addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    car.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') car.scrollBy({ left: step(), behavior: 'smooth' });
      if (e.key === 'ArrowLeft') car.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    // drag to scroll with a mouse
    let down = false, startX = 0, startL = 0, moved = 0;
    car.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0; startX = e.clientX; startL = car.scrollLeft;
    });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX; moved = Math.abs(dx);
      if (moved > 4) car.classList.add('is-drag');
      car.scrollLeft = startL - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      setTimeout(() => car.classList.remove('is-drag'), 0);
    });
    car.addEventListener('click', (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
    sync();
  }

  /* ---- scroll loop: header, ropes, parallax, words ---- */
  const header = $('.header');
  const rope = $('.rope');
  const ropeNum = $('.rope-device b');
  const sections = $$('[data-rope]');
  const navLinks = $$('.nav a');
  const parallax = reduce ? [] : $$('[data-parallax]');
  let ticking = false;

  const frame = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    header.classList.toggle('is-stuck', y > 24);

    const max = document.documentElement.scrollHeight - vh;
    if (rope) rope.style.setProperty('--p', (max > 0 ? clamp(y / max) : 0).toFixed(4));

    let current = sections[0];
    for (const s of sections) if (s.getBoundingClientRect().top <= vh * 0.45) current = s;
    if (ropeNum && current && ropeNum.textContent !== current.dataset.rope) ropeNum.textContent = current.dataset.rope;
    navLinks.forEach((a) => {
      const target = $(a.getAttribute('href'));
      a.classList.toggle('is-here', !!target && (target === current || target.contains(current)));
    });

    for (const el of parallax) {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      const offset = (r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }

    if (words.length && !reduce) {
      const r = statement.getBoundingClientRect();
      const p = clamp((vh * 0.86 - r.top) / (r.height + vh * 0.36));
      const upto = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < upto));
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  frame();

  /* ---- mobile menu ---- */
  const menuBtn = $('.menu-btn');
  const setMenu = (open) => {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  navLinks.forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---- enquiry form: opens the visitor's email app, addressed to Joe ---- */
  const form = $('#quote-form');
  const note = $('#form-note');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = ['name', 'email', 'message'].map((n) => form.elements[n]);
      let ok = true;
      fields.forEach((f) => {
        const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value.trim()));
        f.classList.toggle('bad', bad);
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) { note.textContent = 'Please add your name, email and a few words about the job.'; return; }
      const v = (n) => form.elements[n].value.trim();
      const subject = `Rope access enquiry from ${v('name')}`;
      const body = `${v('message')}\n\nName: ${v('name')}\nEmail: ${v('email')}${v('phone') ? `\nPhone: ${v('phone')}` : ''}`;
      location.href = `mailto:Joe@twopoints.co.nz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      note.textContent = 'Your email app should open with the enquiry ready to send. If it does not, call 021 0898 7180.';
    });
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
