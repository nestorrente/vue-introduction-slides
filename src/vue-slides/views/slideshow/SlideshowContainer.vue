<template>
	<TouchEventsElement
			@swipe-right="$slideshow.goPreviousSlide()"
			@swipe-left="$slideshow.goNextSlide()"
			@pinch-out="onPinchOut"
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

		private onPinchOut() {
			alert('Pinched out!');
		}

	}
</script>
