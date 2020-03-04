<template>
	<CommonSlideMarkup title="Introducing Vue.js">
		<div class="text-center mt-16">
			<img :src="vueLogo" :style="{width: '10em'}">
			<p class="mt-5 vue-font text-2xl">Vuelcome</p>
		</div>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import vueLogo from '@/assets/img/vue-logo.svg';

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class Vuelcome extends Vue {

		private vueLogo: string = vueLogo;

	}
</script>
