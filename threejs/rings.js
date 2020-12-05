class Ring {
    constructor() {
        this.hue = Math.random();
        this.node = new THREE.Object3D();
        this.rotationSpeed = 0.03;
        this.speed = 0.5;
        for (let i = 0; i < 12; i++) {
            this.node.add(this.makeItem());
        }
        this.node.children.forEach((_, i) => {
            _.position.x = Math.sin(2 * Math.PI * i / 12);
            _.position.y = Math.cos(2 * Math.PI * i / 12);
            _.rotation.z = -(2 * Math.PI / 12 * i);
        });
    }

    makeItem() {
        const geometry = new THREE.BoxGeometry(0.3, 0.01, 2);
        const material = new THREE.MeshLambertMaterial();
        material.color.setHSL(this.hue, 0.8, 0.8);
        const item = new THREE.Mesh(geometry, material);
        return item;
    }

    update() {
        this.node.rotation.z += this.rotationSpeed;
        this.node.position.z += this.speed;
        if (this.node.position.z > 6) {
            this.node.position.z = -30;
        }
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

const rings = Array.from(Array(1), () => (new Ring()));
rings.forEach(_ => { scene.add(_.node); });

function render() {
    rings[0].update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
requestAnimationFrame(render);
