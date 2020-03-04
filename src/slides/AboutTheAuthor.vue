<template>
	<CommonSlideMarkup>
		<div class="text-center mt-8">
			<img :src="photo" class="rounded-full" :style="{width: '7em'}">
			<h2 class="mt-5">Néstor Pérez González</h2>
			<h3>Full-stack Developer</h3>
			<p class="mt-8">
				<small>
					<a href="https://twitter.com/nestorrente" target="_blank">
						<i class="fab fa-twitter"></i>
						nestorrente
					</a>
					<a href="https://github.com/nestorrente" target="_blank" class="ml-6">
						<i class="fab fa-github"></i>
						nestorrente
					</a>
					<a href="https://www.linkedin.com/in/nestorpglez/" target="_blank" class="ml-6">
						<i class="fab fa-linkedin"></i>
						nestorpglez
					</a>
				</small>
			</p>
		</div>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import photo from '@/assets/img/photo.png';

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class AboutTheAuthor extends Vue {

		private photo: string = photo;

	}
</script>
