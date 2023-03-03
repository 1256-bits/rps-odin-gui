function rps(player, ai) {
	if (player === ai) {
		result("draw");
	}
	else if ((player === "rock" && ai === "scissors") ||
		(player === "paper" && ai === "rock") ||
		(player === "scissors" && ai === "paper")) {
		result("win", "loss");
	}
	else {
		result("loss", "win");
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

function result(result, aiResult = "draw") {
	const bg = document.querySelector("#main-screen");
	const [player, ai] = [...document.querySelectorAll(".rps-window")];
	const colorSwap = () => {
		player.classList.toggle(result);
		ai.classList.toggle(aiResult);
	}
	colorSwap();
	setTimeout(colorSwap, 10000);
	
}