import {Dictionary, Function} from '@/util/basic-types';

export function groupBy<T>(array: T[], keyMapper: Function<T, any>): Dictionary<T[]> {

	return array.reduce((a, c) => {

		const key: string = String(keyMapper(c));

		if (a.hasOwnProperty(key)) {
			a[key]!.push(c);
		} else {
			a[key] = [c];
		}

		return a;

	}, {} as Dictionary<T[]>);

}

/**
 * Removes the desired elements from the input array and returns that array in order to allow chaining calls.
 *
 * @param array input array
 * @param elementsToRemove elements to remove
 * @return the input array
 */
export function removeAll<T>(array: T[], elementsToRemove: T[]): T[] {

	elementsToRemove.forEach(e => {
		for (let index = array.indexOf(e); index !== -1; index = array.indexOf(e, index)) {
			array.splice(index, 1);
		}
	});

	return array;

}

/**
 * Similar to {@link removeAll}, but creates a new array instance instead of modify the original one.
 *
 * @param array input array
 * @param elementsToRemove elements to remove
 * @return a new array without that elements
 */
export function without<T>(array: T[], elementsToRemove: T[]): T[] {
	return removeAll([...array], elementsToRemove);
}
