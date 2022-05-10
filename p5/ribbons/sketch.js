const sketch = new p5((p5) => {
    const ratio = p5.windowWidth > 480 ? 1 : .5;
    const width = 900 * ratio;
    const height = 600 * ratio;
    let stripes = null;
    const n = 10;

    class Shape {
        constructor() {
            this.width = p5.random(15, 40) * ratio;
            this.height = p5.random(80, 300) * ratio;
            this.startTtl = p5.random(100, 500);
            this.ttl = this.startTtl;
            this.start = p5.createVector(
                p5.random(width),
                p5.random(-50, -100)
            );
            this.lengths = [
                p5.random(400, 800) * ratio,
                p5.random(-120, 20) * ratio,
                1000 * ratio,
            ];
            this.rotation = this.lengths[0] / 2;
            if (p5.random([true, false])) {
                this.start.sub(0, this.height);
            } else {
                this.start.sub(this.lengths[0], 0);
            }
            this.dx = .5 * ratio;
            this.dy = .25 * ratio;
            this.alpha = 1;
        }

        update() {
            this.start.x += this.dx;
            this.start.y += this.dy;
            this.ttl--;
            if (this.startTtl - this.ttl < 10) {
                this.alpha = p5.map(this.ttl, this.startTtl, this.startTtl - 10, 0, 1);
            } else {
                this.alpha = p5.map(this.ttl, 0, this.startTtl, 0, 1);
            }
            this.draw();
        }

        draw() {
            const {x, y} = this.start;

            let color = p5.color(0, 0, 60);
            color.setAlpha(this.alpha);
            p5.stroke(color);

            p5.fill(color);
            p5.beginShape();
            p5.vertex(x + this.lengths[0], y + this.rotation);
            p5.vertex(x + this.lengths[0], y + this.rotation + this.width);
            p5.vertex(x + this.lengths[0] - this.lengths[1], y + this.rotation + this.height + this.width);
            p5.vertex(x + this.lengths[0] - this.lengths[1], y + this.rotation + this.height);
            p5.endShape(p5.CLOSE);

            color = p5.color(0, 0, 100);
            color.setAlpha(this.alpha);
            p5.fill(color);
            p5.beginShape();
            p5.vertex(x, y);
            p5.vertex(x + this.lengths[0], y + this.rotation);
            p5.vertex(x + this.lengths[0], y + this.rotation + this.width);
            p5.vertex(x, y + this.width);
            p5.endShape(p5.CLOSE);

            p5.beginShape();
            p5.vertex(x + this.lengths[0] - this.lengths[1], y + this.rotation + this.height + this.width);
            p5.vertex(x + this.lengths[0] - this.lengths[1], y + this.rotation + this.height);
            p5.vertex(x + this.lengths[0] - this.lengths[1] + this.lengths[2], y + this.rotation + this.height * 2);
            p5.vertex(x + this.lengths[0] - this.lengths[1] + this.lengths[2], y + this.rotation + this.height * 2 + this.width);
            p5.endShape(p5.CLOSE);
        }
    }

    p5.setup = () => {
        p5.pixelDensity(4);
        p5.smooth();
        p5.setAttributes('antialias', true);
        p5.createCanvas(width, height);
        p5.colorMode(p5.HSL, 360, 100, 100, 1);
        shapes = Array.from({length: n}, () => new Shape());
    };

    p5.draw = () => {
        p5.background(0, 0, 0);
        p5.noStroke();
        shapes.forEach((_, i) => {
            _.update();
            if (_.ttl <= 0) {
                shapes[i] = new Shape();
            }
        });
    };
});
