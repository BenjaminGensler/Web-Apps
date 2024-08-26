//JavaScript
let clicks = 0;
let userName;
let email;

//function to display an alert when the button is clicked
function buttonClicked(){
    clicks += 1;
    if(clicks < 2){
        alert("You clicked the button!");
    }
    else if(clicks < 3){
        alert("Alright, quit it!");
    }
    else if(clicks < 4){
        alert("I'm serious, stop!");
    }
    else if(clicks == 5){
        alert("You're going to break it if you press it again!");
    }
}

//function to insert data to a table
function insertdata(userName, email, type) {
    // Create a new table row
    var $tr = $("<tr></tr>");

    // Add three table data elements to the row
    $tr.append($("<td></td>").text(userName));
    $tr.append($("<td></td>").text(email));
    $tr.append($("<td></td>").text(type));

    // Add the new row to the specific table
    $("#myTable").append($tr);
}


//function to display what information is currently in the name and email inputs
function submitForm(){
    userName = document.getElementById("name").value;
    email = document.getElementById("email").value;
    type = document.getElementById("type").value;
    let proceedQuery = confirm("Is this information correct?\nName: " + userName + " \nEmail: " + email);
    if(proceedQuery){
        insertdata(userName, email, type);
        alert("Thank you for submitting the form!");
    }
    else{
        alert("Please correct the information and submit again.");
    }
}

function checkAgree(){
    let agree = document.getElementById("agree").checked;
    if(agree){
        alert("Thank you for agreeing to the terms and conditions!");
    }
}


// JQuery
$(document).ready(function(){
    $("img.specific").hide().fadeIn(500);
});