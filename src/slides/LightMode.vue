<template>
	<CommonSlideMarkup title="Light mode">
		<p class="mt-10">What do you like more, light or darkness?</p>
		<p class="mt-5">
			Well, it doesn't really matter. We have a cool light mode 😁
		</p>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class LightMode extends Vue {

	}
</script>
