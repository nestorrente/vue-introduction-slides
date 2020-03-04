import {Component} from 'vue-router/types/router';
import {OnlyRequired} from '@/util/basic-types';

export type CssClassList = string | string[];

export interface CssProperties {
	classes?: CssClassList;
	styles?: Partial<CSSStyleDeclaration>;
}

export interface SlideConfig {
	name: string;
	component: Component;
	steps: number;
	darkMode: boolean;
	css: {
		slideshowContainer?: CssProperties;
		slideshow?: CssProperties;
		slide?: CssProperties;
	};
	printSteps: 'none' | 'all' | 'first' | 'last' | number | number[];
}

export type SlideDefinitionRequiredProperties = 'component';
export type PartialSlideConfig = OnlyRequired<SlideConfig, SlideDefinitionRequiredProperties>;

export interface SlideDefinition extends Readonly<SlideConfig> {
	readonly index: number;
	readonly first: boolean;
	readonly last: boolean;
}

export interface VueSlidesOptions {
	baseRoute: string;
	darkMode?: boolean;
	slides: Array<PartialSlideConfig | Component>;
}

export enum MovementDirection {
	NONE = 'none',
	BACKWARDS = 'backwards',
	FORWARD = 'forward'
}

export interface VueSlidesContext {

	readonly direction: MovementDirection;
	readonly slide?: SlideDefinition;
	readonly step: number;

	readonly absoluteStep: number;
	readonly totalSteps: number;

	goPreviousStep(): void;

	goNextStep(): void;

	goPreviousSlide(): void;

	goNextSlide(): void;

	showSlide(slideNameOrNumber: string | number): void;

}
