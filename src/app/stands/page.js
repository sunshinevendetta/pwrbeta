"use client";
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const GLB_CONTAINER_STYLE = { width: '100%', height: '100%', position: 'relative' };

const Stands = () => {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooth, setSelectedBooth] = useState(1);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [controls, setControls] = useState(null);
  const [model, setModel] = useState(null);

  const glbFiles = Array.from({ length: 11 }, (_, i) => `/images/3d/booth${i + 1}.glb`);
  const hdrPath = 'https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/images/ambient.hdr';

  useEffect(() => {
    if (!containerRef.current) return;

    const initScene = async () => {
      const loadingManager = new THREE.LoadingManager();
      loadingManager.onProgress = (item, loaded, total) => {
        setLoadingProgress((loaded / total) * 100);
      };
      loadingManager.onLoad = () => {
        setIsLoading(false);
      };

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 5);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      new RGBELoader(loadingManager).load(hdrPath, (texture) => {
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

      const loadModel = (index) => {
        setIsLoading(true);
        loader.load(glbFiles[index - 1], (gltf) => {
          if (model) {
            scene.remove(model);
            model.traverse((child) => {
              if (child.isMesh) {
                child.geometry.dispose();
                child.material.dispose();
              }
            });
          }
          const newModel = gltf.scene;
          scene.add(newModel);
          setModel(newModel);
          setIsLoading(false);
        }, undefined, (error) => {
          console.error(`An error occurred while loading booth${index}.glb:`, error);
        });
      };

      loadModel(selectedBooth);

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
        renderer.render(scene, camera);
      };

      animate();

      setScene(scene);
      setRenderer(renderer);
      setControls(controls);

      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        observer.disconnect();
      };
    };

    initScene();
  }, []);

  useEffect(() => {
    if (scene && renderer) {
      const loadModel = () => {
        setIsLoading(true);
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onLoad = () => {
          setIsLoading(false);
        };

        const dracoLoader = new DRACOLoader(loadingManager);
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        
        const loader = new GLTFLoader(loadingManager);
        loader.setDRACOLoader(dracoLoader);

        loader.load(glbFiles[selectedBooth - 1], (gltf) => {
          if (model) {
            scene.remove(model);
            model.traverse((child) => {
              if (child.isMesh) {
                child.geometry.dispose();
                child.material.dispose();
              }
            });
          }
          const newModel = gltf.scene;
          scene.add(newModel);
          setModel(newModel);
        }, undefined, (error) => {
          console.error(`An error occurred while loading booth${selectedBooth}.glb:`, error);
        });
      };

      loadModel();
    }
  }, [selectedBooth]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', backgroundColor: '#f0f0f0', overflowY: 'auto' }}>
        <h1>Choose Booth</h1>
        {glbFiles.map((file, index) => (
          <button
            key={index}
            onClick={() => setSelectedBooth(index + 1)}
            style={{ display: 'block', width: '100%', padding: '10px', textAlign: 'left', border: 'none', backgroundColor: selectedBooth === index + 1 ? '#ddd' : '#fff' }}
          >
            Booth {index + 1}
          </button>
        ))}
      </div>
      <div ref={containerRef} style={{ width: '80%', position: 'relative' }}>
        {isLoading && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center' }}>
            <div style={{ width: '100px', height: '20px', border: '1px solid #000' }}>
              <div style={{ width: `${loadingProgress}%`, height: '100%', background: '#000' }}></div>
            </div>
            <p>{Math.round(loadingProgress)}%</p>
          </div>
        )}
        <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}></div>
      </div>
    </div>
  );
};

export default Stands;
