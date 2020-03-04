import {Nullable} from '@/util/basic-types';

const SPECIAL_CHARS_REGEX = /[\u0300-\u036f]/g;

export function normalize(text: string): string {
	return text.normalize('NFD').replace(SPECIAL_CHARS_REGEX, '');
}

export function normalizeToLower(text: string): string {
	return normalize(text).toLowerCase();
}

export function normalizeToUpper(text: string): string {
	return normalize(text).toUpperCase();
}

export function normalizedStartsWith(text: string, chunk: string): boolean {
	return normalizeToLower(text).startsWith(normalizeToLower(chunk));
}

export function normalizedEndsWith(text: string, chunk: string): boolean {
	return normalizeToLower(text).endsWith(normalizeToLower(chunk));
}

export function normalizedIncludes(text: string, chunk: string): boolean {
	return normalizeToLower(text).includes(normalizeToLower(chunk));
}

export function normalizedEquals(text: string, chunk: string): boolean {
	return normalizeToLower(text) === normalizeToLower(chunk);
}

export function isEmpty(text: Nullable<string>): text is string {
	return text == null || text.length === 0;
}

export function isNotEmpty(text: Nullable<string>): text is string {
	return text != null && text.length > 0;
}
