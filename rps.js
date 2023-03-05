let started = false;

function rps(player, ai) {
	delPrevious();
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

async function getAi() {
	aiScroll(Math.trunc(Math.random() * 7) + 1);
	return new Promise(resolve => {
		document.addEventListener("scrollend", () =>
			resolve(document.querySelector("#ai-wrap > .current").textContent));
	});
}

function result(result, aiResult = "draw") {
	const bg = document.querySelector("#main-screen");
	const [player, ai] = [...document.querySelectorAll(".rps-window")];
	player.classList.replace("white", result);
	ai.classList.replace("white", aiResult);
	setTimeout(() => {
		player.classList.replace(result, "white");
		ai.classList.replace(aiResult, "white");
		document.querySelector("#select").firstElementChild
			.addEventListener("click", roll, { once: true });
	}, 1000);
}

async function roll() {
	rps(getPlayer(), await getAi());
}