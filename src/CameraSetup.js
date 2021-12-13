import * as THREE from "three";

export function createCamera() {
    const fov = 35;
    this.aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, this.aspect, near, far);
    this.camera.position.x = 0.0;
    this.camera.position.y = 0.0;
    this.camera.position.z = 0.8;

    return this.camera;
}