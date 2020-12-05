const sketch = new p5((p5) => {
    const width = 800;
    const height = 600;
    const r = 20;
    const vMod = 1.5;
    let t = 0;
    let g = 0.25;
    let ellipses = [];
    let location;
    let velocity;
    let canvas;

    p5.setup = () => {
        p5.colorMode(p5.HSB, 360, 100, 100, 1);
        canvas = p5.createCanvas(width, height, p5.WEBGL);
        location = p5.createVector(10, 0, 0);
        velocity = p5.createVector(2, 5, 3);
        velocity.mult(p5.createVector(vMod, vMod, vMod));
        p5.frameRate(30);
        p5.drawingContext.shadowOffsetX = 5;
        p5.drawingContext.shadowOffsetY = -5;
        p5.drawingContext.shadowBlur = 10;
        p5.drawingContext.shadowColor = 'black';
        $('body').style.background = '#000';
    };

    const box = (brightness = 50) => {
        p5.push();
        p5.noFill();
        p5.stroke(0, 0, brightness);
        p5.box(200);
        p5.pop();
    };

    const plane = (tx = 0, tz = 0, ry = 0) => {
        p5.push();
        p5.fill(0, 0, 30, 0.3);
        p5.noStroke();
        p5.translate(tx, 0, tz);
        p5.rotateY(ry);
        p5.plane(200);
        p5.pop();
    }

    p5.draw = () => {
        p5.background(0);
        p5.orbitControl();
        p5.noLights();
        p5.ambientLight(0, 0, 70, 0);
        p5.directionalLight(0, 0, 100, 1, 200, 200, -200);
        p5.camera(350 * Math.sin(t), 0, 450 * Math.cos(t), 0, 0, 0, 0, 1, 0);
        // ball
        p5.push();
        p5.translate(location);
        p5.noStroke();
        p5.fill(100, 100, 50);
        p5.sphere(r);
        p5.stroke(0);
        p5.pop();
        box(10);
        ellipses.forEach(_ => {
            p5.push();
            p5.noStroke();
            p5.fill(_.x + 100, p5.map(_.z, -100, 100, 40, 100), 100);
            p5.translate(_);
            p5.cylinder(10, 0);
            p5.pop();
        });
        if (100 - Math.abs(location.x) < r) {
            velocity.x *= -1;
            if (velocity.x < 0) {
                plane(100, 0, p5.PI / 2);
            } else {
                plane(-100, 0, p5.PI / 2);
            }
            box();
        }
        if (100 - Math.abs(location.y) < r) {
            ellipses.push(p5.createVector(location.x, location.y > 0 ? 100 : -100, location.z));
            velocity.y *= -1;
            if (velocity.y < 0) {
                velocity.y = -8;
            }
            box();
        }
        if (100 - Math.abs(location.z) < r) {
            velocity.z *= -1;
            if (velocity.z < 0) {
                plane(0, 100);
            } else {
                plane(0, -100);
            }
            box();
        }
        location.add(velocity);
        velocity.y += g;
        t += 0.01;
    };
}, 'sketch');
