let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
//hacemos crecer el canvas sin distorsionarlo
document.body.style.zoom  = "400%";
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler,false);
let fps = 60; //poner a 30 si falla
//agregamos el fondo
let worldBackground = new Image();
worldBackground.src = "../images/background1.png";
//agregamos a link
let link = new Image();
link.src = "../images/link0.png";


let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let lastButtonPressed = "up";
let animationCounter = 0;
let currentAnimation = 0;
let animationSpeed = 10;
let linkX =116;
let linkY = 135;

let mapInicial = [[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
[ 61, 61, 61, 61, 61, 61, 61,  2,  2, 61, 61, 61, 61, 61, 61, 61],
[ 61, 61, 61, 61, 28, 61, 62,  2,  2, 61, 61, 61, 61, 61, 61, 61],
[ 61, 61, 61, 62,  2,  2,  2,  2,  2, 61, 61, 61, 61, 61, 61, 61],
[ 61, 61, 62,  2,  2,  2,  2,  2,  2, 61, 61, 61, 61, 61, 61, 61],
[ 61, 62,  2,  2,  2,  2,  2,  2,  2, 60, 61, 61, 61, 61, 61, 61],
[  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],
[ 43, 44,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 43, 43],
[ 61, 61,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 61, 61],
[ 61, 61,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 61, 61],
[ 61, 61, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 61, 61],
[ 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61]];


//controlador de tecla hacia abajo
function keyDownHandler(e){
    if(e.keyCode == 37){
        leftPressed = true;
        lastButtonPressed ="left";  
    }
    else if(e.keyCode == 39){
        rightPressed = true;
        lastButtonPressed = "right";
    }
    else if(e.keyCode == 38){
        upPressed = true;
        lastButtonPressed = "up";
    }
    else if(e.keyCode == 40){
        downPressed = true;
        lastButtonPressed = "down";
    }
}

//controlador de tecla hacia arriba
function keyUpHandler(e){
    if(e.keyCode == 37){
        leftPressed = false;
    }
    else if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 38){
        upPressed == false;
    }
    else if(e.keyCode == 40){
        downPressed == false;
    }
}


function drawLink(){
   let speed = 2;
   animationCounter++;

   if(leftPressed ){
    linkX -= speed;
    if(currentAnimation == 0){
        ctx.drawImage(link,30,0,16,16,linkX,linkY,16,16);
    }
    else if(currentAnimation == 1){
        ctx.drawImage(link,30,30,16,16,linkX,linkY,16,16);
    }
    if(animationCounter >= 6){
        
        currentAnimation++;
        animationCounter = 0;
        if(animationCounter > 1){
            currentAnimation = 0;
        }
    }
   }

   else if(rightPressed ){
    linkX += speed;
    if(currentAnimation == 0){
        ctx.drawImage(link,91,0,16,16,linkX,linkY,16,16);
    }
    else if(currentAnimation == 1){
        ctx.drawImage(link,91,30,16,16,linkX,linkY,16,16);
    }
    if(animationCounter >= 6){
        currentAnimation++;
        animationCounter = 0;
        if(animationCounter > 1){
            currentAnimation = 0;
        }
    }
   }

   else if(upPressed ){
    linkY -= speed;
    if(currentAnimation == 0){
        ctx.drawImage(link,62,0,16,16,linkX,linkY,16,16);
    }
    else if(currentAnimation == 1){
        ctx.drawImage(link,62,30,16,16,linkX,linkY,16,16);
    }
    if(animationCounter >= 6){
        currentAnimation++;
        animationCounter = 0;
        if(animationCounter > 1){
            currentAnimation = 0;
        }
    }
   }

   else if(downPressed ){
    linkY += speed;
    if(currentAnimation == 0){
        ctx.drawImage(link,0,0,16,16,linkX,linkY,16,16);
    }
    else if(currentAnimation == 1){
        ctx.drawImage(link,0,30,16,16,linkX,linkY,16,16);
    }
    if(animationCounter >= 6){
        currentAnimation++;
        animationCounter = 0;
        if(animationCounter > 1){
            currentAnimation = 0;
        }
    }
   }

   else{
    if(lastButtonPressed == "down"){
        ctx.drawImage(link,0,0,16,16,linkX,linkY,16,16);
    }
    if(lastButtonPressed == "up"){
        ctx.drawImage(link,62,0,16,16,linkX,linkY,16,16);
    }
    if(lastButtonPressed == "right"){
        ctx.drawImage(link,91,0,16,16,linkX,linkY,16,16);
    }
    if(lastButtonPressed == "left"){
        ctx.drawImage(link,30,0,16,16,linkX,linkY,16,16);
    }
   }
}

function drawMap(level){
    //recorremos la matrix mapIncial
    for(let i=0; i<level.length; i ++){
        for(let j=0; j<level[i].length; j++){
            ctx.drawImage(worldBackground, ((level[i][j]%18) * 17) + 1,
			(Math.floor(level[i][j]/18) * 17) + 1, 
			16, 16, j *16, i *16, 16, 16);
            //obtenemos el numero de nivel[i][j] multiplicamoos por 18 
            //la segundo sirve... mirarlo
        }
    }
}

function draw () {
    setTimeout(function() {
    requestAnimationFrame(draw);
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0,0,500,500);
    ///all code goes here
    drawMap(mapInicial);
    drawLink();
    },1000/fps);
 }
 draw();