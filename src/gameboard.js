import Ship from "./battleship";

export default class Gameboard {
    constructor() {
        this.twoDArray = Array.from({ length: 8 }, () => Array(8).fill(0));
        this.gridContainer = document.getElementById("grid");
        this.createGrid();
        this.addClickEventListeners();
        this.shipDestroyer = document.querySelector(".ship-destroyer");
        this.clickedCoordinates = []; // Array to store click event coordinates
        this.shipsPlaced = 0; // Keep track of the number of ships placed
        this.isFinishedPromise = new Promise((resolve) => {
            this.resolvePromise = resolve;
        });
        this.previousAttacks = new Set(); // Set to store previously attacked coordinates
    }
    createGrid() {

        for (var i = 0; i < 8; i++) {
            var row = this.gridContainer.insertRow(i);
            for (var j = 0; j < 8; j++) {
                var cell = row.insertCell(j);
                cell.classList.add("grid-item")
                cell.dataset.row = i;
                cell.dataset.column = j;
            }
        }
    }

    addClickEventListeners() {
        this.gridContainer.addEventListener('mouseup', (event) => {
            if (event.target.classList.contains('grid-item')) {
                const row = parseInt(event.target.dataset.row);
                const column = parseInt(event.target.dataset.column);
                const coordinates = [row, column];

                this.clickedCoordinates = coordinates; // Store coordinates in the array
                this.clickedCoordinates = coordinates;
                console.log('Selected Cell Coordinates:', coordinates, "this.clicked:", this.clickedCoordinates);

                if (this.twoDArray[row][column] === 1) {
                    this.twoDArray[row][column] = "X";
                    console.log("Hit!");
                } else {
                    console.log("Miss!");
                }


            }
        });
    }

    placeBoat(boat, shouldAddClass = true) {
        const { angle, length, location } = boat;
        const [row, col] = location;

        if (angle === 'H') {
            for (let i = 0; i < length; i++) {
                if (col + i >= 8 || this.twoDArray[row][col + i] === 1) {
                    return false;
                }
            }
            for (let i = 0; i < length; i++) {
                this.twoDArray[row][col + i] = 1;
                if (shouldAddClass) {
                    const cell = this.gridContainer.rows[row].cells[col + i];
                    cell.classList.add('boat-cell'); // Add a CSS class to style the boat cell
                }
            }
        } else if (angle === 'V') {
            for (let i = 0; i < length; i++) {
                if (row + i >= 8 || this.twoDArray[row + i][col] === 1) {
                    return false;
                }
            }
            for (let i = 0; i < length; i++) {
                this.twoDArray[row + i][col] = 1;
                if (shouldAddClass) {
                    const cell = this.gridContainer.rows[row + i].cells[col];
                    cell.classList.add('boat-cell'); // Add a CSS class to style the boat cell
                }
            }
        }
        this.shipsPlaced++
        if (this.shipsPlaced >= 3) {
            this.resolvePromise(); // Resolve the promise when the counter reaches 3
        }
        return true;
    }

    waitForFinish() {
        return this.isFinishedPromise;
    }
    allPlaced() {
        this.shipsPlaced++;

        // Check if three ships have been placed
        if (this.shipsPlaced === 3) {
            // Resolve the promise
            return Promise.resolve(this);
        } else {
            // Return a pending promise
            return new Promise((resolve) => {
                console.log(resolve, "doesntworks!")
            });
        }
    }



    recieveAttack(x) {
        if (this.twoDArray[x[0]][x[1]] === 1) {
            this.twoDArray[x[0]][x[1]] = "X"
            return "hit!"
        }
        else if (this.twoDArray[x[0]][x[1]] === 0) {
            return "miss!";
        }


    }
    run() {
        return "this.clickedCoordinates";
    }


    findEngGame() {
        const flattenedArray = this.twoDArray.flat(); // Flatten the 2D array
        const countX = flattenedArray.filter(item => item === 'X').length;
        return countX >= 6;
    }

    check() {
        // Return the array of click event coordinates
        return this.clickedCoordinates;
    }

    placeRandomShips() {
        const ships = [
            { type: 'Destroyer', length: 2 },
            { type: 'Submarine', length: 3 },
            { type: 'Cruiser', length: 4 }
        ];

        for (const ship of ships) {
            let placed = false;

            while (!placed) {
                const row = Math.floor(Math.random() * 8);
                const col = Math.floor(Math.random() * 8);

                // Randomly choose orientation, ensuring it fits within the game board's boundaries
                const orientation = Math.random() < 0.5 && col + ship.length <= 8 ? 'H' : 'V';

                if (this.placeBoat(new Ship(orientation, ship.length, [row, col]), true)) {
                    placed = true;
                }

            }
        }
    }

    receiveAttack() {
        // Function to generate a random coordinate [row, col] within the 8x8 grid
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

        const [row, col] = coordinate;
        if (this.twoDArray[row][col] === 1) {
            this.twoDArray[row][col] = "X";
            console.log("Hit!");
        } else {
            console.log("Miss!");
        }
    }
    receiveAttack1() {
        const [row, col] = this.clickedCoordinates;
        if (this.twoDArray[row][col] === 1) {
            this.twoDArray[row][col] = "X";
            console.log("Hit!");
        } else {
            console.log("Miss!");
        }

    }
}