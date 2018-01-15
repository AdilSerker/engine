const { Vector3, Scene, AmbientLight, Clock } = require('three');

export class Timespace {
    constructor(){
        this.space = new Scene().add(new AmbientLight(0xffffff));
        this.time = new Clock();
        
        this.G = 6.67384e-3;
        
        this.objectArray_ = [];
        this.gravity_ = true;

    } 

    add(...objects){
        objects.forEach((object) => {
            this.space.add(object.mesh);
            this.objectArray_.push(object);
        });
    }
    _gravityForce(a, b) {
        if(a.mass && b.mass && this.gravity) {
            const r = a.position.distanceTo(b.position);
            const FORCE_MODULE = this.G * a.mass * b.mass / Math.pow(r, 2);
            const F1 = new Vector3();
            F1.subVectors(a.position, b.position);
            F1.normalize();
            F1.multiplyScalar(FORCE_MODULE);
            b.updateVector(F1);
            const F2 = new Vector3();
            F2.subVectors(b.position, a.position);
            F2.normalize();
            F2.multiplyScalar(FORCE_MODULE);
            a.updateVector(F2);
        }
    }
    _collision(a, b){
        if(a.position.distanceTo(b.position) <= (a.radius + b.radius)){
            const F1 = new Vector3();
            F1.subVectors(b.position, a.position);
            F1.normalize();
            F1.multiplyScalar(a.vector.length() * a.mass);
            b.updateVector(F1);
            const F2 = new Vector3();
            F2.subVectors(a.position, b.position);
            F2.normalize();
            F2.multiplyScalar(b.vector.length() * b.mass);
            a.updateVector(F2);
        }
    }
    move(dt){
        const th = this;
        for(let v of th.objectArray_) {
            v.updatePosition(dt);
        }
    }
    accelerate(){
        const th = this;
        for(let i = 0; i < th.objectArray_.length-1; i++) {
            for(let j = i+1; j < th.objectArray_.length; j++) {
                th._gravityForce(th.objectArray_[i], th.objectArray_[j]);
                th._collision(th.objectArray_[i], th.objectArray_[j]);
            }
        }
    }
    deltaTime(){
        return this.time.getDelta();
    }
    get scene() {
        return this.space;
    }
    get gravity(){
        return this.gravity_;
    }
    set gravity(bool){
        this.gravity_ = bool; 
    }
}

export const timespace = new Timespace();