import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Trail, Float } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

// Composant pour les particules abstraites
function AbstractParticles({ count = 50 }) {
  const mesh = useRef();
  const { viewport } = useThree();

  // Créer des positions aléatoires pour les particules
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const factor = viewport.width * 1.5;
      const x = Math.random() * factor - factor / 2;
      const y = Math.random() * factor - factor / 2;
      const z = Math.random() * 10 - 5;
      const size = Math.random() * 0.5 + 0.1;
      temp.push({ x, y, z, size });
    }
    return temp;
  }, [count, viewport]);

  // Animation des particules
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <group ref={mesh}>
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color="#6495ED" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// Composant pour les lignes abstraites
function AbstractLines({ count = 15 }) {
  const lines = useRef([]);
  const { viewport } = useThree();

  // Créer des lignes aléatoires
  const lineData = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const factor = viewport.width * 1.5;
      const x1 = Math.random() * factor - factor / 2;
      const y1 = Math.random() * factor - factor / 2;
      const z1 = Math.random() * 10 - 5;

      const x2 = x1 + (Math.random() * 4 - 2);
      const y2 = y1 + (Math.random() * 4 - 2);
      const z2 = z1 + (Math.random() * 4 - 2);

      temp.push({
        points: [new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2)],
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5),
      });
    }
    return temp;
  }, [count, viewport]);

  useFrame((state) => {
    lines.current.forEach((line, i) => {
      if (line) {
        line.rotation.x = state.clock.getElapsedTime() * 0.1 * (i % 2 ? 1 : -1);
        line.rotation.y =
          state.clock.getElapsedTime() * 0.05 * (i % 2 ? 1 : -1);
      }
    });
  });

  return (
    <group>
      {lineData.map((line, i) => (
        <mesh key={i} ref={(el) => (lines.current[i] = el)}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={
                new Float32Array([
                  line.points[0].x,
                  line.points[0].y,
                  line.points[0].z,
                  line.points[1].x,
                  line.points[1].y,
                  line.points[1].z,
                ])
              }
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={line.color} linewidth={2} />
        </mesh>
      ))}
    </group>
  );
}

// Composant pour le modèle Sky avec animation avancée
function SkyModel({ count = 5, ...props }) {
  const group = useRef();
  const modelRefs = useRef([]);
  const { viewport, camera } = useThree();

  // Charger le modèle
  const { nodes, materials } = useGLTF("/models/sky.glb");

  // Créer plusieurs instances du modèle pour un effet plus riche
  const models = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const factor = viewport.width * 1.5;
      const x = Math.random() * factor - factor / 2;
      const y = Math.random() * factor - factor / 2;
      const z = Math.random() * 10 - 5;
      const scale = 0.5 + Math.random() * 0.5;
      const speed = 0.2 + Math.random() * 0.3;
      const rotationSpeed = 0.1 + Math.random() * 0.2;
      const delay = i * 0.5;
      temp.push({ x, y, z, scale, speed, rotationSpeed, delay });
    }
    return temp;
  }, [count, viewport]);

  // Configurer les animations GSAP pour chaque modèle
  useEffect(() => {
    modelRefs.current.forEach((model, i) => {
      if (!model) return;

      // Animation initiale
      gsap.set(model.position, {
        x: models[i].x - viewport.width,
        y: models[i].y,
        z: models[i].z,
      });

      // Animation de vol infini
      const tl = gsap.timeline({
        repeat: -1,
        delay: models[i].delay,
        onRepeat: () => {
          // Réinitialiser à une position aléatoire à chaque répétition
          gsap.set(model.position, {
            x: -viewport.width - Math.random() * 5,
            y: (Math.random() - 0.5) * viewport.height,
            z: (Math.random() - 0.5) * 10,
          });
        },
      });

      tl.to(model.position, {
        x: viewport.width + Math.random() * 5,
        y: model.position.y + (Math.random() - 0.5) * 10,
        z: model.position.z + (Math.random() - 0.5) * 5,
        duration: 10 + Math.random() * 15,
        ease: "power1.inOut",
      });

      // Animation de rotation
      gsap.to(model.rotation, {
        x: Math.PI * 2 * (Math.random() > 0.5 ? 1 : -1),
        y: Math.PI * 2 * (Math.random() > 0.5 ? 1 : -1),
        z: Math.PI * 2 * (Math.random() > 0.5 ? 1 : -1),
        duration: 20 + Math.random() * 30,
        repeat: -1,
        ease: "none",
      });
    });

    // Nettoyage des animations à la destruction du composant
    return () => {
      modelRefs.current.forEach((model) => {
        if (model) {
          gsap.killTweensOf(model.position);
          gsap.killTweensOf(model.rotation);
        }
      });
    };
  }, [models, viewport]);

  return (
    <group ref={group} {...props}>
      {models.map((model, i) => (
        <group
          key={i}
          ref={(el) => (modelRefs.current[i] = el)}
          scale={model.scale}
        >
          <Trail
            width={2}
            color={new THREE.Color(0.2, 0.5, 0.8)}
            length={5}
            decay={1}
            local
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes["Long_&_Narrow_Plane"].geometry}
              position={[-2.929, 0, 0]}
              scale={[1, 1, 1.897]}
            >
              <meshStandardMaterial
                color="#ffffff"
                roughness={0.3}
                metalness={0.1}
                emissive="#6495ED"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Trail>
        </group>
      ))}
    </group>
  );
}

// Composant principal
export default function Sky3D() {
  const containerRef = useRef();

  // Animation d'entrée pour le conteneur
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
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
        <color attach="background" args={["transparent"]} />

        {/* Éclairage */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} color="#FFA500" />

        <Suspense fallback={null}>
          {/* Modèle principal avec animation */}
          <SkyModel count={7} />

          {/* Éléments abstraits */}
          <AbstractParticles count={80} />
          <AbstractLines count={20} />

          {/* Le globe flottant a été supprimé d'ici */}
        </Suspense>

        {/* Contrôles limités pour une meilleure expérience utilisateur */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}

// Préchargement du modèle
useGLTF.preload("/models/sky.glb");
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
