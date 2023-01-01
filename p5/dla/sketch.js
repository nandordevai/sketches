const tree = [];
const n = 2000;
let walkers;
const r = 8;
let center = null;
const speed = 1;
let light = null;
const showWalkers = false;

function setup() {
    colorMode(HSL);
    createCanvas(600, 400);
    center = createVector(width / 2, height);
    walkers = Array.from(Array(n), _ => new Walker());
    tree.push(new Walker(width / 2, height, true));
    light = new Light();
}

function draw() {
    for (let i = 0; i < speed; i++) {
        calculate();
    }
    background(0);
    for (let i = 0; i < tree.length; i++) {
        tree[i].show();
    }
    if (showWalkers) {
        for (let i = 0; i < walkers.length; i++) {
            walkers[i].show();
        }
    }
    light.update();
    light.show();
    if (walkers.length === 0) {
        noLoop();
    }
}

function calculate() {
    for (let i = 0; i < walkers.length; i++) {
        if (walkers[i].isStuck(tree)) {
            tree.push(walkers[i]);
            walkers.splice(i, 1);
        } else {
            walkers[i].walk();
        }
    }
}

class Walker {
    constructor(x, y, stuck = false) {
        this.pos = createVector(x || random(width), y || random(height));
        this.stuck = stuck;
    }

    walk() {
        const hDrift = map(mouseX, 0, width, 0.5, -0.5);
        this.pos.x += random(-1, 1) + hDrift;
        this.pos.y += random(-1, 2);
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.pos.x = random(width);
        }
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.pos.y = random(width);
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.pos.y = random(width);
        }
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }

    dist(aPos, bPos) {
        const dx = aPos.x - bPos.x;
        const dy = aPos.y - bPos.y;
        return dx * dx + dy * dy;
    }

    isStuck(others) {
        for (let i = 0; i < others.length; i++) {
            const d = this.dist(this.pos, others[i].pos);
            if (d < (r * r / 4)) {
                this.stuck = true;
                break;
            }
        }
        return this.stuck;
    }

    show() {
        strokeWeight(r / 2);
        stroke(0, 0, this.stuck ? 100 : 50);
        point(this.pos.x, this.pos.y);
    }
}

class Light {
    constructor() {
        this.pos = createVector(width / 2, 0);
    }

    update() {
        this.pos.x = Math.min(width, mouseX);
    }

    show() {
        noStroke();
        const c = color(0, 0, 100);
        for (let i = 100; i > 0; i--) {
            c.setAlpha(map(i ** 2 / 100, 100, 0, 0, 0.5));
            fill(c);
            ellipse(this.pos.x, this.pos.y, i);
        }
    }
}