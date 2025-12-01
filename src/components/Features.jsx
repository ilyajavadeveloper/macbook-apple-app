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
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   DESKTOP EXPERIENCE — SCROLL-SYNCED 3D MACBOOK
   ============================================================ */

const DesktopModelScroll = () => {
    const groupRef = useRef(null);
    const { setTexture } = useMacbookStore();

    // Preload videos
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

        /* ===== MODEL PIN + ROTATION ===== */
        gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
            },
        }).to(group.rotation, { y: Math.PI * 2, ease: "none" });

        /* ===== FEATURE BOX SYNC ===== */
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top center",
                end: "bottom top",
                scrub: 1,
            },
        });

        featureSequence.forEach((feature, index) => {
            const box = `.box${index + 1}`;
            tl.call(() => setTexture(feature.videoPath)).to(box, {
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
   MOBILE EXPERIENCE — ONLY TEXT, NO MODEL
   ============================================================ */

const MobileFallback = () => {
    return (
        <div className="flex flex-col items-start mt-6 px-6 gap-12 max-w-xl mx-auto">
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
    );
};

/* ============================================================
   MAIN WRAPPER
   ============================================================ */

const Features = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <section id="features" className="relative min-h-screen py-10">

            <h2 className="text-center text-4xl font-semibold mb-16">
                See it all in a new light.
            </h2>

            {/* DESKTOP (3D) MODE */}
            {!isMobile && (
                <>
                    <Canvas
                        id="f-canvas"
                        camera={{ fov: 45, position: [0, 0.5, 5] }}
                        gl={{ antialias: false, powerPreference: "high-performance" }}
                        dpr={[1, 1.5]}
                        className="w-full h-screen"
                    >
                        <StudioLights />
                        <ambientLight intensity={0.5} />
                        <DesktopModelScroll />
                    </Canvas>

                    {/* FLOATING TEXT BOXES */}
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

            {/* MOBILE MODE — ONLY TEXT */}
            {isMobile && <MobileFallback />}
        </section>
    );
};

export default Features;
