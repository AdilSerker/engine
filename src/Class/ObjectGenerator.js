const { SphereGeometry, Vector3,
    FaceColors, Mesh, MeshBasicMaterial } = require('three');

export class ObjectGenerator {
    constructor(x, y, z, mass){
        this.mass = mass || 0;

        this.position_ = {
            x: x,
            y: y,
            z: z
        };

        this.vec_ = new Vector3();
        this.momentum_ = new Vector3()
        this.geometry_;
        this.material_;
        this.mesh_;
        this.fix_ = false;
    }
    get radius(){
        return this.geometry_.parameters.radius;
    }
    get position() {
        return this.mesh.position;
    }
    set position(vector){
        this.mesh.position.copy(vector);
    }
    fixPosition(bool){
        this.fix_ = bool;
    }
    updatePosition(dt){
        const th = this;
        if(!th.fix_){
            this.position.addScaledVector(this.vec_, dt);
        };
    }
    
    updateVector(...vectors){
        this.momentum_ = new Vector3();
        vectors.forEach((vector) => {
            this.vec_.add(vector.divideScalar(this.mass));
        }, this);       
    }
    setColor(r, g, b){
        this.material_.color.setRGB(r, g, b);
    }
    get mesh() {
        if(!this.mesh_) {
            this.geometry_ = new SphereGeometry(2, 20, 20),
            this.material_ = new MeshBasicMaterial({
                color: 0xffffff, 
                vertexColors: FaceColors
            });
            this.mesh_ = new Mesh(
                this.geometry_, this.material_);
            this.mesh_.position.copy(this.position_);
        } 
        return this.mesh_;
    }
    setMesh(R, W, H){
        this.geometry_ = new SphereGeometry(R, W, H);
        this.material_ = new MeshBasicMaterial({
            color: 0xffffff, 
            vertexColors: FaceColors
        });
        this.mesh_ = new Mesh(this.geometry_, this.material_);
        this.mesh_.position.copy(this.position_);
    }
    get vector() {
        return this.vec_;
    }
}