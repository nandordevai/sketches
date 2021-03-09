const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight();
ambientLight.color.setHSL(0, 0, 0.4);
const directionalLight = new THREE.DirectionalLight();
directionalLight.color.setHSL(0, 0, .8);
directionalLight.position.set(0, 3, 8);
const container = new THREE.Object3D();

const scene = new THREE.Scene();
scene.add(directionalLight);
scene.add(ambientLight);
scene.add(container);

const d = 30;
const maxDistance = 7;

class Node {
    constructor() {
        this.position = new THREE.Vector3(
            (Math.random() - .5) * d,
            (Math.random() - .5) * d,
            (Math.random() - .5) * d
        );
        this.neighbours = [];
    }

    setNeighbours(nodes) {
        this.neighbours = nodes.filter(this.isClose.bind(this));
    }

    isClose(node) {
        return node.position.distanceTo(this.position) < maxDistance;
    }

    drawConnections() {
        const m = new THREE.LineBasicMaterial();
        m.color.setHSL(0, 0, 1);
        this.neighbours.forEach((_) => {
            const g = new THREE.Geometry();
            g.vertices.push(_.position, this.position);
            const l = new THREE.Line(g, m);
            container.add(l);
        });
    }
}

const nodes = Array.from({ length: 150 }, () => new Node());
const sg = new THREE.SphereGeometry(.1, 16, 16);
const smat = new THREE.MeshLambertMaterial();
nodes.forEach((_) => {
    _.setNeighbours(nodes);
    const sm = new THREE.Mesh(sg, smat);
    sm.position.copy(_.position);
    container.add(sm);
    _.drawConnections();
});

function render(time) {
    container.rotateY(0.01);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

requestAnimationFrame(render);