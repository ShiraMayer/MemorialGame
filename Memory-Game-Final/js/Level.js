document.addEventListener("DOMContentLoaded", () => {

    let hard = document.getElementById('3level');
    let medium = document.getElementById('2level');
    let easy = document.getElementById('1level');
    hard.addEventListener('click', hardLevel);
    medium.addEventListener('click', mediumLevel);
    easy.addEventListener('click', easyLevel);
});
//שומרים את הרמה שהמשתמש בחר בלוקל
function hardLevel() {
    localStorage.setItem('currentLevel', "hard");
}

function mediumLevel() {
    localStorage.setItem('currentLevel', "medium");
}

function easyLevel() {
    localStorage.setItem('currentLevel', "easy");
}