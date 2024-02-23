import Gameboard from "./gameboard.js";
import { setupDragAndDrop } from './dragAndDrop';
import createButton from './play-reset';

const gameSetup = setupDragAndDrop();
const player1 = gameSetup.player;
let firstTrueResult = null;

//const player1 = setupDragAndDrop();
const grid = document.getElementById("grid")
let computerPlayer;
const shipsContainer = document.getElementById("ships-container");
//const allShips = setupDragAndDrop();

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

                    // Find the first result that is true
                    firstTrueResult = result === true ? 'result' : result2 === true ? 'result2' : null;

                    if (firstTrueResult !== null) {
                        console.log("First function that returned true:", firstTrueResult);
                    } else {
                        console.log("Neither function returned true");
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

player1.waitForFinish().then(() => {
    console.log("Instance is finished!");
    computerPlayer = new Gameboard("computer");
    computerPlayer.placeRandomShips();

    createButton("Play", async function (resolve) {
        // Add your logic here
        // If this function is asynchronous, handle it accordingly
    });

    createButton("Reset", function () {
        alert("Reset button clicked");
        computerPlayer.resetGame();
        player1.resetGame();

        player1.clearGrid()
    });

    // Start the asynchronous operations in foobar
    return foobar();
}).catch(error => {
    console.error("An error occurred:", error);
});


// .then(finalResult => {
//     console.log(finalResult);
// })


// async function playGame() {
//     while (!player1.findEngGame() && !computerPlayer.findEngGame()) {
//         // Player1's turn
//         console.log("Player1's turn:");
//         const [playerRow, playerCol] = player1.addClickEventListeners(); // Assuming check() returns the last clicked coordinates
//         computerPlayer.receiveAttack1();

//         // Check if player1 has won
//         if (player1.findEngGame()) {
//             console.log("Player1 wins!");
//             break;
//         }

//         // ComputerPlayer's turn
//         console.log("ComputerPlayer's turn:");
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating a delay for computer's move
//         console.log("ComputerPlayer's turn:");

//         const [computerRow, computerCol] = computerPlayer.receiveRandomAttack();
//         player1.receiveAttack1(computerRow, computerCol);
//         player1.displayBoard();

//         // Check if computerPlayer has won
//         if (computerPlayer.findEngGame()) {
//             console.log("ComputerPlayer wins!");
//             break;
//         }
//     }
// }

// // Run the game
// playGame();
