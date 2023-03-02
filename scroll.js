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

function aiScroll(count, result) {
    aiScroll.root = document.querySelector(":root");
    aiScroll.count = count;
    aiScroll.result = result;
    aiScroll.interval = setInterval(() => {
        const y = +getComputedStyle(aiScroll.root).getPropertyValue("--ai-y").replace("em", "");
        aiScroll.root.style.setProperty("--ai-y", y - 1 + "em");
        const next = document.querySelector("#ai-wrap > .next");
        const current = next.previousSibling;
        current.classList.replace("current", "previous");
        next.classList.replace("next", "current");
        next.nextSibling.classList.add("next");
        aiScroll.count--;
        if (aiScroll.count <= 0 && current.innerText === aiScroll.result)
            clearInterval(aiScroll.interval);
    },200);
}