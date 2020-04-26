<template>
	<button type="button" @click="toggleFullscreen">
		<i class="fa fa-expand"></i>
	</button>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class FullScreenButton extends Vue {

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
