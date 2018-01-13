const { WebGLRenderer, Scene,
    AmbientLight, PerspectiveCamera
} = require('three');

function fpsRender(dt){
    const fpsElem = document.getElementById("fps");
    const fps = 1 / dt;
    fpsElem.textContent = fps.toFixed();
    return fps;
}

class WebGL {
    constructor(){
        this.canvas_;
        this.render_;
        this.camera_;
        this.config_;
    }
    getInstance(){
        this._setCanvas();
        this._setCamera();

        return this;
    }
    render(dt){
        this.render_.render(this.config_.scene, this.camera_);
        fpsRender(dt);
    }
    
    _setCanvas(){
        this.canvas_ = document.createElement("canvas");
        document.body.appendChild(this.canvas_);
        this.canvas_.setAttribute('width', window.innerWidth);
        this.canvas_.setAttribute('height', window.innerHeight);
    }
    setRender(scene){
        this.render_ = new WebGLRenderer({
            canvas: this.canvas_, 
            antialias: true
        });
        this.render_.setClearColor(0x000000);
        this.config_ = {
            scene: scene,
        }
    }
    _setCamera(){
        this.camera_ = new PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight, 
            0.1, 
            10000
        );
        this.camera_.position.set(0, 0, 4000);
    }
}

export const webgl = new WebGL().getInstance();