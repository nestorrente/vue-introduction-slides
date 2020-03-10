<template>
	<CommonSlideMarkup title="Render function">
		<div class="mt-12 px-32">
			<highlight-code :lang="'vue'">
				{{code}}
			</highlight-code>
		</div>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import VueInstanceSample from '@/slides/samples/vue-instance/VueInstanceSample.vue';
	import Window from '@/slides/Window.vue';

	@Component({
		components: {Window, VueInstanceSample, CommonSlideMarkup}
	})
	export default class RenderFunction extends Vue {

		private code: string = `
			<div id="app"></div>

			<script>
				const app = new Vue({
					el: '#app',
					render(createElement) {
						return createElement('p', [
							\`Hello, \${this.name}!\`
						]);
					},
					data: {
						name: 'Vue'
					}
				});
			\u003c/script>
`;

	}
</script>
