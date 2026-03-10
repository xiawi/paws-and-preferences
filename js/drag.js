/*
 * drag.js
 *
 * All the dragging logic sits here
 */

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
	topCard.style.transition = 'none';
});

topCard.addEventListener('pointermove', (e) => {
	if (!isDragging) return;
	deltaX = e.clientX - startX;
	const rotation = deltaX * CONFIG.rotationMultiplier;
	topCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
});

topCard.addEventListener('pointerup', () => {
	isDragging = false;
	if (deltaX > CONFIG.deltaThreshold) {
		// If dragged past threshold towards the right, throw off-screen towards the right
		topCard.style.transition = 'transform 0.5s ease';
		topCard.style.transform = 'translateX(1000px) rotate(30deg)';
	} else if (deltaX < -CONFIG.deltaThreshold) {
		// If dragged past threshold towards the left, throw off-screen towards the left
		topCard.style.transition = 'transform 0.5s ease';
		topCard.style.transform = 'translateX(-1000px) rotate(-30deg)';
	} else {
		// Snap back to original position
		topCard.style.transition = '';
		topCard.style.transform = '';
	}
	deltaX = 0;
});
