'use client';

import { Canvas, useFrame, useLoader, useThree, extend } from '@react-three/fiber';
import { Suspense, useState, useEffect, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Extend so OrbitControls can be used as a JSX element
extend({ OrbitControls });

// Loader component for loading state
const Loader = () => {
  return <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading...</div>;
};

// Define polygon vertices for the valid area
const polygon = [
  { x: -50, y: -50 },
  { x: 50, y: -50 },
  { x: 50, y: 50 },
  { x: -50, y: 50 },
  // Add more points as necessary to form the complete boundary
];

// Ray-casting algorithm to check if point is inside polygon
const isPointInPolygon = (point, polygon) => {
  let isInside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;
    const intersect = ((yi > point.y) !== (yj > point.y)) &&
                      (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
    if (intersect) isInside = !isInside;
  }
  return isInside;
};

// Define possible booth sizes
const boothSizes = [
  { label: "3x3", size: 3, area: 9 },
  { label: "6x6", size: 6, area: 36 },
  { label: "9x9", size: 9, area: 81 },
  { label: "12x12", size: 12, area: 144 }
];

const Controls = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    return () => controls.dispose();
  }, [camera, gl]);
  return null;
};

const ExpoFloor = ({ updateQuoteDetails }) => {
  const [hovered, setHovered] = useState(false);
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [totalArea, setTotalArea] = useState(0);
  const [currentBoothSize, setCurrentBoothSize] = useState(boothSizes[0]); // Default to 3x3

  const textureLoader = new THREE.TextureLoader();
  const floorTexture = useLoader(THREE.TextureLoader, '/images/floorplan.png');
  const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });

  const handleFloorClick = useCallback((event) => {
    event.stopPropagation();
    const { x, y } = event.point;

    const gridX = Math.floor((x + 50) / currentBoothSize.size); // Adjust for grid size and position
    const gridY = Math.floor((y + 50) / currentBoothSize.size); // Adjust for grid size and position
    const squareX = gridX * currentBoothSize.size - 50 + currentBoothSize.size / 2;
    const squareY = gridY * currentBoothSize.size - 50 + currentBoothSize.size / 2;

    // Check if the point is inside the valid polygon area
    if (!isPointInPolygon({ x: squareX, y: squareY }, polygon)) {
      return;
    }

    const squareId = `${gridX},${gridY},${currentBoothSize.label}`;

    setSelectedSquares(prev => {
      if (prev.includes(squareId)) {
        const newSquares = prev.filter(id => id !== squareId);
        const newArea = newSquares.reduce((acc, id) => acc + boothSizes.find(size => size.label === id.split(',')[2]).area, 0);
        setTotalArea(newArea);
        return newSquares;
      } else {
        const newArea = totalArea + currentBoothSize.area;
        if (newArea <= 4620) { // Check if adding another square would exceed 4620 m2
          setTotalArea(newArea);
          return [...prev, squareId];
        }
      }
      return prev;
    });
  }, [currentBoothSize, totalArea]);

  const handleResetClick = () => {
    setSelectedSquares([]);
    setTotalArea(0);
  };

  useEffect(() => {
    const totalPriceMXN = totalArea * 13200; // Price per m2 in MXN
    const totalPriceUSD = totalArea * 800; // Price per m2 in USD

    updateQuoteDetails({
      size: `${totalArea} m2`,
      price: `${totalPriceMXN} MXN / ${totalPriceUSD} USD`
    });
  }, [totalArea, updateQuoteDetails]);

  const selectedMeshes = useMemo(() => {
    return selectedSquares.map((squareId, index) => {
      const [gridX, gridY, sizeLabel] = squareId.split(',');
      const boothSize = boothSizes.find(size => size.label === sizeLabel).size;
      return (
        <mesh key={index} position={[gridX * boothSize - 50 + boothSize / 2, gridY * boothSize - 50 + boothSize / 2, 0.01]}>
          <planeGeometry args={[boothSize, boothSize]} />
          <meshBasicMaterial color="rgba(255,0,0,0.5)" />
        </mesh>
      );
    });
  }, [selectedSquares]);

  return (
    <div className="relative w-full h-full">
      <div className="flex space-x-2 m-4 justify-center">
        {boothSizes.map(size => (
          <button
            key={size.label}
            onClick={() => setCurrentBoothSize(size)}
            className={`px-4 py-2 hover-gradient-amber-6 font-semibold rounded-md focus:outline-none ${currentBoothSize.label === size.label ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-500 hover:text-white transition-all duration-200`}
          >
            {size.label}
          </button>
        ))}
        <button onClick={handleResetClick} className="px-4 py-2 hover-gradient-amber-6 font-semibold rounded-md focus:outline-none bg-red-600 text-white hover:bg-red-500 transition-all duration-200">
          Reset Selection
        </button>
      </div>
      <Canvas className="w-full h-screen">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={<Loader />}>
          <mesh
            geometry={new THREE.PlaneGeometry(100, 100)} // Adjust the size according to your needs
            material={floorMaterial}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={handleFloorClick}
          />
        </Suspense>
        <Controls />
        {selectedMeshes}
      </Canvas>
    </div>
  );
};

export default ExpoFloor;