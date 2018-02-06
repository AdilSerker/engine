const { Vector3 } = require('three');
const { webgl } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');
timespace.gravity = false;

let COUNTER = 0;
const EARTH_MASS = 5.9722e+24;
const MOON_MASS = 5.9722e+24/81.3; 

const T = 1000;

let obj1 = new ObjectGenerator(0, 0, 0, 1);
    obj1.setMesh(1, 20, 20).setColor(1, 1, 1)
        .startVector(5, 0, 0);

let obj2 = new ObjectGenerator(-50, 0, 0, 1);
    obj2.setMesh(1, 20, 20).setColor(0, 1, 1)
        .startVector(25, 0.5, 0);



timespace.add([
    obj2,
    obj1
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