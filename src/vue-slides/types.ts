import {Component} from 'vue-router/types/router';
import {Dictionary, OnlyRequired} from '@/util/basic-types';

export type CssClassList = string | string[] | Dictionary<any>;

export interface CssProperties {
	classes?: CssClassList;
	styles?: Partial<CSSStyleDeclaration>;
}

export type PrintSteps = 'none' | 'all' | 'first' | 'last' | number | number[];

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
	printSteps: PrintSteps;
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

export type SlideIdentifier = string | number | 'first' | 'last';
export type StepIdentifier = number | 'first' | 'last';

export interface VueSlidesContext {

	readonly direction: MovementDirection;
	readonly slide: SlideDefinition;
	readonly step: number;

	readonly absoluteStep: number;
	readonly totalSteps: number;

	goPreviousStep(): void;

	goNextStep(): void;

	goPreviousSlide(): void;

	goNextSlide(): void;

	goStart(): void;

	goEnd(): void;

	showSlide(slide: SlideIdentifier, step?: StepIdentifier): void;

}
