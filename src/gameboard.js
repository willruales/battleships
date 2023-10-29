export default class Gameboard {
    constructor() {
        this.twoDArray = Array.from({ length: 8 }, () => Array(8).fill(0));
        //this.squareMatrix = Array.from({ length: numRows }, (_, i) => flatArray.slice(i * numCols, (i + 1) * numCols));
    }


    placeBoat(boat) {
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
            }
        } else if (angle === 'V') {
            for (let i = 0; i < length; i++) {
                if (row + i >= 8 || this.twoDArray[row + i][col] === 1) {
                    return false;
                }
            }
            for (let i = 0; i < length; i++) {
                this.twoDArray[row + i][col] = 1;
            }
        }
        return true;
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
        return 1;
    }


    findEngGame() {
        const flattenedArray = this.twoDArray.flat(); // Flatten the 2D array
        const countX = flattenedArray.filter(item => item === 'X').length;
        return countX >= 6;
    }
}




// console.log(table)
// const board = new Gameboard();
// board.placeBoat([0, 3]);

