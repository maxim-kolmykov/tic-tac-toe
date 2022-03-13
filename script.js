const area = document.getElementById('area');
const cross = "<div class='cross'></div>";
const circle = "<div class='circle'></div>";
let step = 0;
let crossSteps = [];
let circleSteps = [];
const winModal = document.querySelector('.win-modal');
const showWinner = document.querySelector('.winner-wrap');
let win = 0;
let crossWinner = [];
let circleWinner = [];
let cellText = document.getElementsByClassName('cell');
let currentPlayer = document.getElementById('curPlayer');
let player = "x";
let crossWinText;
let circleWinText;
let dataWinText = [];
let restartBtn = document.querySelector('.restart-button');

const winIndex = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
];

//*****Playing field*****\\
for (let i = 0; i < 9; i++) {
    area.innerHTML += `<div class='cell' data-cell=${i} pos=${i}></div>`;
}

function showStep(event) {
    let stepCheck = event.target.dataset.cell;
    if (event.target.classList.contains('cell')) {
        if (event.target.textContent == '') {
            if (step % 2 == 0) {
                event.target.innerHTML = `${cross}`;
                crossSteps.push(stepCheck);
            } else {
                event.target.innerHTML = `${circle}`;
                circleSteps.push(stepCheck);
            }
        }
        step++;
        checkWinner();
    }
}

area.addEventListener('click', showStep);

function isDraw() {
    if (win == 0 && step == 9) {
        winModal.classList.add('active');
        showWinner.innerHTML += `<p class="winner">Draw!</p>`;
        checkdataWinText();
        dataWinText.push('Draw');
    }
}

function checkWinner() {
    crossWinText = `X win in ${step} moves`;
    circleWinText = `O win in ${step} moves`;
    for (let i = 0; i < winIndex.length; i++) {
        crossWinner = winIndex[i].filter(m => crossSteps.includes(m));
        if (crossWinner.length == 3) {
            winModal.classList.add('active');
            showWinner.innerHTML += `<p class="winner">${crossWinText}!</p><div class='winner-picture'><div class='cross'></div></div>`;
            win = win + 1;
            checkdataWinText();
            dataWinText.push(crossWinText);
            break;
        }
        circleWinner = winIndex[i].filter(k => circleSteps.includes(k));
        if (circleWinner.length == 3) {
            winModal.classList.add('active');
            showWinner.innerHTML += `<p class="winner">${circleWinText}!</p><div class='winner-picture'><div class='circle'></div></div>`;
            win = win + 1;
            checkdataWinText();
            dataWinText.push(circleWinText);
        }
    }
    isDraw();

}

function checkdataWinText() {
    if (dataWinText.length > 9) {
        dataWinText.shift();
    }
}


//*****Who's Turn: X*****\\
// TODO

//*****Restart*****\\
function restart(event) {
    if (event.target.classList.contains('restart-button')) {
        area.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            area.innerHTML += `<div class='cell' data-cell=${i}></div>`;
        }
        step = 0;
        win = 0;
        crossSteps = [];
        circleSteps = [];
        area.addEventListener('click', showStep);
    }
}
restartBtn.addEventListener('click', restart);

//*****Win Modal*****\\
function closewinModal(event) {
    if (event.target.classList.contains('ok-button')) {
        winModal.classList.remove('active');
        area.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            area.innerHTML += `<div class='cell' data-cell=${i}></div>`;
        }
        step = 0;
        win = 0;
        crossSteps = [];
        circleSteps = [];
        showWinner.innerHTML = '';
        area.addEventListener('click', showStep);
    }
}
winModal.addEventListener('click', closewinModal);

//*****Results*****\\
let scoresList = document.querySelector('.scores-list');
let gameScoresButton = document.querySelector('.game-scores-button');
let closeButton = document.querySelector('.close-button');
let scoresModal = document.querySelector('.scores-modal');

function showResults() {
    if (scoresList.textContent == '') {
        dataWinText.forEach(element => {
            scoresList.innerHTML += `<li>${element}</li>`;
        });
    }
    gameScoresButton.classList.add('active');
    scoresModal.classList.add('active');
    closeButton.classList.add('active');
    scoresList.classList.add('active');

}
gameScoresButton.addEventListener('click', showResults);

function closeResultsWindow() {
    scoresList.innerHTML = '';
    closeButton.classList.remove('active');
    scoresModal.classList.remove('active');
    scoresList.classList.remove('active');
    gameScoresButton.classList.remove('active');
}
closeButton.addEventListener('click', closeResultsWindow);

//*****local storage*****\\
function setLocalStorage() {
    localStorage.setItem('dataWinText', JSON.stringify(dataWinText));
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('dataWinText')) {

        dataWinText = JSON.parse(localStorage.getItem('dataWinText'));
        if (dataWinText == null) {
            dataWinText == [];
        }
        checkdataWinText(dataWinText);
    }
}
window.addEventListener('load', getLocalStorage);


/* let modal = document.querySelector(".scores-list.active");
let cButton = document.querySelector(".close-button.active");

window.onclick = function(event) {
    if (event.target != modal || event.target == cButton) {
        modal.style.display = "none";
        cButton.style.display = "none";
    }
} */



console.log(`
    Score: 70 / 70
  - [x] Вёрстка +10
      - реализован интерфейс игры +5
      - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, [логотип курса](https://rs.school/images/rs_school_js.svg) со [ссылкой на курс](https://rs.school/js-stage0/) +5
  - [x] При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10
  - [x] Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10
  - [x] По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10
  - [x] Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10
  - [x] Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
  - [x] Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
      - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
    `)