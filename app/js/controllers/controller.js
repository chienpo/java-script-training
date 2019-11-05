import { UIController } from './ui-controller';
import { bookController } from './book-controller';

import { APP_LOADING_TIMEOUT } from '../constants';

export const controller = ((bookCtrl, UICtrl) => {
  const DOM = UICtrl.getDOMElements();

  const togglePreLoader = () => {
    document.addEventListener('DOMContentLoaded', () => {
      DOM.body.style.overflow = 'hidden';
      DOM.appLoader.classList.remove('hidden');
      DOM.app.style.transform = 'scale(0)';
      DOM.app.style.opacity = '0';

      setTimeout(() => {
        DOM.app.style.transform = 'scale(1)';
        DOM.app.style.opacity = '1';
        DOM.body.style.overflow = 'auto';
        DOM.appLoader.classList.add('hidden');
      }, APP_LOADING_TIMEOUT);
    });
  };

  const setEventListeners = () => {
    UICtrl.toggleMenu();
    UICtrl.onWindowResize();
  };

  return {
    init: () => {
      togglePreLoader();
      setEventListeners();
      bookCtrl.initAccordion(DOM.sideNavAccordion);
    },
  };
})(bookController, UIController);
