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
        <section id="product-viewer">
            <h2>Take a closer look.</h2>

            {/* COLOR + SIZE CONTROLS */}
            <div className="controls">
                <div className="flex-center gap-5 mt-5">
                    {/* COLOR SWITCH */}
                    <div className="color-control">
                        <div
                            onClick={() => setColor("#adb5bd")}
                            className={clsx(
                                "bg-neutral-300",
                                color === "#adb5bd" && "active"
                            )}
                        />
                        <div
                            onClick={() => setColor("#2e2c2e")}
                            className={clsx(
                                "bg-neutral-900",
                                color === "#2e2c2e" && "active"
                            )}
                        />
                    </div>

                    {/* SIZE SWITCH */}
                    <div className="size-control">
                        <div
                            onClick={() => setScale(0.06)}
                            className={clsx(
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
        </section>
    );
};

export default ProductViewer;
