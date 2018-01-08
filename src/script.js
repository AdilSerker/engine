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
    position: new THREE.Vector3(0, 300, 0),
    mass: 200000000000
}

let ball_1 = {
    position: new THREE.Vector3(3000, -8000, 0),
    mass: 200000000000
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
    obj.position.x += v.x*dt;
    obj.position.y += v.y*dt;
    obj.position.z += v.z*dt;
}

function gravityForce(m1, m2){
    const mass1 = m1.mass;
    const mass2 = m2.mass;
    const GRAVITY = 6.67384e-11;
    const r = m1.position.distanceTo(m2.position);
    const FORCE_MODULE = (GRAVITY * mass1 * mass2 / Math.pow(r/METER, 2));
    const vector = new THREE.Vector3();
    vector.x = m1.position.x - m2.position.x;
    vector.y = m1.position.y - m2.position.y;
    vector.z = m1.position.z - m2.position.z;

    const l = Math.sqrt(
        Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2)
    );
    vector.x = vector.x/l*FORCE_MODULE;
    vector.y = vector.y/l*FORCE_MODULE;
    vector.z = vector.z/l*FORCE_MODULE;

    return vector;
}

function updateSpeed(v, dt, b1, b2, vec){
    let F = new THREE.Vector3();
    const gravity = gravityForce(b1, b2);
    F.add(gravity);
    if(arguments[4]){
        console.log(F);
        F.add(arguments[4])
    }
    v.y += F.y/ball.mass * METER * dt;
    v.x += F.x/ball.mass * METER * dt;
    v.z += F.z/ball.mass * METER * dt;
}
function rendering(){
    const deltaTime = clock.getDelta(); 
    const fps = fpsRender(deltaTime);

    let vec1 = new THREE.Vector3(100000000000 * 25/100, 0, 0);
    let vec2 = new THREE.Vector3(-100000000000 * 25/100, 0, 0);

    updatePosition(ball, V, deltaTime);
    updatePosition(ball_1, V1, deltaTime);


    updateSpeed(V, deltaTime, ball_1, ball, vec1);
    updateSpeed(V1, deltaTime, ball, ball_1, vec2);

    // renderGraph(V, deltaTime);

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