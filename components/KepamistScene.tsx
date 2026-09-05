"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, ContactShadows, Float, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { Color, Group, MathUtils, type AmbientLight } from "three";

const MODEL_URL = "/kepamist.glb";
const DRACO_PATH = "/draco/";
useGLTF.preload(MODEL_URL, DRACO_PATH);

const CALM = new Color("#cfd8ff");
const MAX_KEPAM = new Color("#ff2d2d");

function Kepamist({ score }: { score: number }) {
  const { scene } = useGLTF(MODEL_URL, DRACO_PATH);
  const group = useRef<Group>(null);
  const gl = useThree((s) => s.gl);
  // Drag-to-rotate state: horizontal pointer drags spin the model; the fling decays back into auto-spin.
  const drag = useRef({ active: false, lastX: 0, fling: 0 });

  useEffect(() => {
    const el = gl.domElement;
    const d = drag.current;
    const down = (e: PointerEvent) => {
      d.active = true;
      d.lastX = e.clientX;
      d.fling = 0;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!d.active || !group.current) return;
      const dx = e.clientX - d.lastX;
      d.lastX = e.clientX;
      group.current.rotation.y += dx * 0.012;
      d.fling = dx * 0.012 * 60; // rad/s, assuming ~60 events per second
    };
    const up = () => {
      d.active = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((_, dt) => {
    if (!group.current) return;
    const d = drag.current;
    if (!d.active) {
      // Idle turntable that spins up to a frantic blur at 100%, plus any leftover fling.
      const speed = 0.25 + (score / 100) ** 2 * 3;
      group.current.rotation.y += (speed + d.fling) * dt;
      d.fling *= Math.exp(-3 * dt);
    }
    const targetScale = 1 + (score / 100) * 0.12;
    const s = MathUtils.damp(group.current.scale.x, targetScale, 3, dt);
    group.current.scale.setScalar(s);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={group} position={[0, -0.1, 0]}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </Float>
  );
}

function StudioLights({ score }: { score: number }) {
  const ambient = useRef<AmbientLight>(null);

  useFrame((_, dt) => {
    if (!ambient.current) return;
    // "Maximum Kepam": ambient goes blood red past 80%.
    const target = score > 80 ? MAX_KEPAM : CALM;
    ambient.current.color.lerp(target, 1 - Math.exp(-4 * dt));
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={score > 80 ? 1.6 : 0.7} color={CALM} />
      <directionalLight position={[3, 5, 4]} intensity={2.8} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.9} color="#8ec5ff" />
      <pointLight position={[0, 1.5, -3]} intensity={score > 80 ? 40 : 12} color="#ff4d6d" />
    </>
  );
}

export default function KepamistScene({ score }: { score: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      dpr={[1, 1.75]}
      shadows
      gl={{ antialias: true, alpha: true }}
      className="touch-pan-y cursor-grab active:cursor-grabbing"
    >
      <StudioLights score={score} />
      <Suspense fallback={null}>
        <Kepamist score={score} />
      </Suspense>
      <ContactShadows position={[0, -1.15, 0]} opacity={0.5} scale={5} blur={2.4} far={2} />
    </Canvas>
  );
}
