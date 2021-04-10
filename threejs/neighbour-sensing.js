import * as THREE from './three.js/build/three.module.js';

const containerSize = 40;
const stepLength = 3;
const n = 200;
const randomGrowthFactor = 1.95;
const branchingProbability = 0.75;
const maxNeighbours = 2;
const maxDistance = 5;
const curveDisplacement = 1.5;
let enabled = true;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = containerSize + 10;
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight();
directionalLight.color.setHSL(0, 0, .3);
directionalLight.color.convertSRGBToLinear();
directionalLight.position.set(0, 3, 8);

const fog = new THREE.Fog();
fog.color.setHSL(0, 0, 0);
fog.color.convertSRGBToLinear();
fog.near = containerSize / 3;
fog.far = containerSize * 2.25;

const scene = new THREE.Scene();
scene.add(directionalLight);

const container = new THREE.Object3D();
scene.add(container);
scene.fog = fog;

class Node {
    constructor(parent = null) {
        this.position = new THREE.Vector3();
        this.direction = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize();
        this.tip = true;
        this.parent = parent;
        if (parent !== null) {
            this.direction.copy(parent.direction);
            this.position.copy(parent.position);
            const randomGrowth = this.getRandomGrowth();
            this.direction.add(randomGrowth);
            this.direction.normalize();
            const growth = new THREE.Vector3();
            growth.copy(this.direction);
            growth.multiplyScalar(stepLength);
            this.position.add(growth);
        }
    }

    getRandomGrowth(growthFactor = randomGrowthFactor) {
        return new THREE.Vector3(
            (Math.random() - .5) * growthFactor,
            (Math.random() - .5) * growthFactor,
            (Math.random() - .5) * growthFactor
        );
    }

    connectTo(other) {
        const mid1 = new THREE.Vector3();
        mid1.copy(this.position);
        mid1.lerp(other.position, .33);
        const offset1 = new THREE.Vector3(
            (Math.random() - .5) * curveDisplacement,
            (Math.random() - .5) * curveDisplacement,
            (Math.random() - .5) * curveDisplacement
        );
        mid1.add(offset1);
        const mid2 = new THREE.Vector3();
        mid2.copy(this.position);
        mid2.lerp(other.position, .66);
        const offset2 = new THREE.Vector3(
            (Math.random() - .5) * curveDisplacement,
            (Math.random() - .5) * curveDisplacement,
            (Math.random() - .5) * curveDisplacement
        );
        mid2.add(offset2);
        const curve = new THREE.CatmullRomCurve3([
            this.position,
            mid1,
            // mid2,
            other.position
        ]);
        const g = new THREE.TubeGeometry(curve, 20, .15, 5, false);
        const mesh = new THREE.Mesh(g, material);
        container.add(mesh);
    }

    beget() {
        return new Node(this);
    }

    branch() {
        const n1 = new Node(this);
        n1.direction.add(this.getRandomGrowth(randomGrowthFactor * 2));
        n1.direction.normalize();
        let n2;
        do {
            n2 = new Node(this);
            n2.direction.add(this.getRandomGrowth(randomGrowthFactor * 2));
            n2.direction.normalize();
        } while (n1.position.distanceTo(n2.position) > maxDistance);
        return [n1, n2];
    }

    getNeighbours() {
        return nodes.filter(_ => _.isCloseTo(this));
    }

    isCloseTo(other) {
        const d = this.position.distanceTo(other.position);
        return d < maxDistance && d > 0;
    }
}

const material = new THREE.MeshPhongMaterial();
const color = new THREE.Color();
color.setHSL(.15, .8, .5);
color.convertSRGBToLinear();
material.emissive = color;
material.shininess = 100;

const root = new Node();
root.position = new THREE.Vector3(-20, 0, 0);
root.direction = new THREE.Vector3(1, 0, 0);
let nodes = [root];
const g = new THREE.SphereGeometry(.15, 16, 16);
nodes.forEach((_) => {
    addNode(_);
});

function addNode(node) {
    const mesh = new THREE.Mesh(g, material);
    mesh.position.copy(node.position);
    container.add(mesh);
}

function grow() {
    const tips = [];
    nodes
        .filter(_ => _.tip)
        .forEach((parent) => {
            const branching = (parent.getNeighbours().length < maxNeighbours)
                && (Math.random() < branchingProbability);
            const children = branching ? parent.branch() : [parent.beget()];
            children.forEach((child) => {
                tips.push(child);
                addNode(child);
                child.connectTo(parent);
            });
            parent.tip = false;
        });
    nodes = nodes.concat(tips);
}

function render() {
    if (nodes.length < n && enabled) grow();
    if (enabled) {
        container.rotateY(0.01);
        renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

document.body.addEventListener('click', () => { enabled = !enabled; });
