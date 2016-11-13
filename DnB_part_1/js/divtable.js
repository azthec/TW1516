function addTable() {
    var myTableDiv = document.getElementById("leaderboard_table")
    var table = document.createElement('TABLE')
    var tableBody = document.createElement('TBODY')
    
    table.className="score";

    table.border = '1'
    table.appendChild(tableBody);

    var heading = new Array();
    heading[0] = "Username"
    heading[1] = "Score"
    heading[2] = "Country"

    
    //quando o servidor estiver activo vai-se buscar esta matriz ao servidor
    var stock = new Array()
    stock[0] = new Array("azthec", 40, "Portugal")
    stock[1] = new Array("destiny", 40, "Portugal")
    stock[2] = new Array("bimbambim", 30, "Portugal")
    stock[3] = new Array("arrrrfffffff", 100, "Portugal")
    stock[4] = new Array("admin'/*", 00, "China")

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
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? 1 : -1;
    }
}