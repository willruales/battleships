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


function disableShipDrag(x) {
  x.setAttribute("draggable", "false");
  x.classList.add("placed-ship");
}
function setupDragAndDrop() {
  var player1 = new _gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"]("user");
  // player1.receiveRandomAttack = function () {

  //     const generateRandomCoordinate = () => {
  //         const row = Math.floor(Math.random() * 8);
  //         const col = Math.floor(Math.random() * 8);
  //         return [row, col];
  //     };

  //     let coordinate;
  //     do {
  //         coordinate = generateRandomCoordinate();
  //     } while (this.previousAttacks.has(coordinate)); // Ensure the coordinate hasn't been attacked before

  //     this.previousAttacks.add(coordinate);

  //     // const [row, col] = coordinate;
  //     // if (this.twoDArray[row][col] === 1) {
  //     //     this.twoDArray[row][col] = "X";
  //     //     console.log("Hit!! drag");
  //     // } else {
  //     //     console.log("Miss!! drop");
  //     // }

  // };
  function resetDragAndDrop() {
    var ships = document.querySelectorAll(".placed-ship");
    ships.forEach(function (ship) {
      ship.setAttribute("draggable", "true");
      ship.classList.remove("placed-ship");
    });
  }
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
    // console.log(shipAngle, shipLength);
    if (e.dataTransfer.getData("text/plain") === "dragged" && shipLength) {
      var x = e.clientX - grid.getBoundingClientRect().left;
      var y = e.clientY - grid.getBoundingClientRect().top;
      var cellX = Math.floor(x / grid.offsetWidth * 8);
      var cellY = Math.floor(y / grid.offsetHeight * 8);
      var dragCoords = [cellY, cellX];

      // Create a new Ship and place it on the grid
      var newShip = new _battleship_js__WEBPACK_IMPORTED_MODULE_0__["default"](shipAngle, parseInt(shipLength), dragCoords);

      // console.log(newShip);

      var boatPlaced = player1.placeBoat(newShip);
      if (boatPlaced) {
        disableShipDrag(currentShip);
        currentShip = null;
        e.target.classList.remove("drag-over");
      }
    }
  });
  return {
    player: player1,
    resetDragAndDrop: resetDragAndDrop
  };
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
  function Gameboard(playerType) {
    var _this = this;
    _classCallCheck(this, Gameboard);
    this.playerType = playerType;
    this.twoDArray = Array.from({
      length: 8
    }, function () {
      return Array(8).fill(0);
    });
    this.table = document.createElement('table');
    this.gridContainer = document.getElementById("grid");
    this.createGrid();
    this.shipDestroyer = document.querySelector(".ship-destroyer");
    this.clickedCoordinates = [];
    this.shipsPlaced = 0; // Keep track of the number of ships placed
    this.isFinishedPromise = new Promise(function (resolve) {
      _this.resolvePromise = resolve;
    });
    this.previousAttacks = new Set(); // Set to store previously attacked coordinates
    // if (this.playerType === 'computer') {
    //     this.addClickEventListeners();
    // }
  }
  _createClass(Gameboard, [{
    key: "createGrid",
    value: function createGrid() {
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
      this.table.classList.add('computerBoard');
      this.gridContainer.appendChild(this.table);
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      // Implement logic to reset the game board and any other necessary state
      this.twoDArray = Array.from({
        length: 8
      }, function () {
        return Array(8).fill(0);
      });
      this.shipsPlaced = 0;
      this.clearGrid();
      this.table.classList.remove('computerBoard');

      // this.createGrid();
      // Additional reset logic as needed
    }
  }, {
    key: "clearGrid",
    value: function clearGrid() {
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
  }, {
    key: "addClickEventListeners",
    value: function addClickEventListeners() {
      var _this2 = this;
      this.table.addEventListener('mouseup', function (event) {
        if (event.target.classList.contains('grid-item')) {
          var row = parseInt(event.target.dataset.row);
          var column = parseInt(event.target.dataset.column);
          _this2.clickedCoordinates = [row, column];
          console.log('Selected Cell Coordinates:', _this2.clickedCoordinates);
          _this2.receiveAttack1();
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
            var cell = this.table.querySelector("[data-row=\"".concat(row, "\"][data-column=\"").concat(col + _i, "\"]"));
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
            var _cell = this.table.querySelector("[data-row=\"".concat(row + _i3, "\"][data-column=\"").concat(col, "\"]"));
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
    key: "run",
    value: function run() {
      return new Promise(function (resolve) {
        console.log("2nd promise"), resolve("as");
      });
    }
  }, {
    key: "foo",
    value: function foo() {
      return new Promise(function (resolve) {
        console.log("3rd promise"), resolve("as");
      });
    }
  }, {
    key: "checkEndGame",
    value: function checkEndGame() {
      var flattenedArray = this.twoDArray.flat(); // Flatten the 2D array
      var countX = flattenedArray.filter(function (item) {
        return item === 'X';
      }).length;
      if (countX >= 2) {
        if (confirm("".concat(this.playerType, " wins! Play again?"))) {
          this.table.removeChild(this.table.firstChild);
          var ships = document.querySelectorAll(".placed-ship");
          ships.forEach(function (ship) {
            ship.setAttribute("draggable", "true");
            ship.classList.remove("placed-ship");
          });
          return true;
        }
      } else {
        // Do nothing!
        console.log('game does nothing');
      }
    }
  }, {
    key: "check",
    value: function check() {
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
          var orientation = Math.random() < 0.5 && col + ship.length <= 8 ? 'H' : 'V';
          if (this.placeBoat(new _battleship__WEBPACK_IMPORTED_MODULE_0__["default"](orientation, ship.length, [row, col]), false)) {
            placed = true;
          }
        }
      }
    }
  }, {
    key: "receiveRandomAttack",
    value: function receiveRandomAttack() {
      var _this3 = this;
      return new Promise(function (resolve) {
        var generateRandomCoordinate = function generateRandomCoordinate() {
          var row = Math.floor(Math.random() * 8);
          var col = Math.floor(Math.random() * 8);
          return [row, col];
        };

        // Corrected: Call generateRandomCoordinate to get the actual coordinates
        var _generateRandomCoordi = generateRandomCoordinate(),
          _generateRandomCoordi2 = _slicedToArray(_generateRandomCoordi, 2),
          row = _generateRandomCoordi2[0],
          col = _generateRandomCoordi2[1];
        var cell = _this3.table.querySelector("[data-row=\"".concat(row, "\"][data-column=\"").concat(col, "\"]"));

        // Corrected: Use toString() on the coordinates array
        var coordinatesString = "".concat(row, ",").concat(col);
        if (_this3.previousAttacks.has(coordinatesString)) {
          console.log("Already attacked these coordinates!");
          return;
        }
        if (_this3.twoDArray[row][col] === 1) {
          _this3.twoDArray[row][col] = "X";
          cell.style.background = "black", console.log("Computer makes a Hit!!", _this3.twoDArray);
          resolve(_this3.checkEndGame());
        } else {
          console.log("Computer makes a Miss!!", _this3.twoDArray);
          cell.style.background = "blue";
          resolve();
        }

        // console.log(this.previousAttacks);
        _this3.previousAttacks.add(coordinatesString);
      });
    }
  }, {
    key: "receiveAttack1",
    value: function receiveAttack1() {
      var _this4 = this;
      var _this$clickedCoordina = _slicedToArray(this.clickedCoordinates, 2),
        row = _this$clickedCoordina[0],
        col = _this$clickedCoordina[1];
      var cell = this.table.querySelector("[data-row=\"".concat(row, "\"][data-column=\"").concat(col, "\"]"));
      var coordinatesString = "".concat(row, ",").concat(col);
      console.log(this.clickedCoordinates);
      return new Promise(function (resolve, reject) {
        if (_this4.previousAttacks.has(coordinatesString)) {
          reject("Already attacked these coordinates!");
          return;
        } else {
          if (_this4.twoDArray[row][col] === 1) {
            _this4.twoDArray[row][col] = "X";
            console.log("Player makes a Hit!!!", _this4.twoDArray), cell.style.background = "black";
            resolve(_this4.checkEndGame(), "<-look");
          } else {
            console.log("Player makes a Miss!!!", _this4.twoDArray);
            cell.style.background = "blue";
            resolve();
          }
          _this4.previousAttacks.add(coordinatesString);

          //resolve("playermakes a move")
        }
      });
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
/* harmony import */ var _dragAndDrop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dragAndDrop */ "./src/dragAndDrop.js");
/* harmony import */ var _play_reset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./play-reset */ "./src/play-reset.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var gameSetup = (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_1__.setupDragAndDrop)();
var player1 = gameSetup.player;
var firstTrueResult = null;

//const player1 = setupDragAndDrop();
var grid = document.getElementById("grid");
var computerPlayer;
var shipsContainer = document.getElementById("ships-container");
//const allShips = setupDragAndDrop();

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
  console.log(player1);
});
console.log(player1);
function foobar() {
  return _foobar.apply(this, arguments);
}
function _foobar() {
  _foobar = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve) {
              var handleMouseUp;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    handleMouseUp = /*#__PURE__*/function () {
                      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
                        var row, column, result, result2;
                        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                          while (1) switch (_context2.prev = _context2.next) {
                            case 0:
                              if (!event.target.classList.contains('grid-item')) {
                                _context2.next = 21;
                                break;
                              }
                              row = parseInt(event.target.dataset.row);
                              column = parseInt(event.target.dataset.column);
                              computerPlayer.clickedCoordinates = [row, column];
                              _context2.prev = 4;
                              _context2.next = 7;
                              return computerPlayer.receiveAttack1();
                            case 7:
                              result = _context2.sent;
                              _context2.next = 10;
                              return player1.receiveRandomAttack();
                            case 10:
                              result2 = _context2.sent;
                              console.log(result);
                              console.log(result2);

                              // Find the first result that is true
                              firstTrueResult = result === true ? 'result' : result2 === true ? 'result2' : null;
                              if (firstTrueResult !== null) {
                                console.log("First function that returned true:", firstTrueResult);
                              } else {
                                console.log("Neither function returned true");
                              }
                              _context2.next = 20;
                              break;
                            case 17:
                              _context2.prev = 17;
                              _context2.t0 = _context2["catch"](4);
                              console.error("Error:", _context2.t0);
                            case 20:
                              resolve();
                            case 21:
                            case "end":
                              return _context2.stop();
                          }
                        }, _callee2, null, [[4, 17]]);
                      }));
                      return function handleMouseUp(_x3) {
                        return _ref3.apply(this, arguments);
                      };
                    }();
                    computerPlayer.table.addEventListener('mouseup', handleMouseUp);
                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _foobar.apply(this, arguments);
}
player1.waitForFinish().then(function () {
  console.log("Instance is finished!");
  computerPlayer = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"]("computer");
  computerPlayer.placeRandomShips();
  (0,_play_reset__WEBPACK_IMPORTED_MODULE_2__["default"])("Play", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  (0,_play_reset__WEBPACK_IMPORTED_MODULE_2__["default"])("Reset", function () {
    alert("Reset button clicked");
    computerPlayer.resetGame();
    player1.resetGame();
    player1.clearGrid();
  });

  // Start the asynchronous operations in foobar
  return foobar();
})["catch"](function (error) {
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TyxFQUFFLFlBQVk7SUFDOUI4SSxLQUFLLENBQUMsc0JBQXNCLENBQUM7SUFDN0I5QixjQUFjLENBQUNuSyxTQUFTLENBQUMsQ0FBQztJQUMxQnJFLE9BQU8sQ0FBQ3FFLFNBQVMsQ0FBQyxDQUFDO0lBRW5CckUsT0FBTyxDQUFDc0UsU0FBUyxDQUFDLENBQUM7RUFDdkIsQ0FBQyxDQUFDOztFQUVGO0VBQ0EsT0FBT3dLLE1BQU0sQ0FBQyxDQUFDO0FBQ25CLENBQUMsQ0FBQyxTQUFNLENBQUMsVUFBQWYsS0FBSyxFQUFJO0VBQ2RsSixPQUFPLENBQUNrSixLQUFLLENBQUMsb0JBQW9CLEVBQUVBLEtBQUssQ0FBQztBQUM5QyxDQUFDLENBQUM7O0FBR0Y7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9iYXR0bGVzaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2RyYWdBbmREcm9wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5LXJlc2V0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHNoaXBDb3VudCA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihhbmdsZSwgbGVuZ3RoLCBsb2NhdGlvbikge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jcmVhdGVTaGlwTmFtZShsZW5ndGgpO1xuICAgICAgICB0aGlzLmhwID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLnNpbmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgfVxuXG4gICAgc2hpcEhpdCgpIHtcbiAgICAgICAgdGhpcy5ocC0tO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBTdW5rKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaGlwU3VuaygpIHtcbiAgICAgICAgdGhpcy5zaW5rID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjcmVhdGVTaGlwTmFtZShsZW5ndGgpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIFwiRGVzdHJvZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlN1Ym1hcmluZVwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJjcnVpc3RlclwiXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gc2hpcENvdW50W2xlbmd0aF0gfHwgMDtcbiAgICAgICAgICAgIHNoaXBDb3VudFtsZW5ndGhdID0gY291bnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIGBTaGlwJHtjb3VudH1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYXNzZXJ0TG9jYXRpb24oY29vcmRpbmF0ZXNUb0NoZWNrLCBjYWxsYmFjaykge1xuICAgIC8vICAgICBsZXQgYWxsUGxhY2VkID0gdHJ1ZTtcbiAgICAvLyAgICAgY29vcmRpbmF0ZXNUb0NoZWNrLmZvckVhY2goY29vcmQgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKCFjYWxsYmFjay5wbGFjZUJvYXQoY29vcmQpKSB7XG4gICAgLy8gICAgICAgICAgICAgYWxsUGxhY2VkID0gZmFsc2U7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuXG4gICAgLy8gICAgIGlmIChhbGxQbGFjZWQpIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBjb29yZGluYXRlc1RvQ2hlY2s7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgcmV0dXJuIFwidHJ5IGFnYWluXCI7XG4gICAgLy8gfVxufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vYmF0dGxlc2hpcC5qc1wiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmZ1bmN0aW9uIGRpc2FibGVTaGlwRHJhZyh4KSB7XG4gICAgeC5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJmYWxzZVwiKTtcbiAgICB4LmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBEcmFnQW5kRHJvcCgpIHtcbiAgICBjb25zdCBwbGF5ZXIxID0gbmV3IEdhbWVib2FyZChcInVzZXJcIik7XG4gICAgLy8gcGxheWVyMS5yZWNlaXZlUmFuZG9tQXR0YWNrID0gZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSA9ICgpID0+IHtcbiAgICAvLyAgICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIC8vICAgICAgICAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgLy8gICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgICAvLyAgICAgfTtcblxuICAgIC8vICAgICBsZXQgY29vcmRpbmF0ZTtcbiAgICAvLyAgICAgZG8ge1xuICAgIC8vICAgICAgICAgY29vcmRpbmF0ZSA9IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgIC8vICAgICB9IHdoaWxlICh0aGlzLnByZXZpb3VzQXR0YWNrcy5oYXMoY29vcmRpbmF0ZSkpOyAvLyBFbnN1cmUgdGhlIGNvb3JkaW5hdGUgaGFzbid0IGJlZW4gYXR0YWNrZWQgYmVmb3JlXG5cbiAgICAvLyAgICAgdGhpcy5wcmV2aW91c0F0dGFja3MuYWRkKGNvb3JkaW5hdGUpO1xuXG4gICAgLy8gICAgIC8vIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlO1xuICAgIC8vICAgICAvLyBpZiAodGhpcy50d29EQXJyYXlbcm93XVtjb2xdID09PSAxKSB7XG4gICAgLy8gICAgIC8vICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPSBcIlhcIjtcbiAgICAvLyAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiSGl0ISEgZHJhZ1wiKTtcbiAgICAvLyAgICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTWlzcyEhIGRyb3BcIik7XG4gICAgLy8gICAgIC8vIH1cblxuXG5cblxuXG5cblxuICAgIC8vIH07XG4gICAgZnVuY3Rpb24gcmVzZXREcmFnQW5kRHJvcCgpIHtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlZC1zaGlwXCIpO1xuXG4gICAgICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgICAgIHNoaXAuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInBsYWNlZC1zaGlwXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XG4gICAgbGV0IGN1cnJlbnRTaGlwID0gbnVsbDtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkXCIpO1xuXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIFwiZHJhZ2dlZFwiKTtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gc2hpcDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50U2hpcCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJtb3ZlXCI7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gY3VycmVudFNoaXAuZ2V0QXR0cmlidXRlKFwiZGF0YS1sZW5ndGhcIik7XG4gICAgICAgIGNvbnN0IHNoaXBBbmdsZSA9IGN1cnJlbnRTaGlwLmdldEF0dHJpYnV0ZShcImRhdGEtYW5nbGVcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNoaXBBbmdsZSwgc2hpcExlbmd0aCk7XG4gICAgICAgIGlmIChlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9wbGFpblwiKSA9PT0gXCJkcmFnZ2VkXCIgJiYgc2hpcExlbmd0aCkge1xuXG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gZ3JpZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGdyaWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICAgICAgICBjb25zdCBjZWxsWCA9IE1hdGguZmxvb3IoKHggLyBncmlkLm9mZnNldFdpZHRoKSAqIDgpO1xuICAgICAgICAgICAgY29uc3QgY2VsbFkgPSBNYXRoLmZsb29yKCh5IC8gZ3JpZC5vZmZzZXRIZWlnaHQpICogOCk7XG4gICAgICAgICAgICBjb25zdCBkcmFnQ29vcmRzID0gW2NlbGxZLCBjZWxsWF07XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBTaGlwIGFuZCBwbGFjZSBpdCBvbiB0aGUgZ3JpZFxuICAgICAgICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwKHNoaXBBbmdsZSwgcGFyc2VJbnQoc2hpcExlbmd0aCksIGRyYWdDb29yZHMpO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdTaGlwKTtcblxuICAgICAgICAgICAgY29uc3QgYm9hdFBsYWNlZCA9IHBsYXllcjEucGxhY2VCb2F0KG5ld1NoaXApO1xuICAgICAgICAgICAgaWYgKGJvYXRQbGFjZWQpIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlU2hpcERyYWcoY3VycmVudFNoaXApO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gbnVsbDtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZy1vdmVyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBsYXllcjogcGxheWVyMSxcbiAgICAgICAgcmVzZXREcmFnQW5kRHJvcDogcmVzZXREcmFnQW5kRHJvcFxuICAgIH07XG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IocGxheWVyVHlwZSkge1xuICAgICAgICB0aGlzLnBsYXllclR5cGUgPSBwbGF5ZXJUeXBlO1xuXG4gICAgICAgIHRoaXMudHdvREFycmF5ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9LCAoKSA9PiBBcnJheSg4KS5maWxsKDApKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpZFwiKTtcbiAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XG4gICAgICAgIHRoaXMuc2hpcERlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1kZXN0cm95ZXJcIik7XG4gICAgICAgIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzID0gW107XG4gICAgICAgIHRoaXMuc2hpcHNQbGFjZWQgPSAwOyAvLyBLZWVwIHRyYWNrIG9mIHRoZSBudW1iZXIgb2Ygc2hpcHMgcGxhY2VkXG4gICAgICAgIHRoaXMuaXNGaW5pc2hlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcyA9IG5ldyBTZXQoKTsgLy8gU2V0IHRvIHN0b3JlIHByZXZpb3VzbHkgYXR0YWNrZWQgY29vcmRpbmF0ZXNcbiAgICAgICAgLy8gaWYgKHRoaXMucGxheWVyVHlwZSA9PT0gJ2NvbXB1dGVyJykge1xuICAgICAgICAvLyAgICAgdGhpcy5hZGRDbGlja0V2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgY3JlYXRlR3JpZCgpIHtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgLy8gQWRkIGEgbmV3IHJvdyB0byB0aGUgdGFibGVcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLnRhYmxlLmluc2VydFJvdyhpKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYSBjZWxsIHRvIHRoZSBjdXJyZW50IHJvd1xuICAgICAgICAgICAgICAgIHZhciBjZWxsID0gcm93Lmluc2VydENlbGwoaik7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIpO1xuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gPSBqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSB0YWJsZSB0byB0aGUgZ3JpZCBjb250YWluZXJcbiAgICAgICAgdGhpcy50YWJsZS5jbGFzc0xpc3QuYWRkKCdjb21wdXRlckJvYXJkJyk7XG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxlKTtcbiAgICB9XG4gICAgcmVzZXRHYW1lKCkge1xuICAgICAgICAvLyBJbXBsZW1lbnQgbG9naWMgdG8gcmVzZXQgdGhlIGdhbWUgYm9hcmQgYW5kIGFueSBvdGhlciBuZWNlc3Nhcnkgc3RhdGVcbiAgICAgICAgdGhpcy50d29EQXJyYXkgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA4IH0sICgpID0+IEFycmF5KDgpLmZpbGwoMCkpO1xuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkID0gMDtcbiAgICAgICAgdGhpcy5jbGVhckdyaWQoKTtcbiAgICAgICAgdGhpcy50YWJsZS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wdXRlckJvYXJkJyk7XG5cbiAgICAgICAgLy8gdGhpcy5jcmVhdGVHcmlkKCk7XG4gICAgICAgIC8vIEFkZGl0aW9uYWwgcmVzZXQgbG9naWMgYXMgbmVlZGVkXG4gICAgfVxuICAgIGNsZWFyR3JpZCgpIHtcbiAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGVhY2ggcm93XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcm93XG4gICAgICAgICAgICB2YXIgcm93ID0gdGhpcy50YWJsZS5yb3dzW2ldO1xuXG4gICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgZWFjaCBjZWxsIGluIHRoZSBjdXJyZW50IHJvd1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgY2VsbFxuICAgICAgICAgICAgICAgIHZhciBjZWxsID0gcm93LmNlbGxzW2pdO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGNlbGwgY29udGVudCBvciByZXNldCBzdHlsZXNcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJib2F0LWNlbGxcIik7XG5cbiAgICAgICAgICAgICAgICAvLyBBZGRpdGlvbmFsIHJlc2V0IGxvZ2ljIGFzIG5lZWRlZCBmb3Igb3RoZXIgY2VsbCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtaXRlbScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzID0gW3JvdywgY29sdW1uXTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZWxlY3RlZCBDZWxsIENvb3JkaW5hdGVzOicsIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZUF0dGFjazEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGxhY2VCb2F0KGJvYXQsIHNob3VsZEFkZENsYXNzID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB7IGFuZ2xlLCBsZW5ndGgsIGxvY2F0aW9uIH0gPSBib2F0O1xuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gbG9jYXRpb247XG5cbiAgICAgICAgaWYgKGFuZ2xlID09PSAnSCcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sICsgaSA+PSA4IHx8IHRoaXMudHdvREFycmF5W3Jvd11bY29sICsgaV0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbCArIGldID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQWRkQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMudGFibGUucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sdW1uPVwiJHtjb2wgKyBpfVwiXWApO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXQtY2VsbCcpOyAvLyBBZGQgYSBDU1MgY2xhc3MgdG8gc3R5bGUgdGhlIGJvYXQgY2VsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gJ1YnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdyArIGkgPj0gOCB8fCB0aGlzLnR3b0RBcnJheVtyb3cgKyBpXVtjb2xdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93ICsgaV1bY29sXSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEFkZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLnRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93ICsgaX1cIl1bZGF0YS1jb2x1bW49XCIke2NvbH1cIl1gKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdib2F0LWNlbGwnKTsgLy8gQWRkIGEgQ1NTIGNsYXNzIHRvIHN0eWxlIHRoZSBib2F0IGNlbGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCsrXG4gICAgICAgIGlmICh0aGlzLnNoaXBzUGxhY2VkID49IDMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVByb21pc2UoKTsgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZSB3aGVuIHRoZSBjb3VudGVyIHJlYWNoZXMgM1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHdhaXRGb3JGaW5pc2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRmluaXNoZWRQcm9taXNlO1xuICAgIH1cbiAgICBhbGxQbGFjZWQoKSB7XG4gICAgICAgIHRoaXMuc2hpcHNQbGFjZWQrKztcblxuICAgICAgICAvLyBDaGVjayBpZiB0aHJlZSBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkXG4gICAgICAgIGlmICh0aGlzLnNoaXBzUGxhY2VkID09PSAzKSB7XG4gICAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBwcm9taXNlXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmV0dXJuIGEgcGVuZGluZyBwcm9taXNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNvbHZlLCBcImRvZXNudHdvcmtzIVwiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcnVuKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHsgY29uc29sZS5sb2coXCIybmQgcHJvbWlzZVwiKSwgcmVzb2x2ZShcImFzXCIpIH0pO1xuICAgIH1cbiAgICBmb28oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4geyBjb25zb2xlLmxvZyhcIjNyZCBwcm9taXNlXCIpLCByZXNvbHZlKFwiYXNcIikgfSk7XG4gICAgfVxuXG4gICAgY2hlY2tFbmRHYW1lKCkge1xuICAgICAgICBjb25zdCBmbGF0dGVuZWRBcnJheSA9IHRoaXMudHdvREFycmF5LmZsYXQoKTsgLy8gRmxhdHRlbiB0aGUgMkQgYXJyYXlcbiAgICAgICAgY29uc3QgY291bnRYID0gZmxhdHRlbmVkQXJyYXkuZmlsdGVyKGl0ZW0gPT4gaXRlbSA9PT0gJ1gnKS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGNvdW50WCA+PSAyKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlybShgJHt0aGlzLnBsYXllclR5cGV9IHdpbnMhIFBsYXkgYWdhaW4/YCkpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMudGFibGUucmVtb3ZlQ2hpbGQodGhpcy50YWJsZS5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VkLXNoaXBcIik7XG5cbiAgICAgICAgICAgICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXAuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2VkLXNoaXBcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIERvIG5vdGhpbmchXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2FtZSBkb2VzIG5vdGhpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICBjaGVjaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzO1xuICAgIH1cblxuICAgIHBsYWNlUmFuZG9tU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gW1xuICAgICAgICAgICAgeyB0eXBlOiAnRGVzdHJveWVyJywgbGVuZ3RoOiAyIH0sXG4gICAgICAgICAgICB7IHR5cGU6ICdTdWJtYXJpbmUnLCBsZW5ndGg6IDMgfSxcbiAgICAgICAgICAgIHsgdHlwZTogJ0NydWlzZXInLCBsZW5ndGg6IDQgfVxuICAgICAgICBdO1xuXG4gICAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuICAgICAgICAgICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ICYmIGNvbCArIHNoaXAubGVuZ3RoIDw9IDggPyAnSCcgOiAnVic7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGFjZUJvYXQobmV3IFNoaXAob3JpZW50YXRpb24sIHNoaXAubGVuZ3RoLCBbcm93LCBjb2xdKSwgZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlUmFuZG9tQXR0YWNrKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIENvcnJlY3RlZDogQ2FsbCBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUgdG8gZ2V0IHRoZSBhY3R1YWwgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLnRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbHVtbj1cIiR7Y29sfVwiXWApO1xuXG4gICAgICAgICAgICAvLyBDb3JyZWN0ZWQ6IFVzZSB0b1N0cmluZygpIG9uIHRoZSBjb29yZGluYXRlcyBhcnJheVxuICAgICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXNTdHJpbmcgPSBgJHtyb3d9LCR7Y29sfWA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzQXR0YWNrcy5oYXMoY29vcmRpbmF0ZXNTdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbHJlYWR5IGF0dGFja2VkIHRoZXNlIGNvb3JkaW5hdGVzIVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPSBcIlhcIjtcbiAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmQgPSBcImJsYWNrXCIsIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXIgbWFrZXMgYSBIaXQhIVwiLCB0aGlzLnR3b0RBcnJheSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNoZWNrRW5kR2FtZSgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wdXRlciBtYWtlcyBhIE1pc3MhIVwiLCB0aGlzLnR3b0RBcnJheSk7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJibHVlXCI7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByZXZpb3VzQXR0YWNrcyk7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcy5hZGQoY29vcmRpbmF0ZXNTdHJpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrMSgpIHtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzO1xuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy50YWJsZS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2x1bW49XCIke2NvbH1cIl1gKTtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXNTdHJpbmcgPSBgJHtyb3d9LCR7Y29sfWA7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aW91c0F0dGFja3MuaGFzKGNvb3JkaW5hdGVzU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIkFscmVhZHkgYXR0YWNrZWQgdGhlc2UgY29vcmRpbmF0ZXMhXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG5cblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllciBtYWtlcyBhIEhpdCEhIVwiLCB0aGlzLnR3b0RBcnJheSksIGNlbGwuc3R5bGUuYmFja2dyb3VuZCA9IFwiYmxhY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmNoZWNrRW5kR2FtZSgpLCBcIjwtbG9va1wiKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIG1ha2VzIGEgTWlzcyEhIVwiLCB0aGlzLnR3b0RBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZCA9IFwiYmx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzLmFkZChjb29yZGluYXRlc1N0cmluZyk7XG5cblxuICAgICAgICAgICAgICAgIC8vcmVzb2x2ZShcInBsYXllcm1ha2VzIGEgbW92ZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHRleHQsIGNsaWNrSGFuZGxlcikge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b24tY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKGJ1dHRvbik7XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCB7IHNldHVwRHJhZ0FuZERyb3AgfSBmcm9tICcuL2RyYWdBbmREcm9wJztcbmltcG9ydCBjcmVhdGVCdXR0b24gZnJvbSAnLi9wbGF5LXJlc2V0JztcblxuY29uc3QgZ2FtZVNldHVwID0gc2V0dXBEcmFnQW5kRHJvcCgpO1xuY29uc3QgcGxheWVyMSA9IGdhbWVTZXR1cC5wbGF5ZXI7XG5sZXQgZmlyc3RUcnVlUmVzdWx0ID0gbnVsbDtcblxuLy9jb25zdCBwbGF5ZXIxID0gc2V0dXBEcmFnQW5kRHJvcCgpO1xuY29uc3QgZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpZFwiKVxubGV0IGNvbXB1dGVyUGxheWVyO1xuY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBzLWNvbnRhaW5lclwiKTtcbi8vY29uc3QgYWxsU2hpcHMgPSBzZXR1cERyYWdBbmREcm9wKCk7XG5cbnNoaXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBzd2l0Y2hBbmdsZUVsZW1lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5zd2l0Y2gtYW5nbGVcIik7XG5cbiAgICBpZiAoc3dpdGNoQW5nbGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHNoaXBFbGVtZW50ID0gc3dpdGNoQW5nbGVFbGVtZW50LmNsb3Nlc3QoXCIuc2hpcFwiKTtcbiAgICAgICAgY29uc3QgY3VycmVudERhdGFBbmdsZSA9IHN3aXRjaEFuZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFuZ2xlXCIpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBiZXR3ZWVuIFwiSFwiIGFuZCBcIlZcIiBmb3IgZGF0YS1hbmdsZVxuICAgICAgICBzd2l0Y2hBbmdsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiLCBjdXJyZW50RGF0YUFuZ2xlID09PSBcIkhcIiA/IFwiVlwiIDogXCJIXCIpO1xuICAgICAgICBzd2l0Y2hBbmdsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50RGF0YUFuZ2xlID09PSBcIkhcIiA/IFwiVlwiIDogXCJIXCI7XG5cbiAgICAgICAgc2hpcEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiLCBjdXJyZW50RGF0YUFuZ2xlID09PSBcIkhcIiA/IFwiVlwiIDogXCJIXCIpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIxKVxuXG59KTtcbmNvbnNvbGUubG9nKHBsYXllcjEpXG5cbmFzeW5jIGZ1bmN0aW9uIGZvb2JhcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlTW91c2VVcCA9IGFzeW5jIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtaXRlbScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuICAgICAgICAgICAgICAgIGNvbXB1dGVyUGxheWVyLmNsaWNrZWRDb29yZGluYXRlcyA9IFtyb3csIGNvbHVtbl07XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjb21wdXRlclBsYXllci5yZWNlaXZlQXR0YWNrMSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQyID0gYXdhaXQgcGxheWVyMS5yZWNlaXZlUmFuZG9tQXR0YWNrKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0Mik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgZmlyc3QgcmVzdWx0IHRoYXQgaXMgdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBmaXJzdFRydWVSZXN1bHQgPSByZXN1bHQgPT09IHRydWUgPyAncmVzdWx0JyA6IHJlc3VsdDIgPT09IHRydWUgPyAncmVzdWx0MicgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdFRydWVSZXN1bHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlyc3QgZnVuY3Rpb24gdGhhdCByZXR1cm5lZCB0cnVlOlwiLCBmaXJzdFRydWVSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOZWl0aGVyIGZ1bmN0aW9uIHJldHVybmVkIHRydWVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb21wdXRlclBsYXllci50YWJsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gICAgfSk7XG59XG5cbnBsYXllcjEud2FpdEZvckZpbmlzaCgpLnRoZW4oKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiSW5zdGFuY2UgaXMgZmluaXNoZWQhXCIpO1xuICAgIGNvbXB1dGVyUGxheWVyID0gbmV3IEdhbWVib2FyZChcImNvbXB1dGVyXCIpO1xuICAgIGNvbXB1dGVyUGxheWVyLnBsYWNlUmFuZG9tU2hpcHMoKTtcblxuICAgIGNyZWF0ZUJ1dHRvbihcIlBsYXlcIiwgYXN5bmMgZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgLy8gQWRkIHlvdXIgbG9naWMgaGVyZVxuICAgICAgICAvLyBJZiB0aGlzIGZ1bmN0aW9uIGlzIGFzeW5jaHJvbm91cywgaGFuZGxlIGl0IGFjY29yZGluZ2x5XG4gICAgfSk7XG5cbiAgICBjcmVhdGVCdXR0b24oXCJSZXNldFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFsZXJ0KFwiUmVzZXQgYnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICAgIGNvbXB1dGVyUGxheWVyLnJlc2V0R2FtZSgpO1xuICAgICAgICBwbGF5ZXIxLnJlc2V0R2FtZSgpO1xuXG4gICAgICAgIHBsYXllcjEuY2xlYXJHcmlkKClcbiAgICB9KTtcblxuICAgIC8vIFN0YXJ0IHRoZSBhc3luY2hyb25vdXMgb3BlcmF0aW9ucyBpbiBmb29iYXJcbiAgICByZXR1cm4gZm9vYmFyKCk7XG59KS5jYXRjaChlcnJvciA9PiB7XG4gICAgY29uc29sZS5lcnJvcihcIkFuIGVycm9yIG9jY3VycmVkOlwiLCBlcnJvcik7XG59KTtcblxuXG4vLyAudGhlbihmaW5hbFJlc3VsdCA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coZmluYWxSZXN1bHQpO1xuLy8gfSlcblxuXG4vLyBhc3luYyBmdW5jdGlvbiBwbGF5R2FtZSgpIHtcbi8vICAgICB3aGlsZSAoIXBsYXllcjEuZmluZEVuZ0dhbWUoKSAmJiAhY29tcHV0ZXJQbGF5ZXIuZmluZEVuZ0dhbWUoKSkge1xuLy8gICAgICAgICAvLyBQbGF5ZXIxJ3MgdHVyblxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllcjEncyB0dXJuOlwiKTtcbi8vICAgICAgICAgY29uc3QgW3BsYXllclJvdywgcGxheWVyQ29sXSA9IHBsYXllcjEuYWRkQ2xpY2tFdmVudExpc3RlbmVycygpOyAvLyBBc3N1bWluZyBjaGVjaygpIHJldHVybnMgdGhlIGxhc3QgY2xpY2tlZCBjb29yZGluYXRlc1xuLy8gICAgICAgICBjb21wdXRlclBsYXllci5yZWNlaXZlQXR0YWNrMSgpO1xuXG4vLyAgICAgICAgIC8vIENoZWNrIGlmIHBsYXllcjEgaGFzIHdvblxuLy8gICAgICAgICBpZiAocGxheWVyMS5maW5kRW5nR2FtZSgpKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllcjEgd2lucyFcIik7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIENvbXB1dGVyUGxheWVyJ3MgdHVyblxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkNvbXB1dGVyUGxheWVyJ3MgdHVybjpcIik7XG4vLyAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDAwKSk7IC8vIFNpbXVsYXRpbmcgYSBkZWxheSBmb3IgY29tcHV0ZXIncyBtb3ZlXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXJQbGF5ZXIncyB0dXJuOlwiKTtcblxuLy8gICAgICAgICBjb25zdCBbY29tcHV0ZXJSb3csIGNvbXB1dGVyQ29sXSA9IGNvbXB1dGVyUGxheWVyLnJlY2VpdmVSYW5kb21BdHRhY2soKTtcbi8vICAgICAgICAgcGxheWVyMS5yZWNlaXZlQXR0YWNrMShjb21wdXRlclJvdywgY29tcHV0ZXJDb2wpO1xuLy8gICAgICAgICBwbGF5ZXIxLmRpc3BsYXlCb2FyZCgpO1xuXG4vLyAgICAgICAgIC8vIENoZWNrIGlmIGNvbXB1dGVyUGxheWVyIGhhcyB3b25cbi8vICAgICAgICAgaWYgKGNvbXB1dGVyUGxheWVyLmZpbmRFbmdHYW1lKCkpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXJQbGF5ZXIgd2lucyFcIik7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuLy8gLy8gUnVuIHRoZSBnYW1lXG4vLyBwbGF5R2FtZSgpO1xuXG4iXSwibmFtZXMiOlsic2hpcENvdW50IiwiU2hpcCIsImFuZ2xlIiwibGVuZ3RoIiwibG9jYXRpb24iLCJfY2xhc3NDYWxsQ2hlY2siLCJuYW1lIiwiY3JlYXRlU2hpcE5hbWUiLCJocCIsInNpbmsiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInNoaXBIaXQiLCJzaGlwU3VuayIsImNvdW50IiwiY29uY2F0IiwiZGVmYXVsdCIsIkdhbWVib2FyZCIsImRpc2FibGVTaGlwRHJhZyIsIngiLCJzZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXR1cERyYWdBbmREcm9wIiwicGxheWVyMSIsInJlc2V0RHJhZ0FuZERyb3AiLCJzaGlwcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJzaGlwIiwicmVtb3ZlIiwiY3VycmVudFNoaXAiLCJncmlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3BFZmZlY3QiLCJzaGlwTGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2hpcEFuZ2xlIiwiZ2V0RGF0YSIsImNsaWVudFgiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwieSIsImNsaWVudFkiLCJ0b3AiLCJjZWxsWCIsIk1hdGgiLCJmbG9vciIsIm9mZnNldFdpZHRoIiwiY2VsbFkiLCJvZmZzZXRIZWlnaHQiLCJkcmFnQ29vcmRzIiwibmV3U2hpcCIsInBhcnNlSW50IiwiYm9hdFBsYWNlZCIsInBsYWNlQm9hdCIsInRhcmdldCIsInBsYXllciIsInBsYXllclR5cGUiLCJfdGhpcyIsInR3b0RBcnJheSIsIkFycmF5IiwiZnJvbSIsImZpbGwiLCJ0YWJsZSIsImNyZWF0ZUVsZW1lbnQiLCJncmlkQ29udGFpbmVyIiwiY3JlYXRlR3JpZCIsInNoaXBEZXN0cm95ZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2xpY2tlZENvb3JkaW5hdGVzIiwic2hpcHNQbGFjZWQiLCJpc0ZpbmlzaGVkUHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzb2x2ZVByb21pc2UiLCJwcmV2aW91c0F0dGFja3MiLCJTZXQiLCJpIiwicm93IiwiaW5zZXJ0Um93IiwiaiIsImNlbGwiLCJpbnNlcnRDZWxsIiwiZGF0YXNldCIsImNvbHVtbiIsImFwcGVuZENoaWxkIiwicmVzZXRHYW1lIiwiY2xlYXJHcmlkIiwicm93cyIsImNlbGxzIiwiYWRkQ2xpY2tFdmVudExpc3RlbmVycyIsIl90aGlzMiIsImV2ZW50IiwiY29udGFpbnMiLCJjb25zb2xlIiwibG9nIiwicmVjZWl2ZUF0dGFjazEiLCJib2F0Iiwic2hvdWxkQWRkQ2xhc3MiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJfbG9jYXRpb24iLCJfc2xpY2VkVG9BcnJheSIsImNvbCIsIndhaXRGb3JGaW5pc2giLCJhbGxQbGFjZWQiLCJydW4iLCJmb28iLCJjaGVja0VuZEdhbWUiLCJmbGF0dGVuZWRBcnJheSIsImZsYXQiLCJjb3VudFgiLCJmaWx0ZXIiLCJpdGVtIiwiY29uZmlybSIsInJlbW92ZUNoaWxkIiwiZmlyc3RDaGlsZCIsImNoZWNrIiwicGxhY2VSYW5kb21TaGlwcyIsInR5cGUiLCJfaTQiLCJfc2hpcHMiLCJwbGFjZWQiLCJyYW5kb20iLCJvcmllbnRhdGlvbiIsInJlY2VpdmVSYW5kb21BdHRhY2siLCJfdGhpczMiLCJnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUiLCJfZ2VuZXJhdGVSYW5kb21Db29yZGkiLCJfZ2VuZXJhdGVSYW5kb21Db29yZGkyIiwiY29vcmRpbmF0ZXNTdHJpbmciLCJoYXMiLCJzdHlsZSIsImJhY2tncm91bmQiLCJfdGhpczQiLCJfdGhpcyRjbGlja2VkQ29vcmRpbmEiLCJyZWplY3QiLCJjcmVhdGVCdXR0b24iLCJ0ZXh0IiwiY2xpY2tIYW5kbGVyIiwiYnV0dG9uIiwidGV4dENvbnRlbnQiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwidCIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJuIiwiaGFzT3duUHJvcGVydHkiLCJvIiwiZGVmaW5lUHJvcGVydHkiLCJTeW1ib2wiLCJhIiwiaXRlcmF0b3IiLCJjIiwiYXN5bmNJdGVyYXRvciIsInUiLCJ0b1N0cmluZ1RhZyIsImRlZmluZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIndyYXAiLCJHZW5lcmF0b3IiLCJjcmVhdGUiLCJDb250ZXh0IiwibWFrZUludm9rZU1ldGhvZCIsInRyeUNhdGNoIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwiZiIsInMiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwicCIsImQiLCJnZXRQcm90b3R5cGVPZiIsInYiLCJ2YWx1ZXMiLCJnIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJfdHlwZW9mIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsImtleXMiLCJyZXZlcnNlIiwicG9wIiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJ2YWwiLCJoYW5kbGUiLCJjb21wbGV0ZSIsImZpbmlzaCIsIl9jYXRjaCIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJfbmV4dCIsIl90aHJvdyIsImluZm8iLCJlcnJvciIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZm4iLCJzZWxmIiwiYXJncyIsImFwcGx5IiwiZXJyIiwiZ2FtZVNldHVwIiwiZmlyc3RUcnVlUmVzdWx0IiwiY29tcHV0ZXJQbGF5ZXIiLCJzaGlwc0NvbnRhaW5lciIsInN3aXRjaEFuZ2xlRWxlbWVudCIsImNsb3Nlc3QiLCJzaGlwRWxlbWVudCIsImN1cnJlbnREYXRhQW5nbGUiLCJmb29iYXIiLCJfZm9vYmFyIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJfcmVmMiIsIl9jYWxsZWUzIiwiaGFuZGxlTW91c2VVcCIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsIl9yZWYzIiwiX2NhbGxlZTIiLCJyZXN1bHQiLCJyZXN1bHQyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwidDAiLCJfeDMiLCJfeDIiLCJfcmVmIiwiX2NhbGxlZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJfeCIsImFsZXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==