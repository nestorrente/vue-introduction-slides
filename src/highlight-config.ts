import Vue from 'vue';
import VueHighlightJS from 'vue-highlight.js';
// @ts-ignore
import css from 'highlight.js/lib/languages/css';
// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript';
// @ts-ignore
import vue from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/night-owl.css';
// import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/github-gist.css';

Vue.use(VueHighlightJS, {
	// Register only languages that you want
	languages: {
		css,
		javascript,
		vue
	}
});
