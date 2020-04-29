r
<template>
	<div
			ref="fakeSlideshowContainer"
			class="slideshow-container fake-slideshow-container"
			:class="slideshowContainerClasses"
			:style="slideshowContainerCssProperties.styles"
	>
		<Slideshow :slide="slide" :direction="direction"/>

		<SlideshowPagination v-if="!hidePagination"/>
		<SlideshowProgress v-if="!hideProgress"/>
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

		@Prop({
			type: Boolean,
			default: false
		})
		private hidePagination!: boolean;

		@Prop({
			type: Boolean,
			default: false
		})
		private hideProgress!: boolean;

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

	}
</script>
