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

/* ========== INNER 3D SCROLL SECTION ========== */

const ModelScroll = () => {
    const groupRef = useRef(null);
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const { setTexture } = useMacbookStore();

    // Preload feature videos
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

    useGSAP(
        () => {
            const group = groupRef.current;
            if (!group) return;

            /* DESKTOP ROTATION (unchanged) */
            if (!isMobile) {
                const modelTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#f-canvas",
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                    },
                });

                modelTimeline.to(group.rotation, {
                    y: Math.PI * 2,
                    ease: "none",
                });
            }

            /* TEXTURE SYNC */
            const contentTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#f-canvas",
                    start: "top center",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            featureSequence.forEach((feature, index) => {
                contentTimeline
                    .call(() => setTexture(feature.videoPath))
                    .to(`.box${index + 1}`, {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                        ease: "power1.out",
                    });
            });
        },
        { dependencies: [setTexture, isMobile] }
    );

    const scale = useMemo(() => (isMobile ? 0.043 : 0.08), [isMobile]);

    return (
        <group ref={groupRef}>
            <Suspense
                fallback={
                    <Html>
                        <h1 className="text-white text-3xl uppercase tracking-wider">
                            Loading…
                        </h1>
                    </Html>
                }
            >
                <MacbookModel scale={scale} position={[0, -1, 0]} />
            </Suspense>
        </group>
    );
};

/* ========== MAIN FEATURES SECTION ========== */

const Features = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <section
            id="features"
            className="
                relative w-full
                flex flex-col items-center
                px-4
                mt-28
            "
        >
            <h2
                className="
                    text-center
                    text-4xl md:text-6xl
                    font-semibold
                    tracking-tight
                    mb-14
                "
            >
                See it all in a new light.
            </h2>

            <div
                className={clsx(
                    "w-full",
                    isMobile
                        ? "relative max-w-[460px] mx-auto"
                        : "relative h-[200vh] w-full"
                )}
            >
                {/* CANVAS */}
                <Canvas
                    id="f-canvas"
                    camera={{ fov: 45, position: [0, 0.5, 5] }}
                    gl={{
                        antialias: false,
                        powerPreference: "high-performance",
                    }}
                    dpr={[1, 1.6]}
                    className="w-full h-full"
                >
                    <StudioLights />
                    <ambientLight intensity={0.45} />
                    <ModelScroll />
                </Canvas>

                {/* FEATURES BOXES */}
                <div
                    className={clsx(
                        "pointer-events-none",
                        isMobile
                            ? `
                                relative 
                                mt-12 
                                flex flex-col 
                                gap-8 
                                pb-14
                              `
                            : "absolute inset-0"
                    )}
                >
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={clsx(
                                "box opacity-0 translate-y-10 transition-all",
                                `box${index + 1}`,
                                isMobile
                                    ? `
                                      relative 
                                      bg-black/40 
                                      backdrop-blur-md 
                                      p-5 
                                      rounded-xl 
                                      mx-auto 
                                      text-center 
                                      max-w-[360px]
                                      shadow-lg
                                    `
                                    : feature.styles
                            )}
                        >
                            <img
                                src={feature.icon}
                                alt={feature.highlight}
                                className="w-7 h-7 mx-auto mb-3 select-none"
                            />

                            <p
                                className="
                                    text-gray-200
                                    leading-snug
                                    text-[15px]
                                "
                            >
                                <span className="text-white block font-semibold mb-1">
                                    {feature.highlight}
                                </span>
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
