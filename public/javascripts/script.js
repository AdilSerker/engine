window.onload = function(){
    const G = 6.67384e-11;
    const EARTH_MASS = 5.9722e+24;

    const g = G * EARTH_MASS / Math.pow(6371000, 2);
     
    const canvas = document.getElementById("canvas");
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    const fpsElem = document.getElementById("fps");

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas, 
        antialias: true
    });
    renderer.setClearColor(0x000000);

    const scene = new THREE.Scene();

    const light = THREE.AmbientLight(0xffffff);
    scene.add(light);


    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight, 
        0.1, 
        10000
    );
    camera.position.set(0, 0, 1000);

    const geometry = new THREE.SphereGeometry(50, 15, 15);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff, 
        vertexColors: THREE.FaceColors
    });

    const clock = new THREE.Clock();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let ball = {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        positionX: 0,
        positionY: 950,
        positionZ: -800,
        mass: 2
    } 

    let counter = 1;
    let deltaTimeSum = 0;

    let SECONDS = 1;
    let METER = 1000;

    let v = 0;

    function rendering(){
        const deltaTime = clock.getDelta();
        const fps = 1 / deltaTime;
        fpsElem.textContent = fps.toFixed(1);
        v += g;
        ball.positionY -= v*deltaTime;
        ball.rotationZ -= 0.2; 

        mesh.rotation.x = ball.rotationX;
        mesh.rotation.y = ball.rotationY;
        mesh.rotation.z = ball.rotationZ;
        mesh.position.x = ball.positionX;
        mesh.position.y = ball.positionY;
        mesh.position.z = ball.positionZ;

        renderer.render(scene, camera); 
        requestAnimationFrame(rendering);
    }

    rendering();
}

function powerNumber(num, pow) {
    let counter = 0;
    return pow == 0? 1: num * powerNumber(num, pow-1);
}

