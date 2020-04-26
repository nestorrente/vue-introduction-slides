<template>
	<div class="control-buttons" v-if="$slideshow.slide">

		<div class="direction-buttons">
			<PreviousSlideButton/>
			<NextSlideButton/>
		</div>

		<div class="fullscreen-button">
			<FullScreenButton/>
		</div>

	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import PreviousSlideButton from '@/vue-slides/views/slideshow/controls/PreviousSlideButton.vue';
	import NextSlideButton from '@/vue-slides/views/slideshow/controls/NextSlideButton.vue';
	import FullScreenButton from '@/vue-slides/views/slideshow/controls/FullScreenButton.vue';

	@Component({
		components: {FullScreenButton, NextSlideButton, PreviousSlideButton}
	})
	export default class ControlButtons extends Vue {

	}
</script>
