import * as THREE from '/build/three.module.js';
import { setupScene, scene, camera, renderer, cube, CLOCK } from './setup.js';
import { OrbitControls } from './build/controls/OrbitControls.js';

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
