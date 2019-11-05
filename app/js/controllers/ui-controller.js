export const UIController = (() => {
  const DOMElements = {
    mainContent: document.getElementById('mainContent'),
    burgerMenu: document.getElementById('burgerMenu'),
    sideNavAccordion: document.getElementById('sideNavAccordion'),
    body: document.querySelector('body'),
    appLoader: document.getElementById('appLoader'),
    app: document.querySelector('.app'),
  };

  return {
    getDOMElements: () => {
      return DOMElements;
    },
    toggleMenu: () => {
      DOMElements.burgerMenu.addEventListener('click', () => {
        if (DOMElements.mainContent.classList.contains('opened')) {
          DOMElements.body.style.overflow = 'hidden';
          DOMElements.mainContent.classList.remove('opened');
        } else {
          DOMElements.body.style.overflow = 'visible';
          DOMElements.mainContent.classList.add('opened');
        }
      });
    },
    onWindowResize: () => {
      window.addEventListener('resize', () => {
        if (DOMElements.mainContent.classList.contains('opened')) {
          DOMElements.mainContent.classList.remove('opened');
        }
      });
    },
  };
})();
