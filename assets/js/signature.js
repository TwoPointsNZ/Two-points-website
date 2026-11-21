/* Copies the email signature as rich HTML, so it pastes into Gmail with images and links intact. */
(function () {
  var btn = document.getElementById('copy'), sig = document.getElementById('sig'), status = document.getElementById('status');
  if (!btn || !sig) return;
  var say = function (t) { status.textContent = t; setTimeout(function () { status.textContent = ''; }, 4000); };
  var fallback = function () {
    var r = document.createRange(); r.selectNodeContents(sig);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
    s.removeAllRanges();
    say(ok ? 'Copied. Now paste it into Gmail.' : 'Select the signature above and copy it (Ctrl/Cmd + C).');
  };
  btn.addEventListener('click', function () {
    if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
      var html = sig.innerHTML, text = sig.innerText;
      navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' })
      })]).then(function () { say('Copied. Now paste it into Gmail.'); }, fallback);
    } else fallback();
  });
})();
