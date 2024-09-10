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
}


function convertOWPositions(){
    document.getElementById("NWX").value = Math.round(document.getElementById("OWX").value / 8);
    document.getElementById("NWZ").value = document.getElementById("OWZ").value;
    document.getElementById("NWY").value = Math.round(document.getElementById("OWY").value / 8);
}

function convertNWPositions(){
    document.getElementById("OWX").value = document.getElementById("NWX").value * 8;
    document.getElementById("OWZ").value = document.getElementById("NWZ").value;
    document.getElementById("OWY").value = document.getElementById("NWY").value * 8;
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