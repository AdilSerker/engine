const { SphereGeometry, Vector3,
    FaceColors, Mesh, MeshBasicMaterial } = require('three');

export class ObjectGenerator {
    constructor(x, y, z, mass){
        this.mass = mass || 0;

        this.position_ = new Vector3(x, y, z);

        this.vec_ = new Vector3();
        this.geometry_;
        this.material_;
        this.mesh_;
        this.fix_ = false;
    }
    get position() {
        return this.position_;
    }
    set position(vector){
        this.position_.copy(vector);
    }
    fixPosition(bool){
        this.fix_ = bool;
    }
    updatePosition(dt){
        const th = this;
        if(!th.fix_){
            this.position.addScaledVector(this.vec_, dt);
            this.mesh.position.copy(this.position);
        };
    }
    
    updateVector(...vectors){
        vectors.forEach((vector) => {
            this.vec_.add(vector.divideScalar(this.mass));
        }, this);       
    }

    get mesh() {
        if(!this.mesh_) {
            this.geometry_ = new SphereGeometry(10, 20, 20),
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
}