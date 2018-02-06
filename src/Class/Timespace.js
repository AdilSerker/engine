const { Vector3, Scene, AmbientLight, Clock } = require('three');

export class Timespace {

    constructor(){
        this.space = new Scene().add(new AmbientLight(0xffffff));
        this.time = new Clock();
        
        this.G = 6.67384e-3;
        
        this.objectArray_ = [];
        this.gravity_ = true;
        this.dt_;
    } 

    add([...objects]){
        objects.forEach((object) => {
            this.space.add(object.mesh);
            this.objectArray_.push(object);
        });
    }

    _gravityForce(a, b) {
        if(a.mass && b.mass && this.gravity) {
            const r = a.position.distanceTo(b.position);
            const FORCE_MODULE = this.G * a.mass * b.mass / Math.pow(r, 2);
            
            const gF1 = new Vector3();
            const gF2 = new Vector3();
            gF1.subVectors(b.position, a.position)
                .normalize()
                .multiplyScalar(FORCE_MODULE);         
            gF2.subVectors(a.position, b.position)
                .normalize()
                .multiplyScalar(FORCE_MODULE);
            a.updateVector(this.dt, gF1);
            b.updateVector(this.dt, gF2);       
        }
    }

    _collision(a, b){
        const aPos = a.position.clone().addScaledVector(a.vector, this.dt);
        const bPos = b.position.clone().addScaledVector(b.vector, this.dt);
        if((a.radius + b.radius) > aPos.distanceTo(bPos)){
            console.log('collision');
            
            const N = new Vector3();
            N.subVectors(a.position, b.position).normalize();
            
            const a1 = N.dot(a.vector);
            const a2 = N.dot(b.vector);

            const optimizedP = (2 * (a1 - a2)) / (a.mass + b.mass);

            const newV1 = new Vector3();
            newV1.subVectors(a.vector, N.clone().multiplyScalar(optimizedP * b.mass));

            const newV2 = new Vector3();
            newV2.addVectors(b.vector, N.clone().multiplyScalar(optimizedP * a.mass));

            a.vector = newV1;
            b.vector = newV2;

        }
    }

    move(){
        for(let v of this.objectArray_) {
            v.updatePosition(this.dt);
        }
    }

    accelerate(){
        for(let i = 0; i < this.objectArray_.length-1; i++) {
            for(let j = i+1; j < this.objectArray_.length; j++) {
                this._gravityForce(this.objectArray_[j], this.objectArray_[i]);
                this._collision(this.objectArray_[i], this.objectArray_[j]);
            }
        }
    }

    deltaTime(){
        this.dt_ = this.time.getDelta();
        return this.dt_;
    }

    get dt() {
        return this.dt_;
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