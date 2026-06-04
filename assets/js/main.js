const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const lightbox = document.querySelector('#lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.lightbox-close');
let lastFocused = null;

document.querySelectorAll('[data-full]').forEach((trigger) => {
  trigger.addEventListener('click', () => openLightbox(trigger));
});

function openLightbox(trigger) {
  const image = trigger.querySelector('img');
  lastFocused = document.activeElement;
  lightboxImg.src = trigger.dataset.full;
  lightboxImg.alt = trigger.dataset.caption || image?.alt || 'Увеличенное изображение проекта';
  lightbox.classList.add('open');
  lightbox.removeAttribute('inert');
  lightbox.setAttribute('aria-hidden', 'false');
  closeBtn.removeAttribute('tabindex');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.setAttribute('inert', '');
  closeBtn.setAttribute('tabindex', '-1');
  lightboxImg.src = '';
  document.body.style.overflow = '';
  lastFocused?.focus();
}

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
window.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('open')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'Tab') {
    event.preventDefault();
    closeBtn.focus();
  }
});
