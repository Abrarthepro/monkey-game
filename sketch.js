
var END = 0;
var PLAY = 1;
var STOP = 2;
var gameState = STOP;
var bg,bgi,inv,vis,visi;
var monkey , monkeyrun
var banana ,bananaImage, rock, rockimage
var FoodGroup,rockgroup
var happy,happymon;
var score
var gameover,go,re,restart;
function preload(){
  bgi=loadImage("forest.jpg");
  visi=loadImage("images.png");
  monkeyrun =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  happy=loadImage("happy.jpg");
  bananaImage = loadImage("banana.png");
  rockimage = loadImage("obstacle.png");
 go=loadImage("gameover.jpg");
  re=loadImage("restart.jpg");
}



function setup() {
  createCanvas(400,400);
  bg=createSprite(200,200,200,020);
  bg.addAnimation("bgis",bgi);
 bg.scale=1.5;
   bg.x = bg.width /2;
  vis=createSprite(200,420,400,100);
  vis.addImage(visi);
 vis.scale=1.4;
   monkey=createSprite(50,300,10,10);
monkey.addAnimation("run",monkeyrun);
  monkey.scale=0.1;
happymon=createSprite(200,200,200,200);
 happymon.addImage(happy);
  happymon.scale=1;
  happymon.depth=10;
  happymon.visible=false;
  gameover=createSprite(200,190,10,10);
  gameover.addImage(go);
  gameover.scale=1.2;
  gameover.visible=false;
  restart=createSprite(200,370,10,10);
 restart.addImage(re);
  restart.scale=0.2;
  restart.visible=false;
  FoodGroup=createGroup();
  rockgroup=createGroup();
  score=0
}


function draw() {
background("green");
  if(keyDown("S")){
    gameState=PLAY
  }
  if(gameState===PLAY){
    food();
      rocks();
    if(keyDown("space")&&monkey.y>=280){
    monkey.velocityY=-22;    }
    monkey.velocityY=monkey.velocityY+1;
     bg.velocityX = -(4+score/3);
     if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1;
       
  }
 
    
  }
   if(monkey.isTouching(rockgroup)){
    gameState=END;
  }
if(gameState===END){
   rockgroup.destroyEach();
     FoodGroup.destroyEach();
     monkey.visible=false;
  bg.velocityX=0;
  restart.visible=true;
  gameover.visible=true;
  
}
  if(mousePressedOver(restart)&&gameState===END){
    gameState=STOP;
    gameover.visible=false;
    restart.visible=false;
    monkey.visible=true;
    score=0;
  }
  

 

 
   if (bg.x < 0){
      bg.x = bg.width/2;
    }
   inv=createSprite(200,320,400,1);
  inv.visible=false;
  
    monkey.collide(inv);
  drawSprites();
  textSize(15)
  stroke("black")
  strokeWeight(2.5);
  fill("darkgreen")
    text("reqScore=10||Score: "+ score, 160,30)
  if(score===10){
    happymon.visible=true;
     rockgroup.destroyEach();
     FoodGroup.destroyEach();
    textSize(30)
  stroke("black")
  strokeWeight(5);
  fill("darkgreen")
    text("thank you for feeding me",50,200);
   
    
  }
  if(gameState===STOP){
   textSize(15)
  stroke("black")
  strokeWeight(2.5);
  fill("darkgreen")
    text("reqScore=30||Score: "+ score, 160,30);
  text("A monkey has escaped from the zoo and is very hungry. ",15   ,70);
 text(" Help the monkey collect Bananas by jumping over obstacles",-1,90)
   text(" each banana he eats scores a point,he needs 10 bananas ",-1,130) 
    text(" to fulfill his lunch.Help him to finish his lunch to make him  ",-1,150) 
   text("happy",180,170);
    textSize(25)
    text("press s to start",120,350)
  }
}
function food(){
   if (frameCount % 90 === 0) {
  banana=createSprite(390,Math.round(random(50, 250)),10,10);
banana.addAnimation("ban",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-(5+score/3);
     banana.lifetime=90;
  FoodGroup.add(banana);
  return banana}
  
}
function rocks(){
  if (frameCount % 120 === 0) {
  rock=createSprite(400,280,10,10);
rock.addImage("rck",rockimage);
 rock.scale=0.2;
  rock.velocityX=-(5+score/3);
     rock.lifetime=90;
    rock.depth=1;
    rock.setCollider("circle",0,0,80);
  rockgroup.add(rock);
  return rock}
}




