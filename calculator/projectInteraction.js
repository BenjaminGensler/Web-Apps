var num1 = 0;
var num2 = 0;
var action = "";
var displayEl = document.getElementById("displayCalc");
var actionButtons = document.getElementsByClassName("action");


function addToDisplay(number) {
    var curNum = displayEl.value;
    document.getElementById("displayCalc").value = curNum + number;
}

function actionButton(selectAction){
    if(action == "" || action != selectAction) {
        action = selectAction;
        num1 = parseInt(displayEl.value);
        displayEl.value = "";
    } 
    else{
        equalFunc();
    }
}

function clearDisplay() {
    displayEl.value = "";
    num1 = 0;
    num2 = 0;
    action = "";
}


function equalFunc() {
    var numRes;
    num2 = parseInt(displayEl.value);
    if(action == "addition") {
        numRes = num1 + num2;
    }
    else if(action == "subtraction") {
        numRes = num1 - num2;
    }
    else if(action == "multiplication") {
        numRes = num1 * num2;
    }
    else if(action == "division") {
        numRes = num1 / num2;
    }
    displayEl.value = numRes.toString();
    num1 = parseInt(displayEl.value);
    num2 = 0;
    action = "";
}

window.onload = function(){
    var pos = 0;
    var cPos = 0;
    var container = document.getElementById('container');
    var box = document.getElementById('box');
    var x = setInterval(movecon, 10);
    var t = setInterval(movebox, 10);
    

    function movecon(){
        if(pos >= 90) {
            setTimeout(function(){
                pos = 0;
            }, 2000);
        }
        else {
            pos += 0.25;
            container.style.transform = 'rotate(' + pos + 'deg)';
        }
    }

    function movebox(){
        if(pos >= 90) {
            setTimeout(function(){
                pos = 0;
            }, 2000);
        }
        else {
            pos += 0.40;
            box.style.left = pos + 'px';
            container.style.transform = 'rotate(' + pos + 'deg)';
        }
    } 
}