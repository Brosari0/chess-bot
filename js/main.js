import { Controller } from "./controller.js";

/*----------Constants-----------*/



/*---------State Variables-----------*/

/*---------Cached Elements-----------*/
// printElementWithIdConstants();
const board = document.getElementById("board");
const flipBoard = document.getElementById("flipBoard");
const savedGameNotation = document.getElementById("savedGameNotation");

const controller = new Controller(board);

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