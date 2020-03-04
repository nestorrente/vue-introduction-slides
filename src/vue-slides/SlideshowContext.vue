<template>
	<SlideshowContainer
			:slide="slide"
			:direction="direction"
	/>
</template>

<script lang="ts">
	import {Component, Vue, Watch} from 'vue-property-decorator';
	import {MovementDirection, SlideDefinition, VueSlidesContext} from '@/vue-slides/types';
	import {VUE_SLIDES_CONTEXT_IDENTIFIER} from '@/vue-slides/internals';
	import SlideshowContainer from '@/vue-slides/SlideshowContainer.vue';

	@Component({
		components: {SlideshowContainer},
		[VUE_SLIDES_CONTEXT_IDENTIFIER]: true
	})
	export default class SlideshowContext extends Vue implements VueSlidesContext {

		public direction: MovementDirection = MovementDirection.NONE;
		public step: number = 1;

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

			return this.sumSteps(this.$slidesConfig.slides.slice(0, this.slide.index));

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

		public goPreviousSlide() {
			if (this.slide) {
				this.showSlideByIndex(this.slide.index - 1);
			}
		}

		public goNextSlide() {
			if (this.slide) {
				this.showSlideByIndex(this.slide.index + 1);
			}
		}

		public showSlide(slideNameOrNumber: string | number): void {
			if (typeof slideNameOrNumber === 'number') {
				this.showSlideByIndex(slideNameOrNumber - 1);
			} else {
				this.showSlideByName(slideNameOrNumber);
			}
		}

		private showSlideByIndex(targetSlideIndex: number) {

			if (this.slide && this.slide.index === targetSlideIndex) {
				return;
			}

			if (targetSlideIndex < 0 || targetSlideIndex >= this.$slidesConfig.slides.length) {
				return;
			}

			this.navigateToSlideRoute(targetSlideIndex);

		}

		private navigateToSlideRoute(slideIndex: number) {
			this.$router.push(`${this.$slidesConfig.baseRoute}/${slideIndex + 1}`);
		}

		private showSlideByName(slideNameOrNumber: string) {

			const slide = this.findSlideByName(slideNameOrNumber);

			if (!slide) {
				console.warn(`Unknown slide "${slideNameOrNumber}"`);
				return;
			}

			this.showSlideByIndex(slide.index);

		}

		private findSlideByName(slideName: string): SlideDefinition | undefined {
			return this.$slidesConfig.slides.find(s => s.name === slideName);
		}

		@Watch('slide', {immediate: true})
		private onSlideChange(newSlide: SlideDefinition | null, previousSlide: SlideDefinition | null): void {
			if (newSlide == null || previousSlide == null) {
				this.direction = MovementDirection.NONE;
				this.step = 1;
			} else {
				this.direction = this.getMovementDirection(newSlide, previousSlide);
				this.step = this.direction === MovementDirection.BACKWARDS ? newSlide.steps : 1;
			}
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

	}
</script>
