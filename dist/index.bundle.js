/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/battleship.js":
/*!***************************!*\
  !*** ./src/battleship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var shipCount = {};
var Ship = /*#__PURE__*/function () {
  function Ship(angle, length, location) {
    _classCallCheck(this, Ship);
    this.length = length;
    this.name = this.createShipName(length);
    this.hp = length;
    this.sink = false;
    this.location = location;
    this.angle = angle;
  }
  _createClass(Ship, [{
    key: "shipHit",
    value: function shipHit() {
      this.hp--;
      if (this.hp <= 0) {
        this.shipSunk();
      }
    }
  }, {
    key: "shipSunk",
    value: function shipSunk() {
      this.sink = true;
    }
  }, {
    key: "createShipName",
    value: function createShipName(length) {
      if (length === 2) {
        return "Destroer";
      } else if (length === 3) {
        return "Submarine";
      } else if (length === 3) {
        return "cruister";
      } else {
        var count = shipCount[length] || 0;
        shipCount[length] = count + 1;
        return "Ship".concat(count);
      }
    }

    // assertLocation(coordinatesToCheck, callback) {
    //     let allPlaced = true;
    //     coordinatesToCheck.forEach(coord => {
    //         if (!callback.placeBoat(coord)) {
    //             allPlaced = false;
    //         }
    //     });

    //     if (allPlaced) {
    //         return coordinatesToCheck;
    //     }
    //     return "try again";
    // }
  }]);
  return Ship;
}();


/***/ }),

/***/ "./src/dragAndDrop.js":
/*!****************************!*\
  !*** ./src/dragAndDrop.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupDragAndDrop: () => (/* binding */ setupDragAndDrop)
/* harmony export */ });
/* harmony import */ var _battleship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./battleship.js */ "./src/battleship.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");


var player1 = new _gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
function disableShipDrag(x) {
  x.setAttribute("draggable", "false");
  x.classList.add("placed-ship");
}
function setupDragAndDrop() {
  var ships = document.querySelectorAll(".ship");
  var currentShip = null;
  var grid = document.getElementById("grid");
  ships.forEach(function (ship) {
    ship.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", "dragged");
      currentShip = ship;
    });
    ship.addEventListener("dragend", function () {
      currentShip = null;
    });
  });
  grid.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });
  grid.addEventListener("dragenter", function (e) {
    e.preventDefault();
  });
  grid.addEventListener("dragleave", function (e) {
    e.preventDefault();
  });
  grid.addEventListener("drop", function (e) {
    e.preventDefault();
    var shipLength = currentShip.getAttribute("data-length");
    var shipAngle = currentShip.getAttribute("data-angle");
    console.log(shipAngle, shipLength);
    if (e.dataTransfer.getData("text/plain") === "dragged" && shipLength) {
      var x = e.clientX - grid.getBoundingClientRect().left;
      var y = e.clientY - grid.getBoundingClientRect().top;
      var cellX = Math.floor(x / grid.offsetWidth * 8);
      var cellY = Math.floor(y / grid.offsetHeight * 8);
      var dragCoords = [cellY, cellX];

      // Create a new Ship and place it on the grid
      var newShip = new _battleship_js__WEBPACK_IMPORTED_MODULE_0__["default"](shipAngle, parseInt(shipLength), dragCoords);
      console.log(newShip);
      var boatPlaced = player1.placeBoat(newShip);
      if (boatPlaced) {
        disableShipDrag(currentShip);
        currentShip = null;
        e.target.classList.remove("drag-over");
      }
    }
  });
  return player1;
}

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _battleship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./battleship */ "./src/battleship.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    var _this = this;
    _classCallCheck(this, Gameboard);
    this.twoDArray = Array.from({
      length: 8
    }, function () {
      return Array(8).fill(0);
    });
    this.gridContainer = document.getElementById("grid");
    this.createGrid();
    this.addClickEventListeners();
    this.shipDestroyer = document.querySelector(".ship-destroyer");
    this.clickedCoordinates = []; // Array to store click event coordinates
    this.shipsPlaced = 0; // Keep track of the number of ships placed
    this.isFinishedPromise = new Promise(function (resolve) {
      _this.resolvePromise = resolve;
    });
    this.previousAttacks = new Set(); // Set to store previously attacked coordinates
  }
  _createClass(Gameboard, [{
    key: "createGrid",
    value: function createGrid() {
      for (var i = 0; i < 8; i++) {
        var row = this.gridContainer.insertRow(i);
        for (var j = 0; j < 8; j++) {
          var cell = row.insertCell(j);
          cell.classList.add("grid-item");
          cell.dataset.row = i;
          cell.dataset.column = j;
        }
      }
    }
  }, {
    key: "addClickEventListeners",
    value: function addClickEventListeners() {
      var _this2 = this;
      this.gridContainer.addEventListener('mouseup', function (event) {
        if (event.target.classList.contains('grid-item')) {
          var row = parseInt(event.target.dataset.row);
          var column = parseInt(event.target.dataset.column);
          var coordinates = [row, column];
          _this2.clickedCoordinates = coordinates; // Store coordinates in the array
          _this2.clickedCoordinates = coordinates;
          console.log('Selected Cell Coordinates:', coordinates, "this.clicked:", _this2.clickedCoordinates);
          if (_this2.twoDArray[row][column] === 1) {
            _this2.twoDArray[row][column] = "X";
            console.log("Hit!");
          } else {
            console.log("Miss!");
          }
        }
      });
    }
  }, {
    key: "placeBoat",
    value: function placeBoat(boat) {
      var shouldAddClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var angle = boat.angle,
        length = boat.length,
        location = boat.location;
      var _location = _slicedToArray(location, 2),
        row = _location[0],
        col = _location[1];
      if (angle === 'H') {
        for (var i = 0; i < length; i++) {
          if (col + i >= 8 || this.twoDArray[row][col + i] === 1) {
            return false;
          }
        }
        for (var _i = 0; _i < length; _i++) {
          this.twoDArray[row][col + _i] = 1;
          if (shouldAddClass) {
            var cell = this.gridContainer.rows[row].cells[col + _i];
            cell.classList.add('boat-cell'); // Add a CSS class to style the boat cell
          }
        }
      } else if (angle === 'V') {
        for (var _i2 = 0; _i2 < length; _i2++) {
          if (row + _i2 >= 8 || this.twoDArray[row + _i2][col] === 1) {
            return false;
          }
        }
        for (var _i3 = 0; _i3 < length; _i3++) {
          this.twoDArray[row + _i3][col] = 1;
          if (shouldAddClass) {
            var _cell = this.gridContainer.rows[row + _i3].cells[col];
            _cell.classList.add('boat-cell'); // Add a CSS class to style the boat cell
          }
        }
      }

      this.shipsPlaced++;
      if (this.shipsPlaced >= 3) {
        this.resolvePromise(); // Resolve the promise when the counter reaches 3
      }

      return true;
    }
  }, {
    key: "waitForFinish",
    value: function waitForFinish() {
      return this.isFinishedPromise;
    }
  }, {
    key: "allPlaced",
    value: function allPlaced() {
      this.shipsPlaced++;

      // Check if three ships have been placed
      if (this.shipsPlaced === 3) {
        // Resolve the promise
        return Promise.resolve(this);
      } else {
        // Return a pending promise
        return new Promise(function (resolve) {
          console.log(resolve, "doesntworks!");
        });
      }
    }
  }, {
    key: "recieveAttack",
    value: function recieveAttack(x) {
      if (this.twoDArray[x[0]][x[1]] === 1) {
        this.twoDArray[x[0]][x[1]] = "X";
        return "hit!";
      } else if (this.twoDArray[x[0]][x[1]] === 0) {
        return "miss!";
      }
    }
  }, {
    key: "run",
    value: function run() {
      return "this.clickedCoordinates";
    }
  }, {
    key: "findEngGame",
    value: function findEngGame() {
      var flattenedArray = this.twoDArray.flat(); // Flatten the 2D array
      var countX = flattenedArray.filter(function (item) {
        return item === 'X';
      }).length;
      return countX >= 6;
    }
  }, {
    key: "check",
    value: function check() {
      // Return the array of click event coordinates
      return this.clickedCoordinates;
    }
  }, {
    key: "placeRandomShips",
    value: function placeRandomShips() {
      var ships = [{
        type: 'Destroyer',
        length: 2
      }, {
        type: 'Submarine',
        length: 3
      }, {
        type: 'Cruiser',
        length: 4
      }];
      for (var _i4 = 0, _ships = ships; _i4 < _ships.length; _i4++) {
        var ship = _ships[_i4];
        var placed = false;
        while (!placed) {
          var row = Math.floor(Math.random() * 8);
          var col = Math.floor(Math.random() * 8);

          // Randomly choose orientation, ensuring it fits within the game board's boundaries
          var orientation = Math.random() < 0.5 && col + ship.length <= 8 ? 'H' : 'V';
          if (this.placeBoat(new _battleship__WEBPACK_IMPORTED_MODULE_0__["default"](orientation, ship.length, [row, col]), true)) {
            placed = true;
          }
        }
      }
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack() {
      // Function to generate a random coordinate [row, col] within the 8x8 grid
      var generateRandomCoordinate = function generateRandomCoordinate() {
        var row = Math.floor(Math.random() * 8);
        var col = Math.floor(Math.random() * 8);
        return [row, col];
      };
      var coordinate;
      do {
        coordinate = generateRandomCoordinate();
      } while (this.previousAttacks.has(coordinate)); // Ensure the coordinate hasn't been attacked before

      this.previousAttacks.add(coordinate);
      var _coordinate = coordinate,
        _coordinate2 = _slicedToArray(_coordinate, 2),
        row = _coordinate2[0],
        col = _coordinate2[1];
      if (this.twoDArray[row][col] === 1) {
        this.twoDArray[row][col] = "X";
        console.log("Hit!");
      } else {
        console.log("Miss!");
      }
    }
  }, {
    key: "receiveAttack1",
    value: function receiveAttack1() {
      var _this$clickedCoordina = _slicedToArray(this.clickedCoordinates, 2),
        row = _this$clickedCoordina[0],
        col = _this$clickedCoordina[1];
      if (this.twoDArray[row][col] === 1) {
        this.twoDArray[row][col] = "X";
        console.log("Hit!");
      } else {
        console.log("Miss!");
      }
    }
  }]);
  return Gameboard;
}();


/***/ }),

/***/ "./src/play-reset.js":
/*!***************************!*\
  !*** ./src/play-reset.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createButton)
/* harmony export */ });
function createButton(text, clickHandler) {
  var button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  document.getElementById("button-container").appendChild(button);
}

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _battleship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./battleship.js */ "./src/battleship.js");
/* harmony import */ var _dragAndDrop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dragAndDrop */ "./src/dragAndDrop.js");
/* harmony import */ var _play_reset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./play-reset */ "./src/play-reset.js");




var player1 = _dragAndDrop__WEBPACK_IMPORTED_MODULE_2__.setupDragAndDrop;
var shipsContainer = document.getElementById("ships-container");
var foo = (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_2__.setupDragAndDrop)();
shipsContainer.addEventListener("click", function (event) {
  var switchAngleElement = event.target.closest(".switch-angle");
  if (switchAngleElement) {
    var shipElement = switchAngleElement.closest(".ship");
    var currentDataAngle = switchAngleElement.getAttribute("data-angle");

    // Toggle between "H" and "V" for data-angle
    switchAngleElement.setAttribute("data-angle", currentDataAngle === "H" ? "V" : "H");
    switchAngleElement.textContent = currentDataAngle === "H" ? "V" : "H";
    shipElement.setAttribute("data-angle", currentDataAngle === "H" ? "V" : "H");
  }
  console.log(foo);
});
foo.waitForFinish().then(function () {
  console.log("Instance is finished¬¬!");
  (0,_play_reset__WEBPACK_IMPORTED_MODULE_3__["default"])("Play", function () {
    alert("Play button clicked");
    var computerPlay = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    computerPlay.placeRandomShips();
    console.log(computerPlay.twoDArray);
    foo.receiveAttack();
  });
  (0,_play_reset__WEBPACK_IMPORTED_MODULE_3__["default"])("Reset", function () {
    alert("Reset button clicked");
    // Add your reset logic here
  });
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztFQUNoRjtFQUNBbkcsT0FBTyxDQUFDQyxHQUFHLENBQUM4RixHQUFHLENBQUM7QUFFcEIsQ0FBQyxDQUFDO0FBR0ZBLEdBQUcsQ0FBQ2xDLGFBQWEsQ0FBQyxDQUFDLENBQUN1QyxJQUFJLENBQUMsWUFBTTtFQUMzQnBHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0VBQ3RDc0YsdURBQVksQ0FBQyxNQUFNLEVBQUUsWUFBWTtJQUM3QmMsS0FBSyxDQUFDLHFCQUFxQixDQUFDO0lBQzVCLElBQU1DLFlBQVksR0FBRyxJQUFJL0gscURBQVMsQ0FBRCxDQUFDO0lBQ2xDK0gsWUFBWSxDQUFDOUIsZ0JBQWdCLENBQUMsQ0FBQztJQUMvQnhFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDcUcsWUFBWSxDQUFDL0UsU0FBUyxDQUFDO0lBQ25Dd0UsR0FBRyxDQUFDaEIsYUFBYSxDQUFDLENBQUM7RUFDdkIsQ0FBQyxDQUFDO0VBRUZRLHVEQUFZLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDOUJjLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztJQUM3QjtFQUNKLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvYmF0dGxlc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kcmFnQW5kRHJvcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheS1yZXNldC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBzaGlwQ291bnQgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IoYW5nbGUsIGxlbmd0aCwgbG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY3JlYXRlU2hpcE5hbWUobGVuZ3RoKTtcbiAgICAgICAgdGhpcy5ocCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5zaW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgIH1cblxuICAgIHNoaXBIaXQoKSB7XG4gICAgICAgIHRoaXMuaHAtLTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5zaGlwU3VuaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hpcFN1bmsoKSB7XG4gICAgICAgIHRoaXMuc2luayA9IHRydWU7XG4gICAgfVxuXG4gICAgY3JlYXRlU2hpcE5hbWUobGVuZ3RoKSB7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkRlc3Ryb2VyXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJTdWJtYXJpbmVcIlxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIFwiY3J1aXN0ZXJcIlxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHNoaXBDb3VudFtsZW5ndGhdIHx8IDA7XG4gICAgICAgICAgICBzaGlwQ291bnRbbGVuZ3RoXSA9IGNvdW50ICsgMTtcbiAgICAgICAgICAgIHJldHVybiBgU2hpcCR7Y291bnR9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFzc2VydExvY2F0aW9uKGNvb3JkaW5hdGVzVG9DaGVjaywgY2FsbGJhY2spIHtcbiAgICAvLyAgICAgbGV0IGFsbFBsYWNlZCA9IHRydWU7XG4gICAgLy8gICAgIGNvb3JkaW5hdGVzVG9DaGVjay5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAvLyAgICAgICAgIGlmICghY2FsbGJhY2sucGxhY2VCb2F0KGNvb3JkKSkge1xuICAgIC8vICAgICAgICAgICAgIGFsbFBsYWNlZCA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcblxuICAgIC8vICAgICBpZiAoYWxsUGxhY2VkKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNUb0NoZWNrO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiBcInRyeSBhZ2FpblwiO1xuICAgIC8vIH1cbn1cbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL2JhdHRsZXNoaXAuanNcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5jb25zdCBwbGF5ZXIxID0gbmV3IEdhbWVib2FyZCgpO1xuZnVuY3Rpb24gZGlzYWJsZVNoaXBEcmFnKHgpIHtcbiAgICB4LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcImZhbHNlXCIpO1xuICAgIHguY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cERyYWdBbmREcm9wKCkge1xuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuICAgIGxldCBjdXJyZW50U2hpcCA9IG51bGw7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpZFwiKTtcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBcImRyYWdnZWRcIik7XG4gICAgICAgICAgICBjdXJyZW50U2hpcCA9IHNoaXA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudFNoaXAgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibW92ZVwiO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IGN1cnJlbnRTaGlwLmdldEF0dHJpYnV0ZShcImRhdGEtbGVuZ3RoXCIpO1xuICAgICAgICBjb25zdCBzaGlwQW5nbGUgPSBjdXJyZW50U2hpcC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFuZ2xlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwQW5nbGUsIHNoaXBMZW5ndGgpO1xuICAgICAgICBpZiAoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIikgPT09IFwiZHJhZ2dlZFwiICYmIHNoaXBMZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBncmlkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gZ3JpZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgICAgICAgIGNvbnN0IGNlbGxYID0gTWF0aC5mbG9vcigoeCAvIGdyaWQub2Zmc2V0V2lkdGgpICogOCk7XG4gICAgICAgICAgICBjb25zdCBjZWxsWSA9IE1hdGguZmxvb3IoKHkgLyBncmlkLm9mZnNldEhlaWdodCkgKiA4KTtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdDb29yZHMgPSBbY2VsbFksIGNlbGxYXTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IFNoaXAgYW5kIHBsYWNlIGl0IG9uIHRoZSBncmlkXG4gICAgICAgICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoc2hpcEFuZ2xlLCBwYXJzZUludChzaGlwTGVuZ3RoKSwgZHJhZ0Nvb3Jkcyk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1NoaXApO1xuXG4gICAgICAgICAgICBjb25zdCBib2F0UGxhY2VkID0gcGxheWVyMS5wbGFjZUJvYXQobmV3U2hpcCk7XG4gICAgICAgICAgICBpZiAoYm9hdFBsYWNlZCkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVTaGlwRHJhZyhjdXJyZW50U2hpcCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFNoaXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnLW92ZXJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBsYXllcjFcbn1cbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50d29EQXJyYXkgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA4IH0sICgpID0+IEFycmF5KDgpLmZpbGwoMCkpO1xuICAgICAgICB0aGlzLmdyaWRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWRcIik7XG4gICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5zaGlwRGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWRlc3Ryb3llclwiKTtcbiAgICAgICAgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMgPSBbXTsgLy8gQXJyYXkgdG8gc3RvcmUgY2xpY2sgZXZlbnQgY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCA9IDA7IC8vIEtlZXAgdHJhY2sgb2YgdGhlIG51bWJlciBvZiBzaGlwcyBwbGFjZWRcbiAgICAgICAgdGhpcy5pc0ZpbmlzaGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzID0gbmV3IFNldCgpOyAvLyBTZXQgdG8gc3RvcmUgcHJldmlvdXNseSBhdHRhY2tlZCBjb29yZGluYXRlc1xuICAgIH1cbiAgICBjcmVhdGVHcmlkKCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5ncmlkQ29udGFpbmVyLmluc2VydFJvdyhpKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSByb3cuaW5zZXJ0Q2VsbChqKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWl0ZW1cIilcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5yb3cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbcm93LCBjb2x1bW5dO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMgPSBjb29yZGluYXRlczsgLy8gU3RvcmUgY29vcmRpbmF0ZXMgaW4gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2VsZWN0ZWQgQ2VsbCBDb29yZGluYXRlczonLCBjb29yZGluYXRlcywgXCJ0aGlzLmNsaWNrZWQ6XCIsIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR3b0RBcnJheVtyb3ddW2NvbHVtbl0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2x1bW5dID0gXCJYXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGl0IVwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pc3MhXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYWNlQm9hdChib2F0LCBzaG91bGRBZGRDbGFzcyA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBhbmdsZSwgbGVuZ3RoLCBsb2NhdGlvbiB9ID0gYm9hdDtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IGxvY2F0aW9uO1xuXG4gICAgICAgIGlmIChhbmdsZSA9PT0gJ0gnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbCArIGkgPj0gOCB8fCB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbCArIGldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2wgKyBpXSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEFkZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWRDb250YWluZXIucm93c1tyb3ddLmNlbGxzW2NvbCArIGldO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXQtY2VsbCcpOyAvLyBBZGQgYSBDU1MgY2xhc3MgdG8gc3R5bGUgdGhlIGJvYXQgY2VsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gJ1YnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdyArIGkgPj0gOCB8fCB0aGlzLnR3b0RBcnJheVtyb3cgKyBpXVtjb2xdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93ICsgaV1bY29sXSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEFkZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWRDb250YWluZXIucm93c1tyb3cgKyBpXS5jZWxsc1tjb2xdO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXQtY2VsbCcpOyAvLyBBZGQgYSBDU1MgY2xhc3MgdG8gc3R5bGUgdGhlIGJvYXQgY2VsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkKytcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNQbGFjZWQgPj0gMykge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZSgpOyAvLyBSZXNvbHZlIHRoZSBwcm9taXNlIHdoZW4gdGhlIGNvdW50ZXIgcmVhY2hlcyAzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgd2FpdEZvckZpbmlzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGaW5pc2hlZFByb21pc2U7XG4gICAgfVxuICAgIGFsbFBsYWNlZCgpIHtcbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCsrO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRocmVlIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWRcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNQbGFjZWQgPT09IDMpIHtcbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIHByb21pc2VcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gYSBwZW5kaW5nIHByb21pc2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc29sdmUsIFwiZG9lc250d29ya3MhXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICByZWNpZXZlQXR0YWNrKHgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3hbMF1dW3hbMV1dID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnR3b0RBcnJheVt4WzBdXVt4WzFdXSA9IFwiWFwiXG4gICAgICAgICAgICByZXR1cm4gXCJoaXQhXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnR3b0RBcnJheVt4WzBdXVt4WzFdXSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwibWlzcyFcIjtcbiAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgcnVuKCkge1xuICAgICAgICByZXR1cm4gXCJ0aGlzLmNsaWNrZWRDb29yZGluYXRlc1wiO1xuICAgIH1cblxuXG4gICAgZmluZEVuZ0dhbWUoKSB7XG4gICAgICAgIGNvbnN0IGZsYXR0ZW5lZEFycmF5ID0gdGhpcy50d29EQXJyYXkuZmxhdCgpOyAvLyBGbGF0dGVuIHRoZSAyRCBhcnJheVxuICAgICAgICBjb25zdCBjb3VudFggPSBmbGF0dGVuZWRBcnJheS5maWx0ZXIoaXRlbSA9PiBpdGVtID09PSAnWCcpLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGNvdW50WCA+PSA2O1xuICAgIH1cblxuICAgIGNoZWNrKCkge1xuICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNsaWNrIGV2ZW50IGNvb3JkaW5hdGVzXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICB9XG5cbiAgICBwbGFjZVJhbmRvbVNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHsgdHlwZTogJ0Rlc3Ryb3llcicsIGxlbmd0aDogMiB9LFxuICAgICAgICAgICAgeyB0eXBlOiAnU3VibWFyaW5lJywgbGVuZ3RoOiAzIH0sXG4gICAgICAgICAgICB7IHR5cGU6ICdDcnVpc2VyJywgbGVuZ3RoOiA0IH1cbiAgICAgICAgXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcblxuICAgICAgICAgICAgICAgIC8vIFJhbmRvbWx5IGNob29zZSBvcmllbnRhdGlvbiwgZW5zdXJpbmcgaXQgZml0cyB3aXRoaW4gdGhlIGdhbWUgYm9hcmQncyBib3VuZGFyaWVzXG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ICYmIGNvbCArIHNoaXAubGVuZ3RoIDw9IDggPyAnSCcgOiAnVic7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGFjZUJvYXQobmV3IFNoaXAob3JpZW50YXRpb24sIHNoaXAubGVuZ3RoLCBbcm93LCBjb2xdKSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soKSB7XG4gICAgICAgIC8vIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgcmFuZG9tIGNvb3JkaW5hdGUgW3JvdywgY29sXSB3aXRoaW4gdGhlIDh4OCBncmlkXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgY29vcmRpbmF0ZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICB9IHdoaWxlICh0aGlzLnByZXZpb3VzQXR0YWNrcy5oYXMoY29vcmRpbmF0ZSkpOyAvLyBFbnN1cmUgdGhlIGNvb3JkaW5hdGUgaGFzbid0IGJlZW4gYXR0YWNrZWQgYmVmb3JlXG5cbiAgICAgICAgdGhpcy5wcmV2aW91c0F0dGFja3MuYWRkKGNvb3JkaW5hdGUpO1xuXG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlO1xuICAgICAgICBpZiAodGhpcy50d29EQXJyYXlbcm93XVtjb2xdID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPSBcIlhcIjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGl0IVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWlzcyFcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjZWl2ZUF0dGFjazEoKSB7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhpdCFcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pc3MhXCIpO1xuICAgICAgICB9XG5cbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHRleHQsIGNsaWNrSGFuZGxlcikge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b24tY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKGJ1dHRvbik7XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL2JhdHRsZXNoaXAuanNcIjtcbmltcG9ydCB7IHNldHVwRHJhZ0FuZERyb3AgfSBmcm9tICcuL2RyYWdBbmREcm9wJztcbmltcG9ydCBjcmVhdGVCdXR0b24gZnJvbSAnLi9wbGF5LXJlc2V0JztcblxuY29uc3QgcGxheWVyMSA9IHNldHVwRHJhZ0FuZERyb3BcbmNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwcy1jb250YWluZXJcIik7XG5jb25zdCBmb28gPSBzZXR1cERyYWdBbmREcm9wKCk7XG5cbnNoaXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBzd2l0Y2hBbmdsZUVsZW1lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5zd2l0Y2gtYW5nbGVcIik7XG5cbiAgICBpZiAoc3dpdGNoQW5nbGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHNoaXBFbGVtZW50ID0gc3dpdGNoQW5nbGVFbGVtZW50LmNsb3Nlc3QoXCIuc2hpcFwiKTtcbiAgICAgICAgY29uc3QgY3VycmVudERhdGFBbmdsZSA9IHN3aXRjaEFuZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFuZ2xlXCIpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBiZXR3ZWVuIFwiSFwiIGFuZCBcIlZcIiBmb3IgZGF0YS1hbmdsZVxuICAgICAgICBzd2l0Y2hBbmdsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiLCBjdXJyZW50RGF0YUFuZ2xlID09PSBcIkhcIiA/IFwiVlwiIDogXCJIXCIpO1xuICAgICAgICBzd2l0Y2hBbmdsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50RGF0YUFuZ2xlID09PSBcIkhcIiA/IFwiVlwiIDogXCJIXCI7XG5cbiAgICAgICAgc2hpcEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiLCBjdXJyZW50RGF0YUFuZ2xlID09PSBcIkhcIiA/IFwiVlwiIDogXCJIXCIpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhmb28pXG5cbn0pO1xuXG5cbmZvby53YWl0Rm9yRmluaXNoKCkudGhlbigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJJbnN0YW5jZSBpcyBmaW5pc2hlZMKswqwhXCIpO1xuICAgIGNyZWF0ZUJ1dHRvbihcIlBsYXlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBhbGVydChcIlBsYXkgYnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICAgIGNvbnN0IGNvbXB1dGVyUGxheSA9IG5ldyBHYW1lYm9hcmRcbiAgICAgICAgY29tcHV0ZXJQbGF5LnBsYWNlUmFuZG9tU2hpcHMoKTtcbiAgICAgICAgY29uc29sZS5sb2coY29tcHV0ZXJQbGF5LnR3b0RBcnJheSlcbiAgICAgICAgZm9vLnJlY2VpdmVBdHRhY2soKTtcbiAgICB9KTtcblxuICAgIGNyZWF0ZUJ1dHRvbihcIlJlc2V0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWxlcnQoXCJSZXNldCBidXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgLy8gQWRkIHlvdXIgcmVzZXQgbG9naWMgaGVyZVxuICAgIH0pO1xufSk7Il0sIm5hbWVzIjpbInNoaXBDb3VudCIsIlNoaXAiLCJhbmdsZSIsImxlbmd0aCIsImxvY2F0aW9uIiwiX2NsYXNzQ2FsbENoZWNrIiwibmFtZSIsImNyZWF0ZVNoaXBOYW1lIiwiaHAiLCJzaW5rIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJzaGlwSGl0Iiwic2hpcFN1bmsiLCJjb3VudCIsImNvbmNhdCIsImRlZmF1bHQiLCJHYW1lYm9hcmQiLCJwbGF5ZXIxIiwiZGlzYWJsZVNoaXBEcmFnIiwieCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsInNldHVwRHJhZ0FuZERyb3AiLCJzaGlwcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImN1cnJlbnRTaGlwIiwiZ3JpZCIsImdldEVsZW1lbnRCeUlkIiwiZm9yRWFjaCIsInNoaXAiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3BFZmZlY3QiLCJzaGlwTGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2hpcEFuZ2xlIiwiY29uc29sZSIsImxvZyIsImdldERhdGEiLCJjbGllbnRYIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInkiLCJjbGllbnRZIiwidG9wIiwiY2VsbFgiLCJNYXRoIiwiZmxvb3IiLCJvZmZzZXRXaWR0aCIsImNlbGxZIiwib2Zmc2V0SGVpZ2h0IiwiZHJhZ0Nvb3JkcyIsIm5ld1NoaXAiLCJwYXJzZUludCIsImJvYXRQbGFjZWQiLCJwbGFjZUJvYXQiLCJ0YXJnZXQiLCJyZW1vdmUiLCJfdGhpcyIsInR3b0RBcnJheSIsIkFycmF5IiwiZnJvbSIsImZpbGwiLCJncmlkQ29udGFpbmVyIiwiY3JlYXRlR3JpZCIsImFkZENsaWNrRXZlbnRMaXN0ZW5lcnMiLCJzaGlwRGVzdHJveWVyIiwicXVlcnlTZWxlY3RvciIsImNsaWNrZWRDb29yZGluYXRlcyIsInNoaXBzUGxhY2VkIiwiaXNGaW5pc2hlZFByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlc29sdmVQcm9taXNlIiwicHJldmlvdXNBdHRhY2tzIiwiU2V0IiwiaSIsInJvdyIsImluc2VydFJvdyIsImoiLCJjZWxsIiwiaW5zZXJ0Q2VsbCIsImRhdGFzZXQiLCJjb2x1bW4iLCJfdGhpczIiLCJldmVudCIsImNvbnRhaW5zIiwiY29vcmRpbmF0ZXMiLCJib2F0Iiwic2hvdWxkQWRkQ2xhc3MiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJfbG9jYXRpb24iLCJfc2xpY2VkVG9BcnJheSIsImNvbCIsInJvd3MiLCJjZWxscyIsIndhaXRGb3JGaW5pc2giLCJhbGxQbGFjZWQiLCJyZWNpZXZlQXR0YWNrIiwicnVuIiwiZmluZEVuZ0dhbWUiLCJmbGF0dGVuZWRBcnJheSIsImZsYXQiLCJjb3VudFgiLCJmaWx0ZXIiLCJpdGVtIiwiY2hlY2siLCJwbGFjZVJhbmRvbVNoaXBzIiwidHlwZSIsIl9pNCIsIl9zaGlwcyIsInBsYWNlZCIsInJhbmRvbSIsIm9yaWVudGF0aW9uIiwicmVjZWl2ZUF0dGFjayIsImdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSIsImNvb3JkaW5hdGUiLCJoYXMiLCJfY29vcmRpbmF0ZSIsIl9jb29yZGluYXRlMiIsInJlY2VpdmVBdHRhY2sxIiwiX3RoaXMkY2xpY2tlZENvb3JkaW5hIiwiY3JlYXRlQnV0dG9uIiwidGV4dCIsImNsaWNrSGFuZGxlciIsImJ1dHRvbiIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwic2hpcHNDb250YWluZXIiLCJmb28iLCJzd2l0Y2hBbmdsZUVsZW1lbnQiLCJjbG9zZXN0Iiwic2hpcEVsZW1lbnQiLCJjdXJyZW50RGF0YUFuZ2xlIiwidGhlbiIsImFsZXJ0IiwiY29tcHV0ZXJQbGF5Il0sInNvdXJjZVJvb3QiOiIifQ==