import * as THREE from 'three';
import { setupScene } from './setup.js';
import { doProceduralGeneration } from './generation.js';

setupScene();
doProceduralGeneration(0.8, 0.3);
