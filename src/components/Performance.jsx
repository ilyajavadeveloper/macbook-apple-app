// components/Performance.jsx
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

        /* ========== MOBILE: NO ANIMATIONS, JUST SHOW CONTENT ========== */
        if (isMobile) {
            gsap.set(".perf-text", { opacity: 1, y: 0 });
            return;
        }

        /* ========== DESKTOP: TEXT FADE-IN ========== */
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

        /* ========== DESKTOP PARALLAX (unchanged) ========== */
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
        <section
            id="performance"
            ref={sectionRef}
            className="
                w-full
                px-4
                mt-28
                flex flex-col items-center
                relative
            "
        >
            {/* TITLE */}
            <h2 className="
                text-3xl md:text-5xl
                font-semibold
                text-center
                mb-10 md:mb-16
                tracking-tight
            ">
                Next-level graphics performance. Game on.
            </h2>

            {/* IMAGE WRAPPER */}
            <div
                className={`
                    w-full
                    ${isMobile
                    ? "grid grid-cols-2 gap-4 place-items-center max-w-[420px]"
                    : "relative h-[90vh]"
                }
                `}
            >
                {performanceImages.map((item) => (
                    <img
                        key={item.id}
                        src={item.src}
                        loading="lazy"
                        className={`
                            ${item.id}
                            select-none
                            ${isMobile
                            ? "relative object-contain w-[80%] max-w-[150px] opacity-100 static"
                            : "absolute"
                        }
                        `}
                        alt=""
                    />
                ))}
            </div>

            {/* TEXT BLOCK */}
            <div
                className="
                    perf-text
                    mt-8
                    max-w-xl
                    text-gray-300
                    text-center
                    leading-relaxed
                    px-3
                "
            >
                <p className="text-base md:text-lg">
                    Run graphics-intensive workflows with fast responsiveness.
                    The M4 chip features a second-generation hardware-accelerated
                    ray tracing engine…
                </p>
            </div>
        </section>
    );
};

export default Performance;
