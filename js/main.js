/*----------Constants-----------*/
const STRINGS = {
    '0': new Audio('strings\\1st_String_E_64kb.mp3'),
    '1': new Audio('strings\\2nd_String_B__64kb.mp3'),
    '2': new Audio('strings\\3rd_String_G_64kb.mp3'),
    '3': new Audio('strings\\4th_String_D_64kb.mp3'),
    '4': new Audio('strings\\5th_String_A_64kb.mp3'),
    '5': new Audio('strings\\6th_String_E_64kb.mp3'),
};

/*---------State Variables-----------*/
let playerArray;
let computerArray;
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
const stringEl = document.getElementsByClassName('strings');
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
    //Computer starts the game by playing a sequence
    computerChoice();
}

function initFreePlay() {
    if (freePlay === false) {
        freePlayBtn.style.backgroundColor = 'red';
        messageEl.style.visibility = "hidden";
        playBtn.style.visibility = "hidden";
        freePlay = true;
        computerTurn = false;
        for (let i = 0; i < stringEl.length; i++) {
            stringEl[i].classList.add('pick');
        }
    } else {
        //turn freeplay off
        freePlayBtn.style.backgroundColor = 'rgb(4, 28, 167)';
        playBtn.style.visibility = "";
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
    //freeplay gamemode
    if (freePlay === true) {
        pChoice = parseInt(evt.target.id.replace('s', ''));
        renderPNotes(pChoice);
    } else {
        // actual game
        // getting the number from our evt target to know which string is being played
        pChoice = parseInt(evt.target.id.replace('s', ''));
        playerArray.push(pChoice); // add number to array
        renderResults(pChoice); 
        if (playerArray.length === computerArray.length && gameOver === false) {
            computerTurn = true;
            for (let i = 0; i < stringEl.length; i++) {
                stringEl[i].classList.remove('pick');
            }
            setTimeout (renderScore, 1000);
        }
    }
}

function renderMessage() {
    gameOver = true;
    if (score > highScore && score > 1) {
        highScore = score;
        messageEl.innerText = `NEW HIGH SCORE!! You scored ${highScore} points!`;
        highScoreEl.innerText = `${highScore}`;
    } else if (score > highScore) {
        highScore = score;
        messageEl.innerText = `NEW HIGH SCORE!! You scored ${highScore} point!`;
        highScoreEl.innerText = `${highScore}`;
    } else if (score === 0) {
        messageEl.innerText = `GAME OVER. You didn't score any points. 😓`;
    } else if (score === 1) {
        messageEl.innerText = `GAME OVER. You scored ${score} point!`;
    } else {
        messageEl.innerText = `GAME OVER. You scored ${score} points!`;
    }
    messageEl.style.background = 'rgba(20, 20, 20, 0.8)';
    freePlayBtn.style.visibility = '';
    messageEl.style.visibility = '';
    playBtn.style.visibility = '';
}

function renderResults(pChoice) {
    if (pChoice === computerArray[playerArray.length -1]) {
        renderPNotes(pChoice);
    } else {
        gameOver = true;
        computerTurn = true;
        for (let i = 0; i < stringEl.length; i++) {
            stringEl[i].classList.remove('pick');
        }
    //game over
        renderMessage();
    }
}

function renderScore() {
    score++;
    computerChoice();
}

function renderPNotes(pChoice) {
    let strum = document.getElementById(`s${pChoice}`);
    strum.classList.add('p-choice');
    let x = 0;
    STRINGS[pChoice].currentTime = 3;
    STRINGS[pChoice].play();
    const timerId = setInterval(function() {
        x++;
        if (x = 1) {
            strum.classList.remove('p-choice');
        } else {
            clearInterval(timerId);
        }
    }, 500);
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
    playerArray = []; //reset player note array to 0
    const cChoice = Math.floor(Math.random() * 6);
    computerArray.push(cChoice); // adds a note to the computers choices
    renderNotes(); //shows the player
}