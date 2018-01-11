const THREE = require('three');
const { spacetime } = require('./Class/Spacetime');
const { ObjectGenerator } = require('./Class/Object');
const { GravityForce } = require('./Class/GravityForce');

let COUNTER = 0;

const EARTH_MASS = 5.9722e+24;
const MASS_1 = 734587945879;
const MASS_2 = 5.9722e+14;
const FIRST_SPACE = new THREE.Vector3(10000000000000000*2, 0, 0);

const space = spacetime.getInstance();

const ball_2 = new ObjectGenerator(0, -2000, 0, MASS_1);
const ball_3 = new ObjectGenerator(0, -5000, 0, MASS_2);

space.add(ball_3, ball_2);

function fpsRender(dt){
    const fpsElem = document.getElementById("fps");
    const fps = 1 / dt;
    fpsElem.textContent = fps.toFixed(1);
    return fps;
}

function rendering(){
    const dt = space.deltaTime();
    const gravity = new GravityForce(ball_3, ball_2).vector;

    ball_2.updatePosition(dt);
     
    if (COUNTER < 5) {
        ball_2.addVector(FIRST_SPACE);
        COUNTER++;
    }

    ball_2.updateVector(dt);
    console.log(ball_2.vec_.length());
    space.render();
    fpsRender(dt);
    requestAnimationFrame(rendering);
}

window.onload = function(){
    rendering();
}