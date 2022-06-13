import Player from './Player.js';
import Gameboard from './Gameboard.js';

const gameloop = (() => {
  const boardOne = Gameboard();
  const boardTwo = Gameboard();
  const winnerDisplay = document.createElement('div');
  winnerDisplay.classList.add('winnerDisplay', 'hide');
  document.body.appendChild(winnerDisplay);

  const gameStart = false;

  const p1 = Player(boardOne);
  const p2 = Player(boardTwo);

  const showWinner = () => {
    console.log(boardOne.allSunk());
  };

  const round = (cell) => {
    const x = cell.target.classList[0].slice(1);
    const y = cell.target.classList[1].slice(1);
    const playersBoard = cell.target.classList[2].slice(1);
    if (playersBoard === 'P1' && !p1.attack(x, y)) {
      if (!boardTwo.allSunk()) {
        boardOne.updateBoard(x, y, 1);
        p2.isTurn();
      }
      if (!boardOne.allSunk()) {
        const aiShot = p2.aiMove();
        boardTwo.updateBoard(aiShot[0], aiShot[1], 2);
        p1.isTurn();
      }
      if (boardOne.allSunk() || boardTwo.allSunk()) {
        showWinner();
      }
    }
  };

  const enterDroppable = (droppable, onShip) => {
    let canPlace = true;
    const isHor = (Array.from(onShip.classList).find((val) => val === 'hor') === 'hor');

    for (let i = 0; i < 5; i += 1) {
      let target;
      switch (i) {
        case 0:
          target = document.querySelector('.carrier');
          break;
        case 1:
          target = document.querySelector('.battleship');
          break;
        case 2:
          target = document.querySelector('.cruiser');
          break;
        case 3:
          target = document.querySelector('.submarine');
          break;
        default:
          target = document.querySelector('.destroyer');
          break;
      }
      const targetLoc = target.getBoundingClientRect();
      const shipLoc = onShip.getBoundingClientRect();
      if (target !== onShip
          && ((((Math.abs(shipLoc.bottom - targetLoc.top) <= 50)
          || (Math.abs(shipLoc.top - targetLoc.bottom) <= 50))
          && ((Math.abs(shipLoc.left - targetLoc.right) <= 50)
          || (Math.abs(shipLoc.right - targetLoc.left) <= 50)))
          || ((Math.abs(shipLoc.top - targetLoc.top) < 75
          || Math.abs(shipLoc.bottom - targetLoc.bottom) < 75)
          && (Math.abs(shipLoc.left - targetLoc.left) < 75
          || Math.abs(shipLoc.right - targetLoc.right) < 75)))) {
        canPlace = false;
      }
    }

    if (((isHor && onShip.getBoundingClientRect().right <= 558)
    || (!isHor && onShip.getBoundingClientRect().bottom <= 558))
    && canPlace) {
      onShip.style.left = `${droppable.getBoundingClientRect().x}px`;
      onShip.style.top = `${droppable.getBoundingClientRect().y}px`;
      onShip.classList.add('placed');
    }
  };

  const dragShip = (event) => {
    let onShip;
    let shift;

    switch (event.currentTarget.classList[0]) {
      case 'carrier':
        onShip = document.querySelector('.carrier');
        break;
      case 'battleship':
        onShip = document.querySelector('.battleship');
        break;
      case 'cruiser':
        onShip = document.querySelector('.cruiser');
        break;
      case 'submarine':
        onShip = document.querySelector('.submarine');
        break;
      default:
        onShip = document.querySelector('.destroyer');
        break;
    }

    const shiftX = event.clientX - onShip.getBoundingClientRect().left;
    const shiftY = event.clientY - onShip.getBoundingClientRect().top;

    onShip.style.position = 'absolute';
    onShip.style.zIndex = 1000;
    document.body.append(onShip);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      onShip.style.left = `${pageX - shiftX}px`;
      onShip.style.top = `${pageY - shiftY}px`;
    }

    function onMouseMove(event) {
      onShip.classList.remove('placed');
      moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);

    let currentDroppable = null;

    onShip.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      onShip.onmouseup = null;
      const xLoc = 25 + onShip.getBoundingClientRect().left;
      const yLoc = 25 + onShip.getBoundingClientRect().top;
      onShip.hidden = true;
      const elemBelow = document.elementFromPoint(xLoc, yLoc);
      onShip.hidden = false;

      if (!elemBelow || elemBelow.classList[3] !== 'droppable') {
        onShip.style.position = 'static';
        const shipHolder = document.getElementById('ship-holder');
        shipHolder.appendChild(onShip);
        return;
      }

      const droppableBelow = elemBelow.closest('.droppable');

      if (currentDroppable !== droppableBelow) {
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          enterDroppable(currentDroppable, onShip);
        }
      }
    };
  };

  const rotateShips = () => {
    const shipHolder = document.getElementById('ship-holder');
    shipHolder.classList.toggle('flip');
    for (let i = 2; i < document.getElementById('ship-holder').children.length; i += 1) {
      document.getElementById('ship-holder').children[i].classList.toggle('hor');
    }
  };

  const start = () => {
    const canStart = (document.querySelectorAll('.placed').length >= 5);
    if (!canStart) return;
    const shipHolder = document.getElementById('ship-holder');
    for (let i = 2; i < shipHolder.children.length; i += 1) {
      const ship = shipHolder.children[i];
      let xCord;
      let yCord;
      const isHor = (Array.from(ship.classList).find((val) => val === 'hor') === 'hor');
      const startX = ship.getBoundingClientRect().left;
      const startY = ship.getBoundingClientRect().top;
      let size;
      switch (ship.classList[0]) {
        case 'carrier':
          size = 5;
          break;
        case 'battleship':
          size = 4;
          break;
        case 'cruiser':
          size = 3;
          break;
        case 'submarine':
          size = 2;
          break;
        default:
          size = 1;
          break;
      }
      for (let k = 0; k < size; k += 1) {
        if (isHor) {
          xCord[k] = startX + k;
          yCord[k] = startY;
        } else {
          xCord[k] = startX;
          yCord[k] = startY + k;
        }
      }
      boardTwo.placeShip(xCord, yCord);
    }
    boardOne.placeShipsAI();
    console.table(boardOne.grid);
    console.table(boardTwo.grid);

    shipHolder.innerHTML = '';
    document.querySelectorAll('.placed').forEach((values) => values.remove());
    p1.isTurn();
  };

  const shipSetUp = (side) => {
    const shipHolder = document.createElement('div');
    shipHolder.setAttribute('id', 'ship-holder');
    side.appendChild(shipHolder);

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start';
    startBtn.classList.add('start');
    startBtn.onclick = start;
    shipHolder.appendChild(startBtn);

    const rotateBtn = document.createElement('button');
    rotateBtn.textContent = 'Rotate';
    rotateBtn.classList.add('rotateBtn');
    rotateBtn.onclick = rotateShips;
    shipHolder.appendChild(rotateBtn);

    const carrier = document.createElement('div');
    carrier.classList.add('carrier', 'ship');
    carrier.onmousedown = dragShip;
    carrier.ondragstart = () => false;
    shipHolder.appendChild(carrier);

    const battleship = document.createElement('div');
    battleship.classList.add('battleship', 'ship');
    battleship.onmousedown = dragShip;
    battleship.ondragstart = () => false;
    shipHolder.appendChild(battleship);

    const cruiser = document.createElement('div');
    cruiser.classList.add('cruiser', 'ship');
    cruiser.onmousedown = dragShip;
    cruiser.ondragstart = () => false;
    shipHolder.appendChild(cruiser);

    const submarine = document.createElement('div');
    submarine.classList.add('submarine', 'ship');
    submarine.onmousedown = dragShip;
    submarine.ondragstart = () => false;
    shipHolder.appendChild(submarine);

    const destroyer = document.createElement('div');
    destroyer.classList.add('destroyer', 'ship');
    destroyer.onmousedown = dragShip;
    destroyer.ondragstart = () => false;
    shipHolder.appendChild(destroyer);
  };

  for (let i = 1; i <= 2; i += 1) {
    const player = i === 1 ? 'P1' : 'P2';

    const body = document.querySelector('body');

    const side = document.createElement('div');
    side.classList.add('side', `${player}`);
    body.appendChild(side);

    const board = document.createElement('div');
    board.classList.add('board');
    side.appendChild(board);

    const boardXCord = document.createElement('div');
    boardXCord.classList.add('x-cord');
    board.appendChild(boardXCord);

    for (let a = 0; a <= 10; a += 1) {
      const cord = document.createElement('div');
      cord.innerText = a === 0 ? '0' : `${a}`;
      boardXCord.appendChild(cord);
    }

    const boardYCord = document.createElement('div');
    boardYCord.classList.add('y-cord');
    board.appendChild(boardYCord);

    for (let k = 1; k <= 10; k += 1) {
      const cord = document.createElement('div');
      cord.innerText = `${k}`;
      boardYCord.appendChild(cord);
    }

    const grid = document.createElement('div');
    grid.classList.add('grid');
    board.appendChild(grid);

    for (let x = 1; x <= 10; x += 1) {
      for (let y = 1; y <= 10; y += 1) {
        const cell = document.createElement('div');
        cell.classList.add(`X${x}`, `Y${y}`, `B${player}`);
        grid.appendChild(cell);
        if (i === 1) {
          cell.classList.add('droppable');
          cell.addEventListener('click', (e) => {
            round(e);
          });
        }
      }
    }

    if (i === 1) shipSetUp(side);
  }
})();

export default gameloop;
