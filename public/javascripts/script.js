window.onload = function (){    
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
        positionX: -3500,
        positionY: 0,
        positionZ: -800
    }
    
    function rendering(){
        const deltaTime = clock.getDelta();
        const fps = 1 / deltaTime;
        fpsElem.textContent = fps.toFixed(1);

        ball.positionX += 2000 * deltaTime;

        requestAnimationFrame(rendering);
        mesh.rotation.x = ball.rotationX;
        mesh.rotation.y = ball.rotationY;
        mesh.rotation.z -= 0.2;
        mesh.position.x = ball.positionX;
        mesh.position.y = ball.positionY;
        mesh.position.z = ball.positionZ;

        renderer.render(scene, camera);
    }

    rendering();
}