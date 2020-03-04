<template>
	<div>
		<p class="truncate">
			Hello, {{ name || 'anonymous' }}!
		</p>
		<p>
			<input type="text" class="w-full" v-model="name">
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
