const delay = 30;
let i = 0; //does it have to be global?
let currentTimeout;
let escTimeout;
let skipInterval, progress;
const intro = document.querySelector("#intro");
document.addEventListener("keydown", handleKeypress);
document.addEventListener("keyup", introKeyUp);

function rollIntro(lineNum) {
    if (localStorage.getItem("introDone")) {
        document.querySelector("body").firstElementChild
            .classList.remove("fade-animation");
        closeIntro();
        return;
    }
    let isLastLine = false;
    const lines = ["A.D. 2101", "War was beginning", "To keep all your base belong to you",
        "You must win the game of rock, paper, scissors", "For great justice!"];
    const line = lines[lineNum];

    if (!line) { //typewriter eventually return an invalid line number
        currentTimeout = setTimeout(drawCloseButton, 1000);
        return;
    }

    const p = document.createElement("p");
    p.textContent = getRandomStr(line.length);
    p.style.display = "none";
    intro.appendChild(p);

    if (lineNum == lines.length - 1)
        isLastLine = true;
    currentTimeout = setTimeout(typewriter, 1000, p, line, lineNum, isLastLine);
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

    if (i == 0 && isLastLine) //set last child's width as it has to expand right after it appears.
        p.style.width = getComputedStyle(p)["width"];

    if (i == 0 && lineNum > 0) { //NOTE: does it behave properly if the floowing lines are smaller than previous? | No, it doesn't
        /* TODO: Make it work for lines of any length sometime in the future*/
        const children = (isLastLine) ? intro.querySelectorAll("p") : intro.querySelectorAll(":not(:last-child)");
        const width = +getComputedStyle(intro)["width"].slice(0, -2) - 20 + "px"; // 20: 8px padding, 2px border, 10px gap.
        children.forEach(child => child.style.width = width); //And if I use calc() the animation breaks. Wonderful!
        if (isLastLine)
            children.forEach(child => child.style.width = "calc(100% - 19px)"); //allows them to resize after the intro is finished.
        //19 - magic number.
    }

    if (i >= line.length) {
        i = 0;
        if (!isLastLine)
            p.style.width = getComputedStyle(p)["width"];
        rollIntro(lineNum + 1)
        return;
    }

    i++;
    currentTimeout = setTimeout(typewriter, delay, p, line, lineNum, isLastLine);
}

function drawCloseButton() {
    const close = document.querySelector("#close-intro");
    close.classList.replace("op-0", "op-100");
    close.addEventListener("click", closeIntro);
}

function mainScreenTurnOn(e) {
    if (e) {
        e.target.style.cssText = `
        position: absolute;
        width: 100%;
    `
    }
    const mainScreen = document.querySelector("#main-screen");
    mainScreen.classList.replace("hide", "center-flex");
    document.addEventListener("keydown", scrollKeyDown);
    document.addEventListener("wheel", scrollWheel);
    const up = document.querySelector("#up");
    const down = document.querySelector("#down");
    up.addEventListener("click", scrollClick);
    down.addEventListener("click", scrollClick);
    const aiWrap = document.querySelector("#ai-wrap");
    addElements(30);
    aiWrap.children[0].classList.add("previous");
    aiWrap.children[1].classList.add("current");
    aiWrap.children[2].classList.add("next");
    document.querySelector("#select").firstElementChild
        .addEventListener("click", roll, { once: true });
}

function handleKeypress(e) {
    const key = e.key;
    const esc = document.querySelector("#escape-message")
    if (key === "Escape" && !skipInterval) {
        const bar = document.querySelector("#skip-progress-bar");
        bar.classList.replace("op-0", "op-100");
        const root = document.querySelector(":root");
        progress = 100;
        esc.classList.add("hide");
        skipInterval = setInterval(moveProgressBar, 20, root);
        return;
    }
    else if (!skipInterval) {
        clearTimeout(escTimeout);
        esc.classList.replace("op-0", "op-100");
        escTimeout = setTimeout(() => esc.classList.replace("op-100", "op-0"), 1000);
    }
}

function closeIntro() {
    const container = document.querySelector(":has( > #intro)");
    container.classList.replace("op-100", "op-0");
    if (currentTimeout)
        clearTimeout(currentTimeout);
    if (localStorage.introDone) {
        mainScreenTurnOn();
        removeIntro({ target: container });
    }
    else {
        container.addEventListener("transitionstart", mainScreenTurnOn);
        container.addEventListener("transitionend", removeIntro);
        localStorage.introDone = true;
    }
    document.removeEventListener("keydown", handleKeypress);
    document.removeEventListener("keyup", introKeyUp);
}

function removeIntro(e) {
    e.target.remove()
    const aiWrapContainer = document.querySelector(".rps-window:has(#ai-wrap)");
    const aiWrap = document.querySelector("#ai-wrap");
    aiWrap.style.position = "absolute";
    aiWrapContainer.style.position = "relative";

}

function introKeyUp(e) {
    if (e.key === "Escape") {
        clearInterval(skipInterval);
        skipInterval = "";
        const skip = document.querySelector("#skip-progress-bar");
        skip.classList.replace("op-100", "op-0");
        const unhide = () => {
            const esc = document.querySelector("#escape-message")
            esc.classList.remove("hide");
            skip.removeEventListener("transitionend", unhide)
        }
        skip.addEventListener("transitionend", unhide);
    }
}

function moveProgressBar(root) {
    progress -= 2;
    root.style.setProperty("--progress", `${progress}%`);
    if (progress == 0) {
        clearInterval(skipInterval)
        skipInterval = "";
        document.querySelector("#skip-progress-bar").remove();
        closeIntro();
    }
}

function addElements(count) {
    const aiWrap = document.querySelector("#ai-wrap")
    for (let i = 0; i < count; i++) {
        for (let j of ["scissors", "rock", "paper"]) {
            const p = document.createElement("p")
            p.innerText = j;
            p.classList.add("trans-var");
            aiWrap.append(p);
        }
    }
}

rollIntro(0);