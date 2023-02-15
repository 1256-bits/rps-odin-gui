function rollIntro() {
	const intro = document.querySelector("#intro");
	const lines = ["A.D. 2101", "War was beginning", "To keep all your base belong to you",
		"You must win the game of rock, paper, scissors", "For great justice!"];
	let delay = 70;
	for (let line of lines) {
		const randomStr = getRandomStr(line.length);
		const p = document.createElement("p");
		intro.appendChild(p);
		for (let i in line) {
			if (i === 0)
				p.innerText = randomStr;
			setTimeout(() => p.textContent = line.slice(0, i + 1) + randomStr.slice(i + 1), delay);
			delay += 70//+= (i === line.length - 1) ? 200 : 70;
		}
		// setTimeout(() => intro.removeChild(p), delay);
	}
}

function getRandomStr(len) {
	const chars = "qwertyuiopasdfghjklzxcvbnm?.^&$!#*<>',1234567890"
	let rndString = "";
	for (let i = 0; i < len; i++) {
		const char = chars[Math.round(Math.random() * (chars.length - 1))];
		rndString += (Math.round(Math.random() * 10) === 10) ? char.toUpperCase() : char;
	}
	return rndString[0].toUpperCase() + rndString.slice(1);
}
rollIntro();