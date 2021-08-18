
var trex ,trex_running;
var ground , Ground_move;
var invisibleground
var cloud,cloudimage
var obstacle,obstacleimg1,obstacleimg2,obstacleimg3,obstacleimg4,obstacleimg5,obstacleimg6
var obstaclegroup,cloudgroup
var PLAY=1
var END=0
var gamestate=PLAY
var trexcollided
var score=0

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  Ground_move=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  obstacleimg1=loadImage("obstacle1.png")
  obstacleimg2=loadImage("obstacle2.png")
  obstacleimg3=loadImage("obstacle3.png")
  obstacleimg4=loadImage("obstacle4.png")
  obstacleimg5=loadImage("obstacle5.png")
  obstacleimg6=loadImage("obstacle6.png")
  trex_collided=loadAnimation("trex_collided.png")
}

function setup(){
createCanvas(600,200)
  
//create a trex sprite
trex= createSprite(50,100,50,50)
trex.addAnimation("running",trex_running)
trex.addAnimation("collided",trex_collided)
trex.scale=0.5
ground= createSprite(100,180,700,30)
ground.addImage(Ground_move)
invisibleground= createSprite(100,195,600,20)
invisibleground.visible=false
obstaclegroup=new Group()
cloudgroup=new Group()
 }

function draw(){
  background("white")
  text("Score: "+score,200,50)
  if (gamestate==PLAY){
    score=score+Math.round(frameCount%100)
    if(keyDown("space")&&trex.y>100){
      trex.velocityY=-6 
    }
    trex.velocityY=trex.velocityY+0.5 
    ground.velocityX=-9 
    if(ground.x<0) {
      ground.x=ground.width/2
  } 
  spawncloud()
  spawnobstacle()
  if (trex.isTouching(obstaclegroup)){
  gamestate=END
  }
  }
  if (gamestate===END){
  obstaclegroup.setVelocityXEach(0)
  cloudgroup.setVelocityXEach(0)
  ground.velocityX=0
  trex.velocityY=0
  trex.changeAnimation("collided",trex_collided)
  }
  
  
  trex.collide(invisibleground)
  
    
  
  drawSprites() 

}
function spawncloud(){
if (frameCount%60===0){

cloud= createSprite(500,11,11,10)
cloud.velocityX=-4
cloud.addImage(cloudimage)
cloud.y=random(20,100)
cloudgroup.add(cloud)
}}
function spawnobstacle(){
if (frameCount%60===0){
obstacle= createSprite(500,170,10,10)
obstacle.velocityX=-5
obstacle.scale=0.5
var rand=Math.round(random(1,6))
switch(rand){
case 1: obstacle.addImage(obstacleimg1)
break;
case 2: obstacle.addImage(obstacleimg2)
break;
case 3: obstacle.addImage(obstacleimg3)
break;
case 4: obstacle.addImage(obstacleimg4)
break;
case 5: obstacle.addImage(obstacleimg5)
break;
case 6: obstacle.addImage(obstacleimg6)
break;
default:break
}
obstaclegroup.add(obstacle)
}}
