let circles = [];
let circleNum = 2;

function setup() {
    createCanvas(800, 600);
    frameRate(60);
    circles[0] = new Circle(width / 2, height / 2, 100, { r: 50, g: 0, b: 0 }, 0);
    circles[1] = new Circle(width / 2 + 20, height / 2 + 20, 100, { r: 100, g: 0, b: 0 }, 1);
}

function draw() {
    background(255);
    for (let i = 0; i < circleNum; i += 1) {
        circles[i].makeline();
    }
    for (let jj = 0; jj < circleNum; jj += 1) {
        circles[jj].makepoint();
    }
}

class Circle {
    constructor(px, py, pr, pcolor, pid) {
        this.x = px;
        this.y = py;
        this.r = pr;
        this.color = pcolor;
        this.id = pid;
    }

    makepoint() {
        fill(this.color.r, this.color.g,
            this.color.b, 80);
        noStroke();
        ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
    }

    makeline() {
        for (let p = this.id + 1; p < circleNum; p += 1) {
            let [p1, p2] = circles[this.id].intersect(circles[p]);
            fill(0);
            circle(p1[0], p1[1], 5);
            circle(p2[0], p2[1], 5);
        }
    }

    // https://mathworld.wolfram.com/Circle-CircleIntersection.html
    intersect(other) {
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
        }
    }
}
