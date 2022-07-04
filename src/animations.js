import sal from 'sal.js';

import './styles/animations.scss';

window.addEventListener('DOMContentLoaded', () => {
  const viewportHeight = window.innerHeight;
  const threshold = 0.33;

  const sals = sal({
    threshold,
  });

  setTimeout(() => {
    if (!sals.elements.length) {
      return;
    }

    sals.elements.forEach(block => {
      if (block.clientHeight * threshold >= viewportHeight + 50) {
        block.classList.add('sal-animate');
      }
    });
  }, 100);
});
