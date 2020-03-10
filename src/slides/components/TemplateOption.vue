<template>
	<CommonSlideMarkup title="Template option">
		<div class="grid grid-cols-2 gap-5 items-center mt-12">
			<highlight-code v-for="(code, index) in codes" :key="index  " :lang="'vue'">
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
	import templateExampleCode from 'raw-loader!../samples/vue-instance/VueInstanceSampleTemplate.txt';
	import templateStringExampleCode from 'raw-loader!../samples/vue-instance/VueInstanceSampleTemplateString.txt';

	@Component({
		components: {Window, VueInstanceSample, CommonSlideMarkup}
	})
	export default class TemplateOption extends Vue {

		private codes: string[] = [
			templateExampleCode,
			templateStringExampleCode
		];

	}
</script>
