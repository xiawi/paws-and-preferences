import { infoBtn, tooltip } from './dom.js';

infoBtn.addEventListener('click', () => {
	tooltip.classList.toggle('visible');
});
