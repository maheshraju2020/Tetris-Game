export function downCollisonCheck(fixed, active) {
	for (let i = 0; i < active.length; i++) {
		for (let j = 0; j < fixed.length; j++) {
			if (fixed[j][0] === active[i][0] + 1 && fixed[j][1] == active[i][1]) {
				return true;
			}
		}
	}
	return false;
}

export function leftCollisonCheck(fixed, active) {
	for (let i = 0; i < active.length; i++) {
		for (let j = 0; j < fixed.length; j++) {
			if (fixed[j][0] === active[i][0] && fixed[j][1] == active[i][1] - 1) {
				return true;
			}
		}
	}
	return false;
}

export function rightCollisonCheck(fixed, active) {
	for (let i = 0; i < active.length; i++) {
		for (let j = 0; j < fixed.length; j++) {
			if (fixed[j][0] === active[i][0] && fixed[j][1] == active[i][1] + 1) {
				return true;
			}
		}
	}
	return false;
}

export function rotationCollisonCheck(piece, fixed, x, y) {
	let offset = 0;
	if (!piece[0].includes(1)) {
		offset = 1;
	}
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (piece[i][j] === 1) {
				let temp = [i + y - offset, j + x];
				for (let k = 0; k < fixed.length; k++) {
					if (fixed[k][0] === temp[0] && fixed[k][1] === temp[1]) {
						return true;
					}
				}
			}
		}
	}
	return false;
}
