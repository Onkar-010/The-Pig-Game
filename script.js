'use strict';
// Selecting the Element's
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const currentEL0 = document.querySelector('#current--0');
const currentEL1 = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Selecting the Button's
const btnreset = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

let score, current, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  // Declaring the initial Variable's
  score = [0, 0];
  current = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
};

init();

// Stating intial Conditaion's

// Switching the Player Function
const switchPlayer = function () {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Implementing rolling dice Functionality
btnroll.addEventListener('click', function () {
  if (playing) {
    // Generating the dice Number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check the Rolled is 1
    if (dice !== 1) {
      current += dice;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
      //  Switching the Player
      switchPlayer();
    }
  }
});

// Implementation of Hold Function
btnhold.addEventListener('click', function () {
  if (playing) {
    // adding the Current Score to main score
    score[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // Checking Wether score above 100 or not
    if (score[activePlayer] >= 100) {
      // Active Player Wins
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Swtiching the Player
      switchPlayer();
    }
  }
});
// Implementing the Reset Button Functionality
btnreset.addEventListener('click', init);
