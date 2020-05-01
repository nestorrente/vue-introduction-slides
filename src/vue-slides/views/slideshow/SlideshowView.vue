<template>
	<div>
		<SlideshowContext
				ref="slideshow"
				:slide-number="slideNumber"
				:step="step"
		/>

		<!--		<ControlButtons/>-->

		<ThumbnailCarrousel
				:visible="showingThumbnailCarrousel"
				:selected-thumbnail-index="selectedThumbnailIndex"
				@thumbnail-click="onThumbnailClick"
		/>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import SlideshowContext from '@/vue-slides/views/slideshow/SlideshowContext.vue';
	import ThumbnailCarrousel from '@/vue-slides/views/slideshow/thumbnails/ThumbnailCarrousel.vue';
	import {SlideDefinition, VueSlidesContext} from '@/vue-slides';

	import {state} from '@/vue-slides/slides-store';
	import {Consumer, Nullable} from '@/util/basic-types';
	import ControlButtons from '@/vue-slides/views/slideshow/controls/ControlButtons.vue';

	console.log(state);

	@Component({
		components: {ControlButtons, ThumbnailCarrousel, SlideshowContext}
	})
	export default class SlideshowView extends Vue {

		public $refs!: {
			slideshow: VueSlidesContext
		};

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

		private showingThumbnailCarrousel: boolean = false;

		private selectedThumbnailIndex: number = 0;
		private stopSlideshowWatcher: Nullable<Consumer<void>> = null;

		private mounted(): void {
			this.stopSlideshowWatcher = this.initializeSlideshowWatcher();
			document.addEventListener('keydown', this.onKeyDown);
		}

		private initializeSlideshowWatcher() {
			return this.$watch(() => {
				return this.$refs.slideshow.absoluteStep;
			}, (absoluteStep) => {
				this.selectedThumbnailIndex = absoluteStep - 1;
			}, {
				immediate: true
			});
		}

		private beforeDestroy(): void {
			this.stopSlideshowWatcher!();
			document.removeEventListener('keydown', this.onKeyDown);
		}

		private onKeyDown(event: KeyboardEvent): void {

			if (this.isSlideOrDescendantElement(event.target)) {
				return;
			}

			if (this.showingThumbnailCarrousel) {
				this.manageKeyDownEventForThumbnailCarrousel(event);
			} else {
				this.manageKeyDownEventForSlideshow(event);
			}

		}

		private manageKeyDownEventForSlideshow(event: KeyboardEvent) {
			switch (event.key) {
				case 'ArrowLeft':
					if (event.ctrlKey) {
						this.$refs.slideshow.goPreviousSlide();
					} else {
						this.$refs.slideshow.goPreviousStep();
					}
					event.preventDefault();
					break;
				case 'ArrowRight':
					if (event.ctrlKey) {
						this.$refs.slideshow.goNextSlide();
					} else {
						this.$refs.slideshow.goNextStep();
					}
					event.preventDefault();
					break;
				case ' ':
					if (event.shiftKey) {
						this.$refs.slideshow.goPreviousStep();
					} else {
						this.$refs.slideshow.goNextStep();
					}
					event.preventDefault();
					break;
				case 'PageUp':
					this.$refs.slideshow.goPreviousSlide();
					event.preventDefault();
					break;
				case 'PageDown':
					this.$refs.slideshow.goNextSlide();
					event.preventDefault();
					break;
				case 'Home':
					this.$refs.slideshow.goStart();
					event.preventDefault();
					break;
				case 'End':
					this.$refs.slideshow.goEnd();
					event.preventDefault();
					break;
				case 'Escape':
					this.showingThumbnailCarrousel = true;
					event.preventDefault();
					break;
			}
		}

		private manageKeyDownEventForThumbnailCarrousel(event: KeyboardEvent) {
			switch (event.key) {
				case 'ArrowLeft':
					if (this.selectedThumbnailIndex > 0) {
						this.selectedThumbnailIndex--;
					}
					event.preventDefault();
					break;
				case 'ArrowRight':
					if (this.selectedThumbnailIndex < this.$refs.slideshow.totalSteps - 1) {
						this.selectedThumbnailIndex++;
					}
					event.preventDefault();
					break;
				case 'Home':
					this.selectedThumbnailIndex = 0;
					event.preventDefault();
					break;
				case 'End':
					this.selectedThumbnailIndex = this.$refs.slideshow.totalSteps - 1;
					event.preventDefault();
					break;
				case 'Enter':
					this.$refs.slideshow.showAbsoluteStep(this.selectedThumbnailIndex + 1);
					this.showingThumbnailCarrousel = false;
					event.preventDefault();
					break;
				case 'Escape':
					this.showingThumbnailCarrousel = false;
					event.preventDefault();
					break;
			}
		}

		private isSlideOrDescendantElement(eventTarget: EventTarget | null) {
			// FIXME find a better way to know this
			return eventTarget instanceof HTMLElement && (
					eventTarget.classList.contains('slide')
					|| eventTarget.closest('.slide') != null
			);
		}

		private onThumbnailClick(slide: SlideDefinition, step: number) {
			this.$refs.slideshow.showSlide(slide.index + 1, step);
			this.showingThumbnailCarrousel = false;
		}

	}
</script>
