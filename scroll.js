let rateLimit = false;
let scrollInterval;

function scroll(direction) {
    if (rateLimit)
        return;
    const root = document.querySelector(":root");
    const current = document.querySelector(".current");
    const wrapper = document.querySelector(".wrapper");
    const previous = document.querySelector(".previous");
    const next = document.querySelector(".next");
    const hidden = document.querySelectorAll(".disable");
    const begin = document.querySelector(".begin");
    const end = document.querySelector(".end");
    const y = +getComputedStyle(root).getPropertyValue("--y").replace("em", "");
    const wrapperY = +getComputedStyle(root).getPropertyValue("--wrapper-y").replace("em", "");

    if (direction === "up") {
        hidden[1].remove();
        end.classList.replace("end", "disable");
        previous.classList.replace("previous", "current");
        next.classList.replace("next", "end");
        current.classList.replace("current", "next");
        begin.classList.replace("begin", "previous");
        hidden[0].classList.replace("disable", "begin");
        root.style.setProperty("--y", y + 1 + "em");
        root.style.setProperty("--wrapper-y", wrapperY - 1 + "em");
        const newHidden = previous.cloneNode(true)
        newHidden.classList.replace("current", "disable");
        wrapper.prepend(newHidden);
    }

    else if (direction === "down") {
        hidden[0].remove();
        begin.classList.replace("begin", "disable");
        previous.classList.replace("previous", "begin");
        current.classList.replace("current", "previous");
        next.classList.replace("next", "current");
        end.classList.replace("end", "next");
        hidden[1].classList.replace("disable", "end");
        root.style.setProperty("--y", y - 1 + "em");
        root.style.setProperty("--wrapper-y", wrapperY + 1 + "em");
        const newHidden = next.cloneNode(true)
        newHidden.classList.replace("current", "disable");
        wrapper.append(newHidden);
    }

    rateLimit = true;
    setTimeout(() => rateLimit = false, 150);
}

function scrollWheel(e) {
    scroll((e.deltaY > 0) ? "down" : "up");
}

function scrollKeyDown(e) {
    if (e.key === "ArrowUp")
        scroll("up");
    else if (e.key === "ArrowDown")
        scroll("down");
}

function scrollClick() {
    scroll(this.id);
}

function aiScroll() {
    const aiWrap = document.querySelector("#ai-wrap");
    aiScroll.intervalSpeed = 100;
    aiScroll.interval = setInterval(aiInterval, 100);
    aiScroll.root = document.querySelector(":root");
}

function aiInterval() {
    const y = +getComputedStyle(aiScroll.root).getPropertyValue("--ai-y").replace("em", "");
    aiScroll.root.style.setProperty("--ai-y", y - 1 + "em");
    const next = document.querySelector("#ai-wrap > .next");
    next.previousSibling.classList.replace("current", "previous");
    next.classList.replace("next", "current");
    next.nextSibling.classList.add("next");
    if (Math.trunc(Math.abs(y)) % 5 === 0 && Math.abs(y) >= 1) {
        console.log(y)
        clearInterval(aiScroll.interval)
        // const aiWrap = document.querySelector("#ai-wrap");
        const transSpeed = +getComputedStyle(aiScroll.root)
            .getPropertyValue("--transition-speed")
            .replace("s", "");
        aiScroll.root.style.setProperty("--transition-speed",transSpeed + 0.1 + "s");
        aiScroll.intervalSpeed += 100;
        aiScroll.interval = setInterval(aiInterval, aiScroll.intervalSpeed);
    }
}

/* How to make aiScroll stop on the random value:
    1) Start scrolling for N em
    2) Dep. on starting value add X em to the scrolling distance
*/