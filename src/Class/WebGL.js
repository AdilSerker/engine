const { WebGLRenderer, Scene,
    AmbientLight, PerspectiveCamera
} = require('three');

function fpsRender(dt){
    const fpsElem = document.getElementById("fps");
    const fps = 1 / dt;
    fpsElem.textContent = fps.toFixed();
    return fps;
}

export class WebGL {
    constructor(){
        this.canvas_;
        this.render_;
        this.camera_;
        this.scene_;
    }
    getInstance(){
        this._setCanvas();
        this._setCamera();

        return this;
    }
    render(dt){
        this.render_.render(this.scene_, this.camera_);
        fpsRender(dt);
    }
    
    _setCanvas(){
        this.canvas_ = document.createElement("canvas");
        document.body.appendChild(this.canvas_);
        this.canvas_.setAttribute('width', window.innerWidth);
        this.canvas_.setAttribute('height', window.innerHeight);
        this.render_ = new WebGLRenderer({
            canvas: this.canvas_, 
            antialias: true
        });
        this.render_.setClearColor(0x000000);
    }
    setRender(scene){
        this.scene_ = scene;
    }
    _setCamera(){
        this.camera_ = new PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000000
        );
        this.camera_.position.set(0, 0, 500);
    }
}