const three = require('three');
const { Vector3 } = require('three');
const { WebGL } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { LightSphere } = require('./Class/LightSphere');
const { timespace } = require('./Class/Timespace');
// timespace.gravity = false;

function gri(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const webgl = (new WebGL()).getInstance();

let COUNTER = 0;
const EARTH_MASS = 5.9722e+24;
const MOON_MASS = 5.9722e+24/81.3; 

const T = 1000;



let objs = [
    // new ObjectGenerator(0,0,0,500*T)
]

for (let i = 0; i < 300; ++i) {
    objs.push((new ObjectGenerator(gri(-150, 150),gri(-150, 150),gri(-150, 150), 10*T))
        // .startVector(gri(-10, 10),gri(-10, 10),gri(-10, 10))
    );
}


timespace.add(    
    objs
);

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