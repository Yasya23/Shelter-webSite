import animals from './data.js';

document.addEventListener('click', (e) => {
  if (!e.target.id) return;
  if (e.target.id === 'previous-slide' || e.target.id === 'next-slide')
    changeSlides(e.target.id);
});

const numCardsOnScreen = () => {
  const screenWidth = window.innerWidth;
  return screenWidth < 601 ? 1 : screenWidth < 1053 ? 2 : 3;
};

const selectedCards = [];
const previousSelectedCards = [];
const nextSelectedCards = [];

function renderCards(cardsArray) {
  console.log(cardsArray);
  let cardsList = document.querySelector('.slider__cards');
  let cards = '';
  for (let i = 0; i < cardsArray.length; i++) {
    cards += `<li class="slider__card card">
                  <img class="card__img" src=${cardsArray[i].img} alt=${cardsArray[i].alt}>
                  <p class="card__title">Katrine</p>
                  <button class="card__button button button-outline">Learn more</button>
                </li>`;
  }
  cardsList.innerHTML = cards;
}

function selectRandomCards(sourceArray) {
  const maxCardsInSlider = 3;
  for (let i = 0; i < maxCardsInSlider; i++) {
    const randomIndex = Math.floor(Math.random() * sourceArray.length);
    const card = sourceArray.splice(randomIndex, 1)[0];
    selectedCards.push(card);
  }
  renderCards(selectedCards);
}

selectRandomCards(animals);

// let prevScreenWidth = window.innerWidth;
// window.onresize = function () {
//   const screenWidth = window.innerWidth;
//   if (screenWidth !== prevScreenWidth) {
//     numCardsToShow = calculateNumCardsToShow();
//     renderCards(selectedCards, numCardsToShow);
//     prevScreenWidth = screenWidth;
//   }
// };

// function showScore() {
//   let score = `Все пункты выполнены - 100`;
//   console.log(score);
// }
// showScore();
