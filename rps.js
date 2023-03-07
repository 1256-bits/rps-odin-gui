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
	document.querySelector("#main-screen")
		.classList.replace("neutral", `bg-${result}`);
	animToggle();
	const continued = updateBars(result, aiResult);
	setTimeout(() => {
		animToggle();
		if (continued) {
			player.classList.replace(result, "white");
			ai.classList.replace(aiResult, "white");
			document.querySelector("#main-screen")
				.classList.replace(`bg-${result}`, "neutral");
		}
		document.querySelector("#select").firstElementChild
			.addEventListener("click", roll, { once: true });
	}, 1000);
}

function animToggle() {
	const loser = document.querySelector(".loss");
	if (!loser)
		return;
	loser.classList.toggle("shake");
	if (loser.hasAttribute("data-player"))
		document.querySelector("#buttons")
			.classList.toggle("shake");

}

function updateBars(player, ai) {
	if (player === "draw")
		return true;
	let returnVal = true;
	const vals = { win: 1.5, loss: -3 };
	const fontSize = +getComputedStyle(document.querySelector(":root"))
		.getPropertyValue("font-size").replace("px", "");
	const bars = document.querySelectorAll(".bar");
	bars.forEach(bar => {
		const width = +getComputedStyle(bar).getPropertyValue("width").replace("px", "");
		bar.style.width = (bar.hasAttribute("data-player")) ?
			`${width / fontSize + vals[player]}rem` :
			`${width / fontSize + vals[ai]}rem`;
		if (+getComputedStyle(bar).getPropertyValue("width").replace("px", "") > 12 * fontSize)
			bar.style.width = "12rem";
		if (+bar.style.width.replace("rem", "") === 0) {
			finish(!bar.hasAttribute("data-player"));
			returnVal = false;
		}
	});
	return returnVal;
}

function finish(won) {
	const wrapper = document.querySelector("div:has(.finish-card)");
	const card = document.querySelector(".finish-card");
	wrapper.classList.replace("hide", "flex");
	setTimeout(() => {
		card.classList.replace("op-0", "op-95");
		card.classList.remove("move-in");
		card.firstElementChild.textContent += (won) ? "won!" : "lost!";
		card.lastElementChild.addEventListener("click", reset);
	}, 0);
}

function reset() {
	
}

async function roll() {
	rps(getPlayer(), await getAi());
}