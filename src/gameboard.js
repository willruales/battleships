import Ship from "./battleship";

export default class Gameboard {
    constructor(playerType) {
        this.playerType = playerType;

        this.twoDArray = Array.from({ length: 8 }, () => Array(8).fill(0));
        this.table = document.createElement('table');
        this.gridContainer = document.getElementById("grid");
        this.createGrid();
        this.shipDestroyer = document.querySelector(".ship-destroyer");
        this.clickedCoordinates = [];
        this.shipsPlaced = 0; // Keep track of the number of ships placed
        this.isFinishedPromise = new Promise((resolve) => {
            this.resolvePromise = resolve;
        });
        this.previousAttacks = new Set(); // Set to store previously attacked coordinates
        // if (this.playerType === 'computer') {
        //     this.addClickEventListeners();
        // }
    }
    createGrid() {

        for (var i = 0; i < 8; i++) {
            // Add a new row to the table
            var row = this.table.insertRow(i);

            for (var j = 0; j < 8; j++) {
                // Add a cell to the current row
                var cell = row.insertCell(j);
                cell.classList.add("grid-item");
                cell.dataset.row = i;
                cell.dataset.column = j;
            }
        }

        // Append the table to the grid container
        this.gridContainer.appendChild(this.table);
    }

    addClickEventListeners() {
        this.table.addEventListener('mouseup', (event) => {
            if (event.target.classList.contains('grid-item')) {
                const row = parseInt(event.target.dataset.row);
                const column = parseInt(event.target.dataset.column);
                this.clickedCoordinates = [row, column];

                console.log('Selected Cell Coordinates:', this.clickedCoordinates);

                this.receiveAttack1();
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
                    const cell = this.table.querySelector(`[data-row="${row}"][data-column="${col + i}"]`);
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
                    const cell = this.table.querySelector(`[data-row="${row + i}"][data-column="${col}"]`);
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
    run() {
        return new Promise((resolve) => { console.log("2nd promise"), resolve("as") });
    }
    foo() {
        return new Promise((resolve) => { console.log("3rd promise"), resolve("as") });
    }

    findEngGame() {
        const flattenedArray = this.twoDArray.flat(); // Flatten the 2D array
        const countX = flattenedArray.filter(item => item === 'X').length;
        return countX >= 6;
    }

    check() {
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

                const orientation = Math.random() < 0.5 && col + ship.length <= 8 ? 'H' : 'V';

                if (this.placeBoat(new Ship(orientation, ship.length, [row, col]), true)) {
                    placed = true;
                }

            }
        }
    }

    receiveRandomAttack() {
        return new Promise((resolve) => {
            const generateRandomCoordinate = () => {
                const row = Math.floor(Math.random() * 8);
                const col = Math.floor(Math.random() * 8);
                return [row, col];
            };

            console.log("Works"); // Log statement for testing

            let coordinate;
            do {
                coordinate = generateRandomCoordinate();
            } while (this.previousAttacks.has(coordinate)); // Ensure the coordinate hasn't been attacked before

            this.previousAttacks.add(coordinate);

            const [row, col] = coordinate;
            if (this.twoDArray[row][col] === 1) {
                this.twoDArray[row][col] = "X";
                console.log("Computer makes a Hit!!"); // Corrected log statement
                resolve("Computer makes a Hit!!");
            } else {
                console.log("Computer makes a Miss!!"); // Corrected log statement
                resolve("Computer makes a Miss!!");
            }
        });
    }
    receiveAttack1() {
        const [row, col] = this.clickedCoordinates;
        console.log(this.clickedCoordinates);

        if (this.twoDArray[row][col] === 1) {
            this.twoDArray[row][col] = "X";
            console.log("Player makes a Hit!!!");
        } else {
            console.log("Player makes a Miss!!!");
        }
    }


}