/* Two Points — a little motion, nothing that holds the page. No dependencies. */
(function () {
  var root = document.documentElement;
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };

  /* Hero film: plays only while it is on screen */
  var video = $('.film video');
  if (video && !calm && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } else video.pause();
    }, { threshold: 0.1 }).observe(video);
  }

  /* The drawing: a technician on two lines. Build the windows. */
  var NS = 'http://www.w3.org/2000/svg';
  var winGroup = $('#tower-windows'), wins = [];
  if (winGroup) {
    for (var r = 0; r < 8; r++) for (var c = 0; c < 4; c++) {
      var x = 82 + c * 52, y = 88 + r * 52;
      var rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('x', x); rect.setAttribute('y', y); rect.setAttribute('width', 40); rect.setAttribute('height', 36); rect.setAttribute('rx', 5);
      rect.setAttribute('class', 'win');
      var shine = document.createElementNS(NS, 'path');
      shine.setAttribute('d', 'M' + (x + 9) + ' ' + (y + 25) + 'L' + (x + 22) + ' ' + (y + 10)); shine.setAttribute('class', 'shine');
      winGroup.appendChild(rect); winGroup.appendChild(shine);
      wins.push({ rect: rect, mid: y + 18 });
    }
  }
  var tech = $('#tech'), ropeA = $('#rope-a'), ropeB = $('#rope-b');
  function setTower(p) {
    var y = 82 + (474 - 82) * p;
    tech.setAttribute('transform', 'translate(0 ' + y.toFixed(1) + ')');
    ropeA.setAttribute('y2', y.toFixed(1)); ropeB.setAttribute('y2', y.toFixed(1));
    wins.forEach(function (w) { w.rect.classList.toggle('done', w.mid < y + 10); });
  }
  /* It descends once, when the drawing scrolls into view, then rests at the bottom with every window done. */
  function runTower() {
    var t0 = null, dur = 5200;
    function tick(now) {
      if (t0 === null) t0 = now;
      var t = clamp((now - t0) / dur);
      setTower(t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      if (t < 1) requestAnimationFrame(tick);
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
    var TRAVEL = 3600, HOLD = 1700, RESET = 500, t0 = null;
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
      } else if (t < TRAVEL + HOLD + RESET) {
        if (last.classList.contains('done')) {
          stepItems.forEach(function (li) { li.classList.remove('on', 'done'); });
          steps.style.setProperty('--p', 0);
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
    var parts = $$('section .head, .card, .point, .tower-card, .steps li:not(.rail), .fact, .badge, .strip img, .story > *, .contact');
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
        setTimeout(runTower, 300);
      });
    }, { threshold: 0.45 });
    if (tech) once.observe($('#tower'));
    // the steps can be taller than a phone screen, so start them as soon as the first rows are in view
    if (steps) new IntersectionObserver(function (entries, o) {
      if (!entries[0].isIntersecting) return;
      o.disconnect(); layoutSteps(); setTimeout(runSteps, 500);
    }, { rootMargin: '0px 0px -25% 0px' }).observe(steps);
  } else {
    if (tech) setTower(1);
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
