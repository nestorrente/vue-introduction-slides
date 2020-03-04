<template>
	<CommonSlideMarkup
			title="Code example"
	>
		<div class="grid grid-cols-2 gap-4 items-center">
			<highlight-code :lang="'vue'">
				{{code}}
			</highlight-code>
			<Window>
				<VModelSample/>
			</Window>
		</div>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import codeString from 'raw-loader!./samples/v-model/VModelSample.txt';
	import VModelSample from './samples/v-model/VModelSample.vue';
	import Window from '@/slides/Window.vue';

	@Component({
		components: {Window, CommonSlideMarkup, VModelSample}
	})
	export default class CodeSample extends Vue {

		private code: string = codeString;

	}
</script>
