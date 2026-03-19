import * as THREE from 'three';
import { setupScene } from './setup.js';
import { doProceduralGeneration } from './generation.js';

const windowVariance = 0.8;
const barDisplacement = 0.3;

setupScene();
doProceduralGeneration(windowVariance, barDisplacement);
const callGen = () => doProceduralGeneration(windowVariance, barDisplacement);

setInterval(callGen, 5000);
