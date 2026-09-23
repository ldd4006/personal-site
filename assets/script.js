document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.yr').forEach(function(y){ y.textContent = new Date().getFullYear(); });

  function applyLang(l){
    document.documentElement.lang = (l === 'en') ? 'en' : 'zh-CN';
    document.querySelectorAll('.zh').forEach(function(e){ e.hidden = (l !== 'zh'); });
    document.querySelectorAll('.en').forEach(function(e){ e.hidden = (l !== 'en'); });
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.textContent = (l === 'zh') ? 'EN' : '中文';
    });
    try { localStorage.setItem('site-lang', l); } catch (e) {}
  }

  var saved = 'zh';
  try {
    var s = localStorage.getItem('site-lang');
    if (s) { saved = s; }
    else if (navigator.language && navigator.language.toLowerCase().indexOf('en') === 0) { saved = 'en'; }
  } catch (e) {}

  applyLang(saved);

  document.addEventListener('click', function(e){
    var t = (e.target && e.target.closest) ? e.target.closest('.lang-btn') : null;
    if (t) {
      var cur = (document.documentElement.lang.indexOf('en') === 0) ? 'en' : 'zh';
      applyLang(cur === 'zh' ? 'en' : 'zh');
    }
  });
});
