import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    performanceImages,
    performanceImgPositions,
} from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const sectionRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        // TEXT ANIM (all screens)
        gsap.fromTo(
            ".perf-text",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    once: true,
                },
            }
        );

        if (isMobile) return;

        // DESKTOP IMAGE MOTION
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });

        performanceImgPositions.forEach(({ id, left, right, bottom }) => {
            if (id === "p5") return;

            tl.to(
                `.${id}`,
                {
                    left: left !== undefined ? `${left}%` : undefined,
                    right: right !== undefined ? `${right}%` : undefined,
                    bottom: bottom !== undefined ? `${bottom}%` : undefined,
                    ease: "power2.inOut",
                },
                0
            );
        });
    }, [isMobile]);

    return (
        <section id="performance" ref={sectionRef}>
            <h2 className="text-center text-4xl font-semibold tracking-tight">
                Next-level graphics performance. Game on.
            </h2>

            {/* ======================
                MOBILE LAYOUT
                ====================== */}
            {isMobile && (
                <div className="grid grid-cols-2 gap-4 mt-10 px-6">
                    {performanceImages.map((item) => (
                        <img
                            key={item.id}
                            src={item.src}
                            className="w-full rounded-xl object-cover"
                            alt=""
                            loading="lazy"
                        />
                    ))}
                </div>
            )}

            {/* ======================
                DESKTOP LAYOUT (unchanged)
                ====================== */}
            {!isMobile && (
                <div className="wrapper">
                    {performanceImages.map((item) => (
                        <img
                            key={item.id}
                            src={item.src}
                            className={item.id}
                            alt=""
                            loading="lazy"
                        />
                    ))}
                </div>
            )}

            <div className="content perf-text mt-10 px-6 max-w-2xl mx-auto text-lg leading-relaxed">
                <p>
                    Run graphics-intensive workflows with fast responsiveness. The M4 chip
                    features a second-generation hardware-accelerated ray tracing engine…
                </p>
            </div>
        </section>
    );
};

export default Performance;
