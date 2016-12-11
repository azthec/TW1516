//https://jsfiddle.net/pertrai1/r3su6b6n/
/**
 * Loads variables for timer execution
 *
 */
window.onload = function(){
    h1 = document.getElementById("disTimerPlayer"), seconds1 = 0, minutes1 = 0, hours1 = 0;
    var t1;
    h2 = document.getElementById("disTimerCPU"), seconds2 = 0, minutes2 = 0, hours2 = 0;
    var t2;
}


/////////////////////////////////////////////////////////////////player timer

function add1() {
    seconds1++;
    if (seconds1 >= 60) {
        seconds1 = 0;
        minutes1++;
        if (minutes1 >= 60) {
            minutes1 = 0;
            hours1++;
        }
    }
    
    h1.textContent = (hours1 ? (hours1 > 9 ? hours1 : "0" + hours1) : "00") + ":" + (minutes1 ? (minutes1 > 9 ? minutes1 : "0" + minutes1) : "00") + ":" + (seconds1 > 9 ? seconds1 : "0" + seconds1);

    timer1();
}
function timer1() {
    t1 = setTimeout(add1, 1000);
}


/* Start timer function */
function starth1() {
    timer1();
}


/* Stop timer function */
function pauseh1() {
    clearTimeout(t1);
}

/* Clear timer function */
function clearh1() {
    clearTimeout(t1);
    h1.textContent = "00:00:00";
    seconds1 = 0; minutes1 = 0; hours1 = 0;
}


/////////////////////////////////////////////////////////////////enemy timer



function add2() {
    seconds2++;
    if (seconds2 >= 60) {
        seconds2 = 0;
        minutes2++;
        if (minutes2 >= 60) {
            minutes2 = 0;
            hours2++;
        }
    }
    
    h2.textContent = (hours2 ? (hours2 > 9 ? hours2 : "0" + hours2) : "00") + ":" + (minutes2 ? (minutes2 > 9 ? minutes2 : "0" + minutes2) : "00") + ":" + (seconds2 > 9 ? seconds2 : "0" + seconds2);

    timer2();
}
function timer2() {
    t2 = setTimeout(add2, 1000);
}


/* Start timer function */
function starth2() {
    timer2();
}


/* Stop timer function */
function pauseh2() {
    clearTimeout(t2);
}

/* Clear timer function */
function clearh2() {
    clearTimeout(t2);
    h2.textContent = "00:00:00";
    seconds2 = 0; minutes2 = 0; hours2 = 0;
}