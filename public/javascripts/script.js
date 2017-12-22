window.onload = function (){
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let ball = {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        positionX: -1500,
        positionY: 0,
        positionZ: -800
    }

    let canvas = document.getElementById("canvas");
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
    renderer.setClearColor(0x000000);

    let scene = new THREE.Scene();

    let light = THREE.AmbientLight(0xffffff);
    scene.add(light);


    let camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 10000);
    camera.position.set(0, 0, 1000);

    let geometry = new THREE.SphereGeometry(50, 15, 15);
    let material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});

    for(let i = 0; i < geometry.faces.length; ++i) {
        geometry.faces[i].color.setRGB(r(), r(), r());
    }

    function r(){
        let rand = Math.random();
        if(rand > 0.8 && rand < 0.2)
            return r();
        return rand;
    }

    let t0 = 0,
            deltaTime;
    function time() {
        let now = performance.now();
        deltaTime = now-t0;
        t0 = now;
        return deltaTime;
    }


    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function objectMove(obj){
        obj.positionX += 0.5 * time();
    }
    let fpsElem = document.getElementById("fps");
    console.dir(fpsElem);
    let then = 0;
    function rendering(now){
        now *= 0.001;
        const deltaTime = now - then;
        then = now;
        const fps = 1 / deltaTime;
        fpsElem.textContent = fps.toFixed(1);

        objectMove(ball);

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