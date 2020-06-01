import { activateColor, deactivateColor } from "./colourChanger.js";
import { pieces } from "./pieces.js";

// Initialize the fixed array with boundary conditions
export function initFixedArr(fixed) {
	for (let i = 0; i < 14; i++) {
		fixed.push([18, i]);
	}
	for (let i = 0; i < 18; i++) {
		fixed.push([i, -1]);
		fixed.push([i, 14]);
	}
}

// Draws the invisible grid on the area
export function drawGrid() {
	const activityArea = document.getElementById("activityArea");
	for (let i = 0; i < 18; i++) {
		for (let j = 0; j < 14; j++) {
			let square = document.createElement("div");
			square.className = "box";
			square.id = String(i) + "-" + String(j);
			activityArea.appendChild(square);
		}
	}
}

// Draws the specified piece on the board
export function drawPiece(piece, x, y, active) {
	let offset = 0;
	if (!piece[0].includes(1)) {
		offset = 1;
	}
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (piece[i][j] === 1) {
				let temp = String(i + y - offset) + "-" + String(j + x);
				active.push([i + y - offset, j + x]);
				activateColor(document.getElementById(temp));
			}
		}
	}
}

// check if the game is over yet?
export function gameOverCheck(fixed) {
	for (let i = 0; i < fixed.length; i++) {
		if (fixed[i][0] === 0 && fixed[i][1] == 1) {
			return true;
		}
	}
	return false;
}

// select a random piece for next turn
export function choosePiece() {
	let pieceNo = Math.floor(Math.random() * pieces.length);
	let orientation = Math.floor(Math.random() * 4);
	return [pieceNo, orientation, pieces[pieceNo][orientation]];
}

// clears the board for new game
export function clearArea() {
	for (let i = 0; i < 18; i++) {
		for (let j = 0; j < 14; j++) {
			let cur = String(i) + "-" + String(j);
			deactivateColor(document.getElementById(cur));
		}
	}
}
