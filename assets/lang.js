// Quadrupple – language choice. Order: ?lang= in the address, earlier choice, browser language, English.
(function () {
  var LANGS = [['en', 'EN', 'English'], ['nl', 'NL', 'Nederlands'], ['es', 'ES', 'Español'], ['de', 'DE', 'Deutsch'], ['fr', 'FR', 'Français']];
  var FLAGS = {
    en: '<svg viewBox="0 0 60 40"><clipPath id="ukc"><path d="M0,0v40h60V0z"/></clipPath><g clip-path="url(#ukc)"><path d="M0,0v40h60V0z" fill="#012169"/><path d="M0,0L60,40M60,0L0,40" stroke="#fff" stroke-width="8"/><path d="M0,0L60,40M60,0L0,40" stroke="#C8102E" stroke-width="3"/><path d="M30,0v40M0,20h60" stroke="#fff" stroke-width="12"/><path d="M30,0v40M0,20h60" stroke="#C8102E" stroke-width="7"/></g></svg>',
    nl: '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#21468B"/><rect width="60" height="26.7" fill="#fff"/><rect width="60" height="13.3" fill="#AE1C28"/></svg>',
    es: '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/></svg>',
    de: '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#FFCE00"/><rect width="60" height="26.7" fill="#DD0000"/><rect width="60" height="13.3" fill="#000"/></svg>',
    fr: '<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#ED2939"/><rect width="40" height="40" fill="#fff"/><rect width="20" height="40" fill="#002395"/></svg>'
  };
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
        o += '<a href="?' + p.toString() + '" lang="' + l[0] + '" title="' + l[2] + '" aria-label="' + l[2] + '"' + (l[0] === lang ? ' aria-current="true" class="on"' : '') + '>' + FLAGS[l[0]] + '</a>';
      });
      return o + '</nav>';
    }
  };
})();
