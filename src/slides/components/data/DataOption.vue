<template>
	<CommonSlideMarkup title="Data">
		<ul class="mt-10 mb-10">
			<li>Properties defined in the data object are added to Vue's <strong>reactivity system</strong>.</li>
			<li>When the values of those properties chage, the view will <em>react</em> updating itself.</li>
		</ul>
		<div class="grid grid-cols-2 gap-4 items-center">
			<highlight-code :lang="'js'">
				{{code}}
			</highlight-code>
			<Window>
				<DataOptionSample ref="app"/>
			</Window>
		</div>
		<GlobalContext name="app" :getter="() => $refs.app"/>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import Window from '@/slides/Window.vue';
	import GlobalContext from '@/components/GlobalContext.vue';
	import DataOptionSample from '@/slides/components/data/DataOptionSample.vue';

	@Component({
		components: {GlobalContext, Window, CommonSlideMarkup, DataOptionSample}
	})
	export default class DataOption extends Vue {

		private code: string = `
			const app = new Vue({
				el: '#app',
				data: {
					listTitle: 'To-do',
					items: [
						{text: 'Wash the car', done: true},
						{text: 'Learn Vue', done: false},
						{text: 'Catch them all', done: false}
					]
				}
			});
		`;

	}
</script>
