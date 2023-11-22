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
  var player1 = new _gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
      // Create a new table element
      var table = document.createElement('table');
      for (var i = 0; i < 8; i++) {
        // Add a new row to the table
        var row = table.insertRow(i);
        for (var j = 0; j < 8; j++) {
          // Add a cell to the current row
          var cell = row.insertCell(j);
          cell.classList.add("grid-item");
          cell.dataset.row = i;
          cell.dataset.column = j;
        }
      }

      // Append the table to the grid container
      this.gridContainer.appendChild(table);
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
            // console.log("Hit!");
          } else {
            // console.log("Miss!");
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
    key: "receiveRandomAttack",
    value: function receiveRandomAttack() {
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
        console.log("Hit!!");
      } else {
        console.log("Miss!!");
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
        console.log("player makes a Hit!");
      } else {
        console.log("computer makes a Miss!");
      }
    }
    //     recieveAttack(x) {
    //     if (this.twoDArray[x[0]][x[1]] === 1) {
    //         this.twoDArray[x[0]][x[1]] = "X"
    //         return "hit!"
    //     }
    //     else if (this.twoDArray[x[0]][x[1]] === 0) {
    //         return "miss!";
    //     }

    // }
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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




var player1 = (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_2__.setupDragAndDrop)();
var shipsContainer = document.getElementById("ships-container");
var allShips = (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_2__.setupDragAndDrop)();
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

// player1.waitForFinish().then(() => {
//     console.log("Instance is finished¬¬!");
//     createButton("Play", function () {
//         alert("Play button clicked");
//         const computerPlayer = new Gameboard
//         computerPlayer.placeRandomShips();
//         console.log(computerPlayer.twoDArray)
//     });

//     createButton("Reset", function () {
//         alert("Reset button clicked");
//         // Add your reset logic here
//     });
// });
function playGame() {
  return _playGame.apply(this, arguments);
} // Run the game
//playGame();
function _playGame() {
  _playGame = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (player1.findEngGame()) {
            _context.next = 16;
            break;
          }
          // Player1's turn
          console.log("Player1's turn:");
          computerPlayer.receiveAttack1(); // You may replace this with your actual user input mechanism
          // player1.displayBoard();

          // Check if player1 has won
          if (!player1.findEngGame()) {
            _context.next = 6;
            break;
          }
          console.log("Player1 wins!");
          return _context.abrupt("break", 16);
        case 6:
          // ComputerPlayer's turn
          console.log("ComputerPlayer's turn:");
          _context.next = 9;
          return new Promise(function (resolve) {
            return setTimeout(resolve, 1000);
          });
        case 9:
          // Simulating a delay for computer's move
          player1.receiveRandomAttack();
          player1.displayBoard();

          // Check if computerPlayer has won
          if (!computerPlayer.findEngGame()) {
            _context.next = 14;
            break;
          }
          console.log("ComputerPlayer wins!");
          return _context.abrupt("break", 16);
        case 14:
          _context.next = 0;
          break;
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _playGame.apply(this, arguments);
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TixjQUFjLENBQUM1SCxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFDakM7O1VBRUE7VUFBQSxLQUNJekcsT0FBTyxDQUFDcUYsV0FBVyxDQUFDLENBQUM7WUFBQStJLFFBQUEsQ0FBQXpELElBQUE7WUFBQTtVQUFBO1VBQ3JCekosT0FBTyxDQUFDQyxHQUFHLENBQUMsZUFBZSxDQUFDO1VBQUMsT0FBQWlOLFFBQUEsQ0FBQTVELE1BQUE7UUFBQTtVQUlqQztVQUNBdEosT0FBTyxDQUFDQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7VUFBQ2lOLFFBQUEsQ0FBQXpELElBQUE7VUFBQSxPQUNoQyxJQUFJdEgsT0FBTyxDQUFDLFVBQUFDLE9BQU87WUFBQSxPQUFJZ0wsVUFBVSxDQUFDaEwsT0FBTyxFQUFFLElBQUksQ0FBQztVQUFBLEVBQUM7UUFBQTtVQUFFO1VBQ3pEdEQsT0FBTyxDQUFDbUcsbUJBQW1CLENBQUMsQ0FBQztVQUM3Qm5HLE9BQU8sQ0FBQ3VPLFlBQVksQ0FBQyxDQUFDOztVQUV0QjtVQUFBLEtBQ0lGLGNBQWMsQ0FBQ2hKLFdBQVcsQ0FBQyxDQUFDO1lBQUErSSxRQUFBLENBQUF6RCxJQUFBO1lBQUE7VUFBQTtVQUM1QnpKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHNCQUFzQixDQUFDO1VBQUMsT0FBQWlOLFFBQUEsQ0FBQTVELE1BQUE7UUFBQTtVQUFBNEQsUUFBQSxDQUFBekQsSUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBLE9BQUF5RCxRQUFBLENBQUE5QixJQUFBO01BQUE7SUFBQSxHQUFBNEIsT0FBQTtFQUFBLENBSS9DO0VBQUEsT0FBQUQsU0FBQSxDQUFBVCxLQUFBLE9BQUE3SSxTQUFBO0FBQUEsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JhdHRsZXNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZHJhZ0FuZERyb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXktcmVzZXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc2hpcENvdW50ID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGFuZ2xlLCBsZW5ndGgsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNyZWF0ZVNoaXBOYW1lKGxlbmd0aCk7XG4gICAgICAgIHRoaXMuaHAgPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuc2luayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICBzaGlwSGl0KCkge1xuICAgICAgICB0aGlzLmhwLS07XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcFN1bmsoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNoaXBTdW5rKCkge1xuICAgICAgICB0aGlzLnNpbmsgPSB0cnVlO1xuICAgIH1cblxuICAgIGNyZWF0ZVNoaXBOYW1lKGxlbmd0aCkge1xuICAgICAgICBpZiAobGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJEZXN0cm9lclwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIFwiU3VibWFyaW5lXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiBcImNydWlzdGVyXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBzaGlwQ291bnRbbGVuZ3RoXSB8fCAwO1xuICAgICAgICAgICAgc2hpcENvdW50W2xlbmd0aF0gPSBjb3VudCArIDE7XG4gICAgICAgICAgICByZXR1cm4gYFNoaXAke2NvdW50fWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhc3NlcnRMb2NhdGlvbihjb29yZGluYXRlc1RvQ2hlY2ssIGNhbGxiYWNrKSB7XG4gICAgLy8gICAgIGxldCBhbGxQbGFjZWQgPSB0cnVlO1xuICAgIC8vICAgICBjb29yZGluYXRlc1RvQ2hlY2suZm9yRWFjaChjb29yZCA9PiB7XG4gICAgLy8gICAgICAgICBpZiAoIWNhbGxiYWNrLnBsYWNlQm9hdChjb29yZCkpIHtcbiAgICAvLyAgICAgICAgICAgICBhbGxQbGFjZWQgPSBmYWxzZTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG5cbiAgICAvLyAgICAgaWYgKGFsbFBsYWNlZCkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzVG9DaGVjaztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gXCJ0cnkgYWdhaW5cIjtcbiAgICAvLyB9XG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwLmpzXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuZnVuY3Rpb24gZGlzYWJsZVNoaXBEcmFnKHgpIHtcbiAgICB4LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcImZhbHNlXCIpO1xuICAgIHguY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cERyYWdBbmREcm9wKCkge1xuICAgIGNvbnN0IHBsYXllcjEgPSBuZXcgR2FtZWJvYXJkKCk7XG5cbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcbiAgICBsZXQgY3VycmVudFNoaXAgPSBudWxsO1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWRcIik7XG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgXCJkcmFnZ2VkXCIpO1xuICAgICAgICAgICAgY3VycmVudFNoaXAgPSBzaGlwO1xuICAgICAgICB9KTtcblxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsICgpID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBcIm1vdmVcIjtcbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBjdXJyZW50U2hpcC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWxlbmd0aFwiKTtcbiAgICAgICAgY29uc3Qgc2hpcEFuZ2xlID0gY3VycmVudFNoaXAuZ2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcEFuZ2xlLCBzaGlwTGVuZ3RoKTtcbiAgICAgICAgaWYgKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpID09PSBcImRyYWdnZWRcIiAmJiBzaGlwTGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gZ3JpZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGdyaWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICAgICAgICBjb25zdCBjZWxsWCA9IE1hdGguZmxvb3IoKHggLyBncmlkLm9mZnNldFdpZHRoKSAqIDgpO1xuICAgICAgICAgICAgY29uc3QgY2VsbFkgPSBNYXRoLmZsb29yKCh5IC8gZ3JpZC5vZmZzZXRIZWlnaHQpICogOCk7XG4gICAgICAgICAgICBjb25zdCBkcmFnQ29vcmRzID0gW2NlbGxZLCBjZWxsWF07XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBTaGlwIGFuZCBwbGFjZSBpdCBvbiB0aGUgZ3JpZFxuICAgICAgICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwKHNoaXBBbmdsZSwgcGFyc2VJbnQoc2hpcExlbmd0aCksIGRyYWdDb29yZHMpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdTaGlwKTtcblxuICAgICAgICAgICAgY29uc3QgYm9hdFBsYWNlZCA9IHBsYXllcjEucGxhY2VCb2F0KG5ld1NoaXApO1xuICAgICAgICAgICAgaWYgKGJvYXRQbGFjZWQpIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlU2hpcERyYWcoY3VycmVudFNoaXApO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gbnVsbDtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZy1vdmVyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwbGF5ZXIxXG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHdvREFycmF5ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9LCAoKSA9PiBBcnJheSg4KS5maWxsKDApKTtcbiAgICAgICAgdGhpcy5ncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkXCIpO1xuICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcbiAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuc2hpcERlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1kZXN0cm95ZXJcIik7XG4gICAgICAgIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzID0gW107IC8vIEFycmF5IHRvIHN0b3JlIGNsaWNrIGV2ZW50IGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMuc2hpcHNQbGFjZWQgPSAwOyAvLyBLZWVwIHRyYWNrIG9mIHRoZSBudW1iZXIgb2Ygc2hpcHMgcGxhY2VkXG4gICAgICAgIHRoaXMuaXNGaW5pc2hlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcyA9IG5ldyBTZXQoKTsgLy8gU2V0IHRvIHN0b3JlIHByZXZpb3VzbHkgYXR0YWNrZWQgY29vcmRpbmF0ZXNcbiAgICB9XG4gICAgY3JlYXRlR3JpZCgpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHRhYmxlIGVsZW1lbnRcbiAgICAgICAgdmFyIHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgLy8gQWRkIGEgbmV3IHJvdyB0byB0aGUgdGFibGVcbiAgICAgICAgICAgIHZhciByb3cgPSB0YWJsZS5pbnNlcnRSb3coaSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGEgY2VsbCB0byB0aGUgY3VycmVudCByb3dcbiAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IHJvdy5pbnNlcnRDZWxsKGopO1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtaXRlbVwiKTtcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgdGFibGUgdG8gdGhlIGdyaWQgY29udGFpbmVyXG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gICAgfVxuXG4gICAgYWRkQ2xpY2tFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5ncmlkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtyb3csIGNvbHVtbl07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRDb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzOyAvLyBTdG9yZSBjb29yZGluYXRlcyBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRDb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZWxlY3RlZCBDZWxsIENvb3JkaW5hdGVzOicsIGNvb3JkaW5hdGVzLCBcInRoaXMuY2xpY2tlZDpcIiwgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sdW1uXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbHVtbl0gPSBcIlhcIjtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJIaXQhXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTWlzcyFcIik7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGxhY2VCb2F0KGJvYXQsIHNob3VsZEFkZENsYXNzID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB7IGFuZ2xlLCBsZW5ndGgsIGxvY2F0aW9uIH0gPSBib2F0O1xuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gbG9jYXRpb247XG5cbiAgICAgICAgaWYgKGFuZ2xlID09PSAnSCcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sICsgaSA+PSA4IHx8IHRoaXMudHdvREFycmF5W3Jvd11bY29sICsgaV0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbCArIGldID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQWRkQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZENvbnRhaW5lci5yb3dzW3Jvd10uY2VsbHNbY29sICsgaV07XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYm9hdC1jZWxsJyk7IC8vIEFkZCBhIENTUyBjbGFzcyB0byBzdHlsZSB0aGUgYm9hdCBjZWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSAnVicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocm93ICsgaSA+PSA4IHx8IHRoaXMudHdvREFycmF5W3JvdyArIGldW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3cgKyBpXVtjb2xdID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQWRkQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZENvbnRhaW5lci5yb3dzW3JvdyArIGldLmNlbGxzW2NvbF07XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYm9hdC1jZWxsJyk7IC8vIEFkZCBhIENTUyBjbGFzcyB0byBzdHlsZSB0aGUgYm9hdCBjZWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hpcHNQbGFjZWQrK1xuICAgICAgICBpZiAodGhpcy5zaGlwc1BsYWNlZCA+PSAzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQcm9taXNlKCk7IC8vIFJlc29sdmUgdGhlIHByb21pc2Ugd2hlbiB0aGUgY291bnRlciByZWFjaGVzIDNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB3YWl0Rm9yRmluaXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0ZpbmlzaGVkUHJvbWlzZTtcbiAgICB9XG4gICAgYWxsUGxhY2VkKCkge1xuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkKys7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhyZWUgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZFxuICAgICAgICBpZiAodGhpcy5zaGlwc1BsYWNlZCA9PT0gMykge1xuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJldHVybiBhIHBlbmRpbmcgcHJvbWlzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzb2x2ZSwgXCJkb2VzbnR3b3JrcyFcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgcmV0dXJuIFwidGhpcy5jbGlja2VkQ29vcmRpbmF0ZXNcIjtcbiAgICB9XG5cblxuICAgIGZpbmRFbmdHYW1lKCkge1xuICAgICAgICBjb25zdCBmbGF0dGVuZWRBcnJheSA9IHRoaXMudHdvREFycmF5LmZsYXQoKTsgLy8gRmxhdHRlbiB0aGUgMkQgYXJyYXlcbiAgICAgICAgY29uc3QgY291bnRYID0gZmxhdHRlbmVkQXJyYXkuZmlsdGVyKGl0ZW0gPT4gaXRlbSA9PT0gJ1gnKS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBjb3VudFggPj0gNjtcbiAgICB9XG5cbiAgICBjaGVjaygpIHtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjbGljayBldmVudCBjb29yZGluYXRlc1xuICAgICAgICByZXR1cm4gdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXM7XG4gICAgfVxuXG4gICAgcGxhY2VSYW5kb21TaGlwcygpIHtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbXG4gICAgICAgICAgICB7IHR5cGU6ICdEZXN0cm95ZXInLCBsZW5ndGg6IDIgfSxcbiAgICAgICAgICAgIHsgdHlwZTogJ1N1Ym1hcmluZScsIGxlbmd0aDogMyB9LFxuICAgICAgICAgICAgeyB0eXBlOiAnQ3J1aXNlcicsIGxlbmd0aDogNCB9XG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgICAgICAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHdoaWxlICghcGxhY2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSYW5kb21seSBjaG9vc2Ugb3JpZW50YXRpb24sIGVuc3VyaW5nIGl0IGZpdHMgd2l0aGluIHRoZSBnYW1lIGJvYXJkJ3MgYm91bmRhcmllc1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSAmJiBjb2wgKyBzaGlwLmxlbmd0aCA8PSA4ID8gJ0gnIDogJ1YnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxhY2VCb2F0KG5ldyBTaGlwKG9yaWVudGF0aW9uLCBzaGlwLmxlbmd0aCwgW3JvdywgY29sXSksIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlUmFuZG9tQXR0YWNrKCkge1xuICAgICAgICAvLyBGdW5jdGlvbiB0byBnZW5lcmF0ZSBhIHJhbmRvbSBjb29yZGluYXRlIFtyb3csIGNvbF0gd2l0aGluIHRoZSA4eDggZ3JpZFxuICAgICAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGNvb3JkaW5hdGU7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGUgPSBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgICAgfSB3aGlsZSAodGhpcy5wcmV2aW91c0F0dGFja3MuaGFzKGNvb3JkaW5hdGUpKTsgLy8gRW5zdXJlIHRoZSBjb29yZGluYXRlIGhhc24ndCBiZWVuIGF0dGFja2VkIGJlZm9yZVxuXG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzLmFkZChjb29yZGluYXRlKTtcblxuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZTtcbiAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhpdCEhXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNaXNzISFcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjZWl2ZUF0dGFjazEoKSB7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBtYWtlcyBhIEhpdCFcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyIG1ha2VzIGEgTWlzcyFcIik7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAvLyAgICAgcmVjaWV2ZUF0dGFjayh4KSB7XG4gICAgLy8gICAgIGlmICh0aGlzLnR3b0RBcnJheVt4WzBdXVt4WzFdXSA9PT0gMSkge1xuICAgIC8vICAgICAgICAgdGhpcy50d29EQXJyYXlbeFswXV1beFsxXV0gPSBcIlhcIlxuICAgIC8vICAgICAgICAgcmV0dXJuIFwiaGl0IVwiXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSBpZiAodGhpcy50d29EQXJyYXlbeFswXV1beFsxXV0gPT09IDApIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBcIm1pc3MhXCI7XG4gICAgLy8gICAgIH1cblxuXG4gICAgLy8gfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbih0ZXh0LCBjbGlja0hhbmRsZXIpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uLWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChidXR0b24pO1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwLmpzXCI7XG5pbXBvcnQgeyBzZXR1cERyYWdBbmREcm9wIH0gZnJvbSAnLi9kcmFnQW5kRHJvcCc7XG5pbXBvcnQgY3JlYXRlQnV0dG9uIGZyb20gJy4vcGxheS1yZXNldCc7XG5cbmNvbnN0IHBsYXllcjEgPSBzZXR1cERyYWdBbmREcm9wKCk7XG5jb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtY29udGFpbmVyXCIpO1xuY29uc3QgYWxsU2hpcHMgPSBzZXR1cERyYWdBbmREcm9wKCk7XG5cbnNoaXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBjb25zdCBzd2l0Y2hBbmdsZUVsZW1lbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5zd2l0Y2gtYW5nbGVcIik7XG5cbiAgICBpZiAoc3dpdGNoQW5nbGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHNoaXBFbGVtZW50ID0gc3dpdGNoQW5nbGVFbGVtZW50LmNsb3Nlc3QoXCIuc2hpcFwiKTtcbiAgICAgICAgY29uc3QgY3VycmVudERhdGFBbmdsZSA9IHN3aXRjaEFuZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFuZ2xlXCIpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBiZXR3ZWVuIFwiSFwiIGFuZCBcIlZcIiBmb3IgZGF0YS1hbmdsZVxuICAgICAgICBzd2l0Y2hBbmdsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiLCBjdXJyZW50RGF0YUFuZ2xlID09PSBcIkhcIiA/IFwiVlwiIDogXCJIXCIpO1xuICAgICAgICBzd2l0Y2hBbmdsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50RGF0YUFuZ2xlID09PSBcIkhcIiA/IFwiVlwiIDogXCJIXCI7XG5cbiAgICAgICAgc2hpcEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiLCBjdXJyZW50RGF0YUFuZ2xlID09PSBcIkhcIiA/IFwiVlwiIDogXCJIXCIpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIxKVxuXG59KTtcbmNvbnNvbGUubG9nKHBsYXllcjEpXG5cbi8vIHBsYXllcjEud2FpdEZvckZpbmlzaCgpLnRoZW4oKCkgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKFwiSW5zdGFuY2UgaXMgZmluaXNoZWTCrMKsIVwiKTtcbi8vICAgICBjcmVhdGVCdXR0b24oXCJQbGF5XCIsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgYWxlcnQoXCJQbGF5IGJ1dHRvbiBjbGlja2VkXCIpO1xuLy8gICAgICAgICBjb25zdCBjb21wdXRlclBsYXllciA9IG5ldyBHYW1lYm9hcmRcbi8vICAgICAgICAgY29tcHV0ZXJQbGF5ZXIucGxhY2VSYW5kb21TaGlwcygpO1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhjb21wdXRlclBsYXllci50d29EQXJyYXkpXG4vLyAgICAgfSk7XG5cbi8vICAgICBjcmVhdGVCdXR0b24oXCJSZXNldFwiLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGFsZXJ0KFwiUmVzZXQgYnV0dG9uIGNsaWNrZWRcIik7XG4vLyAgICAgICAgIC8vIEFkZCB5b3VyIHJlc2V0IGxvZ2ljIGhlcmVcbi8vICAgICB9KTtcbi8vIH0pO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuXG4gICAgd2hpbGUgKCFwbGF5ZXIxLmZpbmRFbmdHYW1lKCkpIHtcbiAgICAgICAgLy8gUGxheWVyMSdzIHR1cm5cbiAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIxJ3MgdHVybjpcIik7XG4gICAgICAgIGNvbXB1dGVyUGxheWVyLnJlY2VpdmVBdHRhY2sxKCk7IC8vIFlvdSBtYXkgcmVwbGFjZSB0aGlzIHdpdGggeW91ciBhY3R1YWwgdXNlciBpbnB1dCBtZWNoYW5pc21cbiAgICAgICAgLy8gcGxheWVyMS5kaXNwbGF5Qm9hcmQoKTtcblxuICAgICAgICAvLyBDaGVjayBpZiBwbGF5ZXIxIGhhcyB3b25cbiAgICAgICAgaWYgKHBsYXllcjEuZmluZEVuZ0dhbWUoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIxIHdpbnMhXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb21wdXRlclBsYXllcidzIHR1cm5cbiAgICAgICAgY29uc29sZS5sb2coXCJDb21wdXRlclBsYXllcidzIHR1cm46XCIpO1xuICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpOyAvLyBTaW11bGF0aW5nIGEgZGVsYXkgZm9yIGNvbXB1dGVyJ3MgbW92ZVxuICAgICAgICBwbGF5ZXIxLnJlY2VpdmVSYW5kb21BdHRhY2soKTtcbiAgICAgICAgcGxheWVyMS5kaXNwbGF5Qm9hcmQoKTtcblxuICAgICAgICAvLyBDaGVjayBpZiBjb21wdXRlclBsYXllciBoYXMgd29uXG4gICAgICAgIGlmIChjb21wdXRlclBsYXllci5maW5kRW5nR2FtZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbXB1dGVyUGxheWVyIHdpbnMhXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIFJ1biB0aGUgZ2FtZVxuLy9wbGF5R2FtZSgpOyJdLCJuYW1lcyI6WyJzaGlwQ291bnQiLCJTaGlwIiwiYW5nbGUiLCJsZW5ndGgiLCJsb2NhdGlvbiIsIl9jbGFzc0NhbGxDaGVjayIsIm5hbWUiLCJjcmVhdGVTaGlwTmFtZSIsImhwIiwic2luayIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwic2hpcEhpdCIsInNoaXBTdW5rIiwiY291bnQiLCJjb25jYXQiLCJkZWZhdWx0IiwiR2FtZWJvYXJkIiwiZGlzYWJsZVNoaXBEcmFnIiwieCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsInNldHVwRHJhZ0FuZERyb3AiLCJwbGF5ZXIxIiwic2hpcHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjdXJyZW50U2hpcCIsImdyaWQiLCJnZXRFbGVtZW50QnlJZCIsImZvckVhY2giLCJzaGlwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwicHJldmVudERlZmF1bHQiLCJkcm9wRWZmZWN0Iiwic2hpcExlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNoaXBBbmdsZSIsImNvbnNvbGUiLCJsb2ciLCJnZXREYXRhIiwiY2xpZW50WCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJ5IiwiY2xpZW50WSIsInRvcCIsImNlbGxYIiwiTWF0aCIsImZsb29yIiwib2Zmc2V0V2lkdGgiLCJjZWxsWSIsIm9mZnNldEhlaWdodCIsImRyYWdDb29yZHMiLCJuZXdTaGlwIiwicGFyc2VJbnQiLCJib2F0UGxhY2VkIiwicGxhY2VCb2F0IiwidGFyZ2V0IiwicmVtb3ZlIiwiX3RoaXMiLCJ0d29EQXJyYXkiLCJBcnJheSIsImZyb20iLCJmaWxsIiwiZ3JpZENvbnRhaW5lciIsImNyZWF0ZUdyaWQiLCJhZGRDbGlja0V2ZW50TGlzdGVuZXJzIiwic2hpcERlc3Ryb3llciIsInF1ZXJ5U2VsZWN0b3IiLCJjbGlja2VkQ29vcmRpbmF0ZXMiLCJzaGlwc1BsYWNlZCIsImlzRmluaXNoZWRQcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZXNvbHZlUHJvbWlzZSIsInByZXZpb3VzQXR0YWNrcyIsIlNldCIsInRhYmxlIiwiY3JlYXRlRWxlbWVudCIsImkiLCJyb3ciLCJpbnNlcnRSb3ciLCJqIiwiY2VsbCIsImluc2VydENlbGwiLCJkYXRhc2V0IiwiY29sdW1uIiwiYXBwZW5kQ2hpbGQiLCJfdGhpczIiLCJldmVudCIsImNvbnRhaW5zIiwiY29vcmRpbmF0ZXMiLCJib2F0Iiwic2hvdWxkQWRkQ2xhc3MiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJfbG9jYXRpb24iLCJfc2xpY2VkVG9BcnJheSIsImNvbCIsInJvd3MiLCJjZWxscyIsIndhaXRGb3JGaW5pc2giLCJhbGxQbGFjZWQiLCJydW4iLCJmaW5kRW5nR2FtZSIsImZsYXR0ZW5lZEFycmF5IiwiZmxhdCIsImNvdW50WCIsImZpbHRlciIsIml0ZW0iLCJjaGVjayIsInBsYWNlUmFuZG9tU2hpcHMiLCJ0eXBlIiwiX2k0IiwiX3NoaXBzIiwicGxhY2VkIiwicmFuZG9tIiwib3JpZW50YXRpb24iLCJyZWNlaXZlUmFuZG9tQXR0YWNrIiwiZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlIiwiY29vcmRpbmF0ZSIsImhhcyIsIl9jb29yZGluYXRlIiwiX2Nvb3JkaW5hdGUyIiwicmVjZWl2ZUF0dGFjazEiLCJfdGhpcyRjbGlja2VkQ29vcmRpbmEiLCJjcmVhdGVCdXR0b24iLCJ0ZXh0IiwiY2xpY2tIYW5kbGVyIiwiYnV0dG9uIiwidGV4dENvbnRlbnQiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwidCIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJuIiwiaGFzT3duUHJvcGVydHkiLCJvIiwiZGVmaW5lUHJvcGVydHkiLCJTeW1ib2wiLCJhIiwiaXRlcmF0b3IiLCJjIiwiYXN5bmNJdGVyYXRvciIsInUiLCJ0b1N0cmluZ1RhZyIsImRlZmluZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIndyYXAiLCJHZW5lcmF0b3IiLCJjcmVhdGUiLCJDb250ZXh0IiwibWFrZUludm9rZU1ldGhvZCIsInRyeUNhdGNoIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwiZiIsInMiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwicCIsImQiLCJnZXRQcm90b3R5cGVPZiIsInYiLCJ2YWx1ZXMiLCJnIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJfdHlwZW9mIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsImtleXMiLCJyZXZlcnNlIiwicG9wIiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJ2YWwiLCJoYW5kbGUiLCJjb21wbGV0ZSIsImZpbmlzaCIsIl9jYXRjaCIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJyZWplY3QiLCJfbmV4dCIsIl90aHJvdyIsImluZm8iLCJlcnJvciIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZm4iLCJzZWxmIiwiYXJncyIsImFwcGx5IiwiZXJyIiwic2hpcHNDb250YWluZXIiLCJhbGxTaGlwcyIsInN3aXRjaEFuZ2xlRWxlbWVudCIsImNsb3Nlc3QiLCJzaGlwRWxlbWVudCIsImN1cnJlbnREYXRhQW5nbGUiLCJwbGF5R2FtZSIsIl9wbGF5R2FtZSIsIl9jYWxsZWUiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiY29tcHV0ZXJQbGF5ZXIiLCJzZXRUaW1lb3V0IiwiZGlzcGxheUJvYXJkIl0sInNvdXJjZVJvb3QiOiIifQ==