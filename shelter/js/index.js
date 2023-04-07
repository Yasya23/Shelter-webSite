const card = document.querySelector('.card');
const modalWindow = document.querySelector('.modal');

document.addEventListener('click', (e) => {
  const clickedCard = e.target.closest('.card');
  if (clickedCard) {
    const id = clickedCard.getAttribute('id');
    showPopupWindow(id);
  } else if (e.target.parentElement.classList.contains('card')) {
    const id = e.target.parentElement.getAttribute('id');
    showPopupWindow(id);
  }

  if (e.target === modalWindow) {
    console.log(close);
    closeModalWindow();
  }
});

function showPopupWindow(id) {
  if (id) {
    modalWindow.style.display = 'block';
    document.body.style.overflowY = 'hidden';
  }
}

function closeModalWindow() {
  modalWindow.style.display = 'none';
  document.body.style.overflowY = 'visible';
}
