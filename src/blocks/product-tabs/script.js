const tabBlocks = document.querySelectorAll('.wp-block-gutenbee-product-tabs');

tabBlocks.forEach(tabBlock => {
  const tabContents = tabBlock.querySelectorAll(
    '.gutenbee-product-tabs-content',
  );
  const tabButtons = tabBlock.querySelectorAll(
    '.wp-block-gutenbee-product-tabs-nav li',
  );

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Hide all tab contents
      tabContents.forEach(content => {
        content.classList.remove('active');
      });

      // Deactivate all tab buttons
      tabButtons.forEach(tab => {
        tab.classList.remove('active');
      });

      // Show the selected tab content
      tabContents[index].classList.add('active');

      // Activate the selected tab button
      button.classList.add('active');
    });
  });
});
