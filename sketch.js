var start;
var play;
var end;
var score = 0;

var bird, birdImage, startbutton, startbuttonImage;
var back, backImage, startback, startbackImage,birdI;
var restart, restartImage, gameover, overImage;
var upGroup, downGroup;
var down1, down2, down3, up1, up2, up3, up4;

var gameState = "start";

function preload() {

  birdImage = loadAnimation("bird1.png", "bird2.png", "bird3.png");
  birdI = loadAnimation("bird1.png");
  backImage = loadImage("back.jpg");
  startbackImage = loadImage("start.jpg");
  restartImage = loadImage("restart.png");
  overImage = loadAnimation("gameOver.png");
  startbuttonImage = loadAnimation("startbutton.png");

  down1 = loadImage("down1.jpg");
  down2 = loadImage("down2.jpg");
  down3 = loadImage("down3.png");

  up1 = loadImage("up1.jpg");
  up2 = loadImage("up2.png");
  up3 = loadImage("up3.jpg");

}

function setup() {
  createCanvas(600, 500);

  back = createSprite(525, 260, 20, 20);
  back.scale = 5;
  back.velocityX = -5;

  bird = createSprite(60, 160, 20, 20);
  bird.addAnimation("bird", birdImage);
  bird.scale = 0.3;

  startback = createSprite(300, 250, 20, 20);
  startback.scale = 2.5;

  startbutton = createSprite(300, 280, 25, 50);
  startbutton.addAnimation("button", startbuttonImage);
  startbutton.scale = 0.5;

  restart = createSprite(300, 280, 30, 60);
  restart.addImage("restart", restartImage);
  restart.scale = 0.3;
  restart.visible = false;

  gameover = createSprite(300, 200, 20, 20);
  gameover.addAnimation("over", overImage);
  gameover.scale = 0.5;
  gameover.visible = false;

  downGroup = new Group();
  upGroup = new Group();

}

function draw() {
  background("lightblue");
  text("Death:" + score, 30, 50)

  if (gameState === "start") {
    startback.addImage("background", startbackImage);

    startbutton.visible = true;

    if (mousePressedOver(startbutton)) {
      gameState = "play";
      startbutton.visible = false;
    }
  }

  if (gameState === "play") {

    startback.visible = false;
    camera.y = bird.y;
   
    back.addImage("back", backImage);

    if (back.x < 250) {
      back.x = width / 2;

    }
    back.velocityX = -5;
    spawnobstacledown();
    spawnobstacleup();

    if (keyDown("space")) {
      bird.y = bird.y - 5;

    } else {
      bird.y = bird.y + 1;
    }

    if (downGroup.isTouching(bird) ||
      upGroup.isTouching(bird)) {
      gameState = "end";

    }

  } else if (gameState === "end") {

    downGroup.setLifetimeEach(-1);
    upGroup.setLifetimeEach(-1);
    bird.y = 250;

    bird.addAnimation("bird", birdI);

    downGroup.setVelocityXEach(0);
    upGroup.setVelocityXEach(0);
    back.velocityX = 0;

    restart.visible = true;
    gameover.visible = true;

    if (mousePressedOver(restart)) {
      reset();
      gameState = "start";
    }
  }

  drawSprites();
}

function spawnobstacledown() {

  if (frameCount % 60 === 0) {
    var obstacledown = createSprite(800, 455);

    obstacledown.velocityX = -3;
    obstacledown.scale = 2;
    obstacledown.lifetime = 400;

    var rand = Math.round(random(1, 3));

    switch (rand) {

      case 1:
        obstacledown.addImage(down1);
        break;
      case 2:
        obstacledown.addImage(down2);
        break;
      case 3:
        obstacledown.addImage(down3);
        break;
      default:
        break;

    }
    downGroup.add(obstacledown);

  }
}

function spawnobstacleup() {
  if (frameCount % 60 === 0) {
    var obstacleabove = createSprite(600, 40);

    obstacleabove.velocityX = -3;
    obstacleabove.scale = 2;
    obstacleabove.lifetime = 400;

    var rand = Math.round(random(1, 3));

    switch (rand) {

      case 1:
        obstacleabove.addImage(up1);
        break;
      case 2:
        obstacleabove.addImage(up2);
        break;
      case 3:
        obstacleabove.addImage(up3);
        break;

      default:
        break;
    }
    upGroup.add(obstacleabove);

  }
}

function reset(){
  gameState = "play";
  restart.visible = false;
  gameover.visible = false;
  upGroup.destroyEach();
  downGroup.destroyEach();
}