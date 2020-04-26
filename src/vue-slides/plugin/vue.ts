import Vue from 'vue';
import VueSlidesPlugin from '@/vue-slides/plugin/VueSlidesPlugin';
import {VueSlidesContext} from '@/vue-slides/types';

export interface SlidesExtendedVue extends Vue {
	_slidesConfig: VueSlidesPlugin;
	_slideshow: VueSlidesContext;
	$parent: SlidesExtendedVue;
}

declare module 'vue/types/vue' {
	interface Vue {
		$slidesConfig: VueSlidesPlugin;
		$slideshow: VueSlidesContext;
	}
}

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		slides?: VueSlidesPlugin;
	}
}
