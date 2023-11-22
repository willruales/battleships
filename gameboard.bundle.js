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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsQ0FBQyxHQUFHLEdBQUc7UUFDOUJULE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHFCQUFxQixDQUFDO01BQ3RDLENBQUMsTUFBTTtRQUNIRCxPQUFPLENBQUNDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztNQUN6QztJQUVKO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFHQTtFQUFBO0VBQUEsT0FBQTFDLFNBQUE7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLy4vc3JjL2JhdHRsZXNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy8uL3NyYy9nYW1lYm9hcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHNoaXBDb3VudCA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihhbmdsZSwgbGVuZ3RoLCBsb2NhdGlvbikge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jcmVhdGVTaGlwTmFtZShsZW5ndGgpO1xuICAgICAgICB0aGlzLmhwID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLnNpbmsgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgICAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XG4gICAgfVxuXG4gICAgc2hpcEhpdCgpIHtcbiAgICAgICAgdGhpcy5ocC0tO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNoaXBTdW5rKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaGlwU3VuaygpIHtcbiAgICAgICAgdGhpcy5zaW5rID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjcmVhdGVTaGlwTmFtZShsZW5ndGgpIHtcbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIFwiRGVzdHJvZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlN1Ym1hcmluZVwiXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJjcnVpc3RlclwiXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gc2hpcENvdW50W2xlbmd0aF0gfHwgMDtcbiAgICAgICAgICAgIHNoaXBDb3VudFtsZW5ndGhdID0gY291bnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIGBTaGlwJHtjb3VudH1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYXNzZXJ0TG9jYXRpb24oY29vcmRpbmF0ZXNUb0NoZWNrLCBjYWxsYmFjaykge1xuICAgIC8vICAgICBsZXQgYWxsUGxhY2VkID0gdHJ1ZTtcbiAgICAvLyAgICAgY29vcmRpbmF0ZXNUb0NoZWNrLmZvckVhY2goY29vcmQgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKCFjYWxsYmFjay5wbGFjZUJvYXQoY29vcmQpKSB7XG4gICAgLy8gICAgICAgICAgICAgYWxsUGxhY2VkID0gZmFsc2U7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuXG4gICAgLy8gICAgIGlmIChhbGxQbGFjZWQpIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBjb29yZGluYXRlc1RvQ2hlY2s7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgcmV0dXJuIFwidHJ5IGFnYWluXCI7XG4gICAgLy8gfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9iYXR0bGVzaGlwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHdvREFycmF5ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9LCAoKSA9PiBBcnJheSg4KS5maWxsKDApKTtcbiAgICAgICAgdGhpcy5ncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncmlkXCIpO1xuICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcbiAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuc2hpcERlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1kZXN0cm95ZXJcIik7XG4gICAgICAgIHRoaXMuY2xpY2tlZENvb3JkaW5hdGVzID0gW107IC8vIEFycmF5IHRvIHN0b3JlIGNsaWNrIGV2ZW50IGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMuc2hpcHNQbGFjZWQgPSAwOyAvLyBLZWVwIHRyYWNrIG9mIHRoZSBudW1iZXIgb2Ygc2hpcHMgcGxhY2VkXG4gICAgICAgIHRoaXMuaXNGaW5pc2hlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZXZpb3VzQXR0YWNrcyA9IG5ldyBTZXQoKTsgLy8gU2V0IHRvIHN0b3JlIHByZXZpb3VzbHkgYXR0YWNrZWQgY29vcmRpbmF0ZXNcbiAgICB9XG4gICAgY3JlYXRlR3JpZCgpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHRhYmxlIGVsZW1lbnRcbiAgICAgICAgdmFyIHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgLy8gQWRkIGEgbmV3IHJvdyB0byB0aGUgdGFibGVcbiAgICAgICAgICAgIHZhciByb3cgPSB0YWJsZS5pbnNlcnRSb3coaSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIGEgY2VsbCB0byB0aGUgY3VycmVudCByb3dcbiAgICAgICAgICAgICAgICB2YXIgY2VsbCA9IHJvdy5pbnNlcnRDZWxsKGopO1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtaXRlbVwiKTtcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gaTtcbiAgICAgICAgICAgICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgdGFibGUgdG8gdGhlIGdyaWQgY29udGFpbmVyXG4gICAgICAgIHRoaXMuZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gICAgfVxuXG4gICAgYWRkQ2xpY2tFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5ncmlkQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkLWl0ZW0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LnJvdyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sdW1uID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtyb3csIGNvbHVtbl07XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRDb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzOyAvLyBTdG9yZSBjb29yZGluYXRlcyBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRDb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZWxlY3RlZCBDZWxsIENvb3JkaW5hdGVzOicsIGNvb3JkaW5hdGVzLCBcInRoaXMuY2xpY2tlZDpcIiwgdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sdW1uXSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbHVtbl0gPSBcIlhcIjtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJIaXQhXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTWlzcyFcIik7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGxhY2VCb2F0KGJvYXQsIHNob3VsZEFkZENsYXNzID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB7IGFuZ2xlLCBsZW5ndGgsIGxvY2F0aW9uIH0gPSBib2F0O1xuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gbG9jYXRpb247XG5cbiAgICAgICAgaWYgKGFuZ2xlID09PSAnSCcpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY29sICsgaSA+PSA4IHx8IHRoaXMudHdvREFycmF5W3Jvd11bY29sICsgaV0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3ddW2NvbCArIGldID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQWRkQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZENvbnRhaW5lci5yb3dzW3Jvd10uY2VsbHNbY29sICsgaV07XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYm9hdC1jZWxsJyk7IC8vIEFkZCBhIENTUyBjbGFzcyB0byBzdHlsZSB0aGUgYm9hdCBjZWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGFuZ2xlID09PSAnVicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocm93ICsgaSA+PSA4IHx8IHRoaXMudHdvREFycmF5W3JvdyArIGldW2NvbF0gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR3b0RBcnJheVtyb3cgKyBpXVtjb2xdID0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQWRkQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ3JpZENvbnRhaW5lci5yb3dzW3JvdyArIGldLmNlbGxzW2NvbF07XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYm9hdC1jZWxsJyk7IC8vIEFkZCBhIENTUyBjbGFzcyB0byBzdHlsZSB0aGUgYm9hdCBjZWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hpcHNQbGFjZWQrK1xuICAgICAgICBpZiAodGhpcy5zaGlwc1BsYWNlZCA+PSAzKSB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVQcm9taXNlKCk7IC8vIFJlc29sdmUgdGhlIHByb21pc2Ugd2hlbiB0aGUgY291bnRlciByZWFjaGVzIDNcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB3YWl0Rm9yRmluaXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0ZpbmlzaGVkUHJvbWlzZTtcbiAgICB9XG4gICAgYWxsUGxhY2VkKCkge1xuICAgICAgICB0aGlzLnNoaXBzUGxhY2VkKys7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhyZWUgc2hpcHMgaGF2ZSBiZWVuIHBsYWNlZFxuICAgICAgICBpZiAodGhpcy5zaGlwc1BsYWNlZCA9PT0gMykge1xuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgcHJvbWlzZVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJldHVybiBhIHBlbmRpbmcgcHJvbWlzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzb2x2ZSwgXCJkb2VzbnR3b3JrcyFcIilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJ1bigpIHtcbiAgICAgICAgcmV0dXJuIFwidGhpcy5jbGlja2VkQ29vcmRpbmF0ZXNcIjtcbiAgICB9XG5cblxuICAgIGZpbmRFbmdHYW1lKCkge1xuICAgICAgICBjb25zdCBmbGF0dGVuZWRBcnJheSA9IHRoaXMudHdvREFycmF5LmZsYXQoKTsgLy8gRmxhdHRlbiB0aGUgMkQgYXJyYXlcbiAgICAgICAgY29uc3QgY291bnRYID0gZmxhdHRlbmVkQXJyYXkuZmlsdGVyKGl0ZW0gPT4gaXRlbSA9PT0gJ1gnKS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBjb3VudFggPj0gNjtcbiAgICB9XG5cbiAgICBjaGVjaygpIHtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjbGljayBldmVudCBjb29yZGluYXRlc1xuICAgICAgICByZXR1cm4gdGhpcy5jbGlja2VkQ29vcmRpbmF0ZXM7XG4gICAgfVxuXG4gICAgcGxhY2VSYW5kb21TaGlwcygpIHtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbXG4gICAgICAgICAgICB7IHR5cGU6ICdEZXN0cm95ZXInLCBsZW5ndGg6IDIgfSxcbiAgICAgICAgICAgIHsgdHlwZTogJ1N1Ym1hcmluZScsIGxlbmd0aDogMyB9LFxuICAgICAgICAgICAgeyB0eXBlOiAnQ3J1aXNlcicsIGxlbmd0aDogNCB9XG4gICAgICAgIF07XG5cbiAgICAgICAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgICAgICAgICBsZXQgcGxhY2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHdoaWxlICghcGxhY2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSYW5kb21seSBjaG9vc2Ugb3JpZW50YXRpb24sIGVuc3VyaW5nIGl0IGZpdHMgd2l0aGluIHRoZSBnYW1lIGJvYXJkJ3MgYm91bmRhcmllc1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSAmJiBjb2wgKyBzaGlwLmxlbmd0aCA8PSA4ID8gJ0gnIDogJ1YnO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxhY2VCb2F0KG5ldyBTaGlwKG9yaWVudGF0aW9uLCBzaGlwLmxlbmd0aCwgW3JvdywgY29sXSksIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWNlaXZlUmFuZG9tQXR0YWNrKCkge1xuICAgICAgICAvLyBGdW5jdGlvbiB0byBnZW5lcmF0ZSBhIHJhbmRvbSBjb29yZGluYXRlIFtyb3csIGNvbF0gd2l0aGluIHRoZSA4eDggZ3JpZFxuICAgICAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA4KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgICAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGNvb3JkaW5hdGU7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGUgPSBnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgICAgfSB3aGlsZSAodGhpcy5wcmV2aW91c0F0dGFja3MuaGFzKGNvb3JkaW5hdGUpKTsgLy8gRW5zdXJlIHRoZSBjb29yZGluYXRlIGhhc24ndCBiZWVuIGF0dGFja2VkIGJlZm9yZVxuXG4gICAgICAgIHRoaXMucHJldmlvdXNBdHRhY2tzLmFkZChjb29yZGluYXRlKTtcblxuICAgICAgICBjb25zdCBbcm93LCBjb2xdID0gY29vcmRpbmF0ZTtcbiAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhpdCEhXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNaXNzISFcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVjZWl2ZUF0dGFjazEoKSB7XG4gICAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSB0aGlzLmNsaWNrZWRDb29yZGluYXRlcztcbiAgICAgICAgaWYgKHRoaXMudHdvREFycmF5W3Jvd11bY29sXSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50d29EQXJyYXlbcm93XVtjb2xdID0gXCJYXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBtYWtlcyBhIEhpdCFcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVyIG1ha2VzIGEgTWlzcyFcIik7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAvLyAgICAgcmVjaWV2ZUF0dGFjayh4KSB7XG4gICAgLy8gICAgIGlmICh0aGlzLnR3b0RBcnJheVt4WzBdXVt4WzFdXSA9PT0gMSkge1xuICAgIC8vICAgICAgICAgdGhpcy50d29EQXJyYXlbeFswXV1beFsxXV0gPSBcIlhcIlxuICAgIC8vICAgICAgICAgcmV0dXJuIFwiaGl0IVwiXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZSBpZiAodGhpcy50d29EQXJyYXlbeFswXV1beFsxXV0gPT09IDApIHtcbiAgICAvLyAgICAgICAgIHJldHVybiBcIm1pc3MhXCI7XG4gICAgLy8gICAgIH1cblxuXG4gICAgLy8gfVxufSJdLCJuYW1lcyI6WyJzaGlwQ291bnQiLCJTaGlwIiwiYW5nbGUiLCJsZW5ndGgiLCJsb2NhdGlvbiIsIl9jbGFzc0NhbGxDaGVjayIsIm5hbWUiLCJjcmVhdGVTaGlwTmFtZSIsImhwIiwic2luayIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwic2hpcEhpdCIsInNoaXBTdW5rIiwiY291bnQiLCJjb25jYXQiLCJkZWZhdWx0IiwiR2FtZWJvYXJkIiwiX3RoaXMiLCJ0d29EQXJyYXkiLCJBcnJheSIsImZyb20iLCJmaWxsIiwiZ3JpZENvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVHcmlkIiwiYWRkQ2xpY2tFdmVudExpc3RlbmVycyIsInNoaXBEZXN0cm95ZXIiLCJxdWVyeVNlbGVjdG9yIiwiY2xpY2tlZENvb3JkaW5hdGVzIiwic2hpcHNQbGFjZWQiLCJpc0ZpbmlzaGVkUHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzb2x2ZVByb21pc2UiLCJwcmV2aW91c0F0dGFja3MiLCJTZXQiLCJ0YWJsZSIsImNyZWF0ZUVsZW1lbnQiLCJpIiwicm93IiwiaW5zZXJ0Um93IiwiaiIsImNlbGwiLCJpbnNlcnRDZWxsIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0YXNldCIsImNvbHVtbiIsImFwcGVuZENoaWxkIiwiX3RoaXMyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwiY29udGFpbnMiLCJwYXJzZUludCIsImNvb3JkaW5hdGVzIiwiY29uc29sZSIsImxvZyIsInBsYWNlQm9hdCIsImJvYXQiLCJzaG91bGRBZGRDbGFzcyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsIl9sb2NhdGlvbiIsIl9zbGljZWRUb0FycmF5IiwiY29sIiwicm93cyIsImNlbGxzIiwid2FpdEZvckZpbmlzaCIsImFsbFBsYWNlZCIsInJ1biIsImZpbmRFbmdHYW1lIiwiZmxhdHRlbmVkQXJyYXkiLCJmbGF0IiwiY291bnRYIiwiZmlsdGVyIiwiaXRlbSIsImNoZWNrIiwicGxhY2VSYW5kb21TaGlwcyIsInNoaXBzIiwidHlwZSIsIl9pNCIsIl9zaGlwcyIsInNoaXAiLCJwbGFjZWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJvcmllbnRhdGlvbiIsInJlY2VpdmVSYW5kb21BdHRhY2siLCJnZW5lcmF0ZVJhbmRvbUNvb3JkaW5hdGUiLCJjb29yZGluYXRlIiwiaGFzIiwiX2Nvb3JkaW5hdGUiLCJfY29vcmRpbmF0ZTIiLCJyZWNlaXZlQXR0YWNrMSIsIl90aGlzJGNsaWNrZWRDb29yZGluYSJdLCJzb3VyY2VSb290IjoiIn0=