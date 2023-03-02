function rps(player, ai) {
	if (player === ai) {
		draw();
	}
	else if ((player === "rock" && ai === "scissors") ||
		(player === "paper" && ai === "rock") ||
		(player === "scissors" && ai === "paper")) {
		win();
	}
	else {
		loss();
	}
}

const getPlayer = () => document.querySelector(".wrapper > .current").textContent;

function getAi() {
	aiScroll(
		Math.trunc(Math.random() * 5),
		["rock", "paper", "scissors"][Math.trunc(Math.random() * 2) + 1]
	);
	return document.querySelector("#ai-wrap > .current").textContent;
}

function win() {

}

function loss() {

}

function draw() {

}