'use strict';

// =============================================
// ダークテーマ初期化
// =============================================
(function () {
  const saved = localStorage.getItem('faq-theme');
  if (saved === 'dark' || saved === 'light') {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

// =============================================
// 状態管理
// =============================================
let currentCategory = 'all';
let currentKeyword = '';

// =============================================
// DOM参照
// =============================================
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-btn');
const faqItems = document.querySelectorAll('.faq-item');
const faqCategories = document.querySelectorAll('.faq-category');
const noResults = document.getElementById('no-results');
const themeToggle = document.getElementById('theme-toggle');

// =============================================
// ダークテーマ切替
// =============================================
function updateToggleIcon() {
  if (themeToggle) {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  }
}

updateToggleIcon();

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('faq-theme', next);
    updateToggleIcon();
  });
}

// =============================================
// アコーディオン開閉
// =============================================
function toggleAccordion(item) {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const isOpen = answer.classList.contains('open');

  if (isOpen) {
    answer.style.maxHeight = '0';
    answer.classList.remove('open');
    question.setAttribute('aria-expanded', 'false');
  } else {
    answer.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    question.setAttribute('aria-expanded', 'true');
  }
}

// =============================================
// 絞り込み処理
// =============================================
function applyFilter() {
  const keyword = currentKeyword.trim().toLowerCase();
  let visibleCount = 0;

  faqItems.forEach(function (item) {
    const category = item.dataset.category;
    const questionText = item.querySelector('.faq-question').textContent.toLowerCase();
    const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();

    const matchesCategory = currentCategory === 'all' || category === currentCategory;
    const matchesKeyword = keyword === '' || questionText.includes(keyword) || answerText.includes(keyword);

    if (matchesCategory && matchesKeyword) {
      item.hidden = false;
      visibleCount++;
    } else {
      item.hidden = true;
    }
  });

  // カテゴリセクションの見出しを、表示中アイテムがなければ非表示にする
  faqCategories.forEach(function (section) {
    const sectionCategory = section.dataset.category;
    const categoryMatchesFilter = currentCategory === 'all' || sectionCategory === currentCategory;

    if (!categoryMatchesFilter) {
      section.hidden = true;
      return;
    }

    const hasVisible = Array.from(section.querySelectorAll('.faq-item')).some(function (item) {
      return !item.hidden;
    });

    section.hidden = !hasVisible;
  });

  // 該当なしメッセージ
  if (noResults) {
    noResults.hidden = visibleCount > 0;
  }
}

// =============================================
// イベント: 検索ボックス
// =============================================
if (searchInput) {
  searchInput.addEventListener('input', function () {
    currentKeyword = searchInput.value;
    applyFilter();
  });
}

// =============================================
// イベント: カテゴリボタン
// =============================================
categoryButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    currentCategory = btn.dataset.category;

    // activeクラスの付け替え
    categoryButtons.forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    applyFilter();
  });
});

// =============================================
// イベント: アコーディオン（質問クリック）
// =============================================
faqItems.forEach(function (item) {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', function () {
    toggleAccordion(item);
  });
});
