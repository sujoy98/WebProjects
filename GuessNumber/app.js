/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again event listner, using event delegation
// click event wont work because as soon as we release the click the playagain automatically gets clicked
game.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('play-again')){
        location.reload();
    }
});


// Listen for guess
guessBtn.addEventListener('click', function() {
    // returns the value as a string but for the comparison we need integer
    // console.log(guessInput.value);
    // it will return NaN if the input field is empty and subimt is pressed
    let guess = parseInt(guessInput.value);
    
    // Validation
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    // Check if WON
    if(guess === winningNum) {
        // Game Over - WON
        // // Disable Input
        // guessInput.disabled = true;
        // // Change BORDER color
        // guessInput.style.borderColor = 'green';
        // // Set Message
        // setMessage(`${winningNum} is correct! You Win.`, 'green');
        gameOver(true, `${winningNum} is correct! You Win.`);
    } else {
        // Wrong Number
        guessesLeft -= 1;

        if(guessesLeft === 0) {
        //     // Game Over - LOST
        //     // Disable Input
        //     guessInput.disabled = true;
        //     // Change BORDER color
        //     guessInput.style.borderColor = 'red';
        //     // Set Message
        //     setMessage(`Game Over, You lost. The correct number was ${winningNum}`, 'red');
            gameOver(false, `Game Over, You lost. The correct number was ${winningNum}`);
        } else {
            // Game Continues - wrong answer

            // Change BORDER color for - wrong answer
            guessInput.style.borderColor = 'red';

            // Clear Inpur
            guessInput.value = '';

            // Tell user wrong number and gusses left
            setMessage(`${guess} is not correct, Gusses left ${guessesLeft}`, 'red');
        }
    }
});

// Game Over
function gameOver(won, msg) {

    let color;
    won === true ? color = 'green' : color = 'red';
    
    // Disable Input
    guessInput.disabled = true;
    // Change BORDER color
    guessInput.style.borderColor = color;
    // set message color
    message.style.color = color;
    // Set Message
    setMessage(msg);
    
    // if(won === true) {
    //     guessInput.disabled = true;
    //     guessInput.style.borderColor = 'green';
    //     message.style.color = 'green';
    //     setMessage(msg);
    // } else {
    //     guessInput.disabled = true;
    //     guessInput.style.borderColor = 'red';
    //     message.style.color = 'red';
    //     setMessage(msg);
    // }

    // Play Again
    // after Game Over the class name and the value will change

    guessBtn.value = 'Play Again';
    
    // when there is no other class we can simply use this
    // guessBtn.className = 'play-again';

    // We need to append if there is other class
    guessBtn.className += 'play-again';
}

// Generating random winning number
function getRandomNum(min, max) {
    // returns a random number within max-10, min-1
    // Math.random(number) -> retuns random number form 0 to number-1, here Math.random()*(max-min+1) -> returns 0-9 now, Math.random()*(max-min+1)+min -> returns the random number+1 i.e 0 will be 1 and 9 will be 10
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}