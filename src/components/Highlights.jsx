// components/Highlights.jsx
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Highlights = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

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
            <h2
                className="
                    text-3xl md:text-5xl
                    font-semibold
                    text-center
                "
            >
                There’s never been a better time to upgrade.
            </h2>

            <h3
                className="
                    text-lg md:text-2xl
                    text-center text-gray-300
                    mt-3 mb-12
                "
            >
                Here’s what you get with the new MacBook Pro.
            </h3>

            {/* LAYOUT FIXED FOR MOBILE */}
            <div
                className={`
                    masonry 
                    w-full 
                    flex 
                    ${isMobile ? "flex-col gap-8" : "flex-row justify-center gap-16"}
                `}
            >
                {/* LEFT COLUMN */}
                <div
                    className={`
                        highlight-col left-column 
                        flex flex-col gap-8
                        ${isMobile ? "w-full items-center text-center" : "w-auto"}
                    `}
                >
                    <div className="bg-black/30 p-4 rounded-2xl backdrop-blur-md max-w-[380px]">
                        <img src="/laptop.png" alt="" loading="lazy" className="mx-auto mb-3 w-28 md:w-auto" />
                        <p className="text-gray-200">
                            Fly through demanding tasks up to 9.8x faster.
                        </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-2xl backdrop-blur-md max-w-[380px]">
                        <img src="/sun.png" alt="" loading="lazy" className="mx-auto mb-3 w-20 md:w-auto" />
                        <p className="text-gray-200">
                            A stunning Liquid Retina XDR display.
                        </p>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div
                    className={`
                        highlight-col right-column 
                        flex flex-col gap-8
                        ${isMobile ? "w-full items-center text-center" : "w-auto"}
                    `}
                >
                    <div className="apple-gradient p-4 rounded-2xl max-w-[380px]">
                        <img src="/ai.png" alt="" loading="lazy" className="mx-auto mb-3 w-24 md:w-auto" />
                        <p className="text-white">
                            Built for <span className="font-semibold">Apple Intelligence.</span>
                        </p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-2xl backdrop-blur-md max-w-[380px]">
                        <img src="/battery.png" alt="" loading="lazy" className="mx-auto mb-3 w-24 md:w-auto" />
                        <p className="text-gray-200">
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
