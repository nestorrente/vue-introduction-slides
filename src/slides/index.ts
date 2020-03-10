import Vue, {CreateElement, VNode} from 'vue';
import SlideNavigation from '@/slides/SlideNavigation.vue';
import VueSlideshowEngine, {PartialSlideConfig} from '@/vue-slides';
import AppearDirections from '@/slides/AppearDirections.vue';
import CodeSample from '@/slides/CodeSample.vue';
import LightMode from '@/slides/LightMode.vue';
import Vuelcome from '@/slides/Vuelcome.vue';
import AboutTheAuthor from '@/slides/AboutTheAuthor.vue';
import VueFeatures from '@/slides/VueFeatures.vue';
import AboutEvanYou from '@/slides/AboutEvanYou.vue';
import VueInstance from '@/slides/components/VueInstance.vue';
import TemplateOption from '@/slides/components/TemplateOption.vue';
import RenderFunction from '@/slides/components/RenderFunction.vue';
import ComponentRegistration from '@/slides/components/ComponentRegistration.vue';
import DataOption from '@/slides/components/data/DataOption.vue';

Vue.use(VueSlideshowEngine);

function createTitleSlide(title: string): PartialSlideConfig {
	return {
		component: {
			render(h: CreateElement): VNode {
				return h('h1', {
					class: 'flex-grow'
				}, [title]);
			}
		},
		css: {
			slide: {
				classes: 'flex items-center'
			}
		}
	};
}

export default new VueSlideshowEngine({
	baseRoute: '/slides',
	darkMode: true,
	slides: [
		{component: Vuelcome, darkMode: false},
		AboutTheAuthor,
		createTitleSlide('About Vue'),
		AboutEvanYou,
		{component: VueFeatures, steps: 2},
		createTitleSlide('Vue instance & Components'),
		VueInstance,
		DataOption,
		TemplateOption,
		RenderFunction,
		ComponentRegistration,
		createTitleSlide('State management'),
		createTitleSlide('Calling external APIs'),
		createTitleSlide('Performance'),
		createTitleSlide('Testing'),
		createTitleSlide('Tooling & Community'),
		createTitleSlide('What\'s next?'),
		createTitleSlide('Vue Router'),
		createTitleSlide('Vue I18n'),
		createTitleSlide('SSR - Nuxt.js'),
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
