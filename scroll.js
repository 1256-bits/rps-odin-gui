window.addEventListener("keydown", (e) => {
    const root = document.querySelector(":root");
    const y = +getComputedStyle(root).getPropertyValue("--y").replace("px", "");
    if (e.key === "ArrowUp")
        root.style.setProperty("--y", y - 2 + "px");
    else if (e.key === "ArrowDown")
        root.style.setProperty("--y", y + 2 + "px");
});