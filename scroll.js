window.addEventListener("keydown", (e) => {
    const root = document.querySelector(":root");
    const current = document.querySelector(".current");
    const next = current.querySelector("::after");
    const y = +getComputedStyle(root).getPropertyValue("--y").replace("px", "");
    
    if (e.key === "ArrowUp") {
        root.style.setProperty("--y", y - 21 + "px");
        current.classList.remove("current");
        current.classList.add("op-0");
        next.classList.remove("op-0");
        next.classList.add("current");
    }
    else if (e.key === "ArrowDown") {
        root.style.setProperty("--y", y + 21 + "px");
    }
});