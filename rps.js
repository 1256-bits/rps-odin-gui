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

const getNewWidth = (width, state, fontSize) => {
	const vals = { win: 1.5, loss: -6 };
	const retVal = width / fontSize + vals[state];
	return `${(retVal > 0) ? retVal : 0}rem`;
}

function updateBars(player, ai) {
	if (player === "draw")
		return true;
	let returnVal = true;
	const bars = document.querySelectorAll(".bar");
	const fontSize = +getComputedStyle(document.querySelector(":root"))
		.getPropertyValue("font-size").replace("px", "");

	bars.forEach(bar => {
		const width = +getComputedStyle(bar).getPropertyValue("width").replace("px", "");
		bar.style.width = (bar.hasAttribute("data-player")) ?
			getNewWidth(width, player, fontSize) : getNewWidth(width, ai, fontSize);

		if (+getComputedStyle(bar).getPropertyValue("width").replace("px", "") > 12 * fontSize)
			bar.style.width = "12rem";
		console.log(bar.hasAttribute("data-player"), bar.style.width)

		if (+bar.style.width.replace("rem", "") <= 0) {
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
		card.firstElementChild.textContent = `You ${(won) ? "won!" : "lost!"}`;
		card.lastElementChild.addEventListener("click", reset);
	}, 0);
}

function reset(e) {
	const wrapper = document.querySelector("div:has(.finish-card)");
	const card = document.querySelector(".finish-card");
	const aiWrap = document.querySelector("#ai-wrap");
	const bars = document.querySelectorAll(".bar");
	const main = document.querySelector("#main-screen");
	const rpsWindows = document.querySelectorAll(".rps-window");

	localStorage.clear();
	card.classList.replace("op-95", "op-0");
	wrapper.style.backgroundColor = "rgb(100,100,100)";
	document.querySelector(".wrapper").innerHTML = `
		<div class="disable">rock</div>
		<div class="begin">paper</div>
		<div class="previous">scissors</div>
		<div class="current">rock</div>
		<div class="next">paper</div>
		<div class="end">scissors</div>
		<div class="disable">rock</div>
	`
	aiWrap.innerHTML = "";
	addElements(30);
	aiWrap.children[0].classList.add("previous");
	aiWrap.children[1].classList.add("current");
	aiWrap.children[2].classList.add("next");
	bars.forEach(bar => bar.style.width = "");
	rpsWindows.forEach(window => {
		window.classList.remove("win", "loss");
		window.classList.add("white");
	});
	main.classList.remove("bg-win", "bg-loss");
	main.classList.add("neutral");
	// setTimeout(() => {
	wrapper.classList.replace("flex", "op-0");
	wrapper.addEventListener("transitionend", () => {
		wrapper.classList.replace("op-0", "hide");
	});
	// }, 100);

	document.querySelector("#select").firstElementChild
		.addEventListener("click", roll, { once: true });
}

async function roll() {
	rps(getPlayer(), await getAi());
}