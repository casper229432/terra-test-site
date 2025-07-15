// src/components/StarfieldTransition.tsx
import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { Vector3, Object3D, InstancedMesh } from "three";
import { motion } from "framer-motion";

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
      pos.z += 1.5;
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

export default function StarfieldTransition({ onComplete }: { onComplete?: () => void }) {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowStars(true); // 1.7 秒後啟動星體動畫
    }, 1700);

    const timer2 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000); // 全部約 4 秒（黑屏 + 字幕 + 星體）後跳轉

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-screen h-screen bg-black z-[9999]"
    >
      {/* Subtitle：黑頻時出現 */}
      <motion.div
        className="absolute top-1/2 left-1/2 text-white text-xl md:text-2xl font-semibold"
        style={{ transform: "translate(-50%, -50%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 1.7 }}
      >
        命運，不會給你第二次機會。
      </motion.div>

      {/* Starfield Canvas：延後出現 */}
      {showStars && (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Stars />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            <ChromaticAberration offset={[0.001, 0.001]} />
          </EffectComposer>
        </Canvas>
      )}
    </motion.div>
  );
}
