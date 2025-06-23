
function ChangeDiv() {//פונקציה להחלפת ההרשמה וההתחברות
    let divSign = document.getElementById("SignUpTemp");
    let divLog = document.getElementById("allLogin");
    if (divSign.style.display === "none") {
        divSign.style.display = "block"; divLog.style.display = "none";
    } else {
        divSign.style.display = "none"; divLog.style.display = "block";
    }
}
//כניסה
function LogIn() {
    let userEmail = document.getElementById('userEmail').value;//שם משתמש
    let userPw = document.getElementById('userPw').value;//הסיסמא של המשתמש
    //בדיקה אם אין תאים ריקים
    if (userEmail === "" || userPw === "") {
        alert("All details must be complete");
        event.preventDefault(); // מונע שהפרטים שהושלמו עד כה ימחקו ומונע שליחת הטופס
        return;
    }
    let users = JSON.parse(localStorage.getItem('Users')) || [];
    for (let i = 0; i < users.length; i++) {//עובר על המערך
        if (users[i][3].email == userEmail && users[i][1].pw == userPw) {//בודק אם המשתמש כבר במשחק
            localStorage.setItem('currentUser', JSON.stringify(userEmail));//שם מפתח חדש וערכו המייל של המשתמש
            console.log("lets get started");
            return;
        }
    }
    alert("login not correct");//אם חלק מהפרטים שגויים{
    event.preventDefault();  // מונע שהפרטים שהושלמו עד כה ימחקו ומונע שליחת הטופס
}





//הרשמה לאתר
function SignUP() {

    let name = document.getElementById('UserName').value;//שם משתמש חדש
    let pw = document.getElementById('pw').value;//סיסמא חדשה
    let pw2 = document.getElementById('pw2').value;//אימות סיסמא חדשה
    let number = document.getElementById('tel').value;//מספר טלפון
    let email = document.getElementById('Email').value;//כתובת מייל

    if (name === "" || pw === "" || pw2 === "" || email === "" || number === "") {//אם לא מילאו את כל הפרטים
        alert("All details must be complete");
        event.preventDefault(); // מונע שהפרטים שהושלמו עד כה ימחקו ומונע שליחת הטופס
        return;
    }


    //בדיקה אם הססמאות שוות
    if (pw !== pw2) {
        alert("The passwords are not the same");
        event.preventDefault();  // מונע שהפרטים שהושלמו עד כה ימחקו ומונע שליחת הטופס
        return;
    }
    //בדיקת תקינות האימייל
    const emailNotValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!emailNotValid.test(email)) {
        alert("The email address is not valid");
        event.preventDefault(); // מונע שהפרטים שהושלמו עד כה ימחקו ומונע שליחת הטופס
        return;
    }
    // בדיקת סיסמא חזקה ובדיקה האם הסיסמה קטנה מ8 תווים
    const PswNotValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (pw.length < 8 || !PswNotValid.test(pw)) {
        alert("The password should be 8 in length and include a special character, a letter and a number");
        event.preventDefault(); // מונע שהפרטים שהושלמו עד כה ימחקו ומונע שליחת הטופס
        return;
    }

    //במערך
    let check = true;
    let users = JSON.parse(localStorage.getItem('Users')) || [];
    for (let i = 0; i < users.length; i++) {// local storage עובר על כל ה
        if (users[i][3].email == email && check == 1) {//בודק אם הכתובת כבר שמורה במערכת
            alert('This address already exists, enter another address or go to the login page.')
            check = false;
            event.preventDefault(); // מונע שהפרטים שהושלמו עד כה ימחקו ומונע שליחת הטופס
            return;
        }
    }
    if (check) {//המשתמש הכניס מייל חדש והוא נכנס כשחקן חדש
        let userData = [
            { name: name },
            { pw: pw },
            { telephone: number },
            { email: email },
        ];
        users.push(userData);//מכניס את הפרטים למערך של כל המשתמשים
        localStorage.setItem('Users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(email));
        console.log('wonderful! now you have an acoount');
        return;
    }
}



