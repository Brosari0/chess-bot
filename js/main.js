import { getPlayerGamesChessDotCom, getTestPlayer, PlayerChessDotComFactory, testPlayerChessDotComFactory } from "./chess-com-player.js";
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

window.chessDotComNotationToList = chessDotComNotationToList;
window.savedGameNotation = savedGameNotation;


async function loadSamplePlayerLive() {
    const player = await testPlayerChessDotComFactory();
    let games = getPlayerGamesChessDotCom(player);
    console.log(player)
}

async function loadSamplePlayerFromMockData() {
    const player = await getTestPlayer();
    let games = getPlayerGamesChessDotCom(player);
    console.log(games)
}

loadSamplePlayerFromMockData()