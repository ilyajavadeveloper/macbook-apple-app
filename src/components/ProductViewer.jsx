// components/ProductViewer.jsx
import useMacbookStore from "../store";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

const ProductViewer = () => {
    const { color, model, setColor, setModel } = useMacbookStore();
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return (
        <section id="product-viewer" className="w-full pt-10">
            <h2 className="text-center text-4xl font-semibold tracking-tight mb-6">
                Take a closer look.
            </h2>

            {/* CONTROLS */}
            <div className="controls flex justify-center gap-10 mt-5">

                {/* COLORS */}
                <div className="flex items-center gap-4">
                    <div
                        onClick={() => setColor("#adb5bd")}
                        className={clsx(
                            "w-7 h-7 rounded-full cursor-pointer border transition-all",
                            "bg-neutral-300",
                            color === "#adb5bd" && "ring-2 ring-white scale-110"
                        )}
                    />
                    <div
                        onClick={() => setColor("#2e2c2e")}
                        className={clsx(
                            "w-7 h-7 rounded-full cursor-pointer border transition-all",
                            "bg-neutral-900",
                            color === "#2e2c2e" && "ring-2 ring-white scale-110"
                        )}
                    />
                </div>

                {/* MODEL SIZE */}
                <div className="flex gap-3">
                    <button
                        onClick={() => setModel("14")}
                        className={clsx(
                            "px-4 py-1 rounded-md border transition-all",
                            model === "14"
                                ? "bg-white text-black"
                                : "bg-transparent text-white"
                        )}
                    >
                        14"
                    </button>

                    <button
                        onClick={() => setModel("16")}
                        className={clsx(
                            "px-4 py-1 rounded-md border transition-all",
                            model === "16"
                                ? "bg-white text-black"
                                : "bg-transparent text-white"
                        )}
                    >
                        16"
                    </button>
                </div>
            </div>

            {/* 3D VIEWER */}
            <div className="w-full mt-10">
                <Canvas
                    camera={{ position: [0, 2, 5], fov: 45 }}
                    dpr={[1, 1.5]}
                    style={{
                        width: "100%",
                        height: isMobile ? "420px" : "600px",
                    }}
                >
                    <Suspense fallback={null}>
                        <StudioLights />
                        <ModelSwitcher isMobile={isMobile} />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default ProductViewer;
