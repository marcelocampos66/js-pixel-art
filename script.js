window.onload = () => {
  callEveryone();
  const defaultColor = document.querySelector('.color0');
  defaultColor.style.backgroundColor = 'black';
  defaultColor.classList.add('selected');
};

const MAX_COLORS = 32;
const getColorPalette = document.getElementById('color-palette');
const getDivButton = document.querySelector('.buttons-container');
const getPixelBoardContainer = document.querySelector('.pixel-board-container');

const createPixelBoard = () => {
  const pixelBoard = document.createElement('div')
  pixelBoard.id = 'pixel-board';
  getPixelBoardContainer.appendChild(pixelBoard);
}

const createClearBoarButton = () => {
  const clearBoarButton = document.createElement('button');
  clearBoarButton.id = 'clear-board';
  clearBoarButton.innerText = 'Clear';
  getDivButton.appendChild(clearBoarButton);
};

const createSizeInput = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.id = 'board-size';
  getDivButton.appendChild(input);
};

const createChangeSizeButton = () => {
  const createInputButton = document.createElement('button');
  createInputButton.id = 'generate-board';
  createInputButton.innerText = 'Size';
  getDivButton.appendChild(createInputButton);
};

const changeColorOfPixel = (e) => {
  const selectedColor = document.getElementsByClassName('selected')[0].style.backgroundColor;
  e.target.style.backgroundColor = selectedColor;
}

const createBoxOfColorsOnPalette = () => {
  for (let index = 0; index < MAX_COLORS; index += 1) {
    const colorPalette = document.createElement('div');
    colorPalette.className = `color${index}`;
    colorPalette.classList.add('color-pick')
    getColorPalette.appendChild(colorPalette);
  }
};

const printPixelsFrame = (size=15) => {
  const getPixelBoard = document.getElementById('pixel-board');
  getPixelBoard.innerHTML = '';
  for (let line = 0; line < size; line += 1) {
    const createDivLine = document.createElement('div');
    createDivLine.className = 'fix-pixel';
    for (let column = 0; column < size; column += 1) {
      const createDivColumns = document.createElement('div');
      createDivColumns.className = 'pixel';
      createDivColumns.addEventListener('click', changeColorOfPixel);
      createDivLine.appendChild(createDivColumns);
    }
    getPixelBoard.appendChild(createDivLine);
  }
}

const changeColorSelected = () => {
  const getColors = document.querySelector('#color-palette');
  getColors.addEventListener('click', function (event) {
    const getSelectedColor = document.querySelector('.selected');
    getSelectedColor.classList.remove('selected');
    event.target.classList.add('selected');
  });
}

const clearPixelsBoard = () => {
  const getClearButton = document.querySelector('#clear-board');
  getClearButton.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => {
      pixel.style.backgroundColor = 'white';
    })
  });
}

const limitBoardSize = (boardSize) => {
  if (boardSize < 5) {
    boardSize = 5;
    printPixelsFrame(boardSize);
  } else {
    boardSize = 50;
    printPixelsFrame(boardSize);
  }
}

const changeBoardSize = () => {
  const getInputField = document.querySelector('#board-size');
  const getSizeButton = document.querySelector('#generate-board');

  getSizeButton.addEventListener('click', () => {
    const boardSize = getInputField.value;
    if (boardSize === '') {
      alert('Board inválido!');
      return;
    }
    if (boardSize < 10 || boardSize > 22) {
      getInputField.value = '';
      printPixelsFrame(15);
      alert('Type a value between 10 and 19');
      return;
    }
    printPixelsFrame(boardSize);
    getInputField.value = '';
  });
}

const createColors = () => {
  for (let index = 1; index < MAX_COLORS ; index += 1) {
    const color = {
      r: parseInt(Math.random() * 255),
      g: parseInt(Math.random() * 255),
      b: parseInt(Math.random() * 255),
    }
    const { r, g, b } = color;
    const colorOnPallete = document.querySelector(`.color${index}`);
    colorOnPallete.style.backgroundColor = `rgb( ${r}, ${g}, ${b} )`;
  }
}

const callEveryone = () => {
  createPixelBoard();
  createClearBoarButton();
  createSizeInput();
  createChangeSizeButton();
  createBoxOfColorsOnPalette();
  printPixelsFrame();
  changeColorSelected();
  clearPixelsBoard();
  changeBoardSize();
  createColors();
}
