<template>
	<CommonSlideMarkup title="Vue instance">
		<ul class="mt-10 mb-8">
			<li>Root component of any Vue application</li>
			<li>Has the same options as components (and some other specific ones)</li>
		</ul>
		<div class="grid grid-cols-2 gap-4 items-center">
			<highlight-code :lang="'vue'">
				{{code}}
			</highlight-code>
			<Window>
				<VueInstanceSample ref="app"/>
			</Window>
		</div>
		<GlobalContext name="app" :getter="() => $refs.app"/>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import VueInstanceSample from '@/slides/samples/vue-instance/VueInstanceSample.vue';
	import Window from '@/slides/Window.vue';
	import code from 'raw-loader!../samples/vue-instance/VueInstanceSample.txt';
	import GlobalContext from '@/components/GlobalContext.vue';

	@Component({
		components: {GlobalContext, Window, VueInstanceSample, CommonSlideMarkup}
	})
	export default class VueInstance extends Vue {

		private code: string = code;

	}
</script>
