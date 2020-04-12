<template>
	<SlideshowContainer
			:slide="slide"
			:direction="direction"
	/>
</template>

<script lang="ts">
	import {Component, Vue, Watch} from 'vue-property-decorator';
	import {MovementDirection, SlideDefinition, SlideIdentifier, StepIdentifier, VueSlidesContext} from '@/vue-slides/types';
	import {VUE_SLIDES_CONTEXT_IDENTIFIER} from '@/vue-slides/internals';
	import SlideshowContainer from '@/vue-slides/views/SlideshowContainer.vue';
	import {Nullable} from '@/util/basic-types';

	@Component({
		components: {SlideshowContainer},
		[VUE_SLIDES_CONTEXT_IDENTIFIER]: true
	})
	export default class SlideshowContext extends Vue implements VueSlidesContext {

		public direction: MovementDirection = MovementDirection.NONE;
		public step: number = 1;

		private nextStep: Nullable<StepIdentifier> = null;

		public get slideNumber(): number | null {
			const slideNumberParam = this.$route.params.slideNumber;
			return slideNumberParam ? Number(slideNumberParam) : null;
		}

		public get slide(): SlideDefinition | undefined {
			return this.slideNumber != null ? this.$slidesConfig.slides[this.slideNumber - 1] : undefined;
		}

		public get absoluteStep(): number {

			if (!this.slide) {
				return 0;
			}

			return this.sumSteps(this.$slidesConfig.slides.slice(0, this.slide.index)) + this.step;

		}

		public get totalSteps(): number {
			return this.sumSteps(this.$slidesConfig.slides);
		}

		private sumSteps(slides: SlideDefinition[]): number {
			return slides.map(e => e.steps).reduce((a, c) => a + c, 0);
		}

		public goPreviousStep() {
			if (this.slide) {
				if (this.step > 1) {
					this.step--;
				} else {
					this.goPreviousSlide();
				}
			}
		}

		public goNextStep() {
			if (this.slide) {
				if (this.step < this.slide.steps) {
					this.step++;
				} else {
					this.goNextSlide();
				}
			}
		}

		public goPreviousSlide(step?: number) {
			if (this.slide) {
				this.showSlideByIndex(this.slide.index - 1, step);
			}
		}

		public goNextSlide(step?: number) {
			if (this.slide) {
				this.showSlideByIndex(this.slide.index + 1, step);
			}
		}

		public goStart() {
			this.showSlide('first', 'first');
		}

		public goEnd() {
			this.showSlide('last', 'last');
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
			if (slideIdentifier === 'first') {
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

		private showSlideByIndex(targetSlideIndex: number, step?: StepIdentifier) {

			if (this.slide && this.slide.index === targetSlideIndex) {
				this.updateCurrentSlideStep(step);
				return;
			}

			if (targetSlideIndex < 0 || targetSlideIndex >= this.$slidesConfig.slides.length) {
				return;
			}

			this.nextStep = step;
			this.navigateToSlideRoute(targetSlideIndex);

		}

		private updateCurrentSlideStep(step: Nullable<StepIdentifier>) {
			if (this.slide && step != null) {
				this.step = this.transformStepIdentifierToIndex(this.slide!, step);
			}
		}

		private navigateToSlideRoute(slideIndex: number) {
			const slideNumber = slideIndex + 1;
			this.$router.push(`${this.$slidesConfig.baseRoute}/${slideNumber}`);
		}

		@Watch('slide', {immediate: true})
		private onSlideChange(newSlide: Nullable<SlideDefinition>, previousSlide: Nullable<SlideDefinition>): void {
			if (newSlide == null || previousSlide == null) {
				this.direction = MovementDirection.NONE;
				this.step = 1;
			} else {
				this.direction = this.getMovementDirection(newSlide, previousSlide);
				this.step = this.getStepToShow(newSlide, this.direction, this.nextStep);
			}
			this.nextStep = null;
		}

		private getMovementDirection(newSlide: SlideDefinition, previousSlide: SlideDefinition): MovementDirection {
			if (newSlide.index > previousSlide.index) {
				return MovementDirection.FORWARD;
			} else if (newSlide.index < previousSlide.index) {
				return MovementDirection.BACKWARDS;
			} else {
				return MovementDirection.NONE;
			}
		}

		private getStepToShow(slide: SlideDefinition, direction: MovementDirection, nextStep: Nullable<StepIdentifier>): number {
			if (this.nextStep != null) {
				return this.transformStepIdentifierToIndex(slide, this.nextStep);
			} else {
				return direction === MovementDirection.BACKWARDS ? slide.steps : 1;
			}
		}

		private transformStepIdentifierToIndex(slide: SlideDefinition, stepIdentifier: StepIdentifier): number {
			if (stepIdentifier === 'first') {
				return 1;
			} else if (stepIdentifier === 'last') {
				return slide.steps;
			} else {
				return stepIdentifier;
			}
		}

	}
</script>
