let imgBase;

let imgMid;
let imgTop;

function setup() {
    pixelDensity(displayDensity());
    const canvas = createCanvas(windowWidth, windowHeight);
    imgBase = createImage(width, height);
    imgMid = createImage(width, height);
    imgTop = createImage(width, height);
    noLoop();
}

function draw() {
    background(255);
    colorMode(HSL);
    const images = [{
        image: imgBase,
        color: color(45, 90, 88),
        noise: {
            details: [5, .25],
            scale: .01,
        },
        alpha: {
            scale: 100,
            offset: 105,
        },
    }, {
        image: imgMid,
        color: color(40, 30, 50),
        noise: {
            details: [7, .7],
            scale: .006,
        },
        alpha: {
            scale: 55,
            offset: 0,
        },
    }, {
        image: imgTop,
        color: color(35, 45, 10),
        noise: {
            details: [10, .8],
            scale: .003,
        },
        alpha: {
            scale: 25,
            offset: 0,
        },
    }];

    images.forEach(_ => {
        _.image.loadPixels();
        for (let y = 0; y < _.image.height; y++) {
            for (let x = 0; x < _.image.width; x++) {
                let i = ((y * _.image.width) + x) * 4;
                _.image.pixels[i] = red(_.color);
                _.image.pixels[i + 1] = green(_.color);
                _.image.pixels[i + 2] = blue(_.color);
                noiseDetail(..._.noise.details);
                _.image.pixels[i + 3] = noise(
                    x * _.noise.scale,
                    y * _.noise.scale
                ) * _.alpha.scale + _.alpha.offset;
            }
        }
        _.image.updatePixels();
    });

    imgBase.blend(imgMid, 0, 0, width, height, 0, 0, width, height, SCREEN);
    imgBase.blend(imgTop, 0, 0, width, height, 0, 0, width, height, SCREEN);
    image(imgBase, 0, 0, width, height);
}
