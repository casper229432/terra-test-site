// src/components/StarCanvasBackground.tsx
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { Vector3, Object3D, InstancedMesh } from "three";

// === 可調整參數區 START ===
// 星星總數
const STAR_COUNT = 1000;
// 星星移動速度
const SPEED = 0.1;
// 星星幾何體大小
const STAR_SIZE = 0.06;
// 星星幾何體細分程度 [radius, widthSegments, heightSegments]
// 星星几何体参数：radius, widthSegments, heightSegments
const STAR_GEOMETRY: [number, number, number] = [STAR_SIZE, 8, 8];
// 星星自身發光強度
const EMISSIVE_INTENSITY = 1;
// 環境光強度
const AMBIENT_LIGHT_INTENSITY = 0.5;
// Bloom 特效參數
const BLOOM_SETTINGS = {
  luminanceThreshold: 0.1,
  luminanceSmoothing: 0.5,
  intensity: 1.5,
  radius: 0.6,
  height: 300,
};
// 色差偏移量
const CHROMA_OFFSET: [number, number] = [0.001, 0.001];
// === 可調整參數區 END ===

function Stars() {
  // 引用 InstancedMesh
  const mesh = useRef<InstancedMesh>(null!);
  // 暫存物件用於更新矩陣
  const dummy = useMemo(() => new Object3D(), []);

  // 隨機生成初始位置
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

  // 每幀更新星星位置
  useFrame(() => {
    const instancedMesh = mesh.current!;
    positions.forEach((pos, i) => {
      pos.z += SPEED;
      if (pos.z > 0) pos.z = -200;
      dummy.position.set(pos.x, pos.y, pos.z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    });
    instancedMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, STAR_COUNT] as any}>
      {/* 星星幾何體 */}
      <sphereGeometry args={STAR_GEOMETRY} />
      {/* 星星材質：使用自發光以提升亮度 */}
      <meshStandardMaterial
        emissive="white"
        emissiveIntensity={EMISSIVE_INTENSITY}
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
        {/* 環境光 */}
        <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
        {/* 星星 */}
        <Stars />
        {/* 後處理特效 */}
        <EffectComposer>
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
