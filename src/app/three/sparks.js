"use client";
import React, { useRef } from 'react';
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  float hash21(vec2 x) {
    return fract(cos(mod(dot(x, vec2(13.9898, 8.141)), 3.14)) * 43758.5453);
  }

  vec2 hash22(vec2 uv) {
    uv = vec2(dot(uv, vec2(1.1,3.7)),
              dot(uv, vec2(26.5,183.3)));
    return 2.0 * fract(sin(uv) * 4.5) - 1.0;
  }

  float perlinNoise(vec2 uv)
  {
    vec2 iuv = floor(uv);
    vec2 fuv = fract(uv);
    vec2 blur = smoothstep(.0, 1., fuv);
    vec2 bl = vec2(.0, .0);
    vec2 br = vec2(1., .0);
    vec2 tl = vec2(.0, 1.);
    vec2 tr = vec2(1., 1.);
    vec2 bln = hash22(iuv + bl);
    vec2 brn = hash22(iuv + br);
    vec2 tln = hash22(iuv + tl);
    vec2 trn = hash22(iuv + tr);
    float b  = mix(dot(bln, fuv - bl), dot(brn, fuv - br), blur.x);
    float t  = mix(dot(tln, fuv - tl), dot(trn, fuv - tr), blur.x);
    float c = mix(b, t, blur.y);
    return c;
  }

  float fbm(vec2 uv, int octaves)
  {
    float value = .0;
    float ampitude  = 2.5;
    float freq = 2.;
    for(int i = 0; i < octaves; i++)
    {
      value += perlinNoise(uv) * ampitude;
      uv *= freq;
      ampitude *= .5;
    }
    return value;
  }

  vec3 neonGreen = vec3(0.0, 1.0, 0.0);
  vec3 neonPurple = vec3(0.5, 0.0, 1.0);

  vec3 customMix(vec3 a, vec3 b, float t) {
    float r = mix(a.r, b.r, t);
    float g = mix(a.g, b.g, t);
    float bValue = mix(a.b, b.b, t);
    return vec3(r, g, bValue);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - .5 * iResolution.xy) / iResolution.y;
    vec3 col = vec3(.0);

    vec2 uvTopLeft = uv - vec2(-.2, 0.5);
    vec2 uvBottomRight = uv - vec2(0.2, -0.5);

    uvTopLeft += fbm(uvTopLeft + iTime * .5, 20);
    uvBottomRight += fbm(uvBottomRight + iTime * .5, 20);

    float distTopLeft = length(uvTopLeft);
    float distBottomRight = length(uvBottomRight);

    float t = fract(iTime * 0.2);
    vec3 baseColor = customMix(neonPurple, neonGreen, t);

    col += baseColor * mix(.0, .05, hash21(vec2(iTime))) / distTopLeft;
    col += baseColor * mix(.0, .05, hash21(vec2(iTime))) / distBottomRight;

    // Intersection in the middle
    float intersectDist = min(distTopLeft, distBottomRight);
    col += baseColor * mix(-0.3, .2, hash21(vec2(iTime))) / intersectDist;

    gl_FragColor = vec4(col, 1.0);
  }
`;
const SparksComponent = () => {
  const shaderRef = useRef();
  const { size } = useThree();

  useFrame(({ clock }) => {
    shaderRef.current.uniforms.iTime.value = clock.getElapsedTime();
    shaderRef.current.uniforms.iResolution.value = new THREE.Vector2(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[size.width / 100, size.height / 100]} />
      <shaderMaterial
        ref={shaderRef}
        fragmentShader={fragmentShader}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2() },
        }}
      />
    </mesh>
  );
};

const Sparks = () => {
  return (
    <Canvas
      style={{ width: '100%', height: '100vh' }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 0, 1],
      }}
    >
      <SparksComponent />
    </Canvas>
  );
};

export default Sparks;