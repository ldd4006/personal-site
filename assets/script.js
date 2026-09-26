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

  /* 东八区时间（UTC+8），独立于访客时区 */
  function pad(n){ return n < 10 ? '0' + n : '' + n; }
  function updateClock(){
    var el = document.getElementById('clock');
    if (!el) return;
    var now = new Date();
    var utc = now.getTime() + now.getTimezoneOffset() * 60000;
    var cn = new Date(utc + 8 * 3600000);
    var s = cn.getFullYear() + '-' + pad(cn.getMonth()+1) + '-' + pad(cn.getDate())
          + ' ' + pad(cn.getHours()) + ':' + pad(cn.getMinutes()) + ':' + pad(cn.getSeconds());
    el.textContent = s;
  }
  updateClock();
  setInterval(updateClock, 1000);
});
