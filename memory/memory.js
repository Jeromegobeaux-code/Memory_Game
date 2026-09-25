// games Info Variables

let matchFound = document.getElementById("matchFound")

let timer = document.getElementById("timer")

let errors = 0;

let seconds = 0;

let start;

let deck = [

"black",
"blue",
"brown",
"green",
"grey",
"pink",
"purple",
"red",
"white",
"yellow"

]

let cardSet;
let board = []

// buttons

const reset = document.getElementById('reset')

reset.addEventListener("click",()=>
    {
      seconds = -1;
    })

const pause = document.getElementById("pause")

pause.addEventListener("click",()=>
    {
       clearInterval(start)
       
    })

// Game Initialisation

window.onload = function(){

    start = setInterval(() => {
    seconds++
    timer.innerText = seconds
}, 1000);

    Shuffle();

    GameStart();

}

// Gameplay

function Shuffle(){
    cardSet = deck.concat(deck)
    console.log(cardSet)

    for(let i =0; i<cardSet.length; i++)
    {
        let j = Math.floor(Math.random() * cardSet.length)

        let temp = deck[i]
        deck[i]=deck[j]
        deck[j]=temp


    }
}











