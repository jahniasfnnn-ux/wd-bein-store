function filterGame(game, element) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = (game === 'الكل' || card.getAttribute('data-game') === game) ? 'block' : 'none';
    });
}
