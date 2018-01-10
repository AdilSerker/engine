const THREE = require('three');

const SECONDS = 1;
const METER = 1000;
const G = 6.67384e-11;
const EARTH_MASS = 5.9722e+24;
const g = G * EARTH_MASS / Math.pow(6371000, 2);

let COUNTER = 0;

function getCanvas(){
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    return canvas;
}
const cnvs = getCanvas();

const renderer = new THREE.WebGLRenderer({
    canvas: cnvs, 
    antialias: true
});
renderer.setClearColor(0x000000);

const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight, 
    0.1, 
    15000
);
camera.position.set(0, -5000, 10000);

const geometry = new THREE.SphereGeometry(50, 15, 15);
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, 
    vertexColors: THREE.FaceColors
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const mesh_1 = new THREE.Mesh(geometry, material)
scene.add(mesh_1);


let ball = {
    position: new THREE.Vector3(0, -1000, 0),
    mass: 5.9722e+24 / (81.3*100000000000)
}

let ball_1 = {
    position: new THREE.Vector3(0, -4844, 0),
    mass: 5.9722e+24 / 100000000000
}

const MOON = {
    position: new THREE.Vector3(0, -1737000000, 0),
    mass: 5.9722e+24 / 81.3
}


const EARTH = {
    position: new THREE.Vector3(-6371000000, -6371000000, 0),
    mass: 5.9722e+24
}

function fpsRender(dt){
    const fpsElem = document.getElementById("fps");
    const fps = 1 / dt;
    fpsElem.textContent = fps.toFixed(1);
    return fps;
}

const clock = new THREE.Clock();

let V = new THREE.Vector3(0, 0, 0);
let V1 = new THREE.Vector3(0, 0, 0);

function updatePosition(obj, v, dt){
    let position = obj.position.clone();
    obj.position.x += v.x*dt;
    obj.position.y += v.y*dt;
    obj.position.z += v.z*dt;
    let positionDelta = obj.position.clone();
 
    let orient = new THREE.Vector3();
    orient.subVectors(positionDelta, position);
    return orient;
 }

function gravityForce(m1, m2){
    const mass1 = m1.mass;
    const mass2 = m2.mass;
    const GRAVITY = 6.67384e-11;
    const r = m1.position.distanceTo(m2.position);
    const FORCE_MODULE = (GRAVITY * mass1 * mass2 / Math.pow(r/METER, 2));

    const vector = new THREE.Vector3();

    vector.subVectors(m1.position, m2.position);
    vector.normalize();
    vector.multiplyScalar(FORCE_MODULE);

    return vector;
}

function updateSpeed(v, dt, b1, b2, vec){
    let F = new THREE.Vector3();
    const gravity = gravityForce(b1, b2);
    F.add(gravity);
    if(arguments[4]){
        F.add(arguments[4])
    }
    v.y += F.y/ball.mass * dt;
    v.x += F.x/ball.mass * dt;
    v.z += F.z/ball.mass * dt;
}

function rotateVec(v, angle) {
    let rotate = new THREE.Vector3();
    v.normalize();
    rotate.x = v.x * Math.cos(angle) - v.y * Math.sin(angle);
    rotate.y = v.x * Math.sin(angle) - v.y * Math.cos(angle);
    v.x = rotate.x;
    v.y = rotate.y;
}
ball_1.mass *= 10;

let COUNTER_1 = 0;
function rendering(){
    const deltaTime = clock.getDelta(); 
    const fps = fpsRender(deltaTime);

    let firstSpace = new THREE.Vector3(1, 0, 0);
    firstSpace.multiplyScalar(10000000000000000*2);

    
    let orientBall = updatePosition(ball, V, deltaTime);
   
    
    if (COUNTER_1 < 3 ) {
        orientBall.add(firstSpace);

        COUNTER_1++;
    }

    updateSpeed(V, deltaTime, ball_1, ball, orientBall);

    mesh.position.x = ball.position.x;
    mesh.position.y = ball.position.y;
    mesh.position.z = ball.position.z;

    mesh_1.position.x = ball_1.position.x;
    mesh_1.position.y = ball_1.position.y;
    mesh_1.position.z = ball_1.position.z; 

    renderer.render(scene, camera);
    requestAnimationFrame(rendering);
}

window.onload = function(){
    rendering();
}