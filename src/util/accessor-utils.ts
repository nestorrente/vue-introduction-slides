import {Function} from '@/util/basic-types';

function access<T, R>(object: T, accessor: Function<T, R> | string | number): any {
	return typeof accessor === 'function' ? accessor(object) : (object as any)[accessor];
}

function createAccessor<T, R>(accessor: Function<T, R> | string | number): Function<T, R> {
	return typeof accessor === 'function' ? accessor : (e: T) => (e as any)[accessor] as R;
}

export {
	access,
	createAccessor
};
