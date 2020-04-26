<template>
	<p v-if="$slideshow.slide != null" class="slideshow-pagination">
		{{ $slideshow.slide.index + 1 }}
		/
		{{ $slidesConfig.slides.length }}
	</p>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class SlideshowPagination extends Vue {

	}
</script>
