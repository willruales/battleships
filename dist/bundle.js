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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

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
      this.table.classList.add("".concat(this.playerType));
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
        // if (confirm(`${this.playerType} wins! Play again?`)) {

        //     this.table.removeChild(this.table.firstChild);
        //     const ships = document.querySelectorAll(".placed-ship");

        //     ships.forEach((ship) => {
        //         ship.setAttribute("draggable", "true");
        //         ship.classList.remove("placed-ship");
        //     });
        //     return true
        // }

        return true;
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



var player1;
var _setupDragAndDrop = (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_1__.setupDragAndDrop)();
player1 = _setupDragAndDrop.player;
var grid = document.getElementById("grid");
var computerPlayer;
var shipsContainer = document.getElementById("ships-container");
shipsContainer.addEventListener("click", function (event) {
  var switchAngleElement = event.target.closest(".switch-angle");
  if (switchAngleElement) {
    var shipElement = switchAngleElement.closest(".ship");
    var currentDataAngle = switchAngleElement.getAttribute("data-angle");
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
  _foobar = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve) {
              var handleMouseUp;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    handleMouseUp = /*#__PURE__*/function () {
                      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
                        var row, column, finalPrompt, result, result2, firstTrueResult;
                        return _regeneratorRuntime().wrap(function _callee$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              if (!event.target.classList.contains('grid-item')) {
                                _context.next = 20;
                                break;
                              }
                              row = parseInt(event.target.dataset.row);
                              column = parseInt(event.target.dataset.column);
                              computerPlayer.clickedCoordinates = [row, column];
                              _context.prev = 4;
                              finalPrompt = function finalPrompt(x) {
                                if (confirm("".concat(x, " wins! Play again?"))) {
                                  var ships = document.querySelectorAll(".ship");
                                  grid.innerHTML = '';
                                  computerPlayer = null;
                                  var _setupDragAndDrop2 = (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_1__.setupDragAndDrop)();
                                  player1 = _setupDragAndDrop2.player;
                                  setupGameForPlayer1();
                                  ships.forEach(function (ship) {
                                    ship.setAttribute("draggable", "true");
                                    ship.classList.remove("placed-ship", "boat-cell");
                                  });
                                  return true; // You can return true if you want to indicate that the user confirmed
                                }
                                return false; // You can return false if you want to indicate that the user canceled
                              };
                              _context.next = 8;
                              return computerPlayer.receiveAttack1();
                            case 8:
                              result = _context.sent;
                              _context.next = 11;
                              return player1.receiveRandomAttack();
                            case 11:
                              result2 = _context.sent;
                              firstTrueResult = result === true ? finalPrompt('userwins') : result2 === true ? finalPrompt('computerwins') : null;
                              console.log(firstTrueResult);
                              _context.next = 19;
                              break;
                            case 16:
                              _context.prev = 16;
                              _context.t0 = _context["catch"](4);
                              console.error("Error:", _context.t0);
                            case 19:
                              resolve();
                            case 20:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee, null, [[4, 16]]);
                      }));
                      return function handleMouseUp(_x2) {
                        return _ref2.apply(this, arguments);
                      };
                    }();
                    computerPlayer.table.addEventListener('mouseup', handleMouseUp);
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _foobar.apply(this, arguments);
}
function setupGameForPlayer1() {
  player1.waitForFinish().then(function () {
    console.log("Instance is finished!");
    computerPlayer = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"]("computer");
    computerPlayer.placeRandomShips();
    return foobar();
  })["catch"](function (error) {
    console.error("An error occurred:", error);
  });
}
setupGameForPlayer1();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUFDLElBRUVDLElBQUk7RUFDckIsU0FBQUEsS0FBWUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVDLFFBQVEsRUFBRTtJQUFBQyxlQUFBLE9BQUFKLElBQUE7SUFDakMsSUFBSSxDQUFDRSxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDRyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxjQUFjLENBQUNKLE1BQU0sQ0FBQztJQUN2QyxJQUFJLENBQUNLLEVBQUUsR0FBR0wsTUFBTTtJQUNoQixJQUFJLENBQUNNLElBQUksR0FBRyxLQUFLO0lBQ2pCLElBQUksQ0FBQ0wsUUFBUSxHQUFHQSxRQUFRO0lBQ3hCLElBQUksQ0FBQ0YsS0FBSyxHQUFHQSxLQUFLO0VBQ3RCO0VBQUNRLFlBQUEsQ0FBQVQsSUFBQTtJQUFBVSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBQyxRQUFBLEVBQVU7TUFDTixJQUFJLENBQUNMLEVBQUUsRUFBRTtNQUNULElBQUksSUFBSSxDQUFDQSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2QsSUFBSSxDQUFDTSxRQUFRLENBQUMsQ0FBQztNQUNuQjtJQUNKO0VBQUM7SUFBQUgsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQUUsU0FBQSxFQUFXO01BQ1AsSUFBSSxDQUFDTCxJQUFJLEdBQUcsSUFBSTtJQUNwQjtFQUFDO0lBQUFFLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFMLGVBQWVKLE1BQU0sRUFBRTtNQUNuQixJQUFJQSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2QsT0FBTyxVQUFVO01BQ3JCLENBQUMsTUFDSSxJQUFJQSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ25CLE9BQU8sV0FBVztNQUN0QixDQUFDLE1BQ0ksSUFBSUEsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNuQixPQUFPLFVBQVU7TUFDckIsQ0FBQyxNQUVJO1FBQ0QsSUFBTVksS0FBSyxHQUFHZixTQUFTLENBQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDcENILFNBQVMsQ0FBQ0csTUFBTSxDQUFDLEdBQUdZLEtBQUssR0FBRyxDQUFDO1FBQzdCLGNBQUFDLE1BQUEsQ0FBY0QsS0FBSztNQUN2QjtJQUNKOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFBQTtFQUFBLE9BQUFkLElBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRCtCO0FBQ0k7QUFDdkMsU0FBU2tCLGVBQWVBLENBQUNDLENBQUMsRUFBRTtFQUN4QkEsQ0FBQyxDQUFDQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztFQUNwQ0QsQ0FBQyxDQUFDRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFDbEM7QUFHTyxTQUFTQyxnQkFBZ0JBLENBQUEsRUFBRztFQUMvQixJQUFNQyxPQUFPLEdBQUcsSUFBSVAscURBQVMsQ0FBQyxNQUFNLENBQUM7RUFDckM7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFRQTtFQUNBLFNBQVNRLGdCQUFnQkEsQ0FBQSxFQUFHO0lBQ3hCLElBQU1DLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7SUFFdkRGLEtBQUssQ0FBQ0csT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBSztNQUNwQkEsSUFBSSxDQUFDVixZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztNQUN0Q1UsSUFBSSxDQUFDVCxTQUFTLENBQUNVLE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0VBQ047RUFDQSxJQUFNTCxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO0VBQ2hELElBQUlJLFdBQVcsR0FBRyxJQUFJO0VBQ3RCLElBQU1DLElBQUksR0FBR04sUUFBUSxDQUFDTyxjQUFjLENBQUMsTUFBTSxDQUFDO0VBRTVDUixLQUFLLENBQUNHLE9BQU8sQ0FBQyxVQUFDQyxJQUFJLEVBQUs7SUFDcEJBLElBQUksQ0FBQ0ssZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUNDLENBQUMsRUFBSztNQUN0Q0EsQ0FBQyxDQUFDQyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO01BQy9DTixXQUFXLEdBQUdGLElBQUk7SUFDdEIsQ0FBQyxDQUFDO0lBRUZBLElBQUksQ0FBQ0ssZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFlBQU07TUFDbkNILFdBQVcsR0FBRyxJQUFJO0lBQ3RCLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGQyxJQUFJLENBQUNFLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDQyxDQUFDLEVBQUs7SUFDckNBLENBQUMsQ0FBQ0csY0FBYyxDQUFDLENBQUM7SUFDbEJILENBQUMsQ0FBQ0MsWUFBWSxDQUFDRyxVQUFVLEdBQUcsTUFBTTtFQUN0QyxDQUFDLENBQUM7RUFFRlAsSUFBSSxDQUFDRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQ0MsQ0FBQyxFQUFLO0lBQ3RDQSxDQUFDLENBQUNHLGNBQWMsQ0FBQyxDQUFDO0VBQ3RCLENBQUMsQ0FBQztFQUVGTixJQUFJLENBQUNFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFDQyxDQUFDLEVBQUs7SUFDdENBLENBQUMsQ0FBQ0csY0FBYyxDQUFDLENBQUM7RUFDdEIsQ0FBQyxDQUFDO0VBRUZOLElBQUksQ0FBQ0UsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQUNDLENBQUMsRUFBSztJQUNqQ0EsQ0FBQyxDQUFDRyxjQUFjLENBQUMsQ0FBQztJQUNsQixJQUFNRSxVQUFVLEdBQUdULFdBQVcsQ0FBQ1UsWUFBWSxDQUFDLGFBQWEsQ0FBQztJQUMxRCxJQUFNQyxTQUFTLEdBQUdYLFdBQVcsQ0FBQ1UsWUFBWSxDQUFDLFlBQVksQ0FBQztJQUN4RDtJQUNBLElBQUlOLENBQUMsQ0FBQ0MsWUFBWSxDQUFDTyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssU0FBUyxJQUFJSCxVQUFVLEVBQUU7TUFFbEUsSUFBTXRCLENBQUMsR0FBR2lCLENBQUMsQ0FBQ1MsT0FBTyxHQUFHWixJQUFJLENBQUNhLHFCQUFxQixDQUFDLENBQUMsQ0FBQ0MsSUFBSTtNQUN2RCxJQUFNQyxDQUFDLEdBQUdaLENBQUMsQ0FBQ2EsT0FBTyxHQUFHaEIsSUFBSSxDQUFDYSxxQkFBcUIsQ0FBQyxDQUFDLENBQUNJLEdBQUc7TUFFdEQsSUFBTUMsS0FBSyxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBRWxDLENBQUMsR0FBR2MsSUFBSSxDQUFDcUIsV0FBVyxHQUFJLENBQUMsQ0FBQztNQUNwRCxJQUFNQyxLQUFLLEdBQUdILElBQUksQ0FBQ0MsS0FBSyxDQUFFTCxDQUFDLEdBQUdmLElBQUksQ0FBQ3VCLFlBQVksR0FBSSxDQUFDLENBQUM7TUFDckQsSUFBTUMsVUFBVSxHQUFHLENBQUNGLEtBQUssRUFBRUosS0FBSyxDQUFDOztNQUVqQztNQUNBLElBQU1PLE9BQU8sR0FBRyxJQUFJMUQsc0RBQUksQ0FBQzJDLFNBQVMsRUFBRWdCLFFBQVEsQ0FBQ2xCLFVBQVUsQ0FBQyxFQUFFZ0IsVUFBVSxDQUFDOztNQUVyRTs7TUFFQSxJQUFNRyxVQUFVLEdBQUdwQyxPQUFPLENBQUNxQyxTQUFTLENBQUNILE9BQU8sQ0FBQztNQUM3QyxJQUFJRSxVQUFVLEVBQUU7UUFDWjFDLGVBQWUsQ0FBQ2MsV0FBVyxDQUFDO1FBQzVCQSxXQUFXLEdBQUcsSUFBSTtRQUNsQkksQ0FBQyxDQUFDMEIsTUFBTSxDQUFDekMsU0FBUyxDQUFDVSxNQUFNLENBQUMsV0FBVyxDQUFDO01BQzFDO0lBRUo7RUFDSixDQUFDLENBQUM7RUFFRixPQUFPO0lBQ0hnQyxNQUFNLEVBQUV2QyxPQUFPO0lBQ2ZDLGdCQUFnQixFQUFFQTtFQUN0QixDQUFDO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdHZ0M7QUFBQSxJQUVYUixTQUFTO0VBQzFCLFNBQUFBLFVBQVkrQyxVQUFVLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQUE3RCxlQUFBLE9BQUFhLFNBQUE7SUFDcEIsSUFBSSxDQUFDK0MsVUFBVSxHQUFHQSxVQUFVO0lBRTVCLElBQUksQ0FBQ0UsU0FBUyxHQUFHQyxLQUFLLENBQUNDLElBQUksQ0FBQztNQUFFbEUsTUFBTSxFQUFFO0lBQUUsQ0FBQyxFQUFFO01BQUEsT0FBTWlFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUFBLEVBQUM7SUFDbEUsSUFBSSxDQUFDQyxLQUFLLEdBQUczQyxRQUFRLENBQUM0QyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQzVDLElBQUksQ0FBQ0MsYUFBYSxHQUFHN0MsUUFBUSxDQUFDTyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ3BELElBQUksQ0FBQ3VDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pCLElBQUksQ0FBQ0MsYUFBYSxHQUFHL0MsUUFBUSxDQUFDZ0QsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0lBQzlELElBQUksQ0FBQ0Msa0JBQWtCLEdBQUcsRUFBRTtJQUM1QixJQUFJLENBQUNDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUlDLE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUs7TUFDOUNmLEtBQUksQ0FBQ2dCLGNBQWMsR0FBR0QsT0FBTztJQUNqQyxDQUFDLENBQUM7SUFDRixJQUFJLENBQUNFLGVBQWUsR0FBRyxJQUFJQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEM7SUFDQTtJQUNBO0VBQ0o7RUFBQzFFLFlBQUEsQ0FBQVEsU0FBQTtJQUFBUCxHQUFBO0lBQUFDLEtBQUEsRUFDRCxTQUFBOEQsV0FBQSxFQUFhO01BRVQsS0FBSyxJQUFJVyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRTtRQUN4QjtRQUNBLElBQUlDLEdBQUcsR0FBRyxJQUFJLENBQUNmLEtBQUssQ0FBQ2dCLFNBQVMsQ0FBQ0YsQ0FBQyxDQUFDO1FBRWpDLEtBQUssSUFBSUcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7VUFDeEI7VUFDQSxJQUFJQyxJQUFJLEdBQUdILEdBQUcsQ0FBQ0ksVUFBVSxDQUFDRixDQUFDLENBQUM7VUFDNUJDLElBQUksQ0FBQ25FLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztVQUMvQmtFLElBQUksQ0FBQ0UsT0FBTyxDQUFDTCxHQUFHLEdBQUdELENBQUM7VUFDcEJJLElBQUksQ0FBQ0UsT0FBTyxDQUFDQyxNQUFNLEdBQUdKLENBQUM7UUFDM0I7TUFDSjs7TUFFQTtNQUNBLElBQUksQ0FBQ2pCLEtBQUssQ0FBQ2pELFNBQVMsQ0FBQ0MsR0FBRyxJQUFBUCxNQUFBLENBQUksSUFBSSxDQUFDaUQsVUFBVSxDQUFFLENBQUM7TUFDOUMsSUFBSSxDQUFDUSxhQUFhLENBQUNvQixXQUFXLENBQUMsSUFBSSxDQUFDdEIsS0FBSyxDQUFDO0lBQzlDO0VBQUM7SUFBQTVELEdBQUE7SUFBQUMsS0FBQSxFQUNELFNBQUFrRixVQUFBLEVBQVk7TUFDUjtNQUNBLElBQUksQ0FBQzNCLFNBQVMsR0FBR0MsS0FBSyxDQUFDQyxJQUFJLENBQUM7UUFBRWxFLE1BQU0sRUFBRTtNQUFFLENBQUMsRUFBRTtRQUFBLE9BQU1pRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUNFLElBQUksQ0FBQyxDQUFDLENBQUM7TUFBQSxFQUFDO01BQ2xFLElBQUksQ0FBQ1EsV0FBVyxHQUFHLENBQUM7TUFDcEIsSUFBSSxDQUFDaUIsU0FBUyxDQUFDLENBQUM7TUFDaEIsSUFBSSxDQUFDeEIsS0FBSyxDQUFDakQsU0FBUyxDQUFDVSxNQUFNLENBQUMsZUFBZSxDQUFDOztNQUU1QztNQUNBO0lBQ0o7RUFBQztJQUFBckIsR0FBQTtJQUFBQyxLQUFBLEVBQ0QsU0FBQW1GLFVBQUEsRUFBWTtNQUNSO01BQ0EsS0FBSyxJQUFJVixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRTtRQUN4QjtRQUNBLElBQUlDLEdBQUcsR0FBRyxJQUFJLENBQUNmLEtBQUssQ0FBQ3lCLElBQUksQ0FBQ1gsQ0FBQyxDQUFDOztRQUU1QjtRQUNBLEtBQUssSUFBSUcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7VUFDeEI7VUFDQSxJQUFJQyxJQUFJLEdBQUdILEdBQUcsQ0FBQ1csS0FBSyxDQUFDVCxDQUFDLENBQUM7O1VBRXZCO1VBQ0FDLElBQUksQ0FBQ25FLFNBQVMsQ0FBQ1UsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7VUFFbEM7UUFDSjtNQUNKO0lBQ0o7RUFBQztJQUFBckIsR0FBQTtJQUFBQyxLQUFBLEVBR0QsU0FBQXNGLHVCQUFBLEVBQXlCO01BQUEsSUFBQUMsTUFBQTtNQUNyQixJQUFJLENBQUM1QixLQUFLLENBQUNuQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQ2dFLEtBQUssRUFBSztRQUM5QyxJQUFJQSxLQUFLLENBQUNyQyxNQUFNLENBQUN6QyxTQUFTLENBQUMrRSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7VUFDOUMsSUFBTWYsR0FBRyxHQUFHMUIsUUFBUSxDQUFDd0MsS0FBSyxDQUFDckMsTUFBTSxDQUFDNEIsT0FBTyxDQUFDTCxHQUFHLENBQUM7VUFDOUMsSUFBTU0sTUFBTSxHQUFHaEMsUUFBUSxDQUFDd0MsS0FBSyxDQUFDckMsTUFBTSxDQUFDNEIsT0FBTyxDQUFDQyxNQUFNLENBQUM7VUFDcERPLE1BQUksQ0FBQ3RCLGtCQUFrQixHQUFHLENBQUNTLEdBQUcsRUFBRU0sTUFBTSxDQUFDO1VBRXZDVSxPQUFPLENBQUNDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRUosTUFBSSxDQUFDdEIsa0JBQWtCLENBQUM7VUFFbEVzQixNQUFJLENBQUNLLGNBQWMsQ0FBQyxDQUFDO1FBQ3pCO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFBQztJQUFBN0YsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQWtELFVBQVUyQyxJQUFJLEVBQXlCO01BQUEsSUFBdkJDLGNBQWMsR0FBQUMsU0FBQSxDQUFBeEcsTUFBQSxRQUFBd0csU0FBQSxRQUFBQyxTQUFBLEdBQUFELFNBQUEsTUFBRyxJQUFJO01BQ2pDLElBQVF6RyxLQUFLLEdBQXVCdUcsSUFBSSxDQUFoQ3ZHLEtBQUs7UUFBRUMsTUFBTSxHQUFlc0csSUFBSSxDQUF6QnRHLE1BQU07UUFBRUMsUUFBUSxHQUFLcUcsSUFBSSxDQUFqQnJHLFFBQVE7TUFDL0IsSUFBQXlHLFNBQUEsR0FBQUMsY0FBQSxDQUFtQjFHLFFBQVE7UUFBcEJrRixHQUFHLEdBQUF1QixTQUFBO1FBQUVFLEdBQUcsR0FBQUYsU0FBQTtNQUVmLElBQUkzRyxLQUFLLEtBQUssR0FBRyxFQUFFO1FBQ2YsS0FBSyxJQUFJbUYsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHbEYsTUFBTSxFQUFFa0YsQ0FBQyxFQUFFLEVBQUU7VUFDN0IsSUFBSTBCLEdBQUcsR0FBRzFCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDbEIsU0FBUyxDQUFDbUIsR0FBRyxDQUFDLENBQUN5QixHQUFHLEdBQUcxQixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEQsT0FBTyxLQUFLO1VBQ2hCO1FBQ0o7UUFDQSxLQUFLLElBQUlBLEVBQUMsR0FBRyxDQUFDLEVBQUVBLEVBQUMsR0FBR2xGLE1BQU0sRUFBRWtGLEVBQUMsRUFBRSxFQUFFO1VBQzdCLElBQUksQ0FBQ2xCLFNBQVMsQ0FBQ21CLEdBQUcsQ0FBQyxDQUFDeUIsR0FBRyxHQUFHMUIsRUFBQyxDQUFDLEdBQUcsQ0FBQztVQUNoQyxJQUFJcUIsY0FBYyxFQUFFO1lBQ2hCLElBQU1qQixJQUFJLEdBQUcsSUFBSSxDQUFDbEIsS0FBSyxDQUFDSyxhQUFhLGdCQUFBNUQsTUFBQSxDQUFlc0UsR0FBRyx3QkFBQXRFLE1BQUEsQ0FBbUIrRixHQUFHLEdBQUcxQixFQUFDLFFBQUksQ0FBQztZQUN0RkksSUFBSSxDQUFDbkUsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztVQUNyQztRQUNKO01BQ0osQ0FBQyxNQUFNLElBQUlyQixLQUFLLEtBQUssR0FBRyxFQUFFO1FBQ3RCLEtBQUssSUFBSW1GLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsR0FBR2xGLE1BQU0sRUFBRWtGLEdBQUMsRUFBRSxFQUFFO1VBQzdCLElBQUlDLEdBQUcsR0FBR0QsR0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUNsQixTQUFTLENBQUNtQixHQUFHLEdBQUdELEdBQUMsQ0FBQyxDQUFDMEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BELE9BQU8sS0FBSztVQUNoQjtRQUNKO1FBQ0EsS0FBSyxJQUFJMUIsR0FBQyxHQUFHLENBQUMsRUFBRUEsR0FBQyxHQUFHbEYsTUFBTSxFQUFFa0YsR0FBQyxFQUFFLEVBQUU7VUFDN0IsSUFBSSxDQUFDbEIsU0FBUyxDQUFDbUIsR0FBRyxHQUFHRCxHQUFDLENBQUMsQ0FBQzBCLEdBQUcsQ0FBQyxHQUFHLENBQUM7VUFDaEMsSUFBSUwsY0FBYyxFQUFFO1lBQ2hCLElBQU1qQixLQUFJLEdBQUcsSUFBSSxDQUFDbEIsS0FBSyxDQUFDSyxhQUFhLGdCQUFBNUQsTUFBQSxDQUFlc0UsR0FBRyxHQUFHRCxHQUFDLHdCQUFBckUsTUFBQSxDQUFtQitGLEdBQUcsUUFBSSxDQUFDO1lBQ3RGdEIsS0FBSSxDQUFDbkUsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztVQUNyQztRQUNKO01BQ0o7TUFDQSxJQUFJLENBQUN1RCxXQUFXLEVBQUU7TUFDbEIsSUFBSSxJQUFJLENBQUNBLFdBQVcsSUFBSSxDQUFDLEVBQUU7UUFDdkIsSUFBSSxDQUFDSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDM0I7TUFDQSxPQUFPLElBQUk7SUFDZjtFQUFDO0lBQUF2RSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBb0csY0FBQSxFQUFnQjtNQUNaLE9BQU8sSUFBSSxDQUFDakMsaUJBQWlCO0lBQ2pDO0VBQUM7SUFBQXBFLEdBQUE7SUFBQUMsS0FBQSxFQUNELFNBQUFxRyxVQUFBLEVBQVk7TUFDUixJQUFJLENBQUNuQyxXQUFXLEVBQUU7O01BRWxCO01BQ0EsSUFBSSxJQUFJLENBQUNBLFdBQVcsS0FBSyxDQUFDLEVBQUU7UUFDeEI7UUFDQSxPQUFPRSxPQUFPLENBQUNDLE9BQU8sQ0FBQyxJQUFJLENBQUM7TUFDaEMsQ0FBQyxNQUFNO1FBQ0g7UUFDQSxPQUFPLElBQUlELE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUs7VUFDNUJxQixPQUFPLENBQUNDLEdBQUcsQ0FBQ3RCLE9BQU8sRUFBRSxjQUFjLENBQUM7UUFDeEMsQ0FBQyxDQUFDO01BQ047SUFDSjtFQUFDO0lBQUF0RSxHQUFBO0lBQUFDLEtBQUEsRUFDRCxTQUFBc0csSUFBQSxFQUFNO01BQ0YsT0FBTyxJQUFJbEMsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztRQUFFcUIsT0FBTyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUV0QixPQUFPLENBQUMsSUFBSSxDQUFDO01BQUMsQ0FBQyxDQUFDO0lBQ2xGO0VBQUM7SUFBQXRFLEdBQUE7SUFBQUMsS0FBQSxFQUNELFNBQUF1RyxJQUFBLEVBQU07TUFDRixPQUFPLElBQUluQyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO1FBQUVxQixPQUFPLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRXRCLE9BQU8sQ0FBQyxJQUFJLENBQUM7TUFBQyxDQUFDLENBQUM7SUFDbEY7RUFBQztJQUFBdEUsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQXdHLGFBQUEsRUFBZTtNQUNYLElBQU1DLGNBQWMsR0FBRyxJQUFJLENBQUNsRCxTQUFTLENBQUNtRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDOUMsSUFBTUMsTUFBTSxHQUFHRixjQUFjLENBQUNHLE1BQU0sQ0FBQyxVQUFBQyxJQUFJO1FBQUEsT0FBSUEsSUFBSSxLQUFLLEdBQUc7TUFBQSxFQUFDLENBQUN0SCxNQUFNO01BRWpFLElBQUlvSCxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ2I7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUEsT0FBTyxJQUFJO01BQ2YsQ0FBQyxNQUFNO1FBQ0g7UUFDQWpCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQixDQUFDO01BQ3BDO0lBRUo7RUFBQztJQUFBNUYsR0FBQTtJQUFBQyxLQUFBLEVBR0QsU0FBQThHLE1BQUEsRUFBUTtNQUNKLE9BQU8sSUFBSSxDQUFDN0Msa0JBQWtCO0lBQ2xDO0VBQUM7SUFBQWxFLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUErRyxpQkFBQSxFQUFtQjtNQUNmLElBQU1oRyxLQUFLLEdBQUcsQ0FDVjtRQUFFaUcsSUFBSSxFQUFFLFdBQVc7UUFBRXpILE1BQU0sRUFBRTtNQUFFLENBQUMsRUFDaEM7UUFBRXlILElBQUksRUFBRSxXQUFXO1FBQUV6SCxNQUFNLEVBQUU7TUFBRSxDQUFDLEVBQ2hDO1FBQUV5SCxJQUFJLEVBQUUsU0FBUztRQUFFekgsTUFBTSxFQUFFO01BQUUsQ0FBQyxDQUNqQztNQUVELFNBQUEwSCxHQUFBLE1BQUFDLE1BQUEsR0FBbUJuRyxLQUFLLEVBQUFrRyxHQUFBLEdBQUFDLE1BQUEsQ0FBQTNILE1BQUEsRUFBQTBILEdBQUEsSUFBRTtRQUFyQixJQUFNOUYsSUFBSSxHQUFBK0YsTUFBQSxDQUFBRCxHQUFBO1FBQ1gsSUFBSUUsTUFBTSxHQUFHLEtBQUs7UUFFbEIsT0FBTyxDQUFDQSxNQUFNLEVBQUU7VUFDWixJQUFNekMsR0FBRyxHQUFHakMsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQzJFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQ3pDLElBQU1qQixHQUFHLEdBQUcxRCxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDMkUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7VUFFekMsSUFBTUMsV0FBVyxHQUFHNUUsSUFBSSxDQUFDMkUsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUlqQixHQUFHLEdBQUdoRixJQUFJLENBQUM1QixNQUFNLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHO1VBRTdFLElBQUksSUFBSSxDQUFDMkQsU0FBUyxDQUFDLElBQUk3RCxtREFBSSxDQUFDZ0ksV0FBVyxFQUFFbEcsSUFBSSxDQUFDNUIsTUFBTSxFQUFFLENBQUNtRixHQUFHLEVBQUV5QixHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3ZFZ0IsTUFBTSxHQUFHLElBQUk7VUFDakI7UUFFSjtNQUNKO0lBQ0o7RUFBQztJQUFBcEgsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQXNILG9CQUFBLEVBQXNCO01BQUEsSUFBQUMsTUFBQTtNQUNsQixPQUFPLElBQUluRCxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO1FBQzVCLElBQU1tRCx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQXdCQSxDQUFBLEVBQVM7VUFDbkMsSUFBTTlDLEdBQUcsR0FBR2pDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUMyRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUN6QyxJQUFNakIsR0FBRyxHQUFHMUQsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQzJFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQ3pDLE9BQU8sQ0FBQzFDLEdBQUcsRUFBRXlCLEdBQUcsQ0FBQztRQUNyQixDQUFDOztRQUVEO1FBQ0EsSUFBQXNCLHFCQUFBLEdBQW1CRCx3QkFBd0IsQ0FBQyxDQUFDO1VBQUFFLHNCQUFBLEdBQUF4QixjQUFBLENBQUF1QixxQkFBQTtVQUF0Qy9DLEdBQUcsR0FBQWdELHNCQUFBO1VBQUV2QixHQUFHLEdBQUF1QixzQkFBQTtRQUNmLElBQU03QyxJQUFJLEdBQUcwQyxNQUFJLENBQUM1RCxLQUFLLENBQUNLLGFBQWEsZ0JBQUE1RCxNQUFBLENBQWVzRSxHQUFHLHdCQUFBdEUsTUFBQSxDQUFtQitGLEdBQUcsUUFBSSxDQUFDOztRQUVsRjtRQUNBLElBQU13QixpQkFBaUIsTUFBQXZILE1BQUEsQ0FBTXNFLEdBQUcsT0FBQXRFLE1BQUEsQ0FBSStGLEdBQUcsQ0FBRTtRQUV6QyxJQUFJb0IsTUFBSSxDQUFDaEQsZUFBZSxDQUFDcUQsR0FBRyxDQUFDRCxpQkFBaUIsQ0FBQyxFQUFFO1VBQzdDakMsT0FBTyxDQUFDQyxHQUFHLENBQUMscUNBQXFDLENBQUM7VUFDbEQ7UUFDSjtRQUVBLElBQUk0QixNQUFJLENBQUNoRSxTQUFTLENBQUNtQixHQUFHLENBQUMsQ0FBQ3lCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtVQUNoQ29CLE1BQUksQ0FBQ2hFLFNBQVMsQ0FBQ21CLEdBQUcsQ0FBQyxDQUFDeUIsR0FBRyxDQUFDLEdBQUcsR0FBRztVQUM5QnRCLElBQUksQ0FBQ2dELEtBQUssQ0FBQ0MsVUFBVSxHQUFHLE9BQU8sRUFBRXBDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHdCQUF3QixFQUFFNEIsTUFBSSxDQUFDaEUsU0FBUyxDQUFDO1VBQ3RGYyxPQUFPLENBQUNrRCxNQUFJLENBQUNmLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxNQUFNO1VBQ0hkLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixFQUFFNEIsTUFBSSxDQUFDaEUsU0FBUyxDQUFDO1VBQ3REc0IsSUFBSSxDQUFDZ0QsS0FBSyxDQUFDQyxVQUFVLEdBQUcsTUFBTTtVQUM5QnpELE9BQU8sQ0FBQyxDQUFDO1FBQ2I7O1FBRUE7UUFDQWtELE1BQUksQ0FBQ2hELGVBQWUsQ0FBQzVELEdBQUcsQ0FBQ2dILGlCQUFpQixDQUFDO01BQy9DLENBQUMsQ0FBQztJQUNOO0VBQUM7SUFBQTVILEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUE0RixlQUFBLEVBQWlCO01BQUEsSUFBQW1DLE1BQUE7TUFDYixJQUFBQyxxQkFBQSxHQUFBOUIsY0FBQSxDQUFtQixJQUFJLENBQUNqQyxrQkFBa0I7UUFBbkNTLEdBQUcsR0FBQXNELHFCQUFBO1FBQUU3QixHQUFHLEdBQUE2QixxQkFBQTtNQUNmLElBQU1uRCxJQUFJLEdBQUcsSUFBSSxDQUFDbEIsS0FBSyxDQUFDSyxhQUFhLGdCQUFBNUQsTUFBQSxDQUFlc0UsR0FBRyx3QkFBQXRFLE1BQUEsQ0FBbUIrRixHQUFHLFFBQUksQ0FBQztNQUNsRixJQUFNd0IsaUJBQWlCLE1BQUF2SCxNQUFBLENBQU1zRSxHQUFHLE9BQUF0RSxNQUFBLENBQUkrRixHQUFHLENBQUU7TUFFekNULE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQzFCLGtCQUFrQixDQUFDO01BRXBDLE9BQU8sSUFBSUcsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBRTRELE1BQU0sRUFBSztRQUNwQyxJQUFJRixNQUFJLENBQUN4RCxlQUFlLENBQUNxRCxHQUFHLENBQUNELGlCQUFpQixDQUFDLEVBQUU7VUFDN0NNLE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBQztVQUM3QztRQUNKLENBQUMsTUFDSTtVQUNELElBQUlGLE1BQUksQ0FBQ3hFLFNBQVMsQ0FBQ21CLEdBQUcsQ0FBQyxDQUFDeUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDNEIsTUFBSSxDQUFDeEUsU0FBUyxDQUFDbUIsR0FBRyxDQUFDLENBQUN5QixHQUFHLENBQUMsR0FBRyxHQUFHO1lBRzlCVCxPQUFPLENBQUNDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRW9DLE1BQUksQ0FBQ3hFLFNBQVMsQ0FBQyxFQUFFc0IsSUFBSSxDQUFDZ0QsS0FBSyxDQUFDQyxVQUFVLEdBQUcsT0FBTztZQUNyRnpELE9BQU8sQ0FBQzBELE1BQUksQ0FBQ3ZCLFlBQVksQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDO1VBQzFDLENBQUMsTUFBTTtZQUNIZCxPQUFPLENBQUNDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRW9DLE1BQUksQ0FBQ3hFLFNBQVMsQ0FBQztZQUNyRHNCLElBQUksQ0FBQ2dELEtBQUssQ0FBQ0MsVUFBVSxHQUFHLE1BQU07WUFDOUJ6RCxPQUFPLENBQUMsQ0FBQztVQUNiO1VBRUEwRCxNQUFJLENBQUN4RCxlQUFlLENBQUM1RCxHQUFHLENBQUNnSCxpQkFBaUIsQ0FBQzs7VUFHM0M7UUFDSjtNQUNKLENBQUMsQ0FBQztJQUNOO0VBQUM7RUFBQSxPQUFBckgsU0FBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUMxUVUsU0FBUzRILFlBQVlBLENBQUNDLElBQUksRUFBRUMsWUFBWSxFQUFFO0VBQ3JELElBQU1DLE1BQU0sR0FBR3JILFFBQVEsQ0FBQzRDLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDL0N5RSxNQUFNLENBQUNDLFdBQVcsR0FBR0gsSUFBSTtFQUN6QkUsTUFBTSxDQUFDN0csZ0JBQWdCLENBQUMsT0FBTyxFQUFFNEcsWUFBWSxDQUFDO0VBQzlDcEgsUUFBUSxDQUFDTyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQzBELFdBQVcsQ0FBQ29ELE1BQU0sQ0FBQztBQUNuRTs7Ozs7O1VDTEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OzsrQ0NMQSxxSkFBQUUsbUJBQUEsWUFBQUEsb0JBQUEsV0FBQTlHLENBQUEsU0FBQStHLENBQUEsRUFBQS9HLENBQUEsT0FBQWdILENBQUEsR0FBQUMsTUFBQSxDQUFBQyxTQUFBLEVBQUFDLENBQUEsR0FBQUgsQ0FBQSxDQUFBSSxjQUFBLEVBQUFDLENBQUEsR0FBQUosTUFBQSxDQUFBSyxjQUFBLGNBQUFQLENBQUEsRUFBQS9HLENBQUEsRUFBQWdILENBQUEsSUFBQUQsQ0FBQSxDQUFBL0csQ0FBQSxJQUFBZ0gsQ0FBQSxDQUFBekksS0FBQSxLQUFBeUUsQ0FBQSx3QkFBQXVFLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUF4RSxDQUFBLENBQUF5RSxRQUFBLGtCQUFBQyxDQUFBLEdBQUExRSxDQUFBLENBQUEyRSxhQUFBLHVCQUFBQyxDQUFBLEdBQUE1RSxDQUFBLENBQUE2RSxXQUFBLDhCQUFBQyxPQUFBZixDQUFBLEVBQUEvRyxDQUFBLEVBQUFnSCxDQUFBLFdBQUFDLE1BQUEsQ0FBQUssY0FBQSxDQUFBUCxDQUFBLEVBQUEvRyxDQUFBLElBQUF6QixLQUFBLEVBQUF5SSxDQUFBLEVBQUFlLFVBQUEsTUFBQUMsWUFBQSxNQUFBQyxRQUFBLFNBQUFsQixDQUFBLENBQUEvRyxDQUFBLFdBQUE4SCxNQUFBLG1CQUFBZixDQUFBLElBQUFlLE1BQUEsWUFBQUEsT0FBQWYsQ0FBQSxFQUFBL0csQ0FBQSxFQUFBZ0gsQ0FBQSxXQUFBRCxDQUFBLENBQUEvRyxDQUFBLElBQUFnSCxDQUFBLGdCQUFBa0IsS0FBQW5CLENBQUEsRUFBQS9HLENBQUEsRUFBQWdILENBQUEsRUFBQUcsQ0FBQSxRQUFBbkUsQ0FBQSxHQUFBaEQsQ0FBQSxJQUFBQSxDQUFBLENBQUFrSCxTQUFBLFlBQUFpQixTQUFBLEdBQUFuSSxDQUFBLEdBQUFtSSxTQUFBLEVBQUFYLENBQUEsR0FBQVAsTUFBQSxDQUFBbUIsTUFBQSxDQUFBcEYsQ0FBQSxDQUFBa0UsU0FBQSxHQUFBUSxDQUFBLE9BQUFXLE9BQUEsQ0FBQWxCLENBQUEsZ0JBQUFFLENBQUEsQ0FBQUcsQ0FBQSxlQUFBakosS0FBQSxFQUFBK0osZ0JBQUEsQ0FBQXZCLENBQUEsRUFBQUMsQ0FBQSxFQUFBVSxDQUFBLE1BQUFGLENBQUEsYUFBQWUsU0FBQXhCLENBQUEsRUFBQS9HLENBQUEsRUFBQWdILENBQUEsbUJBQUF6QixJQUFBLFlBQUFpRCxHQUFBLEVBQUF6QixDQUFBLENBQUEwQixJQUFBLENBQUF6SSxDQUFBLEVBQUFnSCxDQUFBLGNBQUFELENBQUEsYUFBQXhCLElBQUEsV0FBQWlELEdBQUEsRUFBQXpCLENBQUEsUUFBQS9HLENBQUEsQ0FBQWtJLElBQUEsR0FBQUEsSUFBQSxNQUFBUSxDQUFBLHFCQUFBQyxDQUFBLHFCQUFBQyxDQUFBLGdCQUFBQyxDQUFBLGdCQUFBakksQ0FBQSxnQkFBQXVILFVBQUEsY0FBQVcsa0JBQUEsY0FBQUMsMkJBQUEsU0FBQUMsQ0FBQSxPQUFBbEIsTUFBQSxDQUFBa0IsQ0FBQSxFQUFBeEIsQ0FBQSxxQ0FBQXlCLENBQUEsR0FBQWhDLE1BQUEsQ0FBQWlDLGNBQUEsRUFBQUMsQ0FBQSxHQUFBRixDQUFBLElBQUFBLENBQUEsQ0FBQUEsQ0FBQSxDQUFBRyxNQUFBLFFBQUFELENBQUEsSUFBQUEsQ0FBQSxLQUFBbkMsQ0FBQSxJQUFBRyxDQUFBLENBQUFzQixJQUFBLENBQUFVLENBQUEsRUFBQTNCLENBQUEsTUFBQXdCLENBQUEsR0FBQUcsQ0FBQSxPQUFBRSxDQUFBLEdBQUFOLDBCQUFBLENBQUE3QixTQUFBLEdBQUFpQixTQUFBLENBQUFqQixTQUFBLEdBQUFELE1BQUEsQ0FBQW1CLE1BQUEsQ0FBQVksQ0FBQSxZQUFBTSxzQkFBQXZDLENBQUEsZ0NBQUF0SCxPQUFBLFdBQUFPLENBQUEsSUFBQThILE1BQUEsQ0FBQWYsQ0FBQSxFQUFBL0csQ0FBQSxZQUFBK0csQ0FBQSxnQkFBQXdDLE9BQUEsQ0FBQXZKLENBQUEsRUFBQStHLENBQUEsc0JBQUF5QyxjQUFBekMsQ0FBQSxFQUFBL0csQ0FBQSxhQUFBeUosT0FBQXpDLENBQUEsRUFBQUssQ0FBQSxFQUFBckUsQ0FBQSxFQUFBd0UsQ0FBQSxRQUFBRSxDQUFBLEdBQUFhLFFBQUEsQ0FBQXhCLENBQUEsQ0FBQUMsQ0FBQSxHQUFBRCxDQUFBLEVBQUFNLENBQUEsbUJBQUFLLENBQUEsQ0FBQW5DLElBQUEsUUFBQXFDLENBQUEsR0FBQUYsQ0FBQSxDQUFBYyxHQUFBLEVBQUFFLENBQUEsR0FBQWQsQ0FBQSxDQUFBckosS0FBQSxTQUFBbUssQ0FBQSxnQkFBQWdCLE9BQUEsQ0FBQWhCLENBQUEsS0FBQXZCLENBQUEsQ0FBQXNCLElBQUEsQ0FBQUMsQ0FBQSxlQUFBMUksQ0FBQSxDQUFBNEMsT0FBQSxDQUFBOEYsQ0FBQSxDQUFBaUIsT0FBQSxFQUFBQyxJQUFBLFdBQUE3QyxDQUFBLElBQUEwQyxNQUFBLFNBQUExQyxDQUFBLEVBQUEvRCxDQUFBLEVBQUF3RSxDQUFBLGdCQUFBVCxDQUFBLElBQUEwQyxNQUFBLFVBQUExQyxDQUFBLEVBQUEvRCxDQUFBLEVBQUF3RSxDQUFBLFFBQUF4SCxDQUFBLENBQUE0QyxPQUFBLENBQUE4RixDQUFBLEVBQUFrQixJQUFBLFdBQUE3QyxDQUFBLElBQUFhLENBQUEsQ0FBQXJKLEtBQUEsR0FBQXdJLENBQUEsRUFBQS9ELENBQUEsQ0FBQTRFLENBQUEsZ0JBQUFiLENBQUEsV0FBQTBDLE1BQUEsVUFBQTFDLENBQUEsRUFBQS9ELENBQUEsRUFBQXdFLENBQUEsU0FBQUEsQ0FBQSxDQUFBRSxDQUFBLENBQUFjLEdBQUEsU0FBQXhCLENBQUEsRUFBQUssQ0FBQSxvQkFBQTlJLEtBQUEsV0FBQUEsTUFBQXdJLENBQUEsRUFBQUksQ0FBQSxhQUFBMEMsMkJBQUEsZUFBQTdKLENBQUEsV0FBQUEsQ0FBQSxFQUFBZ0gsQ0FBQSxJQUFBeUMsTUFBQSxDQUFBMUMsQ0FBQSxFQUFBSSxDQUFBLEVBQUFuSCxDQUFBLEVBQUFnSCxDQUFBLGdCQUFBQSxDQUFBLEdBQUFBLENBQUEsR0FBQUEsQ0FBQSxDQUFBNEMsSUFBQSxDQUFBQywwQkFBQSxFQUFBQSwwQkFBQSxJQUFBQSwwQkFBQSxxQkFBQXZCLGlCQUFBdEksQ0FBQSxFQUFBZ0gsQ0FBQSxFQUFBRyxDQUFBLFFBQUFFLENBQUEsR0FBQXFCLENBQUEsbUJBQUExRixDQUFBLEVBQUF3RSxDQUFBLFFBQUFILENBQUEsS0FBQXVCLENBQUEsWUFBQWtCLEtBQUEsc0NBQUF6QyxDQUFBLEtBQUF3QixDQUFBLG9CQUFBN0YsQ0FBQSxRQUFBd0UsQ0FBQSxXQUFBakosS0FBQSxFQUFBd0ksQ0FBQSxFQUFBZ0QsSUFBQSxlQUFBNUMsQ0FBQSxDQUFBNkMsTUFBQSxHQUFBaEgsQ0FBQSxFQUFBbUUsQ0FBQSxDQUFBcUIsR0FBQSxHQUFBaEIsQ0FBQSxVQUFBRSxDQUFBLEdBQUFQLENBQUEsQ0FBQThDLFFBQUEsTUFBQXZDLENBQUEsUUFBQUUsQ0FBQSxHQUFBc0MsbUJBQUEsQ0FBQXhDLENBQUEsRUFBQVAsQ0FBQSxPQUFBUyxDQUFBLFFBQUFBLENBQUEsS0FBQWhILENBQUEsbUJBQUFnSCxDQUFBLHFCQUFBVCxDQUFBLENBQUE2QyxNQUFBLEVBQUE3QyxDQUFBLENBQUFnRCxJQUFBLEdBQUFoRCxDQUFBLENBQUFpRCxLQUFBLEdBQUFqRCxDQUFBLENBQUFxQixHQUFBLHNCQUFBckIsQ0FBQSxDQUFBNkMsTUFBQSxRQUFBM0MsQ0FBQSxLQUFBcUIsQ0FBQSxRQUFBckIsQ0FBQSxHQUFBd0IsQ0FBQSxFQUFBMUIsQ0FBQSxDQUFBcUIsR0FBQSxFQUFBckIsQ0FBQSxDQUFBa0QsaUJBQUEsQ0FBQWxELENBQUEsQ0FBQXFCLEdBQUEsdUJBQUFyQixDQUFBLENBQUE2QyxNQUFBLElBQUE3QyxDQUFBLENBQUFtRCxNQUFBLFdBQUFuRCxDQUFBLENBQUFxQixHQUFBLEdBQUFuQixDQUFBLEdBQUF1QixDQUFBLE1BQUFJLENBQUEsR0FBQVQsUUFBQSxDQUFBdkksQ0FBQSxFQUFBZ0gsQ0FBQSxFQUFBRyxDQUFBLG9CQUFBNkIsQ0FBQSxDQUFBekQsSUFBQSxRQUFBOEIsQ0FBQSxHQUFBRixDQUFBLENBQUE0QyxJQUFBLEdBQUFsQixDQUFBLEdBQUFGLENBQUEsRUFBQUssQ0FBQSxDQUFBUixHQUFBLEtBQUE1SCxDQUFBLHFCQUFBckMsS0FBQSxFQUFBeUssQ0FBQSxDQUFBUixHQUFBLEVBQUF1QixJQUFBLEVBQUE1QyxDQUFBLENBQUE0QyxJQUFBLGtCQUFBZixDQUFBLENBQUF6RCxJQUFBLEtBQUE4QixDQUFBLEdBQUF3QixDQUFBLEVBQUExQixDQUFBLENBQUE2QyxNQUFBLFlBQUE3QyxDQUFBLENBQUFxQixHQUFBLEdBQUFRLENBQUEsQ0FBQVIsR0FBQSxtQkFBQTBCLG9CQUFBbEssQ0FBQSxFQUFBZ0gsQ0FBQSxRQUFBRyxDQUFBLEdBQUFILENBQUEsQ0FBQWdELE1BQUEsRUFBQTNDLENBQUEsR0FBQXJILENBQUEsQ0FBQXlILFFBQUEsQ0FBQU4sQ0FBQSxPQUFBRSxDQUFBLEtBQUFOLENBQUEsU0FBQUMsQ0FBQSxDQUFBaUQsUUFBQSxxQkFBQTlDLENBQUEsSUFBQW5ILENBQUEsQ0FBQXlILFFBQUEsZUFBQVQsQ0FBQSxDQUFBZ0QsTUFBQSxhQUFBaEQsQ0FBQSxDQUFBd0IsR0FBQSxHQUFBekIsQ0FBQSxFQUFBbUQsbUJBQUEsQ0FBQWxLLENBQUEsRUFBQWdILENBQUEsZUFBQUEsQ0FBQSxDQUFBZ0QsTUFBQSxrQkFBQTdDLENBQUEsS0FBQUgsQ0FBQSxDQUFBZ0QsTUFBQSxZQUFBaEQsQ0FBQSxDQUFBd0IsR0FBQSxPQUFBK0IsU0FBQSx1Q0FBQXBELENBQUEsaUJBQUF2RyxDQUFBLE1BQUFvQyxDQUFBLEdBQUF1RixRQUFBLENBQUFsQixDQUFBLEVBQUFySCxDQUFBLENBQUF5SCxRQUFBLEVBQUFULENBQUEsQ0FBQXdCLEdBQUEsbUJBQUF4RixDQUFBLENBQUF1QyxJQUFBLFNBQUF5QixDQUFBLENBQUFnRCxNQUFBLFlBQUFoRCxDQUFBLENBQUF3QixHQUFBLEdBQUF4RixDQUFBLENBQUF3RixHQUFBLEVBQUF4QixDQUFBLENBQUFpRCxRQUFBLFNBQUFySixDQUFBLE1BQUE0RyxDQUFBLEdBQUF4RSxDQUFBLENBQUF3RixHQUFBLFNBQUFoQixDQUFBLEdBQUFBLENBQUEsQ0FBQXVDLElBQUEsSUFBQS9DLENBQUEsQ0FBQWhILENBQUEsQ0FBQXdLLFVBQUEsSUFBQWhELENBQUEsQ0FBQWpKLEtBQUEsRUFBQXlJLENBQUEsQ0FBQXlELElBQUEsR0FBQXpLLENBQUEsQ0FBQTBLLE9BQUEsZUFBQTFELENBQUEsQ0FBQWdELE1BQUEsS0FBQWhELENBQUEsQ0FBQWdELE1BQUEsV0FBQWhELENBQUEsQ0FBQXdCLEdBQUEsR0FBQXpCLENBQUEsR0FBQUMsQ0FBQSxDQUFBaUQsUUFBQSxTQUFBckosQ0FBQSxJQUFBNEcsQ0FBQSxJQUFBUixDQUFBLENBQUFnRCxNQUFBLFlBQUFoRCxDQUFBLENBQUF3QixHQUFBLE9BQUErQixTQUFBLHNDQUFBdkQsQ0FBQSxDQUFBaUQsUUFBQSxTQUFBckosQ0FBQSxjQUFBK0osYUFBQTVELENBQUEsUUFBQS9HLENBQUEsS0FBQTRLLE1BQUEsRUFBQTdELENBQUEsWUFBQUEsQ0FBQSxLQUFBL0csQ0FBQSxDQUFBNkssUUFBQSxHQUFBOUQsQ0FBQSxXQUFBQSxDQUFBLEtBQUEvRyxDQUFBLENBQUE4SyxVQUFBLEdBQUEvRCxDQUFBLEtBQUEvRyxDQUFBLENBQUErSyxRQUFBLEdBQUFoRSxDQUFBLFdBQUFpRSxVQUFBLENBQUFDLElBQUEsQ0FBQWpMLENBQUEsY0FBQWtMLGNBQUFuRSxDQUFBLFFBQUEvRyxDQUFBLEdBQUErRyxDQUFBLENBQUFvRSxVQUFBLFFBQUFuTCxDQUFBLENBQUF1RixJQUFBLG9CQUFBdkYsQ0FBQSxDQUFBd0ksR0FBQSxFQUFBekIsQ0FBQSxDQUFBb0UsVUFBQSxHQUFBbkwsQ0FBQSxhQUFBcUksUUFBQXRCLENBQUEsU0FBQWlFLFVBQUEsTUFBQUosTUFBQSxhQUFBN0QsQ0FBQSxDQUFBdEgsT0FBQSxDQUFBa0wsWUFBQSxjQUFBUyxLQUFBLGlCQUFBaEMsT0FBQXBKLENBQUEsUUFBQUEsQ0FBQSxXQUFBQSxDQUFBLFFBQUFnSCxDQUFBLEdBQUFoSCxDQUFBLENBQUF3SCxDQUFBLE9BQUFSLENBQUEsU0FBQUEsQ0FBQSxDQUFBeUIsSUFBQSxDQUFBekksQ0FBQSw0QkFBQUEsQ0FBQSxDQUFBeUssSUFBQSxTQUFBekssQ0FBQSxPQUFBcUwsS0FBQSxDQUFBckwsQ0FBQSxDQUFBbEMsTUFBQSxTQUFBdUosQ0FBQSxPQUFBckUsQ0FBQSxZQUFBeUgsS0FBQSxhQUFBcEQsQ0FBQSxHQUFBckgsQ0FBQSxDQUFBbEMsTUFBQSxPQUFBcUosQ0FBQSxDQUFBc0IsSUFBQSxDQUFBekksQ0FBQSxFQUFBcUgsQ0FBQSxVQUFBb0QsSUFBQSxDQUFBbE0sS0FBQSxHQUFBeUIsQ0FBQSxDQUFBcUgsQ0FBQSxHQUFBb0QsSUFBQSxDQUFBVixJQUFBLE9BQUFVLElBQUEsU0FBQUEsSUFBQSxDQUFBbE0sS0FBQSxHQUFBd0ksQ0FBQSxFQUFBMEQsSUFBQSxDQUFBVixJQUFBLE9BQUFVLElBQUEsWUFBQXpILENBQUEsQ0FBQXlILElBQUEsR0FBQXpILENBQUEsZ0JBQUF1SCxTQUFBLENBQUFiLE9BQUEsQ0FBQTFKLENBQUEsa0NBQUE4SSxpQkFBQSxDQUFBNUIsU0FBQSxHQUFBNkIsMEJBQUEsRUFBQTFCLENBQUEsQ0FBQWdDLENBQUEsbUJBQUE5SyxLQUFBLEVBQUF3SywwQkFBQSxFQUFBZixZQUFBLFNBQUFYLENBQUEsQ0FBQTBCLDBCQUFBLG1CQUFBeEssS0FBQSxFQUFBdUssaUJBQUEsRUFBQWQsWUFBQSxTQUFBYyxpQkFBQSxDQUFBd0MsV0FBQSxHQUFBeEQsTUFBQSxDQUFBaUIsMEJBQUEsRUFBQW5CLENBQUEsd0JBQUE1SCxDQUFBLENBQUF1TCxtQkFBQSxhQUFBeEUsQ0FBQSxRQUFBL0csQ0FBQSx3QkFBQStHLENBQUEsSUFBQUEsQ0FBQSxDQUFBeUUsV0FBQSxXQUFBeEwsQ0FBQSxLQUFBQSxDQUFBLEtBQUE4SSxpQkFBQSw2QkFBQTlJLENBQUEsQ0FBQXNMLFdBQUEsSUFBQXRMLENBQUEsQ0FBQS9CLElBQUEsT0FBQStCLENBQUEsQ0FBQXlMLElBQUEsYUFBQTFFLENBQUEsV0FBQUUsTUFBQSxDQUFBeUUsY0FBQSxHQUFBekUsTUFBQSxDQUFBeUUsY0FBQSxDQUFBM0UsQ0FBQSxFQUFBZ0MsMEJBQUEsS0FBQWhDLENBQUEsQ0FBQTRFLFNBQUEsR0FBQTVDLDBCQUFBLEVBQUFqQixNQUFBLENBQUFmLENBQUEsRUFBQWEsQ0FBQSx5QkFBQWIsQ0FBQSxDQUFBRyxTQUFBLEdBQUFELE1BQUEsQ0FBQW1CLE1BQUEsQ0FBQWlCLENBQUEsR0FBQXRDLENBQUEsS0FBQS9HLENBQUEsQ0FBQTRMLEtBQUEsYUFBQTdFLENBQUEsYUFBQTRDLE9BQUEsRUFBQTVDLENBQUEsT0FBQXVDLHFCQUFBLENBQUFFLGFBQUEsQ0FBQXRDLFNBQUEsR0FBQVksTUFBQSxDQUFBMEIsYUFBQSxDQUFBdEMsU0FBQSxFQUFBUSxDQUFBLGlDQUFBMUgsQ0FBQSxDQUFBd0osYUFBQSxHQUFBQSxhQUFBLEVBQUF4SixDQUFBLENBQUE2TCxLQUFBLGFBQUE5RSxDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBRSxDQUFBLEVBQUFyRSxDQUFBLGVBQUFBLENBQUEsS0FBQUEsQ0FBQSxHQUFBTCxPQUFBLE9BQUE2RSxDQUFBLE9BQUFnQyxhQUFBLENBQUF0QixJQUFBLENBQUFuQixDQUFBLEVBQUFDLENBQUEsRUFBQUcsQ0FBQSxFQUFBRSxDQUFBLEdBQUFyRSxDQUFBLFVBQUFoRCxDQUFBLENBQUF1TCxtQkFBQSxDQUFBdkUsQ0FBQSxJQUFBUSxDQUFBLEdBQUFBLENBQUEsQ0FBQWlELElBQUEsR0FBQWIsSUFBQSxXQUFBN0MsQ0FBQSxXQUFBQSxDQUFBLENBQUFnRCxJQUFBLEdBQUFoRCxDQUFBLENBQUF4SSxLQUFBLEdBQUFpSixDQUFBLENBQUFpRCxJQUFBLFdBQUFuQixxQkFBQSxDQUFBRCxDQUFBLEdBQUF2QixNQUFBLENBQUF1QixDQUFBLEVBQUF6QixDQUFBLGdCQUFBRSxNQUFBLENBQUF1QixDQUFBLEVBQUE3QixDQUFBLGlDQUFBTSxNQUFBLENBQUF1QixDQUFBLDZEQUFBckosQ0FBQSxDQUFBOEwsSUFBQSxhQUFBL0UsQ0FBQSxRQUFBL0csQ0FBQSxHQUFBaUgsTUFBQSxDQUFBRixDQUFBLEdBQUFDLENBQUEsZ0JBQUFHLENBQUEsSUFBQW5ILENBQUEsRUFBQWdILENBQUEsQ0FBQWlFLElBQUEsQ0FBQTlELENBQUEsVUFBQUgsQ0FBQSxDQUFBK0UsT0FBQSxhQUFBdEIsS0FBQSxXQUFBekQsQ0FBQSxDQUFBbEosTUFBQSxTQUFBaUosQ0FBQSxHQUFBQyxDQUFBLENBQUFnRixHQUFBLFFBQUFqRixDQUFBLElBQUEvRyxDQUFBLFNBQUF5SyxJQUFBLENBQUFsTSxLQUFBLEdBQUF3SSxDQUFBLEVBQUEwRCxJQUFBLENBQUFWLElBQUEsT0FBQVUsSUFBQSxXQUFBQSxJQUFBLENBQUFWLElBQUEsT0FBQVUsSUFBQSxRQUFBekssQ0FBQSxDQUFBb0osTUFBQSxHQUFBQSxNQUFBLEVBQUFmLE9BQUEsQ0FBQW5CLFNBQUEsS0FBQXNFLFdBQUEsRUFBQW5ELE9BQUEsRUFBQStDLEtBQUEsV0FBQUEsTUFBQXBMLENBQUEsYUFBQWlNLElBQUEsV0FBQXhCLElBQUEsV0FBQU4sSUFBQSxRQUFBQyxLQUFBLEdBQUFyRCxDQUFBLE9BQUFnRCxJQUFBLFlBQUFFLFFBQUEsY0FBQUQsTUFBQSxnQkFBQXhCLEdBQUEsR0FBQXpCLENBQUEsT0FBQWlFLFVBQUEsQ0FBQXZMLE9BQUEsQ0FBQXlMLGFBQUEsSUFBQWxMLENBQUEsV0FBQWdILENBQUEsa0JBQUFBLENBQUEsQ0FBQWtGLE1BQUEsT0FBQS9FLENBQUEsQ0FBQXNCLElBQUEsT0FBQXpCLENBQUEsTUFBQXFFLEtBQUEsRUFBQXJFLENBQUEsQ0FBQW1GLEtBQUEsY0FBQW5GLENBQUEsSUFBQUQsQ0FBQSxNQUFBcUYsSUFBQSxXQUFBQSxLQUFBLFNBQUFyQyxJQUFBLFdBQUFoRCxDQUFBLFFBQUFpRSxVQUFBLElBQUFHLFVBQUEsa0JBQUFwRSxDQUFBLENBQUF4QixJQUFBLFFBQUF3QixDQUFBLENBQUF5QixHQUFBLGNBQUE2RCxJQUFBLEtBQUFoQyxpQkFBQSxXQUFBQSxrQkFBQXJLLENBQUEsYUFBQStKLElBQUEsUUFBQS9KLENBQUEsTUFBQWdILENBQUEsa0JBQUFzRixPQUFBbkYsQ0FBQSxFQUFBRSxDQUFBLFdBQUFHLENBQUEsQ0FBQWpDLElBQUEsWUFBQWlDLENBQUEsQ0FBQWdCLEdBQUEsR0FBQXhJLENBQUEsRUFBQWdILENBQUEsQ0FBQXlELElBQUEsR0FBQXRELENBQUEsRUFBQUUsQ0FBQSxLQUFBTCxDQUFBLENBQUFnRCxNQUFBLFdBQUFoRCxDQUFBLENBQUF3QixHQUFBLEdBQUF6QixDQUFBLEtBQUFNLENBQUEsYUFBQUEsQ0FBQSxRQUFBMkQsVUFBQSxDQUFBbE4sTUFBQSxNQUFBdUosQ0FBQSxTQUFBQSxDQUFBLFFBQUFyRSxDQUFBLFFBQUFnSSxVQUFBLENBQUEzRCxDQUFBLEdBQUFHLENBQUEsR0FBQXhFLENBQUEsQ0FBQW1JLFVBQUEsaUJBQUFuSSxDQUFBLENBQUE0SCxNQUFBLFNBQUEwQixNQUFBLGFBQUF0SixDQUFBLENBQUE0SCxNQUFBLFNBQUFxQixJQUFBLFFBQUF2RSxDQUFBLEdBQUFQLENBQUEsQ0FBQXNCLElBQUEsQ0FBQXpGLENBQUEsZUFBQTRFLENBQUEsR0FBQVQsQ0FBQSxDQUFBc0IsSUFBQSxDQUFBekYsQ0FBQSxxQkFBQTBFLENBQUEsSUFBQUUsQ0FBQSxhQUFBcUUsSUFBQSxHQUFBakosQ0FBQSxDQUFBNkgsUUFBQSxTQUFBeUIsTUFBQSxDQUFBdEosQ0FBQSxDQUFBNkgsUUFBQSxnQkFBQW9CLElBQUEsR0FBQWpKLENBQUEsQ0FBQThILFVBQUEsU0FBQXdCLE1BQUEsQ0FBQXRKLENBQUEsQ0FBQThILFVBQUEsY0FBQXBELENBQUEsYUFBQXVFLElBQUEsR0FBQWpKLENBQUEsQ0FBQTZILFFBQUEsU0FBQXlCLE1BQUEsQ0FBQXRKLENBQUEsQ0FBQTZILFFBQUEscUJBQUFqRCxDQUFBLFlBQUFrQyxLQUFBLHFEQUFBbUMsSUFBQSxHQUFBakosQ0FBQSxDQUFBOEgsVUFBQSxTQUFBd0IsTUFBQSxDQUFBdEosQ0FBQSxDQUFBOEgsVUFBQSxZQUFBUixNQUFBLFdBQUFBLE9BQUF2RCxDQUFBLEVBQUEvRyxDQUFBLGFBQUFnSCxDQUFBLFFBQUFnRSxVQUFBLENBQUFsTixNQUFBLE1BQUFrSixDQUFBLFNBQUFBLENBQUEsUUFBQUssQ0FBQSxRQUFBMkQsVUFBQSxDQUFBaEUsQ0FBQSxPQUFBSyxDQUFBLENBQUF1RCxNQUFBLFNBQUFxQixJQUFBLElBQUE5RSxDQUFBLENBQUFzQixJQUFBLENBQUFwQixDQUFBLHdCQUFBNEUsSUFBQSxHQUFBNUUsQ0FBQSxDQUFBeUQsVUFBQSxRQUFBOUgsQ0FBQSxHQUFBcUUsQ0FBQSxhQUFBckUsQ0FBQSxpQkFBQStELENBQUEsbUJBQUFBLENBQUEsS0FBQS9ELENBQUEsQ0FBQTRILE1BQUEsSUFBQTVLLENBQUEsSUFBQUEsQ0FBQSxJQUFBZ0QsQ0FBQSxDQUFBOEgsVUFBQSxLQUFBOUgsQ0FBQSxjQUFBd0UsQ0FBQSxHQUFBeEUsQ0FBQSxHQUFBQSxDQUFBLENBQUFtSSxVQUFBLGNBQUEzRCxDQUFBLENBQUFqQyxJQUFBLEdBQUF3QixDQUFBLEVBQUFTLENBQUEsQ0FBQWdCLEdBQUEsR0FBQXhJLENBQUEsRUFBQWdELENBQUEsU0FBQWdILE1BQUEsZ0JBQUFTLElBQUEsR0FBQXpILENBQUEsQ0FBQThILFVBQUEsRUFBQWxLLENBQUEsU0FBQTJMLFFBQUEsQ0FBQS9FLENBQUEsTUFBQStFLFFBQUEsV0FBQUEsU0FBQXhGLENBQUEsRUFBQS9HLENBQUEsb0JBQUErRyxDQUFBLENBQUF4QixJQUFBLFFBQUF3QixDQUFBLENBQUF5QixHQUFBLHFCQUFBekIsQ0FBQSxDQUFBeEIsSUFBQSxtQkFBQXdCLENBQUEsQ0FBQXhCLElBQUEsUUFBQWtGLElBQUEsR0FBQTFELENBQUEsQ0FBQXlCLEdBQUEsZ0JBQUF6QixDQUFBLENBQUF4QixJQUFBLFNBQUE4RyxJQUFBLFFBQUE3RCxHQUFBLEdBQUF6QixDQUFBLENBQUF5QixHQUFBLE9BQUF3QixNQUFBLGtCQUFBUyxJQUFBLHlCQUFBMUQsQ0FBQSxDQUFBeEIsSUFBQSxJQUFBdkYsQ0FBQSxVQUFBeUssSUFBQSxHQUFBekssQ0FBQSxHQUFBWSxDQUFBLEtBQUE0TCxNQUFBLFdBQUFBLE9BQUF6RixDQUFBLGFBQUEvRyxDQUFBLFFBQUFnTCxVQUFBLENBQUFsTixNQUFBLE1BQUFrQyxDQUFBLFNBQUFBLENBQUEsUUFBQWdILENBQUEsUUFBQWdFLFVBQUEsQ0FBQWhMLENBQUEsT0FBQWdILENBQUEsQ0FBQThELFVBQUEsS0FBQS9ELENBQUEsY0FBQXdGLFFBQUEsQ0FBQXZGLENBQUEsQ0FBQW1FLFVBQUEsRUFBQW5FLENBQUEsQ0FBQStELFFBQUEsR0FBQUcsYUFBQSxDQUFBbEUsQ0FBQSxHQUFBcEcsQ0FBQSx5QkFBQTZMLE9BQUExRixDQUFBLGFBQUEvRyxDQUFBLFFBQUFnTCxVQUFBLENBQUFsTixNQUFBLE1BQUFrQyxDQUFBLFNBQUFBLENBQUEsUUFBQWdILENBQUEsUUFBQWdFLFVBQUEsQ0FBQWhMLENBQUEsT0FBQWdILENBQUEsQ0FBQTRELE1BQUEsS0FBQTdELENBQUEsUUFBQUksQ0FBQSxHQUFBSCxDQUFBLENBQUFtRSxVQUFBLGtCQUFBaEUsQ0FBQSxDQUFBNUIsSUFBQSxRQUFBOEIsQ0FBQSxHQUFBRixDQUFBLENBQUFxQixHQUFBLEVBQUEwQyxhQUFBLENBQUFsRSxDQUFBLFlBQUFLLENBQUEsZ0JBQUF5QyxLQUFBLDhCQUFBNEMsYUFBQSxXQUFBQSxjQUFBMU0sQ0FBQSxFQUFBZ0gsQ0FBQSxFQUFBRyxDQUFBLGdCQUFBOEMsUUFBQSxLQUFBeEMsUUFBQSxFQUFBMkIsTUFBQSxDQUFBcEosQ0FBQSxHQUFBd0ssVUFBQSxFQUFBeEQsQ0FBQSxFQUFBMEQsT0FBQSxFQUFBdkQsQ0FBQSxvQkFBQTZDLE1BQUEsVUFBQXhCLEdBQUEsR0FBQXpCLENBQUEsR0FBQW5HLENBQUEsT0FBQVosQ0FBQTtBQUFBLFNBQUEyTSxtQkFBQUMsR0FBQSxFQUFBaEssT0FBQSxFQUFBNEQsTUFBQSxFQUFBcUcsS0FBQSxFQUFBQyxNQUFBLEVBQUF4TyxHQUFBLEVBQUFrSyxHQUFBLGNBQUF1RSxJQUFBLEdBQUFILEdBQUEsQ0FBQXRPLEdBQUEsRUFBQWtLLEdBQUEsT0FBQWpLLEtBQUEsR0FBQXdPLElBQUEsQ0FBQXhPLEtBQUEsV0FBQXlPLEtBQUEsSUFBQXhHLE1BQUEsQ0FBQXdHLEtBQUEsaUJBQUFELElBQUEsQ0FBQWhELElBQUEsSUFBQW5ILE9BQUEsQ0FBQXJFLEtBQUEsWUFBQW9FLE9BQUEsQ0FBQUMsT0FBQSxDQUFBckUsS0FBQSxFQUFBcUwsSUFBQSxDQUFBaUQsS0FBQSxFQUFBQyxNQUFBO0FBQUEsU0FBQUcsa0JBQUFDLEVBQUEsNkJBQUFDLElBQUEsU0FBQUMsSUFBQSxHQUFBOUksU0FBQSxhQUFBM0IsT0FBQSxXQUFBQyxPQUFBLEVBQUE0RCxNQUFBLFFBQUFvRyxHQUFBLEdBQUFNLEVBQUEsQ0FBQUcsS0FBQSxDQUFBRixJQUFBLEVBQUFDLElBQUEsWUFBQVAsTUFBQXRPLEtBQUEsSUFBQW9PLGtCQUFBLENBQUFDLEdBQUEsRUFBQWhLLE9BQUEsRUFBQTRELE1BQUEsRUFBQXFHLEtBQUEsRUFBQUMsTUFBQSxVQUFBdk8sS0FBQSxjQUFBdU8sT0FBQVEsR0FBQSxJQUFBWCxrQkFBQSxDQUFBQyxHQUFBLEVBQUFoSyxPQUFBLEVBQUE0RCxNQUFBLEVBQUFxRyxLQUFBLEVBQUFDLE1BQUEsV0FBQVEsR0FBQSxLQUFBVCxLQUFBLENBQUF0SSxTQUFBO0FBRHVDO0FBQ1U7QUFDVDtBQUV4QyxJQUFJbkYsT0FBTztBQUFDLElBQUFtTyxpQkFBQSxHQUNXcE8sOERBQWdCLENBQUMsQ0FBQztBQUE5QkMsT0FBTyxHQUFBbU8saUJBQUEsQ0FBZjVMLE1BQU07QUFJVCxJQUFNOUIsSUFBSSxHQUFHTixRQUFRLENBQUNPLGNBQWMsQ0FBQyxNQUFNLENBQUM7QUFDNUMsSUFBSTBOLGNBQWM7QUFDbEIsSUFBTUMsY0FBYyxHQUFHbE8sUUFBUSxDQUFDTyxjQUFjLENBQUMsaUJBQWlCLENBQUM7QUFFakUyTixjQUFjLENBQUMxTixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVWdFLEtBQUssRUFBRTtFQUN0RCxJQUFNMkosa0JBQWtCLEdBQUczSixLQUFLLENBQUNyQyxNQUFNLENBQUNpTSxPQUFPLENBQUMsZUFBZSxDQUFDO0VBRWhFLElBQUlELGtCQUFrQixFQUFFO0lBQ3BCLElBQU1FLFdBQVcsR0FBR0Ysa0JBQWtCLENBQUNDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDdkQsSUFBTUUsZ0JBQWdCLEdBQUdILGtCQUFrQixDQUFDcE4sWUFBWSxDQUFDLFlBQVksQ0FBQztJQUV0RW9OLGtCQUFrQixDQUFDMU8sWUFBWSxDQUFDLFlBQVksRUFBRTZPLGdCQUFnQixLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25GSCxrQkFBa0IsQ0FBQzdHLFdBQVcsR0FBR2dILGdCQUFnQixLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztJQUVyRUQsV0FBVyxDQUFDNU8sWUFBWSxDQUFDLFlBQVksRUFBRTZPLGdCQUFnQixLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0VBQ2hGO0VBQ0E1SixPQUFPLENBQUNDLEdBQUcsQ0FBQzlFLE9BQU8sQ0FBQztBQUV4QixDQUFDLENBQUM7QUFDRjZFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDOUUsT0FBTyxDQUFDO0FBQUEsU0FFTDBPLE1BQU1BLENBQUE7RUFBQSxPQUFBQyxPQUFBLENBQUFWLEtBQUEsT0FBQS9JLFNBQUE7QUFBQTtBQUFBLFNBQUF5SixRQUFBO0VBQUFBLE9BQUEsR0FBQWQsaUJBQUEsZUFBQW5HLG1CQUFBLEdBQUEyRSxJQUFBLENBQXJCLFNBQUF1QyxTQUFBO0lBQUEsT0FBQWxILG1CQUFBLEdBQUFvQixJQUFBLFVBQUErRixVQUFBQyxTQUFBO01BQUEsa0JBQUFBLFNBQUEsQ0FBQWpDLElBQUEsR0FBQWlDLFNBQUEsQ0FBQXpELElBQUE7UUFBQTtVQUFBLE9BQUF5RCxTQUFBLENBQUE1RCxNQUFBLFdBQ1csSUFBSTNILE9BQU87WUFBQSxJQUFBd0wsSUFBQSxHQUFBbEIsaUJBQUEsZUFBQW5HLG1CQUFBLEdBQUEyRSxJQUFBLENBQUMsU0FBQTJDLFNBQU94TCxPQUFPO2NBQUEsSUFBQXlMLGFBQUE7Y0FBQSxPQUFBdkgsbUJBQUEsR0FBQW9CLElBQUEsVUFBQW9HLFVBQUFDLFNBQUE7Z0JBQUEsa0JBQUFBLFNBQUEsQ0FBQXRDLElBQUEsR0FBQXNDLFNBQUEsQ0FBQTlELElBQUE7a0JBQUE7b0JBQ3ZCNEQsYUFBYTtzQkFBQSxJQUFBRyxLQUFBLEdBQUF2QixpQkFBQSxlQUFBbkcsbUJBQUEsR0FBQTJFLElBQUEsQ0FBRyxTQUFBZ0QsUUFBTzFLLEtBQUs7d0JBQUEsSUFBQWQsR0FBQSxFQUFBTSxNQUFBLEVBQUFtTCxXQUFBLEVBQUFDLE1BQUEsRUFBQUMsT0FBQSxFQUFBQyxlQUFBO3dCQUFBLE9BQUEvSCxtQkFBQSxHQUFBb0IsSUFBQSxVQUFBNEcsU0FBQUMsUUFBQTswQkFBQSxrQkFBQUEsUUFBQSxDQUFBOUMsSUFBQSxHQUFBOEMsUUFBQSxDQUFBdEUsSUFBQTs0QkFBQTs4QkFBQSxLQUMxQjFHLEtBQUssQ0FBQ3JDLE1BQU0sQ0FBQ3pDLFNBQVMsQ0FBQytFLFFBQVEsQ0FBQyxXQUFXLENBQUM7Z0NBQUErSyxRQUFBLENBQUF0RSxJQUFBO2dDQUFBOzhCQUFBOzhCQUN0Q3hILEdBQUcsR0FBRzFCLFFBQVEsQ0FBQ3dDLEtBQUssQ0FBQ3JDLE1BQU0sQ0FBQzRCLE9BQU8sQ0FBQ0wsR0FBRyxDQUFDOzhCQUN4Q00sTUFBTSxHQUFHaEMsUUFBUSxDQUFDd0MsS0FBSyxDQUFDckMsTUFBTSxDQUFDNEIsT0FBTyxDQUFDQyxNQUFNLENBQUM7OEJBQ3BEaUssY0FBYyxDQUFDaEwsa0JBQWtCLEdBQUcsQ0FBQ1MsR0FBRyxFQUFFTSxNQUFNLENBQUM7OEJBQUN3TCxRQUFBLENBQUE5QyxJQUFBOzhCQVFyQ3lDLFdBQVcsR0FBcEIsU0FBU0EsV0FBV0EsQ0FBQzNQLENBQUMsRUFBRTtnQ0FDcEIsSUFBSWlRLE9BQU8sSUFBQXJRLE1BQUEsQ0FBSUksQ0FBQyx1QkFBb0IsQ0FBQyxFQUFFO2tDQUNuQyxJQUFNTyxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO2tDQUNoREssSUFBSSxDQUFDb1AsU0FBUyxHQUFHLEVBQUU7a0NBQ25CekIsY0FBYyxHQUFHLElBQUk7a0NBQUMsSUFBQTBCLGtCQUFBLEdBRUMvUCw4REFBZ0IsQ0FBQyxDQUFDO2tDQUE5QkMsT0FBTyxHQUFBOFAsa0JBQUEsQ0FBZnZOLE1BQU07a0NBQ1R3TixtQkFBbUIsQ0FBQyxDQUFDO2tDQUVyQjdQLEtBQUssQ0FBQ0csT0FBTyxDQUFDLFVBQUNDLElBQUksRUFBSztvQ0FDcEJBLElBQUksQ0FBQ1YsWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7b0NBQ3RDVSxJQUFJLENBQUNULFNBQVMsQ0FBQ1UsTUFBTSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUM7a0NBQ3JELENBQUMsQ0FBQztrQ0FFRixPQUFPLElBQUksQ0FBQyxDQUFDO2dDQUNqQjtnQ0FFQSxPQUFPLEtBQUssQ0FBQyxDQUFDOzhCQUNsQixDQUFDOzhCQUFBb1AsUUFBQSxDQUFBdEUsSUFBQTs4QkFBQSxPQXZCb0IrQyxjQUFjLENBQUNySixjQUFjLENBQUMsQ0FBQzs0QkFBQTs4QkFBOUN3SyxNQUFNLEdBQUFJLFFBQUEsQ0FBQTVFLElBQUE7OEJBQUE0RSxRQUFBLENBQUF0RSxJQUFBOzhCQUFBLE9BQ1VyTCxPQUFPLENBQUN5RyxtQkFBbUIsQ0FBQyxDQUFDOzRCQUFBOzhCQUE3QytJLE9BQU8sR0FBQUcsUUFBQSxDQUFBNUUsSUFBQTs4QkFFUDBFLGVBQWUsR0FBR0YsTUFBTSxLQUFLLElBQUksR0FBR0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHRSxPQUFPLEtBQUssSUFBSSxHQUFHRixXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSTs4QkFDekh6SyxPQUFPLENBQUNDLEdBQUcsQ0FBQzJLLGVBQWUsQ0FBQzs4QkFBQ0UsUUFBQSxDQUFBdEUsSUFBQTs4QkFBQTs0QkFBQTs4QkFBQXNFLFFBQUEsQ0FBQTlDLElBQUE7OEJBQUE4QyxRQUFBLENBQUFLLEVBQUEsR0FBQUwsUUFBQTs4QkFzQjdCOUssT0FBTyxDQUFDK0ksS0FBSyxDQUFDLFFBQVEsRUFBQStCLFFBQUEsQ0FBQUssRUFBTyxDQUFDOzRCQUFDOzhCQUduQ3hNLE9BQU8sQ0FBQyxDQUFDOzRCQUFDOzRCQUFBOzhCQUFBLE9BQUFtTSxRQUFBLENBQUEzQyxJQUFBOzBCQUFBO3dCQUFBLEdBQUFxQyxPQUFBO3NCQUFBLENBRWpCO3NCQUFBLGdCQXRDS0osYUFBYUEsQ0FBQWdCLEdBQUE7d0JBQUEsT0FBQWIsS0FBQSxDQUFBbkIsS0FBQSxPQUFBL0ksU0FBQTtzQkFBQTtvQkFBQTtvQkF3Q25Ca0osY0FBYyxDQUFDdEwsS0FBSyxDQUFDbkMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFc08sYUFBYSxDQUFDO2tCQUFDO2tCQUFBO29CQUFBLE9BQUFFLFNBQUEsQ0FBQW5DLElBQUE7Z0JBQUE7Y0FBQSxHQUFBZ0MsUUFBQTtZQUFBLENBQ25FO1lBQUEsaUJBQUFrQixFQUFBO2NBQUEsT0FBQW5CLElBQUEsQ0FBQWQsS0FBQSxPQUFBL0ksU0FBQTtZQUFBO1VBQUEsSUFBQztRQUFBO1FBQUE7VUFBQSxPQUFBNEosU0FBQSxDQUFBOUIsSUFBQTtNQUFBO0lBQUEsR0FBQTRCLFFBQUE7RUFBQSxDQUNMO0VBQUEsT0FBQUQsT0FBQSxDQUFBVixLQUFBLE9BQUEvSSxTQUFBO0FBQUE7QUFFRCxTQUFTNkssbUJBQW1CQSxDQUFBLEVBQUc7RUFDM0IvUCxPQUFPLENBQUN1RixhQUFhLENBQUMsQ0FBQyxDQUNsQmlGLElBQUksQ0FBQyxZQUFNO0lBQ1IzRixPQUFPLENBQUNDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztJQUNwQ3NKLGNBQWMsR0FBRyxJQUFJM08scURBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMyTyxjQUFjLENBQUNsSSxnQkFBZ0IsQ0FBQyxDQUFDO0lBRWpDLE9BQU93SSxNQUFNLENBQUMsQ0FBQztFQUNuQixDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFkLEtBQUssRUFBSTtJQUNaL0ksT0FBTyxDQUFDK0ksS0FBSyxDQUFDLG9CQUFvQixFQUFFQSxLQUFLLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0FBQ1Y7QUFDQW1DLG1CQUFtQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JhdHRsZXNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZHJhZ0FuZERyb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXktcmVzZXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc2hpcENvdW50ID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGFuZ2xlLCBsZW5ndGgsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNyZWF0ZVNoaXBOYW1lKGxlbmd0aCk7XG4gICAgICAgIHRoaXMuaHAgPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuc2luayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICBzaGlwSGl0KCkge1xuICAgICAgICB0aGlzLmhwLS07XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcFN1bmsoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNoaXBTdW5rKCkge1xuICAgICAgICB0aGlzLnNpbmsgPSB0cnVlO1xuICAgIH1cblxuICAgIGNyZWF0ZVNoaXBOYW1lKGxlbmd0aCkge1xuICAgICAgICBpZiAobGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJEZXN0cm9lclwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIFwiU3VibWFyaW5lXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiBcImNydWlzdGVyXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBzaGlwQ291bnRbbGVuZ3RoXSB8fCAwO1xuICAgICAgICAgICAgc2hpcENvdW50W2xlbmd0aF0gPSBjb3VudCArIDE7XG4gICAgICAgICAgICByZXR1cm4gYFNoaXAke2NvdW50fWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhc3NlcnRMb2NhdGlvbihjb29yZGluYXRlc1RvQ2hlY2ssIGNhbGxiYWNrKSB7XG4gICAgLy8gICAgIGxldCBhbGxQbGFjZWQgPSB0cnVlO1xuICAgIC8vICAgICBjb29yZGluYXRlc1RvQ2hlY2suZm9yRWFjaChjb29yZCA9PiB7XG4gICAgLy8gICAgICAgICBpZiAoIWNhbGxiYWNrLnBsYWNlQm9hdChjb29yZCkpIHtcbiAgICAvLyAgICAgICAgICAgICBhbGxQbGFjZWQgPSBmYWxzZTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG5cbiAgICAvLyAgICAgaWYgKGFsbFBsYWNlZCkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzVG9DaGVjaztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gXCJ0cnkgYWdhaW5cIjtcbiAgICAvLyB9XG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwLmpzXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuZnVuY3Rpb24gZGlzYWJsZVNoaXBEcmFnKHgpIHtcbiAgICB4LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcImZhbHNlXCIpO1xuICAgIHguY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cERyYWdBbmREcm9wKCkge1xuICAgIGNvbnN0IHBsYXllcjEgPSBuZXcgR2FtZWJvYXJkKFwidXNlclwiKTtcbiAgICAvLyBwbGF5ZXIxLnJlY2VpdmVSYW5kb21BdHRhY2sgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyAgICAgY29uc3QgZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlID0gKCkgPT4ge1xuICAgIC8vICAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgLy8gICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAvLyAgICAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICAgIC8vICAgICB9O1xuXG4gICAgLy8gICAgIGxldCBjb29yZGluYXRlO1xuICAgIC8vICAgICBkbyB7XG4gICAgLy8gICAgICAgICBjb29yZGluYXRlID0gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlKCk7XG4gICAgLy8gICAgIH0gd2hpbGUgKHRoaXMucHJldmlvdXNBdHRhY2tzLmhhcyhjb29yZGluYXRlKSk7IC8vIEVuc3VyZSB0aGUgY29vcmRpbmF0ZSBoYXNuJ3QgYmVlbiBhdHRhY2tlZCBiZWZvcmVcblxuICAgIC8vICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcy5hZGQoY29vcmRpbmF0ZSk7XG5cbiAgICAvLyAgICAgLy8gY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGU7XG4gICAgLy8gICAgIC8vIGlmICh0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPT09IDEpIHtcbiAgICAvLyAgICAgLy8gICAgIHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9IFwiWFwiO1xuICAgIC8vICAgICAvLyAgICAgY29uc29sZS5sb2coXCJIaXQhISBkcmFnXCIpO1xuICAgIC8vICAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgICAvLyAgICAgY29uc29sZS5sb2coXCJNaXNzISEgZHJvcFwiKTtcbiAgICAvLyAgICAgLy8gfVxuXG5cblxuXG5cblxuXG4gICAgLy8gfTtcbiAgICBmdW5jdGlvbiByZXNldERyYWdBbmREcm9wKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxhY2VkLXNoaXBcIik7XG5cbiAgICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgc2hpcC5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2VkLXNoaXBcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcbiAgICBsZXQgY3VycmVudFNoaXAgPSBudWxsO1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWRcIik7XG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgXCJkcmFnZ2VkXCIpO1xuICAgICAgICAgICAgY3VycmVudFNoaXAgPSBzaGlwO1xuICAgICAgICB9KTtcblxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsICgpID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBcIm1vdmVcIjtcbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBjdXJyZW50U2hpcC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWxlbmd0aFwiKTtcbiAgICAgICAgY29uc3Qgc2hpcEFuZ2xlID0gY3VycmVudFNoaXAuZ2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2hpcEFuZ2xlLCBzaGlwTGVuZ3RoKTtcbiAgICAgICAgaWYgKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpID09PSBcImRyYWdnZWRcIiAmJiBzaGlwTGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBncmlkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gZ3JpZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgICAgICAgIGNvbnN0IGNlbGxYID0gTWF0aC5mbG9vcigoeCAvIGdyaWQub2Zmc2V0V2lkdGgpICogOCk7XG4gICAgICAgICAgICBjb25zdCBjZWxsWSA9IE1hdGguZmxvb3IoKHkgLyBncmlkLm9mZnNldEhlaWdodCkgKiA4KTtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdDb29yZHMgPSBbY2VsbFksIGNlbGxYXTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IFNoaXAgYW5kIHBsYWNlIGl0IG9uIHRoZSBncmlkXG4gICAgICAgICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoc2hpcEFuZ2xlLCBwYXJzZUludChzaGlwTGVuZ3RoKSwgZHJhZ0Nvb3Jkcyk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1NoaXApO1xuXG4gICAgICAgICAgICBjb25zdCBib2F0UGxhY2VkID0gcGxheWVyMS5wbGFjZUJvYXQobmV3U2hpcCk7XG4gICAgICAgICAgICBpZiAoYm9hdFBsYWNlZCkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVTaGlwRHJhZyhjdXJyZW50U2hpcCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFNoaXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnLW92ZXJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxheWVyOiBwbGF5ZXIxLFxuICAgICAgICByZXNldERyYWdBbmREcm9wOiByZXNldERyYWdBbmREcm9wXG4gICAgfTtcbn1cbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJUeXBlKSB7XG4gICAgICAgIHRoaXMucGxheWVyVHlwZSA9IHBsYXllclR5cGU7XG5cbiAgICAgICAgdGhpcy50d29EQXJyYXkgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA4IH0sICgpID0+IEFycmF5KDgpLmZpbGwoMCkpO1xuICAgICAgICB0aGlzLnRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgdGhpcy5ncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkXCIpO1xuICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcbiAgICAgICAgdGhpcy5zaGlwRGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWRlc3Ryb3llclwiKTtcbiAgICAgICAgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCA9IDA7IC8vIEtlZXAgdHJhY2sgb2YgdGhlIG51bWJlciBvZiBzaGlwcyBwbGFjZWRcbiAgICAgICAgdGhpcy5pc0ZpbmlzaGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzID0gbmV3IFNldCgpOyAvLyBTZXQgdG8gc3RvcmUgcHJldmlvdXNseSBhdHRhY2tlZCBjb29yZGluYXRlc1xuICAgICAgICAvLyBpZiAodGhpcy5wbGF5ZXJUeXBlID09PSAnY29tcHV0ZXInKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBjcmVhdGVHcmlkKCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAvLyBBZGQgYSBuZXcgcm93IHRvIHRoZSB0YWJsZVxuICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMudGFibGUuaW5zZXJ0Um93KGkpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhIGNlbGwgdG8gdGhlIGN1cnJlbnQgcm93XG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSByb3cuaW5zZXJ0Q2VsbChqKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWl0ZW1cIik7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBcHBlbmQgdGhlIHRhYmxlIHRvIHRoZSBncmlkIGNvbnRhaW5lclxuICAgICAgICB0aGlzLnRhYmxlLmNsYXNzTGlzdC5hZGQoYCR7dGhpcy5wbGF5ZXJUeXBlfWApO1xuICAgICAgICB0aGlzLmdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsZSk7XG4gICAgfVxuICAgIHJlc2V0R2FtZSgpIHtcbiAgICAgICAgLy8gSW1wbGVtZW50IGxvZ2ljIHRvIHJlc2V0IHRoZSBnYW1lIGJvYXJkIGFuZCBhbnkgb3RoZXIgbmVjZXNzYXJ5IHN0YXRlXG4gICAgICAgIHRoaXMudHdvREFycmF5ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9LCAoKSA9PiBBcnJheSg4KS5maWxsKDApKTtcbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCA9IDA7XG4gICAgICAgIHRoaXMuY2xlYXJHcmlkKCk7XG4gICAgICAgIHRoaXMudGFibGUuY2xhc3NMaXN0LnJlbW92ZSgnY29tcHV0ZXJCb2FyZCcpO1xuXG4gICAgICAgIC8vIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgICAgICAvLyBBZGRpdGlvbmFsIHJlc2V0IGxvZ2ljIGFzIG5lZWRlZFxuICAgIH1cbiAgICBjbGVhckdyaWQoKSB7XG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBlYWNoIHJvd1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IHJvd1xuICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMudGFibGUucm93c1tpXTtcblxuICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGVhY2ggY2VsbCBpbiB0aGUgY3VycmVudCByb3dcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBjdXJyZW50IGNlbGxcbiAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IHJvdy5jZWxsc1tqXTtcblxuICAgICAgICAgICAgICAgIC8vIENsZWFyIHRoZSBjZWxsIGNvbnRlbnQgb3IgcmVzZXQgc3R5bGVzXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiYm9hdC1jZWxsXCIpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkaXRpb25hbCByZXNldCBsb2dpYyBhcyBuZWVkZWQgZm9yIG90aGVyIGNlbGwgcHJvcGVydGllc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBhZGRDbGlja0V2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRDb29yZGluYXRlcyA9IFtyb3csIGNvbHVtbl07XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2VsZWN0ZWQgQ2VsbCBDb29yZGluYXRlczonLCB0aGlzLmNsaWNrZWRDb29yZGluYXRlcyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVBdHRhY2sxKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYWNlQm9hdChib2F0LCBzaG91bGRBZGRDbGFzcyA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBhbmdsZSwgbGVuZ3RoLCBsb2NhdGlvbiB9ID0gYm9hdDtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IGxvY2F0aW9uO1xuXG4gICAgICAgIGlmIChhbmdsZSA9PT0gJ0gnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbCArIGkgPj0gOCB8fCB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbCArIGldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2wgKyBpXSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEFkZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLnRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbHVtbj1cIiR7Y29sICsgaX1cIl1gKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdib2F0LWNlbGwnKTsgLy8gQWRkIGEgQ1NTIGNsYXNzIHRvIHN0eWxlIHRoZSBib2F0IGNlbGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09ICdWJykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyb3cgKyBpID49IDggfHwgdGhpcy50d29EQXJyYXlbcm93ICsgaV1bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMudHdvREFycmF5W3JvdyArIGldW2NvbF0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRBZGRDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy50YWJsZS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3JvdyArIGl9XCJdW2RhdGEtY29sdW1uPVwiJHtjb2x9XCJdYCk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYm9hdC1jZWxsJyk7IC8vIEFkZCBhIENTUyBjbGFzcyB0byBzdHlsZSB0aGUgYm9hdCBjZWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hpcHNQbGFjZWQrK1xuICAgICAgICBpZiAodGhpcy5zaGlwc1BsYWNlZCA+PSAzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQcm9taXNlKCk7IC8vIFJlc29sdmUgdGhlIHByb21pc2Ugd2hlbiB0aGUgY291bnRlciByZWFjaGVzIDNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB3YWl0Rm9yRmluaXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0ZpbmlzaGVkUHJvbWlzZTtcbiAgICB9XG4gICAgYWxsUGxhY2VkKCkge1xuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkKys7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhyZWUgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZFxuICAgICAgICBpZiAodGhpcy5zaGlwc1BsYWNlZCA9PT0gMykge1xuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJldHVybiBhIHBlbmRpbmcgcHJvbWlzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzb2x2ZSwgXCJkb2VzbnR3b3JrcyFcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IGNvbnNvbGUubG9nKFwiMm5kIHByb21pc2VcIiksIHJlc29sdmUoXCJhc1wiKSB9KTtcbiAgICB9XG4gICAgZm9vKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHsgY29uc29sZS5sb2coXCIzcmQgcHJvbWlzZVwiKSwgcmVzb2x2ZShcImFzXCIpIH0pO1xuICAgIH1cblxuICAgIGNoZWNrRW5kR2FtZSgpIHtcbiAgICAgICAgY29uc3QgZmxhdHRlbmVkQXJyYXkgPSB0aGlzLnR3b0RBcnJheS5mbGF0KCk7IC8vIEZsYXR0ZW4gdGhlIDJEIGFycmF5XG4gICAgICAgIGNvbnN0IGNvdW50WCA9IGZsYXR0ZW5lZEFycmF5LmZpbHRlcihpdGVtID0+IGl0ZW0gPT09ICdYJykubGVuZ3RoO1xuXG4gICAgICAgIGlmIChjb3VudFggPj0gMikge1xuICAgICAgICAgICAgLy8gaWYgKGNvbmZpcm0oYCR7dGhpcy5wbGF5ZXJUeXBlfSB3aW5zISBQbGF5IGFnYWluP2ApKSB7XG5cbiAgICAgICAgICAgIC8vICAgICB0aGlzLnRhYmxlLnJlbW92ZUNoaWxkKHRoaXMudGFibGUuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAvLyAgICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYWNlZC1zaGlwXCIpO1xuXG4gICAgICAgICAgICAvLyAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICBzaGlwLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAvLyAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInBsYWNlZC1zaGlwXCIpO1xuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBEbyBub3RoaW5nIVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhbWUgZG9lcyBub3RoaW5nJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgY2hlY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICB9XG5cbiAgICBwbGFjZVJhbmRvbVNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHsgdHlwZTogJ0Rlc3Ryb3llcicsIGxlbmd0aDogMiB9LFxuICAgICAgICAgICAgeyB0eXBlOiAnU3VibWFyaW5lJywgbGVuZ3RoOiAzIH0sXG4gICAgICAgICAgICB7IHR5cGU6ICdDcnVpc2VyJywgbGVuZ3RoOiA0IH1cbiAgICAgICAgXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSAmJiBjb2wgKyBzaGlwLmxlbmd0aCA8PSA4ID8gJ0gnIDogJ1YnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxhY2VCb2F0KG5ldyBTaGlwKG9yaWVudGF0aW9uLCBzaGlwLmxlbmd0aCwgW3JvdywgY29sXSksIGZhbHNlKSkge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVjZWl2ZVJhbmRvbUF0dGFjaygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBDb3JyZWN0ZWQ6IENhbGwgZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlIHRvIGdldCB0aGUgYWN0dWFsIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlKCk7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy50YWJsZS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2x1bW49XCIke2NvbH1cIl1gKTtcblxuICAgICAgICAgICAgLy8gQ29ycmVjdGVkOiBVc2UgdG9TdHJpbmcoKSBvbiB0aGUgY29vcmRpbmF0ZXMgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzU3RyaW5nID0gYCR7cm93fSwke2NvbH1gO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aW91c0F0dGFja3MuaGFzKGNvb3JkaW5hdGVzU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWxyZWFkeSBhdHRhY2tlZCB0aGVzZSBjb29yZGluYXRlcyFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy50d29EQXJyYXlbcm93XVtjb2xdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgICAgICAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJibGFja1wiLCBjb25zb2xlLmxvZyhcIkNvbXB1dGVyIG1ha2VzIGEgSGl0ISFcIiwgdGhpcy50d29EQXJyYXkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jaGVja0VuZEdhbWUoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXIgbWFrZXMgYSBNaXNzISFcIiwgdGhpcy50d29EQXJyYXkpO1xuICAgICAgICAgICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZCA9IFwiYmx1ZVwiO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wcmV2aW91c0F0dGFja3MpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c0F0dGFja3MuYWRkKGNvb3JkaW5hdGVzU3RyaW5nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjazEoKSB7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMudGFibGUucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sdW1uPVwiJHtjb2x9XCJdYCk7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzU3RyaW5nID0gYCR7cm93fSwke2NvbH1gO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldmlvdXNBdHRhY2tzLmhhcyhjb29yZGluYXRlc1N0cmluZykpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJBbHJlYWR5IGF0dGFja2VkIHRoZXNlIGNvb3JkaW5hdGVzIVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50d29EQXJyYXlbcm93XVtjb2xdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9IFwiWFwiO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgbWFrZXMgYSBIaXQhISFcIiwgdGhpcy50d29EQXJyYXkpLCBjZWxsLnN0eWxlLmJhY2tncm91bmQgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jaGVja0VuZEdhbWUoKSwgXCI8LWxvb2tcIilcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllciBtYWtlcyBhIE1pc3MhISFcIiwgdGhpcy50d29EQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmQgPSBcImJsdWVcIlxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcy5hZGQoY29vcmRpbmF0ZXNTdHJpbmcpO1xuXG5cbiAgICAgICAgICAgICAgICAvL3Jlc29sdmUoXCJwbGF5ZXJtYWtlcyBhIG1vdmVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbih0ZXh0LCBjbGlja0hhbmRsZXIpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uLWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChidXR0b24pO1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgeyBzZXR1cERyYWdBbmREcm9wIH0gZnJvbSAnLi9kcmFnQW5kRHJvcCc7XG5pbXBvcnQgY3JlYXRlQnV0dG9uIGZyb20gJy4vcGxheS1yZXNldCc7XG5cbmxldCBwbGF5ZXIxO1xuKHsgcGxheWVyOiBwbGF5ZXIxIH0gPSBzZXR1cERyYWdBbmREcm9wKCkpO1xuXG5cblxuY29uc3QgZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpZFwiKVxubGV0IGNvbXB1dGVyUGxheWVyO1xuY29uc3Qgc2hpcHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaXBzLWNvbnRhaW5lclwiKTtcblxuc2hpcHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHN3aXRjaEFuZ2xlRWxlbWVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnN3aXRjaC1hbmdsZVwiKTtcblxuICAgIGlmIChzd2l0Y2hBbmdsZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc2hpcEVsZW1lbnQgPSBzd2l0Y2hBbmdsZUVsZW1lbnQuY2xvc2VzdChcIi5zaGlwXCIpO1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0YUFuZ2xlID0gc3dpdGNoQW5nbGVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtYW5nbGVcIik7XG5cbiAgICAgICAgc3dpdGNoQW5nbGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtYW5nbGVcIiwgY3VycmVudERhdGFBbmdsZSA9PT0gXCJIXCIgPyBcIlZcIiA6IFwiSFwiKTtcbiAgICAgICAgc3dpdGNoQW5nbGVFbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudERhdGFBbmdsZSA9PT0gXCJIXCIgPyBcIlZcIiA6IFwiSFwiO1xuXG4gICAgICAgIHNoaXBFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtYW5nbGVcIiwgY3VycmVudERhdGFBbmdsZSA9PT0gXCJIXCIgPyBcIlZcIiA6IFwiSFwiKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocGxheWVyMSlcblxufSk7XG5jb25zb2xlLmxvZyhwbGF5ZXIxKVxuXG5hc3luYyBmdW5jdGlvbiBmb29iYXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgICAgICAgICBjb21wdXRlclBsYXllci5jbGlja2VkQ29vcmRpbmF0ZXMgPSBbcm93LCBjb2x1bW5dO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29tcHV0ZXJQbGF5ZXIucmVjZWl2ZUF0dGFjazEoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0MiA9IGF3YWl0IHBsYXllcjEucmVjZWl2ZVJhbmRvbUF0dGFjaygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0VHJ1ZVJlc3VsdCA9IHJlc3VsdCA9PT0gdHJ1ZSA/IGZpbmFsUHJvbXB0KCd1c2Vyd2lucycpIDogcmVzdWx0MiA9PT0gdHJ1ZSA/IGZpbmFsUHJvbXB0KCdjb21wdXRlcndpbnMnKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpcnN0VHJ1ZVJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZpbmFsUHJvbXB0KHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25maXJtKGAke3h9IHdpbnMhIFBsYXkgYWdhaW4/YCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXB1dGVyUGxheWVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7IHBsYXllcjogcGxheWVyMSB9ID0gc2V0dXBEcmFnQW5kRHJvcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR1cEdhbWVGb3JQbGF5ZXIxKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwicGxhY2VkLXNoaXBcIiwgXCJib2F0LWNlbGxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gWW91IGNhbiByZXR1cm4gdHJ1ZSBpZiB5b3Ugd2FudCB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c2VyIGNvbmZpcm1lZFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFlvdSBjYW4gcmV0dXJuIGZhbHNlIGlmIHlvdSB3YW50IHRvIGluZGljYXRlIHRoYXQgdGhlIHVzZXIgY2FuY2VsZWRcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbXB1dGVyUGxheWVyLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVNb3VzZVVwKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0dXBHYW1lRm9yUGxheWVyMSgpIHtcbiAgICBwbGF5ZXIxLndhaXRGb3JGaW5pc2goKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc3RhbmNlIGlzIGZpbmlzaGVkIVwiKTtcbiAgICAgICAgICAgIGNvbXB1dGVyUGxheWVyID0gbmV3IEdhbWVib2FyZChcImNvbXB1dGVyXCIpO1xuICAgICAgICAgICAgY29tcHV0ZXJQbGF5ZXIucGxhY2VSYW5kb21TaGlwcygpO1xuXG4gICAgICAgICAgICByZXR1cm4gZm9vYmFyKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQ6XCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG59XG5zZXR1cEdhbWVGb3JQbGF5ZXIxKCk7Il0sIm5hbWVzIjpbInNoaXBDb3VudCIsIlNoaXAiLCJhbmdsZSIsImxlbmd0aCIsImxvY2F0aW9uIiwiX2NsYXNzQ2FsbENoZWNrIiwibmFtZSIsImNyZWF0ZVNoaXBOYW1lIiwiaHAiLCJzaW5rIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJzaGlwSGl0Iiwic2hpcFN1bmsiLCJjb3VudCIsImNvbmNhdCIsImRlZmF1bHQiLCJHYW1lYm9hcmQiLCJkaXNhYmxlU2hpcERyYWciLCJ4Iiwic2V0QXR0cmlidXRlIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0dXBEcmFnQW5kRHJvcCIsInBsYXllcjEiLCJyZXNldERyYWdBbmREcm9wIiwic2hpcHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwic2hpcCIsInJlbW92ZSIsImN1cnJlbnRTaGlwIiwiZ3JpZCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwicHJldmVudERlZmF1bHQiLCJkcm9wRWZmZWN0Iiwic2hpcExlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNoaXBBbmdsZSIsImdldERhdGEiLCJjbGllbnRYIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInkiLCJjbGllbnRZIiwidG9wIiwiY2VsbFgiLCJNYXRoIiwiZmxvb3IiLCJvZmZzZXRXaWR0aCIsImNlbGxZIiwib2Zmc2V0SGVpZ2h0IiwiZHJhZ0Nvb3JkcyIsIm5ld1NoaXAiLCJwYXJzZUludCIsImJvYXRQbGFjZWQiLCJwbGFjZUJvYXQiLCJ0YXJnZXQiLCJwbGF5ZXIiLCJwbGF5ZXJUeXBlIiwiX3RoaXMiLCJ0d29EQXJyYXkiLCJBcnJheSIsImZyb20iLCJmaWxsIiwidGFibGUiLCJjcmVhdGVFbGVtZW50IiwiZ3JpZENvbnRhaW5lciIsImNyZWF0ZUdyaWQiLCJzaGlwRGVzdHJveWVyIiwicXVlcnlTZWxlY3RvciIsImNsaWNrZWRDb29yZGluYXRlcyIsInNoaXBzUGxhY2VkIiwiaXNGaW5pc2hlZFByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlc29sdmVQcm9taXNlIiwicHJldmlvdXNBdHRhY2tzIiwiU2V0IiwiaSIsInJvdyIsImluc2VydFJvdyIsImoiLCJjZWxsIiwiaW5zZXJ0Q2VsbCIsImRhdGFzZXQiLCJjb2x1bW4iLCJhcHBlbmRDaGlsZCIsInJlc2V0R2FtZSIsImNsZWFyR3JpZCIsInJvd3MiLCJjZWxscyIsImFkZENsaWNrRXZlbnRMaXN0ZW5lcnMiLCJfdGhpczIiLCJldmVudCIsImNvbnRhaW5zIiwiY29uc29sZSIsImxvZyIsInJlY2VpdmVBdHRhY2sxIiwiYm9hdCIsInNob3VsZEFkZENsYXNzIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiX2xvY2F0aW9uIiwiX3NsaWNlZFRvQXJyYXkiLCJjb2wiLCJ3YWl0Rm9yRmluaXNoIiwiYWxsUGxhY2VkIiwicnVuIiwiZm9vIiwiY2hlY2tFbmRHYW1lIiwiZmxhdHRlbmVkQXJyYXkiLCJmbGF0IiwiY291bnRYIiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrIiwicGxhY2VSYW5kb21TaGlwcyIsInR5cGUiLCJfaTQiLCJfc2hpcHMiLCJwbGFjZWQiLCJyYW5kb20iLCJvcmllbnRhdGlvbiIsInJlY2VpdmVSYW5kb21BdHRhY2siLCJfdGhpczMiLCJnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUiLCJfZ2VuZXJhdGVSYW5kb21Db29yZGkiLCJfZ2VuZXJhdGVSYW5kb21Db29yZGkyIiwiY29vcmRpbmF0ZXNTdHJpbmciLCJoYXMiLCJzdHlsZSIsImJhY2tncm91bmQiLCJfdGhpczQiLCJfdGhpcyRjbGlja2VkQ29vcmRpbmEiLCJyZWplY3QiLCJjcmVhdGVCdXR0b24iLCJ0ZXh0IiwiY2xpY2tIYW5kbGVyIiwiYnV0dG9uIiwidGV4dENvbnRlbnQiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwidCIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJuIiwiaGFzT3duUHJvcGVydHkiLCJvIiwiZGVmaW5lUHJvcGVydHkiLCJTeW1ib2wiLCJhIiwiaXRlcmF0b3IiLCJjIiwiYXN5bmNJdGVyYXRvciIsInUiLCJ0b1N0cmluZ1RhZyIsImRlZmluZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIndyYXAiLCJHZW5lcmF0b3IiLCJjcmVhdGUiLCJDb250ZXh0IiwibWFrZUludm9rZU1ldGhvZCIsInRyeUNhdGNoIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwiZiIsInMiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwicCIsImQiLCJnZXRQcm90b3R5cGVPZiIsInYiLCJ2YWx1ZXMiLCJnIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJfdHlwZW9mIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsImtleXMiLCJyZXZlcnNlIiwicG9wIiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJ2YWwiLCJoYW5kbGUiLCJjb21wbGV0ZSIsImZpbmlzaCIsIl9jYXRjaCIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJfbmV4dCIsIl90aHJvdyIsImluZm8iLCJlcnJvciIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZm4iLCJzZWxmIiwiYXJncyIsImFwcGx5IiwiZXJyIiwiX3NldHVwRHJhZ0FuZERyb3AiLCJjb21wdXRlclBsYXllciIsInNoaXBzQ29udGFpbmVyIiwic3dpdGNoQW5nbGVFbGVtZW50IiwiY2xvc2VzdCIsInNoaXBFbGVtZW50IiwiY3VycmVudERhdGFBbmdsZSIsImZvb2JhciIsIl9mb29iYXIiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsIl9yZWYiLCJfY2FsbGVlMiIsImhhbmRsZU1vdXNlVXAiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJfcmVmMiIsIl9jYWxsZWUiLCJmaW5hbFByb21wdCIsInJlc3VsdCIsInJlc3VsdDIiLCJmaXJzdFRydWVSZXN1bHQiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiY29uZmlybSIsImlubmVySFRNTCIsIl9zZXR1cERyYWdBbmREcm9wMiIsInNldHVwR2FtZUZvclBsYXllcjEiLCJ0MCIsIl94MiIsIl94Il0sInNvdXJjZVJvb3QiOiIifQ==