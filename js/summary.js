/*
 * summary.js
 *
 * Everything related to the summary after the swiping lives here.
 */

import { CONFIG } from './config.js';
import { liked, disliked } from './cats.js';
import { catContainer, summaryDiv } from './dom.js';

function showSummary() {
	catContainer.style.display = 'none';
	summaryDiv.style.display = 'flex';

	const heading = document.createElement('h1');
	heading.textContent = 'Your Results';

	const stats = document.createElement('p');
	if (liked.length == 0) {
		stats.textContent = "You must hate cats, you monster. "
	} else if (liked.length == CONFIG.maxCats) {
		stats.textContent = "The world needs more people like you! "
	} 
	stats.textContent += `You liked ${liked.length} out of ${CONFIG.maxCats} cats.`

	summaryDiv.appendChild(heading);
	summaryDiv.appendChild(stats);
}

export { showSummary };
