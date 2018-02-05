const { Vector3 } = require('three');
const { webgl } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');
// timespace.gravity = false;

let COUNTER = 0;
const EARTH_MASS = 5.9722e+24;
const MOON_MASS = 5.9722e+24/81.3; 

const T = 1000;

let obj1 = new ObjectGenerator(0, 0, 0, 200000*T);
    obj1.setMesh(10, 20, 20).setColor(1, 1, 1)
        .startVector(0, 0, 0).fixPosition();
 
let obj2 = new ObjectGenerator(500, 0, 0, 10000*T);
    obj2.setMesh(4, 20, 20).setColor(0, 1, 1)
        .startVector(0, 50, 0);

let obj3 = new ObjectGenerator(550, 0, 0, T);
    obj3.setMesh(2, 20, 20).setColor(0.8, 0.8, 1)
        .startVector(0, 80, 0);

timespace.add([ 
    obj3,
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