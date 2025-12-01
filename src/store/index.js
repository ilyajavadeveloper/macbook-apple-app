// store/index.js
import { create } from "zustand";

const useMacbookStore = create((set) => ({
    color: "#2e2c2e",
    setColor: (color) => set({ color }),

    scale: 0.08,
    setScale: (scale) => set({ scale }),

    texture: "/videos/feature-1.mp4",
    setTexture: (texture) => set({ texture }),

    model: "16", // default — 16-inch
    setModel: (model) => set({ model }),

    reset: () =>
        set({
            color: "#2e2c2e",
            scale: 0.08,
            texture: "/videos/feature-1.mp4",
            model: "16",
        }),
}));

export default useMacbookStore;
