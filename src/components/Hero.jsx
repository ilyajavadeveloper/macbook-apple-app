import { useEffect, useRef } from "react";

const Hero = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Ускоренная анимация крышки
        video.playbackRate = 2.4;

        // Обещаем без лагов
        const startVideo = async () => {
            try {
                // Чтобы не показывало момент закрытой крышки
                if (video.currentTime < 0.05) {
                    video.currentTime = 0.05;
                }

                await video.play();
            } catch {
                // Если автоплей блокнулся — пробуем снова
                setTimeout(startVideo, 100);
            }
        };

        // Подготавливаем видео заранее,
        // чтобы оно начинало играть мгновенно
        const handleReady = () => {
            // В Chrome бывает баг — видео готово, но play ещё нельзя.
            requestAnimationFrame(() => {
                startVideo();
            });
        };

        // Быстрее чем loadeddata
        video.addEventListener("loadedmetadata", handleReady);
        video.addEventListener("canplay", handleReady);

        // На всякий случай пробуем сразу
        startVideo();

        return () => {
            video.removeEventListener("loadedmetadata", handleReady);
            video.removeEventListener("canplay", handleReady);
        };
    }, []);

    return (
        <section id="hero" className="hero-section relative">
            {/* Заголовок */}
            <div className="text-center z-10 relative">
                <h1 className="hero-title">MacBook Pro</h1>
                <img src="/title.png" alt="MacBook Title" className="hero-title-img" />
            </div>

            {/* Видео */}
            <video
                ref={videoRef}
                src="/videos/hero.mp4"
                muted
                playsInline
                preload="auto"
                className="hero-video"
                disablePictureInPicture
                disableRemotePlayback
            />

            {/* Кнопка */}
            <button className="hero-btn">Buy</button>

            {/* Цена */}
            <p className="hero-price">From $1599 or $133/mo for 12 months</p>
        </section>
    );
};

export default Hero;
