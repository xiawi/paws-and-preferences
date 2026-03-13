/*
 * cats.js
 *
 * Everything to do with cats lives here
 */

import { CONFIG } from './config.js'
import { catContainer } from './dom.js'

const cats = [];
const liked = [];
const disliked = [];

for (let i = 0; i < CONFIG.maxCats; i++) {
	cats.push(`https://cataas.com/cat?position=center&width=${CONFIG.cardWidth}&height=${CONFIG.cardHeight}&unique=${i}`);
}

function loadCats() {
	const loading = document.getElementById('loading');
	const promises = cats.map(src => {
		return new Promise((resolve) => {
			const card = document.createElement('div');
			card.classList.add('card');
			const img = document.createElement('img');
			img.onload = () => resolve();
			img.onerror = () => resolve();
			img.src = src;
			card.appendChild(img);
			catContainer.appendChild(card);
		});
	});

	return Promise.all(promises).then(() => {
		loading.style.display = 'none';
		loading.addEventListener('transitionend', () => loading.remove(), { once: true });
	});
}

export { liked, disliked, loadCats };
