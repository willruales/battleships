import Ship from "./battleship.js";
import Gameboard from "./gameboard.js";
function disableShipDrag(x) {
    x.setAttribute("draggable", "false");
    x.classList.add("placed-ship");
}


export function setupDragAndDrop() {
    const player1 = new Gameboard("user");
    player1.receiveRandomAttack = function () {




        const generateRandomCoordinate = () => {
            const row = Math.floor(Math.random() * 8);
            const col = Math.floor(Math.random() * 8);
            return [row, col];
        };

        let coordinate;
        do {
            coordinate = generateRandomCoordinate();
        } while (this.previousAttacks.has(coordinate)); // Ensure the coordinate hasn't been attacked before

        this.previousAttacks.add(coordinate);

        // const [row, col] = coordinate;
        // if (this.twoDArray[row][col] === 1) {
        //     this.twoDArray[row][col] = "X";
        //     console.log("Hit!! drag");
        // } else {
        //     console.log("Miss!! drop");
        // }







    };

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
