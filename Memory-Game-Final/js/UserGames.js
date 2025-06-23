let current;
document.addEventListener("DOMContentLoaded", () => {
    currentUser = JSON.parse(localStorage.getItem("currentUser"))//המייל של המשתמש הנוכחי
    games();
});
function games() {
    //בדיקה האם למשתמש העכשוי יש משחקים בהיסטורית המשחקים
    let gameExist = false;
    let allGames = JSON.parse(localStorage.getItem("allGames"));
    for (let i = 0; i < allGames.length; i++) {
    //הלולאה עוברת על כל המיילים שנמצאים במערך המשחקים ומחפשת את המיל של המשתמש
        if (allGames[i][0].email === currentUser) {
            gameExist = true;
        }
    }
    if (!gameExist) {
        document.getElementById("noGames").textContent = "You have no games";
        return; 
    }
    //מערך משחקי המשתמש
    let games1 = [];//שלב ראשון
    let games2 = [];//שלב שני
    let games3 = [];//שלב שלישי
    let container = document.getElementById('container');
    // בניית טבלת משחקים
    container.insertAdjacentHTML('afterbegin', `<table id="table"></table>`);
    let table = document.getElementById('table');
    table.insertAdjacentHTML('afterbegin', `<tr id="headerRow"></tr>`);
    let headerRow = document.getElementById('headerRow');
    //כותרת
    headerRow.insertAdjacentHTML('beforeend', `<th>Level</th>`);
    headerRow.insertAdjacentHTML('beforeend', `<th>time(seconds)</th>`);
    for (let i = 0; i < allGames.length; i++) {
        if (allGames[i][0].email === currentUser) { 
            //בונים את השורות שמכילות את פרטי המשחק
            table.insertAdjacentHTML('beforeend',
                `<tr> 
     <td data-label = 'Level'>` + allGames[i][1].level + `</td>
     <td data-label = 'Time'>` + allGames[i][2].time + `</td>
        </tr>`);
        //מכניסים כל זמן למערך של הרמה המתאימה
            if (allGames[i][1].level === "easy") {
                games1.push(allGames[i][2].time);
            }
            if (allGames[i][1].level === "medium") {
                games2.push(allGames[i][2].time);
            }
            if (allGames[i][1].level === "hard") {
                games3.push(allGames[i][2].time);
            }
        }
        //חישוב הזמן הקצר ביותר לכל רמה
        let min1 = games1[0] || [];
        let min2 = games2[0] || [];
        let min3 = games3[0] || [];
        for (let i = 1; i < games1.length; i++) {
            if (games1[i] < min1) {
                min1 = games1[i];
            }
        }
        for (let i = 1; i < games2.length; i++) {
            if (games2[i] < min2) {
                min2 = games2[i];
            }
        } for (let i = 1; i < games3.length; i++) {
            if (games3[i] < min3) {
                min3 = games3[i];
            }
        }
        //הדפסת השיאים בדף
        let currentRecord1 = document.getElementById("level1Record");
        let currentRecord2 = document.getElementById("level2Record");
        let currentRecord3 = document.getElementById("level3Record");
        currentRecord1.textContent = "Record of level 1: " + min1;
        currentRecord2.textContent = "Record of level 2: " + min2;
        currentRecord3.textContent = "Record of level 3: " + min3;
        let records = document.getElementById("records");
        records.style.display = "block";
    }
}



















/*//console.log(score[0].games[0].level)

for (let i = 0; i < 3; i++) {
    for (let j = 0; i < score[i].games.length; j++) {

    }

    let min1 = score[0].games[0].time;
    let min2 = score[1].games[0].time;
    let min3 = score[2].games[0].time;
    for (let i = 1; i < score[0].games.length; i++) {
        if (score[0].games[i].time < min1) {
            min1 = score[0].games[i].time;
        }
    }
    for (let i = 1; i < score[1].games.length; i++) {
        if (score[1].games[i].time < min2) {
            min2 = score[1].games[i].time;
        }
    }
    for (let i = 1; i < score[2].games.length; i++) {
        if (score[2].games[i].time < min3) {
            min3 = score[2].games[i].time;
        }
    }
    level1Record = document.getElementById('level1Record');
    level2Record = document.getElementById('level2Record');
    level3Record = document.getElementById('level3Record');
    level1Record.textContent = 1;
    level2Record.textContent = min2;
    level3Record.textContent = min3;


}
*/
