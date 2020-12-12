const size = 400;
let noiseMax = 20;
let rDiff = 20;
let rBase = 100;
let steps = 10;
let fade = 0.06;
const controls = [
    {
        min: 1,
        max: 50,
        default: noiseMax,
        callback: (c) => noiseMax = c.value(),
        label: 'Noise',
    },
    {
        min: 50,
        max: 400,
        default: rBase,
        callback: (c) => rBase = c.value(),
        label: 'R',
    },
    {
        min: 3,
        max: 200,
        default: rDiff,
        callback: (c) => rDiff = c.value(),
        label: 'R diff',
    },
    {
        min: 3,
        max: 100,
        default: steps,
        callback: (c) => steps = c.value(),
        label: 'Steps',
    },
    {
        min: 1,
        max: 75,
        callback: (c) => fade = c.value() / 100,
        label: 'Fade',
        default: 2,
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    noFill();
}

function draw() {
    background(255);
    noLoop();
    stroke(0);
    push();
    translate(size / 2, size / 2);
    for (let s = 0; s < steps; s++) {
        background(`rgba(255, 255, 255, ${fade})`);
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.01) {
            let xoff = map(cos(i), -1, 1, 0, noiseMax);
            let yoff = map(sin(i), -1, 1, 0, noiseMax);
            let r = map(noise(xoff, yoff, s / 10), 0, 1, rBase - rDiff, rBase + rDiff);
            let x = r * cos(i);
            let y = r * sin(i);
            vertex(x, y);
        }
        endShape(CLOSE);
    }
    pop();
}
