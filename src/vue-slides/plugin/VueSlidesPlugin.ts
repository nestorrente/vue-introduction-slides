import {normalizeSlidesConfig} from '@/vue-slides/slide-definition-utils';
import install from '@/vue-slides/install';
import {SlideDefinition, VueSlidesOptions} from '@/vue-slides/types';

export default class VueSlidesPlugin {

	// Every Vue plugin must have a static "install" method
	public static readonly install = install;

	public readonly baseRoute: string;
	public readonly slides: SlideDefinition[];

	constructor(options: VueSlidesOptions) {
		this.baseRoute = options.baseRoute;
		this.slides = normalizeSlidesConfig(options.slides, !!options.darkMode);
	}

}
