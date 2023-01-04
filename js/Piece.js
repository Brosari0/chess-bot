
class Piece {
  constructor(r, c, controller) {
    this.controller = controller;
    this.r = r;
    this.c = c;
  }

  get index() {
    return (this.r * 8) + this.c;
  }
}

class Knight extends Piece {
  constructor(r, c, controller) {
    super(r, c, controller);
  }
}

export function createChessPiece(pieceName, pieceColor, r, c) {
  switch(pieceName) {
    case 'pawn' :

    break;
    case 'knight' : 

    break;
    case 'bishop' :
              
    break;
    case 'rook' :
      
    break;
    case 'queen' :
        
    break;
    case 'king' :
          
    break;
    
    default: 
    console.warn(pieceName + " not supported");
  }
}

// String.prototype.toProperCase = (word) => {
//   return word.charAt(0).toUpperCase + word.substring(1);
// }