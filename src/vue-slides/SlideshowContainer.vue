<template>
	<TouchEventsElement>
		<div
				class="slideshow-container"
				:class="[{'dark-mode': slide && slide.darkMode}, slideshowContainerCssProperties.classes]"
				:style="slideshowContainerCssProperties.styles"
		>
			<div
					class="slideshow"
					:class="slideshowCssProperties.classes"
					:style="slideshowCssProperties.styles"
			>
				<template v-if="slide != null">

					<slot name="before-slide"/>

					<transition
							:name="slideTransition"
							@before-enter="$emit('transition-start')"
							@after-leave="$emit('transition-end')"
					>
						<SlideContext
								:key="slide.name"
								:definition="slide"
								:step="slideInitialStep"
						/>
					</transition>

				</template>
			</div>

			<p class="slideshow-pagination">
				{{ $slides.slide.index + 1 }}
				/
				{{ $slidesConfig.slides.length }}
			</p>

			<ControlButtons/>
		</div>
	</TouchEventsElement>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import {CssProperties, MovementDirection, SlideDefinition} from '@/vue-slides/types';
	import SlideContext from '@/vue-slides/SlideContext.vue';
	import ControlButtons from '@/vue-slides/ControlButtons.vue';
	import Hammer from 'hammerjs';
	import TouchEventsElement from '@/vue-slides/TouchEventsElement.vue';

	@Component({
		components: {TouchEventsElement, ControlButtons, SlideContext}
	})
	export default class SlideshowContainer extends Vue {

		private swipeDirection: number = Hammer.DIRECTION_HORIZONTAL;

		@Prop({
			type: Object,
			required: false
		})
		private slide?: SlideDefinition;

		@Prop({
			type: String,
			required: true
		})
		private direction!: MovementDirection;

		private get slideInitialStep(): number {
			return this.slide != null && this.direction === MovementDirection.BACKWARDS ? this.slide.steps : 1;
		}

		private get slideshowCssProperties(): CssProperties {
			return this.slide && this.slide.css.slideshow || {};
		}

		private get slideshowContainerCssProperties(): CssProperties {
			return this.slide && this.slide.css.slideshowContainer || {};
		}

		private get slideTransition(): string | null {
			switch (this.direction) {
				case MovementDirection.BACKWARDS:
					return 'slide-change-backwards';
				case MovementDirection.FORWARD:
					return 'slide-change-forward';
				default:
					return null;
			}
		}

		private mounted(): void {
			document.addEventListener('keydown', this.onKeyDown);
		}

		private beforeDestroy(): void {
			document.removeEventListener('keydown', this.onKeyDown);
		}

		private onKeyDown(event: KeyboardEvent): void {

			if (this.isSlideOrDescendantElement(event.target)) {
				return;
			}

			switch (event.key) {
				case 'ArrowLeft':
					if (event.ctrlKey) {
						this.$slides.goPreviousSlide();
					} else {
						this.$slides.goPreviousStep();
					}
					event.preventDefault();
					break;
				case 'ArrowRight':
					if (event.ctrlKey) {
						this.$slides.goNextSlide();
					} else {
						this.$slides.goNextStep();
					}
					event.preventDefault();
					break;
				case ' ':
					if (event.shiftKey) {
						this.$slides.goPreviousStep();
					} else {
						this.$slides.goNextStep();
					}
					event.preventDefault();
					break;
				case 'Home':
					this.$slides.showSlide(1);
					event.preventDefault();
					break;
				case 'End':
					this.$slides.showSlide(this.$slidesConfig.slides.length);
					event.preventDefault();
					break;
				default:
					console.log('Key: ->' + event.key + '<-');
			}
		}

		private isSlideOrDescendantElement(eventTarget: EventTarget | null) {
			// FIXME find a better way to know this
			return eventTarget instanceof HTMLElement && (
				eventTarget.classList.contains('slide')
				|| eventTarget.closest('.slide') != null
			);
		}

	}
</script>
