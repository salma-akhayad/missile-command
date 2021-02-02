let player = null;
let gun = null;

// how fast the player moves
let playerSpeed = 10;
let explosions = [];
//how many milliseconds since last shot
let shootTimer = 0;
let explosionLife = 100;
let shotsPerSecond = 4;
let friendlyMissiles = [];

let enemyShootTimer=0;
let enemyShotsPerSencond=;



function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);

    player = createSprite(width / 2, height - 100, 20, 20);
    player.draw = DrawPlayer;

    gun = createSprite(width / 2, height - 40, 20, 20)

    emptyMissilesGroup

}

function draw() {
    background(0, 0, 0);

    MovePlayer();
    Shoot();
    RemoveDeadExplosions();

    CreateEnemyMissile();

    drawSprites();
}

function CreateFriendlyMissile() {
    let start = gun.position.copy();
    let end = player.position.copy();

    let direction = player.position.copy();
    direction.sub(start);

    let directionAngle = direction.heading();

    let missile = createSprite(start.x, start.y, 5, 5);
    missile.setSpeed(5, directionAngle);
    missile["goal"] = end;

    missile.draw = DrawFriendlyMissile;
}

function CreateEnemyMissile() {
    let startx = random(0, width);
    let start = createVector(startX, 0);
    let endX = random(0, width);
    let end = createVector(endX, 0);

    let direction = player.position.copy();
    direction.sub(start);

    let directionAngle = direction.heading();

    let missile = createSprite(start.x, start.y, 5, 5);
    missile.setSpeed(5, directionAngle);
    missile["goal"] = end;

    missile.draw = DrawFriendlyMissile;
}

function DrawFriendlyMissile() {
    circle(0, 0, this.width);

    let currentPosition = this.position;
    let goalPosition = this.goal;
    let distance = currentPosition.dist(goalPosition);

    if (distance < 5) {
        CreateExplosion(currentPosition.x, currentPosition.y);
        this.remove();
    }
}

function DrawEnemyMissile() {
    circle(0, 0, this.width);

    let currentPosition = this.position;
    let goalPosition = this.goal;
    let distance = currentPosition.dist(goalPosition);

    if (distance < 5) {
        CreateExplosion(currentPosition.x, currentPosition.y);
        this.remove();
    }
}

function RemoveDeadExplosions() {
    //kijk na of er nog explosies in de lkijst zitten
    //EN kijk na of de 1ste explosie in de lijst klaar is (life is gelijk aan 0)
    if (explosions.lenght > 0 && explosions[0].life == 0) {
        explosions.shift() //shift() verwijdert het 1STE item uit de lijst
    }
}

function Shoot() {
    shootTimer += deltaTime;
    if (keyIsDown(32) && shootTimer >= 1000 / shotsPerSecond) {

        shootTimer = 0;
        CreateFriendlyMissile();
    }
}

function CreateExplosion(x, y) {
    let explosion = createSprite(x, y, 5, 5);
    explosion.life = 100;
    explosions.push(explosion);
    explosion.draw = DrawExplosion;
}

function DrawExplosion() {
    circle(0, 0, this.width);
    this.width++;
    this.height++;
}

function DrawPlayer() {
    fill(0);
    stroke(255);
    strokeWeight(2);
    circle(0, 0, this.width);

    line(0, 5, 0, 20);
    line(0, -5, 0, -20);
    line(5, 0, 20, 0);
    line(-5, 0, -20, 0);

    /*
    line(0, 0, 0, 50);
    line(0, 50, -10, 70);
    line(0, 50, 10, 70);

    line(0, 25, -20, 10);
    line(0, 25, 20, 30);

    rect(25, 50, 30, 20, 5);*/
}

function MovePlayer() {
    if (keyIsDown(DOWN_ARROW)) {
        player.position.y += playerSpeed;
    }

    if (keyIsDown(UP_ARROW)) {
        player.position.y -= playerSpeed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += playerSpeed;
    }

    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= playerSpeed;
    }
}