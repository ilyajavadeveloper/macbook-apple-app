// components/Highlights.jsx
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Highlights = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    // ========= DESKTOP ANIMATIONS =========
    useGSAP(() => {
        if (isMobile) return;

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
        <section
            id="highlights"
            className="
                w-full
                px-4
                mt-24
                flex flex-col items-center
            "
        >
            {/* ===== TITLE ===== */}
            <h2
                className="
                    text-3xl md:text-5xl
                    font-semibold
                    text-center
                    leading-tight
                "
            >
                There’s never been a better time to upgrade.
            </h2>

            <h3
                className="
                    text-lg md:text-2xl
                    text-center
                    text-gray-300
                    mt-3 mb-12
                "
            >
                Here’s what you get with the new MacBook Pro.
            </h3>

            {/* ===== GRID WRAPPER ===== */}
            <div
                className={`
                    w-full 
                    flex 
                    ${isMobile
                    ? "flex-col gap-6 items-center"
                    : "flex-row gap-16 justify-center"
                }
                `}
            >
                {/* ===== LEFT COLUMN ===== */}
                <div
                    className={`
                        highlight-col left-column
                        flex flex-col gap-6
                        ${isMobile ? "w-full items-center text-center" : ""}
                    `}
                >
                    <div className="
                        bg-black/30
                        p-5
                        rounded-2xl
                        backdrop-blur-md
                        w-full
                        max-w-[340px]
                        shadow-[0_0_20px_rgba(255,255,255,0.05)]
                    ">
                        <img
                            src="/laptop.png"
                            alt="Laptop"
                            loading="lazy"
                            className="
                                mx-auto mb-3
                                w-[120px]
                                md:w-36
                                object-contain
                                select-none
                            "
                        />
                        <p className="text-gray-200 text-sm md:text-lg leading-snug">
                            Fly through demanding tasks up to 9.8x faster.
                        </p>
                    </div>

                    <div className="
                        bg-black/30
                        p-5
                        rounded-2xl
                        backdrop-blur-md
                        w-full
                        max-w-[340px]
                        shadow-[0_0_20px_rgba(255,255,255,0.05)]
                    ">
                        <img
                            src="/sun.png"
                            alt="Display"
                            loading="lazy"
                            className="
                                mx-auto mb-3
                                w-[90px]
                                md:w-28
                                object-contain
                                select-none
                            "
                        />
                        <p className="text-gray-200 text-sm md:text-lg leading-snug">
                            A stunning Liquid Retina XDR display.
                        </p>
                    </div>
                </div>

                {/* ===== RIGHT COLUMN ===== */}
                <div
                    className={`
                        highlight-col right-column
                        flex flex-col gap-6
                        ${isMobile ? "w-full items-center text-center" : ""}
                    `}
                >
                    <div className="
                        apple-gradient
                        p-5
                        rounded-2xl
                        w-full
                        max-w-[340px]
                        shadow-[0_0_25px_rgba(255,255,255,0.1)]
                    ">
                        <img
                            src="/ai.png"
                            alt="AI"
                            loading="lazy"
                            className="
                                mx-auto mb-3
                                w-[100px]
                                md:w-32
                                object-contain
                                select-none
                            "
                        />
                        <p className="text-white text-sm md:text-lg leading-snug">
                            Built for <span className="font-semibold">Apple Intelligence.</span>
                        </p>
                    </div>

                    <div className="
                        bg-black/30
                        p-5
                        rounded-2xl
                        backdrop-blur-md
                        w-full
                        max-w-[340px]
                        shadow-[0_0_20px_rgba(255,255,255,0.05)]
                    ">
                        <img
                            src="/battery.png"
                            alt="Battery"
                            loading="lazy"
                            className="
                                mx-auto mb-3
                                w-[100px]
                                md:w-32
                                object-contain
                                select-none
                            "
                        />
                        <p className="text-gray-200 text-sm md:text-lg leading-snug">
                            Up to{" "}
                            <span className="green-gradient font-semibold">
                                14 more hours
                            </span>{" "}
                            battery life.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;
