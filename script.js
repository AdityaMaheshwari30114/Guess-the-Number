let randomNumber = parseInt(Math.random()*100 +1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');

const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');


let prevguess = [];
let numGuesses = 1;

let playGame = true;

function validateGuess(guess){
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a number between 1 and 100');
        return false;
    } else if (prevguess.includes(guess)) {
        alert('You have already guessed that number!');
        return false;
    } else {
        prevguess.push(guess);
        if(numGuesses>10){
            displayGuess(guess)
            displayMessage(`Game Over. Random number was ${randomNumber}`)
            endGame()
        }
        else{
            displayGuess(guess);
            checkGuess(guess);

        }
    }
}
function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `
    numGuesses++;
    remaining.innerHTML =   `${11 - numGuesses}`  
}
function checkGuess(guess){
    if(guess>randomNumber){
        displayMessage(`Entered number is bigger.`);
    } else if(guess<randomNumber){
        displayMessage(`Entered number is smaller.`);
    }
    else{
        displayMessage(`You Guessed it right`);
    }

}
if(playGame){
submit.addEventListener('click', function(e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
    
});
}


function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled','');
    p.classList.add('button')
    p.innerHTML = `<h2 id = "newGame">Start new Game</h2>`;
    
    startOver.appendChild(p);
    playGame= false;
    newGame();
}
function newGame(){
    const newGameButton = document.getElementById('newGame'); // creating new game button
    newGameButton.addEventListener('click',function(e){
        //reset variable then playGame = True;

        randomNumber = parseInt(Math.random()*100 +1);
        prevguess = []
        numGuesses = 1;
        guessSlot.innerHTML = ''
        remaining.innerHTML =   `${11 - numGuesses}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)

        playGame = true


    })


}