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
        this.table.classList.add(`${this.playerType}`);
        this.gridContainer.appendChild(this.table);
    }
    resetGame() {
        // Implement logic to reset the game board and any other necessary state
        this.twoDArray = Array.from({ length: 8 }, () => Array(8).fill(0));
        this.shipsPlaced = 0;
        this.clearGrid();
        this.table.classList.remove('computerBoard');

        // this.createGrid();
        // Additional reset logic as needed
    }
    clearGrid() {
        // Iterate over each row
        for (var i = 0; i < 8; i++) {
            // Get the current row
            var row = this.table.rows[i];

            // Iterate over each cell in the current row
            for (var j = 0; j < 8; j++) {
                // Get the current cell
                var cell = row.cells[j];

                // Clear the cell content or reset styles
                cell.classList.remove("boat-cell");

                // Additional reset logic as needed for other cell properties
            }
        }
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

    checkEndGame() {
        const flattenedArray = this.twoDArray.flat(); // Flatten the 2D array
        const countX = flattenedArray.filter(item => item === 'X').length;

        if (countX >= 2) {
            // if (confirm(`${this.playerType} wins! Play again?`)) {

            //     this.table.removeChild(this.table.firstChild);
            //     const ships = document.querySelectorAll(".placed-ship");

            //     ships.forEach((ship) => {
            //         ship.setAttribute("draggable", "true");
            //         ship.classList.remove("placed-ship");
            //     });
            //     return true
            // }

            return true
        } else {
            // Do nothing!
            console.log('game does nothing');
        }

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

                if (this.placeBoat(new Ship(orientation, ship.length, [row, col]), false)) {
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

            // Corrected: Call generateRandomCoordinate to get the actual coordinates
            const [row, col] = generateRandomCoordinate();
            const cell = this.table.querySelector(`[data-row="${row}"][data-column="${col}"]`);

            // Corrected: Use toString() on the coordinates array
            const coordinatesString = `${row},${col}`;

            if (this.previousAttacks.has(coordinatesString)) {
                console.log("Already attacked these coordinates!");
                return;
            }

            if (this.twoDArray[row][col] === 1) {
                this.twoDArray[row][col] = "X";
                cell.style.background = "black", console.log("Computer makes a Hit!!", this.twoDArray);
                resolve(this.checkEndGame());
            } else {
                console.log("Computer makes a Miss!!", this.twoDArray);
                cell.style.background = "blue";
                resolve();
            }

            // console.log(this.previousAttacks);
            this.previousAttacks.add(coordinatesString);
        });
    }

    receiveAttack1() {
        const [row, col] = this.clickedCoordinates;
        const cell = this.table.querySelector(`[data-row="${row}"][data-column="${col}"]`);
        const coordinatesString = `${row},${col}`;

        console.log(this.clickedCoordinates);

        return new Promise((resolve, reject) => {
            if (this.previousAttacks.has(coordinatesString)) {
                reject("Already attacked these coordinates!");
                return;
            }
            else {
                if (this.twoDArray[row][col] === 1) {
                    this.twoDArray[row][col] = "X";


                    console.log("Player makes a Hit!!!", this.twoDArray), cell.style.background = "black";
                    resolve(this.checkEndGame(), "<-look")
                } else {
                    console.log("Player makes a Miss!!!", this.twoDArray);
                    cell.style.background = "blue"
                    resolve()
                }

                this.previousAttacks.add(coordinatesString);


                //resolve("playermakes a move")
            }
        })
    }


}