import {PartialSlideConfig, SlideDefinition} from '@/vue-slides/types';
import {Component} from 'vue-router/types/router';

export function normalizeSlidesConfig(slides: Array<PartialSlideConfig | Component>, darkMode: boolean): SlideDefinition[] {
	return slides.map((slide, index) => {
		return normalizeSlideConfig(slide, index, slides.length, darkMode);
	});
}

function normalizeSlideConfig(slideConfigOrComponent: PartialSlideConfig | Component, index: number, totalSlides: number, darkMode: boolean): SlideDefinition {
	return createSlideDefinition(index, ensureSlideConfig(slideConfigOrComponent), totalSlides, darkMode);
}

function ensureSlideConfig(slideConfigOrComponent: PartialSlideConfig | Component): PartialSlideConfig {
	return isSlideDefinition(slideConfigOrComponent)
		? slideConfigOrComponent
		: {component: slideConfigOrComponent};
}

function createSlideDefinition(index: number, slideConfig: PartialSlideConfig, totalSlides: number, darkMode: boolean): SlideDefinition {
	return {
		index,
		darkMode,
		first: index === 0,
		last: index === totalSlides - 1,
		name: `slide-${index}`,
		steps: 1,
		css: {},
		printSteps: 'all',
		...slideConfig
	};
}

function isSlideDefinition(slideConfigOrComponent: PartialSlideConfig | Component): slideConfigOrComponent is PartialSlideConfig {
	// As "component" property is present in both PartialSlideConfig and VueConstructor
	// (and VueConstructor is a possible value for a Component), it's necessary to check
	// if "slideConfigOrComponent" is a function or not, as VueConstructor is a function.
	return 'component' in slideConfigOrComponent && typeof slideConfigOrComponent !== 'function';
}
