import Vue from 'vue';
import {SlidesExtendedVue} from '@/vue-slides/plugin/vue';
import {isVueSlidesContext} from '@/vue-slides/internals';
import PrintContext from '@/vue-slides/views/print/PrintView.vue';
import SlideshowView from '@/vue-slides/views/slideshow/SlideshowView.vue';

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
				path: component._slidesConfig.baseRoute + '/print',
				name: 'print',
				component: PrintContext
			},
			{
				path: component._slidesConfig.baseRoute + '/:slideNumber(\\d+)/:step(\\d+)?',
				name: 'slides',
				component: SlideshowView,
				props: route => {
					return {
						slideNumber: Number(route.params.slideNumber),
						step: route.params.step ? Number(route.params.step) : undefined
					};
				}
			}
		]);

	} else {
		component._slidesConfig = component.$parent?._slidesConfig;
	}
}

function initializeSlidesProperty(component: SlidesExtendedVue) {
	if (isVueSlidesContext(component)) {
		component._slideshow = component;
	} else {
		component._slideshow = component.$parent?._slideshow;
	}
}
