<template>
	<div>

		<h1 v-if="title">{{ title }}</h1>

		<slot></slot>

	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';

	@Component
	export default class CommonSlideMarkup extends Vue {

		@Prop({
			type: String,
			required: false
		})
		private title!: string;

	}
</script>
