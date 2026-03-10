import { CONFIG } from './config.js';
import { liked, disliked } from './cats.js';
import { catContainer } from './dom.js';

const topCard = catContainer.lastElementChild;
let isDragging = false;
let startX = 0;
let deltaX = 0;

topCard.addEventListener('pointerdown', (e) => {
	isDragging = true;
	startX = e.clientX;
});

topCard.addEventListener('pointermove', (e) => {
	if (!isDragging) return;
	const deltaX = e.clientX - startX;
	const rotation = deltaX * CONFIG.rotationMultiplier;
	topCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
});

topCard.addEventListener('pointerup', () => {
	isDragging = false;
});

export { topCard };
