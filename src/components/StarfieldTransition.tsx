import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { Vector3, Object3D, InstancedMesh } from "three";
import { motion, AnimatePresence } from "framer-motion";

let subtitleShown = false;
const STAR_COUNT = 1000;

function Stars({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
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

    // 更新速度（每幀增加一點）
    speedRef.current = Math.min(speedRef.current + 0.06, 6); // 緩慢加速上限為6

    for (let i = 0; i < STAR_COUNT; i++) {
      const pos = positions[i];
      pos.z += speedRef.current;
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

function CameraShake({ trigger }: { trigger: boolean }) {
  const { camera } = useThree();
  const shakeIntensity = 0.05;
  useFrame(() => {
    if (trigger) {
      camera.position.x = Math.sin(Date.now() * 0.01) * shakeIntensity;
      camera.position.y = Math.cos(Date.now() * 0.008) * shakeIntensity;
    }
  });
  return null;
}

export default function StarfieldTransition({ onComplete }: { onComplete?: () => void }) {
  const [showStars, setShowStars] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [shakeCamera, setShakeCamera] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const speedRef = useRef(1);

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    if (!subtitleShown) {
      setShowSubtitle(true);
      subtitleShown = true;
    }

    timers.push(
      setTimeout(() => {
        setShowStars(true);
        setShowSubtitle(false);
      }, 1700)
    );

    timers.push(
      setTimeout(() => {
        setShakeCamera(true); // 開始晃動
      }, 3000)
    );

    timers.push(
      setTimeout(() => {
        setShowFlash(true); // 閃白轉場
      }, 3900)
    );

    timers.push(
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 4200)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-screen h-screen bg-black z-[9999]"
    >
      {/* Subtitle */}
      <AnimatePresence>
        {showSubtitle && (
          <motion.div
            className="absolute top-1/2 left-1/2 w-full text-center text-white text-[17px] md:text-2xl font-semibold px-4"
            style={{ transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.7 }}
          >
            命運，不會給你第二次機會。
          </motion.div>
        )}
      </AnimatePresence>

      {/* Starfield + Shake */}
      {showStars && (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Stars speedRef={speedRef} />
          <CameraShake trigger={shakeCamera} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            <ChromaticAberration offset={[0.001, 0.001]} />
          </EffectComposer>
        </Canvas>
      )}

      {/* Flash white overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
