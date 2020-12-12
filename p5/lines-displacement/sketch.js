const size = 400;
const steps = 30
const unit_size = size / steps;
const dval = 2;
const rmult = 9;

function setup() {
    createCanvas(size, size);
}

function drawSegment(i, y1, y2) {
    line(i * unit_size, y1, (i + 1) * unit_size, y2);
}

function drawLine(y) {
    push();
    translate(0, unit_size * y);
    let dy = 0;
    let prev_dy = 0;
    for (let x = 0; x < steps; x++) {
        dy = random(-dval, dval) * (x / rmult) * (y / rmult);
        drawSegment(x, prev_dy, dy);
        prev_dy = dy;
    }
    pop();
}

function draw() {
    noLoop();
    for (let y = 1; y < steps; y++) {
        drawLine(y);
    }
}
