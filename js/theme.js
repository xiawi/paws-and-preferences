import { themeBtn } from './dom.js';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	document.body.classList.add('dark');
	themeBtn.textContent = '🌙';
}

themeBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	themeBtn.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️'
});
