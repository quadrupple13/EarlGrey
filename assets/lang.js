// Quadrupple – language choice. Order: ?lang= in the address, earlier choice, browser language, English.
(function () {
  var LANGS = [['en', 'EN', 'English'], ['nl', 'NL', 'Nederlands'], ['es', 'ES', 'Español'], ['de', 'DE', 'Deutsch'], ['fr', 'FR', 'Français']];
  var codes = LANGS.map(function (l) { return l[0]; });
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q && codes.indexOf(q) > -1) { try { localStorage.setItem('qlang', q); } catch (e) {} return q; }
    try { var s = localStorage.getItem('qlang'); if (s && codes.indexOf(s) > -1) return s; } catch (e) {}
    var nav = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']);
    for (var i = 0; i < nav.length; i++) { var c = String(nav[i]).slice(0, 2).toLowerCase(); if (codes.indexOf(c) > -1) return c; }
    return 'en';
  }
  var lang = pick();
  document.documentElement.lang = lang;
  window.QLANG = {
    lang: lang,
    base: lang === 'en' ? 'content/' : 'content/' + lang + '/',
    link: function (url) { return url + (url.indexOf('?') > -1 ? '&' : '?') + 'lang=' + lang; },
    switcher: function (label) {
      var o = '<nav class="langs" aria-label="' + (label || 'Language') + '">';
      LANGS.forEach(function (l) {
        var p = new URLSearchParams(location.search); p.set('lang', l[0]);
        o += '<a href="?' + p.toString() + '" lang="' + l[0] + '" title="' + l[2] + '"' + (l[0] === lang ? ' aria-current="true" class="on"' : '') + '>' + l[1] + '</a>';
      });
      return o + '</nav>';
    }
  };
})();
