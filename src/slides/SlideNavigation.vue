<template>
	<CommonSlideMarkup title="Slide navigation">
		<p class="mt-10">You can navigate from one slide to another.</p>
		<p class="mt-5">
			Check this out!
			<a href="#" @click.prevent="$slides.showSlide('first')">Go back to the first slide</a>.
		</p>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class SlideNavigation extends Vue {

	}
</script>
