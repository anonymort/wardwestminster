/**
 * Long Read Theme - Main JavaScript
 * Handles navigation, progress bar, and scroll animations
 */

(function () {
    'use strict';

    // ============================================
    // Progress Bar
    // ============================================

    const progressBar = document.getElementById('progressBar');

    function updateProgress() {
        if (!progressBar) return;

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    // ============================================
    // Navigation
    // ============================================

    const nav = document.querySelector('.site-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNav() {
        const currentScrollY = window.scrollY;

        // Add scrolled class for shadow
        if (currentScrollY > 10) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        // Hide/show nav on scroll (only on article pages, not when menu is open)
        if (!mobileMenu?.classList.contains('active')) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.classList.add('nav-hidden');
            } else {
                nav.classList.remove('nav-hidden');
            }
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNav();
                updateProgress();
                updateBackToTop();
            });
            ticking = true;
        }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');

        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');

        // Accessibility
        navToggle.setAttribute('aria-expanded', !isActive);
    }

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });

        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    }

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================

    const observerOptions = {
        root: null,
        rootMargin: '50px 0px -10% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    function initScrollAnimations() {
        const viewportHeight = window.innerHeight;

        // Observe article content elements (select ALL .article-content containers)
        document.querySelectorAll('.article-content').forEach(articleContent => {
            articleContent.querySelectorAll('p, h2, h3, blockquote, figure, ul, ol, hr, .section-break, .toc, aside').forEach((el, index) => {
                const rect = el.getBoundingClientRect();
                // Only animate elements below the fold
                if (rect.top > viewportHeight * 0.8) {
                    el.classList.add('animate-on-scroll');
                    el.style.animationDelay = `${(index % 10) * 0.05}s`;
                    observer.observe(el);
                }
            });
        });

        // Observe card elements
        document.querySelectorAll('.article-card, .grid-card, .related-card').forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top > viewportHeight * 0.8) {
                card.classList.add('animate-on-scroll');
                card.style.animationDelay = `${(index % 6) * 0.1}s`;
                observer.observe(card);
            }
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // Back to Top Button
    // ============================================

    const backToTop = document.getElementById('backToTop');

    function updateBackToTop() {
        if (!backToTop) return;

        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    function initBackToTop() {
        if (!backToTop) return;

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Search Functionality
    // ============================================

    // ============================================
    // Theme Switcher (Dark Mode)
    // ============================================

    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        function setTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
                if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark-mode');
                if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
            localStorage.setItem('theme', theme);
        }

        // Initial Theme Load
        if (storedTheme) {
            setTheme(storedTheme);
        } else if (prefersDark.matches) {
            setTheme('dark');
        }

        // Toggle Event
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const isDark = document.body.classList.contains('dark-mode');
                setTheme(isDark ? 'light' : 'dark');
            });
        }
    }

    // ============================================
    // Search Functionality
    // ============================================

    function initSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        /* ... existing function ... */
        if (!searchInput || !searchResults) return;

        let searchIndex = null;
        let searchData = null;

        // Load search index
        async function loadSearchIndex() {
            try {
                const response = await fetch('/index.json');
                searchData = await response.json();
                searchIndex = searchData;
            } catch (e) {
                console.error('Failed to load search index:', e);
            }
        }

        // Perform search
        function performSearch(query) {
            if (!searchIndex || !query.trim()) {
                searchResults.innerHTML = '';
                return;
            }

            const terms = query.toLowerCase().split(/\s+/);
            const results = searchIndex.filter(item => {
                const searchText = (item.title + ' ' + item.content + ' ' + (item.tags || []).join(' ')).toLowerCase();
                return terms.every(term => searchText.includes(term));
            }).slice(0, 10);

            if (results.length === 0) {
                searchResults.innerHTML = '<p class="search-no-results">No results found</p>';
                return;
            }

            searchResults.innerHTML = results.map(item => `
                <li class="search-result-item">
                    <a href="${item.permalink}" class="search-result-link">
                        <h3 class="search-result-title">${highlightTerms(item.title, terms)}</h3>
                        <p class="search-result-excerpt">${highlightTerms(truncate(item.content, 150), terms)}</p>
                    </a>
                </li>
            `).join('');
        }

        function highlightTerms(text, terms) {
            let result = text;
            terms.forEach(term => {
                const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
                result = result.replace(regex, '<mark>$1</mark>');
            });
            return result;
        }

        function escapeRegex(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        function truncate(text, length) {
            if (text.length <= length) return text;
            return text.substr(0, length).replace(/\s+\S*$/, '') + '...';
        }

        // Event listeners
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        searchInput.addEventListener('focus', () => {
            if (!searchIndex) loadSearchIndex();
        });
    }

    // ============================================
    // Initialisation
    // ============================================

    function init() {
        // Event listeners
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('load', () => {
            updateProgress();
            updateNav();
        });

        // Initialise features
        initScrollAnimations();
        initSmoothScroll();
        initBackToTop();
        initSearch();
        initTheme();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
