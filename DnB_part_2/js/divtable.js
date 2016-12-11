function rankingTable() {
    //TODO add support for offline scores
    var diff = document.getElementById("rankingDifficulty");
    switch (diff.elements["rankingDifficulty"].value) {
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
    document.getElementById("leaderboard_table").innerHTML = "";
    var mode = document.getElementById("rankingOnlineCheckbox").checked;
    mode ? showRanking(level) : HighScores(level);
     
    
}

function addTable(ranking) {
    var myTableDiv = document.getElementById("leaderboard_table")
    var table = document.createElement('TABLE')
    var tableBody = document.createElement('TBODY')
    
    table.className="score";

    table.border = '1'
    table.appendChild(tableBody);

    var heading = new Array();
    heading[0] = "Name"
    heading[1] = "Boxes"
    heading[2] = "Time"

    
    //quando o servidor estiver activo vai-se buscar esta matriz ao servidor
    /*
    var stock = new Array()
    stock[0] = new Array("azthec", 40, "Portugal")
    stock[1] = new Array("destiny", 40, "Portugal")
    stock[2] = new Array("bimbambim", 30, "Portugal")
    stock[3] = new Array("arrrrfffffff", 100, "Portugal")
	*/
	 //var tmp = {"ranking": [{"name": "suzy",  "boxes": 5, "time": 81}, {"name": "berto",  "boxes": 4, "time": 68},{"name": "rprior", "boxes": 5, "time": 54}]};
	 tmp = ranking;
	 var stock = new Array;
	 for (i = 0; i < tmp.length; i++) {
		 stock.push([tmp[i].name, tmp[i].boxes, tmp[i].time]);
	 }
    
    /*
   
	var stock = new Array;
	for(var o in tmp) {
		stock.push(tmp[o]);
	}
	* */


	//var stock = Object.keys(tmp2).map(function (key) { return tmp2[key]; });
	
    stock.sort(sortFunction);
    
    //TABLE COLUMNS
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')
        th.width = '75';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }

    //TABLE ROWS
    for (i = 0; i < stock.length; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < stock[i].length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(stock[i][j]));
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
    }  
    myTableDiv.appendChild(table)
}


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function sortFunction(a, b) {
    if (a[1] == b[1]) {
		if(a[2] == b[2]) {
			return 0;
		} else {
			return(a[2] > b[2]) ? 1 : -1;
		}
    }
    else {
        return (a[1] < b[1]) ? 1 : -1;
    }
}