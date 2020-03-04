<template>
	<CommonSlideMarkup title="Why VueSlides?">
		<transition name="fade" mode="out-in">
			<div key="logo" v-if="$slides.step <= 1" class="text-center mt-16">
				<img :src="vueLogo" :style="{width: '10em'}">
			</div>
			<ol key="list" v-if="$slides.step > 1" class="mt-20">
				<li v-appear="$slides.step > 1">It's cool</li>
				<li v-appear="$slides.step > 2">It's awesome</li>
				<li v-appear="$slides.step > 3">... <span v-appear="$slides.step > 4">what else do you need? 😍</span></li>
			</ol>
		</transition>
		<!--<button type="button">This is a button</button>-->
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import vueLogo from '@/assets/img/vue-logo.svg';

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class WhyVueSlides extends Vue {

		private vueLogo: string = vueLogo;

	}
</script>
