import * as THREE from 'three';
import { setupScene, scene, camera, renderer, CLOCK } from './setup.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

setupScene();

const controls = new OrbitControls(camera, renderer.domElement);

function updateLoop() {
	controls.update();
	renderer.render(scene, camera);
}

renderer.setAnimationLoop(updateLoop);

//Event Listeners
function resizeRenderView() {
	const width = document.querySelector('.render-view').clientWidth;
	const height = document.querySelector('.render-view').clientHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
}

window.addEventListener('resize', resizeRenderView);
