const size = 2000;
let n = 12;
let x = 700;
let y = 750;
let r = 120;
const controls = [
    {
        min: 1,
        max: 50,
        label: 'N',
        default: n,
        steps: 1,
        style: 'dark',
        height: 'large',
        callback: (c) => n = c.value(),
    },
];

function setup() {
    noLoop();
    createCanvas(size, size);
    createControls(controls);
    background(0);
    noFill();
    strokeWeight(1);
    colorMode(HSL);
    stroke(0, 0, 100, 1);
}

function draw() {
    background(0);
    for (let i = 0; i < n; i++) {
        x1 = x - (r / 2 * Math.cos(i * Math.PI / (n / 2)));
        y1 = y - (r / 2 * Math.sin(i * Math.PI / (n / 2)));
        circle(x1, y1, r);
    }

    for (let i = 0; i < n; i++) {
        x1 = x - (r * .7 * Math.cos(i * Math.PI / (n / 2)));
        y1 = y + 300 - (r / 3.2 * Math.sin(i * Math.PI / (n / 2)));
        circle(x1, y1, r);
    }

    const n2 = 40;
    for (let i = 0; i < n2; i++) {
        x1 = x - (r * .7 * Math.cos(i * Math.PI / (n2 / 2)));
        y1 = y + 600 - (r / 3.2 * Math.sin(i * Math.PI / (n2 / 2)));
        //  change between r and 0
        // r - (0..1 * r)
        const scale = Math.cos(i * Math.PI / (n2 / 2));
        const r1 = Math.abs(r * scale);
        ellipse(x1, y1, r1, r);
    }

    // flower of life
    for (let r2 = 4 * r; r2 > 0; r2--) {
        let a = linexp(r2, 0, 4 * r, 1, 0);
        // let a = linlin(r2, 0, 2 * r, 1, 0);
        stroke(240, 100, 85, a);
        circle(x + 500, y, r2);
    }
    stroke(0, 0, 100, 1);
    circle(x + 500, y, r);
    circle(x + 500, y, r * 3);
    const phi = Math.PI / 3;
    const circles = [];
    for (let i = 0; i < 6; i++) {
        x1 = x + 500 - (r / 2 * Math.sin(i * phi));
        y1 = y - (r / 2 * Math.cos(i * phi));
        circles.push(new Circle(x1, y1, r));
        for (let j = 0; j < 6; j++) {
            x2 = x1 - (r / 2 * Math.sin(j * phi));
            y2 = y1 - (r / 2 * Math.cos(j * phi));
            circles.push(new Circle(x2, y2, r));
        }
    }
    circles.forEach(_ => _.draw());
    // fill(0, 0, 100);
    // circles.forEach((c1, i) => {
    //     circles.forEach((c2, j) => {
    //         if (i !== j) {
    //             c1.intersections(c2).forEach((p) => {
    //                 circle(p[0], p[1], 4);
    //             });
    //         }
    //     });
    // });

    const c1 = new Circle(1000, 1020, 100, 0);
    const c2 = new Circle(1020, 1100, 100, 0);
    c1.draw();
    c2.draw();
    c1.intersections(c2).forEach((_) => {
        circle(_[0], _[1], 4);
        console.log(_);
    });
}

class Circle {
    constructor(x, y, r, id = null) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.id = id;
    }

    draw() {
        circle(this.x, this.y, this.r);
    }

    intersections(other) {
        let dx = other.x - this.x;
        let dy = other.y - this.y;
        let d2 = dx * dx + dy * dy;
        let d = sqrt(d2);
        let rr2 = this.r * this.r;
        let RR2 = other.r * other.r;

        if (d < this.r + other.r && d > abs(this.r - other.r)) {
            let K = rr2 - RR2 + d2;
            let K2 = K * K;
            let h = sqrt(4 * rr2 * d2 - K2);
            let x1 = this.x + (dx * K + dy * h) / (2 * d2);
            let x2 = this.x + (dx * K - dy * h) / (2 * d2);
            let y1 = this.y + (dy * K - dx * h) / (2 * d2);
            let y2 = this.y + (dy * K + dx * h) / (2 * d2);
            return [[x1, y1], [x2, y2]];
        } else {
            return [];
        }
    }
}
