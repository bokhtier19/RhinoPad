import React, { createContext } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
    const springTransition = {
        type: "spring",
        damping: 20,
        stiffness: 100,
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.1,
                staggerChildren: 0.2,
                delayChildren: 0.3,
                when: "beforeChildren",
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: springTransition },
    };

    const slideVariants = (direction = "right", distance = 100) => ({
        hidden: { opacity: 0, x: direction === "right" ? distance : -distance },
        show: {
            opacity: 1,
            x: 0,
            transition: springTransition,
        },
    });

    return <AnimationContext.Provider value={{ containerVariants, childVariants, slideVariants }}>{children}</AnimationContext.Provider>;
};

export default AnimationProvider;
