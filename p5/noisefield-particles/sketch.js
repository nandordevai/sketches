const size = 400;
const step = 10;
const field = [];
let force = 10;
let pNum = 100;
const controls = [
    {
        min: 1,
        max: 20,
        label: 'Force',
        default: force,
        callback: (_) => force = _.value(),
    },
    {
        min: 50,
        max: 500,
        label: 'Particles',
        default: pNum,
        callback: (_) => pNum = _.value(),
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
}

function draw() {
    background(255);
    noLoop();
    stroke(color(0, 0, 0, 50));
    for (let i = 0; i < pNum; i++) {
        let p = new Particle(size);
        for (let t = 0; t < size; t++) {
            p.move(force * (noise(p.x / 100, t / 100) - 0.5));
            p.drawPoint();
            if (p.stopped) {
                const y = p.y + floor(random(1, 10));
                p = new Particle(size);
                p.y = y;
            }
        }
    }
}
