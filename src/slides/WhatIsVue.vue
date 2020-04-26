<template>
	<CommonSlideMarkup title="What is Vue.js?" class="text-center">
		<p class="mt-16 italic">
			Vue is a progressive framework for building user interfaces.
		</p>
		<p class="mt-5">
			&hellip;
		</p>
		<p v-appear="$slideshow.step > 1">
			what does this mean?
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
