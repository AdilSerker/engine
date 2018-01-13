const { Vector3, Clock } = require('three');
const { webgl } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');
// timespace.gravity = false;

let COUNTER = 0;
const EARTH_MASS = 5.9722e+24;
const MOON_MASS = 5.9722e+24/81.3; 
const T = 10e+18;

let red = new ObjectGenerator(0, 3000, 0, T);
let blue = new ObjectGenerator(-3000, -2000, 0, T);
let green = new ObjectGenerator(3000, -2000, 0, T);
red.setMesh(100, 20, 20);
red.setColor(1, 0, 0);
blue.setMesh(100, 20, 20);
blue.setColor(0, 1, 0);
green.setMesh(100, 20, 20);
green.setColor(0, 0, 1);

timespace.add(red, blue, green);

webgl.setRender(timespace.scene);

function renderLoop(){
    const dt = timespace.deltaTime();
    if(COUNTER<1){
        COUNTER++;
    }

    webgl.render(dt);
    timespace.move(dt);
    timespace.accelerate();
    requestAnimationFrame(renderLoop);
}

window.onload = function(){
    renderLoop();
}