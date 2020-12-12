const size = 400;
const step = 10;
const field = [];
let force = 50;
let sat = 50;
const controls = [
    {
        min: 20,
        max: 500,
        label: 'Force',
        default: force,
        callback: (_) => force = _.value(),
    },
    {
        min: 20,
        max: 100,
        label: 'Saturation',
        default: sat,
        callback: (_) => sat = _.value(),
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    noFill();
}

function draw() {
    background(0);
    strokeWeight(4);
    noLoop();
    for (let y = 0; y < step; y++) {
        field.push([]);
        for (let x = 0; x < step; x++) {
            field[y][x] = noise(x / 10, y / 10);
        }
    }
    const l = size / step;

    push();
    colorMode(HSL);
    translate(-l, 0);
    for (let x = 0; x < step; x++) {
        stroke(x * 10, sat, 70);
        beginShape();
        translate(l, 0);
        let pos = l / 2;
        curveVertex(pos, 0);
        for (let y = 0; y < step; y++) {
            curveVertex(pos, y * l);
            pos -= (field[x][y] - 0.5) * force;
        }
        curveVertex(pos, size);
        curveVertex(pos, size);
        endShape();
    }
    pop();
}
