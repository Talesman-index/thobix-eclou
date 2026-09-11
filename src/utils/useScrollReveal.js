import { useEffect } from 'react';

/**
 * Custom hook to trigger entrance and parallax animations as elements scroll into view
 */
export function useScrollReveal(selector = '.reveal-on-scroll', options = {}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0) return;

    // Immediately reveal elements already near or within the viewport
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowHeight + 150) {
        el.classList.add('is-revealed');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          if (options.once !== false) {
            observer.unobserve(entry.target);
          }
        } else if (options.once === false) {
          entry.target.classList.remove('is-revealed');
        }
      });
    }, {
      threshold: options.threshold !== undefined ? options.threshold : 0.01,
      rootMargin: options.rootMargin || '150px 0px 80px 0px'
    });

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selector, options]);
}
