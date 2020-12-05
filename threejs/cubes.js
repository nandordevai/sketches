let cubeSize = 1.2;
let xSpeed = 3.43;
let ySpeed = 0.01;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const edgeSize = 10;
const cubes = Array.from(Array(edgeSize ** 2), makeCube);
cubes.forEach((_) => {
    scene.add(_);
});

const light2 = new THREE.DirectionalLight();
light2.color.setHSL(0, 0, 0.6);
light2.position.set(0, 0, 3);
scene.add(light2);
const light = new THREE.DirectionalLight();
light.color.setHSL(0, 0, 1);
scene.add(light);

camera.position.z = 5;

function render(time) {
    time *= 0.0005;
    cubes.forEach((_, i) => {
        _.rotation.x = time + i * xSpeed / 2
        _.rotation.y = time + i * ySpeed / 2;
        _.material.color.offsetHSL(0.001, 0, 0);
    });
    light.position.set(Math.sin(time) * 2, Math.cos(time) * 2, Math.sin(time) + 1);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

requestAnimationFrame(render);

function makeCube(_, idx) {
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, 0.05);
    const material = new THREE.MeshStandardMaterial();
    material.color.setHSL((240 + idx * 2) / 360, 0.6, 0.5);
    material.shininess = 150;
    material.roughness = 0.5;
    material.metalness = 0.3;
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (idx % edgeSize).toFixed() - (edgeSize / 2) + 0.5;
    cube.position.y = Math.floor(idx / edgeSize) - (edgeSize / 2) + 0.5;
    return cube;
}

document.querySelector('#cubeSize').addEventListener('input', (e) => {
    const s = e.target.value / 100;
    cubes.forEach((_) => {
        _.scale.set(s, s, s);
    });
});

document.querySelector('#xSpeed').addEventListener('input', (e) => {
    xSpeed = e.target.value / 100;
});

document.querySelector('#ySpeed').addEventListener('input', (e) => {
    ySpeed = e.target.value / 100;
});

document.body.addEventListener('keypress', (e) => {
    if (e.key === 'p') {
        document.querySelector('#parameters').classList.toggle('hidden');
    }
});