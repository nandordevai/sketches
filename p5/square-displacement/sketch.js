const size = 400;
let steps = 10;
let phiMult = 5;
let maxDisplacement = 10;
const controls = [
    {
        min: 2,
        max: 50,
        callback: (c) => steps = c.value(),
        label: 'Steps',
        default: steps,
    },
    {
        min: 1,
        max: 20,
        callback: (c) => phiMult = c.value(),
        label: 'Rotation',
        default: phiMult,
    },
    {
        min: 1,
        max: 50,
        callback: (c) => maxDisplacement = c.value(),
        label: 'Displace',
        default: maxDisplacement,
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    noFill();
}

function draw() {
    background(255);
    tile_size = size / steps;
    noLoop();
    for (let x = 1; x < steps - 1; x++) {
        for (let y = 1; y < steps - 1; y++) {
            push();
            const displace = y * random(maxDisplacement) / 10;
            translate(tile_size * x + displace, tile_size * y + displace);
            const phi = phiMult * y / 500;
            rotate(random(-phi, phi));
            rect(0, 0, tile_size, tile_size);
            pop();
        }
    }
}
