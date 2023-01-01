const threshold = 0.1;
let yPos = 0;
let xPos = 0;

let tiltingBox = new p5((p5) => {
    const boxes = [];
    const boxSize = 50;
    const movementScale = 1;

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight + 20, p5.WEBGL);
        for (let i of Array(5).keys()) {
            for (let j of Array(10).keys()) {
                boxes.push({
                    x: i * boxSize,
                    y: j * boxSize,
                    height: p5.random(12) * 25 + 200
                });
            }
        }
    };

    p5.draw = () => {
        p5.background(10);
        p5.translate(-100, -200, -100);
        p5.ambientLight(100, 100, 100);
        p5.directionalLight(226, 226, 226, 0.5, 0.5, 0.25);
        for (b of boxes) {
            p5.push();
            p5.translate(b.x, b.y, b.height / 2);
            p5.box(boxSize, boxSize, b.height);
            p5.pop();
        }
        p5.camera(
            0 - xPos * movementScale, 0 - yPos * movementScale, 1000,
            0, 0, 0,
            0, 1, 0
        );
    };

    p5.mouseMoved = () => {
        yPos = p5.mouseY - p5.height / 2;
        xPos = p5.mouseX - p5.width / 2;
    };
});
