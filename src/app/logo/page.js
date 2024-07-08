'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const LogoScene = () => {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadScene = async () => {
      const loadingManager = new THREE.LoadingManager();
      loadingManager.onProgress = (item, loaded, total) => {
        setLoadingProgress((loaded / total) * 100);
      };
      loadingManager.onLoad = () => {
        setIsLoading(false);
      };

      const scene = new THREE.Scene();

      // Create the camera with a wide-angle lens
      const camera = new THREE.PerspectiveCamera(70, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 30); // Adjust camera position as needed

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.enablePan = true;
      controls.screenSpacePanning = false; // Lock panning vertically
      controls.maxPolarAngle = Math.PI / 2; // Lock movement up
      controls.minPolarAngle = Math.PI / 2; // Lock movement down

      const ambientLight = new THREE.AmbientLight(0xffffff, 5);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight1.position.set(1, 1, 1);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight2.position.set(1, -2, 1);
      scene.add(directionalLight2);

      new RGBELoader(loadingManager).load('https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/images/ambient.hdr', function (texture) {
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      });

      const dracoLoader = new DRACOLoader(loadingManager);
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

      const loader = new GLTFLoader(loadingManager);
      loader.setDRACOLoader(dracoLoader);

      let mixer;
      loader.load('https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/images/welcome.glb', function (gltf) {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center); // Center the model
        model.position.x -= 1; // Move model to the left by 1 unit. Adjust this value as needed.
        console.log('Model position:', model.position); // Log the model position to check if it's being updated
        scene.add(model);

        // Setup animation
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }, undefined, function (error) {
        console.error('An error happened:', error);
      });

      const onResize = () => {
        if (containerRef.current) {
          const { clientWidth, clientHeight } = containerRef.current;
          camera.aspect = clientWidth / clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(clientWidth, clientHeight);
        }
      };

      const observer = new ResizeObserver(onResize);
      observer.observe(containerRef.current);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        if (mixer) mixer.update(0.01); // Update the animation mixer
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        observer.disconnect();
      };
    };

    loadScene();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {isLoading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center' }}>
          <div style={{ width: '100px', height: '20px', border: '1px solid #000' }}>
            <div style={{ width: `${loadingProgress}%`, height: '100%', background: '#000' }}></div>
          </div>
          <p>{Math.round(loadingProgress)}%</p>
        </div>
      )}
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}></div>
    </div>
  );
};

export default LogoScene;
