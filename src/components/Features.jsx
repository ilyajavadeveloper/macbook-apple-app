import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import { features, featureSequence } from "../constants/index.js";
import clsx from "clsx";
import { Suspense, useEffect, useRef, useMemo } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/* ============================================================
   3D DESKTOP EXPERIENCE
   ============================================================ */

const DesktopModelScroll = () => {
    const groupRef = useRef(null);
    const { setTexture } = useMacbookStore();

    // PRELOAD FEATURE VIDEOS (desktop only)
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

    useGSAP(() => {
        const group = groupRef.current;
        if (!group) return;

        // PIN + ROTATION
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
            },
        });

        modelTimeline.to(group.rotation, {
            y: Math.PI * 2,
            ease: "none",
        });

        // CONTENT SYNC
        const contentTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top center",
                end: "bottom top",
                scrub: 1,
            },
        });

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
    });

    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className="text-white">Loading...</h1></Html>}>
                <MacbookModel scale={0.08} position={[0, -1, 0]} />
            </Suspense>
        </group>
    );
};

/* ============================================================
   MOBILE EXPERIENCE (STATIC, FAST, CLEAN)
   ============================================================ */

const MobileFallback = () => {
    return (
        <div className="flex flex-col items-center mt-10 px-6">
            <img
                src="/static/macbook.png"
                alt="Macbook"
                className="w-full max-w-[380px] mx-auto drop-shadow-xl"
                loading="lazy"
            />

            <div className="mt-10 space-y-16 w-full">
                {features.map((feature) => (
                    <div key={feature.id} className="flex gap-4 items-start">
                        <img src={feature.icon} className="w-10 h-10" alt="" />

                        <p className="text-lg leading-snug">
                            <span className="text-white font-semibold">{feature.highlight}</span>
                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ============================================================
   MAIN FEATURES COMPONENT
   ============================================================ */

const Features = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <section id="features" className="relative min-h-screen py-10">

            <h2 className="text-center text-4xl font-semibold mb-16">
                See it all in a new light.
            </h2>

            {/* DESKTOP MODE WITH 3D */}
            {!isMobile && (
                <>
                    <Canvas
                        id="f-canvas"
                        camera={{ fov: 45, position: [0, 0.5, 5] }}
                        gl={{ antialias: false, powerPreference: "high-performance" }}
                        dpr={[1, 1.5]}
                    >
                        <StudioLights />
                        <ambientLight intensity={0.5} />
                        <DesktopModelScroll />
                    </Canvas>

                    {/* FLOATING FEATURE BOXES */}
                    <div className="absolute inset-0 pointer-events-none">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className={clsx(
                                    "box box" + (index + 1),
                                    feature.styles,
                                    "opacity-0 translate-y-5"
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
                </>
            )}

            {/* MOBILE SIMPLE STATIC MODE */}
            {isMobile && <MobileFallback />}
        </section>
    );
};

export default Features;
