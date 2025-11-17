import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
    performanceImages,
    performanceImgPositions,
} from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

const Performance = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            // TEXT FADE-IN
            gsap.fromTo(
                ".content p",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".content",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            // MOBILE: выключаем heavy motion
            if (isMobile) return;

            // DESKTOP ONLY — IMAGE MOTION
            const tl = gsap.timeline({
                defaults: {
                    duration: 1.8,
                    ease: "power2.inOut",
                },
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });

            performanceImgPositions.forEach((item) => {
                if (item.id === "p5") return; // static img

                const selector = `.${item.id}`;
                const vars = {};

                if (item.left !== undefined) vars.left = `${item.left}%`;
                if (item.right !== undefined) vars.right = `${item.right}%`;
                if (item.bottom !== undefined) vars.bottom = `${item.bottom}%`;
                if (item.transform) vars.transform = item.transform;

                tl.to(selector, vars, 0);
            });
        },
        { scope: sectionRef, dependencies: [isMobile] }
    );

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. Game on.</h2>

            <div className="wrapper">
                {performanceImages.map((item, i) => (
                    <img
                        key={i}
                        src={item.src}
                        className={item.id}
                        alt={item.alt || `Performance Image #${i + 1}`}
                    />
                ))}
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up
                    with your imagination. The M4 family of chips features a GPU with a
                    second-generation hardware-accelerated ray tracing engine that renders
                    images faster, so{" "}
                    <span className="text-white">
                        gaming feels more immersive and realistic than ever.
                    </span>{" "}
                    And Dynamic Caching optimizes fast on-chip memory to dramatically
                    increase average GPU utilization — driving a huge performance boost
                    for the most demanding pro apps and games.
                </p>
            </div>
        </section>
    );
};

export default Performance;
