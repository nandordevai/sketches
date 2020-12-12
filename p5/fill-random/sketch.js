const size = 400;
const steps = 30;
const grid_size = size / steps;
const rows = [];
const cols = [];

function setup() {
    createCanvas(size, size);
    strokeWeight(2);
    for (let i = 0; i < steps; i++) {
        rows.push(random([0, 1]));
        cols.push(random([0, 1]));
    }
}

function draw() {
    noLoop();
    for (let x = 0; x < steps; x++) {
        push();
        translate(0, cols[x] * grid_size);
        for (let y = 0; y < steps; y++) {
            if (!(y % 2)) {
                line(x * grid_size, y * grid_size, x * grid_size, (y + 1) * grid_size);
            }
        }
        pop();
    }
    for (let y = 0; y < steps; y++) {
        push();
        translate(cols[y] * grid_size, 0);
        for (let x = 0; x < steps; x++) {
            if (!(x % 2)) {
                line(x * grid_size, y * grid_size, (x + 1) * grid_size, y * grid_size);
            }
        }
        pop();
    }
}
