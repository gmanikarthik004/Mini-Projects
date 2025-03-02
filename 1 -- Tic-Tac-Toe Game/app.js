// Access the required elements from DOM
let btns = document.querySelectorAll(".btn");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Choose whose turn based on user input
let turnOfX = false;
let userInput = prompt("Welcome to my game.🙏\nWhat would you like to choose? X or O?😊").toUpperCase();

// Validate the input & set the starting turn
if(userInput === "X") {
    turnOfX = true;
}
else if(userInput === "O") {
    turnOfX = false;
}
else {
    alert("Invalid choice! So defaulting to X");
    turnOfX = true;
}

// Winning Patterns
const winningPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
];

// Track moves to check if it's draw
let count = 0;

// Process the buttons
btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if(btn.innerText !== "") return; // Prevent clicking if already filled

        if(turnOfX) {
            btn.innerText = "X";
            btn.style.color = "red";
            turnOfX = false;
        }
        else {
            btn.innerText = "O";
            btn.style.color = "blue";
            turnOfX = true;
        }
        
        btn.disabled = true; // Disable the button after clicking
        count++;

        // Check for a winner
        let isWinner = checkWinner();

        // Check for a draw
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
});

// Check for the winner by traversing over every win pattern
const checkWinner = () => {
    for(let pattern of winningPatterns) {

        let pos1Val = btns[pattern[0]].innerText;
        let pos2Val = btns[pattern[1]].innerText;
        let pos3Val = btns[pattern[2]].innerText;

        // Check they are not empty
        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

// Show the winner
const showWinner = (winner) => {
    msg.innerText = (winner === userInput)? "Hurray! 🎉 You won! 😊" : "Oops! 😞 You lost! Better luck next time...👍";

    msgContainer.classList.remove("hide");
    disableBtns();
};

// Handle draw scenario
const gameDraw = () => {
    msg.innerText = "It's a draw! 😂";
    msgContainer.classList.remove("hide");
    disableBtns();
};

// Enable buttons for new game
const enableBtns = () => {
    btns.forEach((btn) => {
        btn.disabled = false;
        btn.innerText = "";
    });
};

// Reset game function
const resetGameFn = () => {
    count = 0;
    enableBtns();
    msgContainer.classList.add("hide");

    // Ask the user to choose again
    userInput = prompt("Now what would you like to choose? X or O?").toUpperCase();
    if (userInput === "X") {
        turnOfX = true;
    } 
    else if (userInput === "O") {
        turnOfX = false;
    } 
    else {
        alert("Invalid choice! Defaulting to X.");
        turnOfX = true;
    }
};

// Disable buttons when game is over
const disableBtns = () => {
    btns.forEach((btn) => btn.disabled = true);
};

// Attach eventListeners to reset buttons
newGameBtn.addEventListener("click", resetGameFn);
resetBtn.addEventListener("click", resetGameFn);