// src/components/StarCanvasBackground.tsx
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { Vector3, Object3D, InstancedMesh } from "three";

const STAR_COUNT = 1000;
const SPEED = 0.1;

function Stars() {
  const mesh = useRef<InstancedMesh>(null!);
  const dummy = useMemo(() => new Object3D(), []);
  const positions = useMemo(() => {
    const temp: Vector3[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = -Math.random() * 200;
      temp.push(new Vector3(x, y, z));
    }
    return temp;
  }, []);

  useFrame(() => {
    const instancedMesh = mesh.current!;
    const obj = dummy;
    positions.forEach((pos, i) => {
      pos.z += SPEED;
      if (pos.z > 0) pos.z = -200;
      obj.position.set(pos.x, pos.y, pos.z);
      obj.updateMatrix();
      instancedMesh.setMatrixAt(i, obj.matrix);
    });
    instancedMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, STAR_COUNT] as any}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial
        emissive="white"
        emissiveIntensity={2}
        color="white"
        toneMapped={false}
      />
    </instancedMesh>
  );
}

export default function StarCanvasBackground() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none">
      <Canvas
        className="w-full h-full !filter-none"
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <Stars />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.1}
            luminanceSmoothing={0.5}
            intensity={1.5}
            radius={0.6}
            height={300}
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
