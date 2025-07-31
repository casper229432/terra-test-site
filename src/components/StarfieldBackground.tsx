import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { Vector3, Object3D, InstancedMesh } from "three";

const STAR_COUNT = 1000;

function Stars() {
  const mesh = useRef<InstancedMesh | null>(null);
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
    if (!mesh.current) return;

    for (let i = 0; i < STAR_COUNT; i++) {
      const pos = positions[i];
      pos.z += 0.02; // 恆定緩慢速度
      if (pos.z > 0) pos.z = -200;

      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, STAR_COUNT]}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial color="white" />
    </instancedMesh>
  );
}

export default function StarfieldBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Stars />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
