/**
 * Testimonials Slider - Al-Diyafa Hotel
 */

function initSlider() {
  const slider = document.querySelector('.testimonials__slider');
  if (!slider) return;

  const track = slider.querySelector('.testimonials__track');
  const slides = slider.querySelectorAll('.testimonials__slide');
  const dotsContainer = slider.querySelector('.testimonials__dots');

  if (!track || slides.length <= 1) return;

  let currentIndex = 0;
  let autoPlayTimer = null;

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `testimonials__dot ${idx === 0 ? 'testimonials__dot--active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.testimonials__dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('testimonials__dot--active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    const isRtl = document.documentElement.dir === 'rtl';
    const directionFactor = isRtl ? 1 : -1;
    track.style.transform = `translateX(${directionFactor * currentIndex * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }

  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  slider.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  slider.addEventListener('mouseleave', () => startAutoPlay());

  // Listen to language change to adjust RTL transformation
  window.addEventListener('languageChanged', () => {
    goToSlide(currentIndex);
  });

  goToSlide(0);
  startAutoPlay();
}

window.initSlider = initSlider;
