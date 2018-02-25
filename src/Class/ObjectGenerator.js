const { SphereGeometry, Vector3,
    FaceColors, Mesh, MeshBasicMaterial } = require('three');
const three = require('three');

export class ObjectGenerator {

    constructor(x, y, z, mass){
        this.mass = mass || 0;

        this.position_ = {
            x: x,
            y: y,
            z: z
        };

        this.vec_ = new Vector3();
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

    positionFix(){
        this.fix_ = true;

        return this;
    }

    updatePosition(dt){
        if(!this.fix_){
            this.position.addScaledVector(this.vec_, dt);
        };
    }
    
    updateVector(dt, ...vectors){
        vectors.forEach((vector) => {
            this.vec_.add(vector.multiplyScalar(dt/this.mass));
        }, this);       
    }

    setColor(r, g, b){
        this.material_.color.setRGB(r, g, b);

        return this;
    }

    get mesh() {
        if(!this.mesh_) {
            this.geometry_ = new SphereGeometry(1, 2, 2),
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

    startVector(x, y, z){
        this.vec_.add(new Vector3(x, y, z));

        return this;
    }

    setMesh(R, W, H){
        this.geometry_ = new SphereGeometry(R, W, H);
        this.material_ = new MeshStandardMaterial({
            color: 0xffffff 
            // vertexColors: FaceColors
        });
        this.mesh_ = new Mesh(this.geometry_, this.material_);
        this.mesh_.position.copy(this.position_);

        return this;
    }

    get momentum() {
        return this.vector.clone().multiplyScalar(this.mass);
    }
    
    get vector() {
        return this.vec_;
    }

    set vector(vector) {
        this.vec_ = vector;
    }
}

