export default function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    document.getElementById("button-container").appendChild(button);
}

