const size = 400;
const steps = 12;
const noiseRate = 1500;
let yLimit = 80;
defaultLightness = 150;
const controls = [
    {
        min: 0,
        max: 200,
        default: yLimit,
        callback: (_) => yLimit = _.value(),
        label: 'Y limit',
        style: 'dark',
    },
];

function setup() {
    createCanvas(size, size);
    colorMode(HSL, 360, 360, 360);
    noFill();
    createControls(controls);
    frameRate(60);
}

function makeNoise(x, i) {
    return noise(x / noiseRate, i);
}

function drawLine(i, weight, color) {
    beginShape();
    const start = frameCount / 10;
    for (let x = 0; x < size; x++) {
        strokeWeight(weight);
        stroke(color);
        vertex(
            x,
            map(
                cos((((start + i) * 7) + x / 4) / 20) / 2 + makeNoise(x, i),
                -1, 1,
                -yLimit, yLimit
            )
        );
    }
    endShape();
}

function draw() {
    background(0);
    push();
    translate(0, size / 2);
    const colorOffset = map(sin(frameCount / 20), -1, 1, 0, 150);
    for (let i = 0; i < steps; i++) {
        drawLine(i, 6, color(15 * (i + 1) + colorOffset, 360, defaultLightness, 0.15));
        drawLine(i, 4, color(15 * (i + 1) + colorOffset, 360, defaultLightness + 50, 0.25));
        drawLine(i, 2, color(15 * (i + 1) + colorOffset, 360, defaultLightness + 150, 0.5));
    }
    pop();
}
