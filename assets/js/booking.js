/**
 * Booking & Contact Form Validation - Al-Diyafa Hotel
 */

function initBookingForm() {
  const searchForm = document.querySelector('.hero__search');
  if (!searchForm) return;

  const checkIn = document.getElementById('checkIn');
  const checkOut = document.getElementById('checkOut');

  // Set default check-in to today, check-out to tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => date.toISOString().split('T')[0];

  if (checkIn && !checkIn.value) {
    checkIn.min = formatDate(today);
    checkIn.value = formatDate(today);
  }

  if (checkOut && !checkOut.value) {
    checkOut.min = formatDate(tomorrow);
    checkOut.value = formatDate(tomorrow);
  }

  if (checkIn && checkOut) {
    checkIn.addEventListener('change', () => {
      const nextDay = new Date(checkIn.value);
      nextDay.setDate(nextDay.getDate() + 1);
      checkOut.min = formatDate(nextDay);
      if (checkOut.value <= checkIn.value) {
        checkOut.value = formatDate(nextDay);
      }
    });
  }

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isPagesDir = window.location.pathname.includes('/pages/');
    const roomsUrl = isPagesDir ? 'rooms.html' : 'pages/rooms.html';
    window.location.href = roomsUrl;
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required]');

    requiredInputs.forEach((input) => {
      const parent = input.closest('.form-group');
      if (!input.value.trim()) {
        isValid = false;
        if (parent) parent.classList.add('form-group--error');
        input.classList.add('form-control--error');
      } else {
        if (parent) parent.classList.remove('form-group--error');
        input.classList.remove('form-control--error');
      }

      // Check email format specifically
      if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          isValid = false;
          if (parent) parent.classList.add('form-group--error');
          input.classList.add('form-control--error');
        }
      }
    });

    if (isValid) {
      const isArabic = document.documentElement.lang === 'ar';
      const msg = isArabic
        ? 'شكراً لك! تم استلام رسالتك بنجاح وسيتواصل معك فريق الاستقبال قريباً.'
        : 'Thank you! Your message has been sent successfully. Our team will contact you shortly.';
      alert(msg);
      form.reset();
    }
  });

  // Remove error state on input
  form.querySelectorAll('.form-control').forEach((input) => {
    input.addEventListener('input', () => {
      const parent = input.closest('.form-group');
      if (parent) parent.classList.remove('form-group--error');
      input.classList.remove('form-control--error');
    });
  });
}

window.initBookingForm = initBookingForm;
window.initContactForm = initContactForm;
