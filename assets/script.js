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

  /* 简历页：保存 PDF / 保存 DOC（仅 cv-page） */
  document.querySelectorAll('body.cv-page .save-pdf').forEach(function(b){
    b.addEventListener('click', function(){ window.print(); });
  });
  document.querySelectorAll('body.cv-page .save-doc').forEach(function(b){
    b.addEventListener('click', saveResumeDoc);
  });

  function saveResumeDoc(){
    var lang = (document.documentElement.lang.indexOf('en') === 0) ? 'en' : 'zh';
    var el = document.querySelector('main .' + lang);
    if (!el) return;
    var clone = el.cloneNode(true);
    clone.querySelectorAll('.no-print').forEach(function(n){ n.remove(); });
    var styles = 'body{font-family:"Microsoft YaHei","SimSun",sans-serif;font-size:12pt;line-height:1.6;color:#000}'
      + 'h1{font-size:20pt;margin:0 0 8pt}'
      + 'h2{font-size:14pt;color:#356056;border-left:4px solid #356056;padding-left:8pt;margin:14pt 0 6pt}'
      + 'table{border-collapse:collapse;width:100%}td{border:1px solid #ccc;padding:6pt 8pt;vertical-align:top}'
      + 'ul{list-style:none;padding:0}li{padding:4pt 0;border-bottom:1px dashed #ccc}';
    var html = '<!doctype html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>路东冬-简历</title><style>' + styles + '</style></head><body>' + clone.innerHTML + '</body></html>';
    var blob = new Blob(['﻿' + html], { type: 'application/msword' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = '路东冬-简历.doc';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
  }
});
