import {Comparator, noOpComparator, Nullable} from '@/util/basic-types';

export type NullAwareComparator<T> = Comparator<Nullable<T>>;

export function addNullSupport<T>(comparator: Comparator<T>, nullsLast: boolean = false): NullAwareComparator<T> {
	return (a: Nullable<T>, b: Nullable<T>) => {
		if (a == null) {
			return b == null ? 0 : -1;
		} else {
			if (b == null) {
				return 1;
			} else {
				return comparator(a, b);
			}
		}
	};
}

export function reverse<T>(comparator: Comparator<T>): Comparator<T> {
	return (a, b) => comparator(b, a);
}

function joinTwoComparators<T>(first: Comparator<T>, second: Comparator<T>): Comparator<T> {
	return (a, b) => {
		const firstComparison = first(a, b);
		return firstComparison !== 0 ? firstComparison : second(a, b);
	};
}

export function join<T>(...comparators: Array<Comparator<T>>): Comparator<T> {
	switch (comparators.length) {
		case 0:
			return noOpComparator();
		case 1:
			return comparators[0];
		default:
			return comparators.reduce(joinTwoComparators);
	}
}
