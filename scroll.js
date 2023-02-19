let rateLimit = false;

window.addEventListener("keydown", (e) => {
    if (rateLimit)
        return;
    const root = document.querySelector(":root");
    const current = document.querySelector(".current");
    const wrapper = document.querySelector(".wrapper");
    const container = document.querySelector("#container");
    const previous = document.querySelector(".previous");
    const next = document.querySelector(".next");
    const hidden = document.querySelectorAll(".disable");
    const begin = document.querySelector(".begin");
    const end = document.querySelector(".end");
    const y = +getComputedStyle(root).getPropertyValue("--y").replace("em", "");
    const wrapperY = +getComputedStyle(root).getPropertyValue("--wrapper-y").replace("em", "");

    if (e.key === "ArrowUp") {
    }
    else if (e.key === "ArrowDown") {
        hidden[0].remove();
        begin.classList.replace("begin", "disable");
        previous.classList.replace("previous", "begin");
        current.classList.replace("current", "previous");
        next.classList.replace("next", "current");
        end.classList.replace("end","next");
        hidden[1].classList.replace("disable","end");
        root.style.setProperty("--y", y - 1 + "em");
        root.style.setProperty("--wrapper-y", wrapperY + 1 + "em");
        const newHidden = next.cloneNode(true)
        newHidden.classList.replace("current","disable");
        wrapper.append(newHidden);
        
        rateLimit = true;
        setTimeout(() => rateLimit = false, 150);
        // hidden[1].classList.replace("disable", "next");
        // previous.classList.replace("previous", "disable");
    }
});