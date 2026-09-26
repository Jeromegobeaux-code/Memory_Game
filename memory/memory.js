// games Info Variables

let matchFound = document.getElementById("matchFound")

let timer = document.getElementById("timer")

let errors = 0;

let seconds = 0;

let start;

let CarList = [

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

let Deck;
let board = []
let rows = 4
let cols = 5

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
    Deck = CarList.concat(CarList)
    console.log(Deck)

    for(let i =0; i<Deck.length; i++)
    {
        let j = Math.floor(Math.random() * Deck.length)

        let temp = Deck[i]
        Deck[i]=Deck[j]
        Deck[j]=temp

  
    }
    console.log(Deck)
}

function GameStart(){
    
  
    for(let i = 0; i<rows; i++){ 
        let row = []
        for(let j = 0; j<cols; j++){
            let cardImage = Deck.pop()
            row.push(cardImage)

            let card = document.createElement("img")
            card.id = i.toString() + '-' + j.toString()
            card.src = "/imgs/" + cardImage + ".png"
            document.getElementById("board").append(card)

        }

    }
}









