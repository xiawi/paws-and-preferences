/*
 * drag.js
 *
 * All the dragging logic sits here
 */

import { CONFIG } from './config.js';
import { liked, disliked } from './cats.js';
import { catContainer } from './dom.js';
import { showSummary } from './summary.js';
import { updateCounter } from './counter.js';

attachDragListeners(catContainer.lastElementChild);
let isDragging = false;
let startX = 0;
let deltaX = 0;

function attachDragListeners(card) {
	card.addEventListener('pointerdown', (e) => {
		isDragging = true;
		startX = e.clientX;
		card.style.transition = 'none';
		card.setPointerCapture(e.pointerId);
	});

	card.addEventListener('pointercancel', () => {
		isDragging = false;
		card.style.transition = '';
		card.style.transform = '';
		deltaX = 0;
	});

	card.addEventListener('pointermove', (e) => {
		if (!isDragging) return;
		deltaX = e.clientX - startX;
		const rotation = deltaX * CONFIG.rotationMultiplier;
		card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
	});

	card.addEventListener('pointerup', () => {
		isDragging = false;
		if (card.dataset.throwing)
			return;
		if (deltaX > CONFIG.deltaThreshold) {
			// If dragged past threshold towards the right, add to liked array, throw off-screen towards the right.
			card.dataset.throwing = 'true';
			liked.push(card.querySelector('img').src);
			card.style.transition = 'transform 0.5s ease';
			card.style.transform = 'translateX(1000px) rotate(30deg)';
			throwCard(card);
		} else if (deltaX < -CONFIG.deltaThreshold) {
			// If dragged past threshold towards the left, add to liked array, throw off-screen towards the left.
			card.dataset.throwing = 'true';
			disliked.push(card.querySelector('img').src);
			card.style.transition = 'transform 0.5s ease';
			card.style.transform = 'translateX(-1000px) rotate(-30deg)';
			throwCard(card);
		} else {
			// Snap back to original position
			card.style.transition = '';
			card.style.transform = '';
			deltaX = 0;
		}
	});
}

function throwCard(card) {
	const nextCard = card.previousElementSibling;
	if (nextCard) {
		attachDragListeners(nextCard);
	}

	let popped = false;
	card.addEventListener('transitionend', () => {
		if (!popped) { popped = true; popCard(card); }
	}, { once: true });
}

function popCard(card) {
	card.remove();
	updateCounter();
	if (!catContainer.lastElementChild) {
		showSummary();
	}
}
