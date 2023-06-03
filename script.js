'use strict';


// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentscore, activePlayer, scores, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentscore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentEl1.textContent = 0;
  currentEl0.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const swtichPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Dice Roll Functionality
btnRoll.addEventListener('click', function (e) {
  if (playing) {
    // Generating random dice number

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Diplay dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for number 1 !! if yes swtich the player
    if (dice !== 1) {
      // Add dice to current score
      currentscore = currentscore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      swtichPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if score is >= 20
    // Finish the Game
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // Switch to the nextPlayer
      swtichPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
