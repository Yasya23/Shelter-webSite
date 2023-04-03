import animals from './data.js';

document.addEventListener('click', (e) => {
  if (!e.target.id) return;
  if (e.target.id === 'previous-slide' || e.target.id === 'next-slide')
    selectRandomCards(filterByShownCards());
  preveousShownCards = shownCards;
});

function filterByShownCards() {
  const filteredCards = animals.filter(
    (card) => !shownAnimalsNames.includes(card.name)
  );
  return filteredCards;
}

const numCardsOnScreen = () => {
  const screenWidth = window.innerWidth;
  return screenWidth < 601 ? 1 : screenWidth < 1053 ? 2 : 3;
};

let shownAnimalsNames = [];
let shownCards = [];
let preveousShownCards = [];

function renderCards(cardsArray) {
  let cardsList = document.querySelector('.slider__cards');
  let cards = '';
  for (let i = 0; i < cardsArray.length; i++) {
    cards += `<li class="slider__card card">
                  <img class="card__img" src=${cardsArray[i].img} alt=${cardsArray[i].alt}>
                  <p class="card__title">${cardsArray[i].name}</p>
                  <button class="card__button button button-outline">Learn more</button>
                </li>`;
  }
  cardsList.innerHTML = cards;
}

function selectRandomCards(sourceArray) {
  console.log(sourceArray);
  shownAnimalsNames = [];
  const selectedCards = [];
  const maxCardsInSlider = 3;
  for (let i = 0; i < maxCardsInSlider; i++) {
    const arr = [...sourceArray];
    const randomIndex = Math.floor(Math.random() * arr.length);
    const card = arr.splice(randomIndex, 1)[0];
    shownAnimalsNames.push(card.name);
    selectedCards.push(card);
  }
  shownCards = selectedCards;
  renderCards(selectedCards);
}

function switchCards(direction) {
  console.log(direction);
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
