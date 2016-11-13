/*Function that generates the table*/

function buildTable (rows, cols) {	
    //If a table already exists, delete it otherwise it will keep generating tables.
    removeTable(), 

    //Keeping the table state as an array of rows.
    board = new Array(rows);

    //Keeping track of who owns the cells
    ownedCells = new Array(rows-1);


    //Temporary vars used no checkGameFinished to get the number of cols and rows
    temp1 = rows;
    temp2 = cols;

    lastMove="";


    //Get the elements
    var tabArea = document.getElementById("GameArea");
    var table = document.createElement("table");
    table.id = "tableid";
    var tbody = document.createElement("tbody");
    var i=0,j=0;

    //Each table has 2*rows+1 and 2*cols+1 because we count the white circles as cells

    //The generation the the table
    for (i=0;i<rows*2+1;i++) {
        board[i] = new Array(cols);
        if (i%2 == 1)
            ownedCells[Math.floor(i/2)] = new Array(cols-1);
        var tr = document.createElement("tr");
        for (j=0;j<cols*2+1;j++) {			
            var td = document.createElement("td");
            board[i][j] = 1;

            // Thw white circles are created
            if (i%2 == 0 && j%2 ==0) {
                td.appendChild(document.createTextNode("\u25CB"));
                td.className = "white_circle";
                td.id = i + "," + j;
                tr.appendChild(td);
            }

            //Horizontal cells created
            else if (i%2 == 0 && j%2 == 1) {
                td.className = "htdc";	
                td.id = i + "," + j;	
                td.onclick = function() {horizontalMove(this.id, "p");}
                tr.appendChild(td);
            }

            //Vertical cells created
            else if (i%2 == 1 && j%2 == 0) {
                td.className = "vtdc";
                td.id = i + "," + j;
                td.onclick = function() {verticalMove(this.id, "p");}
                tr.appendChild(td);
            }

            //Cells in the middle to be filled
            else {
                td.className = "mid_square";
                td.id = i + "," + j;
                tr.appendChild(td);
            }



        }
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    tabArea.appendChild(table);
}


/*Defines the size of the table according to the difficulty chosen by user*/
function setTableSize() {
    var diff = document.getElementById("difficulty");
    switch (diff.elements["difficulty"].value) {
            //Beginner
        case "beg": {
            buildTable(2,3);
            break;
        }
            //Intermediate
        case "inter": {
            buildTable(4,5);
            break;
        }
            //Advanced
        case "adv": {
            buildTable(6,8);
            break;
        }
            //Expert
        case "exp": {
            buildTable(9,11);
            break;		
        }	
    }	
}







/*Move cells horizontally */
function horizontalMove(pos, user){

    //Split the id to get the row and col values
    var getpos = pos.split(",");
    var row = parseInt(getpos[0]);
    var col = parseInt(getpos[1]);   

    //Temporary vars that are used 
    var f1 = false;
    var f2 = false;

    //If the user clicks on a white circle, nothing is done
    if (row%2 == 1 || col%2 == 0)
        return;
    //If the move has already been made, nothing is done
    if (board[row][col] == 0)
        return;
    board[row][col] = 0;

    //If player or computer just maded a square or not, if it does makes another move 
    if (lastMove!="") {
        var lastpos = last.split(",");
        var lastrow = parseInt(lastpos[0]);
        var lastcol = parseInt(lastpos[1]);


        //If horizontal or vertical cell played
        if ((lastrow%2 == 1 && lastcol == 0) || (lastrow%2 == 0 && lastcol%2 ==1)) {
            var a = document.getElementById(row+','+col);
            a.className="played_horizontal";
        }
    }

    
    if (user == "p") {
        var a = document.getElementById(row+','+col);
        a.className="played_horizontal";
    }

    else {
        var a = document.getElementById(row+','+col);
        a.className="played_horizontal";
        last = pos;
    }


    //Call checkSquare recursively to check if a square has been made in the next row and the previous
    if (eval(row+1) < board.length)
        f1 = checkSquare(eval(row+1) + "," + col, user);

    if (eval(row-1 >= 0))
        f2 = checkSquare(eval(row-1) + "," + col, user);

    if ((!f1 && !f2 && user=="p") || ((f1 || f2) && user =="c"))
        cpuMove();
    else
        checkGameFinished();
}


/*Function that removes the table*/
function removeTable() {
    var elem = document.getElementById("tableid");
    if (elem)
        elem.parentNode.removeChild(elem);
	var displayEl = document.getElementById("playerscore");
    displayEl.innerHTML = 0;
    displayEl = document.getElementById("cpuscore");
    displayEl.innerHTML = 0;

}

/*
Move cells Verticaly, similar to hmove
*/

function verticalMove(pos,user) {
    //Split the id to get the row and col values
    var getpos = pos.split(",");
    var row = parseInt(getpos[0]);
    var col = parseInt(getpos[1]);

    //Temporary vars that are used 
    var f1 = false;
    var f2 = false;

    //If the user clicks on a white circle, do nothing
    if (row%2 == 0 || col%2 == 1)
        return;

    //If the move has already been made, do nothing
    if (board[row][col] == 0)
        return;	

    board[row][col] = 0;

    if (lastMove!="") {
        var lastpos = last.split(",");
        var lastrow = parseInt(lastpos[0]);
        var lastcol = parseInt(lastpos[1]);


        //If horizontal or vertical cell played
        if ((row%2 == 0 && col%2 == 1) || (row%2 == 1 && col%2 == 0)) { //check if the move is on a playable cell (not on the circle)
            var a = document.getElementById(row+','+col);
            a.className="played_vertical";
        }
    }

    
    if (user == "c") {
        var a = document.getElementById(row+','+col);
        a.className="played_vertical";
    }

    else {
        var a = document.getElementById(row+','+col);
        a.className="played_vertical";
        last = pos;
    }

    //Call checkSquare recursively to check if a square has been in the next row and the previous row.
    if (eval(col+1) < board[row].length)
        f1 = checkSquare(row + "," + eval(col+1), user);

    if (eval(col-1 >= 0))
        f2 = checkSquare(row + "," + eval(col-1), user);

    if ((!f1 && !f2 && user=="p") || ((f1 || f2) && user =="c"))
        cpuMove();
    else
        checkGameFinished();

}



/*How the CPU plays, although it ain't that intelligent, it wasn't suppose to be.*/

function cpuMove() {
    if (checkGameFinished() !=false)
        return;

    for (var i=0;i<board.length;i++) {
        for (var j=0;j<board[i].length;j++) {
            if ((i%2 == 1 && j%2 == 0)) {
                var a = document.getElementById(i+','+j);
                if (a.className != "played_vertical"){
                    verticalMove(i+','+j, "c");
                    return;
                }
            }

            else if (i%2 == 0 && j%2 == 1) {
                var a = document.getElementById(i+','+j);
                if (a.className != "played_horizontal") {
                    horizontalMove(i+','+j, "c");
                    return;
                }
            }
        }
    }

}




/*
Checks if a square has been formed by CPU or player.
*/
function checkSquare(pos,user) {
    var checked = false; // check if a square has been formed

    var getpos = pos.split(",");
    var row = parseInt(getpos[0]);
    var col = parseInt(getpos[1]);

    //If the row or col is in position 0, it's on the border and not a square, so nothing is done.
    if (row%2 == 0 || col%2 == 0){
        return;
    }


    //Check if neighbour cells are checked and fill the middle cell if they are.
    if (!board[row-1][col] && !board[row+1][col] && !board[row][col-1] && !board[row][col+1]) {
        checked = true;
        var a = document.getElementById(row + ',' + col);

        //If player filled a square
        if (user == "p") {
            a.className = "filledP";
            ownedCells[Math.floor(row/2)][Math.floor(col/2)] = "p";
        }

        //CPU filled a square
        else {
            a.className = "filledCPU";
            ownedCells[Math.floor(row/2)][Math.floor(col/2)] = "c";
        }
        checkGameFinished();
    }
    return checked;
}




/*Checks if the game is finished*/
function checkGameFinished() {
    var v = new Array();


    for (var i=0;i<board.length;i++) {
        for (var j=0;j<board[i].length;j++) {
            if (i%2 == 1 && j%2 == 1) {
                if (!board[i-1][j] && !board[i+1][j] && !board[i][j-1] && !board[i][j+1]) {
                    v[v.length] = i + ',' + j;
                }
            }
        }
    }

    var player_score=0;
    var cpu_score=0;
    for (var i=0;i<ownedCells.length;i++) {
        for (var j=0;j<ownedCells[i].length;j++) {
            if (ownedCells[i][j] == "p")
                player_score++;
            else if (ownedCells[i][j]== "c")
                cpu_score++;
            else
                ;
        }

    }

    var displayEl = document.getElementById("playerscore");
    displayEl.innerHTML = player_score;
    displayEl = document.getElementById("cpuscore");
    displayEl.innerHTML = cpu_score;


    if (v.length == (temp1)*(temp2)) {
        //Alerts are created when game is finished
        var displayEl = document.getElementById("victorystatus");
        if (player_score > cpu_score) {
            displayEl.innerHTML = "WINNER WINNER CHICKEN DINNER!";
            return;
        }
        else if (player_score < cpu_score) {
            displayEl.innerHTML = "BETTER LUCK NEXT TIME!";
            return;
        }	
        else {
            displayEl.innerHTML = "DRAWDRAWDRAW!";
            return;
        }
	}
    return false;	
}