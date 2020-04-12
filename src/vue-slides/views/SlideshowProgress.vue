<template>
	<div class="slideshow-progress-background">
		<div
				ref="slideshowProgress"
				class="slideshow-progress"
		></div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue, Watch} from 'vue-property-decorator';

	const CSS_VARIABLE_NAME = '--slideshow-progress-percent';

	@Component
	export default class SlideshowProgress extends Vue {

		public $refs!: {
			slideshowProgress: HTMLDivElement
		};

		private get stepProgress() {

			const {
				absoluteStep,
				totalSteps
			} = this.$slides;

			// We want the first step to be the 0%
			// and the last step to be the 100%,
			// so we have to make the step 1 to be 0
			const absoluteStepOffset = absoluteStep - 1;
			const totalStepOffset = totalSteps - 1;

			return absoluteStepOffset / totalStepOffset;

		}

		@Watch('stepProgress')
		private onStepProgressChange(stepProgress: number) {
			const cssVariableValue = String(stepProgress);
			this.$refs.slideshowProgress.style.setProperty(CSS_VARIABLE_NAME, cssVariableValue);
		}

	}
</script>
