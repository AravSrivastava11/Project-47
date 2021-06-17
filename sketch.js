//creating variables from object
var spacebg, bulletsImg;
var space;

var lifeSpaceship, lifeSpaceshipImg, lifeSpaceshipGroup;

var spaceship, spaceshipImg;

var enemy, enemy1Img, enemy2Img, enemy3Img, enemyboss, enemybossImg;
var enemyGroup;

var edges;

var bullet;
var bulletGroup;

var enemyBullet, enemyBulletImg, enemyBulletGroup;

var gameState = 0;

var counter = 3;

var score = 0;

var flag = false;

function preload(){
    //loading images 
    spacebg = loadImage("spacebg.jpg");
    spaceshipImg = loadImage("spaceship.png");

    enemy1Img = loadImage("enemy1.png");
    enemy2Img = loadImage("enemy2.png");
    enemy3Img = loadImage("enemy3.png");

    enemybossImg = loadImage("enemyboss.png");

    enemyBulletImg = loadImage("enemyBullets.png");

    bulletsImg = loadImage("spaceshipBullet.png");

    lifeSpaceshipImg = loadImage("spaceship.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight-150);

  //background sprite
  space = createSprite(0,0,width,height);
  space.addImage(spacebg);
  space.scale = 2.5;

  //player spaceship
  spaceship = createSprite(width/5,height/2);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.5;

  //creating enemy group
  enemyGroup = createGroup();

  //creating enemy Bullet Group
  enemyBulletGroup = createGroup();

  //creating bullet group
  bulletGroup = createGroup();

  //creating lifespaceship group
  lifeSpaceshipGroup = createGroup();

  lifeSpaceship();

}

function draw(){
    background(0);

    //creatig edges
    edges = createEdgeSprites();

    //adding gamestates
    if(gameState === 0){
        //infinite background
        space.velocityX = -2;

        if(space.x <0 ){
            space.x = space.width/2;
        }

        //moving the spaceship with arrows
        if(keyDown (UP_ARROW)){
            spaceship.y -= 10;
        }
        if(keyDown(DOWN_ARROW)){
            spaceship.y += 10;
        }

        if(keyWentDown("space") && flag === true){
            spawnBullets();
        }

        //destroying enemies if they touch lasers
        if(bulletGroup.isTouching(enemyGroup)){
            enemyGroup.destroyEach();
            bulletGroup.destroyEach();

            score = score + 10;
        }

        if(bulletGroup.isTouching(enemyBulletGroup)){
            bulletGroup.destroyEach();
            enemyBulletGroup.destroyEach();

            score = score+5;
        }

        //colliding spaceships with edges
        spaceship.collide(edges[2]);
        spaceship.collide(edges[3]);
        enemyGroup.bounceOff(edges[2]);
        enemyGroup.bounceOff(edges[3]);

        //spawning enemy bullets when the enemies appear
        if(World.seconds>8 ){
            spawnEnemyBullet();
        }

         spawnEnemies();

        if(enemyGroup.isTouching(spaceship) || enemyBulletGroup.isTouching(spaceship) ){
           //gameState = 1;

            counter--;
            console.log(counter);

            enemyBulletGroup.destroyEach();
            enemyGroup.destroyEach();

            if(lifeSpaceshipGroup.contains(lifeSpaceship)){
                (lifeSpaceshipGroup.get(0)).destroy();
            }

            if(counter===0){
                gameState = 1;
            }
        }
    }
    else if(gameState === 1){
        spaceship.destroy();
        space.velocityX = 0;
        enemyGroup.destroyEach();
        enemyBulletGroup.destroyEach();
        bulletGroup.destroyEach();
    }

    
     drawSprites();

     textSize(30);
     fill("white");
     text("SCORE : " + score, width-300, 50);
}

function spawnEnemies(){
    //spawning enemy spaceships at random

    if(frameCount % 200 === 0){
        enemy = createSprite(width+100, Math.round(random(height/4, height-200)), 20, 20);

        

        var rand = Math.round(random(1,3));

        switch(rand){
            case 1: 
                enemy.addImage(enemy1Img);
                enemy.scale = 1.3;
                break;
            case 2:   
                enemy.addImage(enemy2Img);
                enemy.scale = 0.5;
                break;
            case 3: 
                enemy.addImage(enemy3Img);
                enemy.scale = 0.5;
                break;

            default:break
        }
       
        enemy.rotation = -90;
        enemy.velocityX = -2;
        enemy.velocityY = -2;
        enemy.lifetime = width/2;

        enemyGroup.add(enemy);
        
        flag = true;
    }
 
}

function spawnBullets(){
    //spawning bullets
    bullet = createSprite(spaceship.x, spaceship.y, 20, 5);
    bullet.addImage(bulletsImg);
    bullet.scale = 0.3;
    bullet.shapeColor = color(247, 0, 0);
    bullet.velocityX = 8;
    bullet.lifetime = width/8;
    spaceship.depth = bullet.depth+1;
    
    bulletGroup.add(bullet);
}

function spawnEnemyBullet(){
     //spawning enemy bullets
    if(frameCount % 80===0){

        enemyBullet = createSprite(width+100, Math.round(random(height/4, height-200)),20,5);
        enemyBullet.addImage(enemyBulletImg);
        enemyBullet.scale = 0.3;
        enemyBullet.velocityX = -8;
        enemyBullet.shapeColor = "red";
        enemyBullet.lifetime = width/8;

        enemyBulletGroup.add(enemyBullet);
    }
}

function lifeSpaceship(){  
    for(var i = 40; i<300; i=i+100){
        lifeSpaceship = createSprite(i,50,2,2);
        lifeSpaceship.addImage(lifeSpaceshipImg);
        lifeSpaceship.rotation = 270;
        lifeSpaceship.scale = 0.2;

        lifeSpaceshipGroup.add(lifeSpaceship);
    }
}