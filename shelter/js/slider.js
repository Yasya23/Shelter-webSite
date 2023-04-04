import animals from './data.js';

let shownCards = [];
let previousShownCards = [];
let active = 0;
let animationClass = 'animation-next';

function actionWithSlider(direction) {
  if (direction === 'next-slide') {
    if (active < 1) active++;
    // console.log(active);
    animationClass = 'animation-next';
  }
  if (direction === 'previous-slide') {
    if (active > -1) active--;
    // console.log(active);
    animationClass = 'animation-previous';
  }
  console.log(previousShownCards);
  active == 0
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
  shownCards = cardsArray;
  if (document.querySelector('.slider__cards')) {
    document.querySelector('.slider__cards').remove();
  }

  let cardsList = document.createElement('ul');

  document.querySelector('.slider div').appendChild(cardsList);
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
  previousShownCards = [...shownCards];
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