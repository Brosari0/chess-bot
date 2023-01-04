
export class Piece {
  static Colors = {
    Dark: "Dark",
    White: "White"
  }

  static Types = PieceTypes();
  static defaultPieceOrder = [Piece.Types.Rook.name, Piece.Types.Knight.name, Piece.Types.Bishop.name, Piece.Types.Queen.name, Piece.Types.King.name, Piece.Types.Bishop.name, Piece.Types.Knight.name, Piece.Types.Rook.name];

  constructor(controller, pieceColor, pieceName, r, c) {
    this.controller = controller;
    this.color = pieceColor;
    this.name = pieceName;
    this.r = r;
    this.c = c;
  }

  get index() {
    return (this.r * 8) + this.c;
  }
}

class Knight extends Piece {
  constructor(controller, pieceColor, pieceName, r, c) {
    super(controller, pieceColor, pieceName, r, c);
  }
}

class Pawn extends Piece {
  constructor(controller, pieceColor, pieceName, r, c) {
    super(controller, pieceColor, pieceName, r, c);
    console.log(this.color)
  }
}


export function createChessPiece(controller, pieceColor, pieceName, r, c) {
  switch (pieceName) {
    case Piece.Types.Pawn.Name:
      return new Pawn(controller, pieceColor, pieceName, r, c)
      break;
    case Piece.Types.Knight.Name:

      break;
    case Piece.Types.Bishop.Name:

      break;
    case Piece.Types.Rook.Name:

      break;
    case Piece.Types.Queen.Name:

      break;
    case Piece.Types.King.Name:

      break;
    default:
      console.warn(pieceName + " not supported");
  }
}


function PieceTypes() {
  return {
    King: {
      name: "King",
      notation: "K"
    },
    Queen: {
      name: "Queen",
      notation: "Q"
    },
    Bishop: {
      name: "Bishop",
      notation: "B"
    },
    Knight: {
      name: "Knight",
      notation: "N"
    },
    Rook: {
      name: "Rook",
      notation: "R"
    },
    Pawn: {
      name: "Pawn",
      notation: ""
    }
  }
}
// String.prototype.toProperCase = (word) => {
//   return word.charAt(0).toUpperCase + word.substring(1);
// }