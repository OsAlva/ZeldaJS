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

//hud
let hud = new Image();
hud.src = "../images/pausescreen.png";

//characters1
let chars1 = new Image();
chars1.src = "../images/chars.png";

let chars2 = new Image();
chars2.src = "../images/chars2.png";


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
//variables para transiciones de mapa
let gameObjects = [];//todos los objetos interactuables colisionables que estaran en la pantalla
let maps = []; //aqui almacenaremos todos los mapas del mundo.
let gameMap = null; // mapa del juego particular es un object, contendra referencia del mapa en el que se encuentra

//variables para los items
let ultimoItem = 0;
let animacionUltimoItem = false;


function GameObject()
{
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.newMap = 0;
	this.newLinkX = -1;
	this.newLinkY = -1;
	this.isPortal = false;
    this.counter = 0; //contara el tiempo hasta la siguiente animación
    this.numeroImagen = 0;
    this.isText = false;
    this.linea1Completa = "";
    this.liena2Completa = "";
    this.linea1Actual = "";
    this.linea2Actual = "";
    this.linea1X = 0;
    this.linea1Y = 0;
    this.linea2X = 0;
    this.linea2Y = 0;
    this.isOldMan = false;
    this.isRecogerItem =false;
    this.recogerItemNumero = 0;
    this.isFlame = false;
    this.isOldWoman = false;
    this.recogerItemNombre = "";

}

//paquete de mapas
function MapBundle(m, o)
{
	this.map = m;
	this.gameobjects = o;
}




//controlador de tecla hacia abajo
function keyDownHandler(e){
    if(e.keyCode == 37)
    {
	   leftPressed = true;
	   lastButtonPressed = "left";
	}
	else if(e.keyCode == 39)
	{
	   rightPressed = true;
	   lastButtonPressed = "right";
	}
	else if(e.keyCode == 38)
	{
	   upPressed = true;
	   lastButtonPressed = "up";
	}
	else if(e.keyCode == 40)
	{
	   downPressed = true;
	   lastButtonPressed = "down";
	}
}

//controlador de tecla hacia arriba
function keyUpHandler(e){
    if(e.keyCode == 37)
	{
	   leftPressed = false;
	}
	else if(e.keyCode == 39)
	{
	   rightPressed = false;
	}
	else if(e.keyCode == 38)
	{
	   upPressed = false;
	}
	else if(e.keyCode == 40)
	{
	   downPressed = false;
	}
}


function drawLink(){
   let speed = 2;
   animationCounter++;

   //animación cuando coje la espada
   if(animacionUltimoItem){

        if(animationCounter <150){
            ctx.drawImage(link,1,150,16,16, linkX, linkY,16,16);
        }
        else{
            animationCounter = false;
        }

        switch(ultimoItem){
            case 0: 
            break;

            case 1: 
            break;

            case 2: 
            break;
            
            case 3: 
            break;

            case 4: 
            break;

            case 5: 
            break;

            case 6: 
            break;

            case 7: 
            break;

            case 8: 
            break;

            case 9: 
                break;

            case 10: 
                break;

            case 11: 
                break;

            case 12: 
                break;

            case 13: 
                break;

            case 14: 
                ctx.drawImage(hud,555,137,8,16,linkX-2, linkY-14, 8, 16);
                break;

        }
   }
   else{

        if(leftPressed && !collision(linkX-speed,linkY,gameMap))
            {
                linkX -= speed;
                if(currentAnimation == 0)
                {
                    ctx.drawImage(link, 30, 0, 16, 16, linkX, linkY, 16, 16);
                }
                else if(currentAnimation == 1)
                {
                    ctx.drawImage(link, 30, 30, 16, 16,linkX, linkY, 16, 16);
                }
                if(animationCounter >= 6)
                {
                    currentAnimation++;
                    animationCounter = 0;
                    if(currentAnimation > 1)
                    {
                        currentAnimation = 0;
                    }
                }
            }

        else if(rightPressed && !collision(linkX+speed,linkY,gameMap))
            {
                linkX += speed;
                if(currentAnimation == 0)
                    {
                        ctx.drawImage(link, 91, 0, 16, 16, linkX, linkY, 16, 16);
                    }
                    else if(currentAnimation == 1)
                    {
                        ctx.drawImage(link, 91, 30, 16, 16,linkX, linkY, 16, 16);
                    }
                    if(animationCounter >= 6)
                    {
                        currentAnimation++;
                        animationCounter = 0;
                        if(currentAnimation > 1)
                        {
                            currentAnimation = 0;
                        }
                    }
            }

        else if(upPressed && !collision(linkX,linkY-speed,gameMap)){
            linkY -= speed;
            if(currentAnimation == 0)
                {
                    ctx.drawImage(link, 62, 0, 16, 16, linkX, linkY, 16, 16);
                }
                else if(currentAnimation == 1)
                {
                    ctx.drawImage(link, 62, 30, 16, 16,linkX, linkY, 16, 16);
                }
                if(animationCounter >= 6)
                {
                    currentAnimation++;
                    animationCounter = 0;
                    if(currentAnimation > 1)
                    {
                        currentAnimation = 0;
                    }
                }
        }

        else if(downPressed && !collision(linkX,linkY+speed,gameMap)){
                linkY += speed;
                if(currentAnimation == 0)
                    {
                        ctx.drawImage(link, 0, 0, 16, 16, linkX, linkY, 16, 16);
                    }
                    else if(currentAnimation == 1)
                    {
                        ctx.drawImage(link, 0, 30, 16, 16,linkX, linkY, 16, 16);
                    }
                    if(animationCounter >= 6)
                    {
                        currentAnimation++;
                        animationCounter = 0;
                        if(currentAnimation > 1)
                        {
                            currentAnimation = 0;
                        }
                    }
            }

        else{
                    if(lastButtonPressed == "down")
                    {
                        ctx.drawImage(link, 0, 0, 
                        16, 16, linkX, linkY, 16, 16);
                    }
                    if(lastButtonPressed == "up")
                    {
                        ctx.drawImage(link, 62, 0, 
                        16, 16, linkX, linkY, 16, 16);
                    }
                    if(lastButtonPressed == "left")
                    {
                        ctx.drawImage(link, 30, 0, 
                        16, 16, linkX, linkY, 16, 16);
                    }
                    if(lastButtonPressed == "right")
                    {
                        ctx.drawImage(link, 91, 0, 
                        16, 16, linkX, linkY, 16, 16);
                    }
        }
   }
}

let mapInicial = [
[ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
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

let objectsZ = [];

let gO = new GameObject();
gO.x = 72;
gO.y = 72;
gO.width = 8;
gO.height = 16;
gO.newMap = 1;
gO.newLinkX = 120;
gO.newLinkY = 220;
gO.isPortal = true;
objectsZ.push(gO);

//bundle es el paquete de objetos y el mapa
let bundle = new MapBundle(mapInicial,objectsZ);
maps.push(bundle);


////////////////////////////
let mapTwo = [
    [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
    [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
    [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
    [ 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
    [ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
    [ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
    [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
    [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
    [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
    [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
    [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
    [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
    [ 55, 55, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 55, 55],
    [ 55, 55, 37, 37, 37, 37, 37, 28, 28, 37, 37, 37, 37, 37, 55, 55],
    [ 55, 55, 55, 55, 55, 55, 55, 28, 28, 55, 55, 55, 55, 55, 55, 55]];

let objectsMapTwo = [];

//Flame
gO = new GameObject();
gO.x = (4*16)+8;
gO.y = (8*16);
gO.width = 16;
gO.height = 16;
gO.isFlame = true;
objectsMapTwo.push(gO);

//Flame
gO = new GameObject();
gO.x = (10*16)+8;
gO.y = (8*16);
gO.width = 16;
gO.height = 16;
gO.isFlame = true;
objectsMapTwo.push(gO);

//Old man
gO = new GameObject();
gO.x = (7*16)+8;
gO.y = (8*16);
gO.width = 16;
gO.height = 16;
gO.isOldMan = true;
objectsMapTwo.push(gO);

gO = new GameObject();
gO.isText = true;
gO.linea1Completa = "La princesa ha sido raptada!!! ";
gO.linea2Completa = "Coje la espada y rescatala..."
gO.linea1X = 3*16;
gO.linea1Y = 7 * 16;
gO.linea2X = 4* 16;
gO.linea2Y = (8* 16) - 6;
objectsMapTwo.push(gO);

//sword
gO = new GameObject();
gO.x = (8*16)-4;
gO.y = (9.5*16);
gO.width = 8;
gO.height = 16;
gO.isRecogerItem = true;
gO.recogerItemNumero = 14;
objectsMapTwo.push(gO);


///////// Portal variables 
gO = new GameObject();
gO.x = 112;
gO.y = 240;
gO.width = 16;
gO.height = 16;
gO.newMap = 0;
gO.newLinkX = 68;
gO.newLinkY = 96;
gO.isPortal = true;
objectsMapTwo.push(gO);

gO = new GameObject();
gO.x = 128;
gO.y = 240;
gO.width = 16;
gO.height = 16;
gO.newMap = 0;
gO.newLinkX = 68;
gO.newLinkY = 96;
gO.isPortal = true;
objectsMapTwo.push(gO);
////////////////////////

bundle = new MapBundle(mapTwo,objectsMapTwo);
maps.push(bundle);

gameMap = maps[0].map;
gameObjects = maps[0].gameobjects;



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

function collision(x,y, map){
    for(let i = 0;i< map.length; i++){
        for(let j=0; j< map[i].length;j++){
            if(map[i][j] !=2 && map[i][j] !=28){ // si es diferente de 2 significa que puede haber una colision

                if(x<=j*16 + 16 
                    && x+12 >= j * 16 
                    && y+10 <= i *16+16  
                    && y+16 >= i*16){
                    return true;
                }
            }
        }
    }
    return false;
}

function gameObjectCollision(x, y, objects, isLink)
{
	if(isLink)
	{
		for(let i = 0; i < objects.length; i++)
		{
			if(x <= objects[i].x + objects[i].width &&
			x + 16 >= objects[i].x &&
			y <= objects[i].y + objects[i].height &&
			y + 16 >= objects[i].y)
			{
				if(objects[i].isPortal)
				{
					gameMap = maps[objects[i].newMap].map;
					gameObjects = maps[objects[i].newMap].gameobjects;
					linkX = objects[i].newLinkX;
					linkY = objects[i].newLinkY;
				}

                    if(objects[i].isRecogerItem)
                    {
                        animacionUltimoItem =true;
                        //0 -> boomerang
                        //1 -> bomba
                        //2 -> arco y flecha
                        //3 -> vela
                        //4 -> flauta
                        //5 -> carne
                        //6 -> pocion
                        //7 -> vara magica
                        //8 -> balsa
                        //9 -> libro de magia
                        //10 -> anillo
                        //11 -> escalera
                        //12 -> llave
                        //13 -> brazalete
                        //14 -> espada de madera
                        switch(gameObjects[i].recogerItemNumero)
                        {
                            case 0: 
                            break;
        
                            case 1: 
                            break;
        
                            case 2: 
                            break;
                            
                            case 3: 
                            break;
        
                            case 4: 
                            break;
        
                            case 5: 
                            break;
        
                            case 6: 
                            break;
        
                            case 7: 
                            break;
        
                            case 8: 
                            break;
        
                            case 9: 
                                break;
        
                            case 10: 
                                break;
        
                            case 11: 
                                break;
        
                            case 12: 
                                break;
        
                            case 13: 
                                break;
        
                            case 14: 
                                ultimoItem = 14;
                                swordEquipped = 1;
                                break;
        
                        }
                        objects.splice(i,1);
                        animationCounter = 0;
                    }
			
			}
		}
	}
}


function drawGameObjects() {
    for(let i = 0; i < gameObjects.length; i++)
		{
			if(gameObjects[i].isRecogerItem){
                //0 -> boomerang
                //1 -> bomba
                //2 -> arco y flecha
                //3 -> vela
                //4 -> flauta
                //5 -> carne
                //6 -> pocion
                //7 -> vara magica
                //8 -> balsa
                //9 -> libro de magia
                //10 -> anillo
                //11 -> escalera
                //12 -> llave
                //13 -> brazalete
                //14 -> espada de madera
                switch(gameObjects[i].recogerItemNumero){
                    case 0: 
                    break;

                    case 1: 
                    break;

                    case 2: 
                    break;
                    
                    case 3: 
                    break;

                    case 4: 
                    break;

                    case 5: 
                    break;

                    case 6: 
                    break;

                    case 7: 
                    break;

                    case 8: 
                    break;

                    case 9: 
                        break;

                    case 10: 
                        break;

                    case 11: 
                        break;

                    case 12: 
                        break;

                    case 13: 
                        break;

                    case 14: 
                        ctx.drawImage(hud,555,137,8,16,gameObjects[i].x, gameObjects[i].y, 8, 16);
                        break;

                }
            }

            if(gameObjects[i].isText){
                gameObjects[i].counter +=1;
                if(gameObjects[i].counter %5 == 0){ //quiere decir que es un multiple de 5 agregamos un personaje a la pantalla
                    if(gameObjects[i].linea1Completa.length != gameObjects[i].linea1Actual.length){
                        gameObjects[i].linea1Actual = gameObjects[i].linea1Completa.substring(0, gameObjects[i].linea1Actual.length+1);
                    }
                    else if(gameObjects[i].linea2Completa.length != gameObjects[i].linea2Actual.length){
                        gameObjects[i].linea2Actual = gameObjects[i].linea2Completa.substring(0, gameObjects[i].linea2Actual.length+1);
                    }
                 }
                 ctx.fillStyle = "white";
                 ctx.font ="12px Arial";
                 ctx.fillText(gameObjects[i].linea1Actual, gameObjects[i].linea1X,gameObjects[i].linea1Y);
                 ctx.fillText(gameObjects[i].linea2Actual, gameObjects[i].linea2X,gameObjects[i].linea2Y);
		        }
                if(gameObjects[i].isFlame){
                    gameObjects[i].counter+=1;
                    if(gameObjects[i].counter%5 == 0){
                        gameObjects[i].numeroImagen+=1;
                    }
                    if(gameObjects[i].numeroImagen>1){
                        gameObjects[i].numeroImagen = 0;
                    }
                    if(gameObjects[i].numeroImagen ==0){
                        ctx.drawImage(chars2,158,11,16,16, gameObjects[i].x,gameObjects[i].y, 16,16);
                    }
                    else{
                        ctx.drawImage(chars1,52,11,16,16, gameObjects[i].x,gameObjects[i].y, 16,16);
                    }
                }
                if(gameObjects[i].isOldMan){
                    ctx.drawImage(chars1,1,11,16,16, gameObjects[i].x,gameObjects[i].y, 16,16);
                }
                if(gameObjects[i].isOldWoman){
                    ctx.drawImage(chars1,35,11,16,16, gameObjects[i].x,gameObjects[i].y, 16,16);
                }
        }    
}


function draw () {
    setTimeout(function() {
    requestAnimationFrame(draw);
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0,0,500,500);
    ///all code goes here
    drawMap(gameMap);
    drawLink();
    gameObjectCollision(linkX,linkY,gameObjects,true);
    },1000/fps);
    drawGameObjects();
 }
 draw();