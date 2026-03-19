import * as THREE from 'three';
import { setupScene } from './setup.js';
import { doProceduralGeneration } from './generation.js';

setupScene();
doProceduralGeneration();
setTimeout(doProceduralGeneration, 3000); // For testing
