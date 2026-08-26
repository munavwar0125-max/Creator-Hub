
const cards = document.querySelectorAll('.fCard');

cards.forEach(card => {
  const inner = card.querySelector('.fInner');
  let isOpen = false;

  card.setAttribute('aria-pressed', 'false');

  card.addEventListener('click', () => {
    isOpen = !isOpen;

    inner.style.transform = isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)';
    card.setAttribute('aria-pressed', isOpen);
  });
});