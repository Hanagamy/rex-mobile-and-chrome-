var PLAY = 1;
var END = 0;
var gameState = PLAY;

var obst 
var ponto = 0;
var obstani1,obstani2,obstani3,obstani4,obstani5,obstani6;
var rex, rexAni;
var soloani;
var solo;
var solocol;
var nuvem;
var nuvemani;
var nuvemgroup;
var cactusgroup;
var rexdrath;
var gameover;
var gameoverani;
var restart;
var restartani;
var morrer;
var pular;
var cem;
var menssagem = "local";

function preload(){
  rexAni = loadAnimation("trex1.png","trex3.png","trex4.png");
  rexdeath = loadImage("trex_collided.png");
  soloani = loadImage("ground2.png");
  gameoverani = loadImage("gameOver.png");
  restartani = loadImage("restart.png");
  nuvemani = loadImage("cloud.png");
  obstani1 = loadImage("obstacle1.png");
  obstani2 = loadImage("obstacle2.png");
  obstani3 = loadImage("obstacle3.png");
  obstani4 = loadImage("obstacle4.png");
  obstani5 = loadImage("obstacle5.png");
  obstani6 = loadImage("obstacle6.png");
  morrer = loadSound('die.mp3');
  pular = loadSound('jump.mp3');
  cem = loadSound('checkpoint.mp3');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  solocol = createSprite(width/2,height,width,20);
  solocol.visible = false;

  rex = createSprite(50,height-70,20,20);  
  rex.addAnimation('correr',rexAni);
  rex.addImage('morte',rexdeath);
  rex.scale = 0.5;

  solo = createSprite(width/2,height-10,width,20);
  solo.addImage('solo',soloani);
  rex.setCollider("rectangle",0,0,rex.width,rex.height);
  rex.debug=true;

  restart = createSprite(width/2,height/2,10,10);
  restart.addImage('restart',restartani);
  gameover = createSprite(width/2,height/2+45,10,10);
  gameover.addImage('endgame',gameoverani);
  cactusgroup = createGroup();
  nuvemgroup = createGroup();

  
}


function draw(){
   background('white');
  drawSprites();
  console.log(menssagem);

   text("Score: " + ponto,500,50);
  if(gameState === PLAY){
   
    restart.visible = false;
    gameover.visible = false;
  ponto = ponto + Math.round(getFrameRate()/60);
    //pular
    if((touches.length > 0||keyDown("space"))&&rex.collide(solocol)) {
    rex.velocityY = -12;
    pular.play();
    touches = [];
    }
    //gravidade
    rex.velocityY = rex.velocityY + 0.8;
    //solo anda
     solo.velocityX = -(5+3*ponto/100 );
    if(solo.x<0){
     solo.x = solo.width/2;
    }
    nuvens();
    cactu();
    if(rex.isTouching(cactusgroup)){
        gameState = END;
        morrer.play();
    }
    if(ponto>0&&ponto%100===0){
     cem.play();
    }

  }else if(gameState === END){
    solo.velocityX = 0;
    cactusgroup.setVelocityXEach(0);
    nuvemgroup.setVelocityXEach(0);
    rex.changeAnimation("morte", rexdeath);
    nuvemgroup.setLifetimeEach(-1);
    cactusgroup.setLifetimeEach(-1);
    rex.velocityY=0;
    restart.visible = true;
    gameover.visible = true;
    if(mousePressedOver(restart)){
      restartGame();
      }
  }
 

  //console.log(rex.y);

  rex.collide(solocol);

 
  
  }
  function nuvens(){

  if(frameCount % 90==0){
  nuvem = createSprite(width,300,40,10);
  nuvem.velocityX = -3;
  nuvem.addImage('nuvenssss',nuvemani);
  nuvem.scale = 0.15;
  nuvem.lifetime = 660;
  //ajustar a profundidade 
    nuvem.depth = rex.depth; 
    rex.depth = rex.depth + 1;
    nuvemgroup.add(nuvem);
  }
  }
  function cactu(){
  if(frameCount % 99===0){
  var cactus;
  cactus = createSprite(width,height-20,20,20)
  cactus.velocityX = -(5+3*ponto/100);
  var rand = Math.round(random(1,6));
  switch(rand){
    case 1: cactus.addImage(obstani1); 
            break;
    case 2: cactus.addImage(obstani2); 
            break;      
    case 3: cactus.addImage(obstani3); 
            break;
    case 4: cactus.addImage(obstani4); 
            break;
    case 5: cactus.addImage(obstani5); 
            break;
    case 6: cactus.addImage(obstani6); 
            break;
    default: break;
    
  }
  cactus.scale = 0.4;
  cactus.lifetime = 260;
  cactusgroup.add(cactus);
  }
  }
  function restartGame(){
    gameState=PLAY
   cactusgroup.destroyEach();
   nuvemgroup.destroyEach();
   rex.changeAnimation("correr", rexAni);
   ponto = 0
   
  }
