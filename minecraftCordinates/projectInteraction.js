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