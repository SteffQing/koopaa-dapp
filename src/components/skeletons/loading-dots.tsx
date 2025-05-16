"use client";

import { motion } from "framer-motion";

interface LoadingDotsProps {
  color?: string;
  size?: number;
}

export default function LoadingDots({
  color = "currentColor",
  size = 4,
}: LoadingDotsProps) {
  return (
    <div className="inline-flex space-x-1 items-center justify-center">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: "50%",
          }}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}
