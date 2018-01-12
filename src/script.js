const { Vector3, Clock } = require('three');
const { webgl } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');

let COUNTER = 0;

const EARTH_MASS = 5.9722e+24;
const MASS_1 = 2;

const ball_1 = new ObjectGenerator(0, 0, 0, MASS_1);
const ball_2 = new ObjectGenerator(0, -6378000, 0, EARTH_MASS);
timespace.add(ball_1, ball_2);

webgl.setRender(timespace.scene);
function renderLoop(){
    let dt = timespace.deltaTime();
    
    webgl.render(dt);
    timespace.move(dt);
    timespace.accelerate(dt);
    requestAnimationFrame(renderLoop);
}

window.onload = function(){
    renderLoop();
}