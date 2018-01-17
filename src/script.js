const { Vector3 } = require('three');
const { webgl } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');
// timespace.gravity = false; 

let COUNTER = 0;
const EARTH_MASS = 5.9722e+24;
const MOON_MASS = 5.9722e+24/81.3; 

const T = 1000;

let obj1 = new ObjectGenerator(0, 0, 0, 20000*T);
    obj1.setMesh(3, 20, 20).setColor(1, 0, 0);

let obj2 = new ObjectGenerator(-100, 0, 0, 200);
    obj2.setMesh(3, 20, 20).setColor(0, 1, 0)
        .startVector(0, 35, 0);

let obj3 = new ObjectGenerator(100, 0, 0, 200);
    obj3.setMesh(3, 20, 20).setColor(0, 0, 1)
        .startVector(0, -35, 0);   

timespace.add( 
    obj1,
    obj2,
    
    obj3
    
);
  
webgl.setRender(timespace.scene);
 
function renderLoop(){
    const dt = timespace.deltaTime();

    
    timespace.move(dt);
    timespace.accelerate(dt);
    webgl.render(dt);

    requestAnimationFrame(renderLoop);
}    

window.onload = function(){
    renderLoop();
}