const rps = (player, ai) => {
	const dict = { "R": "rock", "P": "paper", "S": "scissors" };
	const pva = `${dict[player]} vs ${dict[ai]}.`;
	if (player === ai)
		return pva + "Draw";
	switch (player) {
		case "R":
			if (ai === "P")
				return pva + "You lose.";
			else
				return pva + "You win!";
		case "P":
			if (ai === "S")
				return pva + "You lose.";
			else
				return pva + "You win!";
		case "S":
			if (ai === "R")
				return pva + "You lose.";
			else
				return pva + "You win!";
	}
}

const plInput = () => prompt("[R]ock, [P]aper, [S]cissors");

const aiInput = () => {
	const rps = { 0: "R", 1: "P", 2: "S" };
	return rps[Math.trunc(Math.random() * 3)];
}

function rollIntro() {
	const intro = document.querySelector("#intro");
	const lines = ["A.D. 2101", "War was beginning", "To keep all your base belong to you",
		"You must win the game of rock, paper, scissors", "For great justice!"];
	let delay = 70;
	for (let line of lines) {
		const p = document.createElement("p");
		intro.appendChild(p);
		for (let i in line) {
			setTimeout(() => p.textContent += line[i], delay);
			delay += (+i === line.length - 1) ? 500 : 70;
		}
		// setTimeout(() => intro.removeChild(p), delay);
	}
}

function getRandomStr(len) {
	const chars = "qwertyuiopasdfghjklzxcvbnm?.^&$!#*<>',1234567890"
	let rndString = "";
	for (let i = 0; i <= len; i++) {
		const char = chars[Math.round(Math.random() * chars.length)];
		rndString += (Math.round(Math.random() * 10) === 10) ? char.toUpperCase() : char;
	}
	return rndString[0].toUpperCase() + rndString.slice(1);
}
// rolloIntro();