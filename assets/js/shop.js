/* Two Points shop — a small cart, and a Shopify checkout.

   TO CONNECT A REAL SHOPIFY STORE
   1. In Shopify admin, add the Headless sales channel and copy its public Storefront API access token.
   2. Fill in `domain` and `storefrontToken` below.
   3. For each product, paste its Shopify variant ID into `variants` (one per size where there are sizes).
   Until then the cart works as a preview and the checkout button explains that it is not connected. */
window.TP_SHOP = window.TP_SHOP || {
  domain: '',            // e.g. 'two-points.myshopify.com'
  storefrontToken: '',   // public Storefront API access token
  apiVersion: '2026-07',
  variants: {
    // 'tee:M': 'gid://shopify/ProductVariant/1234567890',
    // 'harness': 'gid://shopify/ProductVariant/1234567891'
  }
};

(function () {
  var CFG = window.TP_SHOP;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };
  var money = function (n) { return '$' + n.toFixed(2).replace(/\.00$/, ''); };
  var KEY = 'tp-cart-v1';

  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY) || '[]') || []; } catch (e) { cart = []; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }

  var drawer = $('#cart'), list = $('#cart-list'), totalEl = $('#cart-total'), note = $('#cart-note');
  var countEls = $$('[data-cart-count]'), checkoutBtn = $('#cart-checkout'), emptyEl = $('#cart-empty'), footEl = $('#cart-foot');
  var lastFocus = null;

  function count() { return cart.reduce(function (n, l) { return n + l.qty; }, 0); }
  function total() { return cart.reduce(function (n, l) { return n + l.qty * l.price; }, 0); }

  function render() {
    var n = count();
    countEls.forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
    list.innerHTML = '';
    cart.forEach(function (l, i) {
      var li = document.createElement('li');
      li.className = 'cart-line';
      li.innerHTML =
        '<img src="' + l.img + '" alt="" width="64" height="64">' +
        '<div class="cart-info"><b></b><span></span></div>' +
        '<div class="qty"><button type="button" aria-label="One fewer">−</button><output></output><button type="button" aria-label="One more">+</button></div>' +
        '<span class="cart-price"></span>';
      $('b', li).textContent = l.name;
      $('.cart-info span', li).textContent = (l.size ? 'Size ' + l.size + ' · ' : '') + money(l.price) + ' each';
      $('output', li).textContent = l.qty;
      $('.cart-price', li).textContent = money(l.qty * l.price);
      var btns = $$('button', li);
      btns[0].addEventListener('click', function () { l.qty -= 1; if (l.qty < 1) cart.splice(i, 1); save(); render(); });
      btns[1].addEventListener('click', function () { l.qty += 1; save(); render(); });
      list.appendChild(li);
    });
    emptyEl.hidden = n > 0; footEl.hidden = n === 0;
    totalEl.textContent = money(total());
    note.textContent = connected() ? 'Shipping and GST are worked out at checkout.' : 'Preview only. Checkout is not connected to a store yet.';
  }

  function connected() { return !!(CFG.domain && CFG.storefrontToken); }

  function open() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add('open'); });
    document.body.style.overflow = 'hidden';
    $('.cart-close', drawer).focus();
  }
  function close() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { drawer.hidden = true; }, 320);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$('[data-cart-open]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); open(); }); });
  $$('[data-cart-close]').forEach(function (b) { b.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) close(); });

  /* Product cards: pick a size where there is one, then add to the cart */
  $$('.product[data-id]').forEach(function (card) {
    var sizes = $$('.sizes button', card), size = '';
    sizes.forEach(function (b) {
      b.addEventListener('click', function () {
        size = b.textContent.trim();
        sizes.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        $('.sizes', card).classList.remove('need');
      });
    });
    $('.add', card).addEventListener('click', function () {
      if (sizes.length && !size) { $('.sizes', card).classList.add('need'); sizes[0].focus(); return; }
      var id = card.dataset.id, key = id + (size ? ':' + size : '');
      var line = cart.filter(function (l) { return l.key === key; })[0];
      if (line) line.qty += 1;
      else cart.push({ key: key, id: id, name: card.dataset.name, price: parseFloat(card.dataset.price), size: size, img: $('.pshot img', card).getAttribute('src'), qty: 1 });
      save(); render(); open();
    });
  });

  /* Checkout: build a Shopify cart from these lines and go to Shopify's own checkout page */
  checkoutBtn.addEventListener('click', function () {
    if (!connected()) {
      note.textContent = 'This is a preview. Once a Shopify store is connected, this button takes the customer to a secure Shopify checkout.';
      note.classList.add('flag');
      return;
    }
    var missing = cart.filter(function (l) { return !CFG.variants[l.key]; });
    if (missing.length) { note.textContent = 'Sorry, ' + missing[0].name + ' cannot be bought online yet. Please email Joe@twopoints.co.nz.'; note.classList.add('flag'); return; }
    checkoutBtn.disabled = true; checkoutBtn.textContent = 'Opening checkout…';
    var query = 'mutation($lines:[CartLineInput!]!){cartCreate(input:{lines:$lines}){cart{checkoutUrl} userErrors{message}}}';
    var lines = cart.map(function (l) { return { merchandiseId: CFG.variants[l.key], quantity: l.qty }; });
    fetch('https://' + CFG.domain + '/api/' + CFG.apiVersion + '/graphql.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': CFG.storefrontToken },
      body: JSON.stringify({ query: query, variables: { lines: lines } })
    }).then(function (r) { return r.json(); }).then(function (d) {
      var out = d && d.data && d.data.cartCreate;
      if (out && out.cart && out.cart.checkoutUrl) { window.location.href = out.cart.checkoutUrl; return; }
      throw new Error((out && out.userErrors && out.userErrors[0] && out.userErrors[0].message) || 'No checkout address came back');
    }).catch(function () {
      checkoutBtn.disabled = false; checkoutBtn.textContent = 'Checkout';
      note.textContent = 'Sorry, the checkout could not be opened. Please try again, or email Joe@twopoints.co.nz.'; note.classList.add('flag');
    });
  });

  render();
})();
