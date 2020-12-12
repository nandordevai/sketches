const size = 400;
const steps = 30
const tile_size = size / steps;

function setup() {
    createCanvas(size, size);
}

function drawRandomLine(x1, y1, x2, y2) {
    if (random([true, false])) {
        const x = (x1 + x2) / 2;
        line(x, y1, x, y2);
    } else {
        const y = (y1 + y2) / 2;
        line(x1, y, x2, y);
    }
}

function draw() {
    noLoop();
    for (let x = 0; x < steps; x++) {
        for (let y = 0; y < steps; y++) {
            push();
            translate(tile_size * x, tile_size * y);
            drawRandomLine(0, 0, tile_size, tile_size);
            pop();
        }
    }
}
