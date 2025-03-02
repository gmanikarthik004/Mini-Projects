// Track User & Computer Scores
let userScore = 0, computerScore = 0;

// Access the elements from DOM
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const computerScorePara = document.querySelector("#computer-score");

// Process the choices
choices.forEach((choice) => {
    const userChoice = choice.getAttribute("id");
    choice.addEventListener("click", () => {
        playGame(userChoice);
    })
});

// Game Logic Fn.
const playGame = (userChoice) => {
    // Generate computer's choice
    const compChoice = getCompChoice();

    // Start comparing userChoice & compChoice
    if(userChoice === compChoice) {
        gameDraw();
    }
    else {
        let userWin = true;

        if(userChoice === "rock") {
            // compChoice = paper/scissors
            userWin = compChoice === "paper"? false : true;
        }
        else if(userChoice === "paper") {
            // compChoice = rock/scissors
            userWin = compChoice === "scissors"? false : true;
        }
        else {
            // compChoice = rock/paper
            userWin = compChoice === "rock"? false : true;
        }

        // Display the winner
        showWinner(userWin, userChoice, compChoice);
    }
};

// Generate computer choice Fn.
const getCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// Draw Fn.
const gameDraw = () => {
    userScore++, computerScore++;
    userScorePara.innerText = userScore;
    computerScorePara.innerText = computerScore;
    msg.innerText = "It was an draw😜. Please play again!";
    msg.style.backgroundColor = "violet";
    msg.style.color = "black";
};

// ShowWinner Fn.
const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Won🥳🎉, your ${userChoice} beats ${compChoice}!`;
        msg.style.backgroundColor = "green";
        msg.style.color = "white";
    }
    else {
        computerScore++;
        computerScorePara.innerText = computerScore;
        msg.innerText = `You Lost☹️☹️, ${compChoice} beats your ${userChoice}!`;
        msg.style.backgroundColor = "red";
        msg.style.color = "white";
    }
}