import Vue from 'vue';
import VueSlidesPlugin from '@/vue-slides/VueSlidesPlugin';
import {VueSlidesContext} from '@/vue-slides/types';

export interface SlidesExtendedVue extends Vue {
	_slidesConfig: VueSlidesPlugin;
	_slides: VueSlidesContext;
	$parent: SlidesExtendedVue;
}

declare module 'vue/types/vue' {

	interface Vue {
		$slidesConfig: VueSlidesPlugin;
		$slides: VueSlidesContext;
	}
}

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		slides?: VueSlidesPlugin;
	}
}
