import {Dictionary, Function} from '@/util/basic-types';

function mapDictionaryValues<T, U>(dictionary: Dictionary<T>, mapper: Function<T, U>): Dictionary<U> {

	const result: Dictionary<U> = {};

	for (const key in dictionary) {
		if (dictionary.hasOwnProperty(key)) {
			result[key] = mapper(dictionary[key]!);
		}
	}

	return result;

}

export {
	mapDictionaryValues
};
