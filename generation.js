import * as THREE from 'three';
import { scene, buildingWidth, buildingHeight, building } from './setup.js';

const windowSpaceValue = 1.3;
const windowRadius = 0.7;
const windowInnerRadius = windowRadius / 6;

const getRandomValue = (max) => Math.random() * max;

export const doProceduralGeneration = (windowVariance, barDisplacement) => {
	// Clear any existing children of the building object first
	building.clear();

	// Then generate windows on each face
	generateWindows(windowVariance, barDisplacement);
};

const generateWindows = (windowVariance, barDisplacement) => {
	const templateWindow = createWindow();

	// Loop through each face of the building (0-3: PosZ, PosX, NegZ, NegX)
	for (let sideIndex = 0; sideIndex < 4; sideIndex++) {
		// 2d for loop for grid positions on this face
		for (let gridY = -4; gridY < 6; gridY++) {
			for (let gridX = 0; gridX < 3; gridX++) {
				if (getRandomValue(1) >= windowVariance) {
					let newWindow = templateWindow.clone();
					newWindow = createWindowBars(newWindow, barDisplacement);

					// Rotate at origin based on which face (0, π/2, π, 3π/2)
					newWindow.rotation.y = (Math.PI / 2) * sideIndex;

					// Position based on which face
					newWindow.position.y = windowSpaceValue * gridY;

					if (sideIndex % 2 === 0) {
						// PosZ (0) or NegZ (2)
						newWindow.position.z =
							(sideIndex === 0 ? 1 : -1) * (buildingWidth / 2);
						newWindow.position.x = -windowSpaceValue + windowSpaceValue * gridX;
					} else {
						// PosX (1) or NegX (3)
						newWindow.position.x =
							(sideIndex === 1 ? 1 : -1) * (buildingWidth / 2);
						newWindow.position.z = -windowSpaceValue + windowSpaceValue * gridX;
					}

					building.add(newWindow);
				}
			}
		}
	}
};

const createWindow = () => {
	// Geometry - TorusGeometry to create a window with thickness instead of RingGeometry which I also tried
	const windowGeometry = new THREE.TorusGeometry(
		windowRadius,
		windowInnerRadius,
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

// Mutating method to add 2 randomly placed bars to the window
// barDisplacement is a value between 0 and 1 that determines how randomly rotated the window bars should be
const createWindowBars = (window, barDisplacement) => {
	const barThickness = 0.12;

	for (let i = 0; i < 2; i++) {
		const randomPosOrNeg = getRandomValue(1) >= 0.5 ? 1 : -1; // 50/50 between positive and negative
		const randomValue = getRandomValue(barDisplacement) * randomPosOrNeg;

		// Geometry
		const barGeometry = new THREE.BoxGeometry(barThickness, 1, barThickness);
		// Material
		const barMaterial = new THREE.MeshBasicMaterial({
			color: 0xffe000,
		});
		// Objects
		const windowBar = new THREE.Mesh(barGeometry, barMaterial);

		windowBar.rotation.z = ((i === 0 ? 1 : -1) * Math.PI) / 4 + randomValue;

		window.add(windowBar);
	}

	return window;
};
