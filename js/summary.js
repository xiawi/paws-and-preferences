/*
 * summary.js
 *
 * Everything related to the summary after the swiping lives here.
 */

import { CONFIG } from './config.js';
import { liked, disliked } from './cats.js';
import { catContainer, counterDiv, summaryDiv } from './dom.js';

function showSummary() {
	catContainer.style.display = 'none';
	counterDiv.style.display = 'none';
	summaryDiv.style.display = 'flex';
	document.body.style.overflowY = 'auto';

	const heading = document.createElement('h1');
	heading.textContent = 'Your Results';

	const stats = document.createElement('p');
	if (liked.length == 0) {
		stats.textContent = "You must hate cats, you monster. "
	} else if (liked.length == CONFIG.maxCats) {
		stats.textContent = "The world needs more people like you! "
	} 
	stats.textContent += `You liked ${liked.length} out of ${CONFIG.maxCats} cats.`

	const likedGallery = createGallery(liked, '❤️ Liked');
	const dislikedGallery = createGallery(disliked, '👎 Passed');

	summaryDiv.appendChild(heading);
	summaryDiv.appendChild(stats);
	if (likedGallery) summaryDiv.appendChild(likedGallery);
	if (dislikedGallery) summaryDiv.appendChild(dislikedGallery);
}

function createGallery(cats, label) {
	if (cats.length === 0) return null;

	const section = document.createElement('div');
	section.classList.add('gallery-section');

	const title = document.createElement('p');
	title.textContent = label;
	title.classList.add('gallery-label');

	const grid = document.createElement('div');
	grid.classList.add('gallery-grid');

	cats.forEach(src => {
	const img = document.createElement('img');
	img.src = src;
	grid.appendChild(img);
	});

	section.appendChild(title);
	section.appendChild(grid);
	return section;
}

export { showSummary };
