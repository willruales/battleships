import Gameboard from "./gameboard.js";
//import gametable from "./gametable.js";
import Ship from "./battleship.js";

let board; // Declare board at the top level
let boat;

beforeEach(() => {
    board = new Gameboard(); // Assign a value to the top-level board variable
    boat = new Ship("H", 2, [0, 0])
    board.placeBoat(boat)
    return board;

});

test("doesnt recognize repeateded coords on new boat placement", () => {
    const repeatingBoat = new Ship("V", 2, [0, 0])
    expect(board.placeBoat(repeatingBoat)).toBe(false);
});
test("Does recognize different coords on new boat placement", () => {
    const repeatingBoat = new Ship("V", 2, [3, 0])
    expect(board.placeBoat(repeatingBoat)).toBe(true);
});

describe('attack, miss', () => {
    test("not a direct hit on array", () => {
        const board = new Gameboard(); // Assign a value to the top-level board variable

        const boat = new Ship("H", 2, [0, 0]);
        board.placeBoat(boat);

        expect(board.recieveAttack([0, 1])).toBe("hit!");
    });

    test("didn't respond to miss!", () => {
        expect(board.recieveAttack([1, 1])).toBe("miss!"); // Fix the typo in "receiveAttack"
    });
});
