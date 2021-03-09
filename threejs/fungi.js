const containerSize = 40;
const maxDistance = 8;
const n = 150;
const curveDisplacement = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = containerSize + 10;
camera.lookAt(0, 0, 0);

const ambientLight = new THREE.AmbientLight();
ambientLight.color.setHSL(0, 0, 0.4);
const directionalLight = new THREE.DirectionalLight();
directionalLight.color.setHSL(0, 0, .8);
directionalLight.position.set(0, 3, 8);
const spotLight = new THREE.SpotLight();
spotLight.color.setHSL(0, 0, .8);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);

const scene = new THREE.Scene();
// scene.add(directionalLight);
// scene.add(ambientLight);
// scene.add(spotLight);
// scene.add(spotLightHelper);

const container = new THREE.Object3D();
scene.add(container);

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
        this.neighbours = nodes.filter(this.isClose.bind(this));
    }

    isClose(node) {
        const d = node.position.distanceTo(this.position);
        return ((d < maxDistance) && (d > 0));
    }

    drawConnections() {
        // const m = new THREE.LineDashedMaterial({
        //     dashSize: .05,
        //     gapSize: .1,
        // });
        const m = new THREE.LineBasicMaterial();
        m.color.setHSL(0, 0, 1);
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
            const points = curve.getPoints(10);
            const g = new THREE.BufferGeometry().setFromPoints(points);
            const l = new THREE.Line(g, m);
            l.computeLineDistances();
            container.add(l);
        });
    }
}

const nodes = Array.from({ length: n }, () => new Node());
const sg = new THREE.SphereGeometry(.1, 16, 16);
const smat = new THREE.MeshLambertMaterial();
nodes.forEach((_) => {
    _.setNeighbours(nodes);
    _.drawConnections();
});

function render(time) {
    container.rotateY(0.01);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

requestAnimationFrame(render);