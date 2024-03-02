import Gameboard from "./gameboard.js";
import { setupDragAndDrop } from './dragAndDrop';
import createButton from './play-reset';

let player1;
({ player: player1 } = setupDragAndDrop());



const grid = document.getElementById("grid")
let computerPlayer;
const shipsContainer = document.getElementById("ships-container");

shipsContainer.addEventListener("click", function (event) {
    const switchAngleElement = event.target.closest(".switch-angle");

    if (switchAngleElement) {
        const shipElement = switchAngleElement.closest(".ship");
        const currentDataAngle = switchAngleElement.getAttribute("data-angle");

        switchAngleElement.setAttribute("data-angle", currentDataAngle === "H" ? "V" : "H");
        switchAngleElement.textContent = currentDataAngle === "H" ? "V" : "H";

        shipElement.setAttribute("data-angle", currentDataAngle === "H" ? "V" : "H");
    }
    console.log(player1)

});
console.log(player1)

async function foobar() {
    return new Promise(async (resolve) => {
        const handleMouseUp = async (event) => {
            if (event.target.classList.contains('grid-item')) {
                const row = parseInt(event.target.dataset.row);
                const column = parseInt(event.target.dataset.column);
                computerPlayer.clickedCoordinates = [row, column];

                try {
                    const result = await computerPlayer.receiveAttack1();
                    const result2 = await player1.receiveRandomAttack();

                    const firstTrueResult = result === true ? finalPrompt('userwins') : result2 === true ? finalPrompt('computerwins') : null;
                    console.log(firstTrueResult);
                    function finalPrompt(x) {
                        if (confirm(`${x} wins! Play again?`)) {
                            const ships = document.querySelectorAll(".ship");
                            grid.innerHTML = '';
                            computerPlayer = null;

                            ({ player: player1 } = setupDragAndDrop());
                            setupGameForPlayer1();

                            ships.forEach((ship) => {
                                ship.setAttribute("draggable", "true");
                                ship.classList.remove("placed-ship", "boat-cell");
                            });

                            return true; // You can return true if you want to indicate that the user confirmed
                        }

                        return false; // You can return false if you want to indicate that the user canceled
                    }

                } catch (error) {
                    console.error("Error:", error);
                }

                resolve();
            }
        };

        computerPlayer.table.addEventListener('mouseup', handleMouseUp);
    });
}

function setupGameForPlayer1() {
    player1.waitForFinish()
        .then(() => {
            console.log("Instance is finished!");
            computerPlayer = new Gameboard("computer");
            computerPlayer.placeRandomShips();

            return foobar();
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}
setupGameForPlayer1();