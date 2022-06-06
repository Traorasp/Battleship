"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["Gameboard"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/Gameboard.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtZWJvYXJkLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF5Qzs7QUFFekM7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDBEQUFVO0FBQzNCLG9CQUFvQixjQUFjO0FBQ2xDLG1DQUFtQztBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFNBQVMsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDckR6QjtBQUNBO0FBQ0Esa0JBQWtCLFVBQVU7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFVBQVUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY3JlYXRlU2hpcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlU2hpcCBmcm9tICcuL2NyZWF0ZVNoaXAuanMnO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGdyaWQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XG4gICAgZ3JpZC5wdXNoKFtdKTtcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IDEwOyBrICs9IDEpIHtcbiAgICAgIGdyaWRbaV0ucHVzaCgwKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAoeCwgeSkgPT4ge1xuICAgIGNvbnN0IHNoaXAgPSBjcmVhdGVTaGlwKHgubGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGdyaWRbeFtpXSAtIDFdW3lbaV0gLSAxXSA9IHsgc2hpcCwgcGFydDogaSB9O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHhDb3JkLCB5Q29yZCkgPT4ge1xuICAgIGNvbnN0IHggPSB4Q29yZCAtIDE7XG4gICAgY29uc3QgeSA9IHlDb3JkIC0gMTtcblxuICAgIGlmIChncmlkW3hdW3ldID09PSAtMSB8fCAoZ3JpZFt4XVt5XSAhPT0gMCAmJiBncmlkW3hdW3ldLnNoaXAuY29uZFtncmlkW3hdW3ldLnBhcnRdID09PSAwKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZ3JpZFt4XVt5XSAhPT0gMCkge1xuICAgICAgZ3JpZFt4XVt5XS5zaGlwLmhpdChncmlkW3hdW3ldLnBhcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmlkW3hdW3ldID0gLTE7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgbGV0IG5vU2hpcHMgPSB0cnVlO1xuICAgIGdyaWQuZm9yRWFjaCgoY29sKSA9PiB7XG4gICAgICBjb2wuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgIGlmICh2YWwgIT09IDAgJiYgdmFsICE9PSAtMSAmJiAhdmFsLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICBub1NoaXBzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBub1NoaXBzO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ3JpZCxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBhbGxTdW5rLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiY29uc3QgY3JlYXRlU2hpcCA9IChzaXplKSA9PiB7XG4gIGNvbnN0IGNvbmQgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICBjb25kLnB1c2goMSk7XG4gIH1cblxuICBjb25zdCBoaXQgPSAoc2hvdCkgPT4ge1xuICAgIGNvbmRbc2hvdF0gPSAwO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+ICFjb25kLmluY2x1ZGVzKDEpO1xuXG4gIHJldHVybiB7XG4gICAgY29uZCxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2hpcDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==