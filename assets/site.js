(() => {
  const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function focusableWithin(node) {
    return Array.from(node.querySelectorAll(focusableSelector)).filter((item) => !item.hasAttribute('disabled') && !item.getAttribute('aria-hidden'));
  }

  function initDrawer() {
    const toggle = document.querySelector('[data-drawer-toggle]');
    const drawer = document.querySelector('#site-drawer');
    const overlay = document.querySelector('[data-drawer-overlay]');
    const closeButton = document.querySelector('[data-drawer-close]');
    if (!toggle || !drawer || !overlay || !closeButton) return;

    let lastDrawerFocus = null;

    function openDrawer() {
      window.dispatchEvent(new CustomEvent('lectory:modal-open', { detail: { source: 'drawer' } }));
      lastDrawerFocus = document.activeElement;
      drawer.classList.add('is-open');
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add('is-open'));
      drawer.removeAttribute('inert');
      drawer.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.querySelector('[data-menu-label]').textContent = 'Закрыть';
      document.body.classList.add('drawer-open');
      closeButton.focus();
    }

    function closeDrawer({ restoreFocus = true } = {}) {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('inert', '');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('[data-menu-label]').textContent = 'Меню';
      document.body.classList.remove('drawer-open');
      window.setTimeout(() => {
        if (!drawer.classList.contains('is-open')) overlay.hidden = true;
      }, 240);
      if (restoreFocus) (lastDrawerFocus || toggle).focus();
    }

    toggle.addEventListener('click', () => {
      if (drawer.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    });

    closeButton.addEventListener('click', () => closeDrawer());
    overlay.addEventListener('click', () => closeDrawer());

    drawer.querySelectorAll('a[href]').forEach((link) => {
      link.addEventListener('click', () => closeDrawer({ restoreFocus: false }));
    });

    window.addEventListener('keydown', (event) => {
      if (!drawer.classList.contains('is-open')) return;
      if (event.key === 'Escape') {
        closeDrawer();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = focusableWithin(drawer);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function initFloatingContact() {
    const root = document.querySelector('[data-floating-contact]');
    if (!root) return;
    const button = root.querySelector('[data-floating-contact-toggle]');
    const panel = root.querySelector('[data-floating-contact-panel]');
    if (!button || !panel) return;

    function openPanel() {
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      const firstLink = focusableWithin(panel)[0];
      requestAnimationFrame(() => firstLink?.focus());
    }

    function closePanel({ restoreFocus = true } = {}) {
      if (panel.hidden) return;
      panel.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      if (restoreFocus) button.focus();
    }

    button.addEventListener('click', () => {
      if (panel.hidden) openPanel();
      else closePanel();
    });

    document.addEventListener('pointerdown', (event) => {
      if (panel.hidden || root.contains(event.target)) return;
      closePanel({ restoreFocus: false });
    });

    window.addEventListener('lectory:modal-open', () => closePanel({ restoreFocus: false }));

    document.querySelectorAll('[data-full]').forEach((trigger) => {
      trigger.addEventListener('click', () => closePanel({ restoreFocus: false }), { capture: true });
    });

    window.addEventListener('keydown', (event) => {
      if (panel.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = focusableWithin(panel);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        button.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        button.focus();
      }
    });
  }


  function initPresentationViewer() {
    const openButton = document.querySelector('[data-presentation-open]');
    const viewer = document.querySelector('[data-presentation-viewer]');
    if (!openButton || !viewer) return;

    const closeButton = viewer.querySelector('[data-presentation-close]');
    const prevButton = viewer.querySelector('[data-presentation-prev]');
    const nextButton = viewer.querySelector('[data-presentation-next]');
    const image = viewer.querySelector('[data-presentation-image]');
    const title = viewer.querySelector('[data-presentation-title]');
    const description = viewer.querySelector('[data-presentation-description]');
    const counter = viewer.querySelector('[data-presentation-counter]');
    const stage = viewer.querySelector('[data-presentation-stage]');
    if (!closeButton || !prevButton || !nextButton || !image || !title || !description || !counter || !stage) return;

    const frames = [
      {
        src: 'assets/render-03.webp',
        title: 'Терракотовая стена',
        description: 'Главный цветовой акцент, собирающий композицию интерьера.',
        alt: 'Терракотовая акцентная стена лектория с декоративными элементами и мягким светом'
      },
      {
        src: 'assets/render-01.webp',
        title: 'Общий вид',
        description: 'Рабочая зона, мягкая посадка и спокойная навигация взгляда.',
        alt: 'Общий вид лектория с деревянными столами, мягкими креслами и естественным светом'
      },
      {
        src: 'assets/render-02.webp',
        title: 'Фронтальная перспектива',
        description: 'Баланс стены, мебели и декоративных элементов в одном кадре.',
        alt: 'Фронтальная перспектива учебного лектория с мебелью, акцентной стеной и декором'
      },
      {
        src: 'assets/render-04.webp',
        title: 'Экран и посадка',
        description: 'Практический сценарий пространства для лекций и обсуждений.',
        alt: 'Зона экрана в лектории с посадочными местами для лекционного сценария'
      }
    ];

    let currentIndex = 0;
    let lastPresentationFocus = null;
    let previousBodyOverflow = '';
    let touchStartX = 0;
    let touchStartY = 0;
    let isTrackingSwipe = false;

    function renderFrame() {
      const frame = frames[currentIndex];
      image.src = frame.src;
      image.alt = frame.alt;
      title.textContent = frame.title;
      description.textContent = frame.description;
      counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}`;
    }

    function showPrevious() {
      currentIndex = (currentIndex - 1 + frames.length) % frames.length;
      renderFrame();
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % frames.length;
      renderFrame();
    }

    function openViewer() {
      window.dispatchEvent(new CustomEvent('lectory:modal-open', { detail: { source: 'presentation' } }));
      lastPresentationFocus = document.activeElement;
      currentIndex = 0;
      renderFrame();
      viewer.hidden = false;
      viewer.removeAttribute('inert');
      viewer.setAttribute('aria-hidden', 'false');
      previousBodyOverflow = document.body.style.overflow;
      document.body.classList.add('presentation-open');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => closeButton.focus());
    }

    function closeViewer({ restoreFocus = true } = {}) {
      if (viewer.hidden) return;
      viewer.hidden = true;
      viewer.setAttribute('aria-hidden', 'true');
      viewer.setAttribute('inert', '');
      document.body.classList.remove('presentation-open');
      document.body.style.overflow = previousBodyOverflow;
      image.src = '';
      if (restoreFocus) (lastPresentationFocus || openButton).focus();
    }

    openButton.addEventListener('click', openViewer);
    closeButton.addEventListener('click', () => closeViewer());
    prevButton.addEventListener('click', showPrevious);
    nextButton.addEventListener('click', showNext);

    stage.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      isTrackingSwipe = true;
    }, { passive: true });

    stage.addEventListener('touchmove', (event) => {
      if (!isTrackingSwipe || event.touches.length !== 1) return;
      const deltaX = event.touches[0].clientX - touchStartX;
      const deltaY = event.touches[0].clientY - touchStartY;
      if (Math.abs(deltaX) > 18 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
        event.preventDefault();
      }
    }, { passive: false });

    stage.addEventListener('touchend', (event) => {
      if (!isTrackingSwipe) return;
      isTrackingSwipe = false;
      const touch = event.changedTouches[0];
      if (!touch) return;
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) return;
      if (deltaX < 0) showNext();
      else showPrevious();
    }, { passive: true });

    window.addEventListener('keydown', (event) => {
      if (viewer.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeViewer();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevious();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = focusableWithin(viewer);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }


  initDrawer();
  initFloatingContact();
  initPresentationViewer();
})();
