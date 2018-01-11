const THREE = require('three');

class Spacetime {
    constructor(){
        this.canvas_;
        this.scene_;
        this.light_;
        this.render_;
        this.camera_;
        this.time_ = new THREE.Clock();
    }
    getInstance(){
        this._setCanvas();
        this._setRender();
        this._setScene();
        this._setCamera();

        return this;
    }

    render(){
        this.render_.render(this.scene_, this.camera_);
    }

    addScene(object){
        this.scene_.add(object);
    }
    deltaTime(){
        return this.time_.getDelta();
    }
    _setCanvas(){
        this.canvas_ = document.createElement("canvas");
        document.body.appendChild(this.canvas_);
        this.canvas_.setAttribute('width', window.innerWidth);
        this.canvas_.setAttribute('height', window.innerHeight);
    }
    _setRender(){
        this.render_ = new THREE.WebGLRenderer({
            canvas: this.canvas_, 
            antialias: true
        });
        this.render_.setClearColor(0x000000);
    }
    _setScene(){
        this.scene_ = new THREE.Scene();
        this.light_ = new THREE.AmbientLight(0xffffff);
        this.scene_.add(this.light_);
    }
    _setCamera(){
        this.camera_ = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight, 
            0.1, 
            15000
        );
        this.camera_.position.set(0, -5000, 10000);
    }
}