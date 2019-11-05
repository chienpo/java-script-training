export const bookController = (() => {
  const togglePanel = (panel, accordion) => {
    const expandedPanel = accordion.querySelector('.active');

    if (expandedPanel) {
      expandedPanel.classList.remove('active');
    }

    panel.classList.add('active');
  };

  return {
    initAccordion: accordionElem => {
      const allPanels = accordionElem.querySelectorAll('.toggle');

      for (const panel of allPanels) {
        panel.addEventListener('click', event => {
          togglePanel(event.currentTarget, accordionElem);
        });
      }
    },
  };
})();
