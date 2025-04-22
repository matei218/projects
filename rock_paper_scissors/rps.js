const choiceThrow = (userInput) => {
  userInput = userInput.toLowerCase();
  if (
    userInput === "rock" ||
    userInput === "paper" ||
    userInput === "scissors" ||
    userInput === "rocket"
  ) {
    return userInput;
  } else {
    console.log("Please choose one of the three*: Rock, Paper, or Scissors!");
  }
};

function getComputerChoice() {
  let generatedNumber = Math.floor(Math.random() * 3);
  switch (generatedNumber) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      return "Error in computing";
  }
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "Game Tied";
  }
  if (userChoice === "rock") {
    if (computerChoice === "paper") {
      return "Computer has won!";
    } else {
      return "User has won!";
    }
  }
  if (userChoice === "paper") {
    if (computerChoice === "scissors") {
      return "The computer won!";
    } else {
      return "You won!";
    }
  }
  if (userChoice === "scissors") {
    if (computerChoice === "rock") {
      return "The computer won!";
    } else {
      return "You won!";
    }
  }
  if (userChoice === "rocket"){
    return "Rocket blows away anything!";
  }
};

const playGame = () => {
  const userChoice = choiceThrow("rocket");
  const computerChoice = getComputerChoice();
  console.log("Human chose " + userChoice);
  console.log("Computer generated " + computerChoice);
  console.log(determineWinner(userChoice, computerChoice));
};

playGame();
