// components/Hero.jsx
import { useEffect, useRef } from "react";

const Hero = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = 2.4;

        const safePlay = async () => {
            try {
                if (video.currentTime < 0.05) video.currentTime = 0.05;
                await video.play();
                video.style.opacity = "1";
            } catch {}
        };

        video.addEventListener("canplay", safePlay, { once: true });
        safePlay();

        // THROTTLED REPLAY ON SCROLL
        let locked = false;
        const onScroll = () => {
            if (locked) return;
            locked = true;

            if (window.scrollY < 50) {
                video.currentTime = 0.05;
                safePlay();
            }

            setTimeout(() => (locked = false), 300);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section
            id="hero"
            className="
                w-full min-h-screen relative
                flex flex-col items-center justify-center
                text-center px-4
                pt-20 md:pt-32
            "
        >
            {/* TEXT */}
            <div className="flex flex-col items-center gap-2">
                <h1
                    className="
                        text-5xl md:text-7xl font-bold tracking-tight
                        leading-none
                    "
                >
                    MacBook Pro
                </h1>

                <img
                    src="/title.png"
                    alt="MacBook Pro"
                    decoding="async"
                    loading="eager"
                    fetchpriority="high"
                    className="
                        w-40 md:w-64
                        mt-2 select-none
                    "
                />
            </div>

            {/* VIDEO WRAPPER → prevents layout jump */}
            <div
                className="
                    w-full
                    max-w-[950px]
                    aspect-video
                    mt-6
                    rounded-xl
                    overflow-hidden
                "
            >
                <video
                    ref={videoRef}
                    src="/videos/hero.mp4"
                    muted
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    disableRemotePlayback
                    className="
                        w-full h-full object-cover
                        opacity-0 transition-opacity duration-500
                    "
                    poster="/videos/hero-poster.jpg"
                />
            </div>

            {/* BUTTON */}
            <button
                className="
                    mt-8 md:mt-10
                    bg-white text-black font-semibold
                    px-7 py-2.5 rounded-full
                    text-lg md:text-xl
                    shadow-md active:scale-95 transition
                "
            >
                Buy
            </button>

            {/* PRICE */}
            <p className="mt-3 text-sm md:text-base text-gray-300">
                From $1599 or $133/mo for 12 months
            </p>
        </section>
    );
};

export default Hero;
