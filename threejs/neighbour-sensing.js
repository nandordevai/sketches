import * as THREE from './three.js/build/three.module.js';

const containerSize = 40;
const stepLength = 2.5;
const n = 100;
const randomGrowthFactor = 0.75;
const branchingProbability = 0.5;
const maxNeighbours = 3;
const maxDistance = 5;
let enabled = true;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = containerSize + 10;
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight();
directionalLight.color.setHSL(0, 0, .3);
directionalLight.position.set(0, 3, 8);

const fog = new THREE.Fog();
fog.color.setHSL(0, 0, 0);
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
            const growth = new THREE.Vector3();
            growth.copy(this.direction);
            growth.multiplyScalar(stepLength);
            this.position.add(growth);
            const randomGrowth = this.getRandomGrowth();
            this.direction.add(randomGrowth);
            this.direction.normalize();
        }
    }

    getRandomGrowth(growthFactor = randomGrowthFactor) {
        // if (growthFactor === null) growthFactor = randomGrowthFactor;
        return new THREE.Vector3(
            (Math.random() - .5) * growthFactor,
            (Math.random() - .5) * growthFactor,
            (Math.random() - .5) * growthFactor
        );
    }

    connectTo(other) {
        const m = new THREE.LineBasicMaterial();
        m.color.setHSL(0, 0, 1);
        const g = new THREE.Geometry();
        g.vertices.push(other.position, this.position);
        const l = new THREE.Line(g, m);
        container.add(l);
    }

    beget() {
        return new Node(this);
    }

    branch() {
        const n1 = new Node(this);
        n1.direction.add(this.getRandomGrowth(randomGrowthFactor * 2));
        n1.direction.normalize();
        const n2 = new Node(this);
        n2.direction.add(this.getRandomGrowth(randomGrowthFactor * 2));
        n2.direction.normalize();
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
material.emissive = color;
material.shininess = 100;

let nodes = [new Node()];
nodes[0].position = new THREE.Vector3(-10, 0, 0);
nodes[0].direction = new THREE.Vector3(1, 0, 0);
const g = new THREE.SphereGeometry(.3, 16, 16);
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

function render(time) {
    if (nodes.length < n && enabled) grow();
    if (enabled) {
        container.rotateY(0.01);
        renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

document.body.addEventListener('click', () => { enabled = !enabled; });