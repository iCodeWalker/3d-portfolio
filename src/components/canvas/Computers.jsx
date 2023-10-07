import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber"; // canvas is just an empty canvas allowing us to place something on it.
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"; // will help us to draw on this canvas
import CanvasLoader from "../Loader";
// useGLTF allow us to import 3d models
const Computers = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <primitive object={computer.scene} />
    </mesh>
  );
};

// To view our 3d model we have to add this to canvas

const ComputersCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.Pi / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default Computers;

// 1. Just like div in React we have <mesh> in three.js
// 2. inside mesh we have to create a light because otherwise we wouldn't be able to see anything.
// 3. primitive
// 4. camera defines : where are we looking at this model from.

// In 3d it is most important where the camera and the lights are coming from.

// Suspense allow us to show a loader till our model is loading.
// OrbitalControls are going to allow us to move the model left and right
