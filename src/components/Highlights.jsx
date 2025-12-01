// components/Highlights.jsx
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    useGSAP(() => {
        if (isMobile) {
            // На мобильных принудительно показываем всё
            gsap.set(".highlight-col", { opacity: 1, y: 0 });
            return;
        }

        // Анимации только на больших экранах
        gsap.fromTo(
            ".highlight-col",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.25,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#highlights",
                    start: "top 70%",
                    once: true,
                },
            }
        );
    }, [isMobile]);

    return (
        <section id="highlights" className="w-full mt-16">
            <h2 className="text-center text-4xl font-semibold tracking-tight">
                There’s never been a better time to upgrade.
            </h2>
            <h3 className="text-center text-xl mt-4 opacity-80">
                Here’s what you get with the new MacBook Pro.
            </h3>

            {/* =======================
                RESPONSIVE MASONRY
                ======================= */}
            <div
                className={
                    isMobile
                        ? "mt-12 flex flex-col gap-10 px-6" // 📱 MOBILE STACK
                        : "masonry" // 💻 ORIGINAL DESKTOP LAYOUT
                }
            >
                {/* LEFT COLUMN */}
                <div
                    className={
                        isMobile
                            ? "flex flex-col gap-10" // mobile: stacked
                            : "highlight-col left-column" // desktop: original
                    }
                >
                    <div>
                        <img src="/laptop.png" alt="" loading="lazy" />
                        <p>Fly through demanding tasks up to 9.8x faster.</p>
                    </div>

                    <div>
                        <img src="/sun.png" alt="" loading="lazy" />
                        <p>A stunning Liquid Retina XDR display.</p>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div
                    className={
                        isMobile
                            ? "flex flex-col gap-10" // mobile: stacked
                            : "highlight-col right-column" // desktop: original
                    }
                >
                    <div className="apple-gradient p-0">
                        <img src="/ai.png" alt="" loading="lazy" />
                        <p>
                            Built for <span>Apple Intelligence.</span>
                        </p>
                    </div>

                    <div>
                        <img src="/battery.png" alt="" loading="lazy" />
                        <p>
                            Up to{" "}
                            <span className="green-gradient">14 more hours</span> battery life.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;
