const size = 400;
const steps = 20;
const tile_size = size / steps;

function setup() {
    createCanvas(size, size);
}

function drawTile() {
    noFill();
    if (random([true, false])) {
        arc(0, 0, tile_size, tile_size, 0, HALF_PI);
        arc(tile_size, tile_size, tile_size, tile_size, PI, PI + HALF_PI);
    } else {
        arc(tile_size, 0, tile_size, tile_size, HALF_PI, PI);
        arc(0, tile_size, tile_size, tile_size, PI + HALF_PI, 2 * PI);
    }
}

function draw() {
    noLoop();
    for (let x = 0; x < steps; x++) {
        for (let y = 0; y < steps; y++) {
            push();
            translate(tile_size * x, tile_size * y);
            drawTile();
            pop();
        }
    }
}
