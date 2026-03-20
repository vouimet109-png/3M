// Language translation system
let allLanguages = {};
let currentLanguage = localStorage.getItem('siteLanguage') || 'fr';

// Load language file
fetch('language.json')
    .then(res => res.json())
    .then(data => {
        allLanguages = data;
        applyLanguage(currentLanguage);
    });

// Apply language translations
function applyLanguage(lang) {
    if (!allLanguages[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem('siteLanguage', lang);
    
    const translations = allLanguages[lang];
    
    // Update navigation
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (translations[key]) {
            elem.textContent = translations[key];
        }
    });
    
    // Update placeholders and titles
    document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
        const key = elem.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            elem.placeholder = translations[key];
        }
    });
    
    // Update modal title
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle && translations.modal_select_language) {
        modalTitle.textContent = translations.modal_select_language;
    }
}

// Language Modal Management
const modal = document.getElementById('languageModal');
const closeBtn = document.querySelector('.close');
const langButtons = document.querySelectorAll('.lang-btn');
const kangBtn = document.querySelector('[data-i18n="nav_kang"]')?.parentElement;

// Open modal when Kang is clicked
document.addEventListener('DOMContentLoaded', function() {
    const kangLink = document.querySelector('a[href="#kang"]');
    if (kangLink) {
        kangLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        });
    }
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            applyLanguage(lang);
            modal.style.display = 'none';
        });
    });
    
    // Close when clicking outside modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
