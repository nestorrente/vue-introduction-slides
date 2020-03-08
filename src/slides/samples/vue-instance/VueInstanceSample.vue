<template>
	<div id="app">
		<p class="truncate">
			Hello, {{ name }}!
		</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: 'Vue'
			};
		}
	};
</script>
