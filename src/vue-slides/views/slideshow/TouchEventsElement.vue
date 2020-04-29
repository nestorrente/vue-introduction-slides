<template>
	<v-touch
			v-if="touchDevice"
			:options="hammerOptions"
			:swipe-options="swipeOptions"
			:pinch-options="pinchOptions"
			@swiperight="$emit('swipe-right')"
			@swipeleft="$emit('swipe-left')"
			@pinchout="$emit('pinch-out')"
	>
		<slot/>
	</v-touch>
	<div v-else>
		<slot/>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import SlideContext from '@/vue-slides/views/slideshow/SlideContext.vue';
	import ControlButtons from '@/vue-slides/views/slideshow/controls/ControlButtons.vue';
	import {isTouchDevice} from '@/vue-slides/internals';
	import {Dictionary} from '@/util/basic-types';
	import Hammer from 'hammerjs';

	@Component({
		components: {ControlButtons, SlideContext}
	})
	export default class TouchEventsElement extends Vue {

		private touchDevice: boolean = isTouchDevice();

		private hammerOptions: Dictionary<any> = {
			cssProps: {
				userSelect: true
			}
		};

		private swipeOptions: Dictionary<any> = {
			direction: Hammer.DIRECTION_HORIZONTAL
		};

		private pinchOptions: Dictionary<any> = {
			threshold: 1
		};

	}
</script>
