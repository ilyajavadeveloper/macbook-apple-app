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
            {/* MEDIA */}
            <div
                className={`
                    media relative w-full 
                    ${isTablet ? "h-[300px] rounded-xl overflow-hidden" : "h-screen"}
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
                        ${isTablet ? "scale-[0.6] opacity-80" : ""}
                    `}
                >
                    <img
                        src="/mask-logo.svg"
                        alt=""
                        loading="lazy"
                        className="
                            w-[60%] md:w-[40%]
                        "
                    />
                </div>
            </div>

            {/* CONTENT */}
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
                        gap-14 md:gap-20
                        justify-between
                        items-start
                        max-w-6xl
                        mx-auto
                    "
                >
                    {/* TEXT */}
                    <div className="lg:max-w-md text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-semibold">
                            Rocket Chip
                        </h2>

                        <div className="space-y-5 mt-7">
                            <p className="text-gray-300 text-lg md:text-xl">
                                Introducing{" "}
                                <span className="text-white">M4</span>, the next
                                generation of Apple silicon.
                            </p>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="max-w-3xs space-y-12 text-center md:text-left">
                        <div>
                            <p className="text-gray-300">Up to</p>
                            <h3 className="text-4xl md:text-5xl font-bold">
                                4x faster
                            </h3>
                            <p className="text-gray-300">pro rendering vs M2</p>
                        </div>

                        <div>
                            <p className="text-gray-300">Up to</p>
                            <h3 className="text-4xl md:text-5xl font-bold">
                                1.5x faster
                            </h3>
                            <p className="text-gray-300">CPU performance vs M2</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
