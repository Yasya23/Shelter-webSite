import actionWithSlider from './slider.js';
// const numCardsOnScreen = () => {
//   const screenWidth = window.innerWidth;
//   return screenWidth < 601 ? 1 : screenWidth < 1053 ? 2 : 3;
// };

document.addEventListener('click', (e) => {
  if (!e.target.id) return;
  if (e.target.id === 'previous-slide' || e.target.id === 'next-slide') {
    actionWithSlider(e.target.id);
  }
});

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
