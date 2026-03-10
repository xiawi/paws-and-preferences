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

cats.forEach(cat => {
	const card = document.createElement('div');
	card.classList.add('card');
	const img = document.createElement('img');
	img.src = cat;
	card.appendChild(img);
	catContainer.appendChild(card);
});

export { liked, disliked };
