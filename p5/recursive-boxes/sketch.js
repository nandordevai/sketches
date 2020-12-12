const size = 400;
let steps = 8;
let diffMin = 6;
let diffMax = 10;
let maxOffset = 8;
let minOffset = 2;
const controls = [
    {
        min: 4,
        max: 20,
        label: 'Steps',
        callback: (c) => steps = c.value(),
        default: steps,
    },
    {
        min: 1,
        max: 10,
        label: 'Min diff',
        callback: (c) => diffMin = c.value(),
        default: diffMin,
    },
    {
        min: 4,
        max: 20,
        label: 'Max diff',
        callback: (c) => diffMax = c.value(),
        default: diffMax,
    },
    {
        min: 1,
        max: 10,
        label: 'Max offset',
        callback: (c) => maxOffset = c.value(),
        default: maxOffset,
    },
    {
        min: 0,
        max: 10,
        label: 'Min offset',
        callback: (c) => minOffset = c.value(),
        default: minOffset,
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    noFill();
}

function drawBox(x, y, l, offset, diff) {
    rect(x, y, l, l);
    if (l > diff) {
        translate(offset, offset);
        drawBox(x, y, l - diff, offset, diff);
    }
}

function draw() {
    background(255);
    noLoop();
    stroke(0);
    let tile_size = size / steps;
    for (let x = 1; x < steps - 1; x++) {
        for (let y = 1; y < steps - 1; y++) {
            push();
            translate(tile_size * x, tile_size * y);
            drawBox(0, 0, tile_size, min(diffMin, random(minOffset, maxOffset)), random(diffMin, diffMax));
            pop();
        }
    }
}
