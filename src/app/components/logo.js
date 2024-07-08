'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

function Model(props) {
  const { scene, animations } = useGLTFLoader('https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/images/welcome.glb');
  const mixerRef = useRef(null);

  useEffect(() => {
    if (scene && animations.length) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixerRef.current.clipAction(clip).play();
      });
    }
  }, [scene, animations]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  scene.position.set(0, -7, 0);

  return <primitive object={scene} {...props} scale={[0.6, 0.6, 0.6]} />;
}

function useGLTFLoader(url) {
  const [gltf, setGLTF] = useState({ scene: null, animations: [] });

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (data) => {
      setGLTF({ scene: data.scene, animations: data.animations });
    });
  }, [url]);

  return gltf;
}

function Environment({ files }) {
  const { scene, gl } = useThree();

  useEffect(() => {
    new RGBELoader().load(files, (texture) => {
      const pmremGenerator = new THREE.PMREMGenerator(gl);
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });
  }, [files, scene, gl]);

  return null;
}

const LogoScene = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.5;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(1, -2, 1);
    scene.add(directionalLight2);

    new RGBELoader().load('https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/images/ambient.hdr', (texture) => {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/images/welcome.glb', (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      scene.add(model);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (canvas) {
        canvas.parentNode.removeChild(canvas);
      }
      controls.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default LogoScene;
