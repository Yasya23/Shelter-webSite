import animals from './data.js';

// const card = document.querySelector('.card');
const modalWindow = document.querySelector('.modal');

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalWindow.style.display !== 'none') {
    closeModalWindow();
  }
});

document.addEventListener('click', (e) => {
  const clickPopup = e.target.closest('.header__popup');
  const clickedCard = e.target.closest('.card');
  if (clickedCard) {
    const id = clickedCard.getAttribute('id');
    showModalWindow(id);
  } else if (e.target.parentElement.classList.contains('card')) {
    const id = e.target.parentElement.getAttribute('id');
    showModalWindow(id);
  }

  if (e.target === modalWindow || e.target.closest('.modal__close-btn')) {
    closeModalWindow();
  }

  if (clickPopup) {
    togglePopupMenu();
  }
});

function togglePopupMenu() {
  const navList = document.querySelector('.navigation');
  const nav = document.querySelector('.header__navigation');
  const popup = document.getElementById('popup-button');
  nav.classList.toggle('header__navigation_visible');

  if (navList.classList.contains('navigation_visible')) {
    hideMenu(navList);
  } else {
    showMenu(navList);
  }
  blockVerticalScroll();

  popup.classList.toggle('header__popup_open');
}

function showMenu(nav) {
  nav.classList.add('navigation_visible');
  nav.classList.remove('navigation_hidden');
}

function hideMenu(nav) {
  nav.classList.add('navigation_hidden');
  nav.classList.remove('navigation_visible');
}

function blockVerticalScroll() {
  document.body.style.overflowY =
    document.body.style.overflowY === 'hidden' ? 'auto' : 'hidden';
}

function showModalWindow(id) {
  if (id) {
    renderModalInformation(id);
    modalWindow.style.display = 'block';
    document.body.style.overflowY = 'hidden';
  }
}

function closeModalWindow() {
  modalWindow.style.display = 'none';
  document.body.style.overflowY = 'auto';
}

function renderModalInformation(id) {
  const animal = animals.filter((animal) => animal.name === id);
  const {
    age,
    imgHight,
    alt,
    breed,
    description,
    diseases,
    inoculations,
    name,
    parasites,
    type,
  } = animal[0];
  modalWindow.innerHTML = `<div id="modal-window" class="modal__wrapper">
        <button class="modal__close-btn">x</button>
        <div class="modal__img-box">
          <img  class="modal__img" src=${imgHight} alt=${alt}>
        </div>
        <div class="modal__content">
          <h3 class="modal__title">${name}</h3>
          <h4 class="modal__subtitle">${type} - ${breed}</h4>
          <p class="modal__text">${description}</p>
          <ul class="modal__list list-modal">
            <li class="list-modal__item">
              <span class="list-modal__title">Age:</span>
              <span class="list-modal__value">${age}</span>
            </li>
            <li class="list-modal__item">
              <span class="list-modal__title">Inoculations:</span>
              <span class="list-modal__value">${inoculations}</span>
            </li>
            <li class="list-modal__item">
              <span class="list-modal__title">Diseases:</span>
              <span class="list-modal__value">${diseases}</span>
            </li>
            <li class="list-modal__item">
              <span class="list-modal__title">Parasites:</span>
              <span class="list-modal__value">${parasites}</span>
            </li>
          </ul>
        </div>`;
}
