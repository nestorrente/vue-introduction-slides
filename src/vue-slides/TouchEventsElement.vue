<template>
	<v-touch
			v-if="touchDevice"
			:options="hammerOptions"
			:swipe-options="swipeOptions"
			@swiperight="$slides.goPreviousSlide()"
			@swipeleft="$slides.goNextSlide()"
	>
		<slot/>
	</v-touch>
	<div v-else>
		<slot/>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import SlideContext from '@/vue-slides/SlideContext.vue';
	import ControlButtons from '@/vue-slides/ControlButtons.vue';
	import Hammer from 'hammerjs';
	import {isTouchDevice} from '@/vue-slides/internals';
	import {Dictionary} from '@/util/basic-types';

	@Component({
		components: {ControlButtons, SlideContext}
	})
	export default class SlideshowContainer extends Vue {

		private touchDevice: boolean = isTouchDevice();

		private hammerOptions: Dictionary<any> = {
			cssProps: {
				userSelect: true
			}
		};

		private swipeOptions: Dictionary<any> = {
			direction: Hammer.DIRECTION_HORIZONTAL
		};

	}
</script>
