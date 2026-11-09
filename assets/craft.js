// Quadrupple – craft detail page. Content comes from content/crafts/<name>.json (editable in the dashboard).
(function () {
  var ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></svg>';
  var BACK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H6"/><path d="M11 6l-6 6 6 6"/></svg>';
  function h(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function br(s) { return h(s).replace(/\n/g, '<br>'); }
  var name = (new URLSearchParams(location.search).get('c') || '').replace(/[^a-z0-9-]/g, '');
  var app = document.getElementById('app');
  if (!name) { location.href = 'index.html'; return; }

  Promise.all([
    fetch(QLANG.base + 'crafts/' + name + '.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw 0; return r.json(); }),
    fetch(QLANG.base + 'site.json', { cache: 'no-cache' }).then(function (r) { return r.json(); })
  ]).then(function (res) { render(res[0], res[1]); }).catch(function () { location.href = 'index.html'; });

  function render(c, site) {
    document.title = 'Quadrupple – ' + c.title.replace(/^[^…]*…\s*/, '');
    var root = document.getElementById('page');
    root.className = 'cp t-' + (c.theme || 'rustic') + ' c-' + name;
    var email = site.contact.email;
    var o = '';
    var ui = site.ui || {};
    o += '<nav><a href="' + QLANG.link('index.html') + '">' + BACK + h(ui.back || 'Back to the farm') + '</a>' + QLANG.switcher(ui.lang) + '<span class="f-brand">' + h(site.brand) + '</span></nav>';
    o += '<header><img src="' + h(c.image) + '" alt="' + h(c.image_alt) + '"><div class="shade"></div><div class="t"><p class="f-label" style="margin:0">' + h(c.label) + '</p><h1 class="f-head">' + h(c.title) + '</h1>' + (c.subtitle ? '<p class="f-hand s">' + h(c.subtitle) + '</p>' : '') + '</div></header>';
    o += '<section class="intro"><p>' + br(c.intro) + '</p>' + (c.more ? '<p>' + br(c.more) + '</p>' : '') + '</section>';
    if (c.brands && c.brands.length) {
      o += '<section class="brands"><h2 class="f-head">' + h(c.brands_heading) + '</h2><div class="brandrow">';
      c.brands.forEach(function (b) { o += '<figure><img src="' + h(b.image) + '" alt="' + h(b.caption) + '" loading="lazy"></figure>'; });
      o += '</div></section>';
    }
    if (c.steps && c.steps.length) {
      o += '<section class="steps"><h2 class="f-head">' + h(c.steps_heading) + '</h2><div class="grid">';
      c.steps.forEach(function (s, i) { o += '<div class="card tilt-' + ((i % 4) + 1) + '"><span class="f-hand n">' + (i + 1) + '</span><h3 class="f-head">' + h(s.title) + '</h3><p>' + br(s.text) + '</p></div>'; });
      o += '</div></section>';
    }
    if (c.photos && c.photos.length) {
      o += '<section><h2 class="f-head">' + h(c.gallery_heading) + '</h2><div class="grid" style="gap:16px">';
      c.photos.forEach(function (p) {
        o += p.image ? '<figure style="margin:0"><img class="photo" src="' + h(p.image) + '" alt="' + h(p.caption) + '" loading="lazy"><figcaption class="f-hand" style="font-size:22px;margin-top:6px">' + h(p.caption) + '</figcaption></figure>'
                     : '<div class="ph">[' + h(ui.photo || 'PHOTO') + ': ' + h(p.caption) + ']</div>';
      });
      o += '</div></section>';
    }
    if (c.projects && c.projects.length) {
      o += '<section class="projects"><h2 class="f-head">' + h(c.projects_heading) + '</h2>';
      c.projects.forEach(function (pj) {
        o += '<div class="project"><h3 class="f-head">' + h(pj.title) + '</h3><p>' + br(pj.text) + '</p><div class="grid" style="gap:16px">';
        (pj.photos || []).forEach(function (p) {
          if (p.image) o += '<figure style="margin:0"><img class="photo pj" src="' + h(p.image) + '" alt="' + h(p.caption) + '" loading="lazy"><figcaption class="f-hand" style="font-size:20px;margin-top:6px">' + h(p.caption) + '</figcaption></figure>';
        });
        o += '</div></div>';
      });
      o += '</section>';
    }
    if (c.prices && c.prices.length) {
      o += '<section><h2 class="f-head">' + h(c.prices_heading) + '</h2><div class="pricebox tilt-3">';
      c.prices.forEach(function (p) { o += '<div class="prow"><span><b>' + h(p.name) + '</b>' + (p.detail ? ' — ' + h(p.detail) : '') + '</span><span class="f-hand pp">' + h(p.price) + '</span></div>'; });
      if (c.note) o += '<p class="note">' + br(c.note) + '</p>';
      o += '</div></section>';
    }
    o += '<section class="cta"><h2 class="f-head" style="margin:0">' + h(c.cta_heading) + '</h2><p>' + br(c.cta_text) + '</p><a class="btn btn-leather" href="mailto:' + h(email) + '?subject=' + encodeURIComponent(c.email_subject || c.title) + '">' + h(c.cta_button) + ARROW + '</a>';
    if (site.contact.crypto) o += '<p class="f-hand" style="font-size:24px;color:var(--accent)">' + h(site.contact.crypto) + '</p>';
    o += '</section>';
    o += '<footer><span class="f-brand" style="font-size:22px">' + h(site.brand) + '</span><span style="font-size:14px">' + h(site.footer) + '</span></footer>';
    app.innerHTML = o;
    window.scrollTo(0, 0);
  }
  // Opened on top of the farm page: the back link closes this layer, the music keeps playing.
  if (window.parent !== window) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      if (a.closest('.langs')) { e.preventDefault(); location.replace(a.href); }
      else if (a.closest('nav')) { e.preventDefault(); window.parent.postMessage('closeCraft', location.origin); }
      else if (a.href.indexOf('mailto:') === 0) { a.target = '_top'; }
    });
  }
})();
