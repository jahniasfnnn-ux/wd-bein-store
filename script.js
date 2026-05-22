function filterGame(game, element) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    document.querySelectorAll('.product-card').forEach(card => {
        if (game === 'الكل' || card.getAttribute('data-game') === game) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
