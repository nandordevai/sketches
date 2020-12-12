const size = 400;
const steps = 30
const tile_size = size / steps;

function setup() {
    createCanvas(size, size);
}

function drawRandomDiagonal(x1, y1, x2, y2) {
    if (random([true, false])) {
        line(x1, y1, x2, y2);
    } else {
        line(x1, y2, x2, y1);
    }
}

function draw() {
    noLoop();
    for (let x = 0; x < steps; x++) {
        for (let y = 0; y < steps; y++) {
            push();
            translate(tile_size * x, tile_size * y);
            drawRandomDiagonal(0, 0, tile_size, tile_size);
            pop();
        }
    }
}
