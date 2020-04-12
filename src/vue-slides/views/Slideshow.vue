<template>
	<div
			class="slideshow"
			:class="slideshowCssProperties.classes"
			:style="slideshowCssProperties.styles"
	>
		<template v-if="slide != null">
			<transition
					:name="slideTransition"
					@before-enter="$emit('transition-start')"
					@after-leave="$emit('transition-end')"
			>
				<SlideContext
						:key="slide.name"
						:definition="slide"
						:step="slideInitialStep"
				/>
			</transition>
		</template>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import {CssProperties, MovementDirection, SlideDefinition} from '@/vue-slides/types';
	import SlideContext from '@/vue-slides/views/SlideContext.vue';

	@Component({
		components: {SlideContext}
	})
	export default class Slideshow extends Vue {

		@Prop({
			type: Object,
			required: false
		})
		private slide?: SlideDefinition;

		@Prop({
			type: String,
			required: true
		})
		private direction!: MovementDirection;

		private get slideInitialStep(): number {
			return this.slide != null && this.direction === MovementDirection.BACKWARDS ? this.slide.steps : 1;
		}

		private get slideshowCssProperties(): CssProperties {
			return this.slide && this.slide.css.slideshow || {};
		}

		private get slideTransition(): string | null {
			switch (this.direction) {
				case MovementDirection.BACKWARDS:
					return 'slide-change-backwards';
				case MovementDirection.FORWARD:
					return 'slide-change-forward';
				default:
					return null;
			}
		}

	}
</script>
