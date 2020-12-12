const r = 250;

function setup() {
    createCanvas(400, 400, WEBGL);
    smooth();
}

function draw() {
    // noLoop();
    background(220);
    push();
    translate(0, 0, -50);
    noStroke();
    fill(230);
    ellipse(0, 0, r, r, 50);
    pop();
    // noFill();
    fill(255, 100);
    stroke(20);
    strokeWeight(2);
    rotateX(-PI / 4);
    rotateY(-PI / 4);
    box(50);
}