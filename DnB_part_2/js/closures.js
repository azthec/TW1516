
/**
 * Create online  game visualization table
 * @param table name, size rows, size columns
 */
function create(name,rows,columns) {
    
    //because dots still count as part of the table
    rows = rows*2+1;
    columns = columns*2+1;
    
    var grid = document.getElementById(name);
    var table = document.createElement("table");

    table.setAttribute("border",0);
    table.setAttribute("class","grid");
    grid.appendChild(table);

    for(var row=0; row<rows; row++) {
	var tr = document.createElement("tr");

	tr.setAttribute("class","grid");
	table.appendChild(tr);
	for(var column=0; column < columns; column++) {
	    var td = document.createElement("td");
	    var el = document.createElement("div");
	    var text = document.createTextNode("");
	    var callbak = null;
	    var kind;
	    
	    if(row % 2 == 0) {
		if(column % 2 == 0)
		    kind = "corner";
		else
		    kind = "horizontal";
	    } else {
		if(column % 2 == 0)
		    kind = "vertical";
		else
		    kind = "square";	   	
	    }

	    if(row % 2 != column %2) {
		td.onclick = function(r,c) {
		    return function() {
            //EDIT HERE
			notify(r,c);
		    }
		}(row,column);
	    }
	    
	    el.appendChild(text);
	    td.appendChild(el);
	    td.setAttribute("class","grid");
	    el.setAttribute("id",getId(row,column));
	    el.setAttribute("class",kind);
	    tr.appendChild(td);

	}
    }
}

/**
 * Converts table matrix position into html id
 * @param table ri ci
 */
function getId(row,column) {
    return "cell-"+row+"-"+column
}

/**
 * Paints edge red (used after server notification)
 * @param edge ri ci
 */
function clicked(row,column) {
    console.log("["+row+","+column+"]");
    var cell = document.getElementById(getId(row,column));
    cell.style.background = "red";
}

/**
 * Paints box red (used after server notification)
 * @param player ri ci
 */
function boxed(player,row,column) {
    console.log("["+row+","+column+"]");
    var cell = document.getElementById(getId(row,column));
    if(player==1)
        cell.style.background = "green"; //player is green
    else 
        cell.style.background = "blue"; //opponent is blue
}
