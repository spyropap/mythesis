import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from "gsap";
import { FlakesTexture } from 'three/examples/jsm/Addons.js';


const renderer = new THREE.WebGLRenderer({antialias: true});
const canvas = document.querySelector(".canvas-container");

//the learn more button 
const learnMore = document.querySelector('h2');
//the buttons for the bike views 
const frameButton = document.getElementById("Frame");
const transButton = document.getElementById("Transmission");
const steeringButton = document.getElementById("Steering");
const seatButton = document.getElementById("Seat");
const backButton = document.getElementById("Back");
//the info element for the bike
const info = document.getElementById("info");

const loadingManager = new THREE.LoadingManager();
const loader = new GLTFLoader(loadingManager);
gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.3, 1000
);

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 2.5, 3);
camera.lookAt(0,0,0);
canvas.appendChild(renderer.domElement);

/*default setup ends here*/

//displays XYZ axes, helps for debugging
// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;


scene.background = new THREE.Color(0xffffe4);
const ambientLight = new THREE.AmbientLight(0x022020, 10);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xc4c4c4, 10);
directionalLight.position.set(7, 10, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const directionalLight1 = new THREE.DirectionalLight(0xc4c4c4, 5);
directionalLight1.position.set(-7, 10, 0);
directionalLight1.castShadow = true;
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xc4c4c4, 5);
directionalLight1.position.set(-7, 10, 20);
directionalLight1.castShadow = true;
scene.add(directionalLight2);

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

//Helpers indicate Lit area, helps with debugging
// const helper = new THREE.DirectionalLightHelper( directionalLight, 20 );
// scene.add( helper );


// const helper2 = new THREE.DirectionalLightHelper( directionalLight2, 20 );
// scene.add( helper2 );

const directionalLight3 = new THREE.DirectionalLight(0xc4c4c4, 5);
directionalLight3.position.set(20, 4, -30);
directionalLight3.castShadow = true
scene.add(directionalLight3);

// const helper3 = new THREE.DirectionalLightHelper( directionalLight3, 20 );
// scene.add( helper3 );


function animate() {
    renderer.setAnimationLoop(animate);
	renderer.render(scene, camera);
}

//prepping the object holding the bike
const bikeLink = '../assets/road_bike/scene.gltf';
const bike = {name:'bike', model:''};

//loading the bike into the scene
loader.load(bikeLink, (gltf) => {
    gltf.scene.position.setY(-0.3);
    bike.model = gltf.scene;
    console.log(bike.model);
    scene.add(gltf.scene);
});


loadingManager.onLoad = () => {

    renderer.render(scene, camera);
    animate();
}

//reset bike to original position
function resetbike( ) {
    gsap.to(bike.model.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5
    }); 

    gsap.to(bike.model.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.5
    }); 
    

    gsap.to(bike.model.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5
    }); 
    setTimeout(1000);
}
//  
 
document.addEventListener("keydown", function(e) {
    if(e.code === 'Space') {

        /*FRAME AND SEAT */
        gsap.to(bike.model.rotation, {
            x: 1,
            y: 1.6,
            duration: 1.5
        }); 
        gsap.to(bike.model.position, {
            z: -1,
            x: 2,
            duration: 1.5
        });
    }
})

learnMore.addEventListener("click", function(event) {
    frameButton.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(500);
    gsap.to(bike.model.rotation, {
        x: 1,
        y: 1.6,
        duration: 1.5
    }); 
    gsap.to(bike.model.position, {
        z: -1,
        x: 2,
        duration: 1.5
    });
});

frameButton.addEventListener("click", function(event) {

    info.innerHTML = "Sturdy Aluminum frame"+
                "<br><br>"+
                "Its simple mechanical construction provides easy maintenance compaired to mountain or road bikes."+
                "<br><br>"+
                "Vivamus eleifend facilisis fringilla. "+
                "Phasellus sed lorem sit amet ligula egestas rhoncus. Phasellus aliquam nisl a interdum vehicula. Maecenas quis leo metus. Nunc accumsan rhoncus ipsum, nec eleifend nunc varius eget. Praesent magna mi, facilisis ac nisl quis, auctor ullamcorper nulla. Mauris aliquam a tellus et egestas. Sed et auctor ante, sed posuere odio. Suspendisse vulputate auctor orci eget iaculis."+
                "Etiam eu ante nec tortor interdum lacinia ac a velit."+
                "<br><br>"+
                "Sed tempus libero vel ante faucibus, id suscipit augue placerat. Pellentesque convallis mollis quam sed aliquam. Morbi ultrices arcu dolor, quis lacinia eros aliquam eu. "

    resetbike();
    gsap.to(bike.model.rotation, {
        x: 1,
        y: 1.6,
        duration: 1.5
    }); 
    gsap.to(bike.model.position, {
        z: -1,
        x: 2,
        duration: 1.5
    });
});


transButton.addEventListener("click", function(event) {
    info.innerHTML = "Single Gear Transmission"+
    "<br><br>"+
    "Mauris convallis, nulla quis sollicitudin tincidunt, mauris ante suscipit sem, rhoncus dapibus enim elit a nisi."+
    "<br><br>"+
    "Aliquam auctor nisl pretium tortor pretium, quis tincidunt quam pellentesque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent quis eros erat."+
    "<br><br>"+
    "Pellentesque convallis mollis quam sed aliquam. Morbi ultrices arcu dolor, quis lacinia eros aliquam eu. "

        // /*FOR TRANSMISSION */ 
        resetbike();
        gsap.to(bike.model.position, {
            x: 4,
            y: -0.8,
            duration: 1.5
        }); 
        gsap.to(bike.model.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 1.5
        }); 
});

steeringButton.addEventListener("click", function(event) {
    info.innerHTML = "Touring Style Steering Bar"+
    "<br><br>"+
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque ex malesuada pellentesque gravida. Donec volutpat eget dolor a dapibus. Mauris congue, orci eu tincidunt luctus, quam tortor dignissim massa, sagittis blandit quam odio eget nisl."+
    "<br><br>"+
    "Maecenas mauris mauris, porta sed felis ut, suscipit luctus justo. Cras ut turpis nec orci bibendum pulvinar. "+
    "<br><br>"+
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in sodales purus. Quisque vestibulum iaculis metus, vehicula pharetra nulla sagittis a. Sed tempus libero vel ante faucibus, id suscipit augue placerat. Pellentesque convallis mollis quam sed aliquam. Morbi ultrices arcu dolor, quis lacinia eros aliquam eu. "

        /*FOR STEERING WHEEL */
        resetbike();
        gsap.to(bike.model.rotation, {
            x: 1,
            y: 1.6,
            duration: 1.5
        }); 
        gsap.to(bike.model.position, {
            z: 1 ,
            x: 0.8,
            y: -0.5, 
            duration: 1.5
        }); 
});

seatButton.addEventListener("click", function(event) {
    info.innerHTML = "Comfortable Orange Seat"+
    "<br><br>"+
    "Donec est ante, tincidunt sit amet nulla et, euismod commodo diam. Quisque faucibus diam vitae fringilla rhoncus. Donec mattis eget dui quis vehicula. Nulla nec varius justo."+
    "<br><br>"+
    "Nam hendrerit diam risus, et consequat tortor tincidunt aliquam. Aliquam erat volutpat. Morbi fermentum euismod finibus. Nulla facilisi. Morbi varius urna sapien. "+
    "Maecenas ante lectus, tempus vel dui vitae. "+
    "<br><br>"+
    "Lorem ipsum dolor sit amet, Morbi ultrices arcu dolor, quis lacinia eros aliquam eu. "

    resetbike();
    gsap.to(bike.model.rotation, {
        x: 1,
        y: 1.6,
        duration: 1.5
    }); 
    gsap.to(bike.model.position, {
        z: -1,
        x: 2,
        duration: 1.5
    });
});

backButton.addEventListener("click", function(event) {
    learnMore.scrollIntoView({ behavior: "smooth", block: "end" });
    resetbike();
});