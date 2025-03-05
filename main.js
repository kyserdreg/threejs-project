import * as THREE from './libs/three.module.js';
import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
import { FBXLoader } from './libs/FBXLoader.js';

// Contenedor
let container = document.createElement('div');
document.body.appendChild(container);

// Renderizador
let renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animate);
container.appendChild(renderer.domElement);

// Efecto PeppersGhost
let effect = new PeppersGhostEffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);
effect.cameraDistance = 5;

window.addEventListener('resize', onWindowResize);

// Cámara
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000);

// Escena
let scene = new THREE.Scene();

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
hemiLight.color.setHSL(10, 10, 10);
hemiLight.position.set(0, 0, 0);
scene.add(hemiLight);

// Variable para el modelo
let MyObj;

// Cargar el modelo FBX
const fbxLoader = new FBXLoader();
fbxLoader.load(
    'source/pokedex 3d pro eevee.fbx',
    (object) => {
        MyObj = object;
        MyObj.scale.set(0.07, 0.07, 0.07);
        MyObj.position.set(0, -2, 0);
        scene.add(MyObj);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
);

// Ajuste a pantalla
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
}

// Animación (Giro hacia la izquierda)
function animate() {

    if (MyObj) { 
        MyObj.rotation.y -= 0.02; 
    }
    
    effect.render(scene, camera);
}
