import Ship from "./battleship.js";
import Gameboard from "./gameboard.js";
const player1 = new Gameboard();
function disableShipDrag(x) {
    x.setAttribute("draggable", "false");
    x.classList.add("placed-ship");
}


export function setupDragAndDrop() {
    const ships = document.querySelectorAll(".ship");
    let currentShip = null;
    const grid = document.getElementById("grid");

    ships.forEach((ship) => {
        ship.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", "dragged");
            currentShip = ship;
        });

        ship.addEventListener("dragend", () => {
            currentShip = null;
        });
    });

    grid.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    });

    grid.addEventListener("dragenter", (e) => {
        e.preventDefault();
    });

    grid.addEventListener("dragleave", (e) => {
        e.preventDefault();
    });

    grid.addEventListener("drop", (e) => {
        e.preventDefault();
        const shipLength = currentShip.getAttribute("data-length");
        const shipAngle = currentShip.getAttribute("data-angle");
        console.log(shipAngle, shipLength);
        if (e.dataTransfer.getData("text/plain") === "dragged" && shipLength) {
            const x = e.clientX - grid.getBoundingClientRect().left;
            const y = e.clientY - grid.getBoundingClientRect().top;

            const cellX = Math.floor((x / grid.offsetWidth) * 8);
            const cellY = Math.floor((y / grid.offsetHeight) * 8);
            const dragCoords = [cellY, cellX];

            // Create a new Ship and place it on the grid
            const newShip = new Ship(shipAngle, parseInt(shipLength), dragCoords);

            console.log(newShip);

            const boatPlaced = player1.placeBoat(newShip);
            if (boatPlaced) {
                disableShipDrag(currentShip);
                currentShip = null;
                e.target.classList.remove("drag-over");
            }

        }
    });

    return player1
}
