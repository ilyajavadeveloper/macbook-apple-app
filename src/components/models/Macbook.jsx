import React, { useEffect, useMemo } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import useMacbookStore from "../../store";
import { noChangeParts } from "../../constants";
import { Color } from "three";

export default function MacbookModel(props) {
    const { color, texture } = useMacbookStore();
    const { nodes, materials, scene } = useGLTF("/models/macbook-transformed.glb");

    // video texture
    const screen = useVideoTexture(texture, {
        start: false,
        loop: true,
        muted: true,
        crossOrigin: "anonymous",
        autoplay: true,
        playsInline: true,
    });

    const colorInstance = useMemo(() => new Color(color), [color]);

    useEffect(() => {
        scene.traverse(child => {
            if (!child.isMesh) return;

            child.frustumCulled = true;

            if (!noChangeParts.includes(child.name) && child.material) {
                child.material.color = colorInstance;
            }
        });
    }, [colorInstance, scene]);

    return (
        <group {...props} dispose={null}>
            {Object.entries(nodes).map(([key, mesh]) => {
                if (!mesh.geometry) return null;

                const isScreen = key === "Object_123";
                const mat = materials[mesh.material?.name];

                return (
                    <mesh
                        key={key}
                        geometry={mesh.geometry}
                        material={isScreen ? null : mat}
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        {isScreen && <meshBasicMaterial map={screen} toneMapped={false} />}
                    </mesh>
                );
            })}
        </group>
    );
}

useGLTF.preload("/models/macbook-transformed.glb");
