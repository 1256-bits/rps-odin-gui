const delay = 30;
let i = 0;
const intro = document.querySelector("#intro");

function rollIntro(lineNum) {
    let isLastLine = false;
    const lines = ["A.D. 2101", "War was beginning", "To keep all your base belong to you",
        "You must win the game of rock, paper, scissors", "For great justice!"];
    const line = lines[lineNum];

    if (!line) {
        setTimeout(drawCloseButton, 1000);
        return;
    }

    const p = document.createElement("p");
    p.textContent = getRandomStr(line.length);
    p.style.display = "none";
    intro.appendChild(p);

    if (lineNum == lines.length - 1)
        isLastLine = true;
    setTimeout(typewriter, 1000, p, line, lineNum, isLastLine);
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

function typewriter(p, line, lineNum, isLastLine) {
    p.style.display = "block";
    p.textContent = line.slice(0, i + 1) + p.textContent.slice(i + 1);

    if (i == 0 && isLastLine)
        p.style.width = getComputedStyle(p)["width"];

    if (i == 0 && lineNum > 0) {
        const children = (isLastLine) ? intro.querySelectorAll("p") : intro.querySelectorAll(":not(:last-child)");
        const width = +getComputedStyle(intro)["width"].slice(0, -2) - 20 + "px";
        children.forEach(child => child.style.width = width);
    }

    if (i >= line.length) {
        i = 0;
        if (!isLastLine)
            p.style.width = getComputedStyle(p)["width"];
        rollIntro(lineNum + 1)
        return;
    }

    i++;
    setTimeout(typewriter, delay, p, line, lineNum, isLastLine);
}


function drawCloseButton() {
    const close = document.querySelector("#close-intro");
    close.classList.replace("op-0", "op-100");
    close.addEventListener("click", () => {
        const container = document.querySelector(":has( > #intro)");
        container.classList.replace("op-100","op-0");
        container.addEventListener("transitionend", (e) => e.target.remove());
    });
}

rollIntro(0);