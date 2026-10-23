/**
 * Gallery & Lightbox Controller - Al-Diyafa Hotel
 */

function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery__filter-btn');
  const items = document.querySelectorAll('.gallery__item');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('gallery__filter-btn--active'));
      btn.classList.add('gallery__filter-btn--active');

      const filter = btn.getAttribute('data-filter');

      items.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const items = Array.from(document.querySelectorAll('.gallery__item img'));

  let activeIndex = 0;

  function openLightbox(index) {
    activeIndex = index;
    const currentImg = items[activeIndex];
    if (currentImg && lightboxImg) {
      lightboxImg.src = currentImg.src;
      lightboxImg.alt = currentImg.alt || 'Hotel Photo';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    activeIndex = (activeIndex + 1) % items.length;
    openLightbox(activeIndex);
  }

  function showPrev() {
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    openLightbox(activeIndex);
  }

  items.forEach((img, idx) => {
    img.parentElement.addEventListener('click', () => openLightbox(idx));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

window.initGallery = initGallery;
window.initLightbox = initLightbox;
