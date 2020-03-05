<template>
	<CommonSlideMarkup>
		<div class="text-center mt-5">
			<img :src="photo" class="rounded-image" :style="{width: '7em'}">
			<h2 class="mt-5">Evan You</h2>
			<h3>Vue.js Author</h3>
			<p class="mt-6">
				<small>Previously worked at Google Creative Labs</small>
			</p>
			<p class="mt-5">
				<small>
					<a href="https://twitter.com/youyuxi" target="_blank">
						<i class="fab fa-twitter"></i>
						youyuxi
					</a>
					<a href="https://github.com/yyx990803" target="_blank" class="ml-6">
						<i class="fab fa-github"></i>
						yyx990803
					</a>
				</small>
			</p>
		</div>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import photo from '@/assets/img/evan-you.jpg';

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class AboutTheAuthor extends Vue {

		private photo: string = photo;

	}
</script>
