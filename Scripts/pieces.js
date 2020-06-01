const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	],
];

const J = [
	[
		[1, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[1, 1, 0, 0],
		[0, 0, 0, 0],
	],
];

const L = [
	[
		[0, 0, 1, 0],
		[1, 1, 1, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[1, 1, 1, 0],
		[1, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[1, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	],
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
];

const S = [
	[
		[0, 1, 1, 0],
		[1, 1, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[1, 1, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[1, 0, 0, 0],
		[1, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	],
];

const T = [
	[
		[0, 1, 0, 0],
		[1, 1, 1, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[1, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	],
];

const Z = [
	[
		[1, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 0, 0],
		[1, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[1, 1, 0, 0],
		[1, 0, 0, 0],
		[0, 0, 0, 0],
	],
];

export const pieces = [I, J, L, O, S, T, Z];
