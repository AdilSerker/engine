const THREE = require('three');

const METER = 1000;

export class GravityForce {
    constructor(obj1,obj2){
        this.first_ = obj1;
        this.second_ = obj2;
        this.constant_ = 6.67384e-11;
        this.radius = obj1.position.distanceTo(obj2.position);
        this.vector_ = new THREE.Vector3();
    }
    get vector(){
        const FORCE_MODULE = 
            this.constant_ * 
                this.first_.mass * this.second_.mass 
                    / Math.pow(this.radius/METER, 2);
        this.vector_.subVectors(
            this.first_.position, this.second_.position);
        this.vector_.normalize();
        this.vector_.multiplyScalar(FORCE_MODULE);

        return this.vector_;
    }
    static constantG(){
        return this.constant_;
    }
}