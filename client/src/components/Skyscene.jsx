import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stars } from "@react-three/drei";
import { useEntranceAnimation } from "../hooks/useAnimations";
import * as THREE from "three";

// Composant pour le modèle Sky avec animation
function SkyModel({ scrollY, ...props }) {
  const modelRef = useRef();
  const { nodes, materials } = useGLTF("/src/assets/3d/sky.glb");

  // Animation basée sur le scroll et le temps
  useFrame((state) => {
    if (modelRef.current) {
      // Rotation douce basée sur le temps
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.1;

      // Mouvement basé sur le scroll
      const scrollFactor = scrollY.current / 1000;
      modelRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2 - scrollFactor;

      // Effet de flottement
      modelRef.current.position.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={modelRef} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Long_&_Narrow_Plane"].geometry}
        material={materials.Paper}
        position={[-2.929, 0, 0]}
        scale={[1, 1, 1.897]}
      >
        {/* Ajout d'un matériau personnalisé pour un meilleur rendu */}
        <meshStandardMaterial
          attach="material"
          color="#ffffff"
          roughness={0.3}
          metalness={0.1}
          emissive="#6495ED"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

// Composant pour les nuages
function Clouds({ count = 15, ...props }) {
  const cloudRef = useRef();

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={cloudRef} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 5 + 3,
            (Math.random() - 0.5) * 20,
          ]}
          rotation={[0, Math.random() * Math.PI * 2, 0]}
          scale={[1 + Math.random(), 1 + Math.random(), 1 + Math.random()].map(
            (s) => s * 1.5
          )}
        >
          <sphereGeometry args={[0.7, 8, 8]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.8}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Composant principal pour la scène 3D
export default function SkyScene() {
  const containerRef = useRef();
  const scrollY = useRef(0);

  // Animation d'entrée pour le conteneur
  useEntranceAnimation(".sky-scene-container", {
    y: 50,
    duration: 1.2,
    delay: 0.3,
  });

  // Suivi du scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="sky-scene-container w-full h-[70vh] md:h-[80vh] relative overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        shadows
        dpr={[1, 2]} // Optimisation pour les écrans haute résolution
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={["#87CEEB"]} />

        {/* Éclairage */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} color="#FFA500" />

        <Suspense fallback={null}>
          {/* Modèle principal */}
          <SkyModel scrollY={scrollY} position={[0, 0, 0]} scale={1.5} />

          {/* Éléments d'ambiance */}
          <Clouds />
          <Stars
            radius={100}
            depth={50}
            count={1000}
            factor={4}
            fade
            speed={1}
          />

          {/* Environnement pour l'éclairage réaliste */}
          <Environment preset="sunset" />
        </Suspense>

        {/* Contrôles limités pour une meilleure expérience utilisateur */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}

// Préchargement du modèle
useGLTF.preload("/src/assets/3d/sky.glb");
