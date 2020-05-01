import Vue from 'vue';
import {Dictionary} from '@/util/basic-types';

const mutableState = Vue.observable({
	slideNumber: 1,
	step: 1,
	a: 2
});

type State = typeof mutableState;

export const state: Readonly<State> = createReadonlyProxy(mutableState);

function createReadonlyProxy<T extends Dictionary<any>>(object: T): Readonly<T> {

	const proxy: Dictionary<any> = {};

	Object.keys(object).forEach(key => {
		Object.defineProperty(proxy, key, {get: () => object[key]});
	});

	return proxy as Readonly<T>;

}
