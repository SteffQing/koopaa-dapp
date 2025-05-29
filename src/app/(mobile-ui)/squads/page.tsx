"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// import Link from "next/link";
import { toast } from "sonner";
import KooPaaSquad from "@/assets/koopa_clean_squad.png";
import Image from "next/image";

export default function SquadsPage() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -20,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Container>
        <div className="flex flex-col items-center justify-center min-h-screen py-8">
          {/* Image Section */}
          <motion.div
            className="relative mb-8"
            variants={imageVariants}
            initial="hidden"
            animate="show"
          >
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full opacity-20 blur-3xl scale-110"
              animate={{
                scale: [1.1, 1.2, 1.1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Floating image */}
            <motion.div animate={floatingAnimation} className="relative z-10">
              <Image
                src={KooPaaSquad || "/placeholder.svg"}
                alt="KooPaa Squad Illustration"
                className="w-80 h-80 object-contain drop-shadow-lg"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="px-4 text-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 className="text-2xl font-bold mb-3" variants={item}>
              Join a KooPaa squad
            </motion.h1>

            <motion.p className="text-gray-600 mb-8" variants={item}>
              No available koopa squad, create one or join existing squads and
              start saving
            </motion.p>

            <motion.div className="space-y-4" variants={item}>
              <Button onClick={() => toast.info("Coming soon")}>
                {/* <Link href="/squads/join-squad"> */}
                Join a Squad
                {/* </Link> */}
              </Button>

              <Button
                variant="outline"
                onClick={() => toast.info("Coming soon")}
              >
                Create a New Squad
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
