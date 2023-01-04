const compassVectors = CompassVectors();
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
    this.vectors = [];
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

class Rook extends Piece {
  constructor(controller, pieceColor, pieceName, r, c) {
    super(controller, pieceColor, pieceName, r, c);
    this.vectors = [compassVectors.n, compassVectors.e, compassVectors.s, compassVectors.w];
  }
}

class Queen extends Piece {
  constructor(controller, pieceColor, pieceName, r, c) {
    super(controller, pieceColor, pieceName, r, c);
    /* For the Queen we fill an array with all the values in the compassVectors object */
    this.vectors = Array.from(Object.values(compassVectors));
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

function CompassVectors() {
  return {
    n: Array(8).fill({ r: -1, c: 0 }),
    e: Array(8).fill({ r: 0, c: 1 }),
    s: Array(8).fill({ r: 1, c: 0 }),
    w: Array(8).fill({ r: 0, c: -1 }),
    ne: Array(8).fill({ r: -1, c: 1 }),
    se: Array(8).fill({ r: 1, c: 1 }),
    nw: Array(8).fill({ r: -1, c: -1 }),
    sw: Array(8).fill({ r: 1, c: 1 }),
  }
}

// Northeast (NE), 45°, halfway between north and east, is the opposite of southwest.
// Southeast (SE), 135°, halfway between south and east, is the opposite of northwest.
// Southwest (SW), 225°, halfway between south and west, is the opposite of northeast.
// Northwest (NW), 315°, halfway between north and west, is the opposite of southeast.