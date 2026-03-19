import * as THREE from 'three';
import {
	loadTextures,
	concreteTexture,
	gravelConcreteTexture,
} from './textures.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Exports
export let scene;
export let camera;
export let renderer;
export const CLOCK = new THREE.Clock();

export const floorYValue = -5;
const baseHeight = 2;
const baseWidth = 15;
export const buildingWidth = 5;
export const buildingHeight = 15;

export let building;

// Main setup function
export const setupScene = () => {
	loadTextures();
	setScene();
	setSceneElements();
};

export function setScene() {
	const cameraStartPosValue = 20;

	// Create and configure scene object
	scene = new THREE.Scene();
	scene.background = new THREE.Color('#17171a');

	// Create and configure camera
	const renderView = document.querySelector('.render-view');
	const aspectRatio = renderView.clientWidth / renderView.clientHeight;
	camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
	camera.position.set(
		cameraStartPosValue,
		cameraStartPosValue,
		cameraStartPosValue,
	);
	camera.lookAt(0, 0, 1);

	// Create and configure renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(renderView.clientWidth, renderView.clientHeight);
	renderer.domElement.style.borderRadius = '15px';
	document.querySelector('.render-view').appendChild(renderer.domElement);

	// Create and configure controls and render resizing
	const controls = new OrbitControls(camera, renderer.domElement);

	function updateLoop() {
		controls.update();
		renderer.render(scene, camera);
	}

	renderer.setAnimationLoop(updateLoop);

	//Resize window functionality
	function resizeRenderView() {
		const width = document.querySelector('.render-view').clientWidth;
		const height = document.querySelector('.render-view').clientHeight;
		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.render(scene, camera);
	}

	window.addEventListener('resize', resizeRenderView);
}

const setSceneElements = () => {
	createLights();
	createFloor();
	createBuildingBase();
	createBuilding();
	createDoor();
};

const createLights = () => {
	// Ambient light for general illumination
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
	scene.add(ambientLight);

	// Directional light for depth and shadows
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
	directionalLight.position.set(20, 30, 20);
	scene.add(directionalLight);
};

const createFloor = () => {
	// Constants
	const floorHeight = 1;
	const floorSideLength = 500; // Very large to create a sandbox type environment

	const floorGeometry = new THREE.BoxGeometry(
		floorSideLength,
		floorHeight,
		floorSideLength,
	);
	const floorMaterial = new THREE.MeshBasicMaterial({
		map: concreteTexture,
	});

	const floor = new THREE.Mesh(floorGeometry, floorMaterial);

	floor.position.y = floorYValue;

	scene.add(floor);
};

const createBuildingBase = () => {
	const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseWidth);
	const baseMaterial = new THREE.MeshBasicMaterial({
		map: gravelConcreteTexture,
	});

	const buildingBase = new THREE.Mesh(baseGeometry, baseMaterial);

	buildingBase.position.y = floorYValue + 1;

	scene.add(buildingBase);
};

const createBuilding = () => {
	let buildingGeometry = new THREE.BoxGeometry(
		buildingWidth,
		buildingHeight,
		buildingWidth,
	);
	let buildingMaterial = new THREE.MeshPhongMaterial({
		color: new THREE.Color(0.5, 0.5, 0.5),
	});

	building = new THREE.Mesh(buildingGeometry, buildingMaterial);

	building.position.y = floorYValue + buildingHeight / 2 + 2;

	scene.add(building);
};

const createDoor = () => {
	//Constants
	const doorHeight = 1.4;

	// Geometry
	let doorGeometry = new THREE.BoxGeometry(0.9, doorHeight, 0.5);

	// Material
	let doorMaterial = new THREE.MeshPhongMaterial({
		color: new THREE.Color(0, 1, 0),
		// wireframe: true,
	});

	// Object
	const door = new THREE.Mesh(doorGeometry, doorMaterial);

	door.position.z += buildingWidth / 2;
	door.position.y = floorYValue + baseHeight + 0.7;

	// Add to building
	scene.add(door);
};
