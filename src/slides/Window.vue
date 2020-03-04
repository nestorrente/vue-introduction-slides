<template>
	<div class="window">
		<div class="header">
			<span class="window-header-button"></span>
			<span class="window-header-button"></span>
			<span class="window-header-button"></span>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';

	@Component
	export default class Window extends Vue {

	}
</script>
