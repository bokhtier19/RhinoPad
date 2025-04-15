import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScrolling = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.05, // Controls smoothness
            duration: 1.8, // Adjust scrolling speed
            smoothTouch: true, // Enable smooth scrolling on touch devices
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy(); // Cleanup when component unmounts
    }, []);

    return <>{children}</>;
};

export default SmoothScrolling;
