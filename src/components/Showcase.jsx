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
        <section id="showcase">
            <div className="media">
                <video
                    src="/videos/game.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="gpu-boost w-full h-full object-cover"
                />
                <div className="mask">
                    <img src="/mask-logo.svg" alt="" loading="lazy" />
                </div>
            </div>

            <div className="content opacity-0 translate-y-10">
                <div className="wrapper">
                    {/* TEXT */}
                    <div className="lg:max-w-md">
                        <h2>Rocket Chip</h2>
                        <div className="space-y-5 mt-7 pe-10">
                            <p>
                                Introducing <span className="text-white">M4</span>, the next
                                generation of Apple silicon.
                            </p>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="max-w-3xs space-y-14">
                        <div>
                            <p>Up to</p>
                            <h3>4x faster</h3>
                            <p>pro rendering vs M2</p>
                        </div>
                        <div>
                            <p>Up to</p>
                            <h3>1.5x faster</h3>
                            <p>CPU performance vs M2</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
