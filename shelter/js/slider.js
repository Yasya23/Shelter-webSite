import animals from './data.js';

document.addEventListener('click', (e) => {
  if (!e.target.id) return;
  if (e.target.id === 'previous-slide' || e.target.id === 'next-slide') {
    actionWithSlider(e.target.id);
  }
});

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

  currentPosition === 0
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
  if (previousShownCards.length === 0) previousShownCards = shownCards;

  document.querySelector('.slider__cards')?.remove();

  const cardsList = document
    .querySelector('.slider__wrapper')
    .appendChild(document.createElement('ul'));

  cardsList.classList.add('slider__cards', animationClass);

  cardsList.innerHTML = cardsArray
    .map(
      ({ img, alt, name }) => `
    <li class="slider__card card" id="${name}">
        <img class="card__img" src="${img}" alt="${alt}">
        <p class="card__title">${name}</p>
        <button class="card__button button button-outline">Learn more</button>
    </li>
`
    )
    .join('');

  if (previousShownCards.length === 0) previousShownCards = shownCards;
}

function selectRandomCards(sourceArray) {
  const selectedCards = sourceArray.sort(() => Math.random() - 0.5).slice(0, 3);
  renderCards(selectedCards);
}

selectRandomCards(animals);
