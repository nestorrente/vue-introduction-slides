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
	import code from 'raw-loader!./samples/vue-instance/VueInstanceSampleRenderFunction.txt';

	@Component({
		components: {Window, VueInstanceSample, CommonSlideMarkup}
	})
	export default class RenderFunction extends Vue {

		private code: string = code;

	}
</script>
