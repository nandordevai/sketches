const size = 400;
const steps = 50;
const yscale = 110;
const xscale = 60;
const offset = 40;

function setup() {
    createCanvas(size, size);
    noFill();
}

function drawLine() {
    beginShape();
    for (let x = 0; x < size + offset; x++) {
        let noiseval = map(noise(x / xscale), 0, 1, -0.5, 0.5);
        vertex(x, noiseval * yscale + size / 2);
    }
    endShape();
}

function draw() {
    noLoop();
    translate(-offset, 0);
    for (let y = 1; y < steps; y++) {
        background('rgba(255, 255, 255, 0.075)');
        noiseSeed(y);
        drawLine(y);
    }
}
