export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupButtonEsc);
};

export const closePopupButtonEsc = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened')
    closePopup(openedPopup);
  };
};

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupButtonEsc);
};

export const closePopUpByClickOnOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return;
  };
  closePopup(event.target);
};



