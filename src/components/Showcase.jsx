// components/Showcase.jsx
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Showcase = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

    useGSAP(() => {
        if (isTablet) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#showcase",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });

        tl.to(".mask img", { scale: 1.1, ease: "none" }).to(
            "#showcase .content",
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            "<0.2"
        );
    }, [isTablet]);

    return (
        <section
            id="showcase"
            className="
                w-full
                px-4
                mt-28
            "
        >
            {/* ==== MEDIA BLOCK ==== */}
            <div
                className={`
                    media relative w-full 
                    ${isTablet
                    ? "h-[320px] sm:h-[380px] rounded-2xl overflow-hidden"
                    : "h-screen"
                }
                `}
            >
                <video
                    src="/videos/game.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="
                        w-full
                        h-full
                        object-cover
                    "
                />

                <div
                    className={`
                        mask absolute inset-0 flex justify-center items-center
                        ${isTablet ? "scale-[0.6] opacity-90" : ""}
                    `}
                >
                    <img
                        src="/mask-logo.svg"
                        alt="M4 Logo"
                        loading="lazy"
                        className="
                            w-[60%] md:w-[40%]
                            select-none
                        "
                    />
                </div>
            </div>

            {/* ==== CONTENT BLOCK ==== */}
            <div
                className="
                    content
                    opacity-0 translate-y-10
                    mt-10 md:mt-24
                "
            >
                <div
                    className="
                        wrapper
                        flex flex-col md:flex-row
                        gap-10 md:gap-20
                        justify-center md:justify-between
                        items-start
                        max-w-6xl
                        mx-auto
                    "
                >
                    {/* ==== TEXT SIDE ==== */}
                    <div
                        className="
                            lg:max-w-md
                            text-center md:text-left
                            px-2
                        "
                    >
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                            Rocket Chip
                        </h2>

                        <div className="space-y-5 mt-6 px-1">
                            <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-[420px] mx-auto md:mx-0">
                                Introducing{" "}
                                <span className="text-white font-semibold">M4</span>,
                                the next generation of Apple silicon.
                            </p>
                        </div>
                    </div>

                    {/* ==== STATS SIDE ==== */}
                    <div
                        className="
                            max-w-xs
                            space-y-10
                            text-center md:text-left
                            px-2
                        "
                    >
                        <div>
                            <p className="text-gray-300 text-sm md:text-base">Up to</p>
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                                4x faster
                            </h3>
                            <p className="text-gray-300 text-sm md:text-base">pro rendering vs M2</p>
                        </div>

                        <div>
                            <p className="text-gray-300 text-sm md:text-base">Up to</p>
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                                1.5x faster
                            </h3>
                            <p className="text-gray-300 text-sm md:text-base">CPU performance vs M2</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
