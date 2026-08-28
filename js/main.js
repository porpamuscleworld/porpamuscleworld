/**
 * PORPA MUSCLE WORLD GYM — Main Interactive Script
 * Features:
 * - Pricing Duration Switcher (1 Month, 3 Months, 6 Months, 1 Year)
 * - 50% OFF Lead Capture Modal & Toast Notifications
 * - Mobile Navigation Menu Toggle
 * - Scroll Header Effects & Active Section Link Highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
  initPricingSwitcher();
  initMobileNav();
  initModalLogic();
  initScrollHeader();
  initSmoothScroll();
});

// Pricing Data Matrix (Exact rates matching requirement)
const PRICING_DATA = {
  '1m': {
    period: '/ 1 Month',
    gym: '3,000',
    cardio: '5,000',
    group: '3,000',
    full: '10,000'
  },
  '3m': {
    period: '/ 3 Months',
    gym: '8,000',
    cardio: '14,000',
    group: '8,000',
    full: '27,000'
  },
  '6m': {
    period: '/ 6 Months',
    gym: '15,000',
    cardio: '26,000',
    group: '15,000',
    full: '54,000'
  },
  '1y': {
    period: '/ 1 Year',
    gym: '28,000',
    cardio: '50,000',
    group: '28,000',
    full: '100,000'
  }
};

/**
 * Initialize Interactive Pricing Duration Switcher
 */
function initPricingSwitcher() {
  const tabs = document.querySelectorAll('.duration-tab');
  const gymPrice = document.getElementById('price-gym');
  const cardioPrice = document.getElementById('price-cardio');
  const groupPrice = document.getElementById('price-group');
  const fullPrice = document.getElementById('price-full');
  const periodEls = document.querySelectorAll('.plan-period-text');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const duration = tab.getAttribute('data-duration');
      const data = PRICING_DATA[duration];

      if (data) {
        // Animate price numbers transition
        animatePriceChange(gymPrice, data.gym);
        animatePriceChange(cardioPrice, data.cardio);
        animatePriceChange(groupPrice, data.group);
        animatePriceChange(fullPrice, data.full);

        periodEls.forEach(el => {
          el.textContent = data.period;
        });
      }
    });
  });
}

function animatePriceChange(element, newValue) {
  if (!element) return;
  element.style.opacity = '0';
  element.style.transform = 'translateY(-10px)';
  
  setTimeout(() => {
    element.textContent = newValue;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, 150);
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(show) {
    const isActive = show !== undefined ? show : !navMenu.classList.contains('active');
    navMenu.classList.toggle('active', isActive);
    
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = isActive ? 'ri-close-line' : 'ri-menu-line';
    }

    if (window.innerWidth <= 992) {
      document.body.style.overflow = isActive ? 'hidden' : '';
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/**
 * 50% OFF Lead Capture Modal & Toast Logic
 */
function initModalLogic() {
  const modalBackdrop = document.getElementById('lead-modal');
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const leadForm = document.getElementById('lead-form');
  const toastMsg = document.getElementById('toast-notification');

  if (!modalBackdrop) return;

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('active');
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalBackdrop.classList.remove('active');

      // Reset form
      leadForm.reset();

      // Show toast
      if (toastMsg) {
        toastMsg.classList.add('show');
        setTimeout(() => {
          toastMsg.classList.remove('show');
        }, 4000);
      }
    });
  }
}

/**
 * Sticky Header Scroll Behavior & Active Links
 */
function initScrollHeader() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header scroll background
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // ScrollSpy active link update
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/**
 * Smooth Scroll Anchor Link Handler
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
