export function initNextPieceArea() {
	const nextPiece = document.getElementById("nextPiece");
	for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 6; j++) {
			let square = document.createElement("div");
			square.className = "next-box";
			square.id = "next-" + String(i) + "-" + String(j);
			nextPiece.appendChild(square);
		}
	}
}

export function updateNextPieceArea(nextPiece, nextAreaOldBoxes) {
	for (let i = 0; i < nextAreaOldBoxes.length; i++) {
		nextAreaOldBoxes[i].style.background = "none";
		nextAreaOldBoxes[i].style.border = "none";
	}
	nextAreaOldBoxes = [];
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (nextPiece[i][j] == "1") {
				let cur = "next-" + String(i + 1) + "-" + String(j + 1);
				cur = document.getElementById(cur);
				cur.style.background = "red";
				cur.style.border = "2px solid black";
				nextAreaOldBoxes.push(cur);
			}
		}
	}
	return nextAreaOldBoxes;
}
