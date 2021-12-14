<script context="module">
    "use strict";

    import * as THREE from "three";
    import { WEBGL } from "./WebGL";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import Stats from "three/examples/jsm/libs/stats.module";

    let scene;
    let geometry;
    let material;
    let cube;
    let light;
    let camera;
    let renderer;
    let controls;
    let stats;

    export function init(canvas, progress) {
        setScene();
        setRenderer();
        //loadModel(progress);
        setCamera();
        setControls();
        stats = new Stats();
        canvas.appendChild(renderer.domElement);
        canvas.appendChild(stats.dom);
        controls.update();

        if (WEBGL.isWebGLAvailable()) {
            // Initiate function or other initializations here
            animate();
        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.getElementById("container").appendChild(warning);
        }
        window.addEventListener("resize", windowOnResize);
    }

    const setScene = () => {
        scene = new THREE.Scene();
        scene.background = new THREE.Color("gray");
        geometry = new THREE.BoxBufferGeometry(2, 2, 2);
        material = new THREE.MeshStandardMaterial({ color: "red" });
        cube = new THREE.Mesh(geometry, material);
        light = new THREE.DirectionalLight("white", 8);
        light.castShadow = true;
        light.position.set(10, 10, 10);
        scene.add(cube, light);
    };

    const setCamera = () => {
        const fov = 75;
        const near = 0.1;
        const aspect = window.innerWidth / window.innerHeight;
        const far = 1000;
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, 5);
    };

    const setControls = () => {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.rotateSpeed = 0.9;
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.enableRotate = true;
        controls.minDistance = 2;
        controls.maxDistance = 10;
    };

    const setRenderer = () => {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.physicallyCorrectLights = true;
    };

    const loadModel = (container) => {
        const loader = new GLTFLoader();
        loader.load(
            "assets/models/model.glb",
            function (gltf) {
                model = gltf.scene;
                scene.add(model);

                model.traverse(function (object) {
                    if (object.isMesh) object.castShadow = true;
                });
            },
            function (xhr) {
                let progressValue = (xhr.loaded / xhr.total) * 100;
                progressDisplay(container, progressValue);
           },
            function (error) {
                console.error(error);
            }
        );
    };

    const progressDisplay = (container, value) => {
        container.appendChild(value);
    }

    const animate = () => {
        requestAnimationFrame(animate);

        try {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            controls.update();
            stats.update();
            render();
        } catch (err) {
            throw new Error("WHOOPS.", { cause: err });
        }
    };

    const render = () => {
        renderer.render(scene, camera);
    };

    const windowOnResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    //Three.js does not have an automatic way to flush
    //things like geometries, materials, textures
    //So we have to call this function whenever we reload
    //the page
    export const onReload = () => {
        if (scene !== undefined) {
            if (geometry !== undefined) {
                geometry.dispose();
                geometry = new THREE.BoxBufferGeometry(2, 2, 2);
            }

            if (material !== undefined) {
                material.dispose();
                material = new THREE.MeshStandardMaterial({ color: "red" });
            }
            /*  if (texture !== undefined) {
                     texture.dispose();
                     renderer.deallocate(texture);
                     //then add texture back to mesh 
                } */
        }
    };

    export const onRelease = () => {
            scene.remove(cube);
            geometry.dispose();
            material.dispose();
            //texture.dispose();

    };
</script>
