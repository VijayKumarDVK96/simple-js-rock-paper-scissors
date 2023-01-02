'use strict';

let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_div = document.querySelector('.result');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissor_div = document.getElementById('scissor');
let userName = 'User';
let user_field = document.getElementById('username');
const user_label = document.getElementById('user-label');

/*
01 - Get user name and save
*/

$('#myModal').modal({backdrop: 'static', keyboard: false});

document.getElementById('saveUsername').addEventListener('click', function() {
    if(user_field == '') {
        document.getElementById('user-error').innerText = 'Enter User Name';
    } else {
        userName = user_field.value;
        user_label.innerText = user_field.value;
        $('#myModal').modal('hide');
    }
});

/*
02 - Reset - Reset the score to 0, Restart - Restart the game completely with name change
*/

document.getElementById("resetGame").addEventListener('click', function() {
    userScore = 0;
    computerScore = 0;
    userScore_span.innerText = userScore;
    computerScore_span.innerText = computerScore;
});

document.getElementById("restartGame").addEventListener('click', () => {window.location.reload()});

/*
03 - Choose random value from computer
*/

function chooseRandomFromComputer() {
    const choices = ['rock', 'paper', 'scissor'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

/*
04 - If user and computer scores lesser that 10, will allow to play game. Added respective conditions for win, lose, draw logic
*/

function game(userChoice) {
    if(userScore < 10 && computerScore < 10) {
        result_div.innerHTML = '';
        const computerChoice = chooseRandomFromComputer();

        result_div.innerHTML = `<p>${userName} chooses ${userChoice}, Computer chooses ${computerChoice} </p>`;

        switch (userChoice + computerChoice) {
            case 'paperrock':
            case 'rockscissor':
            case 'scissorpaper':
                userWin();
                break;
            case 'rockpaper':
            case 'scissorrock':
            case 'paperscissor':
                computerWin();
                break;
            case 'rockrock':
            case 'scissorscissor':
            case 'paperpaper':
                draw();
                break;
        }
    }
}

/*
05 - If user wins, will increment the score by 1 and append it in screen
*/

function userWin() {
    userScore++;
    userScore_span.innerText = userScore;

    if(userScore == 10) {
        result_div.insertAdjacentHTML('beforeend', `<h3 class="success-message message">${userName} wins</h3>`);
    }
}

/*
06 - If computer wins, will increment the score by 1 and append it in screen
*/

function computerWin() {
    computerScore++;
    computerScore_span.innerText = computerScore;

    if(computerScore == 10) {
        result_div.insertAdjacentHTML('beforeend', `<h3 class="error-message message">Computer wins</h3>`);
    }
}

/*
07 - If user and computer are same, no score assigned for both and considered as draw
*/

function draw() {
    result_div.insertAdjacentHTML('beforeend', `<h3 class="message">No points, try again</h3>`);
}

/*
08 - Trigger the rock, paper, scissor by clicking it and call the game function with parameter passing
*/

rock_div.addEventListener('click', () => game('rock'));
paper_div.addEventListener('click', () => game('paper'));
scissor_div.addEventListener('click', () => game('scissor'));