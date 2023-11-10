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
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRyxDQUFDLE1BQU0sQ0FBQztNQUN2QixDQUFDLE1BQU07UUFDSEQsT0FBTyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO01BQ3hCO0lBQ0o7RUFBQztJQUFBOUMsR0FBQTtJQUFBQyxLQUFBLEVBQ0QsU0FBQXFGLGVBQUEsRUFBaUI7TUFDYixJQUFBQyxxQkFBQSxHQUFBbEMsY0FBQSxDQUFtQixJQUFJLENBQUNqQyxrQkFBa0I7UUFBbkNTLEdBQUcsR0FBQTBELHFCQUFBO1FBQUVqQyxHQUFHLEdBQUFpQyxxQkFBQTtNQUNmLElBQUksSUFBSSxDQUFDOUUsU0FBUyxDQUFDb0IsR0FBRyxDQUFDLENBQUN5QixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEMsSUFBSSxDQUFDN0MsU0FBUyxDQUFDb0IsR0FBRyxDQUFDLENBQUN5QixHQUFHLENBQUMsR0FBRyxHQUFHO1FBQzlCVCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDdkIsQ0FBQyxNQUFNO1FBQ0hELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUN4QjtJQUVKO0VBQUM7RUFBQSxPQUFBdkMsU0FBQTtBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvLi9zcmMvYmF0dGxlc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2dhbWVib2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc2hpcENvdW50ID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKGFuZ2xlLCBsZW5ndGgsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmNyZWF0ZVNoaXBOYW1lKGxlbmd0aCk7XG4gICAgICAgIHRoaXMuaHAgPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuc2luayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuYW5nbGUgPSBhbmdsZTtcbiAgICB9XG5cbiAgICBzaGlwSGl0KCkge1xuICAgICAgICB0aGlzLmhwLS07XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2hpcFN1bmsoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNoaXBTdW5rKCkge1xuICAgICAgICB0aGlzLnNpbmsgPSB0cnVlO1xuICAgIH1cblxuICAgIGNyZWF0ZVNoaXBOYW1lKGxlbmd0aCkge1xuICAgICAgICBpZiAobGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJEZXN0cm9lclwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIFwiU3VibWFyaW5lXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiBcImNydWlzdGVyXCJcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBzaGlwQ291bnRbbGVuZ3RoXSB8fCAwO1xuICAgICAgICAgICAgc2hpcENvdW50W2xlbmd0aF0gPSBjb3VudCArIDE7XG4gICAgICAgICAgICByZXR1cm4gYFNoaXAke2NvdW50fWA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhc3NlcnRMb2NhdGlvbihjb29yZGluYXRlc1RvQ2hlY2ssIGNhbGxiYWNrKSB7XG4gICAgLy8gICAgIGxldCBhbGxQbGFjZWQgPSB0cnVlO1xuICAgIC8vICAgICBjb29yZGluYXRlc1RvQ2hlY2suZm9yRWFjaChjb29yZCA9PiB7XG4gICAgLy8gICAgICAgICBpZiAoIWNhbGxiYWNrLnBsYWNlQm9hdChjb29yZCkpIHtcbiAgICAvLyAgICAgICAgICAgICBhbGxQbGFjZWQgPSBmYWxzZTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG5cbiAgICAvLyAgICAgaWYgKGFsbFBsYWNlZCkge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzVG9DaGVjaztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gXCJ0cnkgYWdhaW5cIjtcbiAgICAvLyB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBTaGlwIGZyb20gXCIuL2JhdHRsZXNoaXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50d29EQXJyYXkgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA4IH0sICgpID0+IEFycmF5KDgpLmZpbGwoMCkpO1xuICAgICAgICB0aGlzLmdyaWRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyaWRcIik7XG4gICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgICAgICB0aGlzLmFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5zaGlwRGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWRlc3Ryb3llclwiKTtcbiAgICAgICAgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMgPSBbXTsgLy8gQXJyYXkgdG8gc3RvcmUgY2xpY2sgZXZlbnQgY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCA9IDA7IC8vIEtlZXAgdHJhY2sgb2YgdGhlIG51bWJlciBvZiBzaGlwcyBwbGFjZWRcbiAgICAgICAgdGhpcy5pc0ZpbmlzaGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzID0gbmV3IFNldCgpOyAvLyBTZXQgdG8gc3RvcmUgcHJldmlvdXNseSBhdHRhY2tlZCBjb29yZGluYXRlc1xuICAgIH1cbiAgICBjcmVhdGVHcmlkKCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5ncmlkQ29udGFpbmVyLmluc2VydFJvdyhpKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNlbGwgPSByb3cuaW5zZXJ0Q2VsbChqKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWl0ZW1cIilcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZ3JpZC1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5yb3cpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgICAgICAgICAgY29uc3QgY29vcmRpbmF0ZXMgPSBbcm93LCBjb2x1bW5dO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMgPSBjb29yZGluYXRlczsgLy8gU3RvcmUgY29vcmRpbmF0ZXMgaW4gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMgPSBjb29yZGluYXRlcztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU2VsZWN0ZWQgQ2VsbCBDb29yZGluYXRlczonLCBjb29yZGluYXRlcywgXCJ0aGlzLmNsaWNrZWQ6XCIsIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR3b0RBcnJheVtyb3ddW2NvbHVtbl0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2x1bW5dID0gXCJYXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGl0IVwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pc3MhXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBsYWNlQm9hdChib2F0LCBzaG91bGRBZGRDbGFzcyA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBhbmdsZSwgbGVuZ3RoLCBsb2NhdGlvbiB9ID0gYm9hdDtcbiAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IGxvY2F0aW9uO1xuXG4gICAgICAgIGlmIChhbmdsZSA9PT0gJ0gnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbCArIGkgPj0gOCB8fCB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbCArIGldID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2wgKyBpXSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEFkZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWRDb250YWluZXIucm93c1tyb3ddLmNlbGxzW2NvbCArIGldO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXQtY2VsbCcpOyAvLyBBZGQgYSBDU1MgY2xhc3MgdG8gc3R5bGUgdGhlIGJvYXQgY2VsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhbmdsZSA9PT0gJ1YnKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdyArIGkgPj0gOCB8fCB0aGlzLnR3b0RBcnJheVtyb3cgKyBpXVtjb2xdID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93ICsgaV1bY29sXSA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEFkZENsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWRDb250YWluZXIucm93c1tyb3cgKyBpXS5jZWxsc1tjb2xdO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2JvYXQtY2VsbCcpOyAvLyBBZGQgYSBDU1MgY2xhc3MgdG8gc3R5bGUgdGhlIGJvYXQgY2VsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkKytcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNQbGFjZWQgPj0gMykge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZSgpOyAvLyBSZXNvbHZlIHRoZSBwcm9taXNlIHdoZW4gdGhlIGNvdW50ZXIgcmVhY2hlcyAzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgd2FpdEZvckZpbmlzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGaW5pc2hlZFByb21pc2U7XG4gICAgfVxuICAgIGFsbFBsYWNlZCgpIHtcbiAgICAgICAgdGhpcy5zaGlwc1BsYWNlZCsrO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRocmVlIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWRcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNQbGFjZWQgPT09IDMpIHtcbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIHByb21pc2VcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gYSBwZW5kaW5nIHByb21pc2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc29sdmUsIFwiZG9lc250d29ya3MhXCIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICByZWNpZXZlQXR0YWNrKHgpIHtcbiAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3hbMF1dW3hbMV1dID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnR3b0RBcnJheVt4WzBdXVt4WzFdXSA9IFwiWFwiXG4gICAgICAgICAgICByZXR1cm4gXCJoaXQhXCJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnR3b0RBcnJheVt4WzBdXVt4WzFdXSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFwibWlzcyFcIjtcbiAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgcnVuKCkge1xuICAgICAgICByZXR1cm4gXCJ0aGlzLmNsaWNrZWRDb29yZGluYXRlc1wiO1xuICAgIH1cblxuXG4gICAgZmluZEVuZ0dhbWUoKSB7XG4gICAgICAgIGNvbnN0IGZsYXR0ZW5lZEFycmF5ID0gdGhpcy50d29EQXJyYXkuZmxhdCgpOyAvLyBGbGF0dGVuIHRoZSAyRCBhcnJheVxuICAgICAgICBjb25zdCBjb3VudFggPSBmbGF0dGVuZWRBcnJheS5maWx0ZXIoaXRlbSA9PiBpdGVtID09PSAnWCcpLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIGNvdW50WCA+PSA2O1xuICAgIH1cblxuICAgIGNoZWNrKCkge1xuICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNsaWNrIGV2ZW50IGNvb3JkaW5hdGVzXG4gICAgICAgIHJldHVybiB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICB9XG5cbiAgICBwbGFjZVJhbmRvbVNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHsgdHlwZTogJ0Rlc3Ryb3llcicsIGxlbmd0aDogMiB9LFxuICAgICAgICAgICAgeyB0eXBlOiAnU3VibWFyaW5lJywgbGVuZ3RoOiAzIH0sXG4gICAgICAgICAgICB7IHR5cGU6ICdDcnVpc2VyJywgbGVuZ3RoOiA0IH1cbiAgICAgICAgXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICAgICAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgd2hpbGUgKCFwbGFjZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcblxuICAgICAgICAgICAgICAgIC8vIFJhbmRvbWx5IGNob29zZSBvcmllbnRhdGlvbiwgZW5zdXJpbmcgaXQgZml0cyB3aXRoaW4gdGhlIGdhbWUgYm9hcmQncyBib3VuZGFyaWVzXG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ICYmIGNvbCArIHNoaXAubGVuZ3RoIDw9IDggPyAnSCcgOiAnVic7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGFjZUJvYXQobmV3IFNoaXAob3JpZW50YXRpb24sIHNoaXAubGVuZ3RoLCBbcm93LCBjb2xdKSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soKSB7XG4gICAgICAgIC8vIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgcmFuZG9tIGNvb3JkaW5hdGUgW3JvdywgY29sXSB3aXRoaW4gdGhlIDh4OCBncmlkXG4gICAgICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgY29vcmRpbmF0ZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29vcmRpbmF0ZSA9IGdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICB9IHdoaWxlICh0aGlzLnByZXZpb3VzQXR0YWNrcy5oYXMoY29vcmRpbmF0ZSkpOyAvLyBFbnN1cmUgdGhlIGNvb3JkaW5hdGUgaGFzbid0IGJlZW4gYXR0YWNrZWQgYmVmb3JlXG5cbiAgICAgICAgdGhpcy5wcmV2aW91c0F0dGFja3MuYWRkKGNvb3JkaW5hdGUpO1xuXG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBjb29yZGluYXRlO1xuICAgICAgICBpZiAodGhpcy50d29EQXJyYXlbcm93XVtjb2xdID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbF0gPSBcIlhcIjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGl0IVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWlzcyFcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjZWl2ZUF0dGFjazEoKSB7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhpdCFcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pc3MhXCIpO1xuICAgICAgICB9XG5cbiAgICB9XG59Il0sIm5hbWVzIjpbInNoaXBDb3VudCIsIlNoaXAiLCJhbmdsZSIsImxlbmd0aCIsImxvY2F0aW9uIiwiX2NsYXNzQ2FsbENoZWNrIiwibmFtZSIsImNyZWF0ZVNoaXBOYW1lIiwiaHAiLCJzaW5rIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJzaGlwSGl0Iiwic2hpcFN1bmsiLCJjb3VudCIsImNvbmNhdCIsImRlZmF1bHQiLCJHYW1lYm9hcmQiLCJfdGhpcyIsInR3b0RBcnJheSIsIkFycmF5IiwiZnJvbSIsImZpbGwiLCJncmlkQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUdyaWQiLCJhZGRDbGlja0V2ZW50TGlzdGVuZXJzIiwic2hpcERlc3Ryb3llciIsInF1ZXJ5U2VsZWN0b3IiLCJjbGlja2VkQ29vcmRpbmF0ZXMiLCJzaGlwc1BsYWNlZCIsImlzRmluaXNoZWRQcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZXNvbHZlUHJvbWlzZSIsInByZXZpb3VzQXR0YWNrcyIsIlNldCIsImkiLCJyb3ciLCJpbnNlcnRSb3ciLCJqIiwiY2VsbCIsImluc2VydENlbGwiLCJjbGFzc0xpc3QiLCJhZGQiLCJkYXRhc2V0IiwiY29sdW1uIiwiX3RoaXMyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwiY29udGFpbnMiLCJwYXJzZUludCIsImNvb3JkaW5hdGVzIiwiY29uc29sZSIsImxvZyIsInBsYWNlQm9hdCIsImJvYXQiLCJzaG91bGRBZGRDbGFzcyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIl9sb2NhdGlvbiIsIl9zbGljZWRUb0FycmF5IiwiY29sIiwicm93cyIsImNlbGxzIiwid2FpdEZvckZpbmlzaCIsImFsbFBsYWNlZCIsInJlY2lldmVBdHRhY2siLCJ4IiwicnVuIiwiZmluZEVuZ0dhbWUiLCJmbGF0dGVuZWRBcnJheSIsImZsYXQiLCJjb3VudFgiLCJmaWx0ZXIiLCJpdGVtIiwiY2hlY2siLCJwbGFjZVJhbmRvbVNoaXBzIiwic2hpcHMiLCJ0eXBlIiwiX2k0IiwiX3NoaXBzIiwic2hpcCIsInBsYWNlZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm9yaWVudGF0aW9uIiwicmVjZWl2ZUF0dGFjayIsImdlbmVyYXRlUmFuZG9tQ29vcmRpbmF0ZSIsImNvb3JkaW5hdGUiLCJoYXMiLCJfY29vcmRpbmF0ZSIsIl9jb29yZGluYXRlMiIsInJlY2VpdmVBdHRhY2sxIiwiX3RoaXMkY2xpY2tlZENvb3JkaW5hIl0sInNvdXJjZVJvb3QiOiIifQ==