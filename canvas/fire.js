const FireParticle = {
    x: null,
    y: null,
    size: null,
    weight: null,
    dirX: null,

    init(bbox) {
        const x = bbox.left + (bbox.width / 2);
        const y = bbox.top + Math.random() * 50;
        this.x = x + Math.random() * 200 - 100;
        this.y = y;
        this.weight = Math.random() * 1.5 + 2;
        this.size = Math.random() * 15 + 5;
        this.dirX = Math.random() * 2;
    },

    update() {
        this.y -= this.weight;
        this.x += this.dirX;
        this.size = Math.max(0, this.size - 0.2);
    },

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();
    },
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const fireEl = document.querySelector('.box');
const fireBbox = fireEl.getBoundingClientRect();
let particles = Array.from({length: 150}, createFireParticle);

function createFireParticle() {
    const p = Object.create(FireParticle);
    p.init(fireBbox);
    return p;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
        if (p.size <= 0) {
            p.init(fireBbox);
            continue;
        }
        p.update();
        p.draw();
    }
    requestAnimationFrame(animate);
}

animate();
