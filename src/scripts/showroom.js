import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FlakesTexture } from 'three/examples/jsm/Addons.js';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

//buton to change scene
const sceneBtn = document.getElementById('nxtScene');
const carBtn = document.getElementById('nxtCar');


const scene = new THREE.Scene();

const progressBarContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('#progress-bar');

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);

camera.position.set(10, 5, 10);

const showroomLoadingManager = new THREE.LoadingManager();
const renderer = new THREE.WebGLRenderer(showroomLoadingManager);
scene.background = new THREE.Color(0xddd0ed);

const carPlane = new THREE.CircleGeometry(15, 128);
const material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
const plane = new THREE.Mesh( carPlane, material );
carPlane.rotateX(Math.PI/2);
scene.add( plane );

//create an instance of the two loaders
const backgroundLoader = new RGBELoader(showroomLoadingManager);
const gltfLoader = new GLTFLoader(showroomLoadingManager);

//scene lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xc4c4c4, 5);
directionalLight.position.set(7, 10, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const directionalLight1 = new THREE.DirectionalLight(0xc4c4c4, 5);
directionalLight1.position.set(-7, 10, 0);
directionalLight1.castShadow = true;
scene.add(directionalLight1);




//controls for camera movement with mouse
const showcontrols = new OrbitControls(camera, renderer.domElement);
showcontrols.enableZoom = false;
showcontrols.enablePan = false;
showcontrols.dampingFactor = 0.5;

//polarAngle is the angle ofthe two poles (think like the earth) since we are talking about orbitControls
showcontrols.minPolarAngle =  (Math.PI / 2.5);
showcontrols.maxPolarAngle =  (Math.PI / 2.5);

camera.position.setY(-1);
showcontrols.update();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.NeutralToneMapping;


backgroundLoader.load('../assets/symmetrical_garden_02_4k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
})


backgroundLoader.load('quarry_cloudy_4k.hdr.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
})

const  backgrounds = [
    '../assets/quarry_cloudy_4k.hdr',
    '../assets/symmetrical_garden_02_4k.hdr',
    '../assets/vignaioli_night_4k.hdr',
    '../assets/zwartkops_start_morning_4k.hdr'
]

const carFiles = [
    { name: "lancia", file: "../assets/free_lancia_delta_hf_integrale_evo_2/scene.gltf" },
    { name: "capri", file: "../assets/ford_capri_group_b/scene.gltf" },
    { name: "honda", file: "../assets/honda_s800/scene.gltf" }
];

const carModels = {};

//load the models
carFiles.forEach((item) => {
    gltfLoader.load(item.file, (gltf) => {

        carModels[item.name] = gltf.scene;
        gltf.scene.scale.set(3, 3, 3);
        scene.add(gltf.scene);
        if(item.name == 'capri' || item.name == 'lancia') {
            carModels[item.name].visible = false;
            console.log(item.name);
        }
        console.log(gltf.scene);
    });
})

//set the animation loop and refresh once every frame occurs
function animate() {

	renderer.setAnimationLoop(animate);
    showcontrols.update();
	renderer.render( scene, camera );

    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

//callback called per file loaded
showroomLoadingManager.onProgress = function(url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
    //console.log('loaded' + url);
}

//promise after all files loaded
showroomLoadingManager.onLoad = function() {
    progressBarContainer.style.display = "none";
    animate();
}

//button event listeners
let backgroundCnt = 1;
let carCnt = 1;
sceneBtn.addEventListener('click', (e) => {
    backgroundLoader.load(backgrounds[backgroundCnt], (environmentMap) => {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = environmentMap;
        scene.environment = environmentMap;
    });

    backgroundCnt++;
    if (backgroundCnt > 3) {
        backgroundCnt = 0;
    }
    console.log(backgrounds[backgroundCnt]);
    console.log(backgroundCnt);    
});

carBtn.addEventListener('click', (e) => {
    console.log(carModels);
    switch(carCnt) {
        case 1:
            carModels['capri'].visible = false;
            carModels['lancia'].visible = false;
            carModels['honda'].visible = true;
            break;
        case 2:
            carModels['honda'].visible = false;
            carModels['lancia'].visible = false;
            carModels['capri'].visible = true;
            break;
        case 3:
            carModels['capri'].visible = false;
            carModels['honda'].visible = false;
            carModels['lancia'].visible = true;
        }
        
        carCnt++;
        if (backgroundCnt < 4) {
            backgroundCnt = 1;
        }
});