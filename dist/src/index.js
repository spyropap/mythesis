import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const tnGeometry = new THREE.TorusKnotGeometry(12, 2, 164, 10);
const tnMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF, 
    size: 0.1
});

const tnPoints = new THREE.Points(tnGeometry, tnMaterial);
scene.add(tnPoints);

camera.position.set(10, 5, 10);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
renderer.render( scene, camera );

function animate() {

	renderer.setAnimationLoop(animate);
    // tnPoints.rotation.y += 0.005;
    tnPoints.rotation.x += 0.005;
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
	renderer.render( scene, camera );

    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
animate();