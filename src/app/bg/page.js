"use client";
import React, { useRef } from 'react';
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
#define t iTime
#define r iResolution.xy

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
varying vec2 vUv;

vec3 palette(float t) {
  vec3 a = vec3(0.1, 0.0, 0.0); // Neon green
  vec3 b = vec3(0.5, 0.0, 1.0); // Neon purple
  vec3 c = vec3(1.0, 1.0, 1.0); // Frequency of color variation
  vec3 d = vec3(0.263, 0.416, 0.557); // Phase shift

  // To change colors, modify the values of 'a', 'b', 'c', and 'd'
  return a + b * cos(6.28318 * (c * t + d));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 c = vec3(0.0);
  float l, z = t;
  
  for(int i = 0; i < 3; i++) {
    vec2 uv, p = fragCoord.xy / r;
    uv = p;
    p -= 0.5;
    p.x *= r.x / r.y;
    z += 0.07;
    l = length(p);
    uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z - z));
    c[i] = 0.01 / length(mod(uv, 1.0) - 0.5);
  }

  vec3 finalColor = vec3(0.0);
  vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
  vec2 uv0 = uv;

  for (float i = 0.0; i < 6.0; i++) { // Increased complexity
    uv = fract(uv * 2.0) - 0.5; // More fractal layers
    float d = length(uv) * exp(-length(uv0));
    vec3 col = palette(length(uv0) + i * 0.3 + iTime * 0.3); // Adjusted color timing
    d = sin(d * 10.0 + iTime) / 10.0; // Increased frequency
    d = abs(d);
    d = pow(0.01 / d, 1.5); // Adjusted exponent for brightness
    finalColor += col * d;
  }

  // Combine the two effects
  finalColor += c / l;

  // Ensure no white color by normalizing the final color
  finalColor = clamp(finalColor, 0.0, 1.0);

  fragColor = vec4(finalColor, 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const WaveRenderer = () => {
  const shaderRef = useRef();
  const { size, mouse } = useThree();

  useFrame(({ clock }) => {
    shaderRef.current.uniforms.iTime.value = clock.getElapsedTime();
    shaderRef.current.uniforms.iResolution.value = new THREE.Vector2(size.width, size.height);
    shaderRef.current.uniforms.iMouse.value = new THREE.Vector2(mouse.x * size.width / 2, mouse.y * size.height / 2);
  });

  return (
    <mesh>
      <planeGeometry args={[size.width / 100, size.height / 100]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2() },
          iMouse: { value: new THREE.Vector2() },
        }}
      />
    </mesh>
  );
};

const Wave = () => {
  const handleClick = (e) => {
    console.log('Canvas clicked!', e);
  };

  return (
    <Canvas
      onClick={handleClick}
      style={{ width: '100%', height: '100vh' }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 0, 1],
      }}
    >
      <WaveRenderer />
    </Canvas>
  );
};

export default Wave;
