import Vue from 'vue';
import {SlidesExtendedVue} from '@/vue-slides/vue';

export default function defineProperties() {
	Object.defineProperties(Vue.prototype, {
		$slidesConfig: {
			get(this: SlidesExtendedVue) {
				return this._slidesConfig;
			}
		},
		$slides: {
			get(this: SlidesExtendedVue) {
				return this._slides;
			}
		}
	});
}
