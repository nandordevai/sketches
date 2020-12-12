const size = 400;
let maxD = 4;
let branches = 25;
let spread = 0.0000001;
let trees = 25;
const controls = [
    {
        min: 2,
        max: 20,
        label: 'Max D',
        default: maxD,
        callback: (_) => maxD = _.value(),
    },
    {
        min: 1,
        max: 20,
        label: 'Spread',
        default: spread * 100000000,
        callback: (_) => spread = _.value() / 100000000,
    },
    {
        min: 5,
        max: 50,
        label: 'Branches',
        default: branches,
        callback: (_) => branches = _.value(),
    },
    {
        min: 5,
        max: 50,
        label: 'Steps',
        default: trees,
        callback: (_) => trees = _.value(),
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    stroke(color(0, 0, 0, 40));
    strokeWeight(2);
    displayDensity(8);
    noFill();
}

function draw() {
    push();
    noLoop();
    background(255);
    translate(size / 2, size / 2);
    for (let t = 0; t < trees; t++) {
        rotate(TWO_PI / trees);
        for (let n = 0; n < branches; n++) {
            beginShape();
            for (let i = 0; i < random(130, 220); i++) {
                vertex(
                    map(
                        noise(i / 50, n / 2, t),
                        0, 1,
                        -maxD * (pow(i, 2) / 5000), maxD * (pow(i, 2) / 5000)
                    ) - ((n - branches / 2) * pow(i, 4) * spread / branches),
                    i
                );
            }
            endShape();
        }
    }
    pop();
}
