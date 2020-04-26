<template>
	<div>
		<SlideshowContext
				:slide-number="slideNumber"
				:step="step"
		/>
		<ThumbnailCarrousel/>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import SlideshowContext from '@/vue-slides/views/slideshow/SlideshowContext.vue';
	import ThumbnailCarrousel from '@/vue-slides/views/slideshow/thumbnails/ThumbnailCarrousel.vue';

	@Component({
		components: {ThumbnailCarrousel, SlideshowContext}
	})
	export default class SlideshowView extends Vue {

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

	}
</script>
