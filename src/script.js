const { Vector3, Clock } = require('three');
const { webgl } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');

let COUNTER = 0;

const firstspace = new Vector3(0, 0, 0);

const EARTH_MASS = 5.9722e+24;
const MASS_1 = 2;

const MASS_2 = 1000;
const MASS_3 = 100000000;

const ball_1 = new ObjectGenerator(-100, 50, 0, MASS_3);
const ball_2 = new ObjectGenerator(100, -50, 0, MASS_3);
timespace.add(ball_1, ball_2);

webgl.setRender(timespace.scene);
function renderLoop(){
    let dt = timespace.deltaTime();
    
    // if(COUNTER < 3){
    //     ball_1.updateVector(dt, firstspace)
    //     ball_2.updateVector(dt, firstspace.negate())
    //     COUNTER++;
    // }


    
    
    webgl.render(dt);
    timespace.move(dt);
    timespace.accelerate(dt);
    requestAnimationFrame(renderLoop);
}

window.onload = function(){
    renderLoop();
}