import animals from './data.js';

let shownAnimalsNames = [];
let shownCards = [];
let previousShownCards = [];
let active = 1;

function actionWithSlider(direction) {
  direction === 'previous-slide' ? active-- : active++;
  console.log(active);
  if (active < 0 || active > 2) {
    console.log(1);
    active = 1;
    previousShownCards = shownCards.slice();
    selectRandomCards(filterByShownCards());
  } else {
    console.log(previousShownCards);
    renderCards(previousShownCards);
  }
}

function filterByShownCards() {
  const filteredCards = animals.filter(
    (card) => !shownAnimalsNames.includes(card.name)
  );
  return filteredCards;
}

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
  shownAnimalsNames = [];
  const selectedCards = [];
  previousShownCards = shownCards;
  const maxCardsInSlider = 3;
  const arr = [...sourceArray];
  for (let i = 0; i < maxCardsInSlider; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const card = arr.splice(randomIndex, 1)[0];
    shownAnimalsNames.push(card.name);
    selectedCards.push(card);
  }
  shownCards = selectedCards;
  renderCards(shownCards);
}

function switchCards(direction) {
  console.log(direction);
}

selectRandomCards(animals);

export default actionWithSlider;
