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
let computerTurn = true;
let pCurChoice;
let gameOver;
let highScore = 0;
let freePlay = false;
/*---------Cached Elements-----------*/

const playBtn = document.getElementById('playB');
const highScoreEl = document.getElementById('high-score');
const messageEl = document.querySelector('h2');
let stringEl = document.getElementsByClassName('strings');
const freePlayBtn = document.getElementById('free-play');

/*---------Event Listeners--------*/
document.querySelector('#playB').addEventListener('click', init);
document.getElementById('free-play').addEventListener('click', initFreePlay);
document.getElementById('s0').addEventListener('click', handleStrum);
document.getElementById('s1').addEventListener('click', handleStrum);
document.getElementById('s2').addEventListener('click', handleStrum);
document.getElementById('s3').addEventListener('click', handleStrum);
document.getElementById('s4').addEventListener('click', handleStrum);
document.getElementById('s5').addEventListener('click', handleStrum);

/*-----------Functions------------*/
function init() {
    messageEl.style.visibility = "hidden";
    freePlayBtn.style.visibility = "hidden";
    playBtn.style.visibility = "hidden";
    gameOver = false;
    computerTurn = true;
    score = 0;
    messageEl.innerText = '';
    playerArray = [];
    computerArray = [];
    computerChoice();
}

function initFreePlay() {
    if (freePlay === false) {
        freePlay = true;
        messageEl.style.visibility = "hidden";
        computerTurn = false;
        for (let i = 0; i < stringEl.length; i++) {
        stringEl[i].classList.add('pick');
        }
    } else {
        freePlay = false;
        computerTurn = true;
        for (let i = 0; i < stringEl.length; i++) {
            stringEl[i].classList.remove('pick');
        }
    }
}
function handleStrum(evt) {
    //guard
    if (computerTurn === true) return;
    if (freePlay === true) {
        pChoice = parseInt(evt.target.id.replace('s', ''));
        renderPNotes(pChoice);

    } else {
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
}
function renderMessage() {
    gameOver = true;
    if (score > highScore) {
        highScore = score;
        messageEl.innerText = `NEW HIGH SCORE!! You scored ${highScore} points!`;
        messageEl.style.background = 'rgba(20, 20, 20, 0.8)';
        highScoreEl.innerText = `${highScore}`;
        freePlayBtn.style.visibility = '';
        messageEl.style.visibility = '';
        playBtn.style.visibility = '';
    } else {
    messageEl.innerText = `Game Over. You scored ${score} points!`;
    messageEl.style.background = 'rgba(20, 20, 20, 0.8)';
    freePlayBtn.style.visibility = '';
    messageEl.style.visibility = '';
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