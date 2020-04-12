<template>
	<div class="control-buttons" v-if="$slides.slide">

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
	import PreviousSlideButton from '@/vue-slides/views/controls/PreviousSlideButton.vue';
	import NextSlideButton from '@/vue-slides/views/controls/NextSlideButton.vue';
	import FullScreenButton from '@/vue-slides/views/controls/FullScreenButton.vue';

	@Component({
		components: {FullScreenButton, NextSlideButton, PreviousSlideButton}
	})
	export default class ControlButtons extends Vue {

	}
</script>
