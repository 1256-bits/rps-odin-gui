window.addEventListener("keydown", (e) => {
    const root = document.querySelector(":root");
    const current = document.querySelector(".current");
    const elements = Array.from(document.querySelector(".wrapper").children);
    const after = elements[elements.indexOf(current) + 1];
    const before = elements[elements.indexOf(current) - 1];

    const y = +getComputedStyle(root).getPropertyValue("--y").replace("em", "");

    if (e.key === "ArrowUp") {
        root.style.setProperty("--y", y - 1.5 + "em");
        current.classList.remove("current");
        // current.classList.add("op-0");
        // after.classList.remove("op-0");
        before.classList.add("current");
    }
    else if (e.key === "ArrowDown") {
        root.style.setProperty("--y", y + 1.5 + "em");
        current.classList.remove("current");
        after.classList.add("current");
    }
});