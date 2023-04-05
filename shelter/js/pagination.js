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
  let elemenetsCounter = 0;
  while (elemenetsCounter !== 6) {
    const maxElementsInArray = 8;
    const arr = [...sourceArray];
    for (let i = 0; i < maxElementsInArray; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const card = arr.splice(randomIndex, 1)[0];
      cardsArray.push(card);
    }
    elemenetsCounter++;
  }
  // console.log(cardsArray);
  renderCards(cardsArray);
}

function renderCards(cardsArray) {
  const cardsList = document.querySelector('.friends__list');
  const cardsToShow = cardsOnPage();
  let cards = '';
  for (let i = 0; i < cardsToShow; i++) {
    cards += `<li class="slider__card card">
                  <img class="card__img" src=${cardsArray[i].img} alt=${cardsArray[i].alt}>
                  <p class="card__title">${cardsArray[i].name}</p>
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
