<template>
	<CommonSlideMarkup title="Components">
		<ul class="mt-10 mb-8">
			<li>Reusable Vue instances with a name</li>
			<li>Same options as Vue instances except a few root-specific options like <code>el</code></li>
		</ul>
		<div class="grid grid-cols-2 gap-4 items-center">
			<highlight-code :lang="'vue'">
				{{code}}
			</highlight-code>
			<Window>
				<GreetingComponent/>
			</Window>
		</div>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import Window from '@/slides/Window.vue';
	import GreetingComponent from '@/slides/samples/component-basics/GreetingComponent.vue';
	import code from 'raw-loader!../samples/component-basics/GreetingComponentSample.txt';

	@Component({
		components: {Window, GreetingComponent, CommonSlideMarkup}
	})
	export default class VueInstance extends Vue {

		private code: string = code;

	}
</script>
