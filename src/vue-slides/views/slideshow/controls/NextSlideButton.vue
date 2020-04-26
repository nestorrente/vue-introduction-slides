<template>
	<button
			type="button"
			class="next-slide-button"
			:disabled="$slideshow.absoluteStep === $slideshow.totalSteps"
			@click="$slideshow.goNextStep()"
			@click.ctrl="$slideshow.goNextSlide()"
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
