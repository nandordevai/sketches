const COLOR = 'hsla(29, 60%, 34%, 1)';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

class Particle {
    constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = COLOR;
        ctx.fill();
    }

    update() {
        if (this.x > width || this.x < 0) {
            this.dx *= -1;
        }
        if (this.y > height || this.y < 0) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function createParticles() {
    const size = Math.random() * 5 + 1;
    const x = Math.random() * ((width - size * 2) - (size * 2)) + (size * 2);
    const y = Math.random() * ((height - size * 2) - (size * 2)) + (size * 2);
    const dx = Math.random() * 5 - 2.5;
    const dy = Math.random() * 5 - 2.5;
    return new Particle(x, y, dx, dy, size, COLOR);
}

let particles = Array.from({ length: width * height / 9000 }, createParticles);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    for (const _ of particles) _.update();
    connect();
}

function connect() {
    for (const p1 of particles) {
        for (const p2 of particles) {
            const d = (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
            if (d < (width / 7 * height / 7)) {
                const opacity = 1 - (d / 20000);
                ctx.strokeStyle = `rgba(140, 85, 31, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

animate();
