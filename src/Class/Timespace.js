const { Vector3, Scene, AmbientLight, Clock } = require('three');

export class Timespace {

    constructor(){
        this.space = new Scene().add(new AmbientLight(0xffffff));
        this.time = new Clock();
        
        this.G = 6.67384e-3;
        
        this.objectArray_ = [];
        this.gravity_ = true;

    } 

    add([...objects]){
        objects.forEach((object) => {
            this.space.add(object.mesh);
            this.objectArray_.push(object);
        });
    }

    _gravityForce(dt, a, b) {
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
            a.updateVector(dt, gF1);
            b.updateVector(dt, gF2);
        }
    }

    _collision(dt, a, b){
        const aPos = a.position.clone().addScaledVector(a.vector, dt);
        const bPos = b.position.clone().addScaledVector(b.vector, dt);
        if((a.radius + b.radius) > aPos.distanceTo(bPos)){
            console.log(a.vector, b.vector);  
            
            const normal = new Vector3();
            normal.subVectors(b.position, a.position).normalize();

            const velA = a.vector.clone().normalize();
            const newVelA = new Vector3();
            newVelA.subVectors(velA, normal.multiplyScalar(2 * normal.dot(velA)));
            const newVecAScalar = ((a.mass - b.mass) * a.vector.length() + 2 * b.mass * b.vector.length()) / a.mass + b.mass;
            newVelA.multiplyScalar(newVecAScalar);

            const velB = b.vector.clone().normalize();
            const newVelB = new Vector3();
            newVelB.subVectors(velB, normal.multiplyScalar(2 * normal.dot(velB)));
            const newVecBScalar = ((b.mass - a.mass) * b.vector.length() + 2 * a.mass * a.vector.length()) / a.mass + b.mass;
            newVelB.multiplyScalar(newVecBScalar);

            a.vector.copy(newVelA);
            b.vector.copy(newVelB);
        }
    }

    move(dt){
        for(let v of this.objectArray_) {
            v.updatePosition(dt);
        }
    }

    accelerate(dt){
        for(let i = 0; i < this.objectArray_.length-1; i++) {
            for(let j = i+1; j < this.objectArray_.length; j++) {
                this._gravityForce(dt, this.objectArray_[j], this.objectArray_[i]);
                this._collision(dt, this.objectArray_[i], this.objectArray_[j]);
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