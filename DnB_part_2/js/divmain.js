function toggleDiv(id) {
    var div = document.getElementById(id);
    div.style.display = div.style.display === "none" ? "block" : "none";
}

function toggleButton(id){
    var button = document.getElementById(id);
    button.style.display = button.style.display === "none" ? "block" : "none";
}

function startGame() {
	var mode = document.getElementById("onlineCheckbox").checked;
	mode ? toggleDiv("login") : setTableSize();
}
