const { Vector3 } = require('three');
const { webgl } = require('./Class/WebGL');
const { ObjectGenerator } = require('./Class/ObjectGenerator');
const { timespace } = require('./Class/Timespace');
// timespace.gravity = false; 

let COUNTER = 0;
const EARTH_MASS = 5.9722e+24;
const MOON_MASS = 5.9722e+24/81.3; 

const T = 1000;

let orbit1 = new Vector3(0, 85000, 0);
let orbit2 = new Vector3(0, 75000, 0);
let orbit3 = new Vector3(0, 65000, 0);
let orbit4 = new Vector3(0, 55000, 0);
let orbit5 = new Vector3(0, 45000, 0);
let orbit6 = new Vector3(0, 35000, 0);
let orbit7 = new Vector3(0, 25000, 0);
let orbit8 = new Vector3(0, 15000, 0);

let orbit1a = new Vector3(900000, 0, 0);

const star = new ObjectGenerator(0, 0, 0, T*1000);
star.setMesh(15, 30, 30);

const planet1 = new ObjectGenerator(-50, 0, 0, T);

const planet2 = new ObjectGenerator(-80, 0, 0, T);

const planet3 = new ObjectGenerator(-110, 0, 0, T);

const planet4 = new ObjectGenerator(-140, 0, 0, T);

const planet5 = new ObjectGenerator(-170, 0, 0, T);

const planet6 = new ObjectGenerator(-200, 0, 0, T);

const planet7 = new ObjectGenerator(-230, 0, 0, T);

const planet8 = new ObjectGenerator(-260, 0, 0, T);

const planet1a = new ObjectGenerator(0, -120, 0, T*15);
planet1a.setMesh(5, 30, 30);

timespace.add(star, planet1a, 
    planet1, planet2, planet3, planet4, planet5, planet6, planet7, planet8
);
  
webgl.setRender(timespace.scene);
 
function renderLoop(){
    const dt = timespace.deltaTime();
    if(COUNTER < 1){
        planet1.updateVector(orbit1);
        planet2.updateVector(orbit2);
        planet3.updateVector(orbit3);
        planet4.updateVector(orbit4);
        planet5.updateVector(orbit5);
        planet6.updateVector(orbit6);
        planet7.updateVector(orbit7);
        planet8.updateVector(orbit8);
        planet1a.updateVector(orbit1a);

        COUNTER++   
    }
 
    timespace.move(dt);
    timespace.accelerate();
    
    webgl.render(dt);

    requestAnimationFrame(renderLoop);
}    

window.onload = function(){
    renderLoop();
}