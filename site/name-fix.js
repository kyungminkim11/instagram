document.addEventListener('DOMContentLoaded', function () {
  var title = document.querySelector('#about [data-i18n="aboutTitle"]');
  if (title) title.textContent = '안녕하세요. 365 Daily Snap입니다.';
  var mark = document.querySelector('.about-visual > span');
  if (mark) mark.innerHTML = '365<br>DS';
});
