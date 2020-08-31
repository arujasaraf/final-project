var player;
var playerImage;
var sky;
var gameState ="PLAY"
var objectsGroup;
var score ;
function preload(){
  //loading images
playerImage=loadImage("player.png")
balloonImage1=loadImage("bird1.png")
balloonImage2=loadImage("bird2.png")
balloonImage3=loadImage("plane.png")
backgroundImg=loadImage("sky.png")
backgroundImg2=loadImage("sky2.jpg")
backgroundImg3=loadImage("sky3.png")
}
function setup() {
  createCanvas(displayWidth-325,displayHeight - 145);
 //createSprite(400, 200, 50, 50);
  
  //creating sky
  sky=createSprite(800,600)
  sky.addImage(backgroundImg);
  sky.scale=25.6;
  sky.velocityY=3.5;
  //creating the player
 player=createSprite(400,550)
 player.addImage(playerImage)
 player.scale=1.5;
// creating the left and the right edge
 pillar=createSprite(645,displayHeight/2,10,displayHeight)
 pillar.visible=false
 pillar1=createSprite(5,displayHeight/2,10,displayHeight)
 pillar1.visible=false
// player.debug=true
 player.setCollider("rectangle",0,0,35,65)
 objectsGroup= new Group();
 score=0
 
}

function draw() {
  background("black")
//console.log(sky.y);
 // if gameState play
if (gameState==="PLAY"){
  sky.velocityY=3.5;
  
  player.collide(pillar);
  player.collide(pillar1);
  score=score + Math.round(getFrameRate()/60)
//to move the player
  if(keyDown(LEFT_ARROW)){
    player.x=player.x-10
  }
  if (keyDown(RIGHT_ARROW)){
    player.x=player.x+10
  }
  //calling the function
  balloon();
  //to change the bg image
  if (score>250 &&score<=499){
    sky.addImage(backgroundImg2)
    sky.scale=20;
    sky.velocityY=2
    
  }
  if (sky.y>500){
    sky.y=sky.height/2;}
    
  if (score>500 && score<=700){
    sky.addImage(backgroundImg3)
    sky.scale=5.5;
    sky.velocityY=2
  }
  if (sky.y>500){
    sky.y=sky.height/2;
  }
//to end the game 
if (objectsGroup.isTouching(player)){
  gameState="END"
}}
//gameState end 
 else if(gameState==="END"){
  
    player.velocityY=0
    sky.velocityY=0
    //to destroy the balloon group
    objectsGroup.destroyEach();
  //to restart
    if(keyDown("space")){
      reset();
    }
  }

 
 

  drawSprites();
 if( gameState==="END"){
   textSize(30)
   fill("red")
  text("Press Space to restart",200,200);
 
 }
 textSize(15)
   fill("red")
 text ("Score :"+score,510,100)
}
function balloon (){
  //random objects 
  if(frameCount%30===0){
var balloon=createSprite(x=random(30,630),0,10,10);
balloon.velocityY=10
balloon.setCollider("rectangle",0,0,40,60)
//balloon.debug=true
//adding image
var rand = Math.round(random(1,3));
switch(rand){
 case 1 : balloon.addImage(balloonImage1);
 balloonImage1.scale=0.3
 break;
 case 2 :balloon.addImage(balloonImage2);
 balloonImage2.scale=0.3
 break;
 case 3:balloon.addImage(balloonImage3);
 balloonImage3.scale=0.3
 break;
 default: break;
}
//adding balloon to objrctsGroup
objectsGroup.add(balloon)
  }

}
//to restart the game 
function reset(){
  //changing the gameState to play again
gameState="PLAY";
frameCount=0
sky.addImage(backgroundImg)
sky.scale=25.6;
sky.velocityY=3.5;
if (sky.y>500){
  sky.y=sky.height/2;}
 
score=0


}
