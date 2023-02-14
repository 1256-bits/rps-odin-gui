const rps = (player, ai) => {
	const dict = {"R": "rock", "P": "paper", "S": "scissors"};
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
	const rps = {0: "R", 1: "P", 2: "S" };
	return rps[Math.trunc(Math.random()*3)];
}

function rollIntro() {
	const intro = document.querySelector("#intro");
	const lines = ["A.D. 2101", "War was beginning", "To keep all your base belong to you",
					"You must win the game of rock, paper, scissors", "For great justice!"];
	for (let line of lines) {
		const p = document.createElement("p");
		intro.appendChild(p);
		p.innerText = line;
	}
}

rollIntro();
