<template>
	<div class="control-buttons" v-if="$slides.slide">

		<div class="direction-buttons">
			<button
					type="button"
					class="previous-slide-button"
					:disabled="$slides.slide.first && $slides.step === 1"
					@click="$slides.goPreviousStep()"
					@click.ctrl="$slides.goPreviousSlide()"
			>
				<i class="fa fa-chevron-left"></i>
			</button>
			<button
					type="button"
					class="next-slide-button"
					:disabled="$slides.slide.last"
					@click="$slides.goNextStep()"
					@click.ctrl="$slides.goNextSlide()"
			>
				<i class="fa fa-chevron-right"></i>
			</button>
		</div>

		<div class="fullscreen-button">
			<button type="button" @click="toggleFullscreen">
				<i class="fa fa-expand"></i>
			</button>
		</div>

	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class ControlButtons extends Vue {

		private toggleFullscreen(): void {
			if (!document.fullscreenElement) {
				document.documentElement.requestFullscreen();
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				}
			}
		}

	}
</script>
