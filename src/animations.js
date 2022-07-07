import sal from 'sal.js';

import './styles/animations.scss';

window.addEventListener('DOMContentLoaded', () => {
  const viewportHeight = window.innerHeight;
  const threshold = 0.3;

  const sals = sal({
    threshold,
  });

  if (!sals.elements.length) {
    return;
  }

  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.target.classList.contains('sal-animate')) {
        return;
      }

      if (entry.contentRect.height * threshold >= viewportHeight - 50) {
        entry.target.classList.add('sal-animate');
      }
    }
  });

  sals.elements.forEach(block => {
    observer.observe(block);
  });
});
