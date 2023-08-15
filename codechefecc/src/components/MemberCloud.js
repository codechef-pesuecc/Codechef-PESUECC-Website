import React from "react";
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei';

import image1 from './CodeChefLOGO.png'
import image2 from './space.jpg'

const MemberCloud = () => {

  // Number of polka-dots you want on the sphere
  const numPolkaDots = 15;

  // Function to distribute points uniformly on the sphere's surface
  const fibonacciSphereSampling = (samples) => {
    const points = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio

    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // Radius at y

      const theta = phi * i; // Golden angle increment

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      points.push([x, y, z]);
    }

    return points;
  };

  // Main sphere radius
  const mainSphereRadius = 2;

  // Image size
  const imageSize = "100px";

  const imageUrls = [
    image1,image2,image2,image1,image2,image1,image2,image1,image2,image1,image2,image1,image2,image1
  ];

  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <hemisphereLight intensity={1} />
      <OrbitControls />
      {/* Main Sphere */}
      <mesh>
        <sphereGeometry args={[mainSphereRadius, 64, 64]} />
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      {/* Polka-dots */}
      {fibonacciSphereSampling(numPolkaDots).map((point, index) => (
        <Html
            key={index}
            position={point.map((coord) => coord * mainSphereRadius)}
            style={{
              pointerEvents: "none",
              width: imageSize, // Set the image size
              height: imageSize,
              backgroundImage: `url(${imageUrls[index % imageUrls.length]})`,
              backgroundSize: "cover",
            }}
          />
      ))}
    </Canvas>
  );
};

export default MemberCloud;