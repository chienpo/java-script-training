import 'prismjs/themes/prism-tomorrow.css';

import { UIController } from './ui-controller';
import { bookController } from './book-controller';

import { APP_LOADING_TIMEOUT, CONTENT_LOADING_TIMEOUT } from '../constants';

export const controller = ((bookCtrl, UICtrl) => {
  const DOM = UICtrl.getDOMElements();

  const fetchData = categoryPath => {
    UICtrl.drawPreviewSpinner();

    fetch(categoryPath)
      .then(response => response.text())
      .then(data => UICtrl.drawJsPreview(data))
      .then(() => UICtrl.removePreviewSpinner())
      .catch(error => {
        throw error;
      });
  };

  const toggleActiveLink = () => {
    if (window.location.hash) {
      const tabLink = document.querySelectorAll('.nav-link');

      for (const [key, link] of tabLink.entries()) {
        link.classList.remove('active');

        if (tabLink[key].getAttribute('href') === window.location.hash) {
          // TODO: start
          setTimeout(() => {
            document.querySelector('.section-subtitle').innerHTML =
              tabLink[key].innerText;

            if (tabLink[key].getAttribute('title')) {
              document.querySelector(
                '.section-description'
              ).innerHTML = tabLink[key].getAttribute('title');
            } else {
              document.querySelector('.section-description').innerHTML = '';
            }
          }, CONTENT_LOADING_TIMEOUT);
          // TODO: end

          tabLink[key].classList.add('active');
        }
      }
    } else {
      document.querySelectorAll('.nav-link')[0].classList.add('active');
    }
  };

  const changeHashRoute = () => {
    if (window.location.hash) {
      toggleActiveLink();

      const path = `assets/js/categories/${window.location.hash.substr(1)}.js`;

      fetch(path)
        .then(response => response.text())
        .then(data => UICtrl.drawJsPreview(data))
        .then(() => fetchData(path))
        .catch(error => {
          throw error;
        });
    }
  };

  window.onhashchange = changeHashRoute;
  changeHashRoute();

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
