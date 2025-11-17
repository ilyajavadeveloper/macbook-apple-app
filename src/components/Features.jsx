import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import { features, featureSequence } from "../constants/index.js";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
    const groupRef = useRef(null);
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const { setTexture } = useMacbookStore();

    // ============================
    // PRELOAD ALL FEATURE VIDEOS
    // ============================
    useEffect(() => {
        featureSequence.forEach((feature) => {
            const v = document.createElement("video");

            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: "auto",
                crossOrigin: "anonymous",
            });

            v.load();
        });
    }, []);

    // ============================
    // GSAP SCROLL ANIMATIONS
    // ============================
    useGSAP(() => {
        // 3D ROTATION ANIMATION
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
            },
        });

        if (groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, {
                y: Math.PI * 2,
                ease: "none",
            });
        }

        // SYNC CONTENT + VIDEO TEXTURES
        const contentTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top center",
                end: "bottom top",
                scrub: 1,
            },
        });

        // Loop through feature boxes
        featureSequence.forEach((feature, index) => {
            const boxClass = `.box${index + 1}`;
            const videoPath = feature.videoPath;

            contentTimeline
                .call(() => setTexture(videoPath))
                .to(boxClass, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power1.out",
                });
        });
    }, []);

    return (
        <group ref={groupRef}>
            <Suspense
                fallback={
                    <Html>
                        <h1 className="text-white text-3xl uppercase">Loading...</h1>
                    </Html>
                }
            >
                <MacbookModel
                    scale={isMobile ? 0.05 : 0.08}
                    position={[0, -1, 0]}
                />
            </Suspense>
        </group>
    );
};

// ============================
// MAIN FEATURES COMPONENT
// ============================

const Features = () => {
    return (
        <section id="features">
            <h2>See it all in a new light.</h2>

            {/* ============ 3D CANVAS ============ */}
            <Canvas
                id="f-canvas"
                camera={{ fov: 45, position: [0, 0.5, 5] }}
                gl={{
                    antialias: false,
                    powerPreference: "high-performance",
                }}
                dpr={[1, 1.5]}
            >
                <StudioLights />
                <ambientLight intensity={0.5} />
                <ModelScroll />
            </Canvas>

            {/* ============ FEATURE TEXT BOXES ============ */}
            <div className="absolute inset-0 pointer-events-none">
                {features.map((feature, index) => (
                    <div
                        key={feature.id}
                        className={clsx(
                            "box",
                            `box${index + 1}`,
                            feature.styles
                        )}
                    >
                        <img src={feature.icon} alt={feature.highlight} />
                        <p>
                            <span className="text-white">{feature.highlight}</span>
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
