import Vue from 'vue';
import {Dictionary} from '@/util/basic-types';

interface State {
	slideNumber: number;
	step: number;
}

const mutableState = Vue.observable<State>({
	slideNumber: 1,
	step: 1
});

export const state: Readonly<State> = createReadonlyProxy(mutableState);

function createReadonlyProxy<T extends Dictionary<any>>(object: T): Readonly<T> {

	const proxy: Dictionary<any> = {};

	Object.keys(object).forEach(key => {
		Object.defineProperty(proxy, key, {get: () => object[key]});
	});

	return proxy as Readonly<T>;

}
