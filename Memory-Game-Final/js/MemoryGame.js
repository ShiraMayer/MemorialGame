function clickInstruction() {//פונקציה בשביל ההוראות
    let instruction = document.getElementById("instruction");
    if (instruction.style.display === "block") {//כשלוחצים כל הכפתור ההוראות נגלות וכן להפך
        instruction.style.display = "none";
    } else {
        instruction.style.display = "block";
    }
}

let numClicks = 0;
let openCard;
let numOfpairOfCards = 0;
let seconds = 0;
let timerInterval;
let newgame;
//בשביל האנימציה של המבחנה
let part1 = document.getElementById("part1");
let part2 = document.getElementById("part2");
let part3 = document.getElementById("part3");
let part4 = document.getElementById("part4");
let unitCounter = document.getElementById("unitCounter");

document.addEventListener("DOMContentLoaded", () => {
    //אם אין משתמש נוכחי אז הוא לא יוכל לשחק
    if (localStorage.key(1) != "currentUser") {
        document.getElementById("didntLog").innerHTML = "In order to play, you have to log in"
        return;
    }
    newgame = document.getElementById('newGame');
    newgame.addEventListener('click', newGame);
    newGame();
});
//כשנכנסים לעמוד המשחק מתחיל
function newGame() {
    newgame.removeEventListener('click', newGame);//אי אפשר להתחיל משחק מחדש ברגע שהתחיל
    document.getElementById("cards").innerHTML = "";//איפוס כל האלמנטים שהיו בדיב 
    //בהתחלה המבחנה ריקה
    part1.style.display = "none";
    part2.style.display = "none";
    part3.style.display = "none";
    part4.style.display = "none";
    unitCounter.style.boxShadow = "none";

    //הדפסת הרמה שבחרת
    let level = localStorage.getItem('currentLevel');
    if (level === "hard") {
        currentLevel.textContent = " " + 3;
    }
    if (level === "medium") {
        currentLevel.textContent = " " + 2;
    }
    if (level === "easy") {
        currentLevel.textContent = " " + 1;
    }
    let arrFinalPicGroup = randomImages();//שליחה לפונקציה
    createElements(arrFinalPicGroup);//שליחת המערך  לפונקציה
    numOfpairOfCards = 0//איפוס מספר הזוגות שנמצאו
    numClicks = 0;//איפוס מספר הלחיצות
    timer();//שליחה לפונקציה של הטיימר

}
let numPairs;
function randomImages() {//פונקציה שמחזירה מערך של התמונות שישתתפו במשחק
    let arrFinalPicGroup = [];
    let arrCount = [];//התפקיד שלו זה לספור כמה פעמים הוכנסה התמונה למערך הסופי
    let arrImg = [];

    let level = localStorage.getItem('currentLevel');//מספר התמונות שיהיו ,תלוי ברמה שבחר המשתמש
    if (level === "hard") {
        numPairs = 14;
    }
    if (level == "medium") {
        numPairs = 10;
    }
    if (level == "easy") {
        numPairs = 6;
    }
    for (let i = 0; i < numPairs; i++) {//איפוס מערך המונה
        arrCount[i] = 0;
    }
    for (let i = 0; i < numPairs; i++) {//שמים תמונות כמספר הזוגות שנבחרו
        arrImg[i] = `../pictures/game/Disney${i}.jpg`;
    }
    for (let i = 0; i < 2 * numPairs; i++) {
        let randomNum;
        do {
            randomNum = Math.floor(Math.random() * numPairs);//שם במשתנה ערך רנדומלי בין 0 למספר הזוגות פחות 1
        } while (arrCount[randomNum] === 2);
        arrFinalPicGroup[i] = arrImg[randomNum];
        arrCount[randomNum]++;
    }
    console.log("we have are pictures");
    return arrFinalPicGroup;
}

function createElements(arrFinalPicGroup) {
    document.getElementById("cards").innerHTML = "";//ריקון כל האלמנטים שהיו בדיב 
    for (let i = 0; i < arrFinalPicGroup.length; i++) {
        //יצירת אלמנטים ב html
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "crdBtn");
        cardDiv.addEventListener("click", flip);//אם לוחצים על אחד הכרטיסים שנוצרו תזומן הפונקציה
        let imgFront = document.createElement("img");
        imgFront.setAttribute("class", "front");
        imgFront.setAttribute("src", arrFinalPicGroup[i]);
        let imgBack = document.createElement("img");
        imgBack.setAttribute("class", "back");
        imgBack.setAttribute("src", "../pictures/game/backgroundcard.png");//תמונת גב הכרטיס
        //הכנסת האלמנטים לפי הסדר המתאים
        cardDiv.appendChild(imgFront);
        cardDiv.appendChild(imgBack);
        //שמים את האלמנט הסופי בתוך ...
        document.getElementById("cards").appendChild(cardDiv);
        console.log("we have are dives ready");
    }
}

function flip(event) {//פונקציה שהופכת את זוג קלפים ובודקת אם תואמים
    let chosenCard = event.currentTarget;
    if (numClicks < 2) {
        chosenCard.style.transform = "rotateY(180deg)";
        var audio_Carddrop = new Audio('../audio/carddrop.mp3')
        audio_Carddrop.play();
        numClicks++
        if (numClicks === 1) {
            openCard = chosenCard;
            openCard.removeEventListener("click", flip);//אם נלחץ הקלף הראשון שוב הוא לא יתהפך
            return;
        }
        if (openCard.children[0].src === chosenCard.children[0].src) {//נמצאה התאמה
            numClicks = 0;
            //אם הקלפים ילחצו הם לא יתהפכו שוב
            openCard.removeEventListener("click", flip);
            chosenCard.removeEventListener("click", flip);
            numOfpairOfCards++;
            setTimeout(() => {
                var audio_Correct = new Audio('../audio/correct.mp3')
                audio_Correct.play();
                chosenCard.style.visibility = "hidden";
                openCard.style.visibility = "hidden";
            }, 400)
            //אנימציה של המבחנה
            setTimeout(() => {
                if (numOfpairOfCards === Math.round(0.25 * numPairs)) {
                    part1.style.display = "block";
                }
                if (numOfpairOfCards === 0.5 * numPairs) {
                    part2.style.display = "block";
                }
                if (numOfpairOfCards === Math.round(0.75 * numPairs)) {
                    part3.style.display = "block";
                }
                if (numOfpairOfCards === numPairs) {
                    part4.style.display = "block";
                    unitCounter.style.boxShadow = " 0px 0px 25px 25px  #ffffff";
                }
            }, 1200)
            return;
        }
        setTimeout(() => {
            var audio_Worng = new Audio('../audio/worng.mp3')
            audio_Worng.play();
            chosenCard.style.transform = "rotateY(0deg)";
            openCard.style.transform = "rotateY(0deg)";
            numClicks = 0;
            openCard.addEventListener("click", flip);

        }, 800)
    }
}

function timer() {//סופר שניות
    seconds = 0;
    let level = localStorage.getItem("currentLevel");
    let titleOfTimer = document.getElementById('TimerDisplay');
    let timerInterval = setInterval(function () {
        titleOfTimer.textContent = seconds + ' seconds';
        seconds++;
        if (level === "hard" && numOfpairOfCards === 14 || level === "medium" && numOfpairOfCards === 10 || level === "easy" && numOfpairOfCards === 6) {
            clearInterval(timerInterval);//אם מוצא את כל הזוגות היימר פוסק
            endGame();
        }
    }, 1000);
}

function endGame() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))//המייל של המשתמש הנוכחי
    let allGames = JSON.parse(localStorage.getItem('allGames')) || [];//יצירת מפתח בלוקל של כל המשחקים
    localStorage.setItem('allGames', "");
    let isLevel = localStorage.getItem('currentLevel');
    const score = [
        { email: currentUser },
        { level: isLevel },
        { time: seconds - 1 }
    ]
    allGames.push(score);//השמחק נכנס ל
    localStorage.setItem('allGames', JSON.stringify(allGames));
    newgame.addEventListener('click', newGame);//ניתן ללחוץ על הלחצן של משחק חדש
}



















