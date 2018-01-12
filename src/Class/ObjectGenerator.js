const { SphereGeometry, Vector3,
    FaceColors, Mesh, MeshBasicMaterial } = require('three');

export class ObjectGenerator {
    constructor(x, y, z, mass){
        this.mass = mass || 0;

        this.position_ = new Vector3(x, y, z);
        this.inertia_ = new Vector3();
        this.vec_ = new Vector3();
        this.momentum_ = new Vector3();
        this.geometry_;
        this.material_;
        this.mesh_;
    }

    get position() {
        return this.position_;
    }
    set position(vector){
        this.position_.copy(vector);
    }
    updatePosition(dt){
        const pos = this.position.clone();
        this.position.addScaledVector(this.vec_, dt);
        const pos$ = this.position.clone();
        this.inertia_.subVectors(pos$, pos);
        this.mesh.position.copy(this.position);
    }
    
    updateVector(dt, ...vectors){
        const F = this.inertia_;
        vectors.forEach((vector) => {
            F.add(vector);
        }, this);
        this.momentum_.copy(F);
        this.vec_.addScaledVector(this.momentum_, dt);
    }

    get mesh() {
        if(!this.mesh_) {
            this.geometry_ = new SphereGeometry(1, 20, 20),
            this.material_ = new MeshBasicMaterial({
                color: 0xffffff, 
                vertexColors: FaceColors
            });
            this.mesh_ = new Mesh(
                this.geometry_, this.material_);
            this.mesh_.position.copy(this.position);
        } 
        return this.mesh_;
    }
    get vector() {
        return this.vec_;
    }
    
    addVector(vector) {
        this.inertia_.add(vector)
    }

}