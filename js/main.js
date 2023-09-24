//lets create our Tamagotchi game logic here!
const INIT_STATE = {
    boredom: 0,
    hunger: 0,
    sleepiness:0,
};
/* State variables */
let sate = {boredom:0, hunger:0, sleepiness:0, age:0, cycles:0, timer:0, interval:0}
let boredom = 0
let hunger = 0
let sleepiness = 0

let age = 0
let cycles = 0

let timer
let interval = 0
/*----- cached elements  -----*/
const boredomStatEl = document.querySelector("#boredom-stat");
const hungerStatEl = document.querySelector("#hunger-stat");
const sleepyStatEl = document.querySelector("#sleepiness-stat");
const gameMessageEl = document.querySelector("#tama-message");
const gameBtnEls = document.querySelectorAll("button");
const gamePlayAgainEl = document.querySelector("#restart");



/*----- event listeners -----*/
gameBtnEls.forEach((btn) => btn.addEventListener("click", handleBtnClick));
gamePlayAgainEl.addEventListener("click", init);

function init() {
    resetUI();
    //console.log('Game started!')
    state = { ...INIT_STATE }; // create a copy of the default data

    age = 0; // integer
    cycles = 0; // integer

    interval = 500; // integer
    timer = setInterval(runGame, interval); // object

  render();
}
init()

function runGame() {
    console.log("the game is running!");
}

function renderStats() {
  boredomStatEl.textContent = state.boredom;
  hungerStatEl.textContent = state.hunger;
  sleepyStatEl.textContent = state.sleepiness;
}

function render() {
    renderStats();
}
function updateStat (stat, value) {
    if(state[stat] + value >= 0) {
        state[stat] += value
    } else {
        state[stat] = 0
    }

}

function updateStats() {
    for (key in state) {
        updateStat(key, Math.floor(Math.random() *3));
    }
}

function continueGame() {
    const testGame = Object.values(state).every((stat) => stat < 10);
    return testGame;
  }
  function runGame() {
    cycles++;
    
  
    if (continueGame()) {
      updateStats();
  
      // Icebox - call checkAge helper function to age up Tama
      // Icebox - add aging cycle to calculate aging up tama as a factor of cycles.
      // Icebox - add a message render state or game engine for parsing the state > UI changes. 
  
    } else {
      // if any stat is >= 10 -> end game cycle
      return gameOver();
    }
  
    renderStats();
  }
  
  function gameOver() {
    // alert player game over
    alert('Game Over!')
    clearInterval(timer);
    location.reload()
  }
  function handleBtnClick(e) {
  
    const convertProp = {
      feed: "hunger",
      sleep: "sleepiness",
      play: "boredom",
    };
    const btnText = convertProp[e.target.innerText];
    const newValue = -1 * (3 + Math.floor(Math.random() * 3))
    updateStat(btnText, newValue);
    render();
  }
  function gameOver() {
    // alert player game over
    gamePlayAgainEl.classList.remove("hidden");
    gameMessageEl.classList.remove("hidden");
  
    // stop timer
    clearInterval(timer);
  }
  function resetUI() {
    // display game over messaging
    gamePlayAgainEl.classList.add("hidden");
    gameMessageEl.classList.add("hidden");
  }