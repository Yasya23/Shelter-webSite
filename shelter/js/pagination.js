import animals from './data.js';

const pagination = document.querySelector('.pagination');
let pageNumber = 1;
let lastPage = 5;

pagination.addEventListener('click', (e) => {
  if (e.target.id && !e.target.parentNode.disabled) {
    const action = e.target.id || e.target.parentElement.id;
    actionWithPagination(action);
  }
});

function actionWithPagination(action) {
  console.log(action);
  const toFirstPage = document.getElementById('to-first-page');
  const previousPage = document.getElementById('previous-page');
  const nextPage = document.getElementById('next-page');
  const toLastPage = document.getElementById('to-last-page');
  const pageNumberHtml = document.getElementById('page-number');

  action === 'next-page'
    ? pageNumber++
    : action === 'to-last-page'
    ? (pageNumber = lastPage)
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

  pageNumber === 5
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
