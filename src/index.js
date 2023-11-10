import Gameboard from "./gameboard.js";
import Ship from "./battleship.js";
import { setupDragAndDrop } from './dragAndDrop';
import createButton from './play-reset';

const player1 = setupDragAndDrop
const shipsContainer = document.getElementById("ships-container");
const foo = setupDragAndDrop();

shipsContainer.addEventListener("click", function (event) {
    const switchAngleElement = event.target.closest(".switch-angle");

    if (switchAngleElement) {
        const shipElement = switchAngleElement.closest(".ship");
        const currentDataAngle = switchAngleElement.getAttribute("data-angle");

        // Toggle between "H" and "V" for data-angle
        switchAngleElement.setAttribute("data-angle", currentDataAngle === "H" ? "V" : "H");
        switchAngleElement.textContent = currentDataAngle === "H" ? "V" : "H";

        shipElement.setAttribute("data-angle", currentDataAngle === "H" ? "V" : "H");
    }
    console.log(foo)

});


foo.waitForFinish().then(() => {
    console.log("Instance is finished¬¬!");
    createButton("Play", function () {
        alert("Play button clicked");
        const computerPlay = new Gameboard
        computerPlay.placeRandomShips();
        console.log(computerPlay.twoDArray)
        foo.receiveAttack();
    });

    createButton("Reset", function () {
        alert("Reset button clicked");
        // Add your reset logic here
    });
});