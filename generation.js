import * as THREE from 'three';
import { scene, buildingWidth, building } from './setup.js';

const windowSpaceValue = 1.3;

export const doProceduralGeneration = () => {
	// Clear any existing children of the building object first
	building.clear();

	// Then generate windows on each face
	generatePosZWindows();
	generateNegZWindows();
	generatePosXWindows();
	generateNegXWindows();
};

const generatePosZWindows = () => {
	// 2d for loop to loop over all possible window placements in the grid
	for (let i = -4; i < 6; i++) {
		for (let j = 0; j < 3; j++) {
			if (Math.random() >= 0.8) {
				const newWindow = createWindow();

				// Rotate window to line up with the building correctly

				// Align window with building face
				newWindow.position.z += buildingWidth / 2;

				// Adjust x and y pos based on loop
				newWindow.position.x -= windowSpaceValue; // Left align all windows first
				newWindow.position.x += windowSpaceValue * j; // Then change x pos based on loop
				newWindow.position.y = windowSpaceValue * i; // Set y pos based on loop too

				building.add(newWindow);
			}
		}
	}
};

const generateNegZWindows = () => {
	// 2d for loop to loop over all possible window placements in the grid
	for (let i = -4; i < 6; i++) {
		for (let j = 0; j < 3; j++) {
			if (Math.random() >= 0.8) {
				const newWindow = createWindow();

				// Align window with building face
				newWindow.position.z -= buildingWidth / 2;

				// Adjust x and y pos based on loop
				newWindow.position.x -= windowSpaceValue; // Left align all windows first
				newWindow.position.x += windowSpaceValue * j; // Then change x pos based on loop
				newWindow.position.y = windowSpaceValue * i; // Set y pos based on loop too

				building.add(newWindow);
			}
		}
	}
};

const generatePosXWindows = () => {
	// 2d for loop to loop over all possible window placements in the grid
	for (let i = -4; i < 6; i++) {
		for (let j = 0; j < 3; j++) {
			if (Math.random() >= 0.8) {
				const newWindow = createWindow();

				// Rotate window to line up with the building correctly
				newWindow.rotation.y = Math.PI / 2;

				// Align window with building face
				newWindow.position.x += buildingWidth / 2;

				// Adjust y and x pos based on loop
				newWindow.position.z -= windowSpaceValue; // Left align all windows first
				newWindow.position.z += windowSpaceValue * j; // Then change x pos based on loop
				newWindow.position.y = windowSpaceValue * i; // Set y pos based on loop too

				building.add(newWindow);
			}
		}
	}
};

const generateNegXWindows = () => {
	// 2d for loop to loop over all possible window placements in the grid
	for (let i = -4; i < 6; i++) {
		for (let j = 0; j < 3; j++) {
			if (Math.random() >= 0.8) {
				const newWindow = createWindow();

				// Rotate window to line up with the building correctly
				newWindow.rotation.y = Math.PI / 2;

				// Align window with building face
				newWindow.position.x -= buildingWidth / 2;

				// Adjust y and x pos based on loop
				newWindow.position.z -= windowSpaceValue; // Left align all windows first
				newWindow.position.z += windowSpaceValue * j; // Then change x pos based on loop
				newWindow.position.y = windowSpaceValue * i; // Set y pos based on loop too

				building.add(newWindow);
			}
		}
	}
};

const createWindow = () => {
	// Constants
	const windowRadius = 0.7;

	// Geometry - TorusGeometry to create a window with thickness instead of RingGeometry which I also tried
	const windowGeometry = new THREE.TorusGeometry(
		windowRadius,
		windowRadius / 6,
		6,
		4,
	);
	// Material
	const windowMaterial = new THREE.MeshBasicMaterial({
		color: 0xffff00,
	});
	// Object
	const newWindow = new THREE.Mesh(windowGeometry, windowMaterial);

	newWindow.rotation.z = Math.PI / 4;

	return newWindow;
};
