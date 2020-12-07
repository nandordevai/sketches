let xToLeft = 0;
let yToLeft = 0;
let xToRight = 0;
let yToRight = 0;
let xFromLeft = 0;
let yFromLeft = 0;
let xFromRight = 0;
let yFromRight = 0;
let time = 0;
const dTime = .003;
let seeds = null;
let hueOffset = 0;

const symmetric = new p5((p5) => {
    p5.setup = () => {
        p5.createCanvas(800, 800);
        p5.colorMode(p5.HSL);
        p5.strokeWeight(3);
        p5.strokeCap(p5.ROUND);
        p5.background(0, 0, 0);
        hueOffset = p5.random(360);
        seeds = Array.from(Array(3), () => Math.floor(p5.random(1000)));
        xFromLeft = p5.width / 2;
        yFromLeft = p5.height / 2;
        xFromRight = p5.width / 2;
        yFromRight = p5.height / 2;
    };

    p5.draw = () => {
        while (true) {
            time += dTime;
            p5.noiseSeed(seeds[0]);
            p5.strokeWeight(p5.map(p5.noise(time * 10), 0, 1, 2, 10));
            p5.stroke(((time * 15) + hueOffset) % 360, 90, p5.map(time, 0, 10, 0, 90));
            xFromLeft = xToLeft;
            yFromLeft = yToLeft;
            xFromRight = xToRight;
            yFromRight = yToRight;
            p5.noiseSeed(seeds[1]);
            xToLeft = p5.map(p5.noise(time), 0, 1, 0, p5.width);
            p5.noiseSeed(seeds[2]);
            yToLeft = p5.map(p5.noise(time), 0, 1, 0, p5.height);
            xToRight = p5.width - xToLeft;
            yToRight = yToLeft;
            p5.line(xFromLeft, yFromLeft, xToLeft, yToLeft);
            p5.line(xFromRight, yFromRight, xToRight, yToRight);
            if (time > 7) {
                break;
            }
        }
        p5.noLoop();
    };
});