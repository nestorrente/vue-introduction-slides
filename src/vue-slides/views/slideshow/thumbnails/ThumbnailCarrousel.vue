<template>
	<transition name="fade">
		<div
				ref="thumbnailCarrouselDiv"
				class="thumbnail-carrousel"
				v-show="visible"
		>
			<template v-for="slide in $slidesConfig.slides">
				<FakeContext
						v-for="(step, stepIndex) in slide.steps"
						:key="slide.index + '-' + step"
						:slide="slide"
						:step="step"
						v-slot="{direction}"
						:class="{
							'thumbnail-carrousel-item': true,
							'selected': selectedThumbnailIndex === (slide.absoluteStepOffset + stepIndex)
						}"
						@click="$emit('thumbnail-click', slide, step)"
				>
					<FakeSlideshowContainer
							:slide="slide"
							:direction="direction"
							hide-progress
					/>
				</FakeContext>
			</template>
		</div>
	</transition>
</template>

<script lang="ts">
	import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
	import FakeContext from '@/vue-slides/views/fakee/FakeContext.vue';
	import FakeSlideshowContainer from '@/vue-slides/views/fakee/FakeSlideshowContainer.vue';

	const SELECTED_THUMBNAIL_INDEX_CSS_PROPERTY_NAME = '--selected-thumbnail-index';

	@Component({
		components: {FakeSlideshowContainer, FakeContext}
	})
	export default class ThumbnailCarrousel extends Vue {

		public $refs!: {
			thumbnailCarrouselDiv: HTMLDivElement
		};

		@Prop({
			type: Boolean,
			default: false
		})
		private readonly visible!: boolean;

		@Prop({
			type: Number,
			default: 0
		})
		private readonly selectedThumbnailIndex!: number;

		private mounted() {
			this.updateSelectedThumbnailIndexCssProperty();
		}

		@Watch('selectedThumbnailIndex', {immediate: true})
		private onSelectedThumbnailIndexChange(selectedThumbnailIndex: number) {
			if (this.$refs.thumbnailCarrouselDiv != null) {
				this.updateSelectedThumbnailIndexCssProperty();
			}
		}

		private updateSelectedThumbnailIndexCssProperty() {
			this.$refs.thumbnailCarrouselDiv.style.setProperty(SELECTED_THUMBNAIL_INDEX_CSS_PROPERTY_NAME, String(this.selectedThumbnailIndex));
		}

	}
</script>
