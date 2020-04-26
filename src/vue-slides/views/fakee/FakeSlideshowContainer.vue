r
<template>
	<div
			ref="fakeSlideshowContainer"
			class="slideshow-container fake-slideshow-container"
			:class="slideshowContainerClasses"
			:style="slideshowContainerCssProperties.styles"
	>
		<Slideshow :slide="slide" :direction="direction"/>

		<SlideshowPagination/>
		<SlideshowProgress/>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import {CssClassList, CssProperties, MovementDirection, SlideDefinition} from '@/vue-slides/types';
	import SlideshowPagination from '@/vue-slides/views/slideshow/SlideshowPagination.vue';
	import Slideshow from '@/vue-slides/views/slideshow/Slideshow.vue';
	import SlideshowProgress from '@/vue-slides/views/slideshow/SlideshowProgress.vue';

	// const FAKE_SLIDESHOW_WIDTH_CSS_VARIABLE = '--fake-slideshow-width';

	@Component({
		name: 'FakeSlideshowContainer',
		components: {SlideshowProgress, Slideshow, SlideshowPagination}
	})
	export default class FakeSlideshowContainer extends Vue {

		public $refs!: {
			fakeSlideshowContainer: HTMLDivElement
		};

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

		// @Prop({
		// 	type: [String, Number],
		// 	required: true
		// })
		// private width!: string | number;

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

		// private mounted() {
		// 	this.updateWidthCssVariable();
		// }
		//
		// @Watch('width')
		// private onWidthChange(width: number) {
		// 	// Ignore if component has not been mounted yet
		// 	if (this.$refs.fakeSlideshowContainer) {
		// 		this.updateWidthCssVariable();
		// 	}
		// }
		//
		// private updateWidthCssVariable() {
		// 	const cssWidthValue = this.convertToCssSizeValue(this.width);
		// 	this.$refs.fakeSlideshowContainer.style.setProperty(FAKE_SLIDESHOW_WIDTH_CSS_VARIABLE, cssWidthValue);
		// }
		//
		// private convertToCssSizeValue(size: string | number): string {
		// 	if (typeof size === 'number') {
		// 		return size + 'px';
		// 	} else {
		// 		return size;
		// 	}
		// }

	}
</script>
