import Prism from 'prismjs';
import { CONTENT_LOADING_TIMEOUT } from '../constants';

export const UIController = (() => {
  const DOMElements = {
    mainContent: document.getElementById('mainContent'),
    burgerMenu: document.getElementById('burgerMenu'),
    sideNavAccordion: document.getElementById('sideNavAccordion'),
    body: document.querySelector('body'),
    appLoader: document.getElementById('appLoader'),
    app: document.querySelector('.app'),
    prismContent: document.getElementById('prism-content'),
    mainWrapper: document.querySelector('.wr-main'),
    contentLoader: document.querySelector('.prism-loader-wrap'),
    containerMain: document.querySelector('.container-main'),
  };

  return {
    getDOMElements: () => DOMElements,
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
    drawJsPreview: responseData => {
      setTimeout(() => {
        DOMElements.prismContent.innerHTML = Prism.highlight(
          responseData,
          Prism.languages.javascript,
          'javascript'
        );
      }, CONTENT_LOADING_TIMEOUT)
    },
    drawPreviewSpinner: () => {
      DOMElements.containerMain.style.opacity = '0';
      DOMElements.contentLoader.style.opacity = '1';
    },
    removePreviewSpinner: () => {
      setTimeout(() => {
        DOMElements.containerMain.style.opacity = '1';
        DOMElements.contentLoader.style.opacity = '0';
      }, CONTENT_LOADING_TIMEOUT)
    }
  };
})();
