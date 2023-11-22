import Gameboard from "./gameboard.js";
import { setupDragAndDrop } from './dragAndDrop';
import createButton from './play-reset';

const player1 = setupDragAndDrop();
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

player1.waitForFinish().then(() => {
    console.log("Instance is finished¬¬!");
    createButton("Play", function (resolve) {
        alert(resolve, "Play button clicked");
        computerPlayer = new Gameboard("computer")
        computerPlayer.placeRandomShips();

        console.log(computerPlayer, "look")
    });

    createButton("Reset", function () {
        alert("Reset button clicked");
        // Add your reset logic here
    });
    return player1.receiveRandomAttack()
})

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

