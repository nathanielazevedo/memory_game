
//later we use this to append newDiv's to it.
const gameContainer = document.getElementById("game");
let counter = document.createElement('h3');

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

  
  counter.innerText = count;
  counter.classList.add('count');
  gameContainer.append(counter);
}

//to remember cards and total flipped.
let card1 = 0;
let card2 = 0;
let card1color = 0;
let count = 0;
let flipped = 0;
let noClicking = 0;

// clicks
function handleCardClick(event) {

  if(noClicking == 1){
    console.log('noClicking');
    return;}
  
  count++;
  counter.innerText = count;
  let thisCard = event.target;
  
//if this is the first click.
  if(card1 == 0){ 
    thisCard.style.backgroundColor = thisCard.classList;
    card1 = thisCard;
    card1color = thisCard.classList.value;
    console.log('no card 1');
    card1.removeEventListener('click', handleCardClick);
  }

//if there is a card1
  else{
    console.log('there is a card1');
    noClicking = 1;
    thisCard.style.backgroundColor = thisCard.classList;
    card2 = thisCard;


    if(card2.classList.value != card1color){
      setTimeout(function(){
          console.log('card2 does not match card1')
          card1.style.backgroundColor = 'black';
          thisCard.style.backgroundColor = 'black';
          card1.addEventListener('click', handleCardClick);
          card1 = 0;
          card2 = 0;
          noClicking = 0;
          }, 1000);
    }
  
      else{
          console.log('card2 matches card1')
          flipped += 2;
          card2.removeEventListener('click', handleCardClick);
          card1.removeEventListener('click', handleCardClick);
          setTimeout(function(){
              card1 = 0;
              card2 = 0;
              noClicking = 0;
          }, 1000);
      

        //to check if the player has won the game.
          if(flipped == (COLORS.length)){

        //if they did get the new high score.
            if(localStorage.getItem('low-score') > count){
              gameContainer.innerHTML = `<span id="congrats" >GREAT JOB! </span> <span id="yourScore"> Congrats! You got the new best score of ${count} </span> <span onclick="window.location.reload()" id="reload"> New Game</span>`;
              localStorage.setItem('low-score', count);
            }

        //if they did not get the new high score.
            else{

              if(localStorage.getItem('low-score') == null){
                gameContainer.innerHTML = `<span id="congrats" >GOOD JOB! </span> <span id="yourScore"> Your score: ${count} </span> <span onclick="window.location.reload()" id="reload"> New Game</span> `;
                localStorage.setItem('low-score', count);
              }

            else{
            gameContainer.innerHTML = `<span id="congrats" >GOOD JOB! </span> <span id="yourScore"> Your score: ${count} <br> Best score: ${localStorage.getItem('low-score')} </span> <span onclick="window.location.reload()" id="reload"> New Game</span> `;}}

            const congra = document.querySelector('#congrats');   
            setInterval(function(){  
              congra.style.color = randomRGB(); 
            }, 1000);
          }}         
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



