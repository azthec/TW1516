var started = false;
var online = false;

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
	started = true;
	online = mode;
	mode ? toggleDiv("login") : setTableSize();
}

function quitGame() {
	if(started && online) {
		started=false;
		document.getElementById("GameArea").innerHTML = "";
		toggleButton("quitGame");
		toggleButton("startButton");
		toggleDiv("GameArea");
        resetEnemyBoxes();
        resetPlayerBoxes();
        resetGameProgress();
	} else if (started && !online){
        resetGameProgress();
		started=false;
		toggleButton("quitGame");
		toggleButton("startButton");
		toggleDiv("GameArea");
		removeTable();
	} else {
		
	}
}

function quitQueue() {
	if(started && online) {
		started=false;
		online=false;
		leave();
	}
}

function resetGameProgress() {
    document.getElementById("playerscore").innerHTML = "";
    document.getElementById("disTimerPlayer").innerHTML = "";
    document.getElementById("enemy").innerHTML = "";
    document.getElementById("cpuscore").innerHTML = "";
    document.getElementById("disTimerCPU").innerHTML = "";
}