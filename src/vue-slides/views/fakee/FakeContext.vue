<template>
	<div @click="$emit('click')">
		<slot :direction="direction"/>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import {MovementDirection, SlideDefinition, SlideIdentifier, StepIdentifier, VueSlidesContext} from '@/vue-slides/types';
	import {VUE_SLIDES_CONTEXT_IDENTIFIER} from '@/vue-slides/internals';

	@Component({
		[VUE_SLIDES_CONTEXT_IDENTIFIER]: true
	})
	export default class FakeContext extends Vue implements VueSlidesContext {

		@Prop({
			type: Number,
			required: true
		})
		public readonly step!: number;

		@Prop({
			type: Object,
			required: true
		})
		public readonly slide!: SlideDefinition;

		public get slideNumber(): number | null {
			return this.slide != null ? this.slide.index + 1 : null;
		}

		public get direction(): MovementDirection {
			return MovementDirection.NONE;
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
			// Do nothing
		}

		public goNextStep() {
			// Do nothing
		}

		public goPreviousSlide(step?: number) {
			// Do nothing
		}

		public goNextSlide(step?: number) {
			// Do nothing
		}

		public goStart() {
			// Do nothing
		}

		public goEnd() {
			// Do nothing
		}

		public showSlide(slide: SlideIdentifier, step?: StepIdentifier): void {
			// Do nothing
		}

		public showAbsoluteStep(absoluteStep: StepIdentifier): void {
			// Do nothing
		}

	}
</script>
