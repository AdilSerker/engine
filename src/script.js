const { Vector3, Clock } = require('three');
const { webgl } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');
// timespace.gravity = false;

let COUNTER = 0;
const EARTH_MASS = 5.9722e+24;
const MOON_MASS = 5.9722e+24/81.3; 
const T = 1000;

const orbit = new Vector3(-40000, 40000, 0);
const orbit2 = new Vector3(59000, -59000, 0);
const orbit3 = new Vector3(32000, 32000, 0);
const orbit4 = new Vector3(150000, 150000, 0);

const planet = new ObjectGenerator(0, 0, 0, 100000000000000*T);
planet.setMesh(150, 20, 20);

const moon = new ObjectGenerator(800, 800, 0, 100);
moon.setMesh(30, 20, 20);

const moon2 = new ObjectGenerator(-400, -400, 0, 100);
moon2.setMesh(10, 20, 20);

const moon3 = new ObjectGenerator(1000, -1000, 0, 100);
moon3.setMesh(5, 10, 10);

const moon4 = new ObjectGenerator(-1200, 1200, 0, 500);
moon3.setMesh(15, 10, 10);

timespace.add(moon4, moon3, moon2, moon, planet);

webgl.setRender(timespace.scene);

function renderLoop(){
    const dt = timespace.deltaTime();
    if(COUNTER<1){
        moon.updateVector(orbit);
        moon2.updateVector(orbit2);
        moon3.updateVector(orbit3);
        moon4.updateVector(orbit4);
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