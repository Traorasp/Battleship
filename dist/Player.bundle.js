"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["Player"],{

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createShip_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createShip.js */ "./src/createShip.js");


const Gameboard = () => {
  const grid = [];
  for (let i = 0; i < 10; i += 1) {
    grid.push([]);
    for (let k = 0; k < 10; k += 1) {
      grid[i].push(0);
    }
  }

  const placeShip = (x, y) => {
    const ship = (0,_createShip_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x.length);
    for (let i = 0; i < x.length; i += 1) {
      grid[x[i] - 1][y[i] - 1] = { ship, part: i };
    }
  };

  const receiveAttack = (xCord, yCord) => {
    const x = xCord - 1;
    const y = yCord - 1;

    if (grid[x][y] === -1 || (grid[x][y] !== 0 && grid[x][y].ship.cond[grid[x][y].part] === 0)) {
      return false;
    }
    if (grid[x][y] !== 0) {
      grid[x][y].ship.hit(grid[x][y].part);
    } else {
      grid[x][y] = -1;
    }
    return true;
  };

  const allSunk = () => {
    let noShips = true;
    grid.forEach((col) => {
      col.forEach((val) => {
        if (val !== 0 && val !== -1 && !val.ship.isSunk()) {
          noShips = false;
        }
      });
    });
    return noShips;
  };

  return {
    grid,
    placeShip,
    receiveAttack,
    allSunk,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard.js */ "./src/Gameboard.js");


const Player = (enemyBoard) => {
  let turn = false;

  const attack = (x, y) => {
    if (turn) {
      turn = !enemyBoard.receiveAttack(x, y);
    }
  };

  const isTurn = () => {
    turn = true;
  };

  const aiMove = () => {
    if (turn) {
      const x = Math.floor(Math.random() * 10) + 1;
      const y = Math.floor(Math.random() * 10) + 1;
      turn = enemyBoard.receiveAttack(x, y);
    }
  };

  return {
    attack,
    isTurn,
    aiMove,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/createShip.js":
/*!***************************!*\
  !*** ./src/createShip.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createShip = (size) => {
  const cond = [];
  for (let i = 0; i < size; i += 1) {
    cond.push(1);
  }

  const hit = (shot) => {
    cond[shot] = 0;
  };

  const isSunk = () => !cond.includes(1);

  return {
    cond,
    hit,
    isSunk,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createShip);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/Player.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF5Qzs7QUFFekM7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDBEQUFVO0FBQzNCLG9CQUFvQixjQUFjO0FBQ2xDLG1DQUFtQztBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEYzs7QUFFdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM5QnRCO0FBQ0E7QUFDQSxrQkFBa0IsVUFBVTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsVUFBVSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jcmVhdGVTaGlwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVTaGlwIGZyb20gJy4vY3JlYXRlU2hpcC5qcyc7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ3JpZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICBncmlkLnB1c2goW10pO1xuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMTA7IGsgKz0gMSkge1xuICAgICAgZ3JpZFtpXS5wdXNoKDApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9ICh4LCB5KSA9PiB7XG4gICAgY29uc3Qgc2hpcCA9IGNyZWF0ZVNoaXAoeC5sZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZ3JpZFt4W2ldIC0gMV1beVtpXSAtIDFdID0geyBzaGlwLCBwYXJ0OiBpIH07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeENvcmQsIHlDb3JkKSA9PiB7XG4gICAgY29uc3QgeCA9IHhDb3JkIC0gMTtcbiAgICBjb25zdCB5ID0geUNvcmQgLSAxO1xuXG4gICAgaWYgKGdyaWRbeF1beV0gPT09IC0xIHx8IChncmlkW3hdW3ldICE9PSAwICYmIGdyaWRbeF1beV0uc2hpcC5jb25kW2dyaWRbeF1beV0ucGFydF0gPT09IDApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChncmlkW3hdW3ldICE9PSAwKSB7XG4gICAgICBncmlkW3hdW3ldLnNoaXAuaGl0KGdyaWRbeF1beV0ucGFydCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyaWRbeF1beV0gPSAtMTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgYWxsU3VuayA9ICgpID0+IHtcbiAgICBsZXQgbm9TaGlwcyA9IHRydWU7XG4gICAgZ3JpZC5mb3JFYWNoKChjb2wpID0+IHtcbiAgICAgIGNvbC5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgaWYgKHZhbCAhPT0gMCAmJiB2YWwgIT09IC0xICYmICF2YWwuc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgIG5vU2hpcHMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vU2hpcHM7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBncmlkLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGFsbFN1bmssXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vR2FtZWJvYXJkLmpzJztcblxuY29uc3QgUGxheWVyID0gKGVuZW15Qm9hcmQpID0+IHtcbiAgbGV0IHR1cm4gPSBmYWxzZTtcblxuICBjb25zdCBhdHRhY2sgPSAoeCwgeSkgPT4ge1xuICAgIGlmICh0dXJuKSB7XG4gICAgICB0dXJuID0gIWVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNUdXJuID0gKCkgPT4ge1xuICAgIHR1cm4gPSB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGFpTW92ZSA9ICgpID0+IHtcbiAgICBpZiAodHVybikge1xuICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgIHR1cm4gPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrLFxuICAgIGlzVHVybixcbiAgICBhaU1vdmUsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjb25zdCBjcmVhdGVTaGlwID0gKHNpemUpID0+IHtcbiAgY29uc3QgY29uZCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgIGNvbmQucHVzaCgxKTtcbiAgfVxuXG4gIGNvbnN0IGhpdCA9IChzaG90KSA9PiB7XG4gICAgY29uZFtzaG90XSA9IDA7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gIWNvbmQuaW5jbHVkZXMoMSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjb25kLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTaGlwO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9