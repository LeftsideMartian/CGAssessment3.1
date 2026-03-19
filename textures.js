import * as THREE from '/build/three.module.js';

export let concreteTexture;
export let gravelConcreteTexture;
const textureLoader = new THREE.TextureLoader();

export const loadTextures = () => {
	loadConcreteTexture();
	loadGravelConcreteTexture();
};

const loadConcreteTexture = () => {
	concreteTexture = textureLoader.load('/public/concreteFloorTexture.jpg');
	concreteTexture.wrapS = THREE.RepeatWrapping;
	concreteTexture.wrapT = THREE.RepeatWrapping;
	concreteTexture.repeat.set(4, 4);
};

const loadGravelConcreteTexture = () => {
	gravelConcreteTexture = textureLoader.load(
		'/public/gravelConcreteTexture.jpg',
	);
	gravelConcreteTexture.wrapS = THREE.ClampToEdgeWrapping;
	gravelConcreteTexture.wrapT = THREE.ClampToEdgeWrapping;
	gravelConcreteTexture.repeat.set(1, 1);
};
