<template>
	<transition name="fade">
		<div class="thumbnail-carrousel" v-show="visible">
			<template v-for="slide in $slidesConfig.slides">
				<FakeContext
						v-for="step in slide.steps"
						:key="slide.index + '-' + step"
						:slide="slide"
						:step="step"
						v-slot="{direction}"
						class="thumbnail-carrousel-item"
				>
					<FakeSlideshowContainer
							:slide="slide"
							:direction="direction"
					/>
				</FakeContext>
			</template>
		</div>
	</transition>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import FakeContext from '@/vue-slides/views/fakee/FakeContext.vue';
	import FakeSlideshowContainer from '@/vue-slides/views/fakee/FakeSlideshowContainer.vue';

	@Component({
		components: {FakeSlideshowContainer, FakeContext}
	})
	export default class ThumbnailCarrousel extends Vue {

		private visible: boolean = false;

		private mounted(): void {
			document.addEventListener('keydown', this.onKeyDown);
		}

		private beforeDestroy(): void {
			document.removeEventListener('keydown', this.onKeyDown);
		}

		private onKeyDown(event: KeyboardEvent): void {
			if (event.key === 'Escape') {
				this.visible = !this.visible;
				event.preventDefault();
			}
		}

	}
</script>
