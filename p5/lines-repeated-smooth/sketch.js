const size = 400;
const yscale = 200;
const xscale = 90;
const smoothing = 30;

let steps = 50;
let fade = 0.06;
const controls = [
    {
        min: 1,
        max: 10,
        callback: (c) => noiseDetail(c.value()),
        label: 'Detail',
        default: 4,
    },
    {
        min: 1,
        max: 75,
        callback: (c) => fade = c.value() / 100,
        label: 'Fade',
        default: 2,
    },
    {
        min: 1,
        max: 100,
        callback: (c) => steps = c.value(),
        label: 'Steps',
        default: 30,
    },
];

function setup() {
    createCanvas(size, size);
    noFill();
    createControls(controls);
}

function drawLine(y) {
    beginShape();
    for (let x = 0; x < size; x++) {
        let noiseval = map(noise(x / xscale, y / smoothing), 0, 1, -0.5, 0.5);
        vertex(x, noiseval * yscale + size / 2);
    }
    endShape();
}

function draw() {
    background(255);
    noLoop();
    for (let y = 1; y < steps; y++) {
        background(`rgba(255, 255, 255, ${fade})`);
        drawLine(y);
    }
}
