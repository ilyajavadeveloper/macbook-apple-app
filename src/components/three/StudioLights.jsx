// components/three/StudioLights.jsx
import { Environment, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

const StudioLights = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    // мобильная яркость мягче
    const INT_MAIN = isMobile ? Math.PI * 0.1 : Math.PI * 0.2;
    const INT_TOP = isMobile ? Math.PI * 0.6 : Math.PI * 1;

    return (
        <group name="lights">
            <Environment resolution={256}>
                <group>
                    <Lightformer
                        form="rect"
                        intensity={isMobile ? 6 : 10}
                        position={[-10, 5, -5]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />
                    <Lightformer
                        form="rect"
                        intensity={isMobile ? 6 : 10}
                        position={[10, 0, 1]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />
                </group>
            </Environment>

            <spotLight
                position={[-2, 10, 5]}
                angle={0.15}
                decay={0}
                intensity={INT_MAIN}
            />

            <spotLight
                position={[0, -25, 10]}
                angle={0.15}
                decay={0}
                intensity={INT_MAIN}
            />

            <spotLight
                position={[0, 15, 5]}
                angle={0.15}
                decay={0.1}
                intensity={INT_TOP}
            />
        </group>
    );
};

export default StudioLights;
