const delay = 50;
let i = 0;

function rollIntro(lineNum) {
    const intro = document.querySelector("#intro");
    const lines = ["A.D. 2101", "War was beginning", "To keep all your base belong to you",
        "You must win the game of rock, paper, scissors", "For great justice!"];
    const line = lines[lineNum];
    if (!line) {
        setTimeout(drawCloseButton, 1000, intro);
        return;
    }
    const p = document.createElement("p");
    p.textContent = getRandomStr(line.length);
    p.style.display = "none";
    intro.appendChild(p);
    setTimeout(typewriter, 1000, p, line, lineNum);
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

function typewriter(p, line, lineNum) {
    p.style.display = "block";
    p.textContent = line.slice(0, i + 1) + p.textContent.slice(i + 1);
    if (i >= line.length) {
        i = 0;
        rollIntro(lineNum + 1)
        return;
    }
    i++;
    setTimeout(typewriter, delay, p, line, lineNum);
}

function drawCloseButton(intro) {
    // const a;
}

rollIntro(0);