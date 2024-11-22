function setup() {
  createCanvas(800, 600);
}
let gameState = "start";
let x = 200; 
let y = 200;  
let yVelocity = 0; 
let xVelocity = 0; 
let gravity = 0.1; 
let thrust = 0.4;  
let speed = 2;     
let safeLandingSpeed = 3; 
let landingZoneX = 400; 
let landingZoneWidth = 100; 
let groundLevel = 560; 
let landedSafely = false; 

function emoji(x, y, s) {



    // left legs
    push();
    strokeWeight(4);
    stroke(0, 0, 0);
    translate(x - 35 * s, y);
    line(10 * s, -10 * s, -50 * s, 5 * s);
    line(10 * s, 0 * s, -50 * s, +18 * s);
    line(10 * s, -5 * s, -50 * s, +12 * s);
    line(10 * s, +7 * s, -50 * s, +25 * s);
    pop();
    
    //body 
    fill(105, 105, 105);
    ellipse(x , y , 80 * s, 60 * s);
    fill(128, 128, 128);
    ellipse(x - 30 * s, y + 10 * s, 50 * s, 35 * s);
    
    //eyes
    fill(245, 245, 245);
    ellipse(x - 50 * s, y + 6 * s, 20 * s);
    ellipse(x-15 * s, y+6 * s, 20 * s);
    fill(0, 0, 0);
    ellipse(x - 50 * s, y + 6 * s, 10 * s);
    ellipse(x-15 * s, y+6 * s, 10 * s);
    
    //mouth
    noFill();
    beginShape();
    stroke(0, 0, 0);
    curveVertex(x-10 * s, y-0 * s);
    curveVertex(x-20 * s, y+20 * s);
    curveVertex(x-37 * s, y+20 * s);
    curveVertex(x-5 * s, y+5 * s);
    endShape();
    
    //right legs
    
    push();
    translate(x-95 * s, y-60 * s);
    strokeWeight(4);
    stroke(0, 0, 0);
    line(+130 * s, 60 * s, +175 * s, +80 * s);
    line(+120 * s, 65 * s, +165 * s, +85 * s);
    line(+110 * s, 70 * s, +155 * s, +90 * s);
    line(+100 * s, 75 * s, +145 * s, +95 * s);
    pop();
    
    
    }
function startScreen() {
  background(160);
  textSize(32);
  rect( width / 2 - 100, height / 2 - 90, 250, 60);
  text("Spider Lander", width / 2 - 80, height / 2 - 50);
  textSize(16);
  rect( width / 2 - 50, height / 2 + 10, 150, 40);
  text("Press Key to Start", width / 2 - 40, height / 1.8);

  push();
emoji(x-50, y, 0.5); //left spider
emoji(x+400, y+200, 0.5); //right spider
emoji(x+300, y-100, 0.5); //middle spider
y = y + speed;
if (y > 200) {
  speed = speed * -1;
} else if (y < 150) {
  speed = speed * -1;
}
pop();

push();
  stroke(175, 54, 60);
  strokeWeight(5);
  fill(247, 104, 6);
  rect(0, 510, 900, 100);
pop();

push();
stroke(53, 33, 0);
strokeWeight(3);
fill(94, 72, 40);
ellipse(150, 300, 150, 50);
ellipse(500,  150, 150,50);
ellipse(600, 550, 150, 50);
pop();

  if (keyIsPressed && key === ' ') {
    gameState = "playing";
  }
}

function playGame() {
    background(125, 81, 81);
//decoration for the background
    push();
    noStroke();
    fill(255, 128, 0);
    ellipse(200, 200, 20, 20);
    ellipse(300, 200, 20, 20);
    ellipse(400, 200, 20, 20);
    ellipse(500, 200, 20, 20);
    ellipse(600, 200, 20, 20);
    ellipse(700, 200, 20, 20);
    ellipse(100, 200, 20, 20);
    ellipse(0, 200, 20, 20);
    ellipse(200, 300, 20, 20);
    ellipse(300, 300, 20, 20);
    ellipse(400, 300, 20, 20);
    ellipse(500, 300, 20, 20);
    ellipse(600, 300, 20, 20);
    ellipse(700, 300, 20, 20);
    ellipse(100, 300, 20, 20);
    ellipse(0, 300, 20, 20);
    ellipse(200, 400, 20, 20);
    ellipse(300, 400, 20, 20);
    ellipse(400, 400, 20, 20);
    ellipse(500, 400, 20, 20);
    ellipse(600, 400, 20, 20);
    ellipse(700, 400, 20, 20);
    ellipse(100, 400, 20, 20);
    ellipse(0, 400, 20, 20);
    ellipse(200, 200, 20, 20);
    ellipse(200, 200, 20, 20);
    ellipse(200, 200, 20, 20);
    ellipse(200, 200, 20, 20);
    pop();

//spiders at the background
    push();
emoji(500, 100, 0.3);
emoji(400, 250, 0.4);
emoji(600, 500, 0.5);
pop();


  // Landing zone
  noStroke();
  fill(94, 72, 40);
  rect(landingZoneX, groundLevel, landingZoneWidth, 100); // Landing area
  fill(247, 104, 6); // Red lava 
  rect(0, groundLevel, landingZoneX, 100);
  rect(landingZoneX + landingZoneWidth, groundLevel, width - (landingZoneX + landingZoneWidth), 100);

  // Spider web
  stroke(0, 0, 0); 
  strokeWeight(1);
  line(width / 2, 0, x, y - 30); 
  


  // Gravity effect
  yVelocity += gravity;

 
  if (keyIsDown(32)) { 
    yVelocity -= thrust;
}

  // Horizontal movement controls from Chat GPT 181-187 https://chatgpt.com/share/6740c383-fa38-8005-9e17-dd7073af3d5b
  if (keyIsDown(LEFT_ARROW)) {
    xVelocity = -speed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    xVelocity = speed;
  } else {
    xVelocity = 0;
  }


  x += xVelocity;
  y += yVelocity;

  // Spider
  emoji(x, y, 1);

  // Check for landing taken from ChatGPT 194-204 https://chatgpt.com/share/6740c383-fa38-8005-9e17-dd7073af3d5b
  if (y >= groundLevel - 10) { 
    if (x > landingZoneX && x < landingZoneX + landingZoneWidth && Math.abs(yVelocity) <= safeLandingSpeed) {
      landedSafely = true;
      gameState = "result"; // Landed safely
    } else {
      landedSafely = false;
      gameState = "result"; // Crashed
    }
    yVelocity = 0; 
  }
}

function resultScreen() {
  background(200);
  fill(0, 255, 0);
  textSize(32);
  if (landedSafely) {
    text("You Win! Landed Safely", width / 2 - 150, height / 2);
  } else {
    fill( 255, 0, 0);
    text("You Lose! Crashed", width / 2 - 120, height / 2);
  }
  textSize(16);
  fill(255, 255, 255);
  text("Press Key to Restart", width / 2 - 60, height / 2 + 40);
  if (keyIsPressed && key === ' ') {
    resetGame();
  }
}

// Reset game 
function resetGame() {
  gameState = "playing";
  x = 200;
  y = 50;
  yVelocity = 0;
  landedSafely = false;
}

// Main draw loop
function draw() {
  if (gameState === "start") {
    startScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "result") {
    resultScreen();
  }
}


