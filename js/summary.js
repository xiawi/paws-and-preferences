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
	summaryDiv.style.display = 'block';
}

export { showSummary };
