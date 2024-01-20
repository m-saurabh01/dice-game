'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

let playing, activePlayer, scores, curscore;

const init = function () {
  playing = true;
  activePlayer = 0;
  curscore = 0;
  scores = [0, 0];
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  diceEl.classList.add('hidden');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  curscore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    const genScore = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${genScore}.png`;
    diceEl.classList.remove('hidden');

    if (genScore !== 1) {
      curscore += genScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        curscore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += curscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
