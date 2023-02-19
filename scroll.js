window.addEventListener("keydown", (e) => {
    const root = document.querySelector(":root");
    const current = document.querySelector(".current");
    const wrapper = document.querySelector(".wrapper");
    const elements = Array.from(wrapper.children);
    const after = elements[elements.indexOf(current) + 1];
    const before = elements[elements.indexOf(current) - 1];

    const y = +getComputedStyle(root).getPropertyValue("--y").replace("em", "");

    if (e.key === "ArrowUp") {
        root.style.setProperty("--y", y - 1.5 + "em");
        current.classList.remove("current");
        wrapper.append(current.cloneNode(true));
        // current.classList.add("op-0");
        // after.classList.remove("op-0");
        wrapper.querySelector(":first-child").remove();
        after.classList.add("current");
    }
    else if (e.key === "ArrowDown") {
        root.style.setProperty("--y", y + 1.5 + "em");
        current.classList.remove("current");
        before.classList.add("current");
        const newNode = current.cloneNode(true);
        // wrapper.prepend();
    }
});