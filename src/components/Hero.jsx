import { useEffect, useRef } from "react";

const Hero = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        // Быстрая анимация
        v.playbackRate = 2.4;

        // Гарантированное открытие MacBook
        const forceStart = () => {
            // Ставим начало на чуть-чуть позже нуля —
            // чтобы не показывал закрытую крышку
            if (v.currentTime < 0.05) {
                v.currentTime = 0.05;
            }

            v.play().catch(() => {
                // Повторная попытка через 120ms
                setTimeout(forceStart, 120);
            });
        };

        // Как только браузер готов к проигрыванию — форсим старт
        const onReady = () => {
            forceStart();
        };

        v.addEventListener("loadeddata", onReady);
        v.addEventListener("canplay", onReady);
        v.addEventListener("canplaythrough", onReady);

        // На всякий случай пробуем стартануть и без эвентов
        forceStart();

        return () => {
            v.removeEventListener("loadeddata", onReady);
            v.removeEventListener("canplay", onReady);
            v.removeEventListener("canplaythrough", onReady);
        };
    }, []);

    return (
        <section id="hero" className="hero-section relative">
            {/* Заголовок */}
            <div className="text-center z-10 relative">
                <h1 className="hero-title">MacBook Pro</h1>
                <img src="/title.png" alt="MacBook Title" className="hero-title-img" />
            </div>

            {/* Видео MacBook */}
            <video
                ref={videoRef}
                src="/videos/hero.mp4"
                type="video/mp4"
                muted
                playsInline
                preload="auto"
                className="hero-video"
            />

            {/* Кнопка */}
            <button className="hero-btn">Buy</button>

            {/* Цена */}
            <p className="hero-price">From $1599 or $133/mo for 12 months</p>
        </section>
    );
};

export default Hero;
