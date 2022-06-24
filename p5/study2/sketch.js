const _ = new p5((p5) => {
    const height = 600;
    const grid = height / 20;
    const width = grid * 30;

    p5.setup = () => {
        p5.noLoop();
        p5.pixelDensity(4);
        p5.smooth();
        p5.setAttributes('antialias', true);
        p5.createCanvas(width, height);
        p5.colorMode(p5.HSL, 360, 100, 100, 1);
        p5.rectMode(p5.CENTER);
    };

    p5.draw = () => {
        p5.background(0, 0, 100);
        p5.noStroke();
        p5.strokeWeight(0);
        let white = null;
        for (let x = 0; x < width; x += grid) {
            for (let y = 0; y < height; y += grid) {
                white = getBg(y);
                p5.fill(0, 0, white ? 100 : 0);
                p5.triangle(
                    x + grid / 2 - 1, y + 1,
                    x + grid / 2 - 1, y + grid / 2 - 1,
                    x + 1, y + grid / 2 - 1
                );
                white = getBg(y);
                p5.fill(0, 0, white ? 100 : 0);
                p5.triangle(
                    x + grid / 2 + 1, y + 1,
                    x + grid / 2 + 1, y + grid / 2 - 1,
                    x + grid - 1, y + grid / 2 - 1
                );
                white = getBg(y);
                p5.fill(0, 0, white ? 100 : 0);
                p5.triangle(
                    x + grid / 2 + 1, y + grid / 2 + 1,
                    x + grid - 1, y + grid / 2 + 1,
                    x + grid / 2 + 1, y + grid - 1
                );
                white = getBg(y);
                p5.fill(0, 0, white ? 100 : 0);
                p5.triangle(
                    x + grid / 2 - 1, y + grid / 2 + 1,
                    x + 1, y + grid / 2 + 1,
                    x + grid / 2 - 1, y + grid - 1
                );
                p5.fill(0, 0, 100);
                p5.push();
                p5.translate(x + grid / 2, y + grid / 2);
                p5.rotate(p5.PI / 4);
                p5.square(0, 0, grid / 4);
                p5.pop();
            }
        }
    };

    const getBg = y => p5.random(y) < height * .35;
});
