<template>
	<CommonSlideMarkup title="Features">
		<p>Core features:</p>
		<div class="grid grid-cols-2">
			<ul>
				<li
						v-for="(feature, index) in features1"
						v-text="feature"
				></li>
			</ul>
			<ul>
				<li
						v-for="(feature, index) in features2"
						v-text="feature"
				></li>
			</ul>
		</div>
		<div v-appear="$slideshow.step > 1">
			<p>Extra features:</p>
			<div class="grid grid-cols-2">
				<ul>
					<li
							v-for="(feature, index) in extraFeatures1"
							v-text="feature"
					></li>
				</ul>
				<ul>
					<li
							v-for="(feature, index) in extraFeatures2"
							v-text="feature"
					></li>
				</ul>
			</div>
		</div>
	</CommonSlideMarkup>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';

	@Component({
		components: {CommonSlideMarkup}
	})
	export default class CoreFeatures extends Vue {

		private features1: string[] = [
			'Components',
			'Virtual DOM',
			'Templates',
			'Render functions',
			'Data binding',
		];

		private features2: string[] = [
			'Computed properties',
			'Watchers',
			'Event handling',
			'Directives',
			'Animations / Transitions',
		];

		private extraFeatures1: string[] = [
			'Routing - Vue Router',
			'State management - Vuex',
		];

		private extraFeatures2: string[] = [
			'Internationalization - Vue I18n',
			'Server-Side Rendering - Nuxt.js',
		];

	}
</script>
