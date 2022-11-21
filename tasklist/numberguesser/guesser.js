/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain number of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI element
const game = document.querySelector("#game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessBtn = document.querySelector("#guess-btn"),
    message = document.querySelector(".message"),
    guessInput = document.querySelector(".guess-input");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;
//Play again
game.addEventListener("mouseup", function (e) {
    if (e.target.className === "play-again") {
        window.location.reload();
    }
})
//Listen for guess
guessBtn.addEventListener("click", function () {
    let guess = parseInt(guessInput.value);
    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }

    if (guess === winningNum) {
        //Game Over - Won
        gameOver(true, `${winningNum} is correct, You Win!`)
    } else {
        //Wrong number
        guessesLeft -= 1;
        //Game over - lost
        if (guessesLeft === 0) {
            // Game over - lost
            gameOver(false, `Game Over, You Lost! The correct number was ${winningNum}`);
            //Set message
        } else {
            //change border color
            guessInput.style.borderColor = "red";
            //Clear Input field
            guessInput.value = "";
            //Tell the number of guess left
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, "red");
        }
    }
});

function gameOver(won, msg) {
    let color;
    won === true ? color = "green" : color = "red";
    //Right guess
    guessInput.disabled = true;
    //Change border color
    guessInput.style.borderColor = color;
    //Set text color
    message.style.color = color;
    //Set message
    setMessage(msg);
    //Play again
    guessBtn.value = "PLAY AGAIN";
    guessBtn.className += "play-again"
}
//Get Winning Num
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}
