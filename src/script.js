const THREE = require('three');

class ObjectGenerate {
    constructor(x, y, z, mass){
        this.position = new THREE.Vector3(x, y, z);
        this.mass = mass || 0;

        this.inertia = new THREE.Vector3();
        this.vec_ = new THREE.Vector3();
        this.momentum_ = new THREE.Vector3();
        this.mesh_;
    }

    updatePosition(dt){
        const pos = this.position.clone();
        this.position.addScaledVector(this.vec_, dt);
        const pos$ = this.position.clone();
        this.inertia.subVectors(pos$, pos);
        this.mesh_.mesh.position.copy(this.position);
    }
    
    updateVector(dt, ...vectors){
        const F = new THREE.Vector3();
        vectors.forEach((vector) => {
            F.add(vector);
        }, this);
        F.add(this.inertia);
        this.momentum_.copy(F).divideScalar(this.mass);
        this.vec_.addScaledVector(this.momentum_, dt);
    }

    get mesh() {
        if(!this.mesh_) {
            this.mesh_ = {
                geometry: new THREE.SphereGeometry(50, 15, 15),
                material: new THREE.MeshBasicMaterial({
                    color: 0xffffff, 
                    vertexColors: THREE.FaceColors
                })
            }
            this.mesh_.mesh = new THREE.Mesh(
                this.mesh_.geometry, this.mesh_.material);
            this.mesh_.mesh.position.copy(this.position);
        } 
        return this.mesh_.mesh;
    }

    addVector(vector) {
        this.inertia.add(vector)
    }
}

class Spacetime {
    constructor(){
        this.canvas_;
        this.scene_;
        this.light_;
        this.render_;
        this.camera_;
        this.time_ = new THREE.Clock();
    }
    getInstance(){
        this._setCanvas();
        this._setRender();
        this._setScene();
        this._setCamera();

        return this;
    }

    render(){
        this.render_.render(this.scene_, this.camera_);
    }

    addScene(object){
        this.scene_.add(object);
    }
    deltaTime(){
        return this.time_.getDelta();
    }
    _setCanvas(){
        this.canvas_ = document.createElement("canvas");
        document.body.appendChild(this.canvas_);
        this.canvas_.setAttribute('width', window.innerWidth);
        this.canvas_.setAttribute('height', window.innerHeight);
    }
    _setRender(){
        this.render_ = new THREE.WebGLRenderer({
            canvas: this.canvas_, 
            antialias: true
        });
        this.render_.setClearColor(0x000000);
    }
    _setScene(){
        this.scene_ = new THREE.Scene();
        this.light_ = new THREE.AmbientLight(0xffffff);
        this.scene_.add(this.light_);
    }
    _setCamera(){
        this.camera_ = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight, 
            0.1, 
            15000
        );
        this.camera_.position.set(0, -5000, 10000);
    }
}

const spacetime = new Spacetime();
let space = spacetime.getInstance();


const SECONDS = 1;
const METER = 1000;
const G = 6.67384e-11;
const EARTH_MASS = 5.9722e+24;
const g = G * EARTH_MASS / Math.pow(6371000, 2);

let COUNTER = 0;


const ball_2 = new ObjectGenerate(-7000, -2000, 0, );
ball_2.mass = 5.9722e+24 / (81.3*100000000000);

space.addScene(ball_2.mesh);

const ball_3 = new ObjectGenerate(-7000, -5000, 0, );
ball_3.mass = 5.9722e+24 / 10000000000;

space.addScene(ball_3.mesh);

function fpsRender(dt){
    const fpsElem = document.getElementById("fps");
    const fps = 1 / dt;
    fpsElem.textContent = fps.toFixed(1);
    return fps;
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

function rotateVec(v, angle) {
    let rotate = new THREE.Vector3();
    v.normalize();
    rotate.x = v.x * Math.cos(angle) - v.x * Math.sin(angle);
    rotate.y = v.x * Math.sin(angle) - v.y * Math.cos(angle);
    v.x = rotate.x;
    v.y = rotate.y;
}


let COUNTER_1 = 0;
function rendering(){
    
    const dt = space.deltaTime();
    fpsRender(dt);

    let FIRST_SPACE = new THREE.Vector3(1, 0, 0);
    FIRST_SPACE.multiplyScalar(10000000000000000*2);

    ball_2.updatePosition(dt);
    
    if (COUNTER_1 < 3 ) {
        ball_2.addVector(FIRST_SPACE);
        COUNTER_1++;
    }
    let gravity_2 = gravityForce(ball_3, ball_2);

    ball_2.updateVector(dt, gravity_2);

    
    space.render();
    requestAnimationFrame(rendering);
}

window.onload = function(){
    rendering();
}