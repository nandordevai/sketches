class Particle {
    constructor(maxX) {
        this.x = random(maxX);
        this.y = 0;
        this.age = 0;
        this.maxAge = floor(random(30, 100));
        this.started = false;
        this.stopped = false;
    }

    drawPoint() {
        if (!this.started) {
            noFill();
            beginShape();
            this.started = true;
        }
        strokeWeight(min(2, this.age / 5));
        vertex(this.x, this.y);
    }

    move(fx = 0) {
        if (!this.stopped) {
            this.y += 1;
            this.x += fx;
            this.age += 1;
            if (this.age >= this.maxAge) {
                endShape();
                this.stopped = true;
            }
        }
    }
}
