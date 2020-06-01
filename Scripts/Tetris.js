import { pieces } from "./pieces.js";
import {
	leftCollisonCheck,
	rightCollisonCheck,
	downCollisonCheck,
	rotationCollisonCheck,
} from "./collisonCheck.js";

import {
	initNextPieceArea,
	updateNextPieceArea,
} from "./NextAreaHelperFunctions.js";

import { activateColor, deactivateColor } from "./colourChanger.js";
import {
	initFixedArr,
	drawGrid,
	drawPiece,
	gameOverCheck,
	choosePiece,
	clearArea,
} from "./helperFunctions.js";

let x = 0; //current x position of the piece
let y = 0; //current y position of the piece
let score = 0;
let level = 0;
let time = 500; // stores the refesh rate
let paused = false;
let active = []; //stores co-ordinates of current piece
let fixed = []; //stores not-allowed region co-ordinates
let timerId = []; //stores the id for setInterval
let nextAreaOldBoxes = [];
let curPiece, curPieceNo, curPieceOrientation;
let nextPiece, nextPieceNo, nextPieceOrientation;

//This function makes the current active disappear
function curPieceClear() {
	for (let i = 0; i < active.length; i++) {
		let cur = String(active[i][0]) + "-" + String(active[i][1]);
		deactivateColor(document.getElementById(cur));
	}
	active = [];
}

// This function selects the current and next Piece.
function addPiece() {
	if (curPiece === undefined) {
		[curPieceNo, curPieceOrientation, curPiece] = choosePiece();
		[nextPieceNo, nextPieceOrientation, nextPiece] = choosePiece();
	} else {
		curPiece = nextPiece;
		curPieceNo = nextPieceNo;
		curPieceOrientation = nextPieceOrientation;
		[nextPieceNo, nextPieceOrientation, nextPiece] = choosePiece();
	}
	nextAreaOldBoxes = updateNextPieceArea(nextPiece, nextAreaOldBoxes);
	drawPiece(curPiece, x, y, active);
}

// Check For Complete Lines
function checkForLines() {
	let matrix = [];
	for (let i = 0; i < 18; i++) {
		let temp = [];
		for (let j = 0; j < 14; j++) {
			temp.push(0);
		}
		matrix.push(temp);
	}
	for (let i = 0; i < fixed.length; i++) {
		if (fixed[i][0] < 18 && fixed[i][1] < 14 && fixed[i][1] >= 0) {
			matrix[fixed[i][0]][fixed[i][1]] = 1;
		}
	}
	let completeLines = [];
	for (let i = 0; i < matrix.length; i++) {
		if (!matrix[i].includes(0)) {
			completeLines.push(i);
		}
	}
	if (completeLines.length > 0) {
		UpdateScore("LINE", completeLines.length);
		destroyCompleteLines(completeLines, matrix);
	}
}

// Destroy the complete lines
function destroyCompleteLines(completeLines, matrix) {
	for (let i = 0; i < completeLines.length; i++) {
		for (let j = 0; j < 14; j++) {
			let cur = String(completeLines[i]) + "-" + String(j);
			deactivateColor(document.getElementById(cur));
			fixed.splice(fixed.indexOf([completeLines[i], j]), 1);
		}
	}
	pushBoxesDown(completeLines, matrix);
}

// Push the boxes down, after destroying complete lines
function pushBoxesDown(completeLines, matrix) {
	for (let k = 0; k < completeLines.length; k++) {
		for (let i = 0; i < 14; i++) {
			for (let j = completeLines[k]; j > 0; j--) {
				matrix[j][i] = matrix[j - 1][i];
			}
		}
	}
	for (let i = 0; i < 18; i++) {
		for (let j = 0; j < 14; j++) {
			let cur = String(i) + "-" + String(j);
			deactivateColor(document.getElementById(cur));
		}
	}
	fixed = [];
	for (let i = 0; i < 18; i++) {
		for (let j = 0; j < 14; j++) {
			if (matrix[i][j] == 1) {
				fixed.push([i, j]);
			}
		}
	}

	for (let i = 0; i < fixed.length; i++) {
		let cur = String(fixed[i][0]) + "-" + String(fixed[i][1]);
		activateColor(document.getElementById(cur));
	}
	initFixedArr(fixed);
}

// Updates the level every 1000 points and increases refresh rate
function updateLevel() {
	let levelArea = document.getElementById("level");
	level = Math.floor(score / 1000) + 1;
	if (level > 10) {
		level = 10;
	}
	time = 500 - (level - 1) * 50;
	if (time <= 100) {
		time = 100;
	}
	clearInterval(timerId.pop());
	timerId.push(setInterval(move, time));
	levelArea.innerHTML = level;
}

// Updates the score
export function UpdateScore(cond, count) {
	let scoreArea = document.getElementById("score");
	if (cond === "ONE") {
		score += 10;
		scoreArea.innerHTML = score;
	} else {
		score += count * 100;
		scoreArea.innerHTML = score;
	}
}

// Function deals with the normal drop of the piece
function move() {
	y++;
	if (!downCollisonCheck(fixed, active)) {
		curPieceClear();
		drawPiece(curPiece, x, y, active);
		updateLevel();
	} else {
		piecesfreezer();
		console.log(fixed);
		checkForLines();
		console.log(fixed);
		if (gameOverCheck(fixed)) {
			clearInterval(timerId.pop());
			document.removeEventListener("keydown", arrowButtonHandling);
			document.addEventListener("keydown", SpaceBarEventHandling);
			document.getElementById("curScore").innerHTML = score;
			document.getElementById("modal").style.display = "block";
			document.getElementById("gameOverPage").style.display = "block";
		}
		if (timerId.length > 0) {
			updateLevel();
		}
	}
}

// Deals with the rotation of the piece
function rotate() {
	let tempOrientation = (curPieceOrientation + 1) % 4;
	let tempPiece = pieces[curPieceNo][tempOrientation];
	if (!rotationCollisonCheck(tempPiece, fixed, x, y)) {
		curPieceOrientation = tempOrientation;
		curPiece = tempPiece;
		curPieceClear();
		drawPiece(curPiece, x, y, active);
	}
}

// Freezes the piece at the position
function piecesfreezer() {
	UpdateScore("ONE");
	x = y = 0;
	active.map((box) => {
		fixed.push(box);
	});
	active = [];
	addPiece();
}

// Left Arrow Key Handler
function leftKeyPress() {
	if (!leftCollisonCheck(fixed, active)) {
		curPieceClear();
		x -= 1;
		drawPiece(curPiece, x, y, active);
	}
}

// Right Arrow Key Handler
function rightKeyPress() {
	if (!rightCollisonCheck(fixed, active)) {
		curPieceClear();
		x += 1;
		drawPiece(curPiece, x, y, active);
	}
}

// Arrow key Event Function
function arrowButtonHandling(event) {
	switch (event.keyCode) {
		case 37:
			leftKeyPress();
			break;
		case 38:
			rotate();
			break;
		case 39:
			rightKeyPress();
			break;
		case 40:
			move();
			break;
	}
}

// Space Bar event Handler
function SpaceBarEventHandling(event) {
	if (event.keyCode === 32 && timerId.length == 0 && !paused) {
		clearArea();
		x = 0;
		y = 0;
		time = 500;
		paused = false;
		fixed = [];
		initFixedArr(fixed);
		score = 0;
		document.getElementById("modal").style.display = "none";
		document.getElementById("gameOverPage").style.display = "none";
		document.getElementById("startNotice").style.display = "none";
		document.getElementById("pauseNotice").style.display = "block";
		document.getElementById("score").innerHTML = 0;
		timerId.push(setInterval(move, time));
		document.addEventListener("keydown", arrowButtonHandling);
	} else if (event.keyCode === 32) {
		if (!paused) {
			clearInterval(timerId.pop());
			document.getElementById("pauseNotice").style.display = "none";
			document.getElementById("modal").style.display = "block";
			document.getElementById("pausePage").style.display = "block";
			document.removeEventListener("keydown", arrowButtonHandling);
			paused = true;
		} else {
			timerId.push(setInterval(move, time));
			document.getElementById("modal").style.display = "none";
			document.getElementById("pausePage").style.display = "none";
			document.getElementById("pauseNotice").style.display = "block";
			document.addEventListener("keydown", arrowButtonHandling);
			paused = false;
		}
	}
}
initNextPieceArea();
drawGrid();
addPiece();
document.addEventListener("keydown", SpaceBarEventHandling);
