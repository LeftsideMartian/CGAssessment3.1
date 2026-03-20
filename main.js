import { setupScene } from './setup.js';
import { doProceduralGeneration } from './generation.js';
import { GUI } from 'three/src/gui/lil-gui.module.min.js';

let guiConfigObject = {
	windowVariance: 0.2, // Controls the threshold for window generation. Lower number will mean more windows
	barDisplacement: 0.3, // Controls the amount of random rotation in the window bars. Lower numbers will be stricter aligned, while higher values will have more rotation
	callGen: callGen,
};

function callGen() {
	doProceduralGeneration(
		guiConfigObject.windowVariance,
		guiConfigObject.barDisplacement,
	);
}

setupScene();
callGen();

// Anonymous function to create and configure GUI. Only needs to be run once
(() => {
	const sceneGui = new GUI();
	sceneGui
		.add(guiConfigObject, 'windowVariance', 0, 1)
		.name('Window Variance')
		.onFinishChange(callGen);

	sceneGui
		.add(guiConfigObject, 'barDisplacement', 0, 1)
		.name('Bar Displacement')
		.onFinishChange(callGen);

	sceneGui.add(guiConfigObject, 'callGen').name('Generate new windows');
})();
