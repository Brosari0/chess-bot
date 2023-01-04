import { createChessPiece, Piece } from "./piece.js";

const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

export class Controller {
  constructor(board) {
    this.board = board;
    this.squares = null;
    this.boardData = Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH));

    this.pieces = {
      dark: [],
      white: []
    }
    this.darkPieces = [];
    this.whitePieces = [];
    initBoard(this);
  }

  addPiece(piece) {

    if (piece.color === Piece.Colors.White)
      this.pieces.white.push(piece);
    else if (piece.color === Piece.Colors.Dark)
      this.pieces.dark.push(piece);
    else
      console.error(`Piece color ${piece.color} not supported`)
  }

  checkSquare(r, c) {
    return this.boardData(r, c)
  }
}

function initBoard(controller) {
  let { board, boardData, squares } = controller;

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
      let piece = null;

      const tile = squares[n];
      tile.onclick = () => console.log(boardData[r][c]);
      const pieceColor = r < 3 ? Piece.Colors.White :
        r > boardData.length - 3 ? Piece.Colors.Dark : '';

      let pieceName = '';

      if (r === 0) {
        pieceName = Piece.defaultPieceOrder[c];
        boardData[r][c] = {
          // r, c, piece: new Piece(r, c)
        };
      } else if (r === 1) {
        pieceName = Piece.Types.Pawn.name;
        piece = createChessPiece(controller, pieceColor, pieceName, r, c);
        tile.dataset.role = `${pieceColor}-${pieceName}`;
      } else if (r === boardData.length - 2) {
        pieceName = Piece.Types.Pawn.name;
        tile.dataset.role = `${pieceColor}-${pieceName}`;
      } else if (r === boardData.length - 1) {
        pieceName = Piece.defaultPieceOrder[c];
        tile.dataset.role = `${pieceColor}-${pieceName}`;
      }

      if (pieceName) tile.dataset.role = `${pieceColor}-${pieceName}`;
      if (piece) controller.addPiece(piece);

    }
  }
}
