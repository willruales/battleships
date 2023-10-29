import Gameboard from "./gameboard.js";
import Ship from "./battleship.js";
const board = new Gameboard();
const secondary = new Gameboard();

const grid = document.querySelector('.grid');
grid.textContent = "assss"
class Player {
    constructor(x, y) {
        this.playBoard = x;
        this.attackBoard = y;
        this.turn = null;
        this.boats = []
    }


}

const Player1 = new Player(board, secondary)

const destroyer = new Ship(2, [1, 2])

class ComputerPlayer {
    constructor(gameboard) {
        this.playerGameBoard = gameboard;
        this.ships = [];
        this.placeRandomShips();
    }

    placeRandomShips() {
        const shipLengths = [2, 2, 3, 3, 4];

        for (const length of shipLengths) {
            let shipPlaced = false;
            while (!shipPlaced) {
                const randomLocation = this.generateRandomLocation(length);
                const randomAngle = Math.random() < 0.5 ? 'H' : 'V';
                const ship = new Ship(randomAngle, length, randomLocation);

                if (this.playerGameBoard.placeBoat(ship)) { }
            }
        }
    }

    generateRandomLocation(length) {
        const row = Math.floor(Math.random() * 8);
        const col = Math.floor(Math.random() * (8 - length + 1));
        return [row, col];
    }

    isShipOverlap(ship) {
        const { angle, length, location } = ship;
        const [row, col] = location;

        for (let i = 0; i < length; i++) {
            if (
                (angle === 'H' && this.playerGameBoard.twoDArray[row][col + i] === 1) ||
                (angle === 'V' && this.playerGameBoard.twoDArray[row + i][col] === 1)
            ) {
                return true; // Overlapping
            }
        }
        return false; // Not overlapping
    }
}
const computerPlayer = new ComputerPlayer(board)
console.log("yes")