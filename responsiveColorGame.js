let numberOfSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDOM = document.getElementById("colorDOM");
let messageDOM = document.getElementById("message");
let h1DOM = document.querySelector("h1");
let resetButton = document.querySelector("#resetButton");
let modeButtons = document.querySelectorAll(".modeButton");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            modeButtons[3].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numberOfSquares = 3;
            } else if (this.textContent === "Normal") {
                numberOfSquares = 6;
            } else if (this.textContent === "Hard") {
                numberOfSquares = 9;
            } else {
                numberOfSquares = 16;

            }
            reset();
        })
    }
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        // add click listeners to squares
        squares[i].addEventListener("click", function() {
            // grab color of clicked square
            let clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if (clickedColor === pickedColor) {
                // correct
                messageDOM.textContent = "Correct!";
                changeColors(clickedColor);
                h1DOM.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                // incorrect
                this.style.backgroundColor = "#232323";
                messageDOM.textContent = "Try Again!";
            }
        });
    }
}

function reset() {
    // generate new colors
    colors = generateRandomColors(numberOfSquares);
    // pick random color from array
    pickedColor = pickColor();
    // change colorDOM to match picked color
    colorDOM.textContent = pickedColor;
    // change size and colors of squares
    for (let i = 0; i < squares.length; i++) {
        if (colors.length === 16) {
            squares[i].classList.add("dumbSize");
        } else {
            squares[i].classList.remove("dumbSize");
        }
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    // reset message
    messageDOM.textContent = "";
    // reset h1 background
    h1DOM.style.backgroundColor = "steelblue";
    // reset button text
    resetButton.textContent = "New Colors";
}

resetButton.addEventListener("click", function() {
    reset();
});

function changeColors(color) {
    // loop through all squares
    for ( let i = 0; i < squares.length; i++) {
        // change each color to match given color
        squares[i].style. backgroundColor = color;
    }
}

function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(number) {
    // make an array
    let array = [];
    // add number of colors to array
    for (let i = 0; i < number; i++) {
        // get random color and push to array
        array.push(randomColor());
    }
    // return the array
    return array;
}

function randomColor() {
    // pick a red from 0 to 255
    let red = Math.floor(Math.random() * 256);
    // pick a green from 0 to 255
    let green = Math.floor(Math.random() * 256);
    // pick a blue from 0 to 255
    let blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}