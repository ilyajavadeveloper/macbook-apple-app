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

        // TEXT FADE-IN
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

        // DESKTOP ONLY LOGIC — DON'T TOUCH
        if (isMobile) return;

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
                mt-24
                flex flex-col items-center
                relative
            "
        >
            <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10">
                Next-level graphics performance. Game on.
            </h2>

            {/* WRAPPER — desktop absolute images, mobile stacked grid */}
            <div
                className={`
                    wrapper
                    w-full
                    ${isMobile
                    ? "grid grid-cols-2 gap-4 place-items-center max-w-[420px]"
                    : "relative h-[90vh]"}
                `}
            >
                {performanceImages.map((item) => (
                    <img
                        key={item.id}
                        src={item.src}
                        className={`
                            ${item.id}
                            ${isMobile
                            ? "relative w-full max-w-[150px] object-contain static opacity-100"
                            : "absolute"}
                        `}
                        alt=""
                        loading="lazy"
                    />
                ))}
            </div>

            {/* TEXT BLOCK */}
            <div
                className="
                    content perf-text
                    mt-10
                    max-w-3xl
                    text-gray-300
                    text-center
                    leading-relaxed
                    px-2
                "
            >
                <p>
                    Run graphics-intensive workflows with fast responsiveness.
                    The M4 chip features a second-generation hardware-accelerated
                    ray tracing engine…
                </p>
            </div>
        </section>
    );
};

export default Performance;
