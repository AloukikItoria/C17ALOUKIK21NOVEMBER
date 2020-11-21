//SECTION-1Declaring gobal variables For storing image sound animation and for creating sprite name
var trex, trexImage, edges;
var ground,groundImage;
var g2;
var ob1,ob2,ob3,ob4,ob5,ob6;
var score  = 0;
var cloudImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloudGroup,obstacleGroup;
var gameOverI,gameOver;
var trexCollided;
var restart,restart;
var dieS;
var checkPointS;
var jumpS;

//section 2 preloading images sounds animation

function preload(){
  trexImage = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
 
  
   ob1 = loadImage("obstacle1.png");
  
  ob2 = loadImage("obstacle2.png");
  
  ob3 = loadImage("obstacle3.png");
  
  ob4 = loadImage("obstacle4.png");

  ob5 = loadImage("obstacle5.png");
  
  ob6 = loadImage("obstacle6.png");
  
  trexCollided = loadImage("trex_collided.png");
  
  gameOverI = loadImage("gameOver-1.png");
  
  restartI = loadImage("restart.png");
  
  jumpS = loadSound("jump.mp3");
  
  dieS = loadSound("die.mp3");
  
  checkPointS = loadSound("checkPoint.mp3");
  
  
  
  
}

//Section 3 sprite creation adding images / animations and scaling them

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trexImage);
  trex.addImage("collided",trexCollided);
  trex.scale = 0.5;
  trex.x = 50
  trex.debug = false;
  //shape of coollider can be cicle or rectangle
  //0,0 overlaap center of animation and collider
  //40 is the diameter of collider
  trex.setCollider("circle",0,0,40);
  
  //creating ground
  ground = createSprite(300,180,600,30)
  ground.addImage("image",groundImage);
  
  //creating GameOver
  gameOver = createSprite(300,110,10,10);
  gameOver.addImage("gameOver",gameOverI);
  gameOver.scale = 0.5
 
  
  
  //creating Restart
  restart = createSprite(300,130,10,10);
  restart.addImage("restart",restartI);
  restart.scale = 0.3
  
  
  //creating invisible ground 
  g2 = createSprite(300,200,600,30);
  g2.visible = false
  
  //creating groups ---- groups are created to acess the local variables created inside are user defined function
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  
  
  
  
  
  edges = createEdgeSprites();
  
  
}


function draw(){
  //set background color 
  background("white");
  
  //DIVIDING INTO DIFFERENT PLAY STATES
  if(gameState===PLAY){
    
    
  //callculating score and displaying
  text("score " + score,400,50);
  score = score + Math.round(getFrameRate()/ 60);
    if( score % 100===0&score<0){
      checkPointS.play();
      
      
    }
  //giving ground velocity
  ground.velocityX  = -6;
  //reseting the ground
  if(ground.x<0){
    ground.x=300;
      
  }      
  
  //jump when space key is pressed
  if(keyDown("space")&& trex.y>161){
    trex.velocityY = -10;
    jumpS.play();
  }
  //adding gravity to trex
  trex.velocityY = trex.velocityY + 0.5;
    //calling functions
  spawnClouds();
  spawnObstacles();
    
    //endstate
    if(trex.isTouching(obstacleGroup)){
     gameState = END
     dieS.play();
     // trex.velocityY = -10
      
    }
    
    gameOver.visible = false;
    restart.visible = false;
    
  }
  else if(gameState===END){
    ground.velocityX = 0;
    
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trexCollided);
    gameOver.visible = true;
    restart.visible = true;
  
  }
  
  
    
  
  
  //stop trex from falling down
  trex.collide(g2);
  
  //adding restart function
  if(mousePressedOver(restart)){
     restart1();
     } 
  //console.log(trex.y);
  
  drawSprites();
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  //a % b will give the reimander of a / b
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    //lifetime = width of canvas/speed(velocity)
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    //adding to group
    cloudGroup.add(cloud);
    
    }
  
}

function spawnObstacles(){
  if (frameCount % 60===0){
    
   var obstacle = createSprite(600,165,10,10);
    obstacle.velocityX = -(4+score/100);
    obstacle.scale = 0.5; 
    
  
  
  var num = Math.round(random(1,6));
  switch(num){
      
    case 1: obstacle.addImage("abc" , ob1)
    break;
    case 2: obstacle.addImage("abc" , ob2)
    break;
    case 3: obstacle.addImage("abc" , ob3)
    break;
    case 4: obstacle.addImage("abc" , ob4)
    break;
    case 5: obstacle.addImage("abc" , ob5)
    break;
    case 6: obstacle.addImage("abc" , ob6)
    break;
    default:break;
    
    
  }
    
     obstacle.lifetime = 150    
  
  //adding to groups
    obstacleGroup.add(obstacle);
  }
}

function restart1(){
  
  gameState = PLAY;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0;
  trex.changeAnimation("running", trexImage);
  
}