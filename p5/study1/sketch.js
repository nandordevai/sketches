const _ = new p5((p5) => {
    const grid = 10;
    const width = 800;
    const height = 600;

    p5.setup = () => {
        p5.noLoop();
        p5.pixelDensity(4);
        p5.smooth();
        p5.setAttributes('antialias', true);
        p5.createCanvas(width, height);
        p5.colorMode(p5.HSL, 360, 100, 100, 1);
    };

    p5.draw = () => {
        p5.background(0, 0, 100);
        p5.noStroke();
        p5.strokeWeight(0);
        for (let x = 0; x < width; x += grid) {
            for (let y = 0; y < height; y += grid) {
                let white = getBg(y);
                p5.fill(0, 0, white ? 100 : 0);
                p5.triangle(
                    x, y,
                    x + grid, y,
                    x, y + grid
                );
                white = getBg(y);
                p5.fill(0, 0, white ? 100 : 0);
                p5.triangle(
                    x + grid, y,
                    x, y + grid,
                    x + grid, y + grid
                );
            }
        }
    };

    const getBg = y => p5.random(y) < height / 10;
});
