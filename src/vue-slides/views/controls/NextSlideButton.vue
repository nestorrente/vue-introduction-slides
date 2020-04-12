<template>
	<button
			type="button"
			class="next-slide-button"
			:disabled="$slides.absoluteStep === $slides.totalSteps"
			@click="$slides.goNextStep()"
			@click.ctrl="$slides.goNextSlide()"
	>
		<i class="fa fa-chevron-right"></i>
	</button>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class NextSlideButton extends Vue {

	}
</script>
