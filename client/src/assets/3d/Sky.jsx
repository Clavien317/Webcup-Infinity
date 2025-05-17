import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Sky(props) {
  const { nodes, materials } = useGLTF("/src/assets/3d/sky.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Long_&_Narrow_Plane"].geometry}
        material={materials.Paper}
        position={[-2.929, 0, 0]}
        scale={[1, 1, 1.897]}
      />
    </group>
  );
}
