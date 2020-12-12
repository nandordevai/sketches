const size = 400;
const steps = 100;
let m = 0.75;
let phiLeft = 10;
let phiRight = 10;
const controls = [
    {
        min: 5,
        max: 50,
        label: 'Angle l',
        default: phiLeft,
        callback: (_) => phiLeft = _.value(),
    },
    {
        min: 5,
        max: 50,
        label: 'Angle r',
        default: phiRight,
        callback: (_) => phiRight = _.value(),
    },
    {
        min: 20,
        max: 80,
        label: 'Grow',
        default: m * 100,
        callback: (_) => m = _.value() / 100,
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    noFill();
    angleMode(DEGREES);
}

function draw() {
    noLoop();
    background(255);
    push();
    translate(size / 2, size - 20);
    let v = createVector(0, -90);
    line(0, 0, v.x, v.y);
    drawBranchesFromTrunk(v);
    pop();
}

function drawBranchesFromTrunk(v) {
    push();
    translate(v.x, v.y);
    v1 = v.copy();
    v1.mult(m);
    v1.rotate(-phiLeft);
    line(0, 0, v1.x, v1.y);
    if (v1.mag() > 10) {
        drawBranchesFromTrunk(v1);
    }
    pop();
    push();
    translate(v.x, v.y);
    v2 = v.copy();
    v2.mult(m);
    v2.rotate(phiRight);
    line(0, 0, v2.x, v2.y);
    if (v2.mag() > 10) {
        drawBranchesFromTrunk(v2);
    }
    pop();
}
