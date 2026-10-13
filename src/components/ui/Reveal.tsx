"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Paper elements land with a slight tilt, like being pinned to a board. */
  tilt?: number;
  y?: number;
};

export function Reveal({ delay = 0, tilt = 0, y = 28, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, rotate: tilt ? tilt * 2.5 : 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
