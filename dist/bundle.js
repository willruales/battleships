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
        console.log("Works"); // Log statement for testing

        var coordinate;
        do {
          coordinate = generateRandomCoordinate();
        } while (_this3.previousAttacks.has(coordinate)); // Ensure the coordinate hasn't been attacked before

        _this3.previousAttacks.add(coordinate);
        var _coordinate = coordinate,
          _coordinate2 = _slicedToArray(_coordinate, 2),
          row = _coordinate2[0],
          col = _coordinate2[1];
        if (_this3.twoDArray[row][col] === 1) {
          _this3.twoDArray[row][col] = "X";
          console.log("Computer makes a Hit!!"); // Corrected log statement
          resolve("Computer makes a Hit!!");
        } else {
          console.log("Computer makes a Miss!!"); // Corrected log statement
          resolve("Computer makes a Miss!!");
        }
      });
      // const generateRandomCoordinate = () => {
      //     const row = Math.floor(Math.random() * 8);
      //     const col = Math.floor(Math.random() * 8);
      //     return [row, col];
      // };

      // let coordinate;
      // do {
      //     coordinate = generateRandomCoordinate();
      // } while (this.previousAttacks.has(coordinate)); // Ensure the coordinate hasn't been attacked before

      // this.previousAttacks.add(coordinate);

      // const [row, col] = coordinate;
      // if (this.twoDArray[row][col] === 1) {
      //     this.twoDArray[row][col] = "X";
      //     console.log("Hit!!");
      // } else {
      //     console.log("Miss!!");
      // }
    }
  }, {
    key: "receiveAttack1",
    value: function receiveAttack1() {
      var _this$clickedCoordina = _slicedToArray(this.clickedCoordinates, 2),
        row = _this$clickedCoordina[0],
        col = _this$clickedCoordina[1];
      console.log(this.clickedCoordinates);
      if (this.twoDArray[row][col] === 1) {
        this.twoDArray[row][col] = "X";
        console.log("Player makes a Hit!!!");
      } else {
        console.log("Player makes a Miss!!!");
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
                      return player1.run();
                    case 9:
                      _context2.next = 11;
                      return player1.foo();
                    case 11:
                      _context2.next = 13;
                      return player1.receiveRandomAttack();
                    case 13:
                      // Resolve the Promise when all asynchronous operations are finished
                      resolve();
                    case 14:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());
            // player1.run();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUFDLElBRUVDLElBQUk7RUFDckIsU0FBQUEsS0FBWUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVDLFFBQVEsRUFBRTtJQUFBQyxlQUFBLE9BQUFKLElBQUE7SUFDakMsSUFBSSxDQUFDRSxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDRyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxjQUFjLENBQUNKLE1BQU0sQ0FBQztJQUN2QyxJQUFJLENBQUNLLEVBQUUsR0FBR0wsTUFBTTtJQUNoQixJQUFJLENBQUNNLElBQUksR0FBRyxLQUFLO0lBQ2pCLElBQUksQ0FBQ0wsUUFBUSxHQUFHQSxRQUFRO0lBQ3hCLElBQUksQ0FBQ0YsS0FBSyxHQUFHQSxLQUFLO0VBQ3RCO0VBQUNRLFlBQUEsQ0FBQVQsSUFBQTtJQUFBVSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBQyxRQUFBLEVBQVU7TUFDTixJQUFJLENBQUNMLEVBQUUsRUFBRTtNQUNULElBQUksSUFBSSxDQUFDQSxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQ2QsSUFBSSxDQUFDTSxRQUFRLENBQUMsQ0FBQztNQUNuQjtJQUNKO0VBQUM7SUFBQUgsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQUUsU0FBQSxFQUFXO01BQ1AsSUFBSSxDQUFDTCxJQUFJLEdBQUcsSUFBSTtJQUNwQjtFQUFDO0lBQUFFLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFMLGVBQWVKLE1BQU0sRUFBRTtNQUNuQixJQUFJQSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2QsT0FBTyxVQUFVO01BQ3JCLENBQUMsTUFDSSxJQUFJQSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ25CLE9BQU8sV0FBVztNQUN0QixDQUFDLE1BQ0ksSUFBSUEsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNuQixPQUFPLFVBQVU7TUFDckIsQ0FBQyxNQUVJO1FBQ0QsSUFBTVksS0FBSyxHQUFHZixTQUFTLENBQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDcENILFNBQVMsQ0FBQ0csTUFBTSxDQUFDLEdBQUdZLEtBQUssR0FBRyxDQUFDO1FBQzdCLGNBQUFDLE1BQUEsQ0FBY0QsS0FBSztNQUN2QjtJQUNKOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFBQTtFQUFBLE9BQUFkLElBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRCtCO0FBQ0k7QUFDdkMsU0FBU2tCLGVBQWVBLENBQUNDLENBQUMsRUFBRTtFQUN4QkEsQ0FBQyxDQUFDQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQztFQUNwQ0QsQ0FBQyxDQUFDRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFDbEM7QUFHTyxTQUFTQyxnQkFBZ0JBLENBQUEsRUFBRztFQUMvQixJQUFNQyxPQUFPLEdBQUcsSUFBSVAscURBQVMsQ0FBQyxNQUFNLENBQUM7RUFDckM7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFRQTs7RUFFQSxJQUFNUSxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO0VBQ2hELElBQUlDLFdBQVcsR0FBRyxJQUFJO0VBQ3RCLElBQU1DLElBQUksR0FBR0gsUUFBUSxDQUFDSSxjQUFjLENBQUMsTUFBTSxDQUFDO0VBRTVDTCxLQUFLLENBQUNNLE9BQU8sQ0FBQyxVQUFDQyxJQUFJLEVBQUs7SUFDcEJBLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUNDLENBQUMsRUFBSztNQUN0Q0EsQ0FBQyxDQUFDQyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO01BQy9DUixXQUFXLEdBQUdJLElBQUk7SUFDdEIsQ0FBQyxDQUFDO0lBRUZBLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFlBQU07TUFDbkNMLFdBQVcsR0FBRyxJQUFJO0lBQ3RCLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGQyxJQUFJLENBQUNJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDQyxDQUFDLEVBQUs7SUFDckNBLENBQUMsQ0FBQ0csY0FBYyxDQUFDLENBQUM7SUFDbEJILENBQUMsQ0FBQ0MsWUFBWSxDQUFDRyxVQUFVLEdBQUcsTUFBTTtFQUN0QyxDQUFDLENBQUM7RUFFRlQsSUFBSSxDQUFDSSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsVUFBQ0MsQ0FBQyxFQUFLO0lBQ3RDQSxDQUFDLENBQUNHLGNBQWMsQ0FBQyxDQUFDO0VBQ3RCLENBQUMsQ0FBQztFQUVGUixJQUFJLENBQUNJLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFDQyxDQUFDLEVBQUs7SUFDdENBLENBQUMsQ0FBQ0csY0FBYyxDQUFDLENBQUM7RUFDdEIsQ0FBQyxDQUFDO0VBRUZSLElBQUksQ0FBQ0ksZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQUNDLENBQUMsRUFBSztJQUNqQ0EsQ0FBQyxDQUFDRyxjQUFjLENBQUMsQ0FBQztJQUNsQixJQUFNRSxVQUFVLEdBQUdYLFdBQVcsQ0FBQ1ksWUFBWSxDQUFDLGFBQWEsQ0FBQztJQUMxRCxJQUFNQyxTQUFTLEdBQUdiLFdBQVcsQ0FBQ1ksWUFBWSxDQUFDLFlBQVksQ0FBQztJQUN4REUsT0FBTyxDQUFDQyxHQUFHLENBQUNGLFNBQVMsRUFBRUYsVUFBVSxDQUFDO0lBQ2xDLElBQUlMLENBQUMsQ0FBQ0MsWUFBWSxDQUFDUyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssU0FBUyxJQUFJTCxVQUFVLEVBQUU7TUFDbEUsSUFBTXBCLENBQUMsR0FBR2UsQ0FBQyxDQUFDVyxPQUFPLEdBQUdoQixJQUFJLENBQUNpQixxQkFBcUIsQ0FBQyxDQUFDLENBQUNDLElBQUk7TUFDdkQsSUFBTUMsQ0FBQyxHQUFHZCxDQUFDLENBQUNlLE9BQU8sR0FBR3BCLElBQUksQ0FBQ2lCLHFCQUFxQixDQUFDLENBQUMsQ0FBQ0ksR0FBRztNQUV0RCxJQUFNQyxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFFbEMsQ0FBQyxHQUFHVSxJQUFJLENBQUN5QixXQUFXLEdBQUksQ0FBQyxDQUFDO01BQ3BELElBQU1DLEtBQUssR0FBR0gsSUFBSSxDQUFDQyxLQUFLLENBQUVMLENBQUMsR0FBR25CLElBQUksQ0FBQzJCLFlBQVksR0FBSSxDQUFDLENBQUM7TUFDckQsSUFBTUMsVUFBVSxHQUFHLENBQUNGLEtBQUssRUFBRUosS0FBSyxDQUFDOztNQUVqQztNQUNBLElBQU1PLE9BQU8sR0FBRyxJQUFJMUQsc0RBQUksQ0FBQ3lDLFNBQVMsRUFBRWtCLFFBQVEsQ0FBQ3BCLFVBQVUsQ0FBQyxFQUFFa0IsVUFBVSxDQUFDO01BRXJFZixPQUFPLENBQUNDLEdBQUcsQ0FBQ2UsT0FBTyxDQUFDO01BRXBCLElBQU1FLFVBQVUsR0FBR3BDLE9BQU8sQ0FBQ3FDLFNBQVMsQ0FBQ0gsT0FBTyxDQUFDO01BQzdDLElBQUlFLFVBQVUsRUFBRTtRQUNaMUMsZUFBZSxDQUFDVSxXQUFXLENBQUM7UUFDNUJBLFdBQVcsR0FBRyxJQUFJO1FBQ2xCTSxDQUFDLENBQUM0QixNQUFNLENBQUN6QyxTQUFTLENBQUMwQyxNQUFNLENBQUMsV0FBVyxDQUFDO01BQzFDO0lBRUo7RUFDSixDQUFDLENBQUM7RUFFRixPQUFPdkMsT0FBTztBQUNsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEdnQztBQUFBLElBRVhQLFNBQVM7RUFDMUIsU0FBQUEsVUFBWStDLFVBQVUsRUFBRTtJQUFBLElBQUFDLEtBQUE7SUFBQTdELGVBQUEsT0FBQWEsU0FBQTtJQUNwQixJQUFJLENBQUMrQyxVQUFVLEdBQUdBLFVBQVU7SUFFNUIsSUFBSSxDQUFDRSxTQUFTLEdBQUdDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDO01BQUVsRSxNQUFNLEVBQUU7SUFBRSxDQUFDLEVBQUU7TUFBQSxPQUFNaUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQUEsRUFBQztJQUNsRSxJQUFJLENBQUNDLEtBQUssR0FBRzVDLFFBQVEsQ0FBQzZDLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDNUMsSUFBSSxDQUFDQyxhQUFhLEdBQUc5QyxRQUFRLENBQUNJLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFDcEQsSUFBSSxDQUFDMkMsVUFBVSxDQUFDLENBQUM7SUFDakIsSUFBSSxDQUFDQyxhQUFhLEdBQUdoRCxRQUFRLENBQUNpRCxhQUFhLENBQUMsaUJBQWlCLENBQUM7SUFDOUQsSUFBSSxDQUFDQyxrQkFBa0IsR0FBRyxFQUFFO0lBQzVCLElBQUksQ0FBQ0MsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUcsSUFBSUMsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztNQUM5Q2YsS0FBSSxDQUFDZ0IsY0FBYyxHQUFHRCxPQUFPO0lBQ2pDLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQ0UsZUFBZSxHQUFHLElBQUlDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQztJQUNBO0lBQ0E7RUFDSjtFQUFDMUUsWUFBQSxDQUFBUSxTQUFBO0lBQUFQLEdBQUE7SUFBQUMsS0FBQSxFQUNELFNBQUE4RCxXQUFBLEVBQWE7TUFFVCxLQUFLLElBQUlXLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsRUFBRSxFQUFFO1FBQ3hCO1FBQ0EsSUFBSUMsR0FBRyxHQUFHLElBQUksQ0FBQ2YsS0FBSyxDQUFDZ0IsU0FBUyxDQUFDRixDQUFDLENBQUM7UUFFakMsS0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRTtVQUN4QjtVQUNBLElBQUlDLElBQUksR0FBR0gsR0FBRyxDQUFDSSxVQUFVLENBQUNGLENBQUMsQ0FBQztVQUM1QkMsSUFBSSxDQUFDbkUsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO1VBQy9Ca0UsSUFBSSxDQUFDRSxPQUFPLENBQUNMLEdBQUcsR0FBR0QsQ0FBQztVQUNwQkksSUFBSSxDQUFDRSxPQUFPLENBQUNDLE1BQU0sR0FBR0osQ0FBQztRQUMzQjtNQUNKOztNQUVBO01BQ0EsSUFBSSxDQUFDZixhQUFhLENBQUNvQixXQUFXLENBQUMsSUFBSSxDQUFDdEIsS0FBSyxDQUFDO0lBQzlDO0VBQUM7SUFBQTVELEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFrRix1QkFBQSxFQUF5QjtNQUFBLElBQUFDLE1BQUE7TUFDckIsSUFBSSxDQUFDeEIsS0FBSyxDQUFDckMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUM4RCxLQUFLLEVBQUs7UUFDOUMsSUFBSUEsS0FBSyxDQUFDakMsTUFBTSxDQUFDekMsU0FBUyxDQUFDMkUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1VBQzlDLElBQU1YLEdBQUcsR0FBRzFCLFFBQVEsQ0FBQ29DLEtBQUssQ0FBQ2pDLE1BQU0sQ0FBQzRCLE9BQU8sQ0FBQ0wsR0FBRyxDQUFDO1VBQzlDLElBQU1NLE1BQU0sR0FBR2hDLFFBQVEsQ0FBQ29DLEtBQUssQ0FBQ2pDLE1BQU0sQ0FBQzRCLE9BQU8sQ0FBQ0MsTUFBTSxDQUFDO1VBQ3BERyxNQUFJLENBQUNsQixrQkFBa0IsR0FBRyxDQUFDUyxHQUFHLEVBQUVNLE1BQU0sQ0FBQztVQUV2Q2pELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDRCQUE0QixFQUFFbUQsTUFBSSxDQUFDbEIsa0JBQWtCLENBQUM7VUFFbEVrQixNQUFJLENBQUNHLGNBQWMsQ0FBQyxDQUFDO1FBQ3pCO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFBQztJQUFBdkYsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQWtELFVBQVVxQyxJQUFJLEVBQXlCO01BQUEsSUFBdkJDLGNBQWMsR0FBQUMsU0FBQSxDQUFBbEcsTUFBQSxRQUFBa0csU0FBQSxRQUFBQyxTQUFBLEdBQUFELFNBQUEsTUFBRyxJQUFJO01BQ2pDLElBQVFuRyxLQUFLLEdBQXVCaUcsSUFBSSxDQUFoQ2pHLEtBQUs7UUFBRUMsTUFBTSxHQUFlZ0csSUFBSSxDQUF6QmhHLE1BQU07UUFBRUMsUUFBUSxHQUFLK0YsSUFBSSxDQUFqQi9GLFFBQVE7TUFDL0IsSUFBQW1HLFNBQUEsR0FBQUMsY0FBQSxDQUFtQnBHLFFBQVE7UUFBcEJrRixHQUFHLEdBQUFpQixTQUFBO1FBQUVFLEdBQUcsR0FBQUYsU0FBQTtNQUVmLElBQUlyRyxLQUFLLEtBQUssR0FBRyxFQUFFO1FBQ2YsS0FBSyxJQUFJbUYsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHbEYsTUFBTSxFQUFFa0YsQ0FBQyxFQUFFLEVBQUU7VUFDN0IsSUFBSW9CLEdBQUcsR0FBR3BCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDbEIsU0FBUyxDQUFDbUIsR0FBRyxDQUFDLENBQUNtQixHQUFHLEdBQUdwQixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEQsT0FBTyxLQUFLO1VBQ2hCO1FBQ0o7UUFDQSxLQUFLLElBQUlBLEVBQUMsR0FBRyxDQUFDLEVBQUVBLEVBQUMsR0FBR2xGLE1BQU0sRUFBRWtGLEVBQUMsRUFBRSxFQUFFO1VBQzdCLElBQUksQ0FBQ2xCLFNBQVMsQ0FBQ21CLEdBQUcsQ0FBQyxDQUFDbUIsR0FBRyxHQUFHcEIsRUFBQyxDQUFDLEdBQUcsQ0FBQztVQUNoQyxJQUFJZSxjQUFjLEVBQUU7WUFDaEIsSUFBTVgsSUFBSSxHQUFHLElBQUksQ0FBQ2xCLEtBQUssQ0FBQ0ssYUFBYSxnQkFBQTVELE1BQUEsQ0FBZXNFLEdBQUcsd0JBQUF0RSxNQUFBLENBQW1CeUYsR0FBRyxHQUFHcEIsRUFBQyxRQUFJLENBQUM7WUFDdEZJLElBQUksQ0FBQ25FLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7VUFDckM7UUFDSjtNQUNKLENBQUMsTUFBTSxJQUFJckIsS0FBSyxLQUFLLEdBQUcsRUFBRTtRQUN0QixLQUFLLElBQUltRixHQUFDLEdBQUcsQ0FBQyxFQUFFQSxHQUFDLEdBQUdsRixNQUFNLEVBQUVrRixHQUFDLEVBQUUsRUFBRTtVQUM3QixJQUFJQyxHQUFHLEdBQUdELEdBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDbEIsU0FBUyxDQUFDbUIsR0FBRyxHQUFHRCxHQUFDLENBQUMsQ0FBQ29CLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwRCxPQUFPLEtBQUs7VUFDaEI7UUFDSjtRQUNBLEtBQUssSUFBSXBCLEdBQUMsR0FBRyxDQUFDLEVBQUVBLEdBQUMsR0FBR2xGLE1BQU0sRUFBRWtGLEdBQUMsRUFBRSxFQUFFO1VBQzdCLElBQUksQ0FBQ2xCLFNBQVMsQ0FBQ21CLEdBQUcsR0FBR0QsR0FBQyxDQUFDLENBQUNvQixHQUFHLENBQUMsR0FBRyxDQUFDO1VBQ2hDLElBQUlMLGNBQWMsRUFBRTtZQUNoQixJQUFNWCxLQUFJLEdBQUcsSUFBSSxDQUFDbEIsS0FBSyxDQUFDSyxhQUFhLGdCQUFBNUQsTUFBQSxDQUFlc0UsR0FBRyxHQUFHRCxHQUFDLHdCQUFBckUsTUFBQSxDQUFtQnlGLEdBQUcsUUFBSSxDQUFDO1lBQ3RGaEIsS0FBSSxDQUFDbkUsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztVQUNyQztRQUNKO01BQ0o7O01BQ0EsSUFBSSxDQUFDdUQsV0FBVyxFQUFFO01BQ2xCLElBQUksSUFBSSxDQUFDQSxXQUFXLElBQUksQ0FBQyxFQUFFO1FBQ3ZCLElBQUksQ0FBQ0ksY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzNCOztNQUNBLE9BQU8sSUFBSTtJQUNmO0VBQUM7SUFBQXZFLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUE4RixjQUFBLEVBQWdCO01BQ1osT0FBTyxJQUFJLENBQUMzQixpQkFBaUI7SUFDakM7RUFBQztJQUFBcEUsR0FBQTtJQUFBQyxLQUFBLEVBQ0QsU0FBQStGLFVBQUEsRUFBWTtNQUNSLElBQUksQ0FBQzdCLFdBQVcsRUFBRTs7TUFFbEI7TUFDQSxJQUFJLElBQUksQ0FBQ0EsV0FBVyxLQUFLLENBQUMsRUFBRTtRQUN4QjtRQUNBLE9BQU9FLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQztNQUNoQyxDQUFDLE1BQU07UUFDSDtRQUNBLE9BQU8sSUFBSUQsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztVQUM1QnRDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDcUMsT0FBTyxFQUFFLGNBQWMsQ0FBQztRQUN4QyxDQUFDLENBQUM7TUFDTjtJQUNKO0VBQUM7SUFBQXRFLEdBQUE7SUFBQUMsS0FBQSxFQUNELFNBQUFnRyxJQUFBLEVBQU07TUFDRixPQUFPLElBQUk1QixPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO1FBQUV0QyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRXFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7TUFBQyxDQUFDLENBQUM7SUFDbEY7RUFBQztJQUFBdEUsR0FBQTtJQUFBQyxLQUFBLEVBQ0QsU0FBQWlHLElBQUEsRUFBTTtNQUNGLE9BQU8sSUFBSTdCLE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUs7UUFBRXRDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFcUMsT0FBTyxDQUFDLElBQUksQ0FBQztNQUFDLENBQUMsQ0FBQztJQUNsRjtFQUFDO0lBQUF0RSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBa0csWUFBQSxFQUFjO01BQ1YsSUFBTUMsY0FBYyxHQUFHLElBQUksQ0FBQzVDLFNBQVMsQ0FBQzZDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUM5QyxJQUFNQyxNQUFNLEdBQUdGLGNBQWMsQ0FBQ0csTUFBTSxDQUFDLFVBQUFDLElBQUk7UUFBQSxPQUFJQSxJQUFJLEtBQUssR0FBRztNQUFBLEVBQUMsQ0FBQ2hILE1BQU07TUFDakUsT0FBTzhHLE1BQU0sSUFBSSxDQUFDO0lBQ3RCO0VBQUM7SUFBQXRHLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUF3RyxNQUFBLEVBQVE7TUFDSixPQUFPLElBQUksQ0FBQ3ZDLGtCQUFrQjtJQUNsQztFQUFDO0lBQUFsRSxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBeUcsaUJBQUEsRUFBbUI7TUFDZixJQUFNM0YsS0FBSyxHQUFHLENBQ1Y7UUFBRTRGLElBQUksRUFBRSxXQUFXO1FBQUVuSCxNQUFNLEVBQUU7TUFBRSxDQUFDLEVBQ2hDO1FBQUVtSCxJQUFJLEVBQUUsV0FBVztRQUFFbkgsTUFBTSxFQUFFO01BQUUsQ0FBQyxFQUNoQztRQUFFbUgsSUFBSSxFQUFFLFNBQVM7UUFBRW5ILE1BQU0sRUFBRTtNQUFFLENBQUMsQ0FDakM7TUFFRCxTQUFBb0gsR0FBQSxNQUFBQyxNQUFBLEdBQW1COUYsS0FBSyxFQUFBNkYsR0FBQSxHQUFBQyxNQUFBLENBQUFySCxNQUFBLEVBQUFvSCxHQUFBLElBQUU7UUFBckIsSUFBTXRGLElBQUksR0FBQXVGLE1BQUEsQ0FBQUQsR0FBQTtRQUNYLElBQUlFLE1BQU0sR0FBRyxLQUFLO1FBRWxCLE9BQU8sQ0FBQ0EsTUFBTSxFQUFFO1VBQ1osSUFBTW5DLEdBQUcsR0FBR2pDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNxRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUN6QyxJQUFNakIsR0FBRyxHQUFHcEQsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ3FFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBRXpDLElBQU1DLFdBQVcsR0FBR3RFLElBQUksQ0FBQ3FFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJakIsR0FBRyxHQUFHeEUsSUFBSSxDQUFDOUIsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRztVQUU3RSxJQUFJLElBQUksQ0FBQzJELFNBQVMsQ0FBQyxJQUFJN0QsbURBQUksQ0FBQzBILFdBQVcsRUFBRTFGLElBQUksQ0FBQzlCLE1BQU0sRUFBRSxDQUFDbUYsR0FBRyxFQUFFbUIsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN0RWdCLE1BQU0sR0FBRyxJQUFJO1VBQ2pCO1FBRUo7TUFDSjtJQUNKO0VBQUM7SUFBQTlHLEdBQUE7SUFBQUMsS0FBQSxFQUVELFNBQUFnSCxvQkFBQSxFQUFzQjtNQUFBLElBQUFDLE1BQUE7TUFDbEIsT0FBTyxJQUFJN0MsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztRQUM1QixJQUFNNkMsd0JBQXdCLEdBQUcsU0FBM0JBLHdCQUF3QkEsQ0FBQSxFQUFTO1VBQ25DLElBQU14QyxHQUFHLEdBQUdqQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDcUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDekMsSUFBTWpCLEdBQUcsR0FBR3BELElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNxRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUN6QyxPQUFPLENBQUNwQyxHQUFHLEVBQUVtQixHQUFHLENBQUM7UUFDckIsQ0FBQztRQUVEOUQsT0FBTyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7UUFFdEIsSUFBSW1GLFVBQVU7UUFDZCxHQUFHO1VBQ0NBLFVBQVUsR0FBR0Qsd0JBQXdCLENBQUMsQ0FBQztRQUMzQyxDQUFDLFFBQVFELE1BQUksQ0FBQzFDLGVBQWUsQ0FBQzZDLEdBQUcsQ0FBQ0QsVUFBVSxDQUFDLEVBQUUsQ0FBQzs7UUFFaERGLE1BQUksQ0FBQzFDLGVBQWUsQ0FBQzVELEdBQUcsQ0FBQ3dHLFVBQVUsQ0FBQztRQUVwQyxJQUFBRSxXQUFBLEdBQW1CRixVQUFVO1VBQUFHLFlBQUEsR0FBQTFCLGNBQUEsQ0FBQXlCLFdBQUE7VUFBdEIzQyxHQUFHLEdBQUE0QyxZQUFBO1VBQUV6QixHQUFHLEdBQUF5QixZQUFBO1FBQ2YsSUFBSUwsTUFBSSxDQUFDMUQsU0FBUyxDQUFDbUIsR0FBRyxDQUFDLENBQUNtQixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7VUFDaENvQixNQUFJLENBQUMxRCxTQUFTLENBQUNtQixHQUFHLENBQUMsQ0FBQ21CLEdBQUcsQ0FBQyxHQUFHLEdBQUc7VUFDOUI5RCxPQUFPLENBQUNDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7VUFDdkNxQyxPQUFPLENBQUMsd0JBQXdCLENBQUM7UUFDckMsQ0FBQyxNQUFNO1VBQ0h0QyxPQUFPLENBQUNDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7VUFDeENxQyxPQUFPLENBQUMseUJBQXlCLENBQUM7UUFDdEM7TUFDSixDQUFDLENBQUM7TUFDRjtNQUNBO01BQ0E7TUFDQTtNQUNBOztNQUVBO01BQ0E7TUFDQTtNQUNBOztNQUVBOztNQUVBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO0lBQ0o7RUFBQztJQUFBdEUsR0FBQTtJQUFBQyxLQUFBLEVBQ0QsU0FBQXNGLGVBQUEsRUFBaUI7TUFDYixJQUFBaUMscUJBQUEsR0FBQTNCLGNBQUEsQ0FBbUIsSUFBSSxDQUFDM0Isa0JBQWtCO1FBQW5DUyxHQUFHLEdBQUE2QyxxQkFBQTtRQUFFMUIsR0FBRyxHQUFBMEIscUJBQUE7TUFDZnhGLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQ2lDLGtCQUFrQixDQUFDO01BRXBDLElBQUksSUFBSSxDQUFDVixTQUFTLENBQUNtQixHQUFHLENBQUMsQ0FBQ21CLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNoQyxJQUFJLENBQUN0QyxTQUFTLENBQUNtQixHQUFHLENBQUMsQ0FBQ21CLEdBQUcsQ0FBQyxHQUFHLEdBQUc7UUFDOUI5RCxPQUFPLENBQUNDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztNQUN4QyxDQUFDLE1BQU07UUFDSEQsT0FBTyxDQUFDQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7TUFDekM7SUFDSjtFQUFDO0VBQUEsT0FBQTFCLFNBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDaE5VLFNBQVNrSCxZQUFZQSxDQUFDQyxJQUFJLEVBQUVDLFlBQVksRUFBRTtFQUNyRCxJQUFNQyxNQUFNLEdBQUc1RyxRQUFRLENBQUM2QyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQy9DK0QsTUFBTSxDQUFDQyxXQUFXLEdBQUdILElBQUk7RUFDekJFLE1BQU0sQ0FBQ3JHLGdCQUFnQixDQUFDLE9BQU8sRUFBRW9HLFlBQVksQ0FBQztFQUM5QzNHLFFBQVEsQ0FBQ0ksY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUM4RCxXQUFXLENBQUMwQyxNQUFNLENBQUM7QUFDbkU7Ozs7OztVQ0xBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7K0NDTEEscUpBQUFFLG1CQUFBLFlBQUFBLG9CQUFBLFdBQUF0RyxDQUFBLFNBQUF1RyxDQUFBLEVBQUF2RyxDQUFBLE9BQUF3RyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsU0FBQSxFQUFBQyxDQUFBLEdBQUFILENBQUEsQ0FBQUksY0FBQSxFQUFBQyxDQUFBLEdBQUFKLE1BQUEsQ0FBQUssY0FBQSxjQUFBUCxDQUFBLEVBQUF2RyxDQUFBLEVBQUF3RyxDQUFBLElBQUFELENBQUEsQ0FBQXZHLENBQUEsSUFBQXdHLENBQUEsQ0FBQS9ILEtBQUEsS0FBQXlFLENBQUEsd0JBQUE2RCxNQUFBLEdBQUFBLE1BQUEsT0FBQUMsQ0FBQSxHQUFBOUQsQ0FBQSxDQUFBK0QsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBaEUsQ0FBQSxDQUFBaUUsYUFBQSx1QkFBQUMsQ0FBQSxHQUFBbEUsQ0FBQSxDQUFBbUUsV0FBQSw4QkFBQUMsT0FBQWYsQ0FBQSxFQUFBdkcsQ0FBQSxFQUFBd0csQ0FBQSxXQUFBQyxNQUFBLENBQUFLLGNBQUEsQ0FBQVAsQ0FBQSxFQUFBdkcsQ0FBQSxJQUFBdkIsS0FBQSxFQUFBK0gsQ0FBQSxFQUFBZSxVQUFBLE1BQUFDLFlBQUEsTUFBQUMsUUFBQSxTQUFBbEIsQ0FBQSxDQUFBdkcsQ0FBQSxXQUFBc0gsTUFBQSxtQkFBQWYsQ0FBQSxJQUFBZSxNQUFBLFlBQUFBLE9BQUFmLENBQUEsRUFBQXZHLENBQUEsRUFBQXdHLENBQUEsV0FBQUQsQ0FBQSxDQUFBdkcsQ0FBQSxJQUFBd0csQ0FBQSxnQkFBQWtCLEtBQUFuQixDQUFBLEVBQUF2RyxDQUFBLEVBQUF3RyxDQUFBLEVBQUFHLENBQUEsUUFBQXpELENBQUEsR0FBQWxELENBQUEsSUFBQUEsQ0FBQSxDQUFBMEcsU0FBQSxZQUFBaUIsU0FBQSxHQUFBM0gsQ0FBQSxHQUFBMkgsU0FBQSxFQUFBWCxDQUFBLEdBQUFQLE1BQUEsQ0FBQW1CLE1BQUEsQ0FBQTFFLENBQUEsQ0FBQXdELFNBQUEsR0FBQVEsQ0FBQSxPQUFBVyxPQUFBLENBQUFsQixDQUFBLGdCQUFBRSxDQUFBLENBQUFHLENBQUEsZUFBQXZJLEtBQUEsRUFBQXFKLGdCQUFBLENBQUF2QixDQUFBLEVBQUFDLENBQUEsRUFBQVUsQ0FBQSxNQUFBRixDQUFBLGFBQUFlLFNBQUF4QixDQUFBLEVBQUF2RyxDQUFBLEVBQUF3RyxDQUFBLG1CQUFBckIsSUFBQSxZQUFBNkMsR0FBQSxFQUFBekIsQ0FBQSxDQUFBMEIsSUFBQSxDQUFBakksQ0FBQSxFQUFBd0csQ0FBQSxjQUFBRCxDQUFBLGFBQUFwQixJQUFBLFdBQUE2QyxHQUFBLEVBQUF6QixDQUFBLFFBQUF2RyxDQUFBLENBQUEwSCxJQUFBLEdBQUFBLElBQUEsTUFBQVEsQ0FBQSxxQkFBQUMsQ0FBQSxxQkFBQUMsQ0FBQSxnQkFBQUMsQ0FBQSxnQkFBQXZILENBQUEsZ0JBQUE2RyxVQUFBLGNBQUFXLGtCQUFBLGNBQUFDLDJCQUFBLFNBQUFDLENBQUEsT0FBQWxCLE1BQUEsQ0FBQWtCLENBQUEsRUFBQXhCLENBQUEscUNBQUF5QixDQUFBLEdBQUFoQyxNQUFBLENBQUFpQyxjQUFBLEVBQUFDLENBQUEsR0FBQUYsQ0FBQSxJQUFBQSxDQUFBLENBQUFBLENBQUEsQ0FBQUcsTUFBQSxRQUFBRCxDQUFBLElBQUFBLENBQUEsS0FBQW5DLENBQUEsSUFBQUcsQ0FBQSxDQUFBc0IsSUFBQSxDQUFBVSxDQUFBLEVBQUEzQixDQUFBLE1BQUF3QixDQUFBLEdBQUFHLENBQUEsT0FBQUUsQ0FBQSxHQUFBTiwwQkFBQSxDQUFBN0IsU0FBQSxHQUFBaUIsU0FBQSxDQUFBakIsU0FBQSxHQUFBRCxNQUFBLENBQUFtQixNQUFBLENBQUFZLENBQUEsWUFBQU0sc0JBQUF2QyxDQUFBLGdDQUFBMUcsT0FBQSxXQUFBRyxDQUFBLElBQUFzSCxNQUFBLENBQUFmLENBQUEsRUFBQXZHLENBQUEsWUFBQXVHLENBQUEsZ0JBQUF3QyxPQUFBLENBQUEvSSxDQUFBLEVBQUF1RyxDQUFBLHNCQUFBeUMsY0FBQXpDLENBQUEsRUFBQXZHLENBQUEsYUFBQWlKLE9BQUF6QyxDQUFBLEVBQUFLLENBQUEsRUFBQTNELENBQUEsRUFBQThELENBQUEsUUFBQUUsQ0FBQSxHQUFBYSxRQUFBLENBQUF4QixDQUFBLENBQUFDLENBQUEsR0FBQUQsQ0FBQSxFQUFBTSxDQUFBLG1CQUFBSyxDQUFBLENBQUEvQixJQUFBLFFBQUFpQyxDQUFBLEdBQUFGLENBQUEsQ0FBQWMsR0FBQSxFQUFBRSxDQUFBLEdBQUFkLENBQUEsQ0FBQTNJLEtBQUEsU0FBQXlKLENBQUEsZ0JBQUFnQixPQUFBLENBQUFoQixDQUFBLEtBQUF2QixDQUFBLENBQUFzQixJQUFBLENBQUFDLENBQUEsZUFBQWxJLENBQUEsQ0FBQThDLE9BQUEsQ0FBQW9GLENBQUEsQ0FBQWlCLE9BQUEsRUFBQUMsSUFBQSxXQUFBN0MsQ0FBQSxJQUFBMEMsTUFBQSxTQUFBMUMsQ0FBQSxFQUFBckQsQ0FBQSxFQUFBOEQsQ0FBQSxnQkFBQVQsQ0FBQSxJQUFBMEMsTUFBQSxVQUFBMUMsQ0FBQSxFQUFBckQsQ0FBQSxFQUFBOEQsQ0FBQSxRQUFBaEgsQ0FBQSxDQUFBOEMsT0FBQSxDQUFBb0YsQ0FBQSxFQUFBa0IsSUFBQSxXQUFBN0MsQ0FBQSxJQUFBYSxDQUFBLENBQUEzSSxLQUFBLEdBQUE4SCxDQUFBLEVBQUFyRCxDQUFBLENBQUFrRSxDQUFBLGdCQUFBYixDQUFBLFdBQUEwQyxNQUFBLFVBQUExQyxDQUFBLEVBQUFyRCxDQUFBLEVBQUE4RCxDQUFBLFNBQUFBLENBQUEsQ0FBQUUsQ0FBQSxDQUFBYyxHQUFBLFNBQUF4QixDQUFBLEVBQUFLLENBQUEsb0JBQUFwSSxLQUFBLFdBQUFBLE1BQUE4SCxDQUFBLEVBQUFJLENBQUEsYUFBQTBDLDJCQUFBLGVBQUFySixDQUFBLFdBQUFBLENBQUEsRUFBQXdHLENBQUEsSUFBQXlDLE1BQUEsQ0FBQTFDLENBQUEsRUFBQUksQ0FBQSxFQUFBM0csQ0FBQSxFQUFBd0csQ0FBQSxnQkFBQUEsQ0FBQSxHQUFBQSxDQUFBLEdBQUFBLENBQUEsQ0FBQTRDLElBQUEsQ0FBQUMsMEJBQUEsRUFBQUEsMEJBQUEsSUFBQUEsMEJBQUEscUJBQUF2QixpQkFBQTlILENBQUEsRUFBQXdHLENBQUEsRUFBQUcsQ0FBQSxRQUFBRSxDQUFBLEdBQUFxQixDQUFBLG1CQUFBaEYsQ0FBQSxFQUFBOEQsQ0FBQSxRQUFBSCxDQUFBLEtBQUF1QixDQUFBLFlBQUFrQixLQUFBLHNDQUFBekMsQ0FBQSxLQUFBd0IsQ0FBQSxvQkFBQW5GLENBQUEsUUFBQThELENBQUEsV0FBQXZJLEtBQUEsRUFBQThILENBQUEsRUFBQWdELElBQUEsZUFBQTVDLENBQUEsQ0FBQTZDLE1BQUEsR0FBQXRHLENBQUEsRUFBQXlELENBQUEsQ0FBQXFCLEdBQUEsR0FBQWhCLENBQUEsVUFBQUUsQ0FBQSxHQUFBUCxDQUFBLENBQUE4QyxRQUFBLE1BQUF2QyxDQUFBLFFBQUFFLENBQUEsR0FBQXNDLG1CQUFBLENBQUF4QyxDQUFBLEVBQUFQLENBQUEsT0FBQVMsQ0FBQSxRQUFBQSxDQUFBLEtBQUF0RyxDQUFBLG1CQUFBc0csQ0FBQSxxQkFBQVQsQ0FBQSxDQUFBNkMsTUFBQSxFQUFBN0MsQ0FBQSxDQUFBZ0QsSUFBQSxHQUFBaEQsQ0FBQSxDQUFBaUQsS0FBQSxHQUFBakQsQ0FBQSxDQUFBcUIsR0FBQSxzQkFBQXJCLENBQUEsQ0FBQTZDLE1BQUEsUUFBQTNDLENBQUEsS0FBQXFCLENBQUEsUUFBQXJCLENBQUEsR0FBQXdCLENBQUEsRUFBQTFCLENBQUEsQ0FBQXFCLEdBQUEsRUFBQXJCLENBQUEsQ0FBQWtELGlCQUFBLENBQUFsRCxDQUFBLENBQUFxQixHQUFBLHVCQUFBckIsQ0FBQSxDQUFBNkMsTUFBQSxJQUFBN0MsQ0FBQSxDQUFBbUQsTUFBQSxXQUFBbkQsQ0FBQSxDQUFBcUIsR0FBQSxHQUFBbkIsQ0FBQSxHQUFBdUIsQ0FBQSxNQUFBSSxDQUFBLEdBQUFULFFBQUEsQ0FBQS9ILENBQUEsRUFBQXdHLENBQUEsRUFBQUcsQ0FBQSxvQkFBQTZCLENBQUEsQ0FBQXJELElBQUEsUUFBQTBCLENBQUEsR0FBQUYsQ0FBQSxDQUFBNEMsSUFBQSxHQUFBbEIsQ0FBQSxHQUFBRixDQUFBLEVBQUFLLENBQUEsQ0FBQVIsR0FBQSxLQUFBbEgsQ0FBQSxxQkFBQXJDLEtBQUEsRUFBQStKLENBQUEsQ0FBQVIsR0FBQSxFQUFBdUIsSUFBQSxFQUFBNUMsQ0FBQSxDQUFBNEMsSUFBQSxrQkFBQWYsQ0FBQSxDQUFBckQsSUFBQSxLQUFBMEIsQ0FBQSxHQUFBd0IsQ0FBQSxFQUFBMUIsQ0FBQSxDQUFBNkMsTUFBQSxZQUFBN0MsQ0FBQSxDQUFBcUIsR0FBQSxHQUFBUSxDQUFBLENBQUFSLEdBQUEsbUJBQUEwQixvQkFBQTFKLENBQUEsRUFBQXdHLENBQUEsUUFBQUcsQ0FBQSxHQUFBSCxDQUFBLENBQUFnRCxNQUFBLEVBQUEzQyxDQUFBLEdBQUE3RyxDQUFBLENBQUFpSCxRQUFBLENBQUFOLENBQUEsT0FBQUUsQ0FBQSxLQUFBTixDQUFBLFNBQUFDLENBQUEsQ0FBQWlELFFBQUEscUJBQUE5QyxDQUFBLElBQUEzRyxDQUFBLENBQUFpSCxRQUFBLGVBQUFULENBQUEsQ0FBQWdELE1BQUEsYUFBQWhELENBQUEsQ0FBQXdCLEdBQUEsR0FBQXpCLENBQUEsRUFBQW1ELG1CQUFBLENBQUExSixDQUFBLEVBQUF3RyxDQUFBLGVBQUFBLENBQUEsQ0FBQWdELE1BQUEsa0JBQUE3QyxDQUFBLEtBQUFILENBQUEsQ0FBQWdELE1BQUEsWUFBQWhELENBQUEsQ0FBQXdCLEdBQUEsT0FBQStCLFNBQUEsdUNBQUFwRCxDQUFBLGlCQUFBN0YsQ0FBQSxNQUFBb0MsQ0FBQSxHQUFBNkUsUUFBQSxDQUFBbEIsQ0FBQSxFQUFBN0csQ0FBQSxDQUFBaUgsUUFBQSxFQUFBVCxDQUFBLENBQUF3QixHQUFBLG1CQUFBOUUsQ0FBQSxDQUFBaUMsSUFBQSxTQUFBcUIsQ0FBQSxDQUFBZ0QsTUFBQSxZQUFBaEQsQ0FBQSxDQUFBd0IsR0FBQSxHQUFBOUUsQ0FBQSxDQUFBOEUsR0FBQSxFQUFBeEIsQ0FBQSxDQUFBaUQsUUFBQSxTQUFBM0ksQ0FBQSxNQUFBa0csQ0FBQSxHQUFBOUQsQ0FBQSxDQUFBOEUsR0FBQSxTQUFBaEIsQ0FBQSxHQUFBQSxDQUFBLENBQUF1QyxJQUFBLElBQUEvQyxDQUFBLENBQUF4RyxDQUFBLENBQUFnSyxVQUFBLElBQUFoRCxDQUFBLENBQUF2SSxLQUFBLEVBQUErSCxDQUFBLENBQUF5RCxJQUFBLEdBQUFqSyxDQUFBLENBQUFrSyxPQUFBLGVBQUExRCxDQUFBLENBQUFnRCxNQUFBLEtBQUFoRCxDQUFBLENBQUFnRCxNQUFBLFdBQUFoRCxDQUFBLENBQUF3QixHQUFBLEdBQUF6QixDQUFBLEdBQUFDLENBQUEsQ0FBQWlELFFBQUEsU0FBQTNJLENBQUEsSUFBQWtHLENBQUEsSUFBQVIsQ0FBQSxDQUFBZ0QsTUFBQSxZQUFBaEQsQ0FBQSxDQUFBd0IsR0FBQSxPQUFBK0IsU0FBQSxzQ0FBQXZELENBQUEsQ0FBQWlELFFBQUEsU0FBQTNJLENBQUEsY0FBQXFKLGFBQUE1RCxDQUFBLFFBQUF2RyxDQUFBLEtBQUFvSyxNQUFBLEVBQUE3RCxDQUFBLFlBQUFBLENBQUEsS0FBQXZHLENBQUEsQ0FBQXFLLFFBQUEsR0FBQTlELENBQUEsV0FBQUEsQ0FBQSxLQUFBdkcsQ0FBQSxDQUFBc0ssVUFBQSxHQUFBL0QsQ0FBQSxLQUFBdkcsQ0FBQSxDQUFBdUssUUFBQSxHQUFBaEUsQ0FBQSxXQUFBaUUsVUFBQSxDQUFBQyxJQUFBLENBQUF6SyxDQUFBLGNBQUEwSyxjQUFBbkUsQ0FBQSxRQUFBdkcsQ0FBQSxHQUFBdUcsQ0FBQSxDQUFBb0UsVUFBQSxRQUFBM0ssQ0FBQSxDQUFBbUYsSUFBQSxvQkFBQW5GLENBQUEsQ0FBQWdJLEdBQUEsRUFBQXpCLENBQUEsQ0FBQW9FLFVBQUEsR0FBQTNLLENBQUEsYUFBQTZILFFBQUF0QixDQUFBLFNBQUFpRSxVQUFBLE1BQUFKLE1BQUEsYUFBQTdELENBQUEsQ0FBQTFHLE9BQUEsQ0FBQXNLLFlBQUEsY0FBQVMsS0FBQSxpQkFBQWhDLE9BQUE1SSxDQUFBLFFBQUFBLENBQUEsV0FBQUEsQ0FBQSxRQUFBd0csQ0FBQSxHQUFBeEcsQ0FBQSxDQUFBZ0gsQ0FBQSxPQUFBUixDQUFBLFNBQUFBLENBQUEsQ0FBQXlCLElBQUEsQ0FBQWpJLENBQUEsNEJBQUFBLENBQUEsQ0FBQWlLLElBQUEsU0FBQWpLLENBQUEsT0FBQTZLLEtBQUEsQ0FBQTdLLENBQUEsQ0FBQWhDLE1BQUEsU0FBQTZJLENBQUEsT0FBQTNELENBQUEsWUFBQStHLEtBQUEsYUFBQXBELENBQUEsR0FBQTdHLENBQUEsQ0FBQWhDLE1BQUEsT0FBQTJJLENBQUEsQ0FBQXNCLElBQUEsQ0FBQWpJLENBQUEsRUFBQTZHLENBQUEsVUFBQW9ELElBQUEsQ0FBQXhMLEtBQUEsR0FBQXVCLENBQUEsQ0FBQTZHLENBQUEsR0FBQW9ELElBQUEsQ0FBQVYsSUFBQSxPQUFBVSxJQUFBLFNBQUFBLElBQUEsQ0FBQXhMLEtBQUEsR0FBQThILENBQUEsRUFBQTBELElBQUEsQ0FBQVYsSUFBQSxPQUFBVSxJQUFBLFlBQUEvRyxDQUFBLENBQUErRyxJQUFBLEdBQUEvRyxDQUFBLGdCQUFBNkcsU0FBQSxDQUFBYixPQUFBLENBQUFsSixDQUFBLGtDQUFBc0ksaUJBQUEsQ0FBQTVCLFNBQUEsR0FBQTZCLDBCQUFBLEVBQUExQixDQUFBLENBQUFnQyxDQUFBLG1CQUFBcEssS0FBQSxFQUFBOEosMEJBQUEsRUFBQWYsWUFBQSxTQUFBWCxDQUFBLENBQUEwQiwwQkFBQSxtQkFBQTlKLEtBQUEsRUFBQTZKLGlCQUFBLEVBQUFkLFlBQUEsU0FBQWMsaUJBQUEsQ0FBQXdDLFdBQUEsR0FBQXhELE1BQUEsQ0FBQWlCLDBCQUFBLEVBQUFuQixDQUFBLHdCQUFBcEgsQ0FBQSxDQUFBK0ssbUJBQUEsYUFBQXhFLENBQUEsUUFBQXZHLENBQUEsd0JBQUF1RyxDQUFBLElBQUFBLENBQUEsQ0FBQXlFLFdBQUEsV0FBQWhMLENBQUEsS0FBQUEsQ0FBQSxLQUFBc0ksaUJBQUEsNkJBQUF0SSxDQUFBLENBQUE4SyxXQUFBLElBQUE5SyxDQUFBLENBQUE3QixJQUFBLE9BQUE2QixDQUFBLENBQUFpTCxJQUFBLGFBQUExRSxDQUFBLFdBQUFFLE1BQUEsQ0FBQXlFLGNBQUEsR0FBQXpFLE1BQUEsQ0FBQXlFLGNBQUEsQ0FBQTNFLENBQUEsRUFBQWdDLDBCQUFBLEtBQUFoQyxDQUFBLENBQUE0RSxTQUFBLEdBQUE1QywwQkFBQSxFQUFBakIsTUFBQSxDQUFBZixDQUFBLEVBQUFhLENBQUEseUJBQUFiLENBQUEsQ0FBQUcsU0FBQSxHQUFBRCxNQUFBLENBQUFtQixNQUFBLENBQUFpQixDQUFBLEdBQUF0QyxDQUFBLEtBQUF2RyxDQUFBLENBQUFvTCxLQUFBLGFBQUE3RSxDQUFBLGFBQUE0QyxPQUFBLEVBQUE1QyxDQUFBLE9BQUF1QyxxQkFBQSxDQUFBRSxhQUFBLENBQUF0QyxTQUFBLEdBQUFZLE1BQUEsQ0FBQTBCLGFBQUEsQ0FBQXRDLFNBQUEsRUFBQVEsQ0FBQSxpQ0FBQWxILENBQUEsQ0FBQWdKLGFBQUEsR0FBQUEsYUFBQSxFQUFBaEosQ0FBQSxDQUFBcUwsS0FBQSxhQUFBOUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUUsQ0FBQSxFQUFBM0QsQ0FBQSxlQUFBQSxDQUFBLEtBQUFBLENBQUEsR0FBQUwsT0FBQSxPQUFBbUUsQ0FBQSxPQUFBZ0MsYUFBQSxDQUFBdEIsSUFBQSxDQUFBbkIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUUsQ0FBQSxHQUFBM0QsQ0FBQSxVQUFBbEQsQ0FBQSxDQUFBK0ssbUJBQUEsQ0FBQXZFLENBQUEsSUFBQVEsQ0FBQSxHQUFBQSxDQUFBLENBQUFpRCxJQUFBLEdBQUFiLElBQUEsV0FBQTdDLENBQUEsV0FBQUEsQ0FBQSxDQUFBZ0QsSUFBQSxHQUFBaEQsQ0FBQSxDQUFBOUgsS0FBQSxHQUFBdUksQ0FBQSxDQUFBaUQsSUFBQSxXQUFBbkIscUJBQUEsQ0FBQUQsQ0FBQSxHQUFBdkIsTUFBQSxDQUFBdUIsQ0FBQSxFQUFBekIsQ0FBQSxnQkFBQUUsTUFBQSxDQUFBdUIsQ0FBQSxFQUFBN0IsQ0FBQSxpQ0FBQU0sTUFBQSxDQUFBdUIsQ0FBQSw2REFBQTdJLENBQUEsQ0FBQXNMLElBQUEsYUFBQS9FLENBQUEsUUFBQXZHLENBQUEsR0FBQXlHLE1BQUEsQ0FBQUYsQ0FBQSxHQUFBQyxDQUFBLGdCQUFBRyxDQUFBLElBQUEzRyxDQUFBLEVBQUF3RyxDQUFBLENBQUFpRSxJQUFBLENBQUE5RCxDQUFBLFVBQUFILENBQUEsQ0FBQStFLE9BQUEsYUFBQXRCLEtBQUEsV0FBQXpELENBQUEsQ0FBQXhJLE1BQUEsU0FBQXVJLENBQUEsR0FBQUMsQ0FBQSxDQUFBZ0YsR0FBQSxRQUFBakYsQ0FBQSxJQUFBdkcsQ0FBQSxTQUFBaUssSUFBQSxDQUFBeEwsS0FBQSxHQUFBOEgsQ0FBQSxFQUFBMEQsSUFBQSxDQUFBVixJQUFBLE9BQUFVLElBQUEsV0FBQUEsSUFBQSxDQUFBVixJQUFBLE9BQUFVLElBQUEsUUFBQWpLLENBQUEsQ0FBQTRJLE1BQUEsR0FBQUEsTUFBQSxFQUFBZixPQUFBLENBQUFuQixTQUFBLEtBQUFzRSxXQUFBLEVBQUFuRCxPQUFBLEVBQUErQyxLQUFBLFdBQUFBLE1BQUE1SyxDQUFBLGFBQUF5TCxJQUFBLFdBQUF4QixJQUFBLFdBQUFOLElBQUEsUUFBQUMsS0FBQSxHQUFBckQsQ0FBQSxPQUFBZ0QsSUFBQSxZQUFBRSxRQUFBLGNBQUFELE1BQUEsZ0JBQUF4QixHQUFBLEdBQUF6QixDQUFBLE9BQUFpRSxVQUFBLENBQUEzSyxPQUFBLENBQUE2SyxhQUFBLElBQUExSyxDQUFBLFdBQUF3RyxDQUFBLGtCQUFBQSxDQUFBLENBQUFrRixNQUFBLE9BQUEvRSxDQUFBLENBQUFzQixJQUFBLE9BQUF6QixDQUFBLE1BQUFxRSxLQUFBLEVBQUFyRSxDQUFBLENBQUFtRixLQUFBLGNBQUFuRixDQUFBLElBQUFELENBQUEsTUFBQXFGLElBQUEsV0FBQUEsS0FBQSxTQUFBckMsSUFBQSxXQUFBaEQsQ0FBQSxRQUFBaUUsVUFBQSxJQUFBRyxVQUFBLGtCQUFBcEUsQ0FBQSxDQUFBcEIsSUFBQSxRQUFBb0IsQ0FBQSxDQUFBeUIsR0FBQSxjQUFBNkQsSUFBQSxLQUFBaEMsaUJBQUEsV0FBQUEsa0JBQUE3SixDQUFBLGFBQUF1SixJQUFBLFFBQUF2SixDQUFBLE1BQUF3RyxDQUFBLGtCQUFBc0YsT0FBQW5GLENBQUEsRUFBQUUsQ0FBQSxXQUFBRyxDQUFBLENBQUE3QixJQUFBLFlBQUE2QixDQUFBLENBQUFnQixHQUFBLEdBQUFoSSxDQUFBLEVBQUF3RyxDQUFBLENBQUF5RCxJQUFBLEdBQUF0RCxDQUFBLEVBQUFFLENBQUEsS0FBQUwsQ0FBQSxDQUFBZ0QsTUFBQSxXQUFBaEQsQ0FBQSxDQUFBd0IsR0FBQSxHQUFBekIsQ0FBQSxLQUFBTSxDQUFBLGFBQUFBLENBQUEsUUFBQTJELFVBQUEsQ0FBQXhNLE1BQUEsTUFBQTZJLENBQUEsU0FBQUEsQ0FBQSxRQUFBM0QsQ0FBQSxRQUFBc0gsVUFBQSxDQUFBM0QsQ0FBQSxHQUFBRyxDQUFBLEdBQUE5RCxDQUFBLENBQUF5SCxVQUFBLGlCQUFBekgsQ0FBQSxDQUFBa0gsTUFBQSxTQUFBMEIsTUFBQSxhQUFBNUksQ0FBQSxDQUFBa0gsTUFBQSxTQUFBcUIsSUFBQSxRQUFBdkUsQ0FBQSxHQUFBUCxDQUFBLENBQUFzQixJQUFBLENBQUEvRSxDQUFBLGVBQUFrRSxDQUFBLEdBQUFULENBQUEsQ0FBQXNCLElBQUEsQ0FBQS9FLENBQUEscUJBQUFnRSxDQUFBLElBQUFFLENBQUEsYUFBQXFFLElBQUEsR0FBQXZJLENBQUEsQ0FBQW1ILFFBQUEsU0FBQXlCLE1BQUEsQ0FBQTVJLENBQUEsQ0FBQW1ILFFBQUEsZ0JBQUFvQixJQUFBLEdBQUF2SSxDQUFBLENBQUFvSCxVQUFBLFNBQUF3QixNQUFBLENBQUE1SSxDQUFBLENBQUFvSCxVQUFBLGNBQUFwRCxDQUFBLGFBQUF1RSxJQUFBLEdBQUF2SSxDQUFBLENBQUFtSCxRQUFBLFNBQUF5QixNQUFBLENBQUE1SSxDQUFBLENBQUFtSCxRQUFBLHFCQUFBakQsQ0FBQSxZQUFBa0MsS0FBQSxxREFBQW1DLElBQUEsR0FBQXZJLENBQUEsQ0FBQW9ILFVBQUEsU0FBQXdCLE1BQUEsQ0FBQTVJLENBQUEsQ0FBQW9ILFVBQUEsWUFBQVIsTUFBQSxXQUFBQSxPQUFBdkQsQ0FBQSxFQUFBdkcsQ0FBQSxhQUFBd0csQ0FBQSxRQUFBZ0UsVUFBQSxDQUFBeE0sTUFBQSxNQUFBd0ksQ0FBQSxTQUFBQSxDQUFBLFFBQUFLLENBQUEsUUFBQTJELFVBQUEsQ0FBQWhFLENBQUEsT0FBQUssQ0FBQSxDQUFBdUQsTUFBQSxTQUFBcUIsSUFBQSxJQUFBOUUsQ0FBQSxDQUFBc0IsSUFBQSxDQUFBcEIsQ0FBQSx3QkFBQTRFLElBQUEsR0FBQTVFLENBQUEsQ0FBQXlELFVBQUEsUUFBQXBILENBQUEsR0FBQTJELENBQUEsYUFBQTNELENBQUEsaUJBQUFxRCxDQUFBLG1CQUFBQSxDQUFBLEtBQUFyRCxDQUFBLENBQUFrSCxNQUFBLElBQUFwSyxDQUFBLElBQUFBLENBQUEsSUFBQWtELENBQUEsQ0FBQW9ILFVBQUEsS0FBQXBILENBQUEsY0FBQThELENBQUEsR0FBQTlELENBQUEsR0FBQUEsQ0FBQSxDQUFBeUgsVUFBQSxjQUFBM0QsQ0FBQSxDQUFBN0IsSUFBQSxHQUFBb0IsQ0FBQSxFQUFBUyxDQUFBLENBQUFnQixHQUFBLEdBQUFoSSxDQUFBLEVBQUFrRCxDQUFBLFNBQUFzRyxNQUFBLGdCQUFBUyxJQUFBLEdBQUEvRyxDQUFBLENBQUFvSCxVQUFBLEVBQUF4SixDQUFBLFNBQUFpTCxRQUFBLENBQUEvRSxDQUFBLE1BQUErRSxRQUFBLFdBQUFBLFNBQUF4RixDQUFBLEVBQUF2RyxDQUFBLG9CQUFBdUcsQ0FBQSxDQUFBcEIsSUFBQSxRQUFBb0IsQ0FBQSxDQUFBeUIsR0FBQSxxQkFBQXpCLENBQUEsQ0FBQXBCLElBQUEsbUJBQUFvQixDQUFBLENBQUFwQixJQUFBLFFBQUE4RSxJQUFBLEdBQUExRCxDQUFBLENBQUF5QixHQUFBLGdCQUFBekIsQ0FBQSxDQUFBcEIsSUFBQSxTQUFBMEcsSUFBQSxRQUFBN0QsR0FBQSxHQUFBekIsQ0FBQSxDQUFBeUIsR0FBQSxPQUFBd0IsTUFBQSxrQkFBQVMsSUFBQSx5QkFBQTFELENBQUEsQ0FBQXBCLElBQUEsSUFBQW5GLENBQUEsVUFBQWlLLElBQUEsR0FBQWpLLENBQUEsR0FBQWMsQ0FBQSxLQUFBa0wsTUFBQSxXQUFBQSxPQUFBekYsQ0FBQSxhQUFBdkcsQ0FBQSxRQUFBd0ssVUFBQSxDQUFBeE0sTUFBQSxNQUFBZ0MsQ0FBQSxTQUFBQSxDQUFBLFFBQUF3RyxDQUFBLFFBQUFnRSxVQUFBLENBQUF4SyxDQUFBLE9BQUF3RyxDQUFBLENBQUE4RCxVQUFBLEtBQUEvRCxDQUFBLGNBQUF3RixRQUFBLENBQUF2RixDQUFBLENBQUFtRSxVQUFBLEVBQUFuRSxDQUFBLENBQUErRCxRQUFBLEdBQUFHLGFBQUEsQ0FBQWxFLENBQUEsR0FBQTFGLENBQUEseUJBQUFtTCxPQUFBMUYsQ0FBQSxhQUFBdkcsQ0FBQSxRQUFBd0ssVUFBQSxDQUFBeE0sTUFBQSxNQUFBZ0MsQ0FBQSxTQUFBQSxDQUFBLFFBQUF3RyxDQUFBLFFBQUFnRSxVQUFBLENBQUF4SyxDQUFBLE9BQUF3RyxDQUFBLENBQUE0RCxNQUFBLEtBQUE3RCxDQUFBLFFBQUFJLENBQUEsR0FBQUgsQ0FBQSxDQUFBbUUsVUFBQSxrQkFBQWhFLENBQUEsQ0FBQXhCLElBQUEsUUFBQTBCLENBQUEsR0FBQUYsQ0FBQSxDQUFBcUIsR0FBQSxFQUFBMEMsYUFBQSxDQUFBbEUsQ0FBQSxZQUFBSyxDQUFBLGdCQUFBeUMsS0FBQSw4QkFBQTRDLGFBQUEsV0FBQUEsY0FBQWxNLENBQUEsRUFBQXdHLENBQUEsRUFBQUcsQ0FBQSxnQkFBQThDLFFBQUEsS0FBQXhDLFFBQUEsRUFBQTJCLE1BQUEsQ0FBQTVJLENBQUEsR0FBQWdLLFVBQUEsRUFBQXhELENBQUEsRUFBQTBELE9BQUEsRUFBQXZELENBQUEsb0JBQUE2QyxNQUFBLFVBQUF4QixHQUFBLEdBQUF6QixDQUFBLEdBQUF6RixDQUFBLE9BQUFkLENBQUE7QUFBQSxTQUFBbU0sbUJBQUFDLEdBQUEsRUFBQXRKLE9BQUEsRUFBQXVKLE1BQUEsRUFBQUMsS0FBQSxFQUFBQyxNQUFBLEVBQUEvTixHQUFBLEVBQUF3SixHQUFBLGNBQUF3RSxJQUFBLEdBQUFKLEdBQUEsQ0FBQTVOLEdBQUEsRUFBQXdKLEdBQUEsT0FBQXZKLEtBQUEsR0FBQStOLElBQUEsQ0FBQS9OLEtBQUEsV0FBQWdPLEtBQUEsSUFBQUosTUFBQSxDQUFBSSxLQUFBLGlCQUFBRCxJQUFBLENBQUFqRCxJQUFBLElBQUF6RyxPQUFBLENBQUFyRSxLQUFBLFlBQUFvRSxPQUFBLENBQUFDLE9BQUEsQ0FBQXJFLEtBQUEsRUFBQTJLLElBQUEsQ0FBQWtELEtBQUEsRUFBQUMsTUFBQTtBQUFBLFNBQUFHLGtCQUFBQyxFQUFBLDZCQUFBQyxJQUFBLFNBQUFDLElBQUEsR0FBQTNJLFNBQUEsYUFBQXJCLE9BQUEsV0FBQUMsT0FBQSxFQUFBdUosTUFBQSxRQUFBRCxHQUFBLEdBQUFPLEVBQUEsQ0FBQUcsS0FBQSxDQUFBRixJQUFBLEVBQUFDLElBQUEsWUFBQVAsTUFBQTdOLEtBQUEsSUFBQTBOLGtCQUFBLENBQUFDLEdBQUEsRUFBQXRKLE9BQUEsRUFBQXVKLE1BQUEsRUFBQUMsS0FBQSxFQUFBQyxNQUFBLFVBQUE5TixLQUFBLGNBQUE4TixPQUFBUSxHQUFBLElBQUFaLGtCQUFBLENBQUFDLEdBQUEsRUFBQXRKLE9BQUEsRUFBQXVKLE1BQUEsRUFBQUMsS0FBQSxFQUFBQyxNQUFBLFdBQUFRLEdBQUEsS0FBQVQsS0FBQSxDQUFBbkksU0FBQTtBQUR1QztBQUNVO0FBQ1Q7QUFFeEMsSUFBTTdFLE9BQU8sR0FBR0QsOERBQWdCLENBQUMsQ0FBQztBQUNsQyxJQUFJMk4sY0FBYztBQUNsQixJQUFNQyxjQUFjLEdBQUd6TixRQUFRLENBQUNJLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztBQUNqRTs7QUFFQXFOLGNBQWMsQ0FBQ2xOLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVOEQsS0FBSyxFQUFFO0VBQ3RELElBQU1xSixrQkFBa0IsR0FBR3JKLEtBQUssQ0FBQ2pDLE1BQU0sQ0FBQ3VMLE9BQU8sQ0FBQyxlQUFlLENBQUM7RUFFaEUsSUFBSUQsa0JBQWtCLEVBQUU7SUFDcEIsSUFBTUUsV0FBVyxHQUFHRixrQkFBa0IsQ0FBQ0MsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUN2RCxJQUFNRSxnQkFBZ0IsR0FBR0gsa0JBQWtCLENBQUM1TSxZQUFZLENBQUMsWUFBWSxDQUFDOztJQUV0RTtJQUNBNE0sa0JBQWtCLENBQUNoTyxZQUFZLENBQUMsWUFBWSxFQUFFbU8sZ0JBQWdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkZILGtCQUFrQixDQUFDN0csV0FBVyxHQUFHZ0gsZ0JBQWdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO0lBRXJFRCxXQUFXLENBQUNsTyxZQUFZLENBQUMsWUFBWSxFQUFFbU8sZ0JBQWdCLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7RUFDaEY7RUFDQTdNLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDbkIsT0FBTyxDQUFDO0FBRXhCLENBQUMsQ0FBQztBQUNGa0IsT0FBTyxDQUFDQyxHQUFHLENBQUNuQixPQUFPLENBQUM7QUFBQSxTQUVMZ08sTUFBTUEsQ0FBQTtFQUFBLE9BQUFDLE9BQUEsQ0FBQVQsS0FBQSxPQUFBNUksU0FBQTtBQUFBO0FBQUEsU0FBQXFKLFFBQUE7RUFBQUEsT0FBQSxHQUFBYixpQkFBQSxlQUFBcEcsbUJBQUEsR0FBQTJFLElBQUEsQ0FBckIsU0FBQXVDLFNBQUE7SUFBQSxPQUFBbEgsbUJBQUEsR0FBQW9CLElBQUEsVUFBQStGLFVBQUFDLFNBQUE7TUFBQSxrQkFBQUEsU0FBQSxDQUFBakMsSUFBQSxHQUFBaUMsU0FBQSxDQUFBekQsSUFBQTtRQUFBO1VBQUEsT0FBQXlELFNBQUEsQ0FBQTVELE1BQUEsV0FDVyxJQUFJakgsT0FBTyxDQUFDLFVBQUNDLE9BQU8sRUFBSztZQUM1QmtLLGNBQWMsQ0FBQzVLLEtBQUssQ0FBQ3JDLGdCQUFnQixDQUFDLFNBQVM7Y0FBQSxJQUFBNE4sS0FBQSxHQUFBakIsaUJBQUEsZUFBQXBHLG1CQUFBLEdBQUEyRSxJQUFBLENBQUUsU0FBQTJDLFNBQU8vSixLQUFLO2dCQUFBLElBQUFWLEdBQUEsRUFBQU0sTUFBQTtnQkFBQSxPQUFBNkMsbUJBQUEsR0FBQW9CLElBQUEsVUFBQW1HLFVBQUFDLFNBQUE7a0JBQUEsa0JBQUFBLFNBQUEsQ0FBQXJDLElBQUEsR0FBQXFDLFNBQUEsQ0FBQTdELElBQUE7b0JBQUE7c0JBQUEsS0FDckRwRyxLQUFLLENBQUNqQyxNQUFNLENBQUN6QyxTQUFTLENBQUMyRSxRQUFRLENBQUMsV0FBVyxDQUFDO3dCQUFBZ0ssU0FBQSxDQUFBN0QsSUFBQTt3QkFBQTtzQkFBQTtzQkFDdEM5RyxHQUFHLEdBQUcxQixRQUFRLENBQUNvQyxLQUFLLENBQUNqQyxNQUFNLENBQUM0QixPQUFPLENBQUNMLEdBQUcsQ0FBQztzQkFDeENNLE1BQU0sR0FBR2hDLFFBQVEsQ0FBQ29DLEtBQUssQ0FBQ2pDLE1BQU0sQ0FBQzRCLE9BQU8sQ0FBQ0MsTUFBTSxDQUFDO3NCQUNwRHVKLGNBQWMsQ0FBQ3RLLGtCQUFrQixHQUFHLENBQUNTLEdBQUcsRUFBRU0sTUFBTSxDQUFDO3NCQUVqRGpELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDRCQUE0QixFQUFFdU0sY0FBYyxDQUFDdEssa0JBQWtCLENBQUM7c0JBQUNvTCxTQUFBLENBQUE3RCxJQUFBO3NCQUFBLE9BRXZFK0MsY0FBYyxDQUFDakosY0FBYyxDQUFDLENBQUM7b0JBQUE7c0JBQUErSixTQUFBLENBQUE3RCxJQUFBO3NCQUFBLE9BRW5DM0ssT0FBTyxDQUFDbUYsR0FBRyxDQUFDLENBQUM7b0JBQUE7c0JBQUFxSixTQUFBLENBQUE3RCxJQUFBO3NCQUFBLE9BQ2IzSyxPQUFPLENBQUNvRixHQUFHLENBQUMsQ0FBQztvQkFBQTtzQkFBQW9KLFNBQUEsQ0FBQTdELElBQUE7c0JBQUEsT0FDYjNLLE9BQU8sQ0FBQ21HLG1CQUFtQixDQUFDLENBQUM7b0JBQUE7c0JBRW5DO3NCQUNBM0MsT0FBTyxDQUFDLENBQUM7b0JBQUM7b0JBQUE7c0JBQUEsT0FBQWdMLFNBQUEsQ0FBQWxDLElBQUE7a0JBQUE7Z0JBQUEsR0FBQWdDLFFBQUE7Y0FBQSxDQUNiO2NBQUEsaUJBQUFHLEdBQUE7Z0JBQUEsT0FBQUosS0FBQSxDQUFBYixLQUFBLE9BQUE1SSxTQUFBO2NBQUE7WUFBQSxJQUFDO1lBQ0Y7VUFDSixDQUFDLENBQUM7UUFBQTtRQUFBO1VBQUEsT0FBQXdKLFNBQUEsQ0FBQTlCLElBQUE7TUFBQTtJQUFBLEdBQUE0QixRQUFBO0VBQUEsQ0FDTDtFQUFBLE9BQUFELE9BQUEsQ0FBQVQsS0FBQSxPQUFBNUksU0FBQTtBQUFBO0FBRUQ1RSxPQUFPLENBQUNpRixhQUFhLENBQUMsQ0FBQyxDQUFDNkUsSUFBSSxDQUFDLFlBQU07RUFDL0I1SSxPQUFPLENBQUNDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztFQUNwQ3VNLGNBQWMsR0FBRyxJQUFJak8scURBQVMsQ0FBQyxVQUFVLENBQUM7RUFDMUNpTyxjQUFjLENBQUM5SCxnQkFBZ0IsQ0FBQyxDQUFDO0VBRWpDZSx1REFBWSxDQUFDLE1BQU07SUFBQSxJQUFBK0gsSUFBQSxHQUFBdEIsaUJBQUEsZUFBQXBHLG1CQUFBLEdBQUEyRSxJQUFBLENBQUUsU0FBQWdELFFBQWdCbkwsT0FBTztNQUFBLE9BQUF3RCxtQkFBQSxHQUFBb0IsSUFBQSxVQUFBd0csU0FBQUMsUUFBQTtRQUFBLGtCQUFBQSxRQUFBLENBQUExQyxJQUFBLEdBQUEwQyxRQUFBLENBQUFsRSxJQUFBO1VBQUE7VUFBQTtZQUFBLE9BQUFrRSxRQUFBLENBQUF2QyxJQUFBO1FBQUE7TUFBQSxHQUFBcUMsT0FBQTtJQUFBLENBRzNDO0lBQUEsaUJBQUFHLEVBQUE7TUFBQSxPQUFBSixJQUFBLENBQUFsQixLQUFBLE9BQUE1SSxTQUFBO0lBQUE7RUFBQSxJQUFDO0VBRUYrQix1REFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQzlCb0ksS0FBSyxDQUFDLHNCQUFzQixDQUFDO0lBQzdCO0VBQ0osQ0FBQyxDQUFDOztFQUVGO0VBQ0EsT0FBT2YsTUFBTSxDQUFDLENBQUM7QUFDbkIsQ0FBQyxDQUFDLFNBQU0sQ0FBQyxVQUFBYixLQUFLLEVBQUk7RUFDZGpNLE9BQU8sQ0FBQ2lNLEtBQUssQ0FBQyxvQkFBb0IsRUFBRUEsS0FBSyxDQUFDO0FBQzlDLENBQUMsQ0FBQzs7QUFHRjtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JhdHRsZXNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZHJhZ0FuZERyb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL3BsYXktcmVzZXQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc2hpcENvdW50ID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGFuZ2xlLCBsZW5ndGgsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNyZWF0ZVNoaXBOYW1lKGxlbmd0aCk7XG4gICAgICAgIHRoaXMuaHAgPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuc2luayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICBzaGlwSGl0KCkge1xuICAgICAgICB0aGlzLmhwLS07XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcFN1bmsoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNoaXBTdW5rKCkge1xuICAgICAgICB0aGlzLnNpbmsgPSB0cnVlO1xuICAgIH1cblxuICAgIGNyZWF0ZVNoaXBOYW1lKGxlbmd0aCkge1xuICAgICAgICBpZiAobGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJEZXN0cm9lclwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIFwiU3VibWFyaW5lXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiBcImNydWlzdGVyXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBzaGlwQ291bnRbbGVuZ3RoXSB8fCAwO1xuICAgICAgICAgICAgc2hpcENvdW50W2xlbmd0aF0gPSBjb3VudCArIDE7XG4gICAgICAgICAgICByZXR1cm4gYFNoaXAke2NvdW50fWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhc3NlcnRMb2NhdGlvbihjb29yZGluYXRlc1RvQ2hlY2ssIGNhbGxiYWNrKSB7XG4gICAgLy8gICAgIGxldCBhbGxQbGFjZWQgPSB0cnVlO1xuICAgIC8vICAgICBjb29yZGluYXRlc1RvQ2hlY2suZm9yRWFjaChjb29yZCA9PiB7XG4gICAgLy8gICAgICAgICBpZiAoIWNhbGxiYWNrLnBsYWNlQm9hdChjb29yZCkpIHtcbiAgICAvLyAgICAgICAgICAgICBhbGxQbGFjZWQgPSBmYWxzZTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG5cbiAgICAvLyAgICAgaWYgKGFsbFBsYWNlZCkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzVG9DaGVjaztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gXCJ0cnkgYWdhaW5cIjtcbiAgICAvLyB9XG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwLmpzXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuZnVuY3Rpb24gZGlzYWJsZVNoaXBEcmFnKHgpIHtcbiAgICB4LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcImZhbHNlXCIpO1xuICAgIHguY2xhc3NMaXN0LmFkZChcInBsYWNlZC1zaGlwXCIpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cERyYWdBbmREcm9wKCkge1xuICAgIGNvbnN0IHBsYXllcjEgPSBuZXcgR2FtZWJvYXJkKFwidXNlclwiKTtcbiAgICAvLyBwbGF5ZXIxLnJlY2VpdmVSYW5kb21BdHRhY2sgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyAgICAgY29uc3QgZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlID0gKCkgPT4ge1xuICAgIC8vICAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgLy8gICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAvLyAgICAgICAgIHJldHVybiBbcm93LCBjb2xdO1xuICAgIC8vICAgICB9O1xuXG4gICAgLy8gICAgIGxldCBjb29yZGluYXRlO1xuICAgIC8vICAgICBkbyB7XG4gICAgLy8gICAgICAgICBjb29yZGluYXRlID0gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlKCk7XG4gICAgLy8gICAgIH0gd2hpbGUgKHRoaXMucHJldmlvdXNBdHRhY2tzLmhhcyhjb29yZGluYXRlKSk7IC8vIEVuc3VyZSB0aGUgY29vcmRpbmF0ZSBoYXNuJ3QgYmVlbiBhdHRhY2tlZCBiZWZvcmVcblxuICAgIC8vICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcy5hZGQoY29vcmRpbmF0ZSk7XG5cbiAgICAvLyAgICAgLy8gY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGU7XG4gICAgLy8gICAgIC8vIGlmICh0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPT09IDEpIHtcbiAgICAvLyAgICAgLy8gICAgIHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9IFwiWFwiO1xuICAgIC8vICAgICAvLyAgICAgY29uc29sZS5sb2coXCJIaXQhISBkcmFnXCIpO1xuICAgIC8vICAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgICAvLyAgICAgY29uc29sZS5sb2coXCJNaXNzISEgZHJvcFwiKTtcbiAgICAvLyAgICAgLy8gfVxuXG5cblxuXG5cblxuXG4gICAgLy8gfTtcblxuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xuICAgIGxldCBjdXJyZW50U2hpcCA9IG51bGw7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpZFwiKTtcblxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBcImRyYWdnZWRcIik7XG4gICAgICAgICAgICBjdXJyZW50U2hpcCA9IHNoaXA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY3VycmVudFNoaXAgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibW92ZVwiO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IGN1cnJlbnRTaGlwLmdldEF0dHJpYnV0ZShcImRhdGEtbGVuZ3RoXCIpO1xuICAgICAgICBjb25zdCBzaGlwQW5nbGUgPSBjdXJyZW50U2hpcC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFuZ2xlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaGlwQW5nbGUsIHNoaXBMZW5ndGgpO1xuICAgICAgICBpZiAoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIikgPT09IFwiZHJhZ2dlZFwiICYmIHNoaXBMZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSBncmlkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgICAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gZ3JpZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgICAgICAgIGNvbnN0IGNlbGxYID0gTWF0aC5mbG9vcigoeCAvIGdyaWQub2Zmc2V0V2lkdGgpICogOCk7XG4gICAgICAgICAgICBjb25zdCBjZWxsWSA9IE1hdGguZmxvb3IoKHkgLyBncmlkLm9mZnNldEhlaWdodCkgKiA4KTtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdDb29yZHMgPSBbY2VsbFksIGNlbGxYXTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IFNoaXAgYW5kIHBsYWNlIGl0IG9uIHRoZSBncmlkXG4gICAgICAgICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoc2hpcEFuZ2xlLCBwYXJzZUludChzaGlwTGVuZ3RoKSwgZHJhZ0Nvb3Jkcyk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1NoaXApO1xuXG4gICAgICAgICAgICBjb25zdCBib2F0UGxhY2VkID0gcGxheWVyMS5wbGFjZUJvYXQobmV3U2hpcCk7XG4gICAgICAgICAgICBpZiAoYm9hdFBsYWNlZCkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVTaGlwRHJhZyhjdXJyZW50U2hpcCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFNoaXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJkcmFnLW92ZXJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBsYXllcjFcbn1cbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXJUeXBlKSB7XG4gICAgICAgIHRoaXMucGxheWVyVHlwZSA9IHBsYXllclR5cGU7XG5cbiAgICAgICAgdGhpcy50d29EQXJyYXkgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA4IH0sICgpID0+IEFycmF5KDgpLmZpbGwoMCkpO1xuICAgICAgICB0aGlzLnRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcbiAgICAgICAgdGhpcy5ncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkXCIpO1xuICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcbiAgICAgICAgdGhpcy5zaGlwRGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWRlc3Ryb3llclwiKTtcbiAgICAgICAgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCA9IDA7IC8vIEtlZXAgdHJhY2sgb2YgdGhlIG51bWJlciBvZiBzaGlwcyBwbGFjZWRcbiAgICAgICAgdGhpcy5pc0ZpbmlzaGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzID0gbmV3IFNldCgpOyAvLyBTZXQgdG8gc3RvcmUgcHJldmlvdXNseSBhdHRhY2tlZCBjb29yZGluYXRlc1xuICAgICAgICAvLyBpZiAodGhpcy5wbGF5ZXJUeXBlID09PSAnY29tcHV0ZXInKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBjcmVhdGVHcmlkKCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAvLyBBZGQgYSBuZXcgcm93IHRvIHRoZSB0YWJsZVxuICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMudGFibGUuaW5zZXJ0Um93KGkpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBhIGNlbGwgdG8gdGhlIGN1cnJlbnQgcm93XG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSByb3cuaW5zZXJ0Q2VsbChqKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWl0ZW1cIik7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IGk7XG4gICAgICAgICAgICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBcHBlbmQgdGhlIHRhYmxlIHRvIHRoZSBncmlkIGNvbnRhaW5lclxuICAgICAgICB0aGlzLmdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50YWJsZSk7XG4gICAgfVxuXG4gICAgYWRkQ2xpY2tFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy50YWJsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5yb3cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMgPSBbcm93LCBjb2x1bW5dO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlbGVjdGVkIENlbGwgQ29vcmRpbmF0ZXM6JywgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlQXR0YWNrMSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwbGFjZUJvYXQoYm9hdCwgc2hvdWxkQWRkQ2xhc3MgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHsgYW5nbGUsIGxlbmd0aCwgbG9jYXRpb24gfSA9IGJvYXQ7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBsb2NhdGlvbjtcblxuICAgICAgICBpZiAoYW5nbGUgPT09ICdIJykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjb2wgKyBpID49IDggfHwgdGhpcy50d29EQXJyYXlbcm93XVtjb2wgKyBpXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMudHdvREFycmF5W3Jvd11bY29sICsgaV0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRBZGRDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy50YWJsZS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2x1bW49XCIke2NvbCArIGl9XCJdYCk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYm9hdC1jZWxsJyk7IC8vIEFkZCBhIENTUyBjbGFzcyB0byBzdHlsZSB0aGUgYm9hdCBjZWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSAnVicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocm93ICsgaSA+PSA4IHx8IHRoaXMudHdvREFycmF5W3JvdyArIGldW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3cgKyBpXVtjb2xdID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQWRkQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMudGFibGUucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3cgKyBpfVwiXVtkYXRhLWNvbHVtbj1cIiR7Y29sfVwiXWApO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXQtY2VsbCcpOyAvLyBBZGQgYSBDU1MgY2xhc3MgdG8gc3R5bGUgdGhlIGJvYXQgY2VsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkKytcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNQbGFjZWQgPj0gMykge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZSgpOyAvLyBSZXNvbHZlIHRoZSBwcm9taXNlIHdoZW4gdGhlIGNvdW50ZXIgcmVhY2hlcyAzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgd2FpdEZvckZpbmlzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGaW5pc2hlZFByb21pc2U7XG4gICAgfVxuICAgIGFsbFBsYWNlZCgpIHtcbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCsrO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRocmVlIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWRcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNQbGFjZWQgPT09IDMpIHtcbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIHByb21pc2VcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gYSBwZW5kaW5nIHByb21pc2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc29sdmUsIFwiZG9lc250d29ya3MhXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBydW4oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4geyBjb25zb2xlLmxvZyhcIjJuZCBwcm9taXNlXCIpLCByZXNvbHZlKFwiYXNcIikgfSk7XG4gICAgfVxuICAgIGZvbygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7IGNvbnNvbGUubG9nKFwiM3JkIHByb21pc2VcIiksIHJlc29sdmUoXCJhc1wiKSB9KTtcbiAgICB9XG5cbiAgICBmaW5kRW5nR2FtZSgpIHtcbiAgICAgICAgY29uc3QgZmxhdHRlbmVkQXJyYXkgPSB0aGlzLnR3b0RBcnJheS5mbGF0KCk7IC8vIEZsYXR0ZW4gdGhlIDJEIGFycmF5XG4gICAgICAgIGNvbnN0IGNvdW50WCA9IGZsYXR0ZW5lZEFycmF5LmZpbHRlcihpdGVtID0+IGl0ZW0gPT09ICdYJykubGVuZ3RoO1xuICAgICAgICByZXR1cm4gY291bnRYID49IDY7XG4gICAgfVxuXG4gICAgY2hlY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICB9XG5cbiAgICBwbGFjZVJhbmRvbVNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHsgdHlwZTogJ0Rlc3Ryb3llcicsIGxlbmd0aDogMiB9LFxuICAgICAgICAgICAgeyB0eXBlOiAnU3VibWFyaW5lJywgbGVuZ3RoOiAzIH0sXG4gICAgICAgICAgICB7IHR5cGU6ICdDcnVpc2VyJywgbGVuZ3RoOiA0IH1cbiAgICAgICAgXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSAmJiBjb2wgKyBzaGlwLmxlbmd0aCA8PSA4ID8gJ0gnIDogJ1YnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxhY2VCb2F0KG5ldyBTaGlwKG9yaWVudGF0aW9uLCBzaGlwLmxlbmd0aCwgW3JvdywgY29sXSksIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlUmFuZG9tQXR0YWNrKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV29ya3NcIik7IC8vIExvZyBzdGF0ZW1lbnQgZm9yIHRlc3RpbmdcblxuICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGU7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZSA9IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICAgICAgfSB3aGlsZSAodGhpcy5wcmV2aW91c0F0dGFja3MuaGFzKGNvb3JkaW5hdGUpKTsgLy8gRW5zdXJlIHRoZSBjb29yZGluYXRlIGhhc24ndCBiZWVuIGF0dGFja2VkIGJlZm9yZVxuXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcy5hZGQoY29vcmRpbmF0ZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlO1xuICAgICAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9IFwiWFwiO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXIgbWFrZXMgYSBIaXQhIVwiKTsgLy8gQ29ycmVjdGVkIGxvZyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwiQ29tcHV0ZXIgbWFrZXMgYSBIaXQhIVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wdXRlciBtYWtlcyBhIE1pc3MhIVwiKTsgLy8gQ29ycmVjdGVkIGxvZyBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwiQ29tcHV0ZXIgbWFrZXMgYSBNaXNzISFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBjb25zdCBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUgPSAoKSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgLy8gICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAvLyAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gbGV0IGNvb3JkaW5hdGU7XG4gICAgICAgIC8vIGRvIHtcbiAgICAgICAgLy8gICAgIGNvb3JkaW5hdGUgPSBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgICAgLy8gfSB3aGlsZSAodGhpcy5wcmV2aW91c0F0dGFja3MuaGFzKGNvb3JkaW5hdGUpKTsgLy8gRW5zdXJlIHRoZSBjb29yZGluYXRlIGhhc24ndCBiZWVuIGF0dGFja2VkIGJlZm9yZVxuXG4gICAgICAgIC8vIHRoaXMucHJldmlvdXNBdHRhY2tzLmFkZChjb29yZGluYXRlKTtcblxuICAgICAgICAvLyBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZTtcbiAgICAgICAgLy8gaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9PT0gMSkge1xuICAgICAgICAvLyAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkhpdCEhXCIpO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJNaXNzISFcIik7XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgcmVjZWl2ZUF0dGFjazEoKSB7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9IFwiWFwiO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgbWFrZXMgYSBIaXQhISFcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllciBtYWtlcyBhIE1pc3MhISFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQnV0dG9uKHRleHQsIGNsaWNrSGFuZGxlcikge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b24tY29udGFpbmVyXCIpLmFwcGVuZENoaWxkKGJ1dHRvbik7XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCB7IHNldHVwRHJhZ0FuZERyb3AgfSBmcm9tICcuL2RyYWdBbmREcm9wJztcbmltcG9ydCBjcmVhdGVCdXR0b24gZnJvbSAnLi9wbGF5LXJlc2V0JztcblxuY29uc3QgcGxheWVyMSA9IHNldHVwRHJhZ0FuZERyb3AoKTtcbmxldCBjb21wdXRlclBsYXllcjtcbmNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlwcy1jb250YWluZXJcIik7XG4vL2NvbnN0IGFsbFNoaXBzID0gc2V0dXBEcmFnQW5kRHJvcCgpO1xuXG5zaGlwc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3Qgc3dpdGNoQW5nbGVFbGVtZW50ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuc3dpdGNoLWFuZ2xlXCIpO1xuXG4gICAgaWYgKHN3aXRjaEFuZ2xlRWxlbWVudCkge1xuICAgICAgICBjb25zdCBzaGlwRWxlbWVudCA9IHN3aXRjaEFuZ2xlRWxlbWVudC5jbG9zZXN0KFwiLnNoaXBcIik7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRhQW5nbGUgPSBzd2l0Y2hBbmdsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiKTtcblxuICAgICAgICAvLyBUb2dnbGUgYmV0d2VlbiBcIkhcIiBhbmQgXCJWXCIgZm9yIGRhdGEtYW5nbGVcbiAgICAgICAgc3dpdGNoQW5nbGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtYW5nbGVcIiwgY3VycmVudERhdGFBbmdsZSA9PT0gXCJIXCIgPyBcIlZcIiA6IFwiSFwiKTtcbiAgICAgICAgc3dpdGNoQW5nbGVFbGVtZW50LnRleHRDb250ZW50ID0gY3VycmVudERhdGFBbmdsZSA9PT0gXCJIXCIgPyBcIlZcIiA6IFwiSFwiO1xuXG4gICAgICAgIHNoaXBFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtYW5nbGVcIiwgY3VycmVudERhdGFBbmdsZSA9PT0gXCJIXCIgPyBcIlZcIiA6IFwiSFwiKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocGxheWVyMSlcblxufSk7XG5jb25zb2xlLmxvZyhwbGF5ZXIxKVxuXG5hc3luYyBmdW5jdGlvbiBmb29iYXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGNvbXB1dGVyUGxheWVyLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgICAgICAgICBjb21wdXRlclBsYXllci5jbGlja2VkQ29vcmRpbmF0ZXMgPSBbcm93LCBjb2x1bW5dO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlbGVjdGVkIENlbGwgQ29vcmRpbmF0ZXM6JywgY29tcHV0ZXJQbGF5ZXIuY2xpY2tlZENvb3JkaW5hdGVzKTtcblxuICAgICAgICAgICAgICAgIGF3YWl0IGNvbXB1dGVyUGxheWVyLnJlY2VpdmVBdHRhY2sxKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBwbGF5ZXIxLnJ1bigpO1xuICAgICAgICAgICAgYXdhaXQgcGxheWVyMS5mb28oKTtcbiAgICAgICAgICAgIGF3YWl0IHBsYXllcjEucmVjZWl2ZVJhbmRvbUF0dGFjaygpXG5cbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIFByb21pc2Ugd2hlbiBhbGwgYXN5bmNocm9ub3VzIG9wZXJhdGlvbnMgYXJlIGZpbmlzaGVkXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBwbGF5ZXIxLnJ1bigpO1xuICAgIH0pO1xufVxuXG5wbGF5ZXIxLndhaXRGb3JGaW5pc2goKS50aGVuKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIkluc3RhbmNlIGlzIGZpbmlzaGVkIVwiKTtcbiAgICBjb21wdXRlclBsYXllciA9IG5ldyBHYW1lYm9hcmQoXCJjb21wdXRlclwiKTtcbiAgICBjb21wdXRlclBsYXllci5wbGFjZVJhbmRvbVNoaXBzKCk7XG5cbiAgICBjcmVhdGVCdXR0b24oXCJQbGF5XCIsIGFzeW5jIGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIC8vIEFkZCB5b3VyIGxvZ2ljIGhlcmVcbiAgICAgICAgLy8gSWYgdGhpcyBmdW5jdGlvbiBpcyBhc3luY2hyb25vdXMsIGhhbmRsZSBpdCBhY2NvcmRpbmdseVxuICAgIH0pO1xuXG4gICAgY3JlYXRlQnV0dG9uKFwiUmVzZXRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBhbGVydChcIlJlc2V0IGJ1dHRvbiBjbGlja2VkXCIpO1xuICAgICAgICAvLyBBZGQgeW91ciByZXNldCBsb2dpYyBoZXJlXG4gICAgfSk7XG5cbiAgICAvLyBTdGFydCB0aGUgYXN5bmNocm9ub3VzIG9wZXJhdGlvbnMgaW4gZm9vYmFyXG4gICAgcmV0dXJuIGZvb2JhcigpO1xufSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJBbiBlcnJvciBvY2N1cnJlZDpcIiwgZXJyb3IpO1xufSk7XG5cblxuLy8gLnRoZW4oZmluYWxSZXN1bHQgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKGZpbmFsUmVzdWx0KTtcbi8vIH0pXG5cblxuLy8gYXN5bmMgZnVuY3Rpb24gcGxheUdhbWUoKSB7XG4vLyAgICAgd2hpbGUgKCFwbGF5ZXIxLmZpbmRFbmdHYW1lKCkgJiYgIWNvbXB1dGVyUGxheWVyLmZpbmRFbmdHYW1lKCkpIHtcbi8vICAgICAgICAgLy8gUGxheWVyMSdzIHR1cm5cbi8vICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIxJ3MgdHVybjpcIik7XG4vLyAgICAgICAgIGNvbnN0IFtwbGF5ZXJSb3csIHBsYXllckNvbF0gPSBwbGF5ZXIxLmFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKTsgLy8gQXNzdW1pbmcgY2hlY2soKSByZXR1cm5zIHRoZSBsYXN0IGNsaWNrZWQgY29vcmRpbmF0ZXNcbi8vICAgICAgICAgY29tcHV0ZXJQbGF5ZXIucmVjZWl2ZUF0dGFjazEoKTtcblxuLy8gICAgICAgICAvLyBDaGVjayBpZiBwbGF5ZXIxIGhhcyB3b25cbi8vICAgICAgICAgaWYgKHBsYXllcjEuZmluZEVuZ0dhbWUoKSkge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIxIHdpbnMhXCIpO1xuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBDb21wdXRlclBsYXllcidzIHR1cm5cbi8vICAgICAgICAgY29uc29sZS5sb2coXCJDb21wdXRlclBsYXllcidzIHR1cm46XCIpO1xuLy8gICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMTAwMCkpOyAvLyBTaW11bGF0aW5nIGEgZGVsYXkgZm9yIGNvbXB1dGVyJ3MgbW92ZVxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkNvbXB1dGVyUGxheWVyJ3MgdHVybjpcIik7XG5cbi8vICAgICAgICAgY29uc3QgW2NvbXB1dGVyUm93LCBjb21wdXRlckNvbF0gPSBjb21wdXRlclBsYXllci5yZWNlaXZlUmFuZG9tQXR0YWNrKCk7XG4vLyAgICAgICAgIHBsYXllcjEucmVjZWl2ZUF0dGFjazEoY29tcHV0ZXJSb3csIGNvbXB1dGVyQ29sKTtcbi8vICAgICAgICAgcGxheWVyMS5kaXNwbGF5Qm9hcmQoKTtcblxuLy8gICAgICAgICAvLyBDaGVjayBpZiBjb21wdXRlclBsYXllciBoYXMgd29uXG4vLyAgICAgICAgIGlmIChjb21wdXRlclBsYXllci5maW5kRW5nR2FtZSgpKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbXB1dGVyUGxheWVyIHdpbnMhXCIpO1xuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cbi8vIC8vIFJ1biB0aGUgZ2FtZVxuLy8gcGxheUdhbWUoKTtcblxuIl0sIm5hbWVzIjpbInNoaXBDb3VudCIsIlNoaXAiLCJhbmdsZSIsImxlbmd0aCIsImxvY2F0aW9uIiwiX2NsYXNzQ2FsbENoZWNrIiwibmFtZSIsImNyZWF0ZVNoaXBOYW1lIiwiaHAiLCJzaW5rIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJzaGlwSGl0Iiwic2hpcFN1bmsiLCJjb3VudCIsImNvbmNhdCIsImRlZmF1bHQiLCJHYW1lYm9hcmQiLCJkaXNhYmxlU2hpcERyYWciLCJ4Iiwic2V0QXR0cmlidXRlIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0dXBEcmFnQW5kRHJvcCIsInBsYXllcjEiLCJzaGlwcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImN1cnJlbnRTaGlwIiwiZ3JpZCIsImdldEVsZW1lbnRCeUlkIiwiZm9yRWFjaCIsInNoaXAiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3BFZmZlY3QiLCJzaGlwTGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2hpcEFuZ2xlIiwiY29uc29sZSIsImxvZyIsImdldERhdGEiLCJjbGllbnRYIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInkiLCJjbGllbnRZIiwidG9wIiwiY2VsbFgiLCJNYXRoIiwiZmxvb3IiLCJvZmZzZXRXaWR0aCIsImNlbGxZIiwib2Zmc2V0SGVpZ2h0IiwiZHJhZ0Nvb3JkcyIsIm5ld1NoaXAiLCJwYXJzZUludCIsImJvYXRQbGFjZWQiLCJwbGFjZUJvYXQiLCJ0YXJnZXQiLCJyZW1vdmUiLCJwbGF5ZXJUeXBlIiwiX3RoaXMiLCJ0d29EQXJyYXkiLCJBcnJheSIsImZyb20iLCJmaWxsIiwidGFibGUiLCJjcmVhdGVFbGVtZW50IiwiZ3JpZENvbnRhaW5lciIsImNyZWF0ZUdyaWQiLCJzaGlwRGVzdHJveWVyIiwicXVlcnlTZWxlY3RvciIsImNsaWNrZWRDb29yZGluYXRlcyIsInNoaXBzUGxhY2VkIiwiaXNGaW5pc2hlZFByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlc29sdmVQcm9taXNlIiwicHJldmlvdXNBdHRhY2tzIiwiU2V0IiwiaSIsInJvdyIsImluc2VydFJvdyIsImoiLCJjZWxsIiwiaW5zZXJ0Q2VsbCIsImRhdGFzZXQiLCJjb2x1bW4iLCJhcHBlbmRDaGlsZCIsImFkZENsaWNrRXZlbnRMaXN0ZW5lcnMiLCJfdGhpczIiLCJldmVudCIsImNvbnRhaW5zIiwicmVjZWl2ZUF0dGFjazEiLCJib2F0Iiwic2hvdWxkQWRkQ2xhc3MiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJfbG9jYXRpb24iLCJfc2xpY2VkVG9BcnJheSIsImNvbCIsIndhaXRGb3JGaW5pc2giLCJhbGxQbGFjZWQiLCJydW4iLCJmb28iLCJmaW5kRW5nR2FtZSIsImZsYXR0ZW5lZEFycmF5IiwiZmxhdCIsImNvdW50WCIsImZpbHRlciIsIml0ZW0iLCJjaGVjayIsInBsYWNlUmFuZG9tU2hpcHMiLCJ0eXBlIiwiX2k0IiwiX3NoaXBzIiwicGxhY2VkIiwicmFuZG9tIiwib3JpZW50YXRpb24iLCJyZWNlaXZlUmFuZG9tQXR0YWNrIiwiX3RoaXMzIiwiZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlIiwiY29vcmRpbmF0ZSIsImhhcyIsIl9jb29yZGluYXRlIiwiX2Nvb3JkaW5hdGUyIiwiX3RoaXMkY2xpY2tlZENvb3JkaW5hIiwiY3JlYXRlQnV0dG9uIiwidGV4dCIsImNsaWNrSGFuZGxlciIsImJ1dHRvbiIsInRleHRDb250ZW50IiwiX3JlZ2VuZXJhdG9yUnVudGltZSIsInQiLCJyIiwiT2JqZWN0IiwicHJvdG90eXBlIiwibiIsImhhc093blByb3BlcnR5IiwibyIsImRlZmluZVByb3BlcnR5IiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImFyZyIsImNhbGwiLCJoIiwibCIsImYiLCJzIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsInAiLCJkIiwiZ2V0UHJvdG90eXBlT2YiLCJ2IiwidmFsdWVzIiwiZyIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsIl9pbnZva2UiLCJBc3luY0l0ZXJhdG9yIiwiaW52b2tlIiwiX3R5cGVvZiIsIl9fYXdhaXQiLCJ0aGVuIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJFcnJvciIsImRvbmUiLCJtZXRob2QiLCJkZWxlZ2F0ZSIsIm1heWJlSW52b2tlRGVsZWdhdGUiLCJzZW50IiwiX3NlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsIlR5cGVFcnJvciIsInJlc3VsdE5hbWUiLCJuZXh0IiwibmV4dExvYyIsInB1c2hUcnlFbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0IiwiaXNOYU4iLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJjb25zdHJ1Y3RvciIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiYXN5bmMiLCJrZXlzIiwicmV2ZXJzZSIsInBvcCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJydmFsIiwiaGFuZGxlIiwiY29tcGxldGUiLCJmaW5pc2giLCJfY2F0Y2giLCJkZWxlZ2F0ZVlpZWxkIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiZ2VuIiwicmVqZWN0IiwiX25leHQiLCJfdGhyb3ciLCJpbmZvIiwiZXJyb3IiLCJfYXN5bmNUb0dlbmVyYXRvciIsImZuIiwic2VsZiIsImFyZ3MiLCJhcHBseSIsImVyciIsImNvbXB1dGVyUGxheWVyIiwic2hpcHNDb250YWluZXIiLCJzd2l0Y2hBbmdsZUVsZW1lbnQiLCJjbG9zZXN0Iiwic2hpcEVsZW1lbnQiLCJjdXJyZW50RGF0YUFuZ2xlIiwiZm9vYmFyIiwiX2Zvb2JhciIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiX3JlZjIiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsIl94MiIsIl9yZWYiLCJfY2FsbGVlIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsIl94IiwiYWxlcnQiXSwic291cmNlUm9vdCI6IiJ9