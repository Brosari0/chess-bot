import { createChessPiece } from "./Piece.js";

const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;
const initPieceOrder = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

export class Controller {
  constructor(board) {
    this.board = board;
    this.squares = null;
    this.boardData = Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH));
      initBoard(this);
  }
  checkSquare(r, c) {
    return this.boardData(r, c)
  }
}

function initBoard({ board, squares, boardData }) {
  board.innerHTML = `<div></div>`.repeat(BOARD_WIDTH * BOARD_HEIGHT);
  squares = Array.from(board.querySelectorAll(`div`));

  squares.forEach((element, i) => {
      element.textContent = i + 1;
  });

  const numberCaptions = Array.from(Array(9).keys()).splice(1);
  const letterCaptions = numberCaptions.map(n => String.fromCharCode("a".charCodeAt(0) - 1 + n));
  const revNumberCaptions = numberCaptions.reverse();
  const revLetterCaptions = letterCaptions.reverse();

  for (let r = 0, n = 0; r < boardData.length; r++) {
      for (let c = 0; c < boardData[r].length; c++, n++) {
          const tile = squares[n];
          tile.onclick = () => console.log(boardData[r][c]);

          const pieceColor = r < 3 ? 'white' :
              r > boardData.length - 3 ? 'dark' : '';
              tile.dataset.role = `${pieceColor}-${pieceName}`;
          if (r === 0) {
            const pieceName = initPieceOrder[c];
              boardData[r][c] = {
                  // r, c, piece: new Piece(r, c)
              };
          } else if (r === 1) {
              tile.dataset.role = `${pieceColor}-pawn`;
          } else if (r === boardData.length - 2) {
              tile.dataset.role = `${pieceColor}-pawn`;
          } else if (r === boardData.length - 1) {
              tile.dataset.role = `${pieceColor}-${pieceName}`;
          }
      }
  }
}
