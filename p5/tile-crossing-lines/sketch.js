const size = 400;
const steps = 15;
const tile_size = size / steps;

function setup() {
    createCanvas(size, size);
    strokeWeight(3);
}

function drawTile() {
    const x = tile_size / 4;
    const curve = 10;
    if (random([true, false])) {
        line(x, 0, x, tile_size);
        line(x * 3, 0, x * 3, tile_size);
    } else {
        bezier(
            x, 0,                  // anchor 1
            x, curve,                 // control 1
            x * 3, tile_size - curve, // control 2
            x * 3, tile_size       // anchor 2
        );
        bezier(
            x * 3, 0,          // anchor 1
            x * 3, curve,         // control 1
            x, tile_size - curve, // control 2
            x, tile_size       // anchor 2
        );
    }
}

function draw() {
    noLoop();
    translate(tile_size / 2, 0);
    for (let x = 0; x < steps - 1; x++) {
        for (let y = 0; y < steps; y++) {
            push();
            translate(tile_size * x, tile_size * y);
            drawTile();
            pop();
        }
    }
}
