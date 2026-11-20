/* Two Points — a little motion, nothing that holds the page. No dependencies. */
(function () {
  var root = document.documentElement;
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };

  /* Photos still on their way get the sheen, then are drawn in. Ones already loaded just appear. */
  $$('.ph img').forEach(function (img) {
    if (img.complete && img.naturalWidth) return;
    var box = img.parentNode;
    box.classList.add('wait');
    var done = function () { box.classList.add('loaded'); };
    img.addEventListener('load', done); img.addEventListener('error', done);
  });

  /* Hero film: plays only while it is on screen */
  var video = $('.film video');
  if (video && !calm && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } else video.pause();
    }, { threshold: 0.1 }).observe(video);
  }

  /* The drawing: two technicians come down the building on two lines each, cleaning as they go. At the bottom the
     ropes come off, the doors slide open, they walk in and take the lift back to the roof. Then it starts again. */
  var NS = 'http://www.w3.org/2000/svg';
  var tower = $('#tower'), wins = [];
  var scene = null;
  if (tower) {
    var winGroup = $('#tower-windows');
    [66, 112, 212, 258].forEach(function (x, c) {
      for (var r = 0; r < 8; r++) {
        var y = 120 + r * 48;
        var rect = document.createElementNS(NS, 'rect');
        rect.setAttribute('x', x); rect.setAttribute('y', y); rect.setAttribute('width', 36); rect.setAttribute('height', 34); rect.setAttribute('rx', 5);
        rect.setAttribute('class', 'win');
        var shine = document.createElementNS(NS, 'path');
        shine.setAttribute('d', 'M' + (x + 8) + ' ' + (y + 24) + 'L' + (x + 20) + ' ' + (y + 10)); shine.setAttribute('class', 'shine');
        winGroup.appendChild(rect); winGroup.appendChild(shine);
        wins.push({ rect: rect, mid: y + 17, who: c < 2 ? 0 : 1 });
      }
    });
    var seg = function (t, a, b) { return clamp((t - a) / (b - a)); };
    var ease = function (x) { return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };
    var lerp = function (a, b, t) { return a + (b - a) * t; };
    var LOOP = 15.4, ROOF = 30, EDGE = 106, GROUND = 543, SIZE = 1.32;
    var crew = [
      { el: $('#ab-a'), arm: $('#ab-a .arm'), cx: 107, door: 172, lag: 0, r1: $('#ra1'), r2: $('#ra2') },
      { el: $('#ab-b'), arm: $('#ab-b .arm'), cx: 253, door: 188, lag: .4, r1: $('#rb1'), r2: $('#rb2') }
    ];
    var ropes = $('#ropes'), doorL = $('#door-l'), doorR = $('#door-r');
    var lift = $('#lift'), liftOn = $('#lift-on'), ping = $('#lift-ping');
    scene = function (t) {
      var ys = [];
      crew.forEach(function (m) {
        var tt = t - m.lag;
        // over the edge, then down the wall
        var y = tt < 1 ? ROOF : tt < 1.9 ? lerp(ROOF, EDGE, ease(seg(tt, 1, 1.9))) : lerp(EDGE, GROUND, ease(seg(tt, 1.9, 8.2)));
        var onWall = seg(tt, 1.9, 2.6) * (1 - seg(tt, 7.6, 8.2));
        var x = m.cx + Math.sin(tt * 2.3) * 2.6 * onWall;
        ys.push(y);
        m.r1.setAttribute('x2', (x - 4.5).toFixed(1)); m.r1.setAttribute('y2', Math.max(47, y - 15).toFixed(1));
        m.r2.setAttribute('x2', (x + 4.5).toFixed(1)); m.r2.setAttribute('y2', Math.max(47, y - 15).toFixed(1));
        // ropes off, walk to the doors, and in
        var walk = ease(seg(t, 9.4, 10.9)), inside = seg(t, 10.35, 10.9);
        if (walk > 0) { x = lerp(m.cx, m.door, walk); if (walk < 1) y -= Math.abs(Math.sin(t * 11)) * 1.6; }
        var s = SIZE * (1 - .14 * inside);
        m.el.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + s.toFixed(3) + ')');
        m.el.setAttribute('opacity', (seg(tt, 0, .7) * (1 - inside)).toFixed(3));
        // the squeegee arm works the glass on the way down
        m.arm.setAttribute('transform', 'rotate(' + (Math.sin(tt * 5.2) * 16 * onWall).toFixed(1) + ' 5.5 -7)');
      });
      ropes.setAttribute('opacity', (seg(t, .8, 1.3) * (1 - seg(t, 8.7, 9.3))).toFixed(3));
      var open = ease(seg(t, 8.9, 9.5)) - ease(seg(t, 10.9, 11.5));
      doorL.setAttribute('transform', 'translate(' + (-27 * open).toFixed(1) + ' 0)');
      doorR.setAttribute('transform', 'translate(' + (27 * open).toFixed(1) + ' 0)');
      // the lift follows them down empty, then carries them back up
      var ly = t < 2 ? 122 : t < 8.6 ? lerp(122, 472, ease(seg(t, 2, 8.6))) : t < 11.5 ? 472 : lerp(472, 122, ease(seg(t, 11.5, 14)));
      lift.setAttribute('transform', 'translate(0 ' + ly.toFixed(1) + ')');
      liftOn.setAttribute('opacity', (seg(t, 11.2, 11.5) * (1 - seg(t, 14.5, 14.9))).toFixed(3));
      var pg = seg(t, 14, 14.9);
      ping.setAttribute('r', (14 + 12 * pg).toFixed(1)); ping.setAttribute('opacity', (pg > 0 && pg < 1 ? .8 * (1 - pg) : 0).toFixed(3));
      var fresh = t > 1.9 && t < 14.6;
      wins.forEach(function (w) { w.rect.classList.toggle('done', fresh && w.mid < ys[w.who] + 6); });
      return LOOP;
    };
  }
  /* It runs while it is on screen and waits while it is not. */
  function runScene() {
    var at = 0, last = null, visible = true;
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; if (!visible) last = null; }).observe(tower);
    function tick(now) {
      if (visible) {
        if (last !== null) at += Math.min(.1, (now - last) / 1000);
        last = now;
        var loop = scene(at);
        if (at >= loop) at -= loop;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* How a job runs: measure where the rings sit, so the line and its light work across or down the page */
  var steps = $('#steps');
  var stepItems = steps ? $$('li:not(.rail)', steps) : [];
  var stops = [];
  function layoutSteps() {
    if (!steps) return;
    // offsets, not on-screen boxes, so a part that is still gliding into place is measured where it will rest
    var pts = stepItems.map(function (li) { var g = $('.ring', li); return { x: li.offsetLeft + g.offsetLeft + g.offsetWidth / 2, y: li.offsetTop + g.offsetTop + g.offsetHeight / 2 }; });
    var first = pts[0], last = pts[pts.length - 1];
    var vertical = Math.abs(last.y - first.y) > Math.abs(last.x - first.x);
    var len = vertical ? last.y - first.y : last.x - first.x;
    steps.classList.toggle('v', vertical);
    steps.style.setProperty('--x', (vertical ? first.x - 1 : first.x) + 'px');
    steps.style.setProperty('--y', (vertical ? first.y : first.y - 1) + 'px');
    steps.style.setProperty('--len', len + 'px');
    steps.style.setProperty('--px', len + 'px');
    stops = pts.map(function (p) { return len ? ((vertical ? p.y - first.y : p.x - first.x) / len) : 0; });
  }
  function finishSteps() {
    steps.style.setProperty('--p', 1); steps.style.setProperty('--ro', 0);
    stepItems.forEach(function (li) { li.classList.add('on'); });
    stepItems[stepItems.length - 1].classList.add('done');
  }
  function runSteps() {
    var TRAVEL = 3600, HOLD = 1900, FADE = 950, REST = 450, t0 = null;
    var last = stepItems[stepItems.length - 1];
    function tick(now) {
      if (t0 === null) t0 = now;
      var t = now - t0;
      if (t < TRAVEL) {
        var x = t / TRAVEL, p = x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        steps.style.setProperty('--p', p.toFixed(4)); steps.style.setProperty('--ro', 1);
        stepItems.forEach(function (li, k) { if (p >= stops[k] - 0.01 && k < stepItems.length - 1) li.classList.add('on'); });
      } else if (t < TRAVEL + HOLD) {
        if (!last.classList.contains('done')) finishSteps();
      } else if (t < TRAVEL + HOLD + FADE) {
        // everything lit fades back to grey together
        steps.classList.add('fading');
      } else if (t < TRAVEL + HOLD + FADE + REST) {
        // already faded out, so clearing it here cannot be seen
        if (last.classList.contains('done')) {
          stepItems.forEach(function (li) { li.classList.remove('on', 'done'); });
          steps.style.setProperty('--p', 0);
          steps.classList.remove('fading');
        }
      } else { t0 = now; }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (steps) {
    layoutSteps();
    window.addEventListener('resize', layoutSteps);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutSteps);
  }

  /* Reveal each part once as it scrolls into view. Parts arriving together come in one after another. */
  if (!calm && 'IntersectionObserver' in window) {
    root.classList.add('anim');
    var parts = $$('section .head, .card, .point, .tower-card, .simple, .simple-list > div, .product, .steps li:not(.rail), .fact, .kit, .badge, .strip .ph, .story > *, .contact');
    parts.forEach(function (el) { el.classList.add('rv'); });
    var io = new IntersectionObserver(function (entries) {
      entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left; })
        .forEach(function (e, k) {
          io.unobserve(e.target);
          e.target.style.setProperty('--d', Math.min(k, 5) * 90 + 'ms'); e.target.classList.add('in');
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    parts.forEach(function (el) { io.observe(el); });

    var once = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        once.unobserve(e.target);
        setTimeout(runScene, 300);
      });
    }, { threshold: 0.45 });
    if (scene) { scene(0); once.observe(tower); }
    // the steps can be taller than a phone screen, so start them as soon as the first rows are in view
    if (steps) new IntersectionObserver(function (entries, o) {
      if (!entries[0].isIntersecting) return;
      o.disconnect(); layoutSteps(); setTimeout(runSteps, 500);
    }, { rootMargin: '0px 0px -25% 0px' }).observe(steps);
  } else {
    if (scene) scene(5.6);
    if (steps) finishSteps();
  }

  /* Which part of the page you are in, shown in the top band */
  var links = $$('.bar nav a[href^="#"]');
  var targets = links.map(function (a) { return $(a.getAttribute('href')); });
  var ticking = false;
  function mark() {
    ticking = false;
    var at = -1;
    targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= window.innerHeight * 0.4) at = i; });
    links.forEach(function (a, i) { a.classList.toggle('here', i === at); });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(mark); } }, { passive: true });
  mark();

  /* Phone menu */
  var menuBtn = $('.menu-btn');
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
  $$('.bar nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* Enquiry form: opens the visitor's email app, addressed to Joe */
  var form = $('#quote-form'), note = $('#form-note');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      ['name', 'email', 'message'].forEach(function (n) {
        var f = form.elements[n], v = f.value.trim();
        var bad = !v || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(v));
        f.classList.toggle('bad', bad);
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) { note.textContent = 'Please add your name, email and a few words about the job.'; return; }
      var val = function (n) { return form.elements[n].value.trim(); };
      var subject = 'Rope access enquiry from ' + val('name');
      var body = val('message') + '\n\nName: ' + val('name') + '\nEmail: ' + val('email') + (val('phone') ? '\nPhone: ' + val('phone') : '');
      window.location.href = 'mailto:Joe@twopoints.co.nz?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      note.textContent = 'Your email app should open with the enquiry ready to send. If it does not, call 021 0898 7180.';
    });
  }

  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
