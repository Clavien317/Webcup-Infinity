import { useGLTF } from "@react-three/drei";

// Préchargement des modèles
useGLTF.preload("/src/assets/3d/sky.glb");

export { default as Sky } from "./Sky";
