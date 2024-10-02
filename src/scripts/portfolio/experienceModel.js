import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector("#c2");
const loader = new GLTFLoader();
const csharp = new URL('../../assets/portfolio/csharp.glb', import.meta.url); 
const git = new URL('../../assets/portfolio/git.glb', import.meta.url); 
const webdes = new URL('../../assets/portfolio/webdesign.glb', import.meta.url); 
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);  

let csharpModel, gitModel, webModel;

camera.position.set(0.73, 0.17, 1.65);

if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
}


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.update();


const ambientLight = new THREE.AmbientLight(0x404040, 200);
scene.add(ambientLight);



//add event listeners to all list elements 
document.addEventListener('keydown', (e) => {
    if(e.code == 'Space') {
        console.log(camera.position);
    }
});



loader.load(webdes.href,
    function (gltf){
        webModel = gltf.scene;
        webModel.scale.set(0.35, 0.35, 0.35);
        scene.add(webModel);
        webModel.rotation.y = -1.4;
        webModel.visible = false;
        webModel.getObjectByName("back").material.color.setHex('0x371F76');
        webModel.getObjectByName("LOGO").material.color.setHex('0x371F76');
        gsap.to(webModel.rotation, { duration: 4, x: Math.PI * 40, y: Math.PI * 40, repeat: -1, ease: "power2.inOut" });
    }
);

loader.load(csharp.href, 
    function (gltf) {
        csharpModel = gltf.scene;
        csharpModel.scale.set(7, 7, 7);
        scene.add(csharpModel);
        csharp.visible = false;
        csharpModel.getObjectByName("back").material.color.setHex('0x371F76');
        csharpModel.getObjectByName("LOGO").material.color.setHex('0x371F76');
        gsap.to(csharpModel.rotation, { duration: 4, x: Math.PI * 2, y: Math.PI * 2, repeat: -1, ease: "power2.inOut" });
});

loader.load(git.href,
    function (gltf){
        gitModel = gltf.scene;
        gitModel.scale.set(7, 7, 7);
        scene.add(gitModel);
        gitModel.visible = false;
        console.log(gitModel);
        gitModel.getObjectByName("back").material.color.setHex('0xFFFFFF');
        gitModel.getObjectByName("LOGO").material.color.setHex('0xF05133');
        gsap.to(gitModel.rotation, { duration: 4, x: Math.PI * 2, y: Math.PI * 2, repeat: -1, ease: "power2.inOut" });
    }
);
    

    let listItems = document.querySelectorAll('#about p') 

    listItems.forEach(function(item) {
        item.addEventListener("click", function() {
            console.log(item.innerHTML.trim());
            let content = item.innerHTML;

            switch(content) {
                case 'Web Development':
                    webModel.visible = true;
                    csharpModel.visible = false;
                    gitModel.visible = false
                break;
                case '.Net Development': 
                    csharpModel.visible = true;
                    gitModel.visible = false;
                    webModel.visible = false;
                break;            
                case 'Git':
                    gitModel.visible = true;
                    csharpModel.visible = false;
                    webModel.visible = false;
                break;
            }

        })
    }); 

renderer.setClearColor(0xffffff, 0);
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
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
animate();


/*
"FREE 1975 Porsche 911 (930) Turbo" (https://skfb.ly/6WZyV) by Lionsharp Studios is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
"McLaren F1 1993 By Alex.Ka.🤍🖤" (https://skfb.ly/oFq7O) by ᗩᒪE᙭. Kᗩ.🚗 is licensed under Creative Commons Attribution-NonCommercial (http://creativecommons.org/licenses/by-nc/4.0/).
"FREE Lancia Delta HF Integrale evo 2" (https://skfb.ly/owR88) by TARANTULA is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
"[FREE] BMW M3 E30" (https://skfb.ly/oH7rM) by Martin Trafas is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
"[FREE] 2CV Charleston 1986" (https://skfb.ly/oPLo6) by MaximePages is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). 
"ZIS-101A Sport (1938)" (https://skfb.ly/YFSV) by Comrade1280 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
"Bugatti EB110 Super Sport 1992 By Alex.Ka." (https://skfb.ly/oJPF9) by ᗩᒪE᙭. Kᗩ.🚗 is licensed under Creative Commons Attribution-NonCommercial (http://creativecommons.org/licenses/by-nc/4.0/).
*/
