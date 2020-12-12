const size = 400;
const steps = 20
const unit_size = size / steps;
const yscale_max = 110;
const xscale = 60;

function setup() {
    createCanvas(size, size);
    background(0);
}

function drawLine() {
    beginShape();
    vertex(0, size);
    for (let x = 0; x < size; x++) {
        let noiseval = map(noise(x / xscale), 0, 1, -0.5, 0.5);
        let yscale = yscale_max - abs(map(x, 0, size, -yscale_max, yscale_max));
        vertex(x, noiseval * yscale);
    }
    vertex(size, size)
    endShape();
}

function draw() {
    noLoop();
    // noFill();
    stroke(255);
    fill(0);
    for (let y = 2; y < steps - 1; y++) {
        noiseSeed(random(100));
        push();
        translate(0, unit_size * y);
        drawLine(y);
        pop();
    }
}
