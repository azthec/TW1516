////////////////////////////////////////////////Multiplayer///////////////////////////////////////////////////////////////////



key = "";
level = "intermediate";
gameID="";
user="";
pass="";
activeLogin=0;

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

function getPass() {
    return pass;
}

function setPass(value) {
    pass = value;
}

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

/*Defines the size of the table according to the difficulty chosen by user*/
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
 * starts multiplayer game.<br>
 * If the connection with the server is on, it will register and/or login the player and alert him if there's a problem with his registration<br>
 * if succeded, it will look for a player to join in and will alert the user.
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
 * Method to get a gameId given by the server
 */
function joinGame(){
    var url = "http://twserver.alunos.dcc.fc.up.pt:8000/join";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify({name:getUser(), pass:getPass(), level:getLevel(), group:'16'}));

    //
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
                update();
            }
        }
    }
    //

    /*
    req.onload = function() {
        respServer = req.responseText;
        response=JSON.parse(respServer);
        if(response.hasOwnProperty("error")) {
            alert(response.error);
            console.log(response);
        } else {
            setGameID(response.game);
            setKey(response.key);
            console.log(response);
            update();
        }
    };
    */
}

/**
 * Method to connect two players and to start a new game.<br>
 * After the the game is launched, it will update the enemy points and check if there's a winner, either by goal or forfeit.
 * @param id of the game set
 */
function update() {
    //TODO add check for key and game validity, otherwise url returns json and not event stream which leads to EventSource causing an unrecoverable state

    /*
    url='http://twserver.alunos.dcc.fc.up.pt:8000/update?name='+getUser()+'&game='+getGameID+'&key='+getKey();

	var req = new XMLHttpRequest();

	req.open("GET",url , true);
	req.responseType='text';
	req.onload = function() {
        console.log(req.responseText);
	};
    */

    url='http://twserver.alunos.dcc.fc.up.pt:8000/update?name='+getUser()+'&game='+getGameID()+'&key='+getKey();
    console.log(url);
    source = new EventSource(url); // URL do script
    source.onmessage = function (event) {
        var response = JSON.parse(event.data);
        console.log(response);
        if (response.hasOwnProperty("opponent")) {
            //TODO show opponent on web page
            //TODO set starting player turn and begin game
            setAndCreateOnlineTable();
        } else {
            //registers confirmed server move from screen
            var move = edgeToIndex(response.move.orient, response.move.row, response.move.col);
            clicked(move[0], move[1]);


            //TODO handle boxes
            if(response.move.hasOwnProperty("boxes")) {
                if(response.move.name==getUser())
                    colourBoxes('1',response.move.boxes);
                else
                    colourBoxes('0',response.move.boxes);
            }





            if(response.hasOwnProperty("winner")) {
                //TODO handle if game has ended


            }
        }
    }
}

function isEven(n) {
    n = Number(n);
    return n === 0 || !!(n && !(n%2));
}

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

function boxesToIndex(row, col) {
    var ri = 2*row-1;
    var ci = 2*col-1;
    return [ri, ci];
}

function colourBoxes(player,boxes) {
    for(i=0; i<boxes.length;i++) {
        indexBox = boxesToIndex(boxes[i][0],boxes[i][1]);
        boxed(player,indexBox[0],indexBox[1]);
    }
}


/**
 * Notifies the server of player events.
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
 * Closes connection with the server.
 */
function leave(){
    //TODO block execution while game is running
    var url = "http://twserver.alunos.dcc.fc.up.pt:8000/leave";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/json");
    //TODO reset html drawn table
    req.send(JSON.stringify({name:getUser(), game:getGameID(), key:getKey()}));

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

function showRanking(rankingLevel){
    //TODO add radio buttons to select rankingLevel to show @ html page
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
