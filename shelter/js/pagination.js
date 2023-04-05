import animals from './data.js';

const pageNumberHtml = document.getElementById('page-number');

const cardsArray = [];
let pageNumber = 1;
const cardsOnPage = () => {
  const screenWidth = window.innerWidth;
  return screenWidth < 601 ? 3 : screenWidth < 1053 ? 6 : 8;
};
const pageQuantity = 48 / cardsOnPage;

document.querySelector('.pagination').addEventListener('click', (e) => {
  if (e.target.id && !e.target.parentNode.disabled) {
    const action = e.target.id || e.target.parentElement.id;
    actionWithPagination(action);
  }
});

window.onresize = function () {
  console.log(cardsOnPage());
  // if (screenWidth !== prevScreenWidth) {
  //   console.log(1);
  // }
};

function createCardsArray(sourceArray) {
  const maxElementsInArray = 8;
  const cardsArray = new Array(6)
    .fill([...sourceArray])
    .map((arr) =>
      arr.sort(() => Math.random() - 0.5).slice(0, maxElementsInArray)
    )
    .flat();

  renderCards(cardsArray);
}

function renderCards(cardsArray) {
  const cardsList = document.querySelector('.friends__list');
  const cardsToShow = cardsOnPage();
  let cards = '';
  for (let i = 0; i < cardsToShow; i++) {
    const { img, alt, name } = cardsArray[i];
    cards += `<li class="slider__card card">
                  <img class="card__img" src=${img} alt=${alt}>
                  <p class="card__title">${name}</p>
                  <button class="card__button button button-outline">Learn more</button>
                </li>`;
  }
  cardsList.innerHTML = cards;
}

createCardsArray(animals);

function actionWithPagination(action) {
  const toFirstPage = document.getElementById('to-first-page');
  const previousPage = document.getElementById('previous-page');
  const nextPage = document.getElementById('next-page');
  const toLastPage = document.getElementById('to-last-page');

  action === 'next-page'
    ? pageNumber++
    : action === 'to-last-page'
    ? (pageNumber = pageQuantity)
    : action === 'previous-page'
    ? pageNumber--
    : (pageNumber = 1);

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

  pageNumberHtml.textContent = pageNumber;
}

function addBtnInactiveClass(...elements) {
  const elementClass = 'pagination__btn_inactive';
  elements.forEach((el) => el.classList.add(elementClass));
}

function removeBtnInactiveClass(...elements) {
  const elementClass = 'pagination__btn_inactive';
  elements.forEach((el) => el.classList.remove(elementClass));
}
