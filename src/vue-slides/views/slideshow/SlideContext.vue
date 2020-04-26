<template>
	<div
			class="slide"
			:class="cssProperties.classes"
			:style="cssProperties.styles"
	>
		<div :is="definition.component"></div>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';
	import {CssProperties, SlideDefinition} from '@/vue-slides';

	@Component
	export default class SlideContext extends Vue {

		@Prop({
			type: Object,
			required: true
		})
		public readonly definition!: SlideDefinition;

		@Prop({
			type: Number,
			default: 1
		})
		private readonly step!: number;

		private get cssProperties(): CssProperties {
			return this.definition?.css?.slide ?? {};
		}

	}
</script>
