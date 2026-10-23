/**
 * Main Application Bootstrapper - Al-Diyafa Hotel
 */

function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');
  tabContainers.forEach((container) => {
    const btns = container.querySelectorAll('.tabs__btn');
    const panels = container.querySelectorAll('.tabs__panel');

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.remove('tabs__btn--active'));
        panels.forEach((p) => p.classList.remove('tabs__panel--active'));

        btn.classList.add('tabs__btn--active');
        const targetTabId = btn.getAttribute('data-tab');
        const activePanel = container.querySelector(`#tab-${targetTabId}`);
        if (activePanel) {
          activePanel.classList.add('tabs__panel--active');
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof initI18n === 'function') initI18n();
  if (typeof initNavbar === 'function') initNavbar();
  if (typeof initSlider === 'function') initSlider();
  if (typeof initGallery === 'function') initGallery();
  if (typeof initLightbox === 'function') initLightbox();
  if (typeof initBookingForm === 'function') initBookingForm();
  if (typeof initContactForm === 'function') initContactForm();
  if (typeof initAnimations === 'function') initAnimations();
  initTabs();
});
