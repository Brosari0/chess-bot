/*----------Constants-----------*/
const STRINGS = {
    '0': new Audio('1st_String_E_64kb.mp3'),
    '1': new Audio('2nd_String_B__64kb.mp3'),
    '2': new Audio('3rd_String_G_64kb.mp3'),
    '3': new Audio('4th_String_D_64kb.mp3'),
    '4': new Audio('5th_String_A_64kb.mp3'),
    '5': new Audio('6th_String_E_64kb.mp3'),
};

/*---------State Variables-----------*/
let playerArray = [];
let computerArray = [];
let score;
let computerTurn;
let pCurChoice;
let gameOver;
let highScore = 0;
/*---------Cached Elements-----------*/

const playBtn = document.querySelector('button');
const highScoreEl = document.getElementById('high-score');
const messageEl = document.querySelector('h2');
let stringEl = document.getElementsByClassName('strings');

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
function init() {
    playBtn.style.visibility = "hidden"
    gameOver = false;
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
        if (playerArray.length === computerArray.length) {
            computerTurn = true;
            for (let i = 0; i < stringEl.length; i++) {
                stringEl[i].classList.remove('pick');
            }
                const pause = setTimeout (renderScore, 1000)
        }
    }

function render() {
    for (let i = 0; i < stringEl.length; i++) {
        stringEl[i].classList.add('pick');
    }
}
function renderMessage() {
    gameOver = true;
    if (score > highScore) {
        highScore = score;
        messageEl.innerText = `NEW HIGH SCORE!! You scored ${highScore} points!`;
        highScoreEl.innerText = `${highScore}`;
        playBtn.style.visibility = '';
    } else {
    messageEl.innerText = `Game Over. You scored ${score} points!`;
    playBtn.style.visibility = '';
    }
}
function renderResults(pCurChoice) {
        if (pCurChoice === computerArray[playerArray.length -1]) {
            renderPNotes(pCurChoice);
        } else {
            computerTurn = true;
            for (let i = 0; i < stringEl.length; i++) {
                stringEl[i].classList.remove('pick');
            }
        //game over
            renderMessage();
        }
    };

function renderScore() {
    score++;
    computerChoice();
}
function renderPNotes(pCurChoice) {
    let strum = document.getElementById(`s${pCurChoice}`);
    strum.classList.add('p-choice');
    let x = 0;
    STRINGS[pCurChoice].currentTime = 3;
    STRINGS[pCurChoice].play();
    const timerId = setInterval(function() {
        x++;
        if (x = 1) {
            strum.classList.remove('p-choice');
        } else {
            clearInterval(timerId);
        }
    }, 500,);
}

function renderNotes() {
    let x = 0;
    let strum = document.getElementById(`s${computerArray[0]}`);
    strum.classList.add('comp-choice');
    STRINGS[computerArray[0]].currentTime = 3;
    STRINGS[computerArray[0]].play();
    const timerId = setInterval(function() {
        x++;
        strum.classList.remove('comp-choice');
        if (x < computerArray.length) {
            strum = document.getElementById(`s${computerArray[x]}`);
            STRINGS[computerArray[x]].currentTime = 3;
            STRINGS[computerArray[x]].play();
            strum.classList.add('comp-choice');
        } else {
            clearInterval(timerId);
            computerTurn = false;
            for (let i = 0; i < stringEl.length; i++) {
                stringEl[i].classList.add('pick');
            }
        }
    }, 500);
}


function computerChoice() {
    if (gameOver === true) return;
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

