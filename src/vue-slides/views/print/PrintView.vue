<template>
	<div class="print-view">
		<template v-for="slide in $slidesConfig.slides">
			<div
					v-for="step in slide.steps"
					:key="slide.index + '-' + step"
					class="print-page"
			>
				<FakeContext
						:slide="slide"
						:step="step"
						v-slot="{direction}"
				>
					<FakeSlideshowContainer
							:slide="slide"
							:direction="direction"
					/>
				</FakeContext>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import FakeContext from '@/vue-slides/views/fakee/FakeContext.vue';
	import FakeSlideshowContainer from '@/vue-slides/views/fakee/FakeSlideshowContainer.vue';

	@Component({
		components: {FakeSlideshowContainer, FakeContext}
	})
	export default class PrintView extends Vue {

	}
</script>
