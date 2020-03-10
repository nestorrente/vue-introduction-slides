<template>
	<div v-if="false"></div>
</template>

<script lang="ts">
	import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
	import CommonSlideMarkup from '@/slides/CommonSlideMarkup.vue';
	import VueInstanceSample from '@/slides/samples/vue-instance/VueInstanceSample.vue';
	import Window from '@/slides/Window.vue';

	@Component({
		components: {Window, VueInstanceSample, CommonSlideMarkup}
	})
	export default class GlobalContext extends Vue {

		@Prop({
			type: String,
			required: true
		})
		private name!: string;

		@Prop({
			type: Function,
			required: true
		})
		private getter!: () => any;

		@Watch('name')
		private onNameChange(newName: string, previousName: string) {
			this.unregisterGlobalVariable(previousName);
			this.registerGlobalVariable(newName);
		}

		private mounted() {
			this.registerGlobalVariable(this.name);
		}

		private beforeDestroy() {
			this.unregisterGlobalVariable(this.name);
		}

		private registerGlobalVariable(name: string) {
			Object.defineProperty(window, name, {
				configurable: true,
				get: this.getter
			});
		}

		private unregisterGlobalVariable(name: string) {
			// @ts-ignore
			delete window[name];
		}

	}
</script>
