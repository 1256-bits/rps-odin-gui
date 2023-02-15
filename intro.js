const delay = 50;

function rollIntro() {
    const intro = document.querySelector("#intro");
    const lines = ["A.D. 2101", "War was beginning", "To keep all your base belong to you",
        "You must win the game of rock, paper, scissors", "For great justice!"];
    for (let line of lines) {
        const randomStr = getRandomStr(line.length);
        const p = document.createElement("p");
        p.textContent = getRandomStr(line.length);
        p.style.display = "none";
        intro.appendChild(p);
        setTimeout(typewriter(p, line), 500);
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

function typewriter(p, line) {
    p.style.display = "block";
    p.innerText = line;
}

rollIntro();