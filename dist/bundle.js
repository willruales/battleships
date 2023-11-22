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
  player1.receiveRandomAttack = function () {
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

    // const [row, col] = coordinate;
    // if (this.twoDArray[row][col] === 1) {
    //     this.twoDArray[row][col] = "X";
    //     console.log("Hit!! drag");
    // } else {
    //     console.log("Miss!! drop");
    // }
  };

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
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    if (this.playerType === 'computer') {
      this.addClickEventListeners();
    }
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
    value: function () {
      var _receiveRandomAttack = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve) {
                console.log("it works"), resolve("this hides in resolve");
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function receiveRandomAttack() {
        return _receiveRandomAttack.apply(this, arguments);
      }
      return receiveRandomAttack;
    }()
  }, {
    key: "receiveAttack1",
    value: function receiveAttack1() {
      console.log("goes");
      var _this$clickedCoordina = _slicedToArray(this.clickedCoordinates, 2),
        row = _this$clickedCoordina[0],
        col = _this$clickedCoordina[1];
      console.log(this.clickedCoordinates);
      if (row !== undefined && col !== undefined && this.twoDArray[row][col] === 1) {
        this.twoDArray[row][col] = "X";
        console.log("player makes a Hit!!!");
      } else {
        console.log("player makes a Miss!!!");
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




var player1 = (0,_dragAndDrop__WEBPACK_IMPORTED_MODULE_2__.setupDragAndDrop)();
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
player1.waitForFinish().then(function () {
  console.log("Instance is finished¬¬!");
  (0,_play_reset__WEBPACK_IMPORTED_MODULE_3__["default"])("Play", function (resolve) {
    alert(resolve, "Play button clicked");
    computerPlayer = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"]("computer");
    computerPlayer.placeRandomShips();
    console.log(computerPlayer, "look");
    player1.receiveRandomAttack();
  });
  (0,_play_reset__WEBPACK_IMPORTED_MODULE_3__["default"])("Reset", function () {
    alert("Reset button clicked");
    // Add your reset logic here
  });

  return player1.receiveRandomAttack();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7O0FBRUY7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9iYXR0bGVzaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2RyYWdBbmREcm9wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9wbGF5LXJlc2V0LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHNoaXBDb3VudCA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihhbmdsZSwgbGVuZ3RoLCBsb2NhdGlvbikge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jcmVhdGVTaGlwTmFtZShsZW5ndGgpO1xuICAgICAgICB0aGlzLmhwID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLnNpbmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgfVxuXG4gICAgc2hpcEhpdCgpIHtcbiAgICAgICAgdGhpcy5ocC0tO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBTdW5rKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaGlwU3VuaygpIHtcbiAgICAgICAgdGhpcy5zaW5rID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjcmVhdGVTaGlwTmFtZShsZW5ndGgpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIFwiRGVzdHJvZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlN1Ym1hcmluZVwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJjcnVpc3RlclwiXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gc2hpcENvdW50W2xlbmd0aF0gfHwgMDtcbiAgICAgICAgICAgIHNoaXBDb3VudFtsZW5ndGhdID0gY291bnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIGBTaGlwJHtjb3VudH1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYXNzZXJ0TG9jYXRpb24oY29vcmRpbmF0ZXNUb0NoZWNrLCBjYWxsYmFjaykge1xuICAgIC8vICAgICBsZXQgYWxsUGxhY2VkID0gdHJ1ZTtcbiAgICAvLyAgICAgY29vcmRpbmF0ZXNUb0NoZWNrLmZvckVhY2goY29vcmQgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKCFjYWxsYmFjay5wbGFjZUJvYXQoY29vcmQpKSB7XG4gICAgLy8gICAgICAgICAgICAgYWxsUGxhY2VkID0gZmFsc2U7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuXG4gICAgLy8gICAgIGlmIChhbGxQbGFjZWQpIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBjb29yZGluYXRlc1RvQ2hlY2s7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgcmV0dXJuIFwidHJ5IGFnYWluXCI7XG4gICAgLy8gfVxufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vYmF0dGxlc2hpcC5qc1wiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmZ1bmN0aW9uIGRpc2FibGVTaGlwRHJhZyh4KSB7XG4gICAgeC5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJmYWxzZVwiKTtcbiAgICB4LmNsYXNzTGlzdC5hZGQoXCJwbGFjZWQtc2hpcFwiKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBEcmFnQW5kRHJvcCgpIHtcbiAgICBjb25zdCBwbGF5ZXIxID0gbmV3IEdhbWVib2FyZChcInVzZXJcIik7XG4gICAgcGxheWVyMS5yZWNlaXZlUmFuZG9tQXR0YWNrID0gZnVuY3Rpb24gKCkge1xuXG5cblxuXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgY29vcmRpbmF0ZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICB9IHdoaWxlICh0aGlzLnByZXZpb3VzQXR0YWNrcy5oYXMoY29vcmRpbmF0ZSkpOyAvLyBFbnN1cmUgdGhlIGNvb3JkaW5hdGUgaGFzbid0IGJlZW4gYXR0YWNrZWQgYmVmb3JlXG5cbiAgICAgICAgdGhpcy5wcmV2aW91c0F0dGFja3MuYWRkKGNvb3JkaW5hdGUpO1xuXG4gICAgICAgIC8vIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlO1xuICAgICAgICAvLyBpZiAodGhpcy50d29EQXJyYXlbcm93XVtjb2xdID09PSAxKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPSBcIlhcIjtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiSGl0ISEgZHJhZ1wiKTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTWlzcyEhIGRyb3BcIik7XG4gICAgICAgIC8vIH1cblxuXG5cblxuXG5cblxuICAgIH07XG5cbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcFwiKTtcbiAgICBsZXQgY3VycmVudFNoaXAgPSBudWxsO1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWRcIik7XG5cbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgXCJkcmFnZ2VkXCIpO1xuICAgICAgICAgICAgY3VycmVudFNoaXAgPSBzaGlwO1xuICAgICAgICB9KTtcblxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsICgpID0+IHtcbiAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBcIm1vdmVcIjtcbiAgICB9KTtcblxuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBjdXJyZW50U2hpcC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWxlbmd0aFwiKTtcbiAgICAgICAgY29uc3Qgc2hpcEFuZ2xlID0gY3VycmVudFNoaXAuZ2V0QXR0cmlidXRlKFwiZGF0YS1hbmdsZVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coc2hpcEFuZ2xlLCBzaGlwTGVuZ3RoKTtcbiAgICAgICAgaWYgKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpID09PSBcImRyYWdnZWRcIiAmJiBzaGlwTGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gZS5jbGllbnRYIC0gZ3JpZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICAgICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIGdyaWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICAgICAgICBjb25zdCBjZWxsWCA9IE1hdGguZmxvb3IoKHggLyBncmlkLm9mZnNldFdpZHRoKSAqIDgpO1xuICAgICAgICAgICAgY29uc3QgY2VsbFkgPSBNYXRoLmZsb29yKCh5IC8gZ3JpZC5vZmZzZXRIZWlnaHQpICogOCk7XG4gICAgICAgICAgICBjb25zdCBkcmFnQ29vcmRzID0gW2NlbGxZLCBjZWxsWF07XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBTaGlwIGFuZCBwbGFjZSBpdCBvbiB0aGUgZ3JpZFxuICAgICAgICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwKHNoaXBBbmdsZSwgcGFyc2VJbnQoc2hpcExlbmd0aCksIGRyYWdDb29yZHMpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXdTaGlwKTtcblxuICAgICAgICAgICAgY29uc3QgYm9hdFBsYWNlZCA9IHBsYXllcjEucGxhY2VCb2F0KG5ld1NoaXApO1xuICAgICAgICAgICAgaWYgKGJvYXRQbGFjZWQpIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlU2hpcERyYWcoY3VycmVudFNoaXApO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTaGlwID0gbnVsbDtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJhZy1vdmVyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwbGF5ZXIxXG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IocGxheWVyVHlwZSkge1xuICAgICAgICB0aGlzLnBsYXllclR5cGUgPSBwbGF5ZXJUeXBlO1xuXG4gICAgICAgIHRoaXMudHdvREFycmF5ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9LCAoKSA9PiBBcnJheSg4KS5maWxsKDApKTtcbiAgICAgICAgdGhpcy50YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JpZFwiKTtcbiAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XG4gICAgICAgIHRoaXMuc2hpcERlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1kZXN0cm95ZXJcIik7XG4gICAgICAgIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzID0gW107XG4gICAgICAgIHRoaXMuc2hpcHNQbGFjZWQgPSAwOyAvLyBLZWVwIHRyYWNrIG9mIHRoZSBudW1iZXIgb2Ygc2hpcHMgcGxhY2VkXG4gICAgICAgIHRoaXMuaXNGaW5pc2hlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcyA9IG5ldyBTZXQoKTsgLy8gU2V0IHRvIHN0b3JlIHByZXZpb3VzbHkgYXR0YWNrZWQgY29vcmRpbmF0ZXNcbiAgICAgICAgaWYgKHRoaXMucGxheWVyVHlwZSA9PT0gJ2NvbXB1dGVyJykge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlR3JpZCgpIHtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgLy8gQWRkIGEgbmV3IHJvdyB0byB0aGUgdGFibGVcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLnRhYmxlLmluc2VydFJvdyhpKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYSBjZWxsIHRvIHRoZSBjdXJyZW50IHJvd1xuICAgICAgICAgICAgICAgIHZhciBjZWxsID0gcm93Lmluc2VydENlbGwoaik7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtXCIpO1xuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSBpO1xuICAgICAgICAgICAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gPSBqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSB0YWJsZSB0byB0aGUgZ3JpZCBjb250YWluZXJcbiAgICAgICAgdGhpcy5ncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudGFibGUpO1xuICAgIH1cblxuICAgIGFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWQtaXRlbScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQucm93KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW4gPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzID0gW3JvdywgY29sdW1uXTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZWxlY3RlZCBDZWxsIENvb3JkaW5hdGVzOicsIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVBdHRhY2sxKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICBwbGFjZUJvYXQoYm9hdCwgc2hvdWxkQWRkQ2xhc3MgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHsgYW5nbGUsIGxlbmd0aCwgbG9jYXRpb24gfSA9IGJvYXQ7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBsb2NhdGlvbjtcblxuICAgICAgICBpZiAoYW5nbGUgPT09ICdIJykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjb2wgKyBpID49IDggfHwgdGhpcy50d29EQXJyYXlbcm93XVtjb2wgKyBpXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMudHdvREFycmF5W3Jvd11bY29sICsgaV0gPSAxO1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRBZGRDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy50YWJsZS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9XCIke3Jvd31cIl1bZGF0YS1jb2x1bW49XCIke2NvbCArIGl9XCJdYCk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYm9hdC1jZWxsJyk7IC8vIEFkZCBhIENTUyBjbGFzcyB0byBzdHlsZSB0aGUgYm9hdCBjZWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSAnVicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocm93ICsgaSA+PSA4IHx8IHRoaXMudHdvREFycmF5W3JvdyArIGldW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3cgKyBpXVtjb2xdID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQWRkQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMudGFibGUucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3cgKyBpfVwiXVtkYXRhLWNvbHVtbj1cIiR7Y29sfVwiXWApO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXQtY2VsbCcpOyAvLyBBZGQgYSBDU1MgY2xhc3MgdG8gc3R5bGUgdGhlIGJvYXQgY2VsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkKytcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNQbGFjZWQgPj0gMykge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZSgpOyAvLyBSZXNvbHZlIHRoZSBwcm9taXNlIHdoZW4gdGhlIGNvdW50ZXIgcmVhY2hlcyAzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgd2FpdEZvckZpbmlzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGaW5pc2hlZFByb21pc2U7XG4gICAgfVxuICAgIGFsbFBsYWNlZCgpIHtcbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCsrO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRocmVlIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWRcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNQbGFjZWQgPT09IDMpIHtcbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIHByb21pc2VcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gYSBwZW5kaW5nIHByb21pc2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc29sdmUsIFwiZG9lc250d29ya3MhXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBydW4oKSB7XG4gICAgICAgIHJldHVybiBcInRoaXMuY2xpY2tlZENvb3JkaW5hdGVzXCI7XG4gICAgfVxuXG5cbiAgICBmaW5kRW5nR2FtZSgpIHtcbiAgICAgICAgY29uc3QgZmxhdHRlbmVkQXJyYXkgPSB0aGlzLnR3b0RBcnJheS5mbGF0KCk7IC8vIEZsYXR0ZW4gdGhlIDJEIGFycmF5XG4gICAgICAgIGNvbnN0IGNvdW50WCA9IGZsYXR0ZW5lZEFycmF5LmZpbHRlcihpdGVtID0+IGl0ZW0gPT09ICdYJykubGVuZ3RoO1xuICAgICAgICByZXR1cm4gY291bnRYID49IDY7XG4gICAgfVxuXG4gICAgY2hlY2soKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICB9XG5cbiAgICBwbGFjZVJhbmRvbVNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHsgdHlwZTogJ0Rlc3Ryb3llcicsIGxlbmd0aDogMiB9LFxuICAgICAgICAgICAgeyB0eXBlOiAnU3VibWFyaW5lJywgbGVuZ3RoOiAzIH0sXG4gICAgICAgICAgICB7IHR5cGU6ICdDcnVpc2VyJywgbGVuZ3RoOiA0IH1cbiAgICAgICAgXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSAmJiBjb2wgKyBzaGlwLmxlbmd0aCA8PSA4ID8gJ0gnIDogJ1YnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxhY2VCb2F0KG5ldyBTaGlwKG9yaWVudGF0aW9uLCBzaGlwLmxlbmd0aCwgW3JvdywgY29sXSksIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZWNlaXZlUmFuZG9tQXR0YWNrKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7IGNvbnNvbGUubG9nKFwiaXQgd29ya3NcIiksIHJlc29sdmUoXCJ0aGlzIGhpZGVzIGluIHJlc29sdmVcIikgfSlcbiAgICAgICAgLy8gY29uc3QgZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlID0gKCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgIC8vICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgLy8gICAgIHJldHVybiBbcm93LCBjb2xdO1xuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIGxldCBjb29yZGluYXRlO1xuICAgICAgICAvLyBkbyB7XG4gICAgICAgIC8vICAgICBjb29yZGluYXRlID0gZ2VuZXJhdGVSYW5kb21Db29yZGluYXRlKCk7XG4gICAgICAgIC8vIH0gd2hpbGUgKHRoaXMucHJldmlvdXNBdHRhY2tzLmhhcyhjb29yZGluYXRlKSk7IC8vIEVuc3VyZSB0aGUgY29vcmRpbmF0ZSBoYXNuJ3QgYmVlbiBhdHRhY2tlZCBiZWZvcmVcblxuICAgICAgICAvLyB0aGlzLnByZXZpb3VzQXR0YWNrcy5hZGQoY29vcmRpbmF0ZSk7XG5cbiAgICAgICAgLy8gY29uc3QgW3JvdywgY29sXSA9IGNvb3JkaW5hdGU7XG4gICAgICAgIC8vIGlmICh0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPT09IDEpIHtcbiAgICAgICAgLy8gICAgIHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9IFwiWFwiO1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJIaXQhIVwiKTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTWlzcyEhXCIpO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIHJlY2VpdmVBdHRhY2sxKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImdvZXNcIik7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMpO1xuXG4gICAgICAgIGlmIChyb3cgIT09IHVuZGVmaW5lZCAmJiBjb2wgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9IFwiWFwiO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgbWFrZXMgYSBIaXQhISFcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBtYWtlcyBhIE1pc3MhISFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbih0ZXh0LCBjbGlja0hhbmRsZXIpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uLWNvbnRhaW5lclwiKS5hcHBlbmRDaGlsZChidXR0b24pO1xufVxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwLmpzXCI7XG5pbXBvcnQgeyBzZXR1cERyYWdBbmREcm9wIH0gZnJvbSAnLi9kcmFnQW5kRHJvcCc7XG5pbXBvcnQgY3JlYXRlQnV0dG9uIGZyb20gJy4vcGxheS1yZXNldCc7XG5cbmNvbnN0IHBsYXllcjEgPSBzZXR1cERyYWdBbmREcm9wKCk7XG5sZXQgY29tcHV0ZXJQbGF5ZXI7XG5jb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpcHMtY29udGFpbmVyXCIpO1xuLy9jb25zdCBhbGxTaGlwcyA9IHNldHVwRHJhZ0FuZERyb3AoKTtcblxuc2hpcHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IHN3aXRjaEFuZ2xlRWxlbWVudCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnN3aXRjaC1hbmdsZVwiKTtcblxuICAgIGlmIChzd2l0Y2hBbmdsZUVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc2hpcEVsZW1lbnQgPSBzd2l0Y2hBbmdsZUVsZW1lbnQuY2xvc2VzdChcIi5zaGlwXCIpO1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0YUFuZ2xlID0gc3dpdGNoQW5nbGVFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtYW5nbGVcIik7XG5cbiAgICAgICAgLy8gVG9nZ2xlIGJldHdlZW4gXCJIXCIgYW5kIFwiVlwiIGZvciBkYXRhLWFuZ2xlXG4gICAgICAgIHN3aXRjaEFuZ2xlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWFuZ2xlXCIsIGN1cnJlbnREYXRhQW5nbGUgPT09IFwiSFwiID8gXCJWXCIgOiBcIkhcIik7XG4gICAgICAgIHN3aXRjaEFuZ2xlRWxlbWVudC50ZXh0Q29udGVudCA9IGN1cnJlbnREYXRhQW5nbGUgPT09IFwiSFwiID8gXCJWXCIgOiBcIkhcIjtcblxuICAgICAgICBzaGlwRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWFuZ2xlXCIsIGN1cnJlbnREYXRhQW5nbGUgPT09IFwiSFwiID8gXCJWXCIgOiBcIkhcIik7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHBsYXllcjEpXG5cbn0pO1xuY29uc29sZS5sb2cocGxheWVyMSlcblxucGxheWVyMS53YWl0Rm9yRmluaXNoKCkudGhlbigoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJJbnN0YW5jZSBpcyBmaW5pc2hlZMKswqwhXCIpO1xuICAgIGNyZWF0ZUJ1dHRvbihcIlBsYXlcIiwgZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgYWxlcnQocmVzb2x2ZSwgXCJQbGF5IGJ1dHRvbiBjbGlja2VkXCIpO1xuICAgICAgICBjb21wdXRlclBsYXllciA9IG5ldyBHYW1lYm9hcmQoXCJjb21wdXRlclwiKVxuICAgICAgICBjb21wdXRlclBsYXllci5wbGFjZVJhbmRvbVNoaXBzKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coY29tcHV0ZXJQbGF5ZXIsIFwibG9va1wiKVxuXG4gICAgICAgIHBsYXllcjEucmVjZWl2ZVJhbmRvbUF0dGFjaygpO1xuXG4gICAgfSk7XG5cbiAgICBjcmVhdGVCdXR0b24oXCJSZXNldFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFsZXJ0KFwiUmVzZXQgYnV0dG9uIGNsaWNrZWRcIik7XG4gICAgICAgIC8vIEFkZCB5b3VyIHJlc2V0IGxvZ2ljIGhlcmVcbiAgICB9KTtcbiAgICByZXR1cm4gcGxheWVyMS5yZWNlaXZlUmFuZG9tQXR0YWNrKClcbn0pXG5cbi8vIC50aGVuKGZpbmFsUmVzdWx0ID0+IHtcbi8vICAgICBjb25zb2xlLmxvZyhmaW5hbFJlc3VsdCk7XG4vLyB9KVxuXG5cbi8vIGFzeW5jIGZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuLy8gICAgIHdoaWxlICghcGxheWVyMS5maW5kRW5nR2FtZSgpICYmICFjb21wdXRlclBsYXllci5maW5kRW5nR2FtZSgpKSB7XG4vLyAgICAgICAgIC8vIFBsYXllcjEncyB0dXJuXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyMSdzIHR1cm46XCIpO1xuLy8gICAgICAgICBjb25zdCBbcGxheWVyUm93LCBwbGF5ZXJDb2xdID0gcGxheWVyMS5hZGRDbGlja0V2ZW50TGlzdGVuZXJzKCk7IC8vIEFzc3VtaW5nIGNoZWNrKCkgcmV0dXJucyB0aGUgbGFzdCBjbGlja2VkIGNvb3JkaW5hdGVzXG4vLyAgICAgICAgIGNvbXB1dGVyUGxheWVyLnJlY2VpdmVBdHRhY2sxKCk7XG5cbi8vICAgICAgICAgLy8gQ2hlY2sgaWYgcGxheWVyMSBoYXMgd29uXG4vLyAgICAgICAgIGlmIChwbGF5ZXIxLmZpbmRFbmdHYW1lKCkpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyMSB3aW5zIVwiKTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gQ29tcHV0ZXJQbGF5ZXIncyB0dXJuXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHV0ZXJQbGF5ZXIncyB0dXJuOlwiKTtcbi8vICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMDApKTsgLy8gU2ltdWxhdGluZyBhIGRlbGF5IGZvciBjb21wdXRlcidzIG1vdmVcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJDb21wdXRlclBsYXllcidzIHR1cm46XCIpO1xuXG4vLyAgICAgICAgIGNvbnN0IFtjb21wdXRlclJvdywgY29tcHV0ZXJDb2xdID0gY29tcHV0ZXJQbGF5ZXIucmVjZWl2ZVJhbmRvbUF0dGFjaygpO1xuLy8gICAgICAgICBwbGF5ZXIxLnJlY2VpdmVBdHRhY2sxKGNvbXB1dGVyUm93LCBjb21wdXRlckNvbCk7XG4vLyAgICAgICAgIHBsYXllcjEuZGlzcGxheUJvYXJkKCk7XG5cbi8vICAgICAgICAgLy8gQ2hlY2sgaWYgY29tcHV0ZXJQbGF5ZXIgaGFzIHdvblxuLy8gICAgICAgICBpZiAoY29tcHV0ZXJQbGF5ZXIuZmluZEVuZ0dhbWUoKSkge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wdXRlclBsYXllciB3aW5zIVwiKTtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfVxuXG4vLyAvLyBSdW4gdGhlIGdhbWVcbi8vIHBsYXlHYW1lKCk7XG5cbiJdLCJuYW1lcyI6WyJzaGlwQ291bnQiLCJTaGlwIiwiYW5nbGUiLCJsZW5ndGgiLCJsb2NhdGlvbiIsIl9jbGFzc0NhbGxDaGVjayIsIm5hbWUiLCJjcmVhdGVTaGlwTmFtZSIsImhwIiwic2luayIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwic2hpcEhpdCIsInNoaXBTdW5rIiwiY291bnQiLCJjb25jYXQiLCJkZWZhdWx0IiwiR2FtZWJvYXJkIiwiZGlzYWJsZVNoaXBEcmFnIiwieCIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsImFkZCIsInNldHVwRHJhZ0FuZERyb3AiLCJwbGF5ZXIxIiwicmVjZWl2ZVJhbmRvbUF0dGFjayIsImdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSIsInJvdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbCIsImNvb3JkaW5hdGUiLCJwcmV2aW91c0F0dGFja3MiLCJoYXMiLCJzaGlwcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImN1cnJlbnRTaGlwIiwiZ3JpZCIsImdldEVsZW1lbnRCeUlkIiwiZm9yRWFjaCIsInNoaXAiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJwcmV2ZW50RGVmYXVsdCIsImRyb3BFZmZlY3QiLCJzaGlwTGVuZ3RoIiwiZ2V0QXR0cmlidXRlIiwic2hpcEFuZ2xlIiwiY29uc29sZSIsImxvZyIsImdldERhdGEiLCJjbGllbnRYIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInkiLCJjbGllbnRZIiwidG9wIiwiY2VsbFgiLCJvZmZzZXRXaWR0aCIsImNlbGxZIiwib2Zmc2V0SGVpZ2h0IiwiZHJhZ0Nvb3JkcyIsIm5ld1NoaXAiLCJwYXJzZUludCIsImJvYXRQbGFjZWQiLCJwbGFjZUJvYXQiLCJ0YXJnZXQiLCJyZW1vdmUiLCJfcmVnZW5lcmF0b3JSdW50aW1lIiwidCIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJuIiwiaGFzT3duUHJvcGVydHkiLCJvIiwiZGVmaW5lUHJvcGVydHkiLCJpIiwiU3ltYm9sIiwiYSIsIml0ZXJhdG9yIiwiYyIsImFzeW5jSXRlcmF0b3IiLCJ1IiwidG9TdHJpbmdUYWciLCJkZWZpbmUiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ3cmFwIiwiR2VuZXJhdG9yIiwiY3JlYXRlIiwiQ29udGV4dCIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsInR5cGUiLCJhcmciLCJjYWxsIiwiaCIsImwiLCJmIiwicyIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJwIiwiZCIsImdldFByb3RvdHlwZU9mIiwidiIsInZhbHVlcyIsImciLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsIl90eXBlb2YiLCJyZXNvbHZlIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsIlByb21pc2UiLCJrZXlzIiwicmV2ZXJzZSIsInBvcCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJydmFsIiwiaGFuZGxlIiwiY29tcGxldGUiLCJmaW5pc2giLCJfY2F0Y2giLCJkZWxlZ2F0ZVlpZWxkIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiZ2VuIiwicmVqZWN0IiwiX25leHQiLCJfdGhyb3ciLCJpbmZvIiwiZXJyb3IiLCJfYXN5bmNUb0dlbmVyYXRvciIsImZuIiwic2VsZiIsImFyZ3MiLCJhcmd1bWVudHMiLCJhcHBseSIsImVyciIsInVuZGVmaW5lZCIsIl9zbGljZWRUb0FycmF5IiwiYXJyIiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibGVuIiwiYXJyMiIsImlzQXJyYXkiLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiX2RlZmluZVByb3BlcnRpZXMiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJfdG9Qcm9wZXJ0eUtleSIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJ0b1ByaW1pdGl2ZSIsInJlcyIsIk51bWJlciIsInBsYXllclR5cGUiLCJfdGhpcyIsInR3b0RBcnJheSIsImZpbGwiLCJ0YWJsZSIsImNyZWF0ZUVsZW1lbnQiLCJncmlkQ29udGFpbmVyIiwiY3JlYXRlR3JpZCIsInNoaXBEZXN0cm95ZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2xpY2tlZENvb3JkaW5hdGVzIiwic2hpcHNQbGFjZWQiLCJpc0ZpbmlzaGVkUHJvbWlzZSIsInJlc29sdmVQcm9taXNlIiwiU2V0IiwiYWRkQ2xpY2tFdmVudExpc3RlbmVycyIsImluc2VydFJvdyIsImoiLCJjZWxsIiwiaW5zZXJ0Q2VsbCIsImRhdGFzZXQiLCJjb2x1bW4iLCJhcHBlbmRDaGlsZCIsIl90aGlzMiIsImV2ZW50IiwiY29udGFpbnMiLCJyZWNlaXZlQXR0YWNrMSIsImJvYXQiLCJzaG91bGRBZGRDbGFzcyIsIl9sb2NhdGlvbiIsIndhaXRGb3JGaW5pc2giLCJhbGxQbGFjZWQiLCJydW4iLCJmaW5kRW5nR2FtZSIsImZsYXR0ZW5lZEFycmF5IiwiZmxhdCIsImNvdW50WCIsImZpbHRlciIsIml0ZW0iLCJjaGVjayIsInBsYWNlUmFuZG9tU2hpcHMiLCJfaTQiLCJfc2hpcHMiLCJwbGFjZWQiLCJvcmllbnRhdGlvbiIsIl9yZWNlaXZlUmFuZG9tQXR0YWNrIiwiX2NhbGxlZSIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJfdGhpcyRjbGlja2VkQ29vcmRpbmEiLCJjcmVhdGVCdXR0b24iLCJ0ZXh0IiwiY2xpY2tIYW5kbGVyIiwiYnV0dG9uIiwidGV4dENvbnRlbnQiLCJjb21wdXRlclBsYXllciIsInNoaXBzQ29udGFpbmVyIiwic3dpdGNoQW5nbGVFbGVtZW50IiwiY2xvc2VzdCIsInNoaXBFbGVtZW50IiwiY3VycmVudERhdGFBbmdsZSIsImFsZXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==