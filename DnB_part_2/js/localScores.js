/**
 * Update local score database with new game scores
 * @param played game difficulty
 */
function UpdateScore(level) {
    if(typeof(Storage)!=="undefined"){
        var current = parseInt(document.getElementById("playerscore").innerHTML);
        var scores = false;

        console.log(localStorage["high-scores-"+level]);
        if(localStorage["high-scores-"+level]) {

            scores = JSON.parse(localStorage["high-scores-"+level]);
            var stock = new Array;
            for (i = 0; i < scores.length; i++) {
                stock.push([scores[i].name, scores[i].boxes, scores[i].time]);
            }

            stock.push(["user", current, 0]);
            stock = stock.sort(offlineSortFunction);
            console.log(stock);

            var scores = {
                ranking: []
            };

            for(var i in stock) {    

                var item = stock[i];   

                scores.ranking.push({ 
                    "name" : item[0],
                    "boxes": item[1],
                    "time" : item[2] 
                });
            }

            localStorage["high-scores-"+level] = JSON.stringify(scores.ranking);

        } else {                        
            localStorage["high-scores-"+level] = JSON.stringify([{"name": "user",  "boxes": current, "time": 0}]);
        }
    } else {
        //local storage not supported
    }
}

/**
 * Display local score database with game scores
 * @param played game difficulty
 */
function HighScores(level) {
    if(typeof(Storage)!=="undefined"){
        if(localStorage["high-scores-"+level]) {
            scores = JSON.parse(localStorage["high-scores-"+level]);
            addTable(scores);
        }
    } else {
        //local storage not supported
    }
}

/**
 * Sorting function for offline games (time not implemented on them)
 *
 */
function offlineSortFunction(a, b) {
    if (a[1] == b[1]) {
        return 0;
    } else {
        return (a[1] < b[1]) ? 1 : -1;
    }
}