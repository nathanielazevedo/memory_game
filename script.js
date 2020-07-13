
//later we use this to append newDiv's to it.
const gameContainer = document.getElementById("game");

//the array of colors we're shuffling now.
const COLORS = ['olivedrab', 'mediumpurple', 'indianred', 'teal', 'olivedrab', 'mediumpurple', 'indianred', 'teal', 'peru', 'peru']

// function definition to randomize any array.
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//shuffle the array we provided 'COLORS' and same it to a the variable shuffledColors.
let shuffledColors = shuffle(COLORS);

let startButton = document.getElementById('start');

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);   
  }
  title.style.display = 'none';
  startButton.style.display = 'none';

//to count the number of clicks the user has done.
  let counter = document.createElement('h1');
    counter.innerHTML = count;
    counter.classList.add('counters');
    gameContainer.append(counter);
}

//to remember cards and total flipped.
let card1 = 0;
let card2 = 0;
let card1color = 0;
let count = 0;
let flipped = 0;

// TODO: Implement this function!
function handleCardClick(event) {

//i'm saving access to each card each flip.
  let thisCard = event.target;
  let counters = document.getElementsByClassName('counters');
  
//if they're trying to choose a third card quickly or if they're clicking the same card.
  if(card1 && card2 || card1 == thisCard) return;


//if this is the first click.
  else if(!card1 && !card2){ 
    thisCard.style.backgroundColor = thisCard.classList;
    card1 = thisCard;
    card1color = event.target.style.backgroundColor;
    count++;
    counters[0].innerText = count;
  }

//if this is second card and they're different.
  else if(thisCard.classList != card1color && card1 && !card2){   
    thisCard.style.backgroundColor = thisCard.classList;
    card2 = thisCard;
    count++;
    counters[0].innerText = count;
    setTimeout(function(){
      card1.style.backgroundColor = 'black';
      thisCard.style.backgroundColor = 'black';
      card1 = 0;
      card2 = 0;
      }, 1000);
  }

//if this is second card and they're the same.
  else if(thisCard.classList == card1color && card1 && !card2){
    thisCard.style.backgroundColor = thisCard.classList;
    card2 = thisCard;
    count++;
    flipped = flipped + 2;
    counters[0].innerText = count;
    thisCard.removeEventListener('click', handleCardClick);
    card1.removeEventListener('click', handleCardClick)
    setTimeout(function(){
      card1 = 0;
      card2 = 0;
      }, 1000);
  }
 
//to check if the player has won the game.
  if(flipped == (COLORS.length) ) {

//if they did get the new high score.
    if(localStorage.getItem('low-score') > count){
      gameContainer.innerHTML = `<span id="congrats" >GREAT JOB! </span> <span id="yourScore"> You got the new best score of ${count} </span> <span onclick="window.location.reload()" id="reload"> NewGame</span>`;
      localStorage.setItem('low-score', count);
     }

//if they did not get the new high score.
    else{
    gameContainer.innerHTML = `<span id="congrats" >GOOD JOB! </span> <span id="yourScore"> Your score: ${count} <br> Low score: ${localStorage.getItem('low-score')} </span> <span onclick="window.location.reload()" id="reload"> New Game</span> `;}

    const congra = document.querySelector('#congrats');   
    setInterval(function(){  
      congra.style.color = randomRGB(); 
    }, 1000);
  }
}

//choosing random colors
function randomRGB(){
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b}) `;
}

//making the start button pretty.
const titled = document.querySelector('button');
setInterval(function(){
  titled.style.color = randomRGB(); 
}, 1000);