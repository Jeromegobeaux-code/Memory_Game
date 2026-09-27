// games Info Variables

let matchFound = document.getElementById("matchFound")

let timer = document.getElementById("timer")

let errors = 0;

let seconds = 0;

let matches = 0;

let showMatches = document.getElementById("matchFound")

let ErrorsMade = document.getElementById("ErrorsMade")

let victorySound = new Audio("victory sound.mp3")

let timerOnHold = false;

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

let cardSelected = null;
let cardSelected2 = null;
// buttons

const reset = document.getElementById('reset')

reset.addEventListener("click",()=>
    {

        while(document.getElementById("board").firstChild){
    document.getElementById("board").removeChild(document.getElementById("board").firstChild)
    }
        Deck = null;
        board = []
        matches = 0;
        cardSelected = null;
        cardSelected2 = null;
        ErrorsMade.innerText = 0
        showMatches.innerText = 0 + "/10"
        matches = 0;
        errors = 0;
      timer.innerText = 0  
      seconds = 0;
      clearInterval(start)
      
      gameInit()
      
    })

const pause = document.getElementById("pause")

pause.addEventListener("click",()=>
    {
       if (!timerOnHold){
        clearInterval(start)
        timerOnHold = true;
       }
       else{
        start = setInterval(() => {
                seconds++
                timer.innerText = seconds
            }, 1000);  
            timerOnHold = false;   
        }
}
)


    // Game Initialisation

window.onload = gameInit()

function gameInit(){

    start = setInterval(() => {
    seconds++
    timer.innerText = seconds
}, 1000);

    errors = 0;

    Shuffle();

    GameStart();
}
// Gameplay

function Shuffle(){
    Deck = CarList.concat(CarList)

    for(let i =0; i<Deck.length; i++)
    {
        let j = Math.floor(Math.random() * Deck.length)

        let temp = Deck[i]
        Deck[i]=Deck[j]
        Deck[j]=temp
    }
  
}

function GameStart(){

  
    for(let i = 0; i<rows; i++){ 
        let row = []
        for(let j = 0; j<cols; j++){
            let cardImage = Deck.pop()
            row.push(cardImage)

            let card = document.createElement("img")
            card.id = i.toString() + '-' + j.toString()
            card.addEventListener("click", select)
            card.src = "/imgs/" + cardImage + ".png"
            document.getElementById("board").append(card)

        }
        board.push(row)
    }
    setTimeout(() => {
        for(let i = 0; i<rows; i++){
            for(let j = 0; j<cols; j++){
                let card = document.getElementById(i.toString() + '-' + j.toString())
                card.src = "/imgs/hidden.png"
            }    
        }
    },1000)
}

function select(){
    
    if (this.src.includes("hidden.png")){
        if (!cardSelected) {
            cardSelected = this;

            let coords = cardSelected.id.split('-')
            let r = parseInt(coords[0])
            let c = parseInt(coords[1])

            cardSelected.src = "/imgs/" + board[r][c] + ".png"
        } 
        else if (!cardSelected2 && this != cardSelected) {
            cardSelected2 = this;

            let coords = cardSelected2.id.split('-')
            let r = parseInt(coords[0])
            let c = parseInt(coords[1])

            cardSelected2.src = "/imgs/" + board[r][c] + ".png"
            setTimeout(checkMatch, 1000)
        }
    }

}

function checkMatch(){
    if (cardSelected.src != cardSelected2.src){
        cardSelected.src = "/imgs/hidden.png"
        cardSelected2.src = "/imgs/hidden.png"
        errors++
        ErrorsMade.innerText = errors
        cardSelected = null
        cardSelected2 = null
    }
    else{
        matches++
        showMatches.innerText = matches + "/10"
        cardSelected.removeEventListener("click", select)
        cardSelected2.removeEventListener("click", select)
        cardSelected = null
        cardSelected2 = null
        checkVictory()
  
    }
}


function checkVictory(){      
    if (matches == 10){
        clearInterval(start)
        victorySound.play()
        alert("You won the game in " + seconds + " seconds with " + errors + " errors!")
    }   
}