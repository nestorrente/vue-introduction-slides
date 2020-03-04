<template>
	<CommonSlideMarkup title="What is Vue.js?">
		<p v-appear="$slides.step > 1">
			Vue is a progressive framework for building user interfaces.
		</p>
		<p v-appear="$slides.step > 2">
			But... <span v-appear="$slides.step > 3">what does this mean?</span>
		</p>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class Vuelcome extends Vue {

	}
</script>
