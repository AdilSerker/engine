const { Vector3 } = require('three');
const { WebGL } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');
// timespace.gravity = false;

const webgl = (new WebGL()).getInstance();

let COUNTER = 0;
const EARTH_MASS = 5.9722e+24;
const MOON_MASS = 5.9722e+24/81.3; 

const T = 1000;

let obj1 = new ObjectGenerator(25, 50, 0, 4000*T);
    obj1.setMesh(1, 20, 20).setColor(1, 0, 1);

let obj2 = new ObjectGenerator(10, -30, 0, 2000*T);
    obj2.setMesh(1, 20, 20).setColor(0, 1, 1);

let obj3 = new ObjectGenerator(-60, -15, 0, 4000*T);
    obj3.setMesh(1, 20, 20).setColor(1, 1, 0);

timespace.add([
    obj2,
    obj1,
    obj3
]);

webgl.setRender(timespace.scene);
 
function renderLoop(){
    const dt = timespace.deltaTime();
    
    timespace.move();
    timespace.accelerate();
    webgl.render(dt);

    requestAnimationFrame(renderLoop);
}    

window.onload = function(){
    renderLoop();
}