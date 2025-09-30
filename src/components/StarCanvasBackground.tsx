import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { Object3D, InstancedMesh, Vector3 } from "three";

const BASE_STAR_COUNT_DESKTOP = 1000;
const BASE_STAR_COUNT_MOBILE  = 600;
const SPEED = 0.10;
const STAR_SIZE = 0.06;
const STAR_GEOMETRY: [number, number, number] = [STAR_SIZE, 8, 8];
const BLOOM_SETTINGS = {
  luminanceThreshold: 0.1,
  luminanceSmoothing: 0.5,
  intensity: 1.5,
  radius: 0.6,
  height: 240,
};
const CHROMA_OFFSET: [number, number] = [0.001, 0.001];

function Stars({ count }: { count: number }) {
  const mesh = useRef<InstancedMesh>(null!);
  const dummy = useMemo(() => new Object3D(), []);
  const positions = useMemo(() => {
    const tmp: Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = -Math.random() * 200;
      tmp.push(new Vector3(x, y, z));
    }
    return tmp;
  }, [count]);

  useFrame(() => {
    const inst = mesh.current!;
    positions.forEach((pos, i) => {
      pos.z += SPEED;
      if (pos.z > 0) pos.z = -200;
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    inst.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count] as any}>
      <sphereGeometry args={STAR_GEOMETRY} />
      <meshBasicMaterial color="white" toneMapped={false} />
    </instancedMesh>
  );
}

export default function StarCanvasBackground() {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 768px)").matches;

  const starCount = isMobile ? BASE_STAR_COUNT_MOBILE : BASE_STAR_COUNT_DESKTOP;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none select-none">
      <Canvas
        className="w-full h-full !filter-none"
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >
        <Stars count={starCount} />
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={BLOOM_SETTINGS.luminanceThreshold}
            luminanceSmoothing={BLOOM_SETTINGS.luminanceSmoothing}
            intensity={BLOOM_SETTINGS.intensity}
            radius={BLOOM_SETTINGS.radius}
            height={BLOOM_SETTINGS.height}
          />
          <ChromaticAberration offset={CHROMA_OFFSET} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
