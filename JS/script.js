//create table 
let random = [];
let score = 0;
let hg = 0;
let playerGuess = 0;
let highestScore = document.getElementById("hgs");
let display = document.getElementById("resultDisplay");
let restart = document.getElementById("restartButton").addEventListener("click", reStart);;
let reset = document.getElementById("resetButton").addEventListener("click", resetGame);
let soundbtn = document.getElementById("music").addEventListener("click", bgMusic);
let going = new Audio("Adventure.mp3");

if (localStorage.getItem("Score") !== null) {
    hg = localStorage.getItem("Score");
    highestScore.textContent = "Highest Score: " + hg;
} else {
    localStorage.setItem("Score", 0);
}
function reStart() {
    window.location.reload();
}
function bgMusic(event) {
    if (event.target.textContent == "Play Music") {
        event.target.textContent = "Mute";
        going.play();
    }
    else {
        event.target.textContent = "Play Music";
        going.pause();
    }
}
function createTable() {
    let Continer = document.createElement("table");
    document.body.appendChild(Continer);
    let countCell = -1;
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement("tr");
        Continer.appendChild(tr);
        for (let j = 0; j < 9; j++) {
            countCell = countCell + 1;
            let td = document.createElement("td");
            let value = "cell_ " + countCell;
            td.setAttribute("id", value);
            td.addEventListener("click", checker);
            tr.appendChild(td);
        }
    }
}

createTable();
for (let i = 0; i < 10; i++) {
    let val = parseInt(Math.random() * 81);
    while (random.includes(val)) {
        val = parseInt(Math.random() * 81);
    }
    random[i] = val;
}
function checker(e) {
    playerGuess = playerGuess + 1;
    if (playerGuess == 71) {
        alert("All the Non-Bomb cells are Selected..");
        let head = document.querySelector(".head");
        head.textContent = "You Win :)"
        toggleModal();
    }
    let id = e.target.id;
    let el = document.getElementById(id);
    el.style.backgroundColor += "green";
    el.removeEventListener("click", checker);
    let numberPattern = /\d+/g;
    let idvalue = parseInt(id.match(numberPattern).join());
    if (random.includes(idvalue)) {
        going.pause();
        handleGameOver();
        removeClickAll();
        for (let b = 0; b < 10; b++) {
            let idr = random[b];
            let searchId = "cell_ " + idr;
            let cell = document.getElementById(searchId);
            if (idr == idvalue) {
                cell.style["background"] = 'url("https://img.icons8.com/emoji/48/000000/bomb-emoji.png")';
                cell.style.backgroundColor = "red";
            }
            else {
                cell.style.backgroundColor = "red";
            }
        }
        if (soundbtn.textContent === "Mute") {
            going.pause();
        }
    }
    else {
        let updateScore = document.getElementById("gameScore");
        score = score + 1;
        hg = Math.max(hg, score);
        highestScore.textContent = "Highest Score: " + hg;
        updateScore.textContent = "Score:" + score;
        localStorage.setItem("Score", hg);
    }
}



function removeClickAll() {
    let td = document.querySelectorAll("td");
    for (let i = 0; i < td.length; i++) {
        td[i].removeEventListener("click", checker);
    }
}
function createButton() {
    let btn = document.createElement("button");
    btn.textContent = "Play Again";
    btn.id = "start";
    btn.addEventListener("click", reStart);
    return btn;
}

function resetGame() {
    if (localStorage.getItem("Score") !== null) {
        localStorage.removeItem("Score");
        reStart();
    }
}
//modal
let lay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");
let scr = document.querySelector(".score span");
let best = document.querySelector(".best-score span");
let close = document.querySelector(".close-modal").addEventListener("click", toggleModal);
let replay = document.querySelector(".replay").addEventListener("click", reStart);
let quit = document.querySelector(".quit").addEventListener("click", () => window.close());

function handleGameOver() {
    toggleModal();
}
function toggleModal() {
    modal.classList.toggle("modal-hidden");
    lay.classList.toggle("overlay-hidden");
    if (!modal.classList.contains("modal-hidden")) {
        scr.textContent = score;
        best.textContent = hg;
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    }
}

