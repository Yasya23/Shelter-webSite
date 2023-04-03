import animals from './data.js';

document.addEventListener('click', (e) => {
  if (!e.target.id) return;
  if (e.target.id === 'previous-slide' || e.target.id === 'next-slide')
    renderSlides(e.target.id);
});

let numCardsToShow = calculateNumCardsToShow();

function calculateNumCardsToShow() {
  const screenWidth = window.innerWidth;
  let num = 0;
  screenWidth < 601 ? (num = 1) : screenWidth < 601 ? (num = 2) : (num = 3);
  return num;
}

window.onresize = function (event) {
  calculateNumCardsToShow();
  selectRandomCards(numCardsToShow, animals);
};

function renderCards() {
  let cardsList = document.querySelector('.slider__cards');
  let cards = '';
  for (let i = 0; i < 3; i++) {
    cards += `<li class="slider__card card">
                  <img class="card__img" src=${animals[i].img} alt=${animals[i].alt}>
                  <p class="card__title">Katrine</p>
                  <button class="card__button button button-outline">Learn more</button>
                </li>`;
  }
  cardsList.innerHTML = cards;
}

function selectRandomCards(numCards, sourceArray) {
  const selectedCards = [];
  for (let i = 0; i < numCards; i++) {
    const randomIndex = Math.floor(Math.random() * sourceArray.length);
    const card = sourceArray.splice(randomIndex, 1)[0];
    selectedCards.push(card);
  }
  renderCards(selectedCards);
}

selectRandomCards(numCardsToShow, animals);

// function showScore() {
//   let score = `Все пункты выполнены - 100`;
//   console.log(score);
// }
// showScore();
