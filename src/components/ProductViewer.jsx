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
                mt-24
                flex flex-col items-center
            "
        >
            <h2 className="text-center text-3xl md:text-5xl font-semibold mb-8">
                Take a closer look.
            </h2>

            {/* CONTROLS */}
            <div
                className="
                    controls
                    flex flex-col items-center
                    md:items-start
                "
            >
                <div
                    className="
                        flex-center
                        gap-6
                        mt-3
                        flex-wrap
                        justify-center
                    "
                >
                    {/* COLOR SWITCH */}
                    <div className="color-control flex gap-3">
                        <div
                            onClick={() => setColor("#adb5bd")}
                            className={clsx(
                                "w-7 h-7 rounded-full cursor-pointer border border-white/20",
                                "bg-neutral-300",
                                color === "#adb5bd" && "ring-2 ring-white"
                            )}
                        />
                        <div
                            onClick={() => setColor("#2e2c2e")}
                            className={clsx(
                                "w-7 h-7 rounded-full cursor-pointer border border-white/20",
                                "bg-neutral-900",
                                color === "#2e2c2e" && "ring-2 ring-white"
                            )}
                        />
                    </div>

                    {/* SIZE SWITCH */}
                    <div className="size-control flex gap-3">
                        <div
                            onClick={() => setScale(0.06)}
                            className={clsx(
                                "px-4 py-1 rounded-full cursor-pointer text-sm border border-white/20",
                                scale === 0.06
                                    ? "bg-white text-black"
                                    : "bg-transparent text-white"
                            )}
                        >
                            <p>14"</p>
                        </div>

                        <div
                            onClick={() => setScale(0.08)}
                            className={clsx(
                                "px-4 py-1 rounded-full cursor-pointer text-sm border border-white/20",
                                scale === 0.08
                                    ? "bg-white text-black"
                                    : "bg-transparent text-white"
                            )}
                        >
                            <p>16"</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3D VIEWER */}
            <div
                className="
                    w-full
                    mt-10
                    flex justify-center
                "
            >
                <div
                    className="
                        w-full
                        max-w-[900px]
                        h-[350px]
                        md:h-[550px]
                    "
                >
                    <Canvas
                        id="canvas"
                        camera={{ position: [0, 2, 5], fov: 45 }}
                        dpr={[1, 1.5]}
                        gl={{
                            antialias: false,
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
