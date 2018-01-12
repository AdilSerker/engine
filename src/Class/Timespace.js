const { Vector3, Scene, AmbientLight, Clock } = require('three');

export class Timespace {
    constructor(){
        this.space = new Scene().add(new AmbientLight(0xffffff));
        this.time = new Clock();
        
        this.G = 6.67384e-11;
        this.objectArray_ = [];
    }

    add(...objects){
        objects.forEach((object) => {
            this.space.add(object.mesh);
            this.objectArray_.push(object);
        });
    }
    _gravityForce(a, b) {
        const th = this;
        const r = a.position.distanceTo(b.position);
        const FORCE_MODULE = this.G * a.mass * b.mass * 10000 / Math.pow(r, 2);
        const force = new Vector3();
        force.subVectors(a.position, b.position);
        force.normalize();
        force.multiplyScalar(FORCE_MODULE);
        a.updateVector(th.deltaTime(), force.divideScalar(a.mass).negate());
        b.updateVector(th.deltaTime(), force.divideScalar(b.mass));
    }
    move(){
        const th = this;
        for(let v of th.objectArray_) {
            v.updatePosition(th.deltaTime());
        }
    }
    accelerate(){
        const th = this;
        for(let i = 0; i < th.objectArray_.length; ++i) {
            for(let j = i + 1; j < th.objectArray_.length; ++j) {
                this._gravityForce(th.objectArray_[i], th.objectArray_[j])
            }
        }
        
    }
    deltaTime(){
        return this.time.getDelta();
    }
    get scene() {
        return this.space;
    }
}

export const timespace = new Timespace();