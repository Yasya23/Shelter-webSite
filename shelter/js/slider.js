import animals from './data.js';

let shownCards = [];
let previousShownCards = [];
let currentPosition = 0;
let animationClass = 'animation-next';

function actionWithSlider(direction) {
  if (direction === 'next-slide') {
    if (currentPosition < 1) currentPosition++;
    animationClass = 'animation-next';
  }
  if (direction === 'previous-slide') {
    if (currentPosition > -1) currentPosition--;
    animationClass = 'animation-previous';
  }

  currentPosition == 0
    ? renderCards(previousShownCards)
    : selectRandomCards(filterByShownCards());
}

function filterByShownCards() {
  const shownAnimalsNames = shownCards.map((card) => card.name);
  const filteredCards = animals.filter(
    (card) => !shownAnimalsNames.includes(card.name)
  );
  return filteredCards;
}

function renderCards(cardsArray) {
  previousShownCards = shownCards;
  shownCards = cardsArray;
  document.querySelector('.slider__cards')?.remove();

  const cardsList = document
    .querySelector('.slider__wrapper')
    .appendChild(document.createElement('ul'));
  cardsList.classList.add('slider__cards', animationClass);
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
  const selectedCards = [];
  const maxCardsInSlider = 3;
  const arr = [...sourceArray];
  for (let i = 0; i < maxCardsInSlider; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const card = arr.splice(randomIndex, 1)[0];
    selectedCards.push(card);
  }
  renderCards(selectedCards);
}

selectRandomCards(animals);

export default actionWithSlider;
