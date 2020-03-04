import Vue from 'vue';
import WhyVueSlides from '@/slides/WhyVueSlides.vue';
import SlideNavigation from '@/slides/SlideNavigation.vue';
import VueSlideshowEngine from '@/vue-slides';
import AppearDirections from '@/slides/AppearDirections.vue';
import CodeSample from '@/slides/CodeSample.vue';
import LightMode from '@/slides/LightMode.vue';
import Vuelcome from '@/slides/Vuelcome.vue';
import AboutTheAuthor from '@/slides/AboutTheAuthor.vue';
import WhatIsVue from '@/slides/WhatIsVue.vue';
import VueFeatures from '@/slides/VueFeatures.vue';

Vue.use(VueSlideshowEngine);

export default new VueSlideshowEngine({
	baseRoute: '/slides',
	darkMode: true,
	slides: [
		{component: Vuelcome, darkMode: false},
		AboutTheAuthor,
		{component: WhatIsVue, steps: 4},
		{component: VueFeatures, steps: 40},
		{
			name: 'first',
			component: WhyVueSlides,
			steps: 5,
			darkMode: false
		},
		{
			component: AppearDirections,
			steps: 5,
		},
		SlideNavigation,
		CodeSample,
		{
			component: LightMode,
			darkMode: false
		},
		{
			component: CodeSample,
			darkMode: false
		}
	]
});
