/**
 * Animations & Intersection Observer - Al-Diyafa Hotel
 */

function initAnimations() {
  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // Animated counters for stats
  const counters = document.querySelectorAll('.stats__number');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetEl = entry.target;
            const targetValue = parseInt(targetEl.getAttribute('data-target'), 10);
            const suffix = targetEl.getAttribute('data-suffix') || '';

            if (!isNaN(targetValue)) {
              let start = 0;
              const duration = 2000;
              const stepTime = 30;
              const totalSteps = duration / stepTime;
              const increment = targetValue / totalSteps;

              const timer = setInterval(() => {
                start += increment;
                if (start >= targetValue) {
                  targetEl.textContent = targetValue + suffix;
                  clearInterval(timer);
                } else {
                  targetEl.textContent = Math.floor(start) + suffix;
                }
              }, stepTime);
            }
            obs.unobserve(targetEl);
          }
        });
      },
      { threshold: 0.25 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  }
}

window.initAnimations = initAnimations;
