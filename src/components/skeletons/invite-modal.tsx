"use client";

import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

const shimmerVariants = {
  shimmer: {
    x: ["-100%", "100%"],
    transition: {
      duration: 1.5,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

const floatVariants = {
  float: {
    y: [-2, 2, -2],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

export const InvitationModalSkeleton = () => {
  return (
    <motion.div
      className="p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Avatar Section Skeleton */}
      <motion.div
        className="flex justify-center mb-6 relative"
        variants={itemVariants}
      >
        <div className="relative">
          {/* Main avatar with pulse animation */}
          <motion.div
            className="w-24 h-24 bg-gray-200 rounded-full relative overflow-hidden"
            variants={pulseVariants}
            animate="pulse"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              variants={shimmerVariants}
              animate="shimmer"
            />
          </motion.div>

          {/* Star icon with gentle rotation */}
          <motion.div
            className="absolute text-gray-300 right-0 top-0"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </div>

        {/* Secondary avatar with float animation */}
        <motion.div
          className="absolute left-[55%] top-[25%]"
          variants={floatVariants}
          animate="float"
        >
          <motion.div
            className="w-16 h-16 bg-gray-200 rounded-full relative overflow-hidden"
            variants={pulseVariants}
            animate="pulse"
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              variants={shimmerVariants}
              animate="shimmer"
              transition={{ delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Text Skeleton with staggered animations */}
      <motion.div
        className="text-center mb-8 space-y-3"
        variants={itemVariants}
      >
        <div className="flex justify-center items-center gap-2 flex-wrap">
          {/* Username badge skeleton */}
          <motion.div
            className="h-6 bg-orange-100 rounded-md w-20 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/50 to-transparent"
              variants={shimmerVariants}
              animate="shimmer"
              transition={{ delay: 0.4 }}
            />
          </motion.div>

          {/* "is inviting you to join" text */}
          <motion.div
            className="h-5 bg-gray-200 rounded w-24 relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              variants={shimmerVariants}
              animate="shimmer"
              transition={{ delay: 0.6 }}
            />
          </motion.div>

          {/* Group name badge skeleton */}
          <motion.div
            className="h-6 bg-blue-100 rounded-md w-16 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent"
              variants={shimmerVariants}
              animate="shimmer"
              transition={{ delay: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Second line text */}
        <motion.div
          className="h-5 bg-gray-200 rounded w-48 mx-auto relative overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            variants={shimmerVariants}
            animate="shimmer"
            transition={{ delay: 1 }}
          />
        </motion.div>
      </motion.div>

      {/* Button Skeleton with bounce animation */}
      <motion.div className="space-y-3" variants={itemVariants}>
        {/* Accept button skeleton */}
        <motion.div
          className="h-10 bg-gray-200 rounded-md w-full relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            variants={shimmerVariants}
            animate="shimmer"
            transition={{ delay: 1.2 }}
          />
        </motion.div>

        {/* Decline button skeleton */}
        <motion.div
          className="h-10 bg-gray-100 border border-gray-200 rounded-md w-full relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={shimmerVariants}
            animate="shimmer"
            transition={{ delay: 1.4 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
