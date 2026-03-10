/*
 * config.js
 *
 * Acts as a single source of truth for all configurable values.
 */

export const CONFIG = {
	cardWidth: 400,
	cardHeight: 600,
	maxCats: 3,
};

document.documentElement.style.setProperty('--card-width', `${CONFIG.cardWidth}px`);
document.documentElement.style.setProperty('--card-height', `${CONFIG.cardHeight}px`);
