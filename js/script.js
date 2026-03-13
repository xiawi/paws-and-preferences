import './theme.js';
import { loadCats } from './cats.js';
import { initCounter } from './counter.js';

loadCats().then(() => {
	import('./drag.js');
	initCounter();
});
