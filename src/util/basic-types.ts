export type Nullable<T> = T | null | undefined;

export type OnlyRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Runnable = () => void;
export type Supplier<T> = () => T;
export type Predicate<T> = (value: T) => boolean;
export type Function<T, R> = (value: T) => R;
export type Consumer<T> = (value: T) => void;
export type UnaryOperator<T> = Function<T, T>;
export type BiPredicate<T, U> = (first: T, second: U) => boolean;
export type BiFunction<T, U, R> = (first: T, second: U) => R;
export type BiConsumer<T, U> = (first: T, second: U) => void;

export type Comparator<T> = (first: T, second: T) => number;

const noOpComparatorInstance: Comparator<any> = (a, b) => 0;

export function noOpComparator<T>(): Comparator<T> {
	return noOpComparatorInstance;
}

export interface Dictionary<T> {
	[key: string]: T | undefined;
}

export type DictionaryEntry<T> = [string, T];

const emptyDictionaryInstance: Dictionary<any> = Object.freeze({});

export function emptyDictionary<T>(): Dictionary<T> {
	return emptyDictionaryInstance;
}

export interface IndexedDictionary<T> {
	[key: number]: T;

	[Symbol.iterator]: Iterator<T>;
}

const identityInstance: UnaryOperator<any> = (t: any) => t;

export function identity<T>(): UnaryOperator<T> {
	return identityInstance;
}

const falsePredicate: Predicate<any> = () => false;

export function alwaysFalse<T>(): Predicate<T> {
	return falsePredicate;
}

const truePredicate: Predicate<any> = () => true;

export function alwaysTrue<T>(): Predicate<T> {
	return truePredicate;
}
