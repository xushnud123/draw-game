'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//Starting conditions
let scores, activePlayer, currenScore, playing
const init = () => {
  scores = [0, 0];
  activePlayer = 0;
  currenScore = 0;
  playing = true;
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
   for (let i = 0; i < 2; i++) {
     scores[i] = 0;
     document.querySelector(`.player--${i}`).classList.remove('player--winner')
     document.getElementById(`current--${i}`).textContent = 0;
     document.getElementById(`score--${i}`).textContent = 0;
   }
}
init()

//Backround switch function
const bacFunction = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  const className = 'player--active';
  currenScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(className);
  player1El.classList.toggle(className);
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if(playing){
    //Random number function
    const dice = Math.trunc(Math.random() * 6) + 1;
  
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
  
    //Check for rolled
    if (dice === 1) {
      //switch activ player
      bacFunction(activePlayer);
    } else {
      //add dice to current score
      currenScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currenScore;
    }
  }
});

// Hold
btnHold.addEventListener('click', function () {
  if(playing){
    scores[activePlayer] += currenScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      bacFunction();
    }
  }
});

// New Game
btnNew.addEventListener('click', init);
