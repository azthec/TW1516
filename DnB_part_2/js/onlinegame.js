////////////////////////////////////////////////Multiplayer///////////////////////////////////////////////////////////////////

/**
 * Global variables and respective functions
 *
 */

key = "";
level = "";
gameID="";
user="";
pass="";
activeLogin=0;
var source;
enemy = "";
playerBoxes = 0;
enemyBoxes = 0;
var enemyTurnInterval;
var playerTurnInterval;
var winInterval;


function getKey() {
    return key;
}

function setKey(value) {
    key = value;
}

function getGameID() {
    return gameID;
}

function setGameID(value) {
    gameID = value;
}

function getLevel() {
    return level;
}

function deactivateLogin() {
    activeLogin = 0;
}

function activateLogin() {
    activeLogin = 1;
}

function isActiveLogin() {
    return activateLogin;
}

function getUser() {
    return user;
}

function setUser(value) {
    user = value;
}

function getEnemy() {
    return enemy;
}

function setEnemy(value) {
    enemy = value;
}

function getPass() {
    return pass;
}

function setPass(value) {
    pass = value;
}

function getPlayerBoxes() {
    return playerBoxes;
}

function incrementPlayerBoxes() {
    return playerBoxes++;
}

function resetPlayerBoxes() {
    playerBoxes=0;
}

function incrementEnemyBoxes() {
    return enemyBoxes++;
}

function resetEnemyBoxes() {
    enemyBoxes=0;
}


/**
 * Shows player turn animations
 *
 */
function showPlayerTurn() {
    toggleDiv('PlayerCanvas');
    setTimeout(function() { 
       toggleDiv('PlayerCanvas');
   }, 1000);
}

/**
 * Shows enemy turn animations
 *
 */
function showEnemyTurn() {
    toggleDiv('EnemyCanvas');
    setTimeout(function() { 
       toggleDiv('EnemyCanvas');
   }, 1000);
}
/**

 * Shows win animation
 *
 */
function showWin() {
    toggleDiv('WinCanvas');
    setTimeout(function() { 
       toggleDiv('WinCanvas');
   }, 1000);
}

/**
 * Parses html radio buttons and checkbox into variables
 *
 */
function setLevel() {
    var diff = document.getElementById("difficulty");
    switch (diff.elements["difficulty"].value) {
            //Beginner
        case "beg": {
            level="beginner";
            break;
        }
            //Intermediate
        case "inter": {
            level="intermediate";
            break;
        }
            //Advanced
        case "adv": {
            level="advanced";
            break;
        }
            //Expert
        case "exp": {
            level="expert";
            break;		
        }	
    }	
    return getLevel();
}

function setAndCreateOnlineTable() {
    var diff = getLevel();
    switch (diff) {
            //Beginner
        case "beginner": {
            create("GameArea",2,3);
            break;
        }
            //Intermediate
        case "intermediate": {
            create("GameArea",4,5);
            break;
        }
            //Advanced
        case "advanced": {
            create("GameArea",6,8);
            break;
        }
            //Expert
        case "expert": {
            create("GameArea",9,11);
            break;		
        }	
    }	
}


/**
 * Begins the multiplayer game
 * Registers / Logins the player, if any error occurs the player is warned via popup with the server error
 * if it succeedes the player is placed into a queue with the option to leave
 * @param user and password
 */
function beginMultiplayer(username, password){
    setUser(username);
    setPass(password);
    setLevel();
    var url = "http://twserver.alunos.dcc.fc.up.pt:8000/register";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify({name:getUser(), pass:getPass()}));

    req.onreadystatechange = function() {
        if (req.readyState != 4){
            return ;
        } else if (req.status != 200 ) {
            alert("erro inesperado");
            return ;
        }else{
            var respServer = req.responseText;
            response = JSON.parse(respServer);
            if (!response.hasOwnProperty("error")){
                console.log("registado com sucesso");
                activateLogin();
                joinGame();
            }else{
                alert(response.error);

            }
        }
    };
}

/**
 * Gets game id and game authorization key, begins main game-server loop
 */
function joinGame(){
    var url = "http://twserver.alunos.dcc.fc.up.pt:8000/join";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify({name:getUser(), pass:getPass(), level:getLevel(), group:'16'}));
    req.responseType='text';
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            respServer = req.responseText;
            response=JSON.parse(respServer);
            if(response.hasOwnProperty("error")) {
                alert(response.error);
                console.log(response);
            } else {
                setGameID(response.game);
                setKey(response.key);
                console.log(response);
                toggleButton("quitQueue");
                update();
            }
        }
    }
}

/**
 * main Method to receive game data from the server
 * after the game connection is launched it updates the visualization with the server notifications
 * 
 */
function update() {
    playerTurnInterval = drawYourTurn();
    enemyTurnInterval = drawEnemyTurn();
    winInterval = drawWin();
    url='http://twserver.alunos.dcc.fc.up.pt:8000/update?name='+getUser()+'&game='+getGameID()+'&key='+getKey();
    console.log(url);
    source = new EventSource(url); // URL do script
    source.onmessage = function (event) {
        var response = JSON.parse(event.data);
        console.log(response);
        if (response.hasOwnProperty("opponent")) {
            setEnemy(response.opponent);
            document.getElementById("enemy").innerHTML=getEnemy();
            toggleButton("quitQueue");
            if(response.turn==getUser()) {
                showPlayerTurn();
                starth1();
            } else {
                showEnemyTurn();
                starth2();
            }
            setAndCreateOnlineTable();
        } else {
            //registers confirmed server move from screen
            var move = edgeToIndex(response.move.orient, response.move.row, response.move.col);
            clicked(move[0], move[1]);
            
            if(response.hasOwnProperty("turn")) {
                if(!response.move.hasOwnProperty("boxes")) { //caso sejam dois moves seguidos
                    if(response.turn==getUser()) {
                        pauseh2();
                        /*
                        time=response.move.time;
                        time=time-(Math.floor(time/60)*60);
                        updateh1(Math.round(time * 100) / 100);
                        */
                        starth1();
                    } else {
                        pauseh1();
                        /*
                        time=response.move.time;
                        time=time-(Math.floor(time/60)*60);
                        updateh2(Math.round(time * 100) / 100);
                        */
                        starth2();
                    }
                }
                if(response.turn==getUser()) {
                    showPlayerTurn();
                } else {
                    showEnemyTurn();
                }
            }
            if(response.move.hasOwnProperty("boxes")) {
                if(response.move.name==getUser())
                    colourBoxes('1',response.move.boxes);
                else
                    colourBoxes('0',response.move.boxes);
            }
            if(response.hasOwnProperty("winner")) {
                if(lastPlayer==getUser())pauseh1();
                else pauseh2();
                source.close();
                if(response.winner==getUser())showWin();
                clearInterval(playerTurnInterval);
                clearInterval(enemyTurnInterval);
                toggleButton("quitGame");
            }
            lastPlayer=response.turn;
            
        }
        updateGameProgress();
    }
}

function updateGameProgress() {
    document.getElementById("playerscore").innerHTML=playerBoxes;
    document.getElementById("cpuscore").innerHTML=enemyBoxes;
}

/**
 * returns if number is even or not
 *
 */
function isEven(n) {
    n = Number(n);
    return n === 0 || !!(n && !(n%2));
}

/**
 * Converts local table format into edge server format for played lines
 *
 */
function indexToEdge(ri, ci) {
    if(isEven(ri)) {
        var orient = 'h';
        var row = 1+ri/2;
        var col = (ci+1)/2;
        return [orient, row, col];
    } else {
        var orient = 'v';
        var row = (ri+1)/2;
        var col = 1+ci/2;
        return [orient, row, col];
    }
}

/**
 * Converts server format into local table format for played lines
 *
 */
function edgeToIndex(orient, row, col) {
    if(orient=='h') {
        var ri = 2*(row-1);
        var ci = 2*col-1;
        return [ri, ci];
    } else {
        var ri = 2*row-1;
        var ci = 2*(col-1);
        return [ri, ci];
    }
}

/**
 * Converts server format into local table format for conquered boxes
 *
 */
function boxesToIndex(row, col) {
    var ri = 2*row-1;
    var ci = 2*col-1;
    return [ri, ci];
}

/**
 * Colours conquered boxes with respect to conqueror
 *
 */
function colourBoxes(player,boxes) {
    for(i=0; i<boxes.length;i++) {
        if(player==1)incrementPlayerBoxes();
        else incrementEnemyBoxes();
        indexBox = boxesToIndex(boxes[i][0],boxes[i][1]);
        boxed(player,indexBox[0],indexBox[1]);
    }
}


/**
 * Notifies the server of player actions
 * @param local table row index column index
 */
function notify(ri, ci){
    var url = "http://twserver.alunos.dcc.fc.up.pt:8000/notify";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/json");
    var move = indexToEdge(ri, ci);
    req.send(JSON.stringify({name:getUser(), game:getGameID(), key:getKey(), orient:move[0], row:move[1], col: move[2]}));

    req.responseType='text';
    req.onload = function() {
        respServer = req.responseText;
        response=JSON.parse(respServer);
        if(response.hasOwnProperty("error")) {
            console.log(response);
            alert(response.error);
        }
    };
}

/**
 * Leaves game queue, not usable while in a game.
 */
function leave(){
    var url = "http://twserver.alunos.dcc.fc.up.pt:8000/leave";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify({name:getUser(), game:getGameID(), key:getKey()}));
    req.responseType='text';
    req.onload = function() {
        respServer = req.responseText;
        response=JSON.parse(respServer);
        if(response.hasOwnProperty("error")) {
            console.log(response);
            alert(response.error);
        } else {
            source.close();
            document.getElementById("GameArea").innerHTML = "";
            toggleButton("quitQueue");
            toggleButton("startButton");
        }
    };
}

/**
 * Get leaderboards from server and populate table
 * @param leaderboard difficulty
 */
function showRanking(rankingLevel){
    var url = "http://twserver.alunos.dcc.fc.up.pt:8000/ranking";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify({level:rankingLevel}));

    req.responseType='text';
    req.onload = function() {
        respServer = req.responseText;
        response=JSON.parse(respServer);
        if(response.hasOwnProperty("error")) {
            console.log(response);
            alert(response.error);
        } else {
            addTable(response.ranking);
        }
    };
}
