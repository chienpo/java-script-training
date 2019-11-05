export const onClickOutside = elem => {
  document.addEventListener(elem, 'click', ({ target }) => {
    target.parentNode.classList.toggle('opened');
  });

  document.addEventListener(document, 'mouseup', ({ target }) => {
    if (!target.parentNode.classList.contains('opened')) {
      elem.forEach(dropDown => dropDown.classList.remove('opened'));
    }
  });
};
