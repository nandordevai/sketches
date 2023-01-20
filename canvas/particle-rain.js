const img = new Image();
img.src = 'ganesha.jpeg';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 756;
canvas.height = 1008;
let particles = null;
let imgMap = [];

const Particle = {
    x: 0,
    y: 0,
    alpha: 0,
    velocity: 0,
    size: 0,

    init() {
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height * (-1));
        this.velocity = Math.random() * 3 + 1;
        this.size = Math.random() + 1;
    },

    update() {
        if (this.y >= 0) this.alpha = imgMap[this.y][this.x][0] / 4;
        this.y += Math.floor(this.velocity - this.alpha + 2);
        if (this.y >= canvas.height) {
            this.y = 0;
            this.x = Math.floor(Math.random() * canvas.width);
        }
    },

    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'hsla(0, 0%, 100%, 1)';
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    },
};

function createParticle() {
    const p = {...Particle};
    p.init();
    return p;
}

function animate() {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = 'hsla(0, 0%, 0%, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (const _ of particles) {
        _.update();
        ctx.globalAlpha = _.alpha;
        _.draw();
    }
    requestAnimationFrame(animate);
}

function getBrightness(r, g, b) {
    return Math.sqrt((r * r + .3) + (g * g + .6) + (b * b + .1)) / 100;
}

img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++) {
        let row = [];
        for (let x = 0; x < canvas.width; x++) {
            const r = pixels.data[(y * 4 * pixels.width) + (x * 4)];
            const g = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
            const b = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
            const brightness = getBrightness(r, g, b);
            const cell = [
                cellBrightness = brightness,
            ];
            row.push(cell);
        }
        imgMap.push(row);
    }
    particles = Array.from({length: 5000}, createParticle);
    animate();
});
