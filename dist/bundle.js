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
      this.gridContainer.appendChild(this.table);
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
          if (this.placeBoat(new _battleship__WEBPACK_IMPORTED_MODULE_0__["default"](orientation, ship.length, [row, col]), true)) {
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

        // Corrected: Use toString() on the coordinates array
        var coordinatesString = "".concat(row, ",").concat(col);
        console.log(generateRandomCoordinate);
        if (_this3.previousAttacks.has(coordinatesString)) {
          console.log("Already attacked these coordinates!");
          return;
        }
        console.log("Works"); // Log statement for testing

        if (_this3.twoDArray[row][col] === 1) {
          _this3.twoDArray[row][col] = "X";
          console.log("Computer makes a Hit!!");
          resolve("Computer makes a Hit!!");
        } else {
          console.log("Computer makes a Miss!!");
          resolve("Computer makes a Miss!!");
        }
        console.log(_this3.previousAttacks);
        _this3.previousAttacks.add(coordinatesString);
      });
    }
  }, {
    key: "receiveAttack1",
    value: function receiveAttack1() {
      var _this$clickedCoordina = _slicedToArray(this.clickedCoordinates, 2),
        row = _this$clickedCoordina[0],
        col = _this$clickedCoordina[1];
      var coordinatesString = "".concat(row, ",").concat(col);

      // Check if the coordinates have been attacked before
      if (this.previousAttacks.has(coordinatesString)) {
        console.log("Already attacked these coordinates!");
        return;
      }
      console.log(this.clickedCoordinates);
      if (this.twoDArray[row][col] === 1) {
        this.twoDArray[row][col] = "X";
        console.log("Player makes a Hit!!!");
      } else {
        console.log("Player makes a Miss!!!");
      }

      // Add the coordinates to the set after checking
      this.previousAttacks.add(coordinatesString);
      // console.log(this.previousAttacks);
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



var player1 = (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_1__.setupDragAndDrop)();
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
  _foobar = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function (resolve) {
            computerPlayer.table.addEventListener('mouseup', /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
                var row, column;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!event.target.classList.contains('grid-item')) {
                        _context2.next = 7;
                        break;
                      }
                      row = parseInt(event.target.dataset.row);
                      column = parseInt(event.target.dataset.column);
                      computerPlayer.clickedCoordinates = [row, column];
                      console.log('Selected Cell Coordinates:', computerPlayer.clickedCoordinates);
                      _context2.next = 7;
                      return computerPlayer.receiveAttack1();
                    case 7:
                      _context2.next = 9;
                      return player1.receiveRandomAttack();
                    case 9:
                      resolve();
                    case 10:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());
          }));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
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
    // Add your reset logic here
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvYmF0dGxlc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9kcmFnQW5kRHJvcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvcGxheS1yZXNldC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBzaGlwQ291bnQgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IoYW5nbGUsIGxlbmd0aCwgbG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMubmFtZSA9IHRoaXMuY3JlYXRlU2hpcE5hbWUobGVuZ3RoKTtcbiAgICAgICAgdGhpcy5ocCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5zaW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5hbmdsZSA9IGFuZ2xlO1xuICAgIH1cblxuICAgIHNoaXBIaXQoKSB7XG4gICAgICAgIHRoaXMuaHAtLTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5zaGlwU3VuaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hpcFN1bmsoKSB7XG4gICAgICAgIHRoaXMuc2luayA9IHRydWU7XG4gICAgfVxuXG4gICAgY3JlYXRlU2hpcE5hbWUobGVuZ3RoKSB7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkRlc3Ryb2VyXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJTdWJtYXJpbmVcIlxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIFwiY3J1aXN0ZXJcIlxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHNoaXBDb3VudFtsZW5ndGhdIHx8IDA7XG4gICAgICAgICAgICBzaGlwQ291bnRbbGVuZ3RoXSA9IGNvdW50ICsgMTtcbiAgICAgICAgICAgIHJldHVybiBgU2hpcCR7Y291bnR9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFzc2VydExvY2F0aW9uKGNvb3JkaW5hdGVzVG9DaGVjaywgY2FsbGJhY2spIHtcbiAgICAvLyAgICAgbGV0IGFsbFBsYWNlZCA9IHRydWU7XG4gICAgLy8gICAgIGNvb3JkaW5hdGVzVG9DaGVjay5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAvLyAgICAgICAgIGlmICghY2FsbGJhY2sucGxhY2VCb2F0KGNvb3JkKSkge1xuICAgIC8vICAgICAgICAgICAgIGFsbFBsYWNlZCA9IGZhbHNlO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcblxuICAgIC8vICAgICBpZiAoYWxsUGxhY2VkKSB7XG4gICAgLy8gICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNUb0NoZWNrO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiBcInRyeSBhZ2FpblwiO1xuICAgIC8vIH1cbn1cbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL2JhdHRsZXNoaXAuanNcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5mdW5jdGlvbiBkaXNhYmxlU2hpcERyYWcoeCkge1xuICAgIHguc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwiZmFsc2VcIik7XG4gICAgeC5jbGFzc0xpc3QuYWRkKFwicGxhY2VkLXNoaXBcIik7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRHJhZ0FuZERyb3AoKSB7XG4gICAgY29uc3QgcGxheWVyMSA9IG5ldyBHYW1lYm9hcmQoXCJ1c2VyXCIpO1xuICAgIC8vIHBsYXllcjEucmVjZWl2ZVJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uICgpIHtcblxuICAgIC8vICAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUgPSAoKSA9PiB7XG4gICAgLy8gICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAvLyAgICAgICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIC8vICAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gICAgLy8gICAgIH07XG5cbiAgICAvLyAgICAgbGV0IGNvb3JkaW5hdGU7XG4gICAgLy8gICAgIGRvIHtcbiAgICAvLyAgICAgICAgIGNvb3JkaW5hdGUgPSBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAvLyAgICAgfSB3aGlsZSAodGhpcy5wcmV2aW91c0F0dGFja3MuaGFzKGNvb3JkaW5hdGUpKTsgLy8gRW5zdXJlIHRoZSBjb29yZGluYXRlIGhhc24ndCBiZWVuIGF0dGFja2VkIGJlZm9yZVxuXG4gICAgLy8gICAgIHRoaXMucHJldmlvdXNBdHRhY2tzLmFkZChjb29yZGluYXRlKTtcblxuICAgIC8vICAgICAvLyBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZTtcbiAgICAvLyAgICAgLy8gaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9PT0gMSkge1xuICAgIC8vICAgICAvLyAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgLy8gICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkhpdCEhIGRyYWdcIik7XG4gICAgLy8gICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAgIC8vICAgICBjb25zb2xlLmxvZyhcIk1pc3MhISBkcm9wXCIpO1xuICAgIC8vICAgICAvLyB9XG5cblxuXG5cblxuXG5cbiAgICAvLyB9O1xuXG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XG4gICAgbGV0IGN1cnJlbnRTaGlwID0gbnVsbDtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkXCIpO1xuXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIFwiZHJhZ2dlZFwiKTtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gc2hpcDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50U2hpcCA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJtb3ZlXCI7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gY3VycmVudFNoaXAuZ2V0QXR0cmlidXRlKFwiZGF0YS1sZW5ndGhcIik7XG4gICAgICAgIGNvbnN0IHNoaXBBbmdsZSA9IGN1cnJlbnRTaGlwLmdldEF0dHJpYnV0ZShcImRhdGEtYW5nbGVcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBBbmdsZSwgc2hpcExlbmd0aCk7XG4gICAgICAgIGlmIChlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9wbGFpblwiKSA9PT0gXCJkcmFnZ2VkXCIgJiYgc2hpcExlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIGdyaWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSBncmlkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcblxuICAgICAgICAgICAgY29uc3QgY2VsbFggPSBNYXRoLmZsb29yKCh4IC8gZ3JpZC5vZmZzZXRXaWR0aCkgKiA4KTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxZID0gTWF0aC5mbG9vcigoeSAvIGdyaWQub2Zmc2V0SGVpZ2h0KSAqIDgpO1xuICAgICAgICAgICAgY29uc3QgZHJhZ0Nvb3JkcyA9IFtjZWxsWSwgY2VsbFhdO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgU2hpcCBhbmQgcGxhY2UgaXQgb24gdGhlIGdyaWRcbiAgICAgICAgICAgIGNvbnN0IG5ld1NoaXAgPSBuZXcgU2hpcChzaGlwQW5nbGUsIHBhcnNlSW50KHNoaXBMZW5ndGgpLCBkcmFnQ29vcmRzKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3U2hpcCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJvYXRQbGFjZWQgPSBwbGF5ZXIxLnBsYWNlQm9hdChuZXdTaGlwKTtcbiAgICAgICAgICAgIGlmIChib2F0UGxhY2VkKSB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZVNoaXBEcmFnKGN1cnJlbnRTaGlwKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2hpcCA9IG51bGw7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImRyYWctb3ZlclwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGxheWVyMVxufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vYmF0dGxlc2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllclR5cGUpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJUeXBlID0gcGxheWVyVHlwZTtcblxuICAgICAgICB0aGlzLnR3b0RBcnJheSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDggfSwgKCkgPT4gQXJyYXkoOCkuZmlsbCgwKSk7XG4gICAgICAgIHRoaXMudGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuICAgICAgICB0aGlzLmdyaWRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWRcIik7XG4gICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgICAgICB0aGlzLnNoaXBEZXN0cm95ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXAtZGVzdHJveWVyXCIpO1xuICAgICAgICB0aGlzLmNsaWNrZWRDb29yZGluYXRlcyA9IFtdO1xuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkID0gMDsgLy8gS2VlcCB0cmFjayBvZiB0aGUgbnVtYmVyIG9mIHNoaXBzIHBsYWNlZFxuICAgICAgICB0aGlzLmlzRmluaXNoZWRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c0F0dGFja3MgPSBuZXcgU2V0KCk7IC8vIFNldCB0byBzdG9yZSBwcmV2aW91c2x5IGF0dGFja2VkIGNvb3JkaW5hdGVzXG4gICAgICAgIC8vIGlmICh0aGlzLnBsYXllclR5cGUgPT09ICdjb21wdXRlcicpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuYWRkQ2xpY2tFdmVudExpc3RlbmVycygpO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIGNyZWF0ZUdyaWQoKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIC8vIEFkZCBhIG5ldyByb3cgdG8gdGhlIHRhYmxlXG4gICAgICAgICAgICB2YXIgcm93ID0gdGhpcy50YWJsZS5pbnNlcnRSb3coaSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGEgY2VsbCB0byB0aGUgY3VycmVudCByb3dcbiAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IHJvdy5pbnNlcnRDZWxsKGopO1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtaXRlbVwiKTtcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgdGFibGUgdG8gdGhlIGdyaWQgY29udGFpbmVyXG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnRhYmxlKTtcbiAgICB9XG5cbiAgICBhZGRDbGlja0V2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRDb29yZGluYXRlcyA9IFtyb3csIGNvbHVtbl07XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2VsZWN0ZWQgQ2VsbCBDb29yZGluYXRlczonLCB0aGlzLmNsaWNrZWRDb29yZGluYXRlcyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVBdHRhY2sxKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYWNlQm9hdChib2F0LCBzaG91bGRBZGRDbGFzcyA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBhbmdsZSwgbGVuZ3RoLCBsb2NhdGlvbiB9ID0gYm9hdDtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IGxvY2F0aW9uO1xuXG4gICAgICAgIGlmIChhbmdsZSA9PT0gJ0gnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbCArIGkgPj0gOCB8fCB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbCArIGldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2wgKyBpXSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEFkZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLnRhYmxlLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz1cIiR7cm93fVwiXVtkYXRhLWNvbHVtbj1cIiR7Y29sICsgaX1cIl1gKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdib2F0LWNlbGwnKTsgLy8gQWRkIGEgQ1NTIGNsYXNzIHRvIHN0eWxlIHRoZSBib2F0IGNlbGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYW5nbGUgPT09ICdWJykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyb3cgKyBpID49IDggfHwgdGhpcy50d29EQXJyYXlbcm93ICsgaV1bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMudHdvREFycmF5W3JvdyArIGldW2NvbF0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRBZGRDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy50YWJsZS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3JvdyArIGl9XCJdW2RhdGEtY29sdW1uPVwiJHtjb2x9XCJdYCk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYm9hdC1jZWxsJyk7IC8vIEFkZCBhIENTUyBjbGFzcyB0byBzdHlsZSB0aGUgYm9hdCBjZWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hpcHNQbGFjZWQrK1xuICAgICAgICBpZiAodGhpcy5zaGlwc1BsYWNlZCA+PSAzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQcm9taXNlKCk7IC8vIFJlc29sdmUgdGhlIHByb21pc2Ugd2hlbiB0aGUgY291bnRlciByZWFjaGVzIDNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB3YWl0Rm9yRmluaXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0ZpbmlzaGVkUHJvbWlzZTtcbiAgICB9XG4gICAgYWxsUGxhY2VkKCkge1xuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkKys7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhyZWUgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZFxuICAgICAgICBpZiAodGhpcy5zaGlwc1BsYWNlZCA9PT0gMykge1xuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJldHVybiBhIHBlbmRpbmcgcHJvbWlzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzb2x2ZSwgXCJkb2VzbnR3b3JrcyFcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IGNvbnNvbGUubG9nKFwiMm5kIHByb21pc2VcIiksIHJlc29sdmUoXCJhc1wiKSB9KTtcbiAgICB9XG4gICAgZm9vKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHsgY29uc29sZS5sb2coXCIzcmQgcHJvbWlzZVwiKSwgcmVzb2x2ZShcImFzXCIpIH0pO1xuICAgIH1cblxuICAgIGZpbmRFbmdHYW1lKCkge1xuICAgICAgICBjb25zdCBmbGF0dGVuZWRBcnJheSA9IHRoaXMudHdvREFycmF5LmZsYXQoKTsgLy8gRmxhdHRlbiB0aGUgMkQgYXJyYXlcbiAgICAgICAgY29uc3QgY291bnRYID0gZmxhdHRlbmVkQXJyYXkuZmlsdGVyKGl0ZW0gPT4gaXRlbSA9PT0gJ1gnKS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBjb3VudFggPj0gNjtcbiAgICB9XG5cbiAgICBjaGVjaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzO1xuICAgIH1cblxuICAgIHBsYWNlUmFuZG9tU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gW1xuICAgICAgICAgICAgeyB0eXBlOiAnRGVzdHJveWVyJywgbGVuZ3RoOiAyIH0sXG4gICAgICAgICAgICB7IHR5cGU6ICdTdWJtYXJpbmUnLCBsZW5ndGg6IDMgfSxcbiAgICAgICAgICAgIHsgdHlwZTogJ0NydWlzZXInLCBsZW5ndGg6IDQgfVxuICAgICAgICBdO1xuXG4gICAgICAgIGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuICAgICAgICAgICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB3aGlsZSAoIXBsYWNlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ICYmIGNvbCArIHNoaXAubGVuZ3RoIDw9IDggPyAnSCcgOiAnVic7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGFjZUJvYXQobmV3IFNoaXAob3JpZW50YXRpb24sIHNoaXAubGVuZ3RoLCBbcm93LCBjb2xdKSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2VpdmVSYW5kb21BdHRhY2soKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gQ29ycmVjdGVkOiBDYWxsIGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSB0byBnZXQgdGhlIGFjdHVhbCBjb29yZGluYXRlc1xuICAgICAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSgpO1xuXG4gICAgICAgICAgICAvLyBDb3JyZWN0ZWQ6IFVzZSB0b1N0cmluZygpIG9uIHRoZSBjb29yZGluYXRlcyBhcnJheVxuICAgICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXNTdHJpbmcgPSBgJHtyb3d9LCR7Y29sfWA7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aW91c0F0dGFja3MuaGFzKGNvb3JkaW5hdGVzU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWxyZWFkeSBhdHRhY2tlZCB0aGVzZSBjb29yZGluYXRlcyFcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtzXCIpOyAvLyBMb2cgc3RhdGVtZW50IGZvciB0ZXN0aW5nXG5cbiAgICAgICAgICAgIGlmICh0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPSBcIlhcIjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbXB1dGVyIG1ha2VzIGEgSGl0ISFcIik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcIkNvbXB1dGVyIG1ha2VzIGEgSGl0ISFcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXIgbWFrZXMgYSBNaXNzISFcIik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcIkNvbXB1dGVyIG1ha2VzIGEgTWlzcyEhXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZpb3VzQXR0YWNrcyk7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcy5hZGQoY29vcmRpbmF0ZXNTdHJpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrMSgpIHtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzO1xuICAgICAgICBjb25zdCBjb29yZGluYXRlc1N0cmluZyA9IGAke3Jvd30sJHtjb2x9YDtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY29vcmRpbmF0ZXMgaGF2ZSBiZWVuIGF0dGFja2VkIGJlZm9yZVxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c0F0dGFja3MuaGFzKGNvb3JkaW5hdGVzU3RyaW5nKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBbHJlYWR5IGF0dGFja2VkIHRoZXNlIGNvb3JkaW5hdGVzIVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzKTtcblxuICAgICAgICBpZiAodGhpcy50d29EQXJyYXlbcm93XVtjb2xdID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPSBcIlhcIjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIG1ha2VzIGEgSGl0ISEhXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgbWFrZXMgYSBNaXNzISEhXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRoZSBjb29yZGluYXRlcyB0byB0aGUgc2V0IGFmdGVyIGNoZWNraW5nXG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzLmFkZChjb29yZGluYXRlc1N0cmluZyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJldmlvdXNBdHRhY2tzKTtcbiAgICB9XG5cblxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbih0ZXh0LCBjbGlja0hhbmRsZXIpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uLWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChidXR0b24pO1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgeyBzZXR1cERyYWdBbmREcm9wIH0gZnJvbSAnLi9kcmFnQW5kRHJvcCc7XG5pbXBvcnQgY3JlYXRlQnV0dG9uIGZyb20gJy4vcGxheS1yZXNldCc7XG5cbmNvbnN0IHBsYXllcjEgPSBzZXR1cERyYWdBbmREcm9wKCk7XG5sZXQgY29tcHV0ZXJQbGF5ZXI7XG5jb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtY29udGFpbmVyXCIpO1xuLy9jb25zdCBhbGxTaGlwcyA9IHNldHVwRHJhZ0FuZERyb3AoKTtcblxuc2hpcHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHN3aXRjaEFuZ2xlRWxlbWVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnN3aXRjaC1hbmdsZVwiKTtcblxuICAgIGlmIChzd2l0Y2hBbmdsZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc2hpcEVsZW1lbnQgPSBzd2l0Y2hBbmdsZUVsZW1lbnQuY2xvc2VzdChcIi5zaGlwXCIpO1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0YUFuZ2xlID0gc3dpdGNoQW5nbGVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtYW5nbGVcIik7XG5cbiAgICAgICAgLy8gVG9nZ2xlIGJldHdlZW4gXCJIXCIgYW5kIFwiVlwiIGZvciBkYXRhLWFuZ2xlXG4gICAgICAgIHN3aXRjaEFuZ2xlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWFuZ2xlXCIsIGN1cnJlbnREYXRhQW5nbGUgPT09IFwiSFwiID8gXCJWXCIgOiBcIkhcIik7XG4gICAgICAgIHN3aXRjaEFuZ2xlRWxlbWVudC50ZXh0Q29udGVudCA9IGN1cnJlbnREYXRhQW5nbGUgPT09IFwiSFwiID8gXCJWXCIgOiBcIkhcIjtcblxuICAgICAgICBzaGlwRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWFuZ2xlXCIsIGN1cnJlbnREYXRhQW5nbGUgPT09IFwiSFwiID8gXCJWXCIgOiBcIkhcIik7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHBsYXllcjEpXG5cbn0pO1xuY29uc29sZS5sb2cocGxheWVyMSlcblxuYXN5bmMgZnVuY3Rpb24gZm9vYmFyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb21wdXRlclBsYXllci50YWJsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5yb3cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgICAgICAgICAgY29tcHV0ZXJQbGF5ZXIuY2xpY2tlZENvb3JkaW5hdGVzID0gW3JvdywgY29sdW1uXTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZWxlY3RlZCBDZWxsIENvb3JkaW5hdGVzOicsIGNvbXB1dGVyUGxheWVyLmNsaWNrZWRDb29yZGluYXRlcyk7XG5cbiAgICAgICAgICAgICAgICBhd2FpdCBjb21wdXRlclBsYXllci5yZWNlaXZlQXR0YWNrMSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCBwbGF5ZXIxLnJlY2VpdmVSYW5kb21BdHRhY2soKVxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxucGxheWVyMS53YWl0Rm9yRmluaXNoKCkudGhlbigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJJbnN0YW5jZSBpcyBmaW5pc2hlZCFcIik7XG4gICAgY29tcHV0ZXJQbGF5ZXIgPSBuZXcgR2FtZWJvYXJkKFwiY29tcHV0ZXJcIik7XG4gICAgY29tcHV0ZXJQbGF5ZXIucGxhY2VSYW5kb21TaGlwcygpO1xuXG4gICAgY3JlYXRlQnV0dG9uKFwiUGxheVwiLCBhc3luYyBmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAvLyBBZGQgeW91ciBsb2dpYyBoZXJlXG4gICAgICAgIC8vIElmIHRoaXMgZnVuY3Rpb24gaXMgYXN5bmNocm9ub3VzLCBoYW5kbGUgaXQgYWNjb3JkaW5nbHlcbiAgICB9KTtcblxuICAgIGNyZWF0ZUJ1dHRvbihcIlJlc2V0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWxlcnQoXCJSZXNldCBidXR0b24gY2xpY2tlZFwiKTtcbiAgICAgICAgLy8gQWRkIHlvdXIgcmVzZXQgbG9naWMgaGVyZVxuICAgIH0pO1xuXG4gICAgLy8gU3RhcnQgdGhlIGFzeW5jaHJvbm91cyBvcGVyYXRpb25zIGluIGZvb2JhclxuICAgIHJldHVybiBmb29iYXIoKTtcbn0pLmNhdGNoKGVycm9yID0+IHtcbiAgICBjb25zb2xlLmVycm9yKFwiQW4gZXJyb3Igb2NjdXJyZWQ6XCIsIGVycm9yKTtcbn0pO1xuXG5cbi8vIC50aGVuKGZpbmFsUmVzdWx0ID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhmaW5hbFJlc3VsdCk7XG4vLyB9KVxuXG5cbi8vIGFzeW5jIGZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuLy8gICAgIHdoaWxlICghcGxheWVyMS5maW5kRW5nR2FtZSgpICYmICFjb21wdXRlclBsYXllci5maW5kRW5nR2FtZSgpKSB7XG4vLyAgICAgICAgIC8vIFBsYXllcjEncyB0dXJuXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyMSdzIHR1cm46XCIpO1xuLy8gICAgICAgICBjb25zdCBbcGxheWVyUm93LCBwbGF5ZXJDb2xdID0gcGxheWVyMS5hZGRDbGlja0V2ZW50TGlzdGVuZXJzKCk7IC8vIEFzc3VtaW5nIGNoZWNrKCkgcmV0dXJucyB0aGUgbGFzdCBjbGlja2VkIGNvb3JkaW5hdGVzXG4vLyAgICAgICAgIGNvbXB1dGVyUGxheWVyLnJlY2VpdmVBdHRhY2sxKCk7XG5cbi8vICAgICAgICAgLy8gQ2hlY2sgaWYgcGxheWVyMSBoYXMgd29uXG4vLyAgICAgICAgIGlmIChwbGF5ZXIxLmZpbmRFbmdHYW1lKCkpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyMSB3aW5zIVwiKTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gQ29tcHV0ZXJQbGF5ZXIncyB0dXJuXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXJQbGF5ZXIncyB0dXJuOlwiKTtcbi8vICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTsgLy8gU2ltdWxhdGluZyBhIGRlbGF5IGZvciBjb21wdXRlcidzIG1vdmVcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJDb21wdXRlclBsYXllcidzIHR1cm46XCIpO1xuXG4vLyAgICAgICAgIGNvbnN0IFtjb21wdXRlclJvdywgY29tcHV0ZXJDb2xdID0gY29tcHV0ZXJQbGF5ZXIucmVjZWl2ZVJhbmRvbUF0dGFjaygpO1xuLy8gICAgICAgICBwbGF5ZXIxLnJlY2VpdmVBdHRhY2sxKGNvbXB1dGVyUm93LCBjb21wdXRlckNvbCk7XG4vLyAgICAgICAgIHBsYXllcjEuZGlzcGxheUJvYXJkKCk7XG5cbi8vICAgICAgICAgLy8gQ2hlY2sgaWYgY29tcHV0ZXJQbGF5ZXIgaGFzIHdvblxuLy8gICAgICAgICBpZiAoY29tcHV0ZXJQbGF5ZXIuZmluZEVuZ0dhbWUoKSkge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wdXRlclBsYXllciB3aW5zIVwiKTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfVxuXG4vLyAvLyBSdW4gdGhlIGdhbWVcbi8vIHBsYXlHYW1lKCk7XG5cbiJdLCJuYW1lcyI6WyJzaGlwQ291bnQiLCJTaGlwIiwiYW5nbGUiLCJsZW5ndGgiLCJsb2NhdGlvbiIsIl9jbGFzc0NhbGxDaGVjayIsIm5hbWUiLCJjcmVhdGVTaGlwTmFtZSIsImhwIiwic2luayIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwic2hpcEhpdCIsInNoaXBTdW5rIiwiY291bnQiLCJjb25jYXQiLCJkZWZhdWx0IiwiR2FtZWJvYXJkIiwiZGlzYWJsZVNoaXBEcmFnIiwieCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsInNldHVwRHJhZ0FuZERyb3AiLCJwbGF5ZXIxIiwic2hpcHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjdXJyZW50U2hpcCIsImdyaWQiLCJnZXRFbGVtZW50QnlJZCIsImZvckVhY2giLCJzaGlwIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwicHJldmVudERlZmF1bHQiLCJkcm9wRWZmZWN0Iiwic2hpcExlbmd0aCIsImdldEF0dHJpYnV0ZSIsInNoaXBBbmdsZSIsImNvbnNvbGUiLCJsb2ciLCJnZXREYXRhIiwiY2xpZW50WCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJ5IiwiY2xpZW50WSIsInRvcCIsImNlbGxYIiwiTWF0aCIsImZsb29yIiwib2Zmc2V0V2lkdGgiLCJjZWxsWSIsIm9mZnNldEhlaWdodCIsImRyYWdDb29yZHMiLCJuZXdTaGlwIiwicGFyc2VJbnQiLCJib2F0UGxhY2VkIiwicGxhY2VCb2F0IiwidGFyZ2V0IiwicmVtb3ZlIiwicGxheWVyVHlwZSIsIl90aGlzIiwidHdvREFycmF5IiwiQXJyYXkiLCJmcm9tIiwiZmlsbCIsInRhYmxlIiwiY3JlYXRlRWxlbWVudCIsImdyaWRDb250YWluZXIiLCJjcmVhdGVHcmlkIiwic2hpcERlc3Ryb3llciIsInF1ZXJ5U2VsZWN0b3IiLCJjbGlja2VkQ29vcmRpbmF0ZXMiLCJzaGlwc1BsYWNlZCIsImlzRmluaXNoZWRQcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZXNvbHZlUHJvbWlzZSIsInByZXZpb3VzQXR0YWNrcyIsIlNldCIsImkiLCJyb3ciLCJpbnNlcnRSb3ciLCJqIiwiY2VsbCIsImluc2VydENlbGwiLCJkYXRhc2V0IiwiY29sdW1uIiwiYXBwZW5kQ2hpbGQiLCJhZGRDbGlja0V2ZW50TGlzdGVuZXJzIiwiX3RoaXMyIiwiZXZlbnQiLCJjb250YWlucyIsInJlY2VpdmVBdHRhY2sxIiwiYm9hdCIsInNob3VsZEFkZENsYXNzIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiX2xvY2F0aW9uIiwiX3NsaWNlZFRvQXJyYXkiLCJjb2wiLCJ3YWl0Rm9yRmluaXNoIiwiYWxsUGxhY2VkIiwicnVuIiwiZm9vIiwiZmluZEVuZ0dhbWUiLCJmbGF0dGVuZWRBcnJheSIsImZsYXQiLCJjb3VudFgiLCJmaWx0ZXIiLCJpdGVtIiwiY2hlY2siLCJwbGFjZVJhbmRvbVNoaXBzIiwidHlwZSIsIl9pNCIsIl9zaGlwcyIsInBsYWNlZCIsInJhbmRvbSIsIm9yaWVudGF0aW9uIiwicmVjZWl2ZVJhbmRvbUF0dGFjayIsIl90aGlzMyIsImdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSIsIl9nZW5lcmF0ZVJhbmRvbUNvb3JkaSIsIl9nZW5lcmF0ZVJhbmRvbUNvb3JkaTIiLCJjb29yZGluYXRlc1N0cmluZyIsImhhcyIsIl90aGlzJGNsaWNrZWRDb29yZGluYSIsImNyZWF0ZUJ1dHRvbiIsInRleHQiLCJjbGlja0hhbmRsZXIiLCJidXR0b24iLCJ0ZXh0Q29udGVudCIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJ0IiwiciIsIk9iamVjdCIsInByb3RvdHlwZSIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsIm8iLCJkZWZpbmVQcm9wZXJ0eSIsIlN5bWJvbCIsImEiLCJpdGVyYXRvciIsImMiLCJhc3luY0l0ZXJhdG9yIiwidSIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwid3JhcCIsIkdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJhcmciLCJjYWxsIiwiaCIsImwiLCJmIiwicyIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJwIiwiZCIsImdldFByb3RvdHlwZU9mIiwidiIsInZhbHVlcyIsImciLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsIl90eXBlb2YiLCJfX2F3YWl0IiwidGhlbiIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiRXJyb3IiLCJkb25lIiwibWV0aG9kIiwiZGVsZWdhdGUiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJUeXBlRXJyb3IiLCJyZXN1bHROYW1lIiwibmV4dCIsIm5leHRMb2MiLCJwdXNoVHJ5RW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImlzTmFOIiwiZGlzcGxheU5hbWUiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiY29uc3RydWN0b3IiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsImFzeW5jIiwia2V5cyIsInJldmVyc2UiLCJwb3AiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicnZhbCIsImhhbmRsZSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwiZGVsZWdhdGVZaWVsZCIsImFzeW5jR2VuZXJhdG9yU3RlcCIsImdlbiIsInJlamVjdCIsIl9uZXh0IiwiX3Rocm93IiwiaW5mbyIsImVycm9yIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJmbiIsInNlbGYiLCJhcmdzIiwiYXBwbHkiLCJlcnIiLCJjb21wdXRlclBsYXllciIsInNoaXBzQ29udGFpbmVyIiwic3dpdGNoQW5nbGVFbGVtZW50IiwiY2xvc2VzdCIsInNoaXBFbGVtZW50IiwiY3VycmVudERhdGFBbmdsZSIsImZvb2JhciIsIl9mb29iYXIiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsIl9yZWYyIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJfeDIiLCJfcmVmIiwiX2NhbGxlZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJfeCIsImFsZXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==