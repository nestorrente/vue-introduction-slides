import Vue from 'vue';
import {SlidesExtendedVue} from '@/vue-slides/vue';
import SlideshowContext from '@/vue-slides/SlideshowContext.vue';
import {isVueSlidesContext} from '@/vue-slides/internals';

export default function installMixin() {
	Vue.mixin({
		beforeCreate(this: SlidesExtendedVue) {
			initializeSlidesConfigProperty(this);
			initializeSlidesProperty(this);
		}
	});
}

function initializeSlidesConfigProperty(component: SlidesExtendedVue) {
	if (component.$options.slides != null) {

		component._slidesConfig = component.$options.slides;

		component.$router.addRoutes([
			{
				path: component._slidesConfig.baseRoute,
				redirect: component.$slidesConfig.baseRoute + '/1'
			},
			{
				path: component._slidesConfig.baseRoute + '/:slideNumber(\\d+)',
				name: 'slides',
				component: SlideshowContext
			}
		]);

	} else {
		component._slidesConfig = component.$parent && component.$parent._slidesConfig;
	}
}

function initializeSlidesProperty(component: SlidesExtendedVue) {
	if (isVueSlidesContext(component)) {
		component._slides = component;
	} else {
		component._slides = component.$parent && component.$parent._slides;
	}
}
