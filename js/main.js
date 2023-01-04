/*----------Constants-----------*/
const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

const boardData = Array(BOARD_HEIGHT).fill(Array(BOARD_WIDTH));
const initPieceOrder = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
/*---------State Variables-----------*/

/*---------Cached Elements-----------*/
// printElementWithIdConstants();
const board = document.getElementById("board");
const flipBoard = document.getElementById("flipBoard");
const savedGameNotation = document.getElementById("savedGameNotation");

let squares = null;
/*---------Event Listeners--------*/

/*-----------Functions------------*/


class Piece {
    constructor(r, c) {
        this.r = r;
        this.c = c;
    }

    get index() {
        return (this.r * 8) + this.c;
    }
}

class Knight extends Piece {
    constructor(r, c) {
        super(r, c);
    }
}

initBoard();

function initBoard() {
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

            const color = r < 3 ? 'white' :
                r > boardData.length - 3 ? 'dark' : '';
            if (r === 0) {
                tile.dataset.role = `${color}-${initPieceOrder[c]}`;
                boardData[r][c] = {
                    r, c, piece: new Piece(r, c)
                };
            } else if (r === 1) {
                tile.dataset.role = `${color}-pawn`;
            } else if (r === boardData.length - 2) {
                tile.dataset.role = `${color}-pawn`;
            } else if (r === boardData.length - 1) {
                tile.dataset.role = `${color}-${initPieceOrder[c]}`;
            }
        }
    }
}

function printElementWithIdConstants() {
    const list = [`Element With Id Constants`];
    document.querySelectorAll('[id]').forEach(element => {
        list.push(`const ${element.id} = document.getElementById("${element.id}");`);
    });
    console.log(list.join('\n'));
}

function chessDotComNotationToList(notation) {
    return notation.match(/[^\s]+/g)
}