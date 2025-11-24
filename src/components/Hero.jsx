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

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <section id="hero" className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">MacBook Pro</h1>
                <img src="/title.png" alt="" className="hero-title-img" />
            </div>

            <video
                ref={videoRef}
                src="/videos/hero.mp4"
                muted
                playsInline
                preload="auto"
                className="hero-video opacity-0 transition-opacity duration-700"
            />

            <button className="hero-btn">Buy</button>
            <p className="hero-price">From $1599 or $133/mo for 12 months</p>
        </section>
    );
};

export default Hero;
