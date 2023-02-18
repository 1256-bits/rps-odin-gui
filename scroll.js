const ul = document.querySelector("ul");
let currentChild = 0;
const children = ul.children;
window.addEventListener("keydown", (e) => {
    const updateChild = () => children[currentChild].classList.toggle("hide");
    updateChild();
    if (e.key === "ArrowUp")
        currentChild--;
    else if (e.key === "ArrowDown")
        currentChild++;

    if (currentChild > children.length - 1)
        currentChild = 0;
    else if (currentChild < 0)
        currentChild = children.length - 1;
    updateChild();
});



