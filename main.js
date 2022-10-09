/*----------Constants-----------*/
// const AUDIO = new Audio()
const STRINGS = {
    '0': 'e2',
    '1': 'a2',
    '2': 'd3',
    '3': 'g3',
    '4': 'b3',
    '5': 'e4',
}

/*---------State Variables-----------*/
let playerArray = [];
let computerArray = [];
let score;
let computerTurn;
let pCurChoice;
/*---------Cached Elements-----------*/
// const stringEl = document.getElementsByClassName('strings');
const playBtn = document.querySelector('button');
const scoreEl = document.getElementById('score');
const messageEl = document.querySelector('h2');

/*---------Event Listeners--------*/
document.querySelector('button').addEventListener('click', init)
//message elements
document.getElementById('s0').addEventListener('click', handleStrum);
document.getElementById('s1').addEventListener('click', handleStrum);
document.getElementById('s2').addEventListener('click', handleStrum);
document.getElementById('s3').addEventListener('click', handleStrum);
document.getElementById('s4').addEventListener('click', handleStrum);
document.getElementById('s5').addEventListener('click', handleStrum);


/*-----------Functions------------*/
init();

function init() {
    score = 0;
    messageEl.innerText = ''
    playerArray = []
    computerArray = []
    computerChoice();
    render();
}
function handleStrum(evt) {
    //guard
    if (computerTurn === true) return;
        pChoice = parseInt(evt.target.id.replace('s', ''));
        playerArray.push(pChoice);
        pCurChoice = playerArray[playerArray.length - 1];
        renderResults(pCurChoice);
    if (playerArray.length === computerArray.length)
        computerChoice();
}
function render() {
    renderScore();
}
function renderMessage() {
    messageEl.innerText = `Game Over. You scored ${score} points!`
}
function renderResults(pCurChoice) {
        if (pCurChoice === computerArray[playerArray.length -1]) {
            console.log(playerArray);
            score++;
            renderScore();
        } else {
            computerTurn = true;
        //game over
            renderMessage();
        }
    };

function renderScore() {
    scoreEl.innerText = `${score}`;
}
// function renderPNotes(pChoice) {
//     pChoice.className = 'p-choice'
//     console.log(pChoice.className)
//         let count = playerArray.length;
//         // AUDIO.currentTime = 0;
//         // AUDIO.play();
//         const timerId = setInterval(function() {
//             count--;
//             if (count) {
//         pChoice.className = 'p-choice'
//         } else {
//             clearInterval(timerId);
//             console.log(pChoice.classList)
//             pChoice.classList.remove('p-choice')
//         }
//     }, 1000);
// }

function renderNotes() {
    let x = 0;
    let strum = document.getElementById(`s${computerArray[0]}`);
    strum.className = 'comp-choice';
    // AUDIO.currentTime = 0;
    // AUDIO.play();
    const timerId = setInterval(function() {
        x++;
        strum.classList.remove('comp-choice');
        if (x < computerArray.length) {
            strum = document.getElementById(`s${computerArray[x]}`);
            strum.className = 'comp-choice';
        } else {
            clearInterval(timerId);
            computerTurn = false;
        }
    }, 500);
}


function computerChoice() {
    computerTurn = true; // disable pControls
    playerArray = [] //reset player note array to 0
    const cChoice = Math.floor(Math.random() * 6);
    computerArray.push(cChoice); // adds a note to the computers choices
    renderNotes(); //shows the player
}
// computer select string
// computer play string
// player select string/play string
// game over message


//1.0 player will activate the game pressing the play again or play button. 
    //1.1 this will init the game by calling render()
    //1.2  sets the computer to play first
    //1.3 disables the player controls

//2.0 game will light up and play a sound for a series of buttons
    //2.1 renderguitar() activates the computers randomindex to push a random number(equalling a note/div) into an array.
    //2.2 render players scorecard to keep track of score

//player will have a chance to repeat the choices
    //3.1 allow player controls back to repeat the strings(pushing the number from the string into a seperate array)
    //3.2 check the players.strings(array) against the computer.strings(array)
    //3.3 if the player is correct start the function to make the computer function add another string
    //3.4 if the player is incorrect show the score and congratulate the player. Allow the play again button to work.
//4.0 game will add another choice per round
    //4.1 random number index between 0-5 will correspond with the divs(strings) .push() them into an array to compare with the player
    //4.2 the added index will add and remove a css class to highlight the correct string to show the player for a half second.

