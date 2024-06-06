// variables
let inputdirection = {
    x: 0,
    y: 0
}

let snakearray = [
    {
        x: 13,
        y: 15
    }
]

let food = {
    x: 6,
    y: 8
}

const gameover = document.getElementById('gameover');
const foodsound = new Audio('cartoon-bite-39234.mp3');
const gameoversound = new Audio('game-over-classic-206486.mp3');
const movesound = new Audio('short-beep-tone-47916.mp3');
const music = new Audio('8-bit-loop-189494.mp3');
let lastpainttime = 0;
let speed = 5;
let score = 0;
let a = 1;
let b = 18;



// game functions
function main(currenttime) {
    window.requestAnimationFrame(main);
    if ((currenttime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }

    lastpainttime = currenttime;

    gameEngine();
}

function isCollide(snake) {
    for (let index = 1; index < snakearray.length; index++) {
        if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
            return true;
        }
    }

    if (snake[0].x >= 19 || snake[0].x <= 0 || snake[0].y >= 19 || snake[0].y <= 0) {
        return true;
    }

}



function gameEngine() {
    //updating  food
    if (isCollide(snakearray)) {
        gameoversound.play();
        music.pause();
        inputdirection = {
            x: 0,
            y: 0
        }

        gameover.innerHTML = "Game over";
        snakearray = [
            {
                x: 13,
                y: 15
            }
        ]
        score = 0;
        

    }



    // food eating 
    if (snakearray[0].y === food.y && snakearray[0].x === food.x) {
        foodsound.play();
        score += 8;
        if (score > highscorestring) {
            highscorestring = score;
            localStorage.setItem('high-score', JSON.stringify(highscorestring));
            highscoreBox.innerHTML = "High score: " + highscorestring;
        }
        scoreBox.innerHTML = "Score:" + score;
        snakearray.unshift({
            x: snakearray[0].x + inputdirection.x,
            y: snakearray[0].y + inputdirection.y
        });

        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
    }


    // movement of snake 

    for (let i = snakearray.length - 2; i >= 0; i--) {
        snakearray[i + 1] = { ...snakearray[i] }
    }

    snakearray[0].x += inputdirection.x;
    snakearray[0].y += inputdirection.y;



    //snake  display
    board.innerHTML = "";
    snakearray.forEach((element, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add("head");

        }
        else {
            snakeElement.classList.add("snake");

        }
        board.appendChild(snakeElement);
    });

    //food display
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}


// high score
let highscore = localStorage.getItem('High score');
if (highscore === null) {
    highscorestring = 0;
    localStorage.setItem('high-score', JSON.stringify(highscorestring));
}

else {
    highscorestring = JSON.parse(highscore);
    highscoreBox.innerHTML = "High score: " + highscorestring;
}


// main logic
music.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown', (event) => {
    music.play();
    gameover.innerHTML = "";
    inputdirection = {
        x: 0,
        y: 1
    }
    movesound.play();

    switch (event.key) {
        case "ArrowUp":
            inputdirection.x = 0;
            inputdirection.y = -1;
            break;

        case "ArrowDown":
            inputdirection.x = 0;
            inputdirection.y = 1;
            break;

        case "ArrowLeft":
            inputdirection.x = -1;
            inputdirection.y = 0;
            break;

        case "ArrowRight":
            inputdirection.x = 1;
            inputdirection.y = 0;
            break;

        default:
            break;
    }
});