const { Vector3, Clock } = require('three');
const { webgl } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');

let COUNTER = 0;

const EARTH_MASS = 5.9722e+24;
const MOON_MASS = 5.9722e+24/81.3; 
const T = 1000;

const orbit = new Vector3(-600, 600, 0);
const orbit2 = new Vector3(750, -700, 0);

const planet = new ObjectGenerator(0, 0, 0, 100000000000000*T);
const moon = new ObjectGenerator(400, 400, 0, 1);
const moon2 = new ObjectGenerator(-300, -300, 0, 1);
timespace.add(moon2, moon, planet);

webgl.setRender(timespace.scene);

function renderLoop(){
    const dt = timespace.deltaTime();
    if(COUNTER<1){
        moon.updateVector(orbit);
        moon2.updateVector(orbit2);
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