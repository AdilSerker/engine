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
    _gravityForce(dt, a, b) {
        if(a.mass && b.mass && this.gravity) {
            const r = a.position.distanceTo(b.position);
            const FORCE_MODULE = this.G * a.mass * b.mass / Math.pow(r, 2);

            const gravityForce_1 = new Vector3();
            gravityForce_1.subVectors(b.position, a.position).normalize();
            gravityForce_1.multiplyScalar(FORCE_MODULE);
            a.updateVector(dt, gravityForce_1);

            const gravityForce_2 = new Vector3();
            gravityForce_2.subVectors(a.position, b.position).normalize();
            gravityForce_2.multiplyScalar(FORCE_MODULE);
            b.updateVector(dt, gravityForce_2);
        }
    }
    _collision(dt, a, b){
        if(a.position.distanceTo(b.position) <= (a.radius + b.radius)){
            console.log('collision');
        }
    }
    move(dt){
        const th = this;
        for(let v of th.objectArray_) {
            v.updatePosition(dt);
        }
    }
    accelerate(dt){
        const th = this;
        for(let i = 0; i < th.objectArray_.length-1; i++) {
            for(let j = i+1; j < th.objectArray_.length; j++) {
                th._gravityForce(dt, th.objectArray_[j], th.objectArray_[i]);
                th._collision(dt, th.objectArray_[i], th.objectArray_[j]);
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