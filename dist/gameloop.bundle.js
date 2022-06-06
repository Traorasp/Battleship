"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["gameloop"],{

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


/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player.js */ "./src/Player.js");
/* harmony import */ var _Gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard.js */ "./src/Gameboard.js");



const gameloop = (() => {
  const boardOne = (0,_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const boardTwo = (0,_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

  boardOne.placeShip([1, 1, 1], [1, 2, 3]);
  boardOne.placeShip([1, 2, 3], [1, 1, 1]);
  boardOne.placeShip([5, 5], [8, 9]);
  boardOne.placeShip([8], [3]);
  boardOne.placeShip([2, 3], [6, 6]);

  boardTwo.placeShip([1, 1, 1], [1, 2, 3]);
  boardTwo.placeShip([1, 2, 3], [1, 1, 1]);
  boardTwo.placeShip([5, 5], [8, 9]);
  boardTwo.placeShip([8], [3]);
  boardTwo.placeShip([2, 3], [6, 6]);

  const p1 = (0,_Player_js__WEBPACK_IMPORTED_MODULE_0__["default"])(boardTwo);
  const p2 = (0,_Player_js__WEBPACK_IMPORTED_MODULE_0__["default"])(boardOne);

  for (let i = 1; i <= 2; i += 1) {
    const player = i === 1 ? 'P1' : 'P2';

    const body = document.querySelector('body');

    const side = document.createElement('div');
    side.classList.add('side', `${player}`);
    body.appendChild(side);

    const board = document.createElement('div');
    board.classList.add('board');
    body.appendChild(board);

    const boardXCord = document.createElement('div');
    boardXCord.classList.add('x-cord');
    board.appendChild(boardXCord);

    for (let i = 0; i <= 10; i += 1) {
      const cord = document.createElement('div');
      cord.textcontent = i === 0 ? '' : `${i}`;
      boardXCord.appendChild(cord);
    }

    const boardYCord = document.createElement('div');
    boardYCord.classList.add('y-cord');
    board.appendChild(boardYCord);

    for (let k = 1; k < 10; k += 1) {
      const cord = document.createElement('div');
      cord.textcontent = `${k}`;
      boardYCord.appendChild(cord);
    }

    for (let x = 1; x <= 10; x += 1) {
      for (let y = 1; y <= 10; y += 1) {
        const cell = document.createElement('div');
        cell.classList.add(`${x}`, `${y}`);
        board.appendChild(cell);
        cell.addEventListener('click', (e) => {
          console.log(e.target.classList[0]);
          console.log(e.target.classList[1]);
        });
      }
    }
  }
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameloop);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/gameloop.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZWxvb3AuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQXlDOztBQUV6QztBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsMERBQVU7QUFDM0Isb0JBQW9CLGNBQWM7QUFDbEMsbUNBQW1DO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDckRjOztBQUV2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxNQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlCdEI7QUFDQTtBQUNBLGtCQUFrQixVQUFVO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJPO0FBQ007O0FBRXZDO0FBQ0EsbUJBQW1CLHlEQUFTO0FBQzVCLG1CQUFtQix5REFBUzs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsc0RBQU07QUFDbkIsYUFBYSxzREFBTTs7QUFFbkIsa0JBQWtCLFFBQVE7QUFDMUI7O0FBRUE7O0FBRUE7QUFDQSxrQ0FBa0MsT0FBTztBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0EsMkNBQTJDLEVBQUU7QUFDN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQSw0QkFBNEIsRUFBRTtBQUM5QjtBQUNBOztBQUVBLG9CQUFvQixTQUFTO0FBQzdCLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0EsOEJBQThCLEVBQUUsTUFBTSxFQUFFO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsUUFBUSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jcmVhdGVTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWxvb3AuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZVNoaXAgZnJvbSAnLi9jcmVhdGVTaGlwLmpzJztcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBncmlkID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xuICAgIGdyaWQucHVzaChbXSk7XG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMDsgayArPSAxKSB7XG4gICAgICBncmlkW2ldLnB1c2goMCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCBzaGlwID0gY3JlYXRlU2hpcCh4Lmxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBncmlkW3hbaV0gLSAxXVt5W2ldIC0gMV0gPSB7IHNoaXAsIHBhcnQ6IGkgfTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4Q29yZCwgeUNvcmQpID0+IHtcbiAgICBjb25zdCB4ID0geENvcmQgLSAxO1xuICAgIGNvbnN0IHkgPSB5Q29yZCAtIDE7XG5cbiAgICBpZiAoZ3JpZFt4XVt5XSA9PT0gLTEgfHwgKGdyaWRbeF1beV0gIT09IDAgJiYgZ3JpZFt4XVt5XS5zaGlwLmNvbmRbZ3JpZFt4XVt5XS5wYXJ0XSA9PT0gMCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGdyaWRbeF1beV0gIT09IDApIHtcbiAgICAgIGdyaWRbeF1beV0uc2hpcC5oaXQoZ3JpZFt4XVt5XS5wYXJ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JpZFt4XVt5XSA9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuICAgIGxldCBub1NoaXBzID0gdHJ1ZTtcbiAgICBncmlkLmZvckVhY2goKGNvbCkgPT4ge1xuICAgICAgY29sLmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICBpZiAodmFsICE9PSAwICYmIHZhbCAhPT0gLTEgJiYgIXZhbC5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgbm9TaGlwcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gbm9TaGlwcztcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdyaWQsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgYWxsU3VuayxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQuanMnO1xuXG5jb25zdCBQbGF5ZXIgPSAoZW5lbXlCb2FyZCkgPT4ge1xuICBsZXQgdHVybiA9IGZhbHNlO1xuXG4gIGNvbnN0IGF0dGFjayA9ICh4LCB5KSA9PiB7XG4gICAgaWYgKHR1cm4pIHtcbiAgICAgIHR1cm4gPSAhZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1R1cm4gPSAoKSA9PiB7XG4gICAgdHVybiA9IHRydWU7XG4gIH07XG5cbiAgY29uc3QgYWlNb3ZlID0gKCkgPT4ge1xuICAgIGlmICh0dXJuKSB7XG4gICAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgICAgdHVybiA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhdHRhY2ssXG4gICAgaXNUdXJuLFxuICAgIGFpTW92ZSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAoc2l6ZSkgPT4ge1xuICBjb25zdCBjb25kID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgY29uZC5wdXNoKDEpO1xuICB9XG5cbiAgY29uc3QgaGl0ID0gKHNob3QpID0+IHtcbiAgICBjb25kW3Nob3RdID0gMDtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiAhY29uZC5pbmNsdWRlcygxKTtcblxuICByZXR1cm4ge1xuICAgIGNvbmQsXG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNoaXA7XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyLmpzJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQuanMnO1xuXG5jb25zdCBnYW1lbG9vcCA9ICgoKSA9PiB7XG4gIGNvbnN0IGJvYXJkT25lID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGJvYXJkVHdvID0gR2FtZWJvYXJkKCk7XG5cbiAgYm9hcmRPbmUucGxhY2VTaGlwKFsxLCAxLCAxXSwgWzEsIDIsIDNdKTtcbiAgYm9hcmRPbmUucGxhY2VTaGlwKFsxLCAyLCAzXSwgWzEsIDEsIDFdKTtcbiAgYm9hcmRPbmUucGxhY2VTaGlwKFs1LCA1XSwgWzgsIDldKTtcbiAgYm9hcmRPbmUucGxhY2VTaGlwKFs4XSwgWzNdKTtcbiAgYm9hcmRPbmUucGxhY2VTaGlwKFsyLCAzXSwgWzYsIDZdKTtcblxuICBib2FyZFR3by5wbGFjZVNoaXAoWzEsIDEsIDFdLCBbMSwgMiwgM10pO1xuICBib2FyZFR3by5wbGFjZVNoaXAoWzEsIDIsIDNdLCBbMSwgMSwgMV0pO1xuICBib2FyZFR3by5wbGFjZVNoaXAoWzUsIDVdLCBbOCwgOV0pO1xuICBib2FyZFR3by5wbGFjZVNoaXAoWzhdLCBbM10pO1xuICBib2FyZFR3by5wbGFjZVNoaXAoWzIsIDNdLCBbNiwgNl0pO1xuXG4gIGNvbnN0IHAxID0gUGxheWVyKGJvYXJkVHdvKTtcbiAgY29uc3QgcDIgPSBQbGF5ZXIoYm9hcmRPbmUpO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IDI7IGkgKz0gMSkge1xuICAgIGNvbnN0IHBsYXllciA9IGkgPT09IDEgPyAnUDEnIDogJ1AyJztcblxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICBjb25zdCBzaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2lkZS5jbGFzc0xpc3QuYWRkKCdzaWRlJywgYCR7cGxheWVyfWApO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoc2lkZSk7XG5cbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChib2FyZCk7XG5cbiAgICBjb25zdCBib2FyZFhDb3JkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9hcmRYQ29yZC5jbGFzc0xpc3QuYWRkKCd4LWNvcmQnKTtcbiAgICBib2FyZC5hcHBlbmRDaGlsZChib2FyZFhDb3JkKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDEwOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGNvcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvcmQudGV4dGNvbnRlbnQgPSBpID09PSAwID8gJycgOiBgJHtpfWA7XG4gICAgICBib2FyZFhDb3JkLmFwcGVuZENoaWxkKGNvcmQpO1xuICAgIH1cblxuICAgIGNvbnN0IGJvYXJkWUNvcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2FyZFlDb3JkLmNsYXNzTGlzdC5hZGQoJ3ktY29yZCcpO1xuICAgIGJvYXJkLmFwcGVuZENoaWxkKGJvYXJkWUNvcmQpO1xuXG4gICAgZm9yIChsZXQgayA9IDE7IGsgPCAxMDsgayArPSAxKSB7XG4gICAgICBjb25zdCBjb3JkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb3JkLnRleHRjb250ZW50ID0gYCR7a31gO1xuICAgICAgYm9hcmRZQ29yZC5hcHBlbmRDaGlsZChjb3JkKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSAxMDsgeCArPSAxKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMTsgeSA8PSAxMDsgeSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKGAke3h9YCwgYCR7eX1gKTtcbiAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmNsYXNzTGlzdFswXSk7XG4gICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQuY2xhc3NMaXN0WzFdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lbG9vcDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==