import { catContainer, counterDiv } from './dom.js';

let counter;

function initCounter() {
	counter = document.createElement('p');
	counter.textContent = `${catContainer.children.length} cats remaining`;

	counterDiv.appendChild(counter);
}

function updateCounter() {
	counter.textContent = `${catContainer.children.length} cats remaining`;
}

export { initCounter, updateCounter };
