import type { Variants } from "framer-motion";

export const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease },
  },
});

export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delay, duration: 0.8, ease },
  },
});
