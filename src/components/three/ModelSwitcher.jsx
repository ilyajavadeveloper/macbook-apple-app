// components/three/ModelSwitcher.jsx
import { useRef } from "react";
import { PresentationControls } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useMacbookStore from "../../store";
import MacbookModel14 from "../models/Macbook-14.jsx";
import MacbookModel16 from "../models/Macbook-16.jsx";

const ANIMATION_DURATION = 1;
const OFFSET = 5;

const tweenGroup = (group, props) => {
    if (!group) return;
    gsap.to(group.position, { ...props, duration: ANIMATION_DURATION, ease: "power2.out" });
};

const tweenOpacity = (group, opacity) => {
    if (!group) return;

    group.traverse((child) => {
        if (!child.isMesh || !child.material) return;
        child.material.transparent = true;
        gsap.to(child.material, { opacity, duration: ANIMATION_DURATION, ease: "power2.out" });
    });
};

const ModelSwitcher = ({ isMobile }) => {
    const { model } = useMacbookStore();

    const smallRef = useRef();
    const largeRef = useRef();

    const SCALE_BIG = isMobile ? 0.05 : 0.08;
    const SCALE_SMALL = isMobile ? 0.03 : 0.06;

    const showLarge = model === "16";

    useGSAP(() => {
        if (showLarge) {
            tweenGroup(smallRef.current, { x: -OFFSET });
            tweenGroup(largeRef.current, { x: 0 });

            tweenOpacity(smallRef.current, 0);
            tweenOpacity(largeRef.current, 1);
        } else {
            tweenGroup(smallRef.current, { x: 0 });
            tweenGroup(largeRef.current, { x: OFFSET });

            tweenOpacity(smallRef.current, 1);
            tweenOpacity(largeRef.current, 0);
        }
    }, [showLarge]);

    return (
        <PresentationControls
            snap
            speed={1}
            zoom={1}
            azimuth={[-Infinity, Infinity]}
            config={{ mass: 1, tension: 0, friction: 26 }}
        >
            {/* 16-inch */}
            <group ref={largeRef} position={[showLarge ? 0 : OFFSET, 0, 0]}>
                <MacbookModel16 scale={SCALE_BIG} />
            </group>

            {/* 14-inch */}
            <group ref={smallRef} position={[showLarge ? -OFFSET : 0, 0, 0]}>
                <MacbookModel14 scale={SCALE_SMALL} />
            </group>
        </PresentationControls>
    );
};

export default ModelSwitcher;
