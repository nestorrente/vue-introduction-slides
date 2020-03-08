<template>
	<CommonSlideMarkup title="Vue instance">
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

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class VueInstanceSample extends Vue {

		private code: string = codeString;

	}
</script>
