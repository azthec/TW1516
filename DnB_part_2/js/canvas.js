/**
 * Draw player turn animation
 */
function drawYourTurn() {
    var can = document.getElementById("playercanvas"), ctx = can.getContext("2d"),
        txt = "Your Turn", x = 0, i=0;

    ctx.font = "90px Arial Black"; 
    ctx.lineWidth = 2; 

    var playerTurnInterval = setInterval(function(){
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.setLineDash([i++,9999]);
        ctx.strokeText(txt[0], x, 100); 
        ctx.fillText(txt[0], x, 100);  
        ctx.strokeText(txt[1], x+40, 100); 
        ctx.strokeText(txt[2], x+80, 100); 
        ctx.strokeText(txt[3], x+120, 100); 
        ctx.strokeText(txt[5], x+200, 100); 
        ctx.fillText(txt[5], x+200, 100);
        ctx.strokeText(txt[6], x+240, 100); 
        ctx.strokeText(txt[7], x+280, 100); 
        ctx.strokeText(txt[8], x+320, 100);
        i=i%300;
    },1);
    return playerTurnInterval;
}


/**
 * Draw enemy turn animation
 */
function drawEnemyTurn() {
    var can = document.getElementById("enemycanvas"), ctx = can.getContext("2d"),
        txt = "Enemy Turn", x = 0, i=0;

    ctx.font = "90px Arial Black"; 
    ctx.lineWidth = 2; 

    var enemyTurnInterval = setInterval(function(){
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.setLineDash([i++,9999]);
        ctx.strokeText(txt[0], x, 100); 
        ctx.fillText(txt[0], x, 100);  
        ctx.strokeText(txt[1], x+50, 100); 
        ctx.strokeText(txt[2], x+100, 100); 
        ctx.strokeText(txt[3], x+150, 100); 
        ctx.strokeText(txt[4], x+225, 100);
        ctx.strokeText(txt[5], x+275, 100); 
        ctx.fillText(txt[6], x+300, 100);  
        ctx.strokeText(txt[6], x+300, 100); 
        ctx.strokeText(txt[7], x+350, 100); 
        ctx.strokeText(txt[8], x+400, 100);
        ctx.strokeText(txt[9], x+450, 100);
        i=i%300;
    },1);
    
    return enemyTurnInterval;
}

/**
 * Draw win animation
 */
function drawWin() {
    var can = document.getElementById("wincanvas"), ctx = can.getContext("2d"),
        txt = "Winner", x = 0, i=0;

    ctx.font = "90px Arial Black"; 
    ctx.lineWidth = 2; 

    var canvasInterval = setInterval(function(){
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.setLineDash([i++,9999]);
        ctx.strokeText(txt[0], x, 100); 
        ctx.fillText(txt[0], x, 100);  
        ctx.strokeText(txt[1], x+80, 100); 
        ctx.strokeText(txt[2], x+100, 100); 
        ctx.strokeText(txt[3], x+150, 100); 
        ctx.strokeText(txt[4], x+225, 100);
        ctx.strokeText(txt[5], x+275, 100); 
        i=i%300;
    },1);
    
    return canvasInterval;
}