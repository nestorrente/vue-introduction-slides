import {addNullSupport, NullAwareComparator} from '@/util/comparator-utils';

const compareStrings: NullAwareComparator<string> = addNullSupport((a: string, b: string) => {
	return a.localeCompare(b, undefined, {sensitivity: 'base'});
});

const compareNumbers: NullAwareComparator<number> = addNullSupport((a: number, b: number) => {

	// NaN is always the last value, even after Infinity
	if (isNaN(a)) {
		return isNaN(b) ? 0 : 1;
	} else if (isNaN(b)) {
		return -1;
	}

	if (a === Infinity) {
		return b === Infinity ? 0 : 1;
	} else if (b === Infinity) {
		return -1;
	}

	if (a === -Infinity) {
		return b === -Infinity ? 0 : -1;
	} else if (b === -Infinity) {
		return 1;
	}

	return a - b;

});

const compareBooleans: NullAwareComparator<boolean> = addNullSupport((a: boolean, b: boolean) => {
	return Number(a) - Number(b);
});

const compareDatetimes: NullAwareComparator<Date> = addNullSupport((a: Date, b: Date) => {
	return a.getTime() - b.getTime();
});

function removeTime(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const compareDates: NullAwareComparator<Date> = addNullSupport((a: Date, b: Date) => {
	return compareDatetimes(removeTime(a), removeTime(b));
});

export {
	compareStrings,
	compareNumbers,
	compareBooleans,
	compareDatetimes,
	compareDates
};
