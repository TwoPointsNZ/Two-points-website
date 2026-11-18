/* Two Points — motion and interaction. No dependencies. */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---- page load ---- */
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    if (reduce) heroTitle.classList.add('settled', 'dot-in');
    else {
      setTimeout(() => heroTitle.classList.add('settled'), 1350);
      setTimeout(() => heroTitle.classList.add('dot-in'), 1500);
    }
  }

  /* stepper: runner travels left to right, steps pop as it passes, last one ticks + pulses, then loops */
  const stepper = $('.stepper');
  if (stepper) {
    const items = $$('li', stepper);
    const n = items.length;
    const setP = (p) => stepper.style.setProperty('--p', p.toFixed(4));
    if (reduce) {
      setP(1); items.forEach((li) => li.classList.add('on')); items[n - 1].classList.add('done', 'crisp');
    } else {
      const TRAVEL = 3400, HOLD = 1500, RESET = 500;
      let t0 = null, last = -1;
      const ease = (x) => (x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
      const tick = (now) => {
        if (t0 === null) t0 = now;
        const t = now - t0;
        if (t < TRAVEL) {
          const p = ease(t / TRAVEL);
          setP(p);
          stepper.style.setProperty('--ro', 1);
          const reached = Math.floor(p * (n - 1) + 0.02);
          if (reached !== last) {
            for (let k = 0; k <= reached && k < n; k++) items[k].classList.add('on');
            last = reached;
          }
        } else if (t < TRAVEL + HOLD) {
          if (!items[n - 1].classList.contains('done')) {
            setP(1); items.forEach((li) => li.classList.add('on'));
            items[n - 1].classList.add('done');
            setTimeout(() => items[n - 1].classList.add('crisp'), 650);
            stepper.style.setProperty('--ro', 0);
          }
        } else if (t < TRAVEL + HOLD + RESET) {
          if (items[0].classList.contains('on')) {
            items.forEach((li) => li.classList.remove('on', 'done', 'crisp'));
            setP(0);
          }
        } else {
          items.forEach((li) => li.classList.remove('on', 'done', 'crisp'));
          t0 = now; last = -1;
        }
        requestAnimationFrame(tick);
      };
      // start only once the headline's full stop has dropped in and pulsed
      let started = false;
      const start = () => { if (!started) { started = true; requestAnimationFrame(tick); } };
      const dot = document.querySelector('.hero-title .rb-word i');
      if (dot) dot.addEventListener('animationend', (e) => { if (e.animationName === 'dotring') setTimeout(start, 150); });
      setTimeout(start, 4200);
    }
  }

  /* hero film */
  const video = $('.hero-video');
  if (video && !reduce) {
    const play = () => video.play().catch(() => {});
    new IntersectionObserver(([e]) => (e.isIntersecting ? play() : video.pause()), { threshold: 0.05 }).observe(video);
  }

  /* ---- arrive on scroll (plays once) ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
  $$('[data-reveal]').forEach((el) => io.observe(el));
  $$('[data-mk]').forEach((el) => {
    const sibs = $$('[data-mk]', el.closest('dl, p, section') || document);
    el.style.setProperty('--d', `${0.5 + sibs.indexOf(el) * 0.16}s`);
    io.observe(el);
  });

  /* ---- sound wave: bars rise in from the centre line ---- */
  const wave = $('[data-wave]');
  if (wave) {
    $$('rect', wave).forEach((b, k) => b.style.setProperty('--k', k));
    io.observe(wave);
  }

  /* ---- words ink in with scroll ---- */
  const quote = $('[data-words]');
  let words = [];
  if (quote) {
    const text = quote.textContent.trim().split(/\s+/);
    quote.setAttribute('aria-label', text.join(' '));
    quote.innerHTML = text.map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    words = $$('.w', quote);
  }

  /* ---- services tabs: one line glides between them ---- */
  const tablist = $('.tabs');
  const tabs = $$('[role="tab"]', tablist);
  const panels = $$('.panel');
  const moveLine = () => {
    const on = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    if (!on) return;
    tablist.style.setProperty('--x', `${on.offsetLeft}px`);
    tablist.style.setProperty('--w', `${on.offsetWidth}px`);
  };
  const selectTab = (i, focus) => {
    tabs.forEach((t, k) => {
      const on = k === i;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      panels[k].hidden = !on;
      panels[k].classList.toggle('is-on', on);
    });
    moveLine();
    if (focus) tabs[i].focus();
    tabs[i].scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') selectTab((i + 1) % tabs.length, true);
      if (e.key === 'ArrowLeft') selectTab((i - 1 + tabs.length) % tabs.length, true);
    });
  });
  moveLine();
  document.fonts && document.fonts.ready.then(moveLine);
  addEventListener('resize', moveLine);

  /* ---- the descent: build the tower ---- */
  const NS = 'http://www.w3.org/2000/svg';
  const winGroup = $('#tower-windows');
  const wins = [];
  if (winGroup) {
    for (let r = 0; r < 8; r++) for (let c = 0; c < 4; c++) {
      const x = 82 + c * 52, y = 88 + r * 52;
      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', x); rect.setAttribute('y', y); rect.setAttribute('width', 40); rect.setAttribute('height', 36); rect.setAttribute('rx', 5);
      rect.setAttribute('class', 'win');
      const shine = document.createElementNS(NS, 'path');
      shine.setAttribute('d', `M${x + 9} ${y + 25}L${x + 22} ${y + 10}`); shine.setAttribute('class', 'shine');
      winGroup.append(rect, shine);
      wins.push({ rect, mid: y + 18, col: c });
    }
  }
  const descent = $('.descent');
  const tech = $('#tech'), ropeA = $('#rope-a'), ropeB = $('#rope-b');
  const beats = $$('.beats li');
  const descentBar = $('#descent-bar');
  let beatOn = -1;
  const setDescent = (p) => {
    const y = lerp(82, 474, p);
    // a small pendulum sway, strongest mid-descent
    const sway = reduce ? 0 : Math.sin(p * Math.PI * 7) * 5 * Math.sin(p * Math.PI);
    tech.setAttribute('transform', `translate(${sway.toFixed(2)} ${y.toFixed(1)})`);
    ropeA.setAttribute('x2', (166 + sway).toFixed(2)); ropeA.setAttribute('y2', y.toFixed(1));
    ropeB.setAttribute('x2', (194 + sway).toFixed(2)); ropeB.setAttribute('y2', y.toFixed(1));
    wins.forEach((w) => w.rect.classList.toggle('done', w.mid < y + 8 + (w.col === 0 || w.col === 3 ? 10 : 0)));
    const i = Math.min(beats.length - 1, Math.floor(p * beats.length));
    if (i !== beatOn) { beatOn = i; beats.forEach((b, k) => b.classList.toggle('is-on', k === i)); }
    if (descentBar) descentBar.style.transform = `scaleX(${p.toFixed(4)})`;
  };

  /* ---- scroll loop ---- */
  const bar = $('.progress i');
  const stage = $('.stage');
  const drop = $('[data-drop]');
  const dropImgs = drop ? $$('.drop-img', drop) : [];
  const dropTexts = drop ? $$('.drop-text', drop) : [];
  const dropDots = drop ? $$('.drop-dots i', drop) : [];
  const dropCol = drop ? $('.drop-col', drop) : null;
  const dropEdge = drop ? $('.drop-edge', drop) : null;
  let dropIdx = 0;
  const reel = $('[data-reel]');
  const parallax = reduce ? [] : $$('[data-parallax]');
  const drifters = reduce ? [] : $$('[data-drift]');
  const sections = $$('main section[id]');
  const navLinks = $$('.nav a[href^="#"]');
  let ticking = false;

  const frame = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    const max = root.scrollHeight - vh;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;

    // hero stage grows into place as it rises
    if (stage && !reduce) {
      const r = stage.getBoundingClientRect();
      const t = clamp((vh - r.top) / (vh * 0.75));
      stage.style.transform = `scale(${lerp(0.93, 1, t).toFixed(4)})`;
    }

    if (descent && tech) {
      const r = descent.getBoundingClientRect();
      setDescent(clamp(-r.top / (r.height - vh)));
    }

    // projects: each photo abseils down over the last
    if (drop && dropImgs.length) {
      const r = drop.getBoundingClientRect();
      const n = dropImgs.length;
      const p = clamp(-r.top / Math.max(1, r.height - vh)) * (n - 1);
      let idx = 0, edge = 0, edgeOn = 0;
      for (let k = 1; k < n; k++) {
        const local = clamp((p - (k - 1) - 0.12) / 0.76);
        const s = local * local * (3 - 2 * local);
        dropImgs[k].style.setProperty('--h', (1 - s).toFixed(4));
        dropImgs[k].style.setProperty('--r', s.toFixed(4));
        if (s > 0.5) idx = k;
        if (s > 0.001 && s < 0.999) { edge = s; edgeOn = 1; }
      }
      if (dropEdge) { dropEdge.style.setProperty('--e', edge.toFixed(4)); dropEdge.style.setProperty('--eo', edgeOn); }
      if (idx !== dropIdx) {
        dropIdx = idx;
        dropTexts.forEach((t, k) => t.classList.toggle('is-on', k === idx));
        dropDots.forEach((d, k) => d.classList.toggle('is-on', k === idx));
        if (dropCol) dropCol.style.setProperty('--idx', idx);
      }
    }

    if (reel && !reduce) {
      const r = reel.parentElement.getBoundingClientRect();
      const t = clamp((vh - r.top) / (vh + r.height));
      const travel = Math.max(0, reel.scrollWidth - innerWidth + 40);
      reel.style.transform = `translate3d(${(20 - t * travel).toFixed(1)}px, 0, 0)`;
    }

    for (const el of drifters) {
      const r = (el.closest('.flash') || el.parentElement).getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      el.style.setProperty('--dy', `${(r.top * parseFloat(el.dataset.drift)).toFixed(1)}px`);
    }

    for (const el of parallax) {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.parallax)).toFixed(1)}px, 0)`;
    }

    if (words.length) {
      if (reduce) words.forEach((w) => w.classList.add('on'));
      else {
        const r = quote.getBoundingClientRect();
        const upto = Math.round(clamp((vh * 0.88 - r.top) / (vh * 0.42)) * words.length);
        words.forEach((w, i) => w.classList.toggle('on', i < upto));
      }
    }

    let current = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= vh * 0.4) current = s;
    navLinks.forEach((a) => a.classList.toggle('is-here', !!current && a.getAttribute('href') === `#${current.id}`));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  addEventListener('load', frame);
  frame();

  /* ---- buttons lean toward the pointer ---- */
  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.btn').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / r.width, dy = (e.clientY - r.top - r.height / 2) / r.height;
        b.style.transform = `translate(${(dx * 8).toFixed(1)}px, ${(dy * 6 - 1).toFixed(1)}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  /* ---- mobile menu ---- */
  const menuBtn = $('.menu-btn');
  const setMenu = (open) => {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  $$('.nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
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
