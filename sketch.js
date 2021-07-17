var moonbg, moonbgImg
var astronaut, astronautImg
var invisibleBlock
var coin, coinImg, coinG
var prize, priz_Img1, priz_Img2, prizeG
var obstacles, obstacle_Img1, obstacle_Img2, obstacle_Img3, obstacleG
var score = 0
var END = 0;
var PLAY = 1;
var gameState=PLAY;
var gameOver, gameOver_Img
var restart, restart_Img
var spaceSound
function preload() 
{
  moonbgImg = loadImage("moon backg.PNG")
  astronautImg = loadAnimation("astronaut2.png", "astronaut3.png", "astronaut1.png")
  coin_Img = loadImage("coin.png")
  prize_Img1 = loadImage("goldbag.png")
  prize_Img2 = loadImage("bottle.png")
  obstacle_Img1 = loadImage("alien.png")
  obstacle_Img2 = loadImage("ufo.png")
  obstacle_Img3 = loadImage("hole.png")
  gameOver_Img = loadImage("gameover.png")
  restart_Img = loadImage("restart.png")
  spaceSound=loadSound("jumpSound.ogg")
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  moonbg = createSprite(width/2, height/2,windowWidth,windowHeight);
  moonbg.addImage(moonbgImg)
  moonbg.scale = 3.0;

    moonbg.x = moonbg.width/2;
  astronaut = createSprite(width/8,height/2 );
  astronaut.addAnimation("runner", astronautImg);
  astronaut.scale = 0.5
  astronaut.velocityX=-5

  gameOver = createSprite(width/2,height-300)
 gameOver.addImage(gameOver_Img)
  gameOver.scale=1.0;
  //
  invisibleBlock = createSprite(width/2,height-100, width,height-380)
  invisibleBlock.visible = false;

  //  gameOver = createSprite()
  coinG = new Group();
  obstacleG = new Group();
  prizeG = new Group();

  astronaut.setCollider("rectangle", 0, 0, astronaut.width, astronaut.height);
  astronaut.debug = false;
}

function draw() 
{
  background(220);

  
if(gameState===PLAY){
score = score + Math.round(getFrameRate() / 60);
  
  
 moonbg.velocityX = -(8+2*score/100)
  
  gameOver.visible=false;
  //restart.visible=false;
  
  if (moonbg.x <500) 
  {
    moonbg.x = moonbg.width
  }
  if (astronaut.isTouching(invisibleBlock) ||keyDown("space") && astronaut.y >= 100) 
  {
  
    astronaut.velocityY = -10
    //  spaceSound.play();
    touches=[];
  }
  

  astronaut.velocityY = astronaut.velocityY + 0.15;
  var edges = createEdgeSprites();
  astronaut.collide(edges)
 if (astronaut.isTouching(coinG))
  {
    coinG.destroyEach();
    score = score + 20;
  } else if (astronaut.isTouching(prizeG)) 
  {
    prizeG.destroyEach();
    score = score + 100
  }
  Spawn_Obstales();
  prizes();

  if(keyWentDown(RIGHT_ARROW)){
    astronaut.x=astronaut.x+50
  }
  
  if(keyWentDown(LEFT_ARROW)){
    astronaut.x=astronaut.x-50
    astronaut.velocityY=-1;

  }
  
  if(keyWentDown(UP_ARROW)){
    astronaut.y=astronaut.y-100
    astronaut.scale=0.5
  }

  if(keyWentDown(DOWN_ARROW)){
    astronaut.y=astronaut.y+100
    astronaut.scale=0.25
  }
 if (astronaut.isTouching(obstacleG)) 
  {
    gameState = END;
   // astronaut.addAnimation("fall",gameOver_Img)
  }
}else if(gameState===END){
  
  
  gameOver.visible=true;
 // restart.visible=true;
  
  moonbg.velocityX=0;
  astronaut.destroy();
  prizeG.destroyEach();
  coinG.destroyEach();
  obstacleG.destroyEach();
  
 
}


 
 
  drawSprites();
  textSize(30)
  fill("white")
  textFont("Chiller")
  text("Score:" + score, width-100, 50)







}

function Spawn_Obstales() {
  if (frameCount % 200 == 0) {
    obstacle = createSprite(width-192, height-250)
    // obstacle.x=Math.round(random(100,500))
    obstacle.y = Math.round(random(100, 220))
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle_Img1);
        break;
      case 2:
        obstacle.addImage(obstacle_Img2);
        break;
      case 3:
        obstacle.addImage(obstacle_Img3);
        break;
      default:
        break;
    }

    obstacle.velocityX = -(6+2*score/100)
    obstacle.scale = 0.3
    obstacle.lifetime = 150
    obstacleG.add(obstacle)
  }
}

function prizes() {
  if (frameCount % 60 == 0) {
    coin = createSprite(width-298, height-422)
    // coin.x=Math.round(random(50,550))
    coin.y = Math.round(random(30, 200))
    coin.addImage(coin_Img)
    coin.velocityX = -3
    coin.lifetime = 280;
    coin.scale = 0.12
    coinG.add(coin)
  }
  if (frameCount % 500 == 0) {
    prize = createSprite(width-72, Math.round(random(10, 150)))
    prize.velocityX = -4;
    var gif = Math.round(1, 2)
    switch (gif) {
      case 1:
        prize.addImage(prize_Img1)
        break;
      case 2:
        prize.addImage(prize_Img2)
        break;
      default:
        break;
    }
    prize.lifetime = 200
    prize.scale = 0.2
    prizeG.add(prize)
  }
}
