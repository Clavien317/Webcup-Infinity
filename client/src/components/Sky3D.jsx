import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

export default function Sky3D({ scrollY = 0 }) {
  const group = useRef();
  const { theme } = useTheme();
  const { camera } = useThree();

  // Référence pour l'animation personnalisée
  const animationRef = useRef({
    speed: 0.5,
    direction: new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      0
    ).normalize(),
    rotationSpeed: 0.02,
    timeSinceDirectionChange: 0,
    directionChangeInterval: Math.random() * 3 + 2, // Changer de direction toutes les 2-5 secondes
  });

  // Chargement du modèle 3D
  const { nodes, materials, animations } = useGLTF("/models/sky.glb");
  const { actions } = useAnimations(animations, group);

  // Configurer la caméra
  useEffect(() => {
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // Jouer l'animation si elle existe
    if (actions && actions.animation) {
      actions.animation.play();
    }

    return () => {
      if (actions && actions.animation) {
        actions.animation.stop();
      }
    };
  }, [camera, actions]);

  // Animation naturelle et dynamique
  useFrame((state, delta) => {
    if (group.current) {
      const anim = animationRef.current;

      // Mettre à jour le compteur de temps
      anim.timeSinceDirectionChange += delta;

      // Changer de direction périodiquement pour un mouvement plus naturel
      if (anim.timeSinceDirectionChange > anim.directionChangeInterval) {
        anim.direction
          .set(Math.random() * 2 - 1, Math.random() * 2 - 1, 0)
          .normalize();

        // Varier la vitesse pour un effet plus naturel
        anim.speed = Math.random() * 0.5 + 0.3; // Vitesse entre 0.3 et 0.8
        anim.rotationSpeed = Math.random() * 0.03 + 0.01; // Rotation entre 0.01 et 0.04
        anim.directionChangeInterval = Math.random() * 3 + 2; // Prochain changement dans 2-5 secondes
        anim.timeSinceDirectionChange = 0;
      }

      // Appliquer le mouvement
      group.current.position.x += anim.direction.x * delta * anim.speed;
      group.current.position.y += anim.direction.y * delta * anim.speed;

      // Limiter la position pour rester visible dans la scène
      group.current.position.x = THREE.MathUtils.clamp(
        group.current.position.x,
        -5,
        5
      );
      group.current.position.y = THREE.MathUtils.clamp(
        group.current.position.y,
        -3,
        3
      );

      // Rotation douce
      group.current.rotation.z += delta * anim.rotationSpeed;

      // Effet de parallaxe basé sur le scroll
      group.current.position.y -= scrollY * 0.002;
    }
  });

  // Couleurs basées sur le thème avec pink-500 comme base
  const skyColor =
    theme === "dark"
      ? new THREE.Color("#ec4899").multiplyScalar(0.3) // pink-500 plus sombre
      : new THREE.Color("#ec4899").multiplyScalar(1.2); // pink-500 plus clair

  return (
    <group ref={group} dispose={null}>
      {/* Le modèle de ciel original (fuser) */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Long_&_Narrow_Plane"].geometry}
        position={[-2.929, 0, 0]}
        scale={[1, 1, 1.897]}
      >
        <meshStandardMaterial
          color={skyColor}
          metalness={0.3}
          roughness={0.7}
          envMapIntensity={0.6}
          emissive={
            theme === "dark"
              ? new THREE.Color("#ec4899").multiplyScalar(0.15)
              : new THREE.Color("#ec4899").multiplyScalar(0.05)
          }
        />
      </mesh>

      {/* Lumières pour éclairer la scène */}
      <ambientLight intensity={theme === "dark" ? 0.2 : 0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={theme === "dark" ? 0.7 : 1.2}
        color={theme === "dark" ? "#ec4899" : "#ffffff"}
      />
      <pointLight
        position={[-5, 0, 3]}
        intensity={theme === "dark" ? 0.3 : 0.5}
        color="#ec4899"
        distance={10}
        decay={2}
      />
    </group>
  );
}

// Préchargement du modèle
useGLTF.preload("/models/sky.glb");
