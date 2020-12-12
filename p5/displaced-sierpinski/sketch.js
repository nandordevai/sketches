const x = 50;
const y = 350;
const size = 400;
const length = 300;
const minLength = 5;
let phi = 0.001;
const controls = [
    {
        min: 1,
        max: 100,
        label: 'Rotate',
        default: 1,
        callback: (c) => phi = c.value() / 1000,
    },
];

function setup() {
    createCanvas(size, size);
    createControls(controls);
    background(255);
    stroke('rgba(0, 0, 0, 0.2)');
    noFill();
}

function draw() {
    noLoop();
    background(255);
    generateSierpinskiTriangle(x, y, length)
}

function generateSierpinskiTriangle(x, y, length) {
    // TODO: displace the points individually using Perlin noise?
    if (length > minLength) {
        push();
        rotate(random(-phi, phi));
        triangle(x, y, x + length, y, x + length / 2, y - length / 3 * 2.6);
        pop();
        // left triangles
        generateSierpinskiTriangle(x + length / 2, y, length / 2);
        // right triangles
        generateSierpinskiTriangle(x, y, length / 2);
        // top triangles
        generateSierpinskiTriangle(x + length / 4, y - length / 2.3, length / 2);
    }
}
