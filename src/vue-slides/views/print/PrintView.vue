<template>
	<div class="print-view">
		<template v-for="slide in $slidesConfig.slides">
			<FakeContext
					v-for="step in slide.steps"
					:key="slide.index + '-' + step"
					:slide="slide"
					:step="step"
					v-slot="{direction}"
					class="mt-10 mb-10"
					:style="{
						padding: '0 10vw'
					}"
			>
				<FakeSlideshowContainer
						:slide="slide"
						:direction="direction"
				/>
			</FakeContext>
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
