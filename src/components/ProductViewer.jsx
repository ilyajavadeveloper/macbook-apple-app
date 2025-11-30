// components/ProductViewer.jsx
import useMacbookStore from "../store";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import ModelSwitcher from "./three/ModelSwitcher.jsx";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {
    const { color, scale, setColor, setScale } = useMacbookStore();
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    const baseScale = scale ?? 0.08;
    const computedScale = isMobile
        ? Math.max(0.03, baseScale - 0.03)
        : baseScale;

    return (
        <section
            id="product-viewer"
            className="
                w-full
                px-4
                mt-28
                flex flex-col items-center
            "
        >
            {/* TITLE */}
            <h2
                className="
                    text-center
                    text-3xl md:text-5xl
                    font-semibold
                    mb-10
                    tracking-tight
                "
            >
                Take a closer look.
            </h2>

            {/* ===== CONTROLS ===== */}
            <div
                className="
                    controls
                    flex flex-col
                    items-center
                    gap-5
                "
            >
                {/* COLOR SWITCH */}
                <div className="flex gap-4">
                    <div
                        onClick={() => setColor("#adb5bd")}
                        className={clsx(
                            "w-8 h-8 rounded-full cursor-pointer border border-white/20",
                            "bg-neutral-300",
                            color === "#adb5bd" && "ring-2 ring-white"
                        )}
                    />
                    <div
                        onClick={() => setColor("#2e2c2e")}
                        className={clsx(
                            "w-8 h-8 rounded-full cursor-pointer border border-white/20",
                            "bg-neutral-900",
                            color === "#2e2c2e" && "ring-2 ring-white"
                        )}
                    />
                </div>

                {/* SIZE SWITCH */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setScale(0.06)}
                        className={clsx(
                            "px-5 py-1.5 rounded-full text-sm border border-white/20 transition",
                            scale === 0.06
                                ? "bg-white text-black shadow"
                                : "text-white bg-transparent"
                        )}
                    >
                        14"
                    </button>

                    <button
                        onClick={() => setScale(0.08)}
                        className={clsx(
                            "px-5 py-1.5 rounded-full text-sm border border-white/20 transition",
                            scale === 0.08
                                ? "bg-white text-black shadow"
                                : "text-white bg-transparent"
                        )}
                    >
                        16"
                    </button>
                </div>
            </div>

            {/* ===== 3D VIEWER ===== */}
            <div
                className="
                    w-full
                    mt-12
                    flex justify-center
                "
            >
                <div
                    className="
                        w-full
                        max-w-[900px]
                        aspect-[16/9]
                        md:aspect-[16/8]
                        rounded-xl
                        overflow-hidden
                    "
                >
                    <Canvas
                        id="canvas"
                        camera={{
                            position: [0, 2, 5],
                            fov: isMobile ? 50 : 45, // 🔥 мобильный FOV для лучшего кадра
                        }}
                        dpr={[1, 1.5]}
                        gl={{
                            antialias: true,
                            powerPreference: "high-performance",
                        }}
                    >
                        <StudioLights />
                        <ModelSwitcher scale={computedScale} isMobile={isMobile} />
                    </Canvas>
                </div>
            </div>
        </section>
    );
};

export default ProductViewer;
