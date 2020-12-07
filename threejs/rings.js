class Ring {
    constructor(zPos) {
        this.hue = Math.random();
        this.node = new THREE.Object3D();
        this.node.rotation.z = Math.random();
        this.rotationSpeed = random(-0.03, 0.03);
        this.spin = random(-0.1, 0.1);
        this.speed = 0.2;
        this.r = map(Math.random(), 0, 1, 1, 4);
        this.itemWidth = random(0.1, 0.4) * this.r * 2;
        this.material = new THREE.MeshLambertMaterial();
        this.material.color.setHSL(this.hue, 1, 0);
        for (let i = 0; i < 12; i++) {
            this.node.add(this.makeItem());
        }
        this.node.position.z = zPos;
        this.node.children.forEach((_, i) => {
            _.position.x = Math.sin(2 * Math.PI * i / 12) * this.r;
            _.position.y = Math.cos(2 * Math.PI * i / 12) * this.r;
            _.rotation.z = -(2 * Math.PI / 12 * i);
        });
    }

    makeItem() {
        const geometry = new THREE.BoxGeometry(this.itemWidth, 0.1, 2);
        const item = new THREE.Mesh(geometry, this.material);
        return item;
    }

    update() {
        this.material.color.setHSL(this.hue, 1, map(this.node.position.z, -25, 6, 0.2, 0.8));
        this.node.rotation.z += this.rotationSpeed;
        this.node.position.z += this.speed;
        this.node.children.forEach((_) => {
            _.rotation.z += this.spin;
        });
    }
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 0;
camera.lookAt(0, 0, 0);
const scene = new THREE.Scene();
const light = new THREE.DirectionalLight();
const aLight = new THREE.AmbientLight();
light.position.set(0, 2, 3);
light.color.setHSL(0, 0, 0.5);
scene.add(light);
scene.add(aLight);

const numRings = 12;
const maxZ = 6;
const startZ = -2;
const rings = Array.from(Array(numRings), (_, i) => (new Ring((i + 1) * startZ)));
rings.forEach(_ => { scene.add(_.node); });

function render(time) {
    for (let i = rings.length - 1; i >= 0; i--) {
        rings[i].update(time);
        if (rings[i].node.position.z > maxZ) {
            rings.splice(i, 1);
        }
    }
    for (let i = 0; i <= numRings - rings.length; i++) {
        const ring = new Ring((numRings + 1) * startZ);
        rings.push(ring);
        scene.add(ring.node);
    };
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
requestAnimationFrame(render);
