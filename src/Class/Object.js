const THREE = require('three');

export class ObjectGenerator {
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
    get vector() {
        return this.vec_;
    }

    addVector(vector) {
        this.inertia.add(vector)
    }

}