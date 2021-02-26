const sphereRadius = 10;
const numLeaves = 100;
const initialPosition = new THREE.Vector3(0, -sphereRadius, 0);
const branchLength = 0.5;
const branchWidth = 0.15;
const attractionRange = 2;

const branches = [];
let startTime = null;

function makeLeave() {
    const s = new THREE.Spherical(
        Math.random() * sphereRadius,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );
    const v = new THREE.Vector3();
    v.setFromSpherical(s);
    const g = new THREE.SphereGeometry(0.25, 5, 5);
    const m = new THREE.Mesh(g, attractorMaterial);
    m.position.copy(v);
    return m;
}

class Branch {
    constructor(start, end, direction, parent = null) {
        this.start = start;
        this.end = end;
        this.direction = direction;
        this.parent = parent;
        this.children = [];
        this.attractors = [];
    }

    display() {
        const g = new THREE.CylinderGeometry(branchWidth, branchWidth, branchLength, 16);
        const m = new THREE.Mesh(g, branchMaterial);
        m.position.copy(this.start);
        sphere.add(m);
    }
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 0.5;
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight();
directionalLight.position.set(15, 15, 5);
directionalLight.intensity = 0.5;
directionalLight.color.setHSL(0, 1, 1);
scene.add(directionalLight);

const sphere = new THREE.Object3D();
scene.add(sphere);
const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 16, 16);
const wireFrame = new THREE.WireframeGeometry(sphereGeometry);
const lines = new THREE.LineSegments(wireFrame);
lines.material.opacity = 0.5;
lines.material.transparent = true;
sphere.add(lines);

const attractorMaterial = new THREE.MeshLambertMaterial();
attractorMaterial.color.setHSL(0, 1, 0.5);
const leafs = Array.from({ length: numLeaves }, makeLeave);
leafs.forEach((_) => {
    sphere.add(_);
});
const activeAttractorMaterial = new THREE.MeshLambertMaterial();
activeAttractorMaterial.color.setHSL(0, 0, 0.5);

const branchMaterial = new THREE.MeshLambertMaterial();
branchMaterial.color.setHSL(0.15, 1, 0.5);
branches.push(new Branch(
    initialPosition,
    initialPosition.clone().add(new THREE.Vector3(0, branchLength, 0))
));
branches[0].display();

function render(time) {
    if (startTime === null) {
        startTime = time;
        lastUpdate = time;
    }
    if ((time - lastUpdate) > 1000) {
        lastUpdate = time;
        const lastBranch = branches[branches.length - 1];
        lastBranch.attractors = leafs.filter(l => lastBranch.end.distanceToSquared(l.position) < attractionRange);
        leafs.forEach((l) => {
            if (lastBranch.attractors.includes(l)) {
                l.material = activeAttractorMaterial;
            } else {
                l.material = attractorMaterial;
            }
        });
        const startPosition = lastBranch.end;
        const endPosition = lastBranch.attractors.length > 0
            ? startPosition.clone().add(new THREE.Vector3(0, branchLength, 0))
            : startPosition.clone().add(new THREE.Vector3(0, branchLength, 0));
        if (startPosition.y <= (initialPosition.y + (2 * sphereRadius))) {
            const branch = new Branch(startPosition, endPosition);
            branch.display();
            branches.push(branch);
        }
    }
    sphere.rotateY(0.01);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

requestAnimationFrame(render);