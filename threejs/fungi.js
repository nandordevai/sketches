import * as THREE from './three.js/build/three.module.js';

// TODO: find and connect disjunct sets of nodes

const containerSize = 40;
const maxDistance = 9;
const n = 140;
const curveDisplacement = 2;
const maxConnections = 3;
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

const uniforms = {
    time: { value: 1.0 }
};

const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});

class Node {
    constructor(i) {
        this.index = i;
        this.position = new THREE.Vector3(
            (Math.random() - .5) * containerSize,
            (Math.random() - .5) * containerSize,
            (Math.random() - .5) * containerSize
        );
        this.neighbours = [];
        this.connections = [];
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
        for (const _ of this.neighbours) {
            if (this.isConnectedTo(_)) continue;
            const mid1 = new THREE.Vector3();
            mid1.copy(this.position);
            mid1.lerp(_.position, .33);
            const offset1 = new THREE.Vector3(
                (Math.random() - .5) * curveDisplacement,
                (Math.random() - .5) * curveDisplacement,
                (Math.random() - .5) * curveDisplacement
            );
            mid1.add(offset1);
            const mid2 = new THREE.Vector3();
            mid2.copy(this.position);
            mid2.lerp(_.position, .66);
            const offset2 = new THREE.Vector3(
                (Math.random() - .5) * curveDisplacement,
                (Math.random() - .5) * curveDisplacement,
                (Math.random() - .5) * curveDisplacement
            );
            mid2.add(offset2);
            const curve = new THREE.CatmullRomCurve3([
                this.position,
                mid1,
                mid2,
                _.position
            ]);
            const g = new THREE.TubeGeometry(curve, 20, .15, 5, false);
            const mesh = new THREE.Mesh(g, material);
            container.add(mesh);
            this.connections.push(_.index);
        }
    }

    isConnectedTo(other) {
        return ((this.connections.includes(other.index))
            || (other.connections.includes(this.index)));
    }
}

const material = new THREE.MeshPhongMaterial();
const color = new THREE.Color();
color.setHSL(.15, .8, .5);
material.emissive = color;
material.shininess = 100;
const nodes = Array.from({ length: n }, (_, i) => new Node(i));
const g = new THREE.SphereGeometry(.15, 16, 16);
nodes.forEach((_) => {
    _.setNeighbours(nodes);
    if (_.neighbours.length) {
        const mesh = new THREE.Mesh(g, material);
        mesh.position.copy(_.position);
        container.add(mesh);
        _.drawConnections();
    }
});

function render() {
    container.rotateY(0.01);
    requestAnimationFrame(render);
    if (enabled) renderer.render(scene, camera);
}

requestAnimationFrame(render);

document.body.addEventListener('click', () => { enabled = !enabled; });