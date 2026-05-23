// ── 테마 토글 ──
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── 언어 토글 ──
const langBtn = document.getElementById('langToggle');
const koLabel = langBtn.querySelector('.lang-ko');
const enLabel = langBtn.querySelector('.lang-en');

let currentLang = localStorage.getItem('lang') || 'ko';
applyLang(currentLang);

langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'ko' ? 'en' : 'ko';
  localStorage.setItem('lang', currentLang);
  applyLang(currentLang);
});

function applyLang(lang) {
  // 버튼 강조
  if (lang === 'ko') {
    koLabel.classList.add('active');
    enLabel.classList.remove('active');
  } else {
    enLabel.classList.add('active');
    koLabel.classList.remove('active');
  }

  // data-ko / data-en 속성 가진 모든 요소 업데이트
  document.querySelectorAll('[data-ko]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  // html lang 속성
  html.setAttribute('lang', lang === 'ko' ? 'ko' : 'en');

  // 원화 표기 업데이트 (plan-currency, unit-won)
  document.querySelectorAll('.plan-currency, .unit-won, .uc-won').forEach(el => {
    el.textContent = lang === 'ko' ? '원' : '₩';
  });
}
