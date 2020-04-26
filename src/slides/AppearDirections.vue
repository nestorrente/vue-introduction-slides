<template>
	<CommonSlideMarkup title="Appear directions">
		<p>
			Elements can appear from 4 different directions:
		</p>
		<ol>
			<li v-appear="$slideshow.step > 1" class="top">Top</li>
			<li v-appear="$slideshow.step > 2" class="right">Right</li>
			<li v-appear="$slideshow.step > 3" class="bottom">Bottom</li>
			<li v-appear="$slideshow.step > 4" class="left">Left</li>
		</ol>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class AppearDirections extends Vue {

	}
</script>
