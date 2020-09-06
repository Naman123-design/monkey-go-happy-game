
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime = 0;
var score = 0;

function preload(){
  monkey_running = loadImage("monkey_0.png",)
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}
function setup() {
  createCanvas(600, 600);
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  ground = createSprite(300,350,600,10);
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;
}
function draw() { 
  background(255);
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
  drawSprites();
  textSize(20);
  text("Score: "+ score, 500,50);  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
      textSize(50);
      text("GAME OVER", 250,300);
      
    }
  
  if(bananaGroup.isTouching(monkey)){
     score = score +5;
    bananaGroup.destroyEach();
     }
  
  textSize(20);
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 50 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
     banana.addImage(bananaImage);
     banana.scale=0.05;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;   
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
