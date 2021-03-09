const containerSize = 40;
const maxDistance = 8;
const n = 150;
const curveDisplacement = 3;
const maxConnections = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = containerSize + 10;
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight();
directionalLight.color.setHSL(0, 0, .3);
directionalLight.position.set(0, 3, 8);

const fog = new THREE.Fog();
fog.color.setHSL(0, 0, 0);
fog.near = containerSize / 3;
fog.far = containerSize * 2.25

const scene = new THREE.Scene();
scene.add(directionalLight);

const container = new THREE.Object3D();
scene.add(container);
scene.fog = fog;

class Node {
    constructor() {
        this.position = new THREE.Vector3(
            (Math.random() - .5) * containerSize,
            (Math.random() - .5) * containerSize,
            (Math.random() - .5) * containerSize
        );
        this.neighbours = [];
    }

    setNeighbours(nodes) {
        this.neighbours = nodes
            .filter(this.isClose.bind(this))
            .slice(0, maxConnections);
    }

    isClose(node) {
        const d = node.position.distanceTo(this.position);
        return ((d < maxDistance) && (d > 0));
    }

    drawConnections() {
        this.neighbours.forEach((_) => {
            const mid = new THREE.Vector3();
            mid.copy(this.position);
            mid.lerp(_.position, .5);
            const offset = new THREE.Vector3(
                (Math.random() - .5) * curveDisplacement,
                (Math.random() - .5) * curveDisplacement,
                (Math.random() - .5) * curveDisplacement
            );
            mid.add(offset);
            const curve = new THREE.CatmullRomCurve3([
                this.position,
                mid,
                _.position
            ]);
            const g = new THREE.TubeGeometry(curve, 20, .15, 5, true);
            const mesh = new THREE.Mesh(g, material);
            container.add(mesh);
        });
    }
}

const material = new THREE.MeshLambertMaterial();
const color = new THREE.Color();
color.setHSL(.15, .8, .5);
material.emissive = color;
const nodes = Array.from({ length: n }, () => new Node());
const g = new THREE.SphereGeometry(.3, 16, 16);
nodes.forEach((_) => {
    _.setNeighbours(nodes);
    // TODO: remove duplicate connections
    if (_.neighbours.length) {
        const mesh = new THREE.Mesh(g, material);
        mesh.position.copy(_.position);
        container.add(mesh);
        _.drawConnections();
    }
});

function render(time) {
    container.rotateY(0.01);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

requestAnimationFrame(render);