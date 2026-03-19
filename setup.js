import * as THREE from 'three';
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

//Constants/values
const floorYValue = -5;

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
}

const setSceneElements = () => {
	createFloor();
	createBuildingBase();
	createBuilding();
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
	const baseWidth = 15;

	const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseWidth);
	const baseMaterial = new THREE.MeshBasicMaterial({
		map: gravelConcreteTexture,
	});

	const buildingBase = new THREE.Mesh(baseGeometry, baseMaterial);

	buildingBase.position.y = floorYValue + 1;

	scene.add(buildingBase);
};

const createBuilding = () => {
	//Constants
	const buildingHeight = 15;
	const buildingWidth = 5;

	let buildingGeometry = new THREE.BoxGeometry(
		buildingWidth,
		buildingHeight,
		buildingWidth,
	);
	let buildingMaterial = new THREE.MeshBasicMaterial({
		color: new THREE.Color(0, 1, 0),
		wireframe: true,
	});

	const building = new THREE.Mesh(buildingGeometry, buildingMaterial);

	building.position.y = floorYValue + buildingHeight / 2 + 2;

	scene.add(building);
};
