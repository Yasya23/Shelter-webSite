import animals from './data.js';

const pageNumberHtml = document.getElementById('page-number');

const cardsOnPage = () => {
  const screenWidth = window.innerWidth;
  return screenWidth < 601 ? 3 : screenWidth < 1053 ? 6 : 8;
};
const QUANTITY_CARDS_IN_ARRAY = 48;
let arrayWithCards = [];
let pageNumber = 1;
let pageQuantity = QUANTITY_CARDS_IN_ARRAY / cardsOnPage();

let previousCardsOnPage = 0;
let startCardsPosition = 0;

window.onresize = function () {
  const cardsPerPage = cardsOnPage();

  if (cardsPerPage !== previousCardsOnPage) {
    // console.log(previousCardsOnPage);
    startCardsPosition =
      pageNumber !== 1
        ? Math.round(pageNumber * previousCardsOnPage - cardsPerPage)
        : 0;
    pageQuantity = QUANTITY_CARDS_IN_ARRAY / cardsPerPage;
    pageNumber =
      pageNumber > 1
        ? Math.round((pageNumber * previousCardsOnPage) / cardsPerPage)
        : 1;
  }
  isDisable();
  renderCards(arrayWithCards);
};

document.querySelector('.pagination').addEventListener('click', (e) => {
  if (e.target.id) actionWithPagination(e.target.id);
});

function actionWithPagination(action) {
  if (action === 'next-page') {
    if (pageNumber < pageQuantity) pageNumber++;
    startCardsPosition += cardsOnPage();
    renderCards(arrayWithCards);
  } else if (action === 'to-last-page') {
    pageNumber = pageQuantity;
    startCardsPosition = QUANTITY_CARDS_IN_ARRAY - cardsOnPage();
    renderCards(arrayWithCards);
  } else if (action === 'previous-page') {
    if (pageNumber > 1) {
      pageNumber--;
    }
    startCardsPosition -= cardsOnPage();
    renderCards(arrayWithCards);
  } else {
    pageNumber = 1;
    startCardsPosition = 0;
    renderCards(arrayWithCards);
  }
  isDisable();
}

function isDisable() {
  const toFirstPage = document.getElementById('to-first-page');
  const previousPage = document.getElementById('previous-page');
  const nextPage = document.getElementById('next-page');
  const toLastPage = document.getElementById('to-last-page');

  pageNumber === 1
    ? ((toFirstPage.disabled = true),
      (previousPage.disabled = true),
      addBtnInactiveClass(toFirstPage, previousPage))
    : ((toFirstPage.disabled = false),
      (previousPage.disabled = false),
      removeBtnInactiveClass(toFirstPage, previousPage));

  pageNumber === pageQuantity
    ? ((nextPage.disabled = true),
      (toLastPage.disabled = true),
      addBtnInactiveClass(nextPage, toLastPage))
    : ((nextPage.disabled = false),
      (toLastPage.disabled = false),
      removeBtnInactiveClass(nextPage, toLastPage));
}

function addBtnInactiveClass(...elements) {
  const elementClass = 'pagination__btn_inactive';
  elements.forEach((el) => el.classList.add(elementClass));
}

function removeBtnInactiveClass(...elements) {
  const elementClass = 'pagination__btn_inactive';
  elements.forEach((el) => el.classList.remove(elementClass));
}

function renderCards(cardsArray) {
  pageNumberHtml.textContent = pageNumber;
  const cardsList = document.querySelector('.friends__list');
  const startPosition = startCardsPosition;
  const endPosition = cardsOnPage() + startPosition;
  console.log(startPosition, endPosition);
  const cards = cardsArray
    .slice(startPosition, endPosition)
    .map(
      ({ img, alt, name }) =>
        `<li class="slider__card card" id=${name}>
      <img class="card__img" src="${img}" alt="${alt}">
      <p class="card__title">${name}</p>
      <button class="card__button button button-outline">Learn more</button>
    </li>`
    )
    .join('');

  cardsList.innerHTML = cards;
  previousCardsOnPage = cardsOnPage();
}

function createCardsArray(sourceArray) {
  const maxElementsInArray = 8;
  const sortCardsArray = new Array(6)
    .fill([...sourceArray])
    .map((arr) =>
      arr.sort(() => Math.random() - 0.5).slice(0, maxElementsInArray)
    )
    .flat();
  arrayWithCards = sortCardsArray;
  renderCards(sortCardsArray);
}

createCardsArray(animals);
