const size = 400;
let steps = 20;
const controls = [
    {
        min: 2,
        max: 50,
        callback: (c) => steps = c.value(),
        label: 'Steps',
        default: steps,
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    fill(0);
}

function drawShape(s) {
    switch (floor(random(7))) {
        case 0:
            ellipse(s / 2, s / 2, s * 0.8);
            break;
        case 1:
            triangle(0, 0, s, 0, 0, s);
            break;
        case 2:
            triangle(0, 0, s, 0, s, s);
            break;
        case 3:
            triangle(0, 0, s, s, 0, s);
            break;
        case 4:
            triangle(s, 0, s, s, 0, s);
            break;
        case 5:
            rect(0, 0, s / 2, s / 2);
            rect(s / 2, s / 2, s / 2, s / 2);
            break;
        case 6:
            rect(s / 2, 0, s / 2, s / 2);
            rect(0, s / 2, s / 2, s / 2);
            break;
    }
}

function draw() {
    background(255);
    tile_size = size / steps;
    noLoop();
    for (let x = 0; x < steps; x++) {
        for (let y = 0; y < steps; y++) {
            push();
            translate(tile_size * x, tile_size * y);
            drawShape(tile_size);
            pop();
        }
    }
}
