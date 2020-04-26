<template>
	<button
			type="button"
			class="previous-slide-button"
			:disabled="$slideshow.absoluteStep === 1"
			@click="$slideshow.goPreviousStep()"
			@click.ctrl="$slideshow.goPreviousSlide()"
	>
		<i class="fa fa-chevron-left"></i>
	</button>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class PreviousSlideButton extends Vue {

	}
</script>
