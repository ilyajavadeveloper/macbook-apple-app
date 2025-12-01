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
        <section id="highlights">
            <h2>There’s never been a better time to upgrade.</h2>
            <h3>Here’s what you get with the new MacBook Pro.</h3>

            <div className="masonry">
                <div className="highlight-col left-column">
                    <div>
                        <img src="/laptop.png" alt="" loading="lazy" />
                        <p>Fly through demanding tasks up to 9.8x faster.</p>
                    </div>

                    <div>
                        <img src="/sun.png" alt="" loading="lazy" />
                        <p>A stunning Liquid Retina XDR display.</p>
                    </div>
                </div>

                <div className="highlight-col right-column">
                   <div className="apple-gradient">
                        <img src="/ai.png" alt="" loading="lazy" />
                        <p>Built for <span>Apple Intelligence.</span></p>
                    </div>

                    <div>
                        <img src="/battery.png" alt="" loading="lazy" />
                        <p>
                            Up to <span className="green-gradient">14 more hours</span> battery life.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Highlights;
