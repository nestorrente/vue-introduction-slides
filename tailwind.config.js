module.exports = {
	theme: {
		spacing: {
			px: '1px',
			'0': '0',
			'1': '0.25em',
			'2': '0.5em',
			'3': '0.75em',
			'4': '1em',
			'5': '1.25em',
			'6': '1.5em',
			'8': '2em',
			'10': '2.5em',
			'12': '3em',
			'16': '4em',
			'20': '5em',
			'24': '6em',
			'32': '8em',
			'40': '10em',
			'48': '12em',
			'56': '14em',
			'64': '16em',
		},
		borderRadius: {
			none: '0',
			sm: '0.125em',
			default: '0.25em',
			md: '0.375em',
			lg: '0.5em',
			full: '9999px',
		},
		fontSize: {
			xs: '0.75em',
			sm: '0.875em',
			base: '1em',
			lg: '1.125em',
			xl: '1.25em',
			'2xl': '1.5em',
			'3xl': '1.875em',
			'4xl': '2.25em',
			'5xl': '3em',
			'6xl': '4em',
		},
		lineHeight: {
			none: '1',
			tight: '1.25',
			snug: '1.375',
			normal: '1.5',
			relaxed: '1.625',
			loose: '2',
			'3': '.75em',
			'4': '1em',
			'5': '1.25em',
			'6': '1.5em',
			'7': '1.75em',
			'8': '2em',
			'9': '2.25em',
			'10': '2.5em',
		},
		maxWidth: (theme, {breakpoints}) => ({
			none: 'none',
			xs: '20em',
			sm: '24em',
			md: '28em',
			lg: '32em',
			xl: '36em',
			'2xl': '42em',
			'3xl': '48em',
			'4xl': '56em',
			'5xl': '64em',
			'6xl': '72em',
			full: '100%',
			...breakpoints(theme('screens')),
		}),
	},
};
