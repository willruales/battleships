/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/battleship.js":
/*!***************************!*\
  !*** ./src/battleship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nlet shipCount = {};\n\nclass Ship {\n    constructor(angle, length, location) {\n        this.length = length;\n        this.name = this.createShipName(length);\n        this.hp = length;\n        this.sink = false;\n        this.location = location;\n        this.angle = angle;\n    }\n\n    shipHit() {\n        this.hp--;\n        if (this.hp <= 0) {\n            this.shipSunk();\n        }\n    }\n\n    shipSunk() {\n        this.sink = true;\n    }\n\n    createShipName(length) {\n        if (length === 2) {\n            return \"Destroer\";\n        }\n        else if (length === 3) {\n            return \"Submarine\"\n        }\n        else if (length === 3) {\n            return \"cruister\"\n        }\n\n        else {\n            const count = shipCount[length] || 0;\n            shipCount[length] = count + 1;\n            return `Ship${count}`;\n        }\n    }\n\n    // assertLocation(coordinatesToCheck, callback) {\n    //     let allPlaced = true;\n    //     coordinatesToCheck.forEach(coord => {\n    //         if (!callback.placeBoat(coord)) {\n    //             allPlaced = false;\n    //         }\n    //     });\n\n    //     if (allPlaced) {\n    //         return coordinatesToCheck;\n    //     }\n    //     return \"try again\";\n    // }\n}\n\n\n//# sourceURL=webpack://webpack-demo/./src/battleship.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nclass Gameboard {\n    constructor() {\n        this.twoDArray = Array.from({ length: 8 }, () => Array(8).fill(0));\n        //this.squareMatrix = Array.from({ length: numRows }, (_, i) => flatArray.slice(i * numCols, (i + 1) * numCols));\n    }\n\n\n    placeBoat(boat) {\n        const { angle, length, location } = boat;\n        const [row, col] = location;\n\n        if (angle === 'H') {\n            for (let i = 0; i < length; i++) {\n                if (col + i >= 8 || this.twoDArray[row][col + i] === 1) {\n                    return false;\n                }\n            }\n            for (let i = 0; i < length; i++) {\n                this.twoDArray[row][col + i] = 1;\n            }\n        } else if (angle === 'V') {\n            for (let i = 0; i < length; i++) {\n                if (row + i >= 8 || this.twoDArray[row + i][col] === 1) {\n                    return false;\n                }\n            }\n            for (let i = 0; i < length; i++) {\n                this.twoDArray[row + i][col] = 1;\n            }\n        }\n        return true;\n    }\n\n    recieveAttack(x) {\n        if (this.twoDArray[x[0]][x[1]] === 1) {\n            this.twoDArray[x[0]][x[1]] = \"X\"\n            return \"hit!\"\n        }\n        else if (this.twoDArray[x[0]][x[1]] === 0) {\n            return \"miss!\";\n        }\n\n\n    }\n    run() {\n        return 1;\n    }\n\n\n    findEngGame() {\n        const flattenedArray = this.twoDArray.flat(); // Flatten the 2D array\n        const countX = flattenedArray.filter(item => item === 'X').length;\n        return countX >= 6;\n    }\n}\n\n\n\n\n// console.log(table)\n// const board = new Gameboard();\n// board.placeBoat([0, 3]);\n\n\n\n//# sourceURL=webpack://webpack-demo/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sum */ \"./sum.js\");\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _battleship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./battleship.js */ \"./src/battleship.js\");\n\n\n\nconst board = new _gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nconst secondary = new _gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\nlet foo = (0,_sum__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(1, 2);\nconsole.log(foo)\ndocument.body.innerText = \"runn\"\nconsole.log(\"run\")\n\n\nclass Player {\n    constructor(x, y) {\n        this.playBoard = x;\n        this.attackBoard = y;\n        this.turn = null;\n        this.boats = []\n    }\n}\nclass ComputerPlayer {\n    constructor(gameboard) {\n        this.playerGameBoard = gameboard;\n        this.ships = [];\n        this.placeRandomShips();\n    }\n\n    placeRandomShips() {\n        const shipLengths = [2, 2, 3, 3, 4];\n\n        for (const length of shipLengths) {\n            let shipPlaced = false;\n            while (!shipPlaced) {\n                const randomLocation = this.generateRandomLocation(length);\n                const randomAngle = Math.random() < 0.5 ? 'H' : 'V';\n                const ship = new _battleship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](randomAngle, length, randomLocation);\n\n                if (this.playerGameBoard.placeBoat(ship)) { }\n            }\n        }\n    }\n\n    generateRandomLocation(length) {\n        const row = Math.floor(Math.random() * 8);\n        const col = Math.floor(Math.random() * (8 - length + 1));\n        return [row, col];\n    }\n\n    isShipOverlap(ship) {\n        const { angle, length, location } = ship;\n        const [row, col] = location;\n\n        for (let i = 0; i < length; i++) {\n            if (\n                (angle === 'H' && this.playerGameBoard.twoDArray[row][col + i] === 1) ||\n                (angle === 'V' && this.playerGameBoard.twoDArray[row + i][col] === 1)\n            ) {\n                return true; // Overlapping\n            }\n        }\n        return false; // Not overlapping\n    }\n}\n\n\nconst boat = new _battleship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"H\", 1, [[1, 2]]);\nconst computerPlayer = new ComputerPlayer(board);\nconst Player1 = new Player(board, secondary);\nconsole.log(boat, Player1)\n\n//# sourceURL=webpack://webpack-demo/./src/index.js?");

/***/ }),

/***/ "./sum.js":
/*!****************!*\
  !*** ./sum.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ sum)\n/* harmony export */ });\nfunction sum(a, b) {\n    return a + b;\n}\n\n//# sourceURL=webpack://webpack-demo/./sum.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;