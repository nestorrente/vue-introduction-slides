<template>
	<div>
		<p>{{ listTitle }}</p>
		<ol>
			<li v-for="(item, index) in items" :key="index" :class="{done: item.done}">
				{{ item.text }}
			</li>
		</ol>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				listTitle: 'To-do',
				items: [
					{text: 'Wash the car', done: true},
					{text: 'Learn Vue', done: false},
					{text: 'Catch them all', done: false}
				]
			};
		}
	};
</script>

<style scoped>
	.done {
		text-decoration: line-through;
	}
</style>
