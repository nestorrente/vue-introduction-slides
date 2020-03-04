import Vue from 'vue';
import {VueSlidesContext} from '@/vue-slides/types';

export const VUE_SLIDES_CONTEXT_IDENTIFIER: Readonly<string> = 'vue-slides-context-' + Math.floor(Number.MAX_SAFE_INTEGER * Math.random());

export function isVueSlidesContext(vueComponent: Vue & any): vueComponent is VueSlidesContext {
	return vueComponent.$options[VUE_SLIDES_CONTEXT_IDENTIFIER];
}

export function isTouchDevice(): boolean {
	try {
		document.createEvent('TouchEvent');
		return true;
	} catch {
		return false;
	}
}
