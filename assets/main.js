// Quadrupple – main page. All texts come from content/site.json (editable in the dashboard).
(function () {
  var ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></svg>';
  function h(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function br(s) { return h(s).replace(/\n/g, '<br>'); }
  function noise(i) {
    return '<svg class="noise" aria-hidden="true"><filter id="pn' + i + '"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="' + (i * 7) + '"/><feColorMatrix values="0 0 0 0 0.55 0 0 0 0 0.42 0 0 0 0 0.25 0 0 0 0.35 0"/></filter><rect width="100%" height="100%" filter="url(#pn' + i + ')"/></svg>';
  }
  var TILT = [-0.8, 0.7, -0.5, 0.9, -0.7, 0.5, -0.6, 0.8, -0.4, 0.6];

  fetch('content/site.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(render);

  function render(d) {
    var app = document.getElementById('app');
    var out = '';
    out += '<audio id="song" src="' + h(d.song) + '" preload="none" loop></audio>';
    out += '<button type="button" class="music" id="musicBtn" aria-label="Play our song"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg><span id="musicTxt">' + h(d.song_button) + '</span></button>';

    // hero
    out += '<div class="hero"><div class="hero-stick">';
    d.hero_images.forEach(function (im, i) {
      out += '<img class="layer hero-layer" src="' + h(im.image) + '" alt="' + (i === 0 ? 'The farm in the Spanish mountains' : '') + '" style="opacity:' + (i === 0 ? 1 : 0) + '">';
    });
    out += '<div class="hero-text"><h1 class="f-brand">' + h(d.brand) + '</h1><p class="slogan">';
    d.slogan.forEach(function (s) { out += '<span><b>' + h(s.big) + '</b> ' + h(s.rest) + '</span>'; });
    out += '</p></div><div class="hero-bottom"><span class="pill f-hand stage" id="stage">' + h(d.hero_images[0].stage) + '</span>';
    out += '<span class="pill f-label scroll-hint">Scroll <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span></div></div></div>';

    // welcome
    var w = d.welcome;
    out += '<div class="band"><div class="band-inner"><p class="f-label accent">' + h(w.label) + '</p><h2 class="f-head">' + h(w.heading) + '</h2><p class="lead">' + br(w.text) + '</p><p style="font-size:15px;color:#5E554A">' + h(w.question) + '</p></div></div>';

    // walk
    var scenes = d.walk.slice();
    out += '<div class="walk" id="walk"><div class="walk-stick">';
    scenes.forEach(function (c, i) { out += '<img class="layer walk-layer" src="' + h(c.image) + '" alt="" style="opacity:' + (i === 0 ? 1 : 0) + '">'; });
    out += '<img class="layer walk-layer" src="' + h(d.quote.image) + '" alt="" style="opacity:0;object-position:center 45%">';
    out += '</div><div class="cards">';
    scenes.forEach(function (c, i) {
      out += '<div class="slot"><article class="paper' + (c.dark ? ' dark' : '') + '" style="transform:rotate(' + TILT[i % 10] + 'deg)">' + noise(i + 1);
      out += '<p class="f-label accent" style="margin:0">' + h(c.label) + '</p><h3 class="f-head">' + h(c.title) + '</h3>';
      if (c.subtitle) out += '<p class="f-hand sub" style="margin:0">' + h(c.subtitle) + '</p>';
      if (c.text) out += '<p class="body">' + br(c.text) + '</p>';
      if (c.rows && c.rows.length) {
        out += '<div class="rows">';
        c.rows.forEach(function (r) { out += '<div class="row"><span><b>' + h(r.name) + '</b>' + (r.detail ? ' — ' + h(r.detail) : '') + '</span><span class="p">' + h(r.price) + '</span></div>'; });
        out += '</div>';
      }
      if (c.price || c.button) {
        out += '<div class="foot">' + (c.price ? '<span class="f-hand price">' + h(c.price) + '</span>' : '<span></span>');
        if (c.button) out += '<a class="btn btn-leather" href="mailto:' + h(d.contact.email) + '?subject=' + encodeURIComponent(c.email_subject || c.title) + '">' + h(c.button) + ARROW + '</a>';
        out += '</div>';
      }
      if (c.page) out += '<a class="more f-hand" href="craft.html?c=' + encodeURIComponent(c.page) + '">' + h(c.page_link || 'Discover more') + ARROW + '</a>';
      out += '</article></div>';
    });
    var q = d.quote;
    out += '<div class="slot"><blockquote class="paper dark quote" style="transform:rotate(-0.5deg)">' + noise(99) + '<p class="f-label">' + h(q.label) + '</p><p class="q">' + br(q.text) + '</p><p class="f-brand w">' + h(q.word) + '</p></blockquote></div>';
    out += '</div></div>';

    // contact
    var ct = d.contact;
    out += '<div class="band" style="padding-bottom:72px"><div class="band-inner"><p class="f-label accent">' + h(ct.label) + '</p><h2 class="f-head">' + h(ct.heading) + '</h2><p class="lead">' + br(ct.text) + '</p>';
    out += '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:8px"><a class="btn btn-leather" href="mailto:' + h(ct.email) + '">' + h(ct.email) + '</a>';
    if (ct.whatsapp) out += '<a class="chip" href="https://wa.me/' + h(String(ct.whatsapp).replace(/[^0-9]/g, '')) + '">WhatsApp ' + h(ct.whatsapp) + '</a>';
    out += '</div>';
    if (ct.crypto) out += '<p class="f-hand crypto">' + h(ct.crypto) + '</p>';
    out += '</div></div>';

    out += '<footer class="site"><span class="f-brand">' + h(d.brand) + '</span><span style="font-size:14px">' + h(d.footer) + '</span><span style="font-size:13px">© Quadrupple · quadrupple.art</span></footer>';
    app.innerHTML = out;
    wire(d);
  }

  function wire(d) {
    var hero = document.querySelectorAll('.hero-layer');
    var walk = document.querySelectorAll('.walk-layer');
    var stage = document.getElementById('stage');
    var walkEl = document.getElementById('walk');
    function clamp(v) { return Math.max(0, Math.min(1, v)); }
    function onScroll() {
      var vh = window.innerHeight || 800;
      var p = Math.max(0, Math.min(hero.length - 1, window.scrollY / vh));
      for (var i = 1; i < hero.length; i++) hero[i].style.opacity = clamp(p - (i - 1));
      stage.textContent = d.hero_images[Math.min(hero.length - 1, Math.round(p))].stage;
      var top = walkEl.getBoundingClientRect().top + window.scrollY;
      var q = (window.scrollY - top) / vh;
      for (var j = 1; j < walk.length; j++) walk[j].style.opacity = clamp((q - j) * 1.6 + 1);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    var song = document.getElementById('song'), btn = document.getElementById('musicBtn'), txt = document.getElementById('musicTxt');
    btn.addEventListener('click', function () {
      if (song.paused) { song.volume = 0.6; song.play().then(function () { txt.textContent = d.song_button_off; btn.setAttribute('aria-label', 'Pause the song'); }).catch(function () {}); }
      else { song.pause(); txt.textContent = d.song_button; btn.setAttribute('aria-label', 'Play our song'); }
    });
  }
})();
