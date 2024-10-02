import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector("#c1");
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);  

camera.position.set(6, 1, 15);

document.addEventListener('keydown', (e) => {
    if(e.code == 'Space') {
        console.log(camera.position);
    }
});

if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
}

const geometry = new THREE.DodecahedronGeometry(7, 25);
const material = new THREE.PointsMaterial({
    color: 0xFF00BB,
    size: 0.01    
});
const planet = new THREE.Points(geometry, material);
scene.add(planet);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.update();


renderer.setClearColor( 0xffffff, 0);
renderer.render(scene, camera);

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
}

function animate() {
    renderer.setAnimationLoop(animate);
    // controls.update();	
    renderer.render( scene, camera );
    planet.rotation.x += 0.005;
    planet.rotation.z += 0.015;
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
animate();