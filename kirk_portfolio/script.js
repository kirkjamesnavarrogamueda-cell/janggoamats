const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');
const navItems = document.querySelectorAll('.nav-link');
const backToTop = document.querySelector('#backToTop');
const lightbox = document.querySelector('#imageLightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxTitle = document.querySelector('#lightboxTitle');
const lightboxClose = document.querySelector('#lightboxClose');

// Mobile navigation
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Highlight the current section in the navigation.
const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

// Show the back-to-top control after scrolling.
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 450);
}, { passive: true });
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Project screenshot preview modal.
document.querySelectorAll('.screenshot-card').forEach((card) => {
  card.addEventListener('click', () => {
    const imagePath = card.dataset.image;
    const title = card.dataset.title || 'Project screenshot';
    if (!imagePath || !lightbox || !lightboxImage) return;
    lightboxImage.src = imagePath;
    lightboxImage.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
    else window.open(imagePath, '_blank', 'noopener,noreferrer');
  });
});

function closeLightbox() {
  if (lightbox?.open) lightbox.close();
  if (lightboxImage) lightboxImage.src = '';
}
lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox?.addEventListener('close', () => {
  if (lightboxImage) lightboxImage.src = '';
});

// Keep the footer year current.
const currentYear = document.querySelector('#currentYear');
if (currentYear) currentYear.textContent = new Date().getFullYear();
