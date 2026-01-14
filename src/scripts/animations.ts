// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add stagger delay for elements with data-stagger attribute
      const staggerDelay = entry.target.hasAttribute('data-stagger') 
        ? parseInt(entry.target.getAttribute('data-stagger') || '0') * 100
        : 0;
      
      setTimeout(() => {
        entry.target.classList.add('animate-in');
      }, staggerDelay);
      
      // Unobserve after animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize animations
function initAnimations() {
  // Observe all elements with animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
    // Add stagger index for grouped elements
    if (el.parentElement?.hasAttribute('data-stagger-children')) {
      el.setAttribute('data-stagger', index.toString());
    }
    observer.observe(el);
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

export { initAnimations };