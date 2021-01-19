let player = null;
let playerSpeed = 5;
let explosions = [];
let shootTimer = 0;
let explosionLife = 100;
let shotsPerSecond = 4;
let friendlyMissiles = [];
let gun = null;


function setup() {
    createCanvas(400, 400);

    player = createSprite(width / 2, height / 2, 20, 20);
    player.draw = DrawPlayer;

    gun = createSprite(width / 2, height - 50, 25, 25)

}

function draw() {
    background(0, 0, 0);

    MovePlayer();
    Shoot();
    RemoveDeadExplosions()

    drawSprites();
}

function CreateFriendlyMissile() {
    let startPosition = gun.position;
    let endPosition = player.position;
    let direction = p5; Vector.sub(endPosition, startPosition)

    let missile = createSprite(startPosition.x, startPosition.y, 5, 5);
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
        CreateExplosion(player.position.x, player.position.y);
        shootTimer = 0;
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