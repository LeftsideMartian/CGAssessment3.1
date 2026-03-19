import * as THREE from '/build/three.module.js';
import {
	loadTextures,
	concreteTexture,
	gravelConcreteTexture,
} from './textures.js';

// Exports
export let scene;
export let camera;
export let renderer;
export const CLOCK = new THREE.Clock();
export let cube;

//Constants/values
const floorYValue = -5;

// Main setup function
export const setupScene = () => {
	loadTextures();
	setScene();
	setSceneElements();
};

export function setScene() {
	// Create and configure scene object
	scene = new THREE.Scene();
	scene.background = new THREE.Color('#17171a');

	// Create and configure camera
	const renderView = document.querySelector('.render-view');
	const aspectRatio = renderView.clientWidth / renderView.clientHeight;
	camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
	camera.position.set(15, 15, 15);
	camera.lookAt(0, 0, 1);

	// Create and configure renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(renderView.clientWidth, renderView.clientHeight);
	renderer.domElement.style.borderRadius = '15px';
	document.querySelector('.render-view').appendChild(renderer.domElement);
}

const setSceneElements = () => {
	createFloor();
	// createBuildingBase();
	createTempBuilding();
	bevelTest();
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
	//Constants
	const baseHeight = 2;

	const baseGeometry = new THREE.BoxGeometry(15, baseHeight, 15);
	const baseMaterial = new THREE.MeshBasicMaterial({
		map: gravelConcreteTexture,
	});

	const buildingBase = new THREE.Mesh(baseGeometry, baseMaterial);

	buildingBase.position.y = floorYValue + 1;

	scene.add(buildingBase);
};

const createTempBuilding = () => {
	let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
	let cubeMaterial = new THREE.MeshBasicMaterial({
		color: new THREE.Color(0, 1, 0),
		wireframe: true,
	});

	cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

	cube.position.y = floorYValue + 2.5;

	scene.add(cube);
};

const bevelTest = () => {
	const unitSize = 15;

	// Create a 2D shape that is a square
	const bevelShape = new THREE.Shape();
	bevelShape.moveTo(0, unitSize);
	bevelShape.lineTo(unitSize, unitSize);
	bevelShape.lineTo(unitSize, 0);
	bevelShape.lineTo(0, 0);

	// Define extrusion settings with bevel properties enabled
	var extrudeSettings = {
		steps: 1, // Number of steps along the depth
		depth: 2, // The depth of the extrusion
		bevelEnabled: true, // Enable the bevel
		bevelThickness: 0.5, // How deep the bevel goes into the shape
		bevelSize: 0.4, // How wide the bevel is
		bevelOffset: 0, // Where the bevel starts
		bevelSegments: 1, // How smooth the bevel is
	};

	var baseGeometry = new THREE.ExtrudeGeometry(bevelShape, extrudeSettings);
	var baseMaterial = new THREE.MeshBasicMaterial({
		map: gravelConcreteTexture,
	});

	var buildingBase = new THREE.Mesh(baseGeometry, baseMaterial);

	buildingBase.position.y = -3.5;
	buildingBase.position.x -= unitSize / 2;
	buildingBase.position.z -= unitSize / 2;
	buildingBase.rotation.x = Math.PI / 2;

	scene.add(buildingBase);
};
