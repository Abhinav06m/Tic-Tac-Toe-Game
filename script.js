console.log("welcome to Tic Tac Toe")
const music = document.getElementById("reload-sound");
window.playReloadSound = function () {
    music.loop = true;
    music.load();

    music.play().catch(error => {
        // Handle potential error if the browser still blocks it
        console.log("Autoplay failed (this is normal for music with audio on load).", error);
    });
}
window.addEventListener("load", playReloadSound);

let audioTurn = new Audio("click-sound.mp3")
let hurray = new Audio("celebration.mp3")
let gameover = new Audio("game-over-voice.mp3")
let turn = "X"
let isgameover = false;
let draw = false; // This variable can actually be removed as we'll handle the draw check directly

//Function to change the turn

const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

// Function to check for a draw
const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let allFilled = Array.from(boxtext).every(element => element.innerText !== "");

    // A draw occurs if all boxes are filled AND a win hasn't happened
    if (allFilled && !isgameover) {
        document.querySelector('.info').innerText = "Game is a Draw! Please Reset";
        isgameover = true;
        document.querySelector('.drawbox').getElementsByTagName('img')[0].style.width = "200px";
        gameover.play();
    }
}

//Function to check the winner
const checkwin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won please Reset"
            isgameover = true
            document.querySelector('.winbox').getElementsByTagName('img')[0].style.width = "200px";
            hurray.play();
        }
    })
}

//game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        // Ensure the box is empty and the game is not over
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            audioTurn.play();

            checkwin();
            // IMPORTANT: Check for draw *after* checking for a win
            // and only if a win hasn't occurred.
            if (!isgameover) {
                checkDraw();
                // Change turn and update info ONLY if game is not over after checking win/draw
                if (!isgameover) {
                    turn = changeTurn();
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                }
            }
        }
    })
})


//add on click listener to reset
reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.winbox').getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.drawbox').getElementsByTagName('img')[0].style.width = "0px";

    if (music.muted) {
        music.muted = false;
    }
    music.play();
})
