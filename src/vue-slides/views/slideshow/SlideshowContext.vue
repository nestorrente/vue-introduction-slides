<template>
	<SlideshowContainer
			:slide="slide"
			:direction="direction"
	/>
</template>

<script lang="ts">
	import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
	import {MovementDirection, SlideDefinition, SlideIdentifier, StepIdentifier, VueSlidesContext} from '@/vue-slides/types';
	import {VUE_SLIDES_CONTEXT_IDENTIFIER} from '@/vue-slides/internals';
	import SlideshowContainer from '@/vue-slides/views/slideshow/SlideshowContainer.vue';
	import {Nullable} from '@/util/basic-types';

	@Component({
		components: {SlideshowContainer},
		[VUE_SLIDES_CONTEXT_IDENTIFIER]: true
	})
	export default class SlideshowContext extends Vue implements VueSlidesContext {

		@Prop({
			type: Number,
			required: true
		})
		public readonly slideNumber!: number;

		@Prop({
			type: Number,
			default: 1
		})
		public readonly step!: number;

		private previousSlide: Nullable<SlideDefinition> = null;
		private previousStep: Nullable<number> = null;

		public get direction(): MovementDirection {
			if (this.previousSlide != null) {
				if (this.slide.index > this.previousSlide.index) {
					return MovementDirection.FORWARD;
				} else if (this.slide.index < this.previousSlide.index) {
					return MovementDirection.BACKWARDS;
				} else if (this.previousStep != null) {
					if (this.step > this.previousStep) {
						return MovementDirection.FORWARD;
					} else if (this.step < this.previousStep) {
						return MovementDirection.BACKWARDS;
					}
				}
			}
			return MovementDirection.NONE;
		}

		public get slide(): SlideDefinition {
			return this.$slidesConfig.slides[this.slideNumber - 1];
		}

		public get absoluteStep(): number {
			return this.sumSteps(this.$slidesConfig.slides.slice(0, this.slide.index)) + this.step;
		}

		public get totalSteps(): number {
			return this.sumSteps(this.$slidesConfig.slides);
		}

		private sumSteps(slides: SlideDefinition[]): number {
			return slides.map(e => e.steps).reduce((a, c) => a + c, 0);
		}

		@Watch('slide', {immediate: true})
		private onSlideChange(newSlide: SlideDefinition, previousSlide: Nullable<SlideDefinition>): void {
			this.previousSlide = previousSlide;
		}

		@Watch('step', {immediate: true})
		private onStepChange(newStep: number, previousStep: Nullable<number>): void {
			this.previousStep = previousStep;
		}

		public goPreviousStep() {
			if (this.step > 1) {
				this.navigateToStepRoute(this.step - 1);
			} else {
				this.goPreviousSlide();
			}
		}

		public goNextStep() {
			if (this.step < this.slide.steps) {
				this.navigateToStepRoute(this.step + 1);
			} else {
				this.goNextSlide();
			}
		}

		public goPreviousSlide(stepIdentifier?: StepIdentifier) {
			this.showSlideByIndex(this.slide.index - 1, stepIdentifier);
		}

		public goNextSlide(stepIdentifier?: StepIdentifier) {
			this.showSlideByIndex(this.slide.index + 1, stepIdentifier);
		}

		public goStart() {
			this.showSlide('first', 'first');
		}

		public goEnd() {
			this.showSlide('last', 'last');
		}

		public showAbsoluteStep(absoluteStep: StepIdentifier): void {
			switch (absoluteStep) {
				case 'first':
					this.showSlide('first', 'first');
					break;
				case 'last':
					this.showSlide('last', 'last');
					break;
				default:
					const {slideIndex, step} = this.calculateSlideAndStepFromAbsoluteStep(absoluteStep);
					this.showSlideByIndex(slideIndex, step);
					break;
			}
		}

		public calculateSlideAndStepFromAbsoluteStep(absoluteStep: number): { slideIndex: number, step: StepIdentifier } {

			// FIXME refactor and clean this code - use the new "absoluteStepOffset" property of the SlideDefinition type

			let previousStepCount = 0;

			for (const slide of this.$slidesConfig.slides) {

				const newStepCount = previousStepCount + slide.steps;

				if (newStepCount >= absoluteStep) {
					return {
						slideIndex: slide.index,
						step: absoluteStep - previousStepCount
					};
				}

				previousStepCount = newStepCount;

			}

			return {
				slideIndex: this.$slidesConfig.slides.length - 1,
				step: 'last'
			};
		}

		public showSlide(slide: SlideIdentifier, step?: StepIdentifier): void {

			const slideNameOrIndex = this.transformSlideIdentifierToNameOrIndex(slide);

			if (typeof slideNameOrIndex === 'number') {
				this.showSlideByIndex(slideNameOrIndex, step);
			} else {
				this.showSlideByName(slideNameOrIndex, step);
			}

		}

		private transformSlideIdentifierToNameOrIndex(slideIdentifier: SlideIdentifier): string | number {
			if (typeof slideIdentifier === 'number') {
				return slideIdentifier - 1;
			} else if (slideIdentifier === 'first') {
				return 0;
			} else if (slideIdentifier === 'last') {
				return this.$slidesConfig.slides.length - 1;
			} else {
				return slideIdentifier;
			}
		}

		private showSlideByName(slideName: string, step?: StepIdentifier) {

			const slide = this.findSlideByName(slideName);

			if (!slide) {
				console.warn(`Unknown slide "${slideName}"`);
				return;
			}

			this.showSlideByIndex(slide.index, step);

		}

		private findSlideByName(slideName: string): SlideDefinition | undefined {
			return this.$slidesConfig.slides.find(s => s.name === slideName);
		}

		private showSlideByIndex(targetSlideIndex: number, stepIdentifier?: StepIdentifier) {
			if (this.isCurrentSlideIndex(targetSlideIndex)) {
				if (stepIdentifier != null) {
					this.navigateToStepRoute(stepIdentifier);
				}
			} else {
				this.navigateToSlideRoute(targetSlideIndex, stepIdentifier);
			}
		}

		private isCurrentSlideIndex(slideIndex: number) {
			return this.slide.index === slideIndex;
		}

		private navigateToStepRoute(stepIdentifier: StepIdentifier) {
			this.navigateToSlideRoute(this.slide.index, stepIdentifier);
		}

		private navigateToSlideRoute(slideIndex: number, stepIdentifier?: StepIdentifier) {

			if (!this.isValidSlideIndex(slideIndex)) {
				return;
			}

			const targetSlideNumber = slideIndex + 1;
			const targetStep = this.computeTargetStep(slideIndex, stepIdentifier);

			if (targetSlideNumber === this.slideNumber && targetStep === this.step) {
				return;
			}

			const slideRoute = `${this.$slidesConfig.baseRoute}/${targetSlideNumber}`;

			if (this.isSingleStepSlide(slideIndex)) {
				this.$router.push(slideRoute);
			} else {
				this.$router.push(`${slideRoute}/${targetStep}`);
			}

		}

		private isValidSlideIndex(targetSlideIndex: number) {
			return targetSlideIndex >= 0 && targetSlideIndex < this.$slidesConfig.slides.length;
		}

		private computeTargetStep(slideIndex: number, stepIdentifier?: StepIdentifier) {
			if (stepIdentifier != null) {
				// Si se ha especificado un paso de destino, se va a dicho paso
				return this.transformStepIdentifierToIndex(stepIdentifier);
			} else if (slideIndex >= this.slide.index) {
				// Si se avanza hacia delante, se va al primer paso de la diapositiva
				return 1;
			} else {
				// Si se va hacia atrás, se va al último paso de la diapositiva
				return this.$slidesConfig.slides[slideIndex].steps;
			}
		}

		private isSingleStepSlide(slideIndex: number) {
			return this.$slidesConfig.slides[slideIndex].steps === 1;
		}

		private transformStepIdentifierToIndex(stepIdentifier: StepIdentifier): number {
			if (stepIdentifier === 'first') {
				return 1;
			} else if (stepIdentifier === 'last') {
				return this.slide.steps;
			} else {
				return stepIdentifier;
			}
		}

	}
</script>
