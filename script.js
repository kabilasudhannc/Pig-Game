'use strict';
// const player1 = document.querySelector('.player--0');
// const player2 = document.querySelector('.player--1');
// const player1TotalScore = player1.querySelector('.score');
// const player2TotalScore = player2.querySelector('.score');
// const player1CurrentScore = player1.querySelector('.current-score');
// const player2CurrentScore = player2.querySelector('.current-score');
// const dice = document.querySelector('.dice');
// dice.style.display = 'none';

// let currentPlayer = 'player-1';

// const newGame = function () {
//     player1TotalScore.textContent = 0;
//     player2TotalScore.textContent = 0;
//     player1CurrentScore.textContent = 0;
//     player2CurrentScore.textContent = 0;
//     player1.classList.add('player--active');
//     player2.classList.remove('player--active');
//     dice.style.display = 'none';
//     player1.classList.remove('player--winner');
//     player2.classList.remove('player--winner');
// }

// const rollDice = () => Math.trunc((Math.random() * 6) + 1);

// const playing = function () {
//     const diceScore = rollDice();
//     dice.style.display = 'flex';
//     dice.src = `dice-${diceScore}.png`
//     if (currentPlayer === 'player-1') {
//         if (diceScore !== 1) {
//             const currentScore = Number(player1CurrentScore.textContent);
//             player1CurrentScore.textContent = diceScore + currentScore;
//         }
//         else {
//             player1CurrentScore.textContent = 0;
//             currentPlayer = 'player-2';
//             player2.classList.add('player--active');
//             player1.classList.remove('player--active');
//         }
//     }
//     else {
//         if (diceScore !== 1) {
//             const currentScore = Number(player2CurrentScore.textContent);
//             player2CurrentScore.textContent = diceScore + currentScore;
//         }
//         else {
//             player2CurrentScore.textContent = 0;
//             currentPlayer = 'player-1';
//             player2.classList.remove('player--active');
//             player1.classList.add('player--active');
//         }
//     }
// }

// const hold = function () {
//     if (currentPlayer === 'player-1') {
//         player1TotalScore.textContent = Number(player1TotalScore.textContent) + Number(player1CurrentScore.textContent);
//         player1CurrentScore.textContent = 0;
//         currentPlayer = 'player-2';
//         player2.classList.add('player--active');
//         player1.classList.remove('player--active');
//         if (Number(player1TotalScore.textContent) >= 100) player1.classList.add('player--winner');
//     }

//     else {
//         player2TotalScore.textContent = Number(player2TotalScore.textContent) + Number(player2CurrentScore.textContent);
//         player2CurrentScore.textContent = 0;
//         currentPlayer = 'player-1';
//         player2.classList.remove('player--active');
//         player1.classList.add('player--active');
//         if (Number(player2TotalScore.textContent) >= 100) player2.classList.add('player--winner');
//     }
// }


// document.querySelector('.btn--new').addEventListener('click', newGame);
// document.querySelector('.btn--roll').addEventListener('click', playing);
// document.querySelector('.btn--hold').addEventListener('click', hold);


//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Starting conditions
let scores;
let currentScore;
let activePlayer;
let playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');
}

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore; // Change Later
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);

init();