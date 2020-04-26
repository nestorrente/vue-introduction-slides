<template>
	<TouchEventsElement
			@swipe-right="$slideshow.goPreviousSlide()"
			@swipe-left="$slideshow.goNextSlide()"
	>
		<div
				class="slideshow-container"
				:class="slideshowContainerClasses"
				:style="slideshowContainerCssProperties.styles"
		>
			<Slideshow :slide="slide" :direction="direction"/>

			<ControlButtons/>

			<SlideshowPagination/>
			<SlideshowProgress/>
		</div>
	</TouchEventsElement>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import {CssClassList, CssProperties, MovementDirection, SlideDefinition} from '@/vue-slides/types';
	import ControlButtons from '@/vue-slides/views/slideshow/controls/ControlButtons.vue';
	import TouchEventsElement from '@/vue-slides/views/slideshow/TouchEventsElement.vue';
	import SlideshowPagination from '@/vue-slides/views/slideshow/SlideshowPagination.vue';
	import Slideshow from '@/vue-slides/views/slideshow/Slideshow.vue';
	import SlideshowProgress from '@/vue-slides/views/slideshow/SlideshowProgress.vue';

	@Component({
		components: {SlideshowProgress, TouchEventsElement, Slideshow, SlideshowPagination, ControlButtons}
	})
	export default class SlideshowContainer extends Vue {

		@Prop({
			type: Object,
			required: true
		})
		private slide!: SlideDefinition;

		@Prop({
			type: String,
			required: true
		})
		private direction!: MovementDirection;

		private get slideshowContainerCssProperties(): CssProperties {
			return this.slide.css.slideshowContainer || {};
		}

		private get slideshowContainerClasses(): CssClassList[] {

			const builtInClasses: CssClassList = {
				'dark-mode': this.slide.darkMode
			};

			const classLists: CssClassList[] = [
				builtInClasses
			];

			if (this.slideshowContainerCssProperties.classes) {
				classLists.push(this.slideshowContainerCssProperties.classes);
			}

			return classLists;

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
						this.$slideshow.goPreviousSlide();
					} else {
						this.$slideshow.goPreviousStep();
					}
					event.preventDefault();
					break;
				case 'ArrowRight':
					if (event.ctrlKey) {
						this.$slideshow.goNextSlide();
					} else {
						this.$slideshow.goNextStep();
					}
					event.preventDefault();
					break;
				case ' ':
					if (event.shiftKey) {
						this.$slideshow.goPreviousStep();
					} else {
						this.$slideshow.goNextStep();
					}
					event.preventDefault();
					break;
				case 'PageUp':
					this.$slideshow.goPreviousSlide();
					event.preventDefault();
					break;
				case 'PageDown':
					this.$slideshow.goNextSlide();
					event.preventDefault();
					break;
				case 'Home':
					this.$slideshow.goStart();
					event.preventDefault();
					break;
				case 'End':
					this.$slideshow.goEnd();
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
