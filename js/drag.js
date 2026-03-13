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

// Disable vertical scrolling
document.body.style.overflowY = 'hidden';
let currentCard = catContainer.lastElementChild;
attachDragListeners(catContainer.lastElementChild);
let isDragging = false;
let startX = 0;
let deltaX = 0;

function attachDragListeners(card) {
	currentCard = card;
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

		const label = card.querySelector('.swipe-label');
		const opacity = Math.min(Math.abs(deltaX) / CONFIG.deltaThreshold, 1);
		if (deltaX > 0) {
			label.textContent = 'LIKE';
			label.style.color = '#64c864';
			label.style.opacity = opacity;
		} else if (deltaX < 0) {
			label.textContent = 'NOPE';
			label.style.color = '#e8705a';
			label.style.opacity = opacity;
			label.style.left = 'auto';
			label.style.right = '20px';
			label.style.transform = 'rotate(15deg)';
		} else {
			label.style.opacity = 0;
		}
	});

	card.addEventListener('pointerup', () => {
		isDragging = false;
		if (deltaX > CONFIG.deltaThreshold) {
			// If dragged past threshold towards the right, add to liked array, throw off-screen towards the right.
			swipeRight(card);
		} else if (deltaX < -CONFIG.deltaThreshold) {
			// If dragged past threshold towards the left, add to liked array, throw off-screen towards the left.
			swipeLeft(card);
		} else {
			// Snap back to original position
			card.style.transition = '';
			card.style.transform = '';
			const label = card.querySelector('.swipe-label');
			label.style.opacity = 0;
			deltaX = 0;
		}
	});
}

function swipeRight(card) {
	if (card.dataset.throwing) return;
	card.dataset.throwing = 'true';
	liked.push(card.querySelector('img').src);
	card.style.transition = 'transform 0.5s ease';
	card.style.transform = 'translateX(1000px) rotate(30deg)';
	throwCard(card);
}

function swipeLeft(card) {
	if (card.dataset.throwing) return;
	card.dataset.throwing = 'true';
	disliked.push(card.querySelector('img').src);
	card.style.transition = 'transform 0.5s ease';
	card.style.transform = 'translateX(-1000px) rotate(-30deg)';
	throwCard(card);
}

document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowRight') 
		swipeRight(currentCard);
	else if (e.key === 'ArrowLeft') 
		swipeLeft(currentCard);
});

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
	document.body.style.background = '';
	updateCounter();
	if (!catContainer.lastElementChild) {
		showSummary();
	}
}
